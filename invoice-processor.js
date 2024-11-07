let customersData = null;
let itemsData = null;
let templateFile = null;
let isProcessing = false;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 加载保存的数据
        customersData = DataStorage.getCustomersData();
        itemsData = DataStorage.getItemsData();
        templateFile = await DataStorage.getTemplateFile();

        updateStatus();

        // 添加事件监听器
        document.getElementById('saveCustomersData').addEventListener('click', saveCustomersData);
        document.getElementById('saveItemsData').addEventListener('click', saveItemsData);
        document.getElementById('saveTemplateFile').addEventListener('click', saveTemplateFile);
        document.getElementById('clearCustomersData').addEventListener('click', clearCustomersData);
        document.getElementById('clearItemsData').addEventListener('click', clearItemsData);
        document.getElementById('clearTemplateFile').addEventListener('click', clearTemplateFile);
        document.getElementById('processButton').addEventListener('click', handleProcessButtonClick);
    } catch (error) {
        console.error('初始化失败:', error);
        log('初始化失败: ' + error.message);
    }
});

function updateStatus() {
    const customersStatus = document.getElementById('customersStatus');
    const itemsStatus = document.getElementById('itemsStatus');
    const templateStatus = document.getElementById('templateStatus');

    customersStatus.textContent = customersData ? '已加载客户数据' : '无存储数据';
    itemsStatus.textContent = itemsData ? '已加载项目数据' : '无存储数据';
    templateStatus.textContent = templateFile ? `已加载模板: ${templateFile.name}` : '无存储模板';
}

async function saveCustomersData() {
    const file = document.getElementById('customersFile').files[0];
    if (!file) {
        alert('请先选择客户信息文件');
        return;
    }

    try {
        customersData = await IOProcessor.readExcelFile(file);
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

    // 记录上一个有效的客户名称
    let lastCustomerName = '';

    // 读取指定范围内的数据
    for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        if (row.hasValues) {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                const header = headers[colNumber];
                if (header) {
                    if (header === '购方名称') {
                        const cellValue = cell.value;
                        rowData[header] = (cellValue && cellValue.trim()) ? cellValue.trim() : lastCustomerName;
                        if (cellValue && cellValue.trim()) {
                            lastCustomerName = cellValue.trim();
                        }
                    } else {
                        rowData[header] = cell.value;
                    }
                }
            });

            if (!rowData['购方名称']) {
                rowData['购方名称'] = lastCustomerName;
            }

            jsonData.push(rowData);
        }
    }

    log(`成功读取 ${jsonData.length} 条数据`);
    return jsonData;
}

// 修改downloadExcel函数为fillTemplate函数
async function fillTemplate(result1, result2, templateFile) {
    try {
        const fillSheet = (worksheet, result, startRow) => {
            const headers = Object.keys(result[0]);
            result.forEach((rowData, index) => {
                const rowNumber = index + startRow;
                const row = worksheet.getRow(rowNumber);
                headers.forEach((key, colIndex) => {
                    const value = rowData[key];
                    row.getCell(colIndex + 1).value = value;
                    if (typeof value === 'number') {
                        row.getCell(colIndex + 1).numFmt = '#,##0.00';
                    }
                });
                row.commit();
                log(`写入第一个文件第 ${rowNumber} 行，流水号: ${rowData['发票流水号']}`);
            });
        }
        const downloadFile = async (workbook, fileName) => {
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
        }

        log('开始填充模板...');
        // 处理第一个文件（result1）
        log('正在处理开票信息表...');
        const workbook1 = new ExcelJS.Workbook();
        await workbook1.xlsx.load(templateFile);
        const worksheet1 = workbook1.worksheets[0];

        log(`开始填充第一个文件的数据，数据条数：${result1.length}`);
        fillSheet(worksheet1, result1, 4);
        log('第一个文件填充完成');

        log('正在处理商品明细表...');
        const workbook2 = new ExcelJS.Workbook();
        await workbook2.xlsx.load(templateFile);
        const worksheet2 = workbook2.worksheets[0];
        log('开始填充第二个文件的数据，数据条数：${result2.length}');
        fillSheet(worksheet2, result2, 4);
        log('第二个文件填充完成');


        // 生成带日期的文件名
        const date = new Date();
        const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        const originalName = templateFile.name.replace('.xlsx', '');

        // 导出第一个文件
        await downloadFile(workbook1, `${originalName}_开票信息_${dateStr}.xlsx`);
        log(`第一个文件导出完成: ${originalName}_开票信息_${dateStr}.xlsx`);

      
        // 导出第二个文件
        await downloadFile(workbook2, `${originalName}_商品明细_${dateStr}.xlsx`);
        log(`第二个文件导出完成: ${originalName}_商品明细_${dateStr}.xlsx`);

    } catch (error) {
        const errorMsg = `填充模板失败: ${error.message}`;
        log(errorMsg);
        throw new Error(errorMsg);
    }
}

// 修改 handleFiles 函数，添加默认行范围和加载状态
async function handleFiles(customersFile, invoicesFile, itemsFile, templateFileInput) {
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

        // 使用实际的模板文件���优先使用新上传的，否则使用存储的）
        const finalTemplateFile = templateFileInput || templateFile;
        if (!finalTemplateFile) {
            throw new Error('未找到模板文件');
        }

        await fillTemplate(result1, result2, finalTemplateFile);

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

// 保持 handleProcessButtonClick 函数作为主要的处理入口
async function handleProcessButtonClick() {
    const customersFile = document.getElementById('customersFile').files[0];
    const invoicesFile = document.getElementById('invoicesFile').files[0];
    const itemsFile = document.getElementById('itemsFile').files[0];
    const templateFileInput = document.getElementById('templateFile').files[0];

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

    if (!templateFile && !templateFileInput) {
        alert('请上传模板文件或确保已有存储的模板');
        return;
    }

    await handleFiles(customersFile, invoicesFile, itemsFile, templateFileInput);
}

//log

function log(message) {
    const logElement = document.getElementById('log');
    logElement.innerHTML += message + '<br>';
    console.log(message);
}

// 模板文件管理函数
async function saveTemplateFile() {
    try {
        const fileInput = document.getElementById('templateFile');
        const file = fileInput.files[0];
        if (!file) {
            alert('请先选择模板文件');
            return;
        }

        log('正在保存模板文件...');
        if (await DataStorage.saveTemplateFile(file)) {
            templateFile = file;
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

function clearTemplateFile() {
    if (confirm('确定要清除保存的模板文件吗？')) {
        try {
            DataStorage.clearTemplateFile();
            templateFile = null;
            updateStatus();
            log('模板文件已清除');
            alert('模板文件已清除');
        } catch (error) {
            const errorMsg = '清除模板文件失败：' + error.message;
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
