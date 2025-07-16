let customersData = null;
let itemsData = null;
let invoiceTemplateFile = null;
let itemsTemplateFile = null;
let isProcessing = false;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 加载保存的数据
        customersData = DataStorage.getCustomersData();
        itemsData = DataStorage.getItemsData();
        invoiceTemplateFile = await DataStorage.getTemplateFile('invoice');
        itemsTemplateFile = await DataStorage.getTemplateFile('items');

        updateStatus();

        // 添加事件监听器
        document.getElementById('saveCustomersData').addEventListener('click', saveCustomersData);
        document.getElementById('saveItemsData').addEventListener('click', saveItemsData);
        document.getElementById('saveInvoiceTemplate').addEventListener('click', () => saveTemplateFile('invoice'));
        document.getElementById('saveItemsTemplate').addEventListener('click', () => saveTemplateFile('items'));
        document.getElementById('clearInvoiceTemplate').addEventListener('click', () => clearTemplateFile('invoice'));
        document.getElementById('clearItemsTemplate').addEventListener('click', () => clearTemplateFile('items'));
        document.getElementById('processButton').addEventListener('click', handleProcessButtonClick);
    } catch (error) {
        console.error('初始化失败:', error);
        log('初始化失败: ' + error.message);
    }
});

function updateStatus() {
    const customersStatus = document.getElementById('customersStatus');
    const itemsStatus = document.getElementById('itemsStatus');
    const invoiceTemplateStatus = document.getElementById('invoiceTemplateStatus');
    const itemsTemplateStatus = document.getElementById('itemsTemplateStatus');

    customersStatus.textContent = customersData ? '已加载客户数据' : '无存储数据';
    itemsStatus.textContent = itemsData ? '已加载项目数据' : '无存储数据';
    invoiceTemplateStatus.textContent = invoiceTemplateFile ? 
        `已加载模板: ${invoiceTemplateFile.name}` : '无存储模板';
    itemsTemplateStatus.textContent = itemsTemplateFile ? 
        `已加载模板: ${itemsTemplateFile.name}` : '无存储模板';
}

async function saveCustomersData() {
    const file = document.getElementById('customersFile').files[0];
    if (!file) {
        alert('请先选择客户信息文件');
        return;
    }

    try {
        customersData = await readExcelFile(file);
        if (DataStorage.saveCustomersData(customersData)) {
            alert('客户数据保存成功！');
            updateStatus();
        }
    } catch (error) {
        alert('保存客户数据失败：' + error.message);
    }
}

async function saveItemsData() {
    const file = document.getElementById('itemsFile').files[0];
    if (!file) {
        alert('请先选择项目信息文件');
        return;
    }

    try {
        itemsData = await readExcelFile(file);
        if (DataStorage.saveItemsData(itemsData)) {
            alert('项目数据保存成功！');
            updateStatus();
        }
    } catch (error) {
        alert('保存项目数据失败：' + error.message);
    }
}

function clearCustomersData() {
    if (confirm('确定要清除保存的客户数据吗？')) {
        DataStorage.clearCustomersData();
        customersData = null;
        updateStatus();
        alert('客户数据已清除');
    }
}

function clearItemsData() {
    if (confirm('确定要清除保存的项目数据吗？')) {
        DataStorage.clearItemsData();
        itemsData = null;
        updateStatus();
        alert('项目数据已清除');
    }
}

async function processFiles() {
    try {
        if (!customersData) {
            const customersFile = document.getElementById('customersFile').files[0];
            if (!customersFile) {
                throw new Error('请选择客户信息文件或确保已有存储的客户数据');
            }
            customersData = await readExcelFile(customersFile);
        }

        if (!itemsData) {
            const itemsFile = document.getElementById('itemsFile').files[0];
            if (!itemsFile) {
                throw new Error('请选择项目信息文件或确保已有存储的项目数据');
            }
            itemsData = await readExcelFile(itemsFile);
        }

        // 继续处理其他文件...
    } catch (error) {
        console.error('处理文件时出错:', error);
        alert(error.message);
    }
}

