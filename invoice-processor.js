// 注意：这个脚本现在使用了 XLSX 库的最新版本

// 处理发票数据的主函数
function processInvoiceData(customersData, invoicesData, itemsData) {
    // 创建客户名称到完整信息的映射
    const customerMap = {};
    customersData.forEach(customer => {
        const fullName = customer['客户名称'].trim();
        customerMap[fullName] = customer;
    });

    // 创建发票流水号
    const invoiceNumbers = {};

    const result1 = [];
    const result2 = [];

    // 填充缺失的购方名称
    let lastValidCustomerName = '';
    invoicesData.forEach(invoice => {
        if (invoice['购方名称']) {
            lastValidCustomerName = invoice['购方名称'];
        } else {
            invoice['购方名称'] = lastValidCustomerName;
        }
    });


    invoicesData.forEach(invoice => {
        const customerName = invoice['购方名称'] || '';
        let matchedCustomer = null;

        // 查找匹配的客户
        for (const [fullName, customerInfo] of Object.entries(customerMap)) {
            if (fullName.includes(customerName) || customerName.includes(fullName)) {
                matchedCustomer = customerInfo;
                break;
            }
        }

        if (!invoiceNumbers[customerName]) {
            invoiceNumbers[customerName] = String(Math.floor(Math.random() * -2000000000));
        }

        const invoiceNumber = invoiceNumbers[customerName];

        // 处理result2
        const itemInfo = itemsData.find(item => item['项目名称'] === invoice['商品名称']);
        result2.push({
            "发票流水号": invoiceNumber,
            "项目名称": invoice['商品名称'],
            "商品和服务税收编码": itemInfo ? itemInfo['商品和服务税收分类编码'] : "",
            "规格型号": invoice['规格型号'],
            "单位": invoice['计量单位'],
            "数量": invoice['数量'].replace(/,/g, ''),     //去掉千位分隔符
            "单价": invoice['单价'],
            "金额": invoice['含税金额'],
            "税率": itemInfo ? parseFloat(itemInfo['税率/征收率']) : 0.13
        });

        // 处理result1
        if (matchedCustomer) {
            if (!result1.some(entry => entry.发票流水号 === invoiceNumber)) {
                const result1Entry = {
                    "发票流水号": invoiceNumber,
                    "发票类型": "增值税专用发票",
                    "是否含税": "是",
                    "购买方名称": matchedCustomer['客户名称'],
                    "购买方纳税人识别号": matchedCustomer['统一社会信用代码/纳税人识别号'],
                    "购买方地址": matchedCustomer['地址'],
                    "购买方电话": matchedCustomer['电话'],
                    "购买方开户银行": matchedCustomer['开户行名称'],
                    "购买方银行账号": matchedCustomer['银行账号'],
                    "收款人": "张宗兵",
                    "复核人": "张珂珂"
                };
                result1.push(result1Entry);
            }
        }
    });


    // 按发票流水号排序
    // result2.sort((a, b) => {

    //     return a['发票流水号'].localeCompare(b['发票流水号']);
    // });

    return { result1, result2 };
}

// 读取Excel文件并转换为JSON数据
function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // 当文件加载完成时触发
        reader.onload = (e) => {
            try {
                // 将读取到的文件数据转换为字节数组
                const data = new Uint8Array(e.target.result);

                // 读取 Excel 文件的内容，支持日期格式，解析为工作簿
                const workbook = XLSX.read(data, {
                    type: 'array',
                    cellDates: true,  // 将日期类型的单元格读取为 Date 对象
                    dateNF: 'yyyy-mm-dd'  // 日期格式
                });

                // 获取第一个工作表的名称
                const sheetName = workbook.SheetNames[0];

                // 根据工作表名称获取工作表内容
                const worksheet = workbook.Sheets[sheetName];

                // 将工作表转换为JSON对象，处理日期格式和原始数据
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    raw: false,  // 禁用原始值解析，进行自动格式处理
                    dateNF: 'yyyy-mm-dd'  // 将日期格式化为字符串
                });

                // 将转换好的JSON数据传递给调用方
                resolve(jsonData);
            } catch (error) {
                // 处理解析过程中出现的任何错误
                reject(`Error reading the Excel file: ${error.message}`);
            }
        };

        // 当文件读取发生错误时触发
        reader.onerror = (error) => {
            reject(`File reading failed: ${error.message}`);
        };

        // 读取文件为ArrayBuffer，适用于二进制文件如Excel
        reader.readAsArrayBuffer(file);
    });
}


// 将JSON数据转换为Excel并下载
function downloadExcel(data, fileName) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
}

// 主函数，处理文件并生成结果
async function handleFiles(customersFile, invoicesFile, itemsFile) {
    try {
        log('开始处理文件...');
        const customersData = await readExcelFile(customersFile);
        log(`成功读取客户数据，共 ${customersData.length} 条记录`);
        const invoicesData = await readExcelFile(invoicesFile);
        log(`成功读取发票数据，共 ${invoicesData.length} 条记录`);
        const itemsData = await readExcelFile(itemsFile);
        log(`成功读取项目数据，共 ${itemsData.length} 条记录`);

        const { result1, result2 } = processInvoiceData(customersData, invoicesData, itemsData);

        log(`生成结果1，共 ${result1.length} 条记录`);
        log(`生成结果2，共 ${result2.length} 条记录`);

        // 生成并下载结果文件
        downloadExcel(result1, 'result1.xlsx');
        downloadExcel(result2, 'result2.xlsx');

        log("处理完成，结果已生成并开始下载");
    } catch (error) {
        console.error('处理文件时发生错误:', error);
        log(`错误: ${error.message}`);
        alert(`处理文件时发生错误: ${error.message}`);
    }
}

// 使用示例
document.getElementById('processButton').addEventListener('click', async () => {
    const customersFile = document.getElementById('customersFile').files[0];
    const invoicesFile = document.getElementById('invoicesFile').files[0];
    const itemsFile = document.getElementById('itemsFile').files[0];

    if (customersFile && invoicesFile && itemsFile) {
        await handleFiles(customersFile, invoicesFile, itemsFile);
    } else {
        alert('请上传所有必要的文件');
    }
});