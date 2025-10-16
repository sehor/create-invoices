/**
 * UI控制器
 * 负责用户界面的交互逻辑
 */
class UIController {
    constructor() {
        this.processor = new InvoiceProcessor();
        this.initializeElements();
        this.bindEvents();
    }

    /**
     * 初始化DOM元素引用
     */
    initializeElements() {
        this.elements = {
            // 文件输入
            customersFile: document.getElementById('customersFile'),
            itemsFile: document.getElementById('itemsFile'),
            invoicesFile: document.getElementById('invoicesFile'),
            templateFile: document.getElementById('templateFile'),
            
            // 工作表配置
            sheetName: document.getElementById('sheetName'),
            rowRange: document.getElementById('rowRange'),
            
            // 按钮
            saveCustomersData: document.getElementById('saveCustomersData'),
            saveItemsData: document.getElementById('saveItemsData'),
            saveTemplate: document.getElementById('saveTemplate'),
            checkTemplate: document.getElementById('checkTemplate'),
            clearCustomersData: document.getElementById('clearCustomersData'),
            clearItemsData: document.getElementById('clearItemsData'),
            processButton: document.getElementById('processButton'),
            
            // 状态显示
            customersStatus: document.getElementById('customersStatus'),
            itemsStatus: document.getElementById('itemsStatus'),
            templateStatus: document.getElementById('templateStatus')
        };
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 保存数据按钮
        this.elements.saveCustomersData?.addEventListener('click', () => this.handleSaveCustomersData());
        this.elements.saveItemsData?.addEventListener('click', () => this.handleSaveItemsData());
        this.elements.saveTemplate?.addEventListener('click', () => this.handleSaveTemplate());
        this.elements.checkTemplate?.addEventListener('click', () => this.handleCheckTemplate());
        
        // 清除数据按钮
        this.elements.clearCustomersData?.addEventListener('click', () => this.handleClearData('customers'));
        this.elements.clearItemsData?.addEventListener('click', () => this.handleClearData('items'));
        
        // 处理按钮
        this.elements.processButton?.addEventListener('click', () => this.handleProcessFiles());
    }

    /**
     * 处理保存开票模板
     */
    async handleSaveTemplate() {
        const file = this.elements.templateFile?.files[0];
        if (!file) {
            alert('请先选择开票模板文件');
            return;
        }

        try {
            const base64 = await this.fileToBase64(file);
            const ok = DataStorage.saveTemplateData(base64);
            if (!ok) throw new Error('保存模板失败');
            // 记录模板文件名
            DataStorage.saveTemplateMeta({ filename: file.name });
            alert('开票模板保存成功！');
            this.updateStatus();
        } catch (error) {
            alert(error.message);
        }
    }

    /**
     * File -> Base64（用于持久化模板）
     */
    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const bytes = new Uint8Array(arrayBuffer);
                let binary = '';
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                resolve(btoa(binary));
            };
            reader.onerror = () => reject(new Error('读取模板文件失败'));
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * 检测模板第二个工作表的表头读取情况
     */
    async handleCheckTemplate() {
        try {
            Logger.log('开始检测模板第二个工作表...');
            await ExcelExporter.debugTemplateSheets();
            Logger.success('模板检测完成');
        } catch (e) {
            Logger.error('模板检测失败: ' + e.message);
            alert(e.message);
        }
    }

    /**
     * 初始化应用
     */
    async initialize() {
        try {
            await this.processor.initialize();
            this.updateStatus();
            Logger.success('应用初始化完成');
        } catch (error) {
            Logger.error('应用初始化失败: ' + error.message);
        }
    }

    /**
     * 处理保存客户数据
     */
    async handleSaveCustomersData() {
        const file = this.elements.customersFile?.files[0];
        if (!file) {
            alert('请先选择客户信息文件');
            return;
        }

        try {
            await this.processor.saveCustomersData(file);
            // 记录客户文件名
            DataStorage.saveCustomersMeta({ filename: file.name });
            alert('客户数据保存成功！');
            this.updateStatus();
        } catch (error) {
            alert(error.message);
        }
    }

    /**
     * 处理保存项目数据
     */
    async handleSaveItemsData() {
        const file = this.elements.itemsFile?.files[0];
        if (!file) {
            alert('请先选择项目信息文件');
            return;
        }

        try {
            await this.processor.saveItemsData(file);
            // 记录项目文件名
            DataStorage.saveItemsMeta({ filename: file.name });
            alert('项目数据保存成功！');
            this.updateStatus();
        } catch (error) {
            alert(error.message);
        }
    }

    /**
     * 处理清除数据
     */
    handleClearData(type) {
        const confirmMessages = {
            customers: '确定要清除保存的客户数据吗？',
            items: '确定要清除保存的项目数据吗？'
        };

        if (confirm(confirmMessages[type])) {
            this.processor.clearData(type);
            // 同步清理文件名缓存
            if (type === 'customers') {
                DataStorage.clearCustomersMeta();
            } else if (type === 'items') {
                DataStorage.clearItemsMeta();
            }
            this.updateStatus();
            alert('数据已清除');
        }
    }

    /**
     * 处理文件处理请求
     */
    async handleProcessFiles() {
        const invoicesFile = this.elements.invoicesFile?.files[0];
        const sheetName = this.elements.sheetName?.value.trim() || null;
        const rowRange = this.elements.rowRange?.value.trim() || null;

        if (!invoicesFile) {
            alert('请选择开票信息文件');
            return;
        }

        // 校验是否已上传模板
        const hasTemplate = !!(DataStorage.getTemplateData && DataStorage.getTemplateData());
        if (!hasTemplate) {
            alert('未检测到开票模板，请先在上方上传模板');
            return;
        }

        // 禁用处理按钮
        if (this.elements.processButton) {
            this.elements.processButton.disabled = true;
            this.elements.processButton.textContent = '处理中...';
        }

        try {
            Logger.log('开始处理发票文件...');
            const result = await this.processor.processInvoiceFiles(invoicesFile, sheetName, rowRange);
            
            // 导出结果
            await ExcelExporter.exportResults(result.result1, result.result2, '发票处理结果');
            
        } catch (error) {
            Logger.error(error.message);
            alert(error.message);
        } finally {
            // 恢复处理按钮
            if (this.elements.processButton) {
                this.elements.processButton.disabled = false;
                this.elements.processButton.textContent = '转换并下载';
            }
        }
    }

    /**
     * 更新状态显示
     */
    updateStatus() {
        const customersData = DataStorage.getCustomersData();
        const itemsData = DataStorage.getItemsData();
        const templateBase64 = DataStorage.getTemplateData();

        if (this.elements.customersStatus) {
            if (customersData) {
                const meta = DataStorage.getCustomersMeta();
                const name = meta?.filename || '未命名';
                this.elements.customersStatus.textContent = `已缓存：${name}`;
            } else {
                this.elements.customersStatus.textContent = '无存储数据';
            }
        }

        if (this.elements.itemsStatus) {
            if (itemsData) {
                const meta = DataStorage.getItemsMeta();
                const name = meta?.filename || '未命名';
                this.elements.itemsStatus.textContent = `已缓存：${name}`;
            } else {
                this.elements.itemsStatus.textContent = '无存储数据';
            }
        }

        if (this.elements.templateStatus) {
            if (templateBase64) {
                const meta = DataStorage.getTemplateMeta();
                const name = meta?.filename || '未命名';
                this.elements.templateStatus.textContent = `已加载模板：${name}`;
            } else {
                this.elements.templateStatus.textContent = '未加载模板，请上传模板';
            }
        }
    }
}

// 导出到全局作用域
window.UIController = UIController;