// 修改readExcelFile函数来处理合并单元格
async function readExcelFile(file, sheetName = null, rowRange = null) {
    if (!file) {
        throw new Error('文件不存在');
    }

    log(`正在加载文件: ${file.name}...`);
    const workbook = new ExcelJS.Workbook();

    try {
        await workbook.xlsx.load(file);
        log(`文件 ${file.name} 加载完成`);
    } catch (error) {
        throw new Error(`加载文件失败: ${error.message}`);
    }

    const worksheet = sheetName ?
        workbook.getWorksheet(sheetName) :
        workbook.worksheets[0];

    if (!worksheet) {
        throw new Error(`找不到工作表: ${sheetName || '默认工作表'}`);
    }

    // 获取单元格的实际值（处理公式单元格）
    const getCellValue = (cell) => {
        if (!cell.value) {
            return null;
        }
        
        // 如果是公式单元格，返回计算结果
        if (typeof cell.value === 'object' && cell.value.formula) {
            return cell.value.result !== undefined ? cell.value.result : cell.value;
        }
        
        // 普通单元格直接返回值
        return cell.value;
    };

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
            log(`使用指定行范围: ${startRow}-${endRow}`);
        } else {
            throw new Error('行范围格式无效，请使用如 "2-10" 的格式');
        }
    }

    // 获取标题行
    const headerRow = worksheet.getRow(1);
    headers = headerRow.values;

 
    // 读取指定范围内的数据
    for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        if (row.hasValues) {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                const header = headers[colNumber];
                const cellValue = getCellValue(cell);
                console.log( {cellValue})
                if (header) {
                    if (header === '公司名称') {
                        rowData[header] = (cellValue && cellValue.toString().trim()) ? cellValue.toString().trim() : '';
                    } else {
                        rowData[header] = cellValue;
                    }
                }
            });

            jsonData.push(rowData);
        }
    }

    log(`成功读取 ${jsonData.length} 条数据`);
    console.log({jsonData})
    return jsonData;
}

// 修改fillTemplate函数
async function fillTemplate(invoiceInfo, invoiceItems, invoiceTemplateFile, itemsTemplateFile) {
    try {
        const fillSheet = (worksheet, data, startRow) => {
            log(`开始填充数据，起始行: ${startRow}`);
            
            // 1. 首先复制模板中的所有公式
            const formulaCells = [];
            worksheet.eachRow((row, rowNumber) => {
                row.eachCell((cell, colNumber) => {
                    if (cell.formula) {
                        formulaCells.push({
                            row: rowNumber,
                            col: colNumber,
                            formula: cell.formula
                        });
                    }
                });
            });
            
            // 2. 填充数据
            const headers = Object.keys(data[0]);
            data.forEach((rowData, index) => {
                const rowNumber = index + startRow;
                const row = worksheet.getRow(rowNumber);
                
                // 清除目标行的所有内容和公式
                row.eachCell((cell) => {
                    cell.value = null;
                    cell.formula = null;
                });
                
                // 填充数据
                headers.forEach((key, colIndex) => {
                    const cell = row.getCell(colIndex + 1);
                    const value = rowData[key];
                    
                    // 设置单元格值
                    if (typeof value === 'number') {
                        cell.value = value;   
                    } else {
                        cell.value = value;
                    }
                });
                
                // 提交行的更改
                row.commit();
            });
            
            // 3. 重新应用公式（如果需要）
            formulaCells.forEach(({row, col, formula}) => {
                if (row >= startRow) {
                    const targetRow = worksheet.getRow(row);
                    const cell = targetRow.getCell(col);
                    try {
                        cell.formula = formula;
                        targetRow.commit();
                    } catch (e) {
                        log(`警告：无法在单元格 ${col}${row} 应用公式: ${e.message}`);
                    }
                }
            });
        }

        // 处理开票信息表
        log('正在处理开票信息表...');
        const workbook1 = new ExcelJS.Workbook();
        await workbook1.xlsx.load(invoiceTemplateFile);
        const worksheet1 = workbook1.worksheets[0];
        
        // 在填充数据前先解除所有共享公式
        worksheet1.eachRow((row) => {
            row.eachCell((cell) => {
                if (cell.sharedFormula) {
                    cell.sharedFormula = undefined;
                }
            });
            row.commit();
        });
        
        fillSheet(worksheet1, invoiceInfo, 4);

        // 处理商品明细表
        log('正在处理商品明细表...');
        const workbook2 = new ExcelJS.Workbook();
        await workbook2.xlsx.load(itemsTemplateFile);
        const worksheet2 = workbook2.worksheets[0];
        
        // 在填充数据前先解除所有共享公式
        worksheet2.eachRow((row) => {
            row.eachCell((cell) => {
                if (cell.sharedFormula) {
                    cell.sharedFormula = undefined;
                }
            });
            row.commit();
        });
        
        fillSheet(worksheet2, invoiceItems, 4);

        // 生成文件名并下载
        const date = new Date();
        const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;

        // 下载两个文件
        await downloadWorkbook(workbook1, `开票信息_${dateStr}.xlsx`);
        await downloadWorkbook(workbook2, `商品明细_${dateStr}.xlsx`);

    } catch (error) {
        const errorMsg = `填充模板失败: ${error.message}`;
        log(errorMsg);
        throw new Error(errorMsg);
    }
}

// 添加下载工作簿的辅助函数
async function downloadWorkbook(workbook, fileName) {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    log(`文件 ${fileName} 已导出`);
}

