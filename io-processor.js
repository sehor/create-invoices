// 文件读取函数
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
                        const cellValue = getCellValue(cell);
                        rowData[header] = (cellValue && cellValue.toString().trim()) ? cellValue.toString().trim() : lastCustomerName;
                        if (cellValue && cellValue.toString().trim()) {
                            lastCustomerName = cellValue.toString().trim();
                        }
                    } else {
                        rowData[header] = getCellValue(cell);
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

