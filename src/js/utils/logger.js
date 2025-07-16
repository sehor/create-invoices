/**
 * 日志工具
 * 负责应用程序的日志记录和显示
 */
class Logger {
    static logContainer = null;

    /**
     * 初始化日志容器
     */
    static init(containerId = 'log') {
        this.logContainer = document.getElementById(containerId);
        if (!this.logContainer) {
            console.warn(`日志容器 #${containerId} 未找到`);
        }
    }

    /**
     * 记录日志
     */
    static log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logMessage = `[${timestamp}] ${message}`;
        
        // 输出到控制台
        console.log(logMessage);
        
        // 输出到页面日志容器
        if (this.logContainer) {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry log-${type}`;
            logEntry.textContent = logMessage;
            
            this.logContainer.appendChild(logEntry);
            this.logContainer.scrollTop = this.logContainer.scrollHeight;
        }
    }

    /**
     * 记录错误日志
     */
    static error(message) {
        this.log(`错误: ${message}`, 'error');
    }

    /**
     * 记录警告日志
     */
    static warn(message) {
        this.log(`警告: ${message}`, 'warn');
    }

    /**
     * 记录成功日志
     */
    static success(message) {
        this.log(`成功: ${message}`, 'success');
    }

    /**
     * 清空日志
     */
    static clear() {
        if (this.logContainer) {
            this.logContainer.innerHTML = '';
        }
    }
}

// 导出到全局作用域
window.Logger = Logger;