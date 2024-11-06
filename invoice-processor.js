function processInvoiceData(customersData, invoicesData, itemsData) {
    // 创建客户名称到完整信息的映射
    const customerMap = {};
    customersData.forEach(customer => {
        const fullName = customer['客户名称'].trim();
        customerMap[fullName] = customer;
    });

    let invoiceNumberCounter = -1;
    const result1 = [];
    const result2 = [];

    // 按客户和连续分组处理发票
    let currentGroup = [];
    let currentCustomer = null;
    
    // 处理每一行发票数据
    invoicesData.forEach((invoice, index) => {
        const customerName = invoice['公司名称'];
        
        // 如果是新客户或是最后一条记录，处理当前分组
        if ((currentCustomer && currentCustomer !== customerName) || index === invoicesData.length - 1) {
            // 如果是最后一条记录，将其添加到当前分组
            if (index === invoicesData.length - 1) {
                currentGroup.push(invoice);
            }
            
            // 处理当前分组
            if (currentGroup.length > 0) {
                // 生成新的发票流水号
                const invoiceNumber = String(invoiceNumberCounter--);
                
                // 查找匹配的客户信息
                let matchedCustomer = null;
                for (const [fullName, customerInfo] of Object.entries(customerMap)) {
                    if (fullName.includes(currentCustomer)) {
                        matchedCustomer = customerInfo;
                        break;
                    }
                }
                if (!matchedCustomer) {
                    matchedCustomer = {'客户名称': currentCustomer};
                }

                // 生成 result1 记录
                const result1Entry = {
                    "发票流水号": invoiceNumber,
                    "发票类型": "增值税专用发票",
                    "特定业务类型": "",
                    "是否含税": "是",
                    "受票方自然人标识": "",
                    "购买方名称": matchedCustomer['客户名称'] || '',
                    "购买方纳税人识别号": matchedCustomer['统一社会信用代码/纳税人识别号'] || '',
                    "购买方证件类型": "",
                    "购买方证件号码": "",
                    "购买方国籍（或地区）": "",
                    "购买方地址": matchedCustomer['地址'] || '',
                    "购买方电话": matchedCustomer['电话'] || '',
                    "购买方开户银行": matchedCustomer['开户行名称'] || '',
                    "购买方银行账号": matchedCustomer['银行账号'] || '',
                    "备注": "",
                    "报废产品销售类型": "",
                    "是否展示购买方地址电话银行账号": "",
                    "销售方开户行": "",
                    "销售方银行账号": "",
                    "是否展示销售方地址电话银行账号": "",
                    "购买方邮箱": "",
                    "购买方经办人姓名": "",
                    "购买方经办人证件类型": "",
                    "购买方经办人证件号码": "",
                    "经办人国籍(地区)": "",
                    "经办人自然人纳税人识别号": "",
                    "放弃享受减按1%征收率原因": "",
                    "收款人": "张宗兵",
                    "复核人": "张珂珂"
                };
                result1.push(result1Entry);

                // 生成 result2 记录
                currentGroup.forEach(groupInvoice => {
                    const itemInfo = itemsData.find(item => item['项目名称'] === groupInvoice['品名']);
                    const amount = typeof groupInvoice['数量'] != 'string' ? 
                        groupInvoice['数量'] : 
                        groupInvoice['数量'].replace(/,/g, '');
                    const price = groupInvoice['单价'];
                    const total = (parseFloat(amount) * parseFloat(price)).toFixed(2);
                    
                    result2.push({
                        "发票流水号": invoiceNumber,
                        "项目名称": groupInvoice['品名'],
                        "商品和服务税收编码": itemInfo ? itemInfo['商品和服务税收分类编码'] : "",
                        "规格型号": groupInvoice['规格'],
                        "单位": groupInvoice['单位'],
                        "数量": amount,
                        "单价": price,
                        "金额": parseFloat(total),
                        "税率": itemInfo ? parseFloat(itemInfo['税率/征收率']) : 0.13,
                        "折扣金额": groupInvoice['折扣金额'],
                        "是否使用优惠政策": "",
                        "优惠政策类型": "",
                        "即征即退类型": ""
                    });
                });
            }
            
            // 重置分组
            currentGroup = [];
        }
        
        // 更新当前客户并添加到当前分组
        currentCustomer = customerName;
        currentGroup.push(invoice);
    });

    return { result1, result2 };
}

// 修改readExcelFile函数来处理合并单元格
async function readExcelFile(file, sheetName = null, rowRange = null) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);
    
    const worksheet = sheetName ? 
        workbook.getWorksheet(sheetName) : 
        workbook.worksheets[0];
    
    if (!worksheet) {
        throw new Error(`找不到工作表: ${sheetName}`);
    }

    const jsonData = [];
    let headers = [];
    
    // 解析行范围
    let startRow = 1;
    let endRow = worksheet.rowCount;
    
    if (rowRange) {
        const [start, end] = rowRange.split('-').map(num => parseInt(num.trim()));
        if (!isNaN(start) && !isNaN(end)) {
            startRow = start;
            endRow = end;
        }
    }

    // 获取标题行
    const headerRow = worksheet.getRow(1);
    headers = headerRow.values;

    // 记录上一个有效的客户名称
    let lastCustomerName = '';

    // 读取指定范围内的数据
    for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        if (row.hasValues) {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                const header = headers[colNumber];
                if (header) {
                    // 特殊处理客户名称列
                    if (header === '购方名称') {
                        const cellValue = cell.value;
                        // 如果单元格为空或undefined，使用上一个有效的客户名称
                        rowData[header] = (cellValue && cellValue.trim()) ? cellValue.trim() : lastCustomerName;
                        if (cellValue && cellValue.trim()) {
                            lastCustomerName = cellValue.trim();
                        }
                    } else {
                        rowData[header] = cell.value;
                    }
                }
            });
            
            // 确保购方名称字段存在
            if (!rowData['购方名称']) {
                rowData['购方名称'] = lastCustomerName;
            }
            
            jsonData.push(rowData);
        }
    }

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
        
        // 获取工作表名称和行范围
        const sheetName = document.getElementById('sheetName').value.trim();
        const rowRange = document.getElementById('rowRange').value.trim();
        
        const customersData = await readExcelFile(customersFile);
        log(`成功读取客户数据，共 ${customersData.length} 条记录`);
        
        // 使用指定的工作表名称和行范围读取发票数据
        const invoicesData = await readExcelFile(invoicesFile, 
            sheetName || null, 
            rowRange || null
        );
        log(`成功读取发票数据，共 ${invoicesData.length} 条记录`);
        
        const itemsData = await readExcelFile(itemsFile);
        log(`成功读取项目数据，共 ${itemsData.length} 条记录`);

        const { result1, result2 } = processInvoiceData(customersData, invoicesData, itemsData);

        log(`生成excel文件result1，共 ${result1.length} 条记录`);
        log(`生成excel文件result2，共 ${result2.length} 条记录`);

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
