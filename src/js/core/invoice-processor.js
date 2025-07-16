/**
 * 发票处理核心模块
 * 负责发票数据的处理和转换逻辑
 */
class InvoiceProcessor {
    constructor() {
        this.customersData = null;
        this.itemsData = null;
        this.isProcessing = false;
    }

    /**
     * 初始化处理器
     */
    async initialize() {
        try {
            // 加载保存的数据
            this.customersData = DataStorage.getCustomersData();
            this.itemsData = DataStorage.getItemsData();
            
            console.log('发票处理器初始化完成');
            return true;
        } catch (error) {
            console.error('发票处理器初始化失败:', error);
            throw error;
        }
    }

    /**
     * 保存客户数据
     */
    async saveCustomersData(file) {
        if (!file) {
            throw new Error('请先选择客户信息文件');
        }

        try {
            this.customersData = await ExcelReader.readFile(file);
            if (DataStorage.saveCustomersData(this.customersData)) {
                return true;
            }
            throw new Error('保存失败');
        } catch (error) {
            throw new Error('保存客户数据失败：' + error.message);
        }
    }

    /**
     * 保存项目数据
     */
    async saveItemsData(file) {
        if (!file) {
            throw new Error('请先选择项目信息文件');
        }

        try {
            this.itemsData = await ExcelReader.readFile(file);
            if (DataStorage.saveItemsData(this.itemsData)) {
                return true;
            }
            throw new Error('保存失败');
        } catch (error) {
            throw new Error('保存项目数据失败：' + error.message);
        }
    }

    /**
     * 清除数据
     */
    clearData(type) {
        switch (type) {
            case 'customers':
                DataStorage.clearCustomersData();
                this.customersData = null;
                break;
            case 'items':
                DataStorage.clearItemsData();
                this.itemsData = null;
                break;
        }
    }

    /**
     * 处理发票文件
     */
    async processInvoiceFiles(invoicesFile, sheetName, rowRange) {
        if (this.isProcessing) {
            throw new Error('正在处理中，请稍候...');
        }

        this.isProcessing = true;
        
        try {
            // 确保有必要的数据
            if (!this.customersData) {
                throw new Error('请先加载客户信息数据');
            }

            if (!this.itemsData) {
                throw new Error('请先加载项目信息数据');
            }

            if (!invoicesFile) {
                throw new Error('请选择开票信息文件');
            }

            // 读取发票数据
            const invoicesData = await ExcelReader.readFile(invoicesFile, sheetName, rowRange);
            
            // 处理数据
            const result = DataProcessor.processInvoiceData(
                this.customersData,
                invoicesData,
                this.itemsData
            );

            return result;
        } finally {
            this.isProcessing = false;
        }
    }

    /**
     * 获取状态信息
     */
    getStatus() {
        return {
            customersData: this.customersData ? '已加载客户数据' : '无存储数据',
            itemsData: this.itemsData ? '已加载项目数据' : '无存储数据',
            isProcessing: this.isProcessing
        };
    }
}

// 导出到全局作用域
window.InvoiceProcessor = InvoiceProcessor;