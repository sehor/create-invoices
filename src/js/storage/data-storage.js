class DataStorage {
    /**
     * 保存客户数据
     */
    static saveCustomersData(data) {
        try {
            localStorage.setItem('customersData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('保存客户数据失败:', error);
            return false;
        }
    }

    /**
     * 获取客户数据
     */
    static getCustomersData() {
        try {
            const data = localStorage.getItem('customersData');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('获取客户数据失败:', error);
            return null;
        }
    }

    /**
     * 保存项目数据
     */
    static saveItemsData(data) {
        try {
            localStorage.setItem('itemsData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('保存项目数据失败:', error);
            return false;
        }
    }

    /**
     * 获取项目数据
     */
    static getItemsData() {
        try {
            const data = localStorage.getItem('itemsData');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('获取项目数据失败:', error);
            return null;
        }
    }

    /**
     * 清除客户数据
     */
    static clearCustomersData() {
        localStorage.removeItem('customersData');
    }

    /**
     * 清除项目数据
     */
    static clearItemsData() {
        localStorage.removeItem('itemsData');
    }

    /**
     * 保存开票模板（Base64）
     */
    static saveTemplateData(base64) {
        try {
            localStorage.setItem('templateWorkbookBase64', base64);
            return true;
        } catch (error) {
            console.error('保存开票模板失败:', error);
            return false;
        }
    }

    /**
     * 获取开票模板（Base64）
     */
    static getTemplateData() {
        try {
            const base64 = localStorage.getItem('templateWorkbookBase64');
            return base64 || null;
        } catch (error) {
            console.error('获取开票模板失败:', error);
            return null;
        }
    }

    /**
     * 清除开票模板
     */
    static clearTemplateData() {
        localStorage.removeItem('templateWorkbookBase64');
    }

    // ===== 缓存文件名元数据 =====
    /** 保存客户数据文件名 */
    static saveCustomersMeta(meta) {
        try {
            localStorage.setItem('customersMeta', JSON.stringify(meta || {}));
            return true;
        } catch (error) {
            console.error('保存客户文件名失败:', error);
            return false;
        }
    }

    /** 获取客户数据文件名 */
    static getCustomersMeta() {
        try {
            const s = localStorage.getItem('customersMeta');
            return s ? JSON.parse(s) : null;
        } catch (error) {
            console.error('获取客户文件名失败:', error);
            return null;
        }
    }

    /** 清除客户数据文件名 */
    static clearCustomersMeta() {
        localStorage.removeItem('customersMeta');
    }

    /** 保存项目数据文件名 */
    static saveItemsMeta(meta) {
        try {
            localStorage.setItem('itemsMeta', JSON.stringify(meta || {}));
            return true;
        } catch (error) {
            console.error('保存项目文件名失败:', error);
            return false;
        }
    }

    /** 获取项目数据文件名 */
    static getItemsMeta() {
        try {
            const s = localStorage.getItem('itemsMeta');
            return s ? JSON.parse(s) : null;
        } catch (error) {
            console.error('获取项目文件名失败:', error);
            return null;
        }
    }

    /** 清除项目数据文件名 */
    static clearItemsMeta() {
        localStorage.removeItem('itemsMeta');
    }

    /** 保存模板文件名 */
    static saveTemplateMeta(meta) {
        try {
            localStorage.setItem('templateMeta', JSON.stringify(meta || {}));
            return true;
        } catch (error) {
            console.error('保存模板文件名失败:', error);
            return false;
        }
    }

    /** 获取模板文件名 */
    static getTemplateMeta() {
        try {
            const s = localStorage.getItem('templateMeta');
            return s ? JSON.parse(s) : null;
        } catch (error) {
            console.error('获取模板文件名失败:', error);
            return null;
        }
    }

    /** 清除模板文件名 */
    static clearTemplateMeta() {
        localStorage.removeItem('templateMeta');
    }
}

// 导出到全局作用域
window.DataStorage = DataStorage;

 