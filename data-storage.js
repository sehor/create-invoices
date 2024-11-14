class DataStorage {
    static saveCustomersData(data) {
        try {
            localStorage.setItem('customersData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('保存客户数据失败:', error);
            return false;
        }
    }

    static getCustomersData() {
        try {
            const data = localStorage.getItem('customersData');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('获取客户数据失败:', error);
            return null;
        }
    }

    static saveItemsData(data) {
        try {
            localStorage.setItem('itemsData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('保存项目数据失败:', error);
            return false;
        }
    }

    static getItemsData() {
        try {
            const data = localStorage.getItem('itemsData');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('获取项目数据失败:', error);
            return null;
        }
    }

    static clearCustomersData() {
        localStorage.removeItem('customersData');
    }

    static clearItemsData() {
        localStorage.removeItem('itemsData');
    }

    static async saveTemplateFile(file) {
        try {
            const buffer = await file.arrayBuffer();
            const base64 = btoa(String.fromCharCode.apply(null, 
                new Uint8Array(buffer)));
            
            const templateInfo = {
                name: file.name,
                type: file.type,
                data: base64
            };
            
            localStorage.setItem('templateFile', JSON.stringify(templateInfo));
            return true;
        } catch (error) {
            console.error('保存模板文件失败:', error);
            return false;
        }
    }

    static async getTemplateFile() {
        try {
            const templateInfo = localStorage.getItem('templateFile');
            if (!templateInfo) return null;
            
            const { name, type, data } = JSON.parse(templateInfo);
            
            if (!data) return null;
            
            try {
                const binaryString = atob(data);
                const bytes = new Uint8Array(binaryString.length);
                
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                
                return new File([bytes.buffer], name, { type });
            } catch (e) {
                console.error('Base64解码失败:', e);
                return null;
            }
        } catch (error) {
            console.error('获取模板文件失败:', error);
            return null;
        }
    }

    static clearTemplateFile() {
        localStorage.removeItem('templateFile');
    }
} 