// 修改handleFiles函数
async function handleFiles(customersFile, invoicesFile, itemsFile, invoiceTemplateInput, itemsTemplateInput) {
    if (isProcessing) {
        alert('正在处理中，请稍候...');
        return;
    }

    try {
        isProcessing = true;
        updateProcessButtonStatus(true);
        log('开始处理文件...');

        const sheetName = document.getElementById('sheetName').value.trim();
        let rowRange = document.getElementById('rowRange').value.trim();

        // 如果没有输入行范围，默认使用 "2-2"
        if (!rowRange) {
            rowRange = "2-2";
            log('未指定行范围，使用默认值: 2-2');
        }

        // 使用存储的数据或上传的文件
        log('正在读取客户数据...');
        const finalCustomersData = customersData || await readExcelFile(customersFile);

        log('正在读取发票数据...');
        const invoicesData = await readExcelFile(invoicesFile, sheetName, rowRange);

        log('正在读取项目数据...');
        const finalItemsData = itemsData || await readExcelFile(itemsFile);

        log('所有文件读取完成，开始处理数据...');

        // 使用 data-processor.js 中的 processInvoiceData
        const { result1, result2 } = processInvoiceData(finalCustomersData, invoicesData, finalItemsData);

        log('数据处理完成，开始生成文件...');

        // 使用实际的模板文件（优先使用新上传的，否则使用存储的）
        const finalInvoiceTemplate = invoiceTemplateInput || invoiceTemplateFile;
        const finalItemsTemplate = itemsTemplateInput || itemsTemplateFile;
        
        if (!finalInvoiceTemplate || !finalItemsTemplate) {
            throw new Error('请确保两个模板文件都已上传或已存储');
        }

        await fillTemplate(result1, result2, finalInvoiceTemplate, finalItemsTemplate);

        log('处理完成！');
    } catch (error) {
        const errorMsg = `处理文件时出错: ${error.message}`;
        log(errorMsg);
        alert(errorMsg);
    } finally {
        isProcessing = false;
        updateProcessButtonStatus(false);
    }
}

// 修改handleProcessButtonClick函数
async function handleProcessButtonClick() {
    const customersFile = document.getElementById('customersFile').files[0];
    const invoicesFile = document.getElementById('invoicesFile').files[0];
    const itemsFile = document.getElementById('itemsFile').files[0];
    const invoiceTemplateInput = document.getElementById('invoiceTemplateFile').files[0];
    const itemsTemplateInput = document.getElementById('itemsTemplateFile').files[0];

    if (!invoicesFile) {
        alert('请上传开票信息文件');
        return;
    }

    if (!customersData && !customersFile) {
        alert('请上传客户信息文件或确保已有存储的客户数据');
        return;
    }

    if (!itemsData && !itemsFile) {
        alert('请上传项目信息文件或确保已有存储的项目数据');
        return;
    }

    if ((!invoiceTemplateFile && !invoiceTemplateInput) || 
        (!itemsTemplateFile && !itemsTemplateInput)) {
        alert('请确保两个模板文件都已上传或已存储');
        return;
    }

    await handleFiles(customersFile, invoicesFile, itemsFile, 
        invoiceTemplateInput, itemsTemplateInput);
}

//log

function log(message) {
    const logElement = document.getElementById('log');
    if (logElement) {
        const timestamp = new Date().toLocaleTimeString();
        logElement.innerHTML += `[${timestamp}] ${message}<br>`;
        logElement.scrollTop = logElement.scrollHeight;
    }
    console.log(message);
}

// 模板文件管理函数
async function saveTemplateFile(type) {
    try {
        const fileId = type === 'items' ? 'itemsTemplateFile' : 'invoiceTemplateFile';
        const fileInput = document.getElementById(fileId);
        const file = fileInput.files[0];
        if (!file) {
            alert('请先选择模板文件');
            return;
        }

        log(`正在保存${type === 'items' ? '商品明细' : '开票信息'}模板文件...`);
        if (await DataStorage.saveTemplateFile(file, type)) {
            if (type === 'items') {
                itemsTemplateFile = file;
            } else {
                invoiceTemplateFile = file;
            }
            alert('模板文件保存成功！');
            updateStatus();
            log('模板文件保存成功');
        } else {
            throw new Error('保存失败');
        }
    } catch (error) {
        const errorMsg = '保存模板文件失败：' + error.message;
        alert(errorMsg);
        log(errorMsg);
    }
}

function clearTemplateFile(type) {
    const templateType = type === 'items' ? '商品明细' : '开票信息';
    if (confirm(`确定要清除保存的${templateType}模板文件吗？`)) {
        try {
            DataStorage.clearTemplateFile(type);
            if (type === 'items') {
                itemsTemplateFile = null;
            } else {
                invoiceTemplateFile = null;
            }
            updateStatus();
            log(`${templateType}模板文件已清除`);
            alert(`${templateType}模板文件已清除`);
        } catch (error) {
            const errorMsg = `清除${templateType}模板文件失败：` + error.message;
            alert(errorMsg);
            log(errorMsg);
        }
    }
}

// 添加处理按钮状态更新函数
function updateProcessButtonStatus(processing) {
    const button = document.getElementById('processButton');
    if (processing) {
        button.textContent = '处理中...';
        button.disabled = true;
        button.style.backgroundColor = '#95a5a6';
    } else {
        button.textContent = '转换并下载';
        button.disabled = false;
        button.style.backgroundColor = '#3498db';
    }
}
