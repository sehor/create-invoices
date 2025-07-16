# 发票处理器

一个用于处理Excel发票数据的Web应用程序。

## 功能特性

- 📊 Excel文件读取和解析
- 🏢 客户信息管理
- 📋 项目信息管理
- 🧾 发票数据处理和转换
- 💾 本地数据存储
- 📤 处理结果导出

## 项目结构

```
create-invoices/
├── public/                 # 静态文件目录
│   └── index.html         # 主页面
├── src/                   # 源代码目录
│   ├── js/               # JavaScript文件
│   │   ├── core/         # 核心功能模块
│   │   │   ├── invoice-processor.js    # 发票处理器
│   │   │   └── data-processor.js       # 数据处理器
│   │   ├── utils/        # 工具函数
│   │   │   ├── excel-reader.js         # Excel读取工具
│   │   │   ├── excel-exporter.js       # Excel导出工具
│   │   │   └── logger.js               # 日志工具
│   │   ├── storage/      # 数据存储
│   │   │   └── data-storage.js         # 本地存储管理
│   │   ├── ui/           # UI相关
│   │   │   └── ui-controller.js        # UI控制器
│   │   └── app.js        # 应用主入口
│   └── css/              # 样式文件
│       └── style.css     # 主样式文件
├── exceljs.js            # ExcelJS库文件
├── package.json          # 项目配置
└── README.md            # 项目说明
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

或者直接启动生产版本：

```bash
npm start
```

### 3. 打开浏览器

访问 `http://localhost:8080` 即可使用应用。

## 使用说明

1. **上传客户信息文件**：选择包含客户信息的Excel文件
2. **上传项目信息文件**：选择包含项目信息的Excel文件
3. **上传开票信息文件**：选择需要处理的发票数据Excel文件
4. **配置处理参数**：设置工作表名称和行范围（可选）
5. **处理数据**：点击"转换并下载"按钮开始处理
6. **下载结果**：处理完成后自动下载结果Excel文件

## 技术栈

- **前端**：原生JavaScript + HTML5 + CSS3
- **数据处理**：ExcelJS
- **存储**：LocalStorage
- **模块化**：ES6 Classes

## 开发说明

### 代码结构

- `core/`：核心业务逻辑模块
- `utils/`：通用工具函数
- `storage/`：数据存储相关
- `ui/`：用户界面控制

### 主要类说明

- `InvoiceProcessor`：发票处理核心类
- `DataProcessor`：数据处理工具类
- `ExcelReader`：Excel文件读取工具
- `ExcelExporter`：Excel文件导出工具
- `DataStorage`：本地数据存储管理
- `UIController`：用户界面控制器
- `Logger`：日志记录工具

## 许可证

ISC License