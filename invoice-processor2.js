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
        const amount=typeof invoice['数量']!='string'?invoice['数量']:invoice['数量'].replace(/,/g, '')    //去掉千位分隔符
        const price=invoice['单价']
        const total=(parseFloat(amount)*parseFloat(price)).toFixed(2)
        result2.push({
            "发票流水号": invoiceNumber,
            "项目名称": invoice['商品名称'],
            "商品和服务税收编码": itemInfo ? itemInfo['商品和服务税收分类编码'] : "",
            "规格型号": invoice['规格型号'],
            "单位": invoice['计量单位'],
            "数量": amount,
            "单价": price,
            "金额": parseFloat(total),
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

    return { result1, result2 };
}

// 读取Excel文件并转换为JSON数据 (使用ExcelJS)
async function readExcelFile(file) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);
    const worksheet = workbook.worksheets[0]; // 假设我们只需要第一个工作表
    const jsonData = [];

    let headers = []; // 用于存储标题行字段

    worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
        // 将第一行作为标题行
        if (rowNumber === 1) {
            headers = row.values; // 获取标题行的值
        } else {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                const header = headers[colNumber]; // 根据列号匹配标题行的字段
                rowData[header] = cell.value; // 使用标题作为字段名
            });
            jsonData.push(rowData);
        }
    });

    return jsonData;
}


// 将JSON数据转换为Excel并下载 (使用ExcelJS)
function downloadExcel(data, fileName) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    if (data.length > 0) {
        // 提取JSON对象的键作为表头
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers); // 添加表头

        // 逐行添加数据
        data.forEach((rowData) => {
            const row = headers.map(header => rowData[header]);
            worksheet.addRow(row); // 添加数据行
        });
    }

    workbook.xlsx.writeBuffer().then(function(buffer) {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }).catch(error => {
        console.error("Error generating Excel:", error); // 捕获并打印错误
    });
}



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

        log(`生成excel文件result1，共 ${result1.length} 条记录`);
        log(`生成excel文件result2，共 ${result2.length} 条记录`);

        // 生成并下载结果文件
        downloadExcel(result1, 'result1.xlsx');
        downloadExcel(result2, 'result2.xlsx');

        log("处理完成，结果已生成并开始下载");
    } catch (error) {
        log(`错误: ${error.message}`);
    }
}

//listener
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

//log

function log(message) {
    const logElement = document.getElementById('log');
    logElement.innerHTML += message + '<br>';
    console.log(message);
}
