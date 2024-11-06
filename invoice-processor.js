function generateInvoiceNumber(customerName) {
    // 生成一个大范围的随机数（-9999999到9999999之间）
    const min = -9999999;
    const max = 9999999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum.toString();
}

function processInvoiceData(customersData, invoicesData, itemsData) {
    // 创建客户名称到完整信息的映射
    const customerMap = {};
    customersData.forEach(customer => {
        const fullName = customer['客户名称'].trim();
        customerMap[fullName] = customer;
    });

    const result1 = [];
    const result2 = [];

    // 按客户和连续分组处理发票
    let currentGroup = [];
    let currentCustomer = null;
    
    // 用于存储每个客户的流水号
    const customerInvoiceNumbers = new Map();
    
    // 处理每一行发票数据
    invoicesData.forEach((invoice, index) => {
        const customerName = invoice['公司名称'];
        log(`处理发票数据: 客户名称=${customerName}, 索引=${index}`);
        
        // 如果是新客户或是最后一条记录，处理当前分组
        if ((currentCustomer && currentCustomer !== customerName) || index === invoicesData.length - 1) {
            log(`检测到新客户或最后一条记录: 当前客户=${currentCustomer}, 新客户=${customerName}`);
            
            // 如果是最后一条记录，将其添加到当前分组
            if (index === invoicesData.length - 1) {
                currentGroup.push(invoice);
                log(`添加最后一条记录到当前分组, 分组大小=${currentGroup.length}`);
            }
            
            // 处理当前分组
            if (currentGroup.length > 0) {
                // 获取或生成该客户的流水号
                let invoiceNumber;
                if (customerInvoiceNumbers.has(currentCustomer)) {
                    invoiceNumber = customerInvoiceNumbers.get(currentCustomer);
                    log(`使用已存在的流水号: ${invoiceNumber} 给客户 ${currentCustomer}`);
                } else {
                    invoiceNumber = generateInvoiceNumber(currentCustomer);
                    customerInvoiceNumbers.set(currentCustomer, invoiceNumber);
                    log(`生成新的流水号: ${invoiceNumber} 给客户 ${currentCustomer}`);
                }
                
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
                    "经办人自然人纳税人识别号": "",
                    "放弃享受减按1%征收率原因": "",
                    "收款人": "张宗兵",
                    "复核人": "张珂珂"
                };
                result1.push(result1Entry);
                log(`生成 result1 记录: 客户=${currentCustomer}, 流水号=${invoiceNumber}`);

                // 生成 result2 记录
                currentGroup.forEach((groupInvoice, groupIndex) => {
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
                    log(`生成 result2 记录: 客户=${currentCustomer}, 流水号=${invoiceNumber}, 商品=${groupInvoice['品名']}`);
                });
            }
            
            // 重置分组
            currentGroup = [];
            log(`重置分组`);
        }
        
        // 更新当前客户并添加到当前分组
        currentCustomer = customerName;
        currentGroup.push(invoice);
        log(`更新当前客户为 ${currentCustomer}, 当前分组大小=${currentGroup.length}`);
    });

    // 最后打印一下结果统计
    log(`处理完成: result1 共 ${result1.length} 条记录, result2 共 ${result2.length} 条记录`);
    log(`客户流水号映射:`);
    customerInvoiceNumbers.forEach((value, key) => {
        log(`客户: ${key} -> 流水号: ${value}`);
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

// 修改downloadExcel函数为fillTemplate函数
async function fillTemplate(result1, result2, templateFile) {
    try {
        // 处理第一个文件（result1）
        const workbook1 = new ExcelJS.Workbook();
        await workbook1.xlsx.load(templateFile);
        const worksheet1 = workbook1.worksheets[0];
        
        log(`开始填充第一个文件的数据，数据条数：${result1.length}`);
        
        // 从第4行开始填写result1数据
        const headers1 = Object.keys(result1[0]);
        result1.forEach((rowData, index) => {
            const rowNumber = index + 4;
            const row = worksheet1.getRow(rowNumber);
            headers1.forEach((key, colIndex) => {
                const value = rowData[key];
                row.getCell(colIndex + 1).value = value;
                if (typeof value === 'number') {
                    row.getCell(colIndex + 1).numFmt = '#,##0.00';
                }
            });
            row.commit();
            log(`写入第一个文件第 ${rowNumber} 行，流水号: ${rowData['发票流水号']}`);
        });

        // 处理第二个文件（result2）
        const workbook2 = new ExcelJS.Workbook();
        await workbook2.xlsx.load(templateFile);
        const worksheet2 = workbook2.worksheets[0];
        
        log(`开始填充第二个文件的数据，数据条数：${result2.length}`);
        
        // 从第4行开始填写result2数据
        result2.forEach((rowData, index) => {
            const rowNumber = index + 4;
            const row = worksheet2.getRow(rowNumber);
            const values = Object.values(rowData);
            values.forEach((value, colIndex) => {
                const cell = row.getCell(colIndex + 1);
                cell.value = value;
                if (typeof value === 'number') {
                    cell.numFmt = '#,##0.00';
                }
            });
            row.commit();
            log(`写入第二个文件第 ${rowNumber} 行，流水号: ${rowData['发票流水号']}`);
        });

        // 生成带日期的文件名
        const date = new Date();
        const dateStr = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}`;
        const originalName = templateFile.name.replace('.xlsx', '');

        // 导出第一个文件
        const buffer1 = await workbook1.xlsx.writeBuffer();
        const blob1 = new Blob([buffer1], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url1 = window.URL.createObjectURL(blob1);
        const link1 = document.createElement('a');
        link1.href = url1;
        link1.download = `${originalName}_开票信息_${dateStr}.xlsx`;
        document.body.appendChild(link1);
        link1.click();
        document.body.removeChild(link1);
        window.URL.revokeObjectURL(url1);
        
        log(`第一个文件导出完成: ${link1.download}`);

        // 导出第二个文件
        const buffer2 = await workbook2.xlsx.writeBuffer();
        const blob2 = new Blob([buffer2], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url2 = window.URL.createObjectURL(blob2);
        const link2 = document.createElement('a');
        link2.href = url2;
        link2.download = `${originalName}_商品明细_${dateStr}.xlsx`;
        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);
        window.URL.revokeObjectURL(url2);
        
        log(`第二个文件导出完成: ${link2.download}`);

        return [link1.download, link2.download];
    } catch (error) {
        const errorMsg = `填充模板失败: ${error.message}`;
        log(errorMsg);
        throw new Error(errorMsg);
    }
}

// 修改handleFiles函数
async function handleFiles(customersFile, invoicesFile, itemsFile, templateFile) {
    try {
        log('开始处理文件...');
        
        const sheetName = document.getElementById('sheetName').value.trim();
        const rowRange = document.getElementById('rowRange').value.trim();
        
        const customersData = await readExcelFile(customersFile);
        log(`成功读取客户数据，共 ${customersData.length} 条记录`);
        
        const invoicesData = await readExcelFile(invoicesFile, 
            sheetName || null, 
            rowRange || null
        );
        log(`成功读取发票数据，共 ${invoicesData.length} 条记录`);
        
        const itemsData = await readExcelFile(itemsFile);
        log(`成功读取项目数据，共 ${itemsData.length} 条记录`);

        const { result1, result2 } = processInvoiceData(customersData, invoicesData, itemsData);

        log(`生成开票信息表，共 ${result1.length} 条记录`);
        log(`生成商品明细表，共 ${result2.length} 条记录`);

        // 填充模板并下载
        const newFileName = await fillTemplate(result1, result2, templateFile);
        log(`处理完成，已生成文件: ${newFileName}`);
    } catch (error) {
        log(`错误: ${error.message}`);
    }
}

// 修改事件监听器
document.getElementById('processButton').addEventListener('click', async () => {
    const customersFile = document.getElementById('customersFile').files[0];
    const invoicesFile = document.getElementById('invoicesFile').files[0];
    const itemsFile = document.getElementById('itemsFile').files[0];
    const templateFile = document.getElementById('templateFile').files[0];

    if (customersFile && invoicesFile && itemsFile && templateFile) {
        await handleFiles(customersFile, invoicesFile, itemsFile, templateFile);
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
