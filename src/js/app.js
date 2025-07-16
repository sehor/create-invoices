/**
 * 应用程序主入口
 * 负责应用的初始化和启动
 */
class App {
    constructor() {
        this.uiController = null;
    }

    /**
     * 初始化应用程序
     */
    async init() {
        try {
            // 初始化日志系统
            Logger.init('log');
            
            // 创建UI控制器
            this.uiController = new UIController();
            
            // 初始化UI控制器
            await this.uiController.initialize();
            
            Logger.success('发票处理器启动成功');
            
        } catch (error) {
            Logger.error('应用启动失败: ' + error.message);
            console.error('应用启动失败:', error);
        }
    }
}

// 当DOM加载完成后启动应用
document.addEventListener('DOMContentLoaded', async () => {
    const app = new App();
    await app.init();
});

// 导出到全局作用域
window.App = App;