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
create-invoices/
├── index.html              # 🎯 GitHub Pages首页（操作界面）
├── PROJECT_INFO.md         # 📖 项目说明文档
├── exceljs.js             # 📚 ExcelJS库
├── package.json           # ⚙️ 项目配置
├── src/                   # 📂 源代码
│   ├── css/
│   │   └── style.css      # 🎨 样式文件
│   └── js/                # 💻 JavaScript模块
│       ├── core/          # 🔧 核心功能
│       ├── utils/         # 🛠️ 工具函数
│       ├── storage/       # 💾 数据存储
│       ├── ui/            # 🖥️ 界面控制
│       └── app.js         # 🚀 应用入口
└── public/                # 📁 原静态文件目录（可选保留）
    └── index.html         # 📄 原页面文件