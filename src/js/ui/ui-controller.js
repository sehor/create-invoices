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
            invoiceTemplateFile: document.getElementById('invoiceTemplateFile'),
            itemsTemplateFile: document.getElementById('itemsTemplateFile'),
            
            // 工作表配置
            sheetName: document.getElementById('sheetName'),
            rowRange: document.getElementById('rowRange'),
            
            // 按钮
            saveCustomersData: document.getElementById('saveCustomersData'),
            saveItemsData: document.getElementById('saveItemsData'),
            saveInvoiceTemplate: document.getElementById('saveInvoiceTemplate'),
            saveItemsTemplate: document.getElementById('saveItemsTemplate'),
            clearCustomersData: document.getElementById('clearCustomersData'),
            clearItemsData: document.getElementById('clearItemsData'),
            clearInvoiceTemplate: document.getElementById('clearInvoiceTemplate'),
            clearItemsTemplate: document.getElementById('clearItemsTemplate'),
            processButton: document.getElementById('processButton'),
            
            // 状态显示
            customersStatus: document.getElementById('customersStatus'),
            itemsStatus: document.getElementById('itemsStatus'),
            invoiceTemplateStatus: document.getElementById('invoiceTemplateStatus'),
            itemsTemplateStatus: document.getElementById('itemsTemplateStatus')
        };
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 保存数据按钮
        this.elements.saveCustomersData?.addEventListener('click', () => this.handleSaveCustomersData());
        this.elements.saveItemsData?.addEventListener('click', () => this.handleSaveItemsData());
        this.elements.saveInvoiceTemplate?.addEventListener('click', () => this.handleSaveTemplate('invoice'));
        this.elements.saveItemsTemplate?.addEventListener('click', () => this.handleSaveTemplate('items'));
        
        // 清除数据按钮
        this.elements.clearCustomersData?.addEventListener('click', () => this.handleClearData('customers'));
        this.elements.clearItemsData?.addEventListener('click', () => this.handleClearData('items'));
        this.elements.clearInvoiceTemplate?.addEventListener('click', () => this.handleClearData('invoiceTemplate'));
        this.elements.clearItemsTemplate?.addEventListener('click', () => this.handleClearData('itemsTemplate'));
        
        // 处理按钮
        this.elements.processButton?.addEventListener('click', () => this.handleProcessFiles());
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
            alert('项目数据保存成功！');
            this.updateStatus();
        } catch (error) {
            alert(error.message);
        }
    }

    /**
     * 处理保存模板文件
     */
    async handleSaveTemplate(type) {
        const fileInput = type === 'invoice' ? 
            this.elements.invoiceTemplateFile : 
            this.elements.itemsTemplateFile;
        
        const file = fileInput?.files[0];
        if (!file) {
            alert('请先选择模板文件');
            return;
        }

        try {
            await this.processor.saveTemplateFile(file, type);
            alert('模板文件保存成功！');
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
            items: '确定要清除保存的项目数据吗？',
            invoiceTemplate: '确定要清除保存的发票模板吗？',
            itemsTemplate: '确定要清除保存的项目模板吗？'
        };

        if (confirm(confirmMessages[type])) {
            this.processor.clearData(type);
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
        const status = this.processor.getStatus();
        
        if (this.elements.customersStatus) {
            this.elements.customersStatus.textContent = status.customersData;
        }
        if (this.elements.itemsStatus) {
            this.elements.itemsStatus.textContent = status.itemsData;
        }
        if (this.elements.invoiceTemplateStatus) {
            this.elements.invoiceTemplateStatus.textContent = status.invoiceTemplate;
        }
        if (this.elements.itemsTemplateStatus) {
            this.elements.itemsTemplateStatus.textContent = status.itemsTemplate;
        }
    }
}

// 导出到全局作用域
window.UIController = UIController;