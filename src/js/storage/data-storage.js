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
}

// 导出到全局作用域
window.DataStorage = DataStorage;

 