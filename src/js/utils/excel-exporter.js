/**
 * Excel文件导出工具
 * 负责将处理后的数据导出为Excel文件
 */
// result1 and result2 fields to excel titles map
const result1FieldsToTitles = {
    '发票流水号': '发票流水号',
    '发票类型': '发票类型',
    '特定业务类型': '特定业务类型',
    '购买方电话': '购买方电话',
    '是否含税': '是否含税',
    '受票方自然人标识': '受票方自然人标识',
    '购买方名称': '购买方名称',
    '购买方纳税人识别号': '购买方纳税人识别号',
    '购买方证件类型': '购买方证件类型',
    '购买方证件号码': '购买方证件号码',
    '购买方国籍（或地区）': '购买方国籍（或地区）',
    '购买方地址': '购买方地址',
    '购买方所在地区（报废产品收购必填）': '购买方所在地区（报废产品收购必填）',
    '购买方详细地址（报废产品收购必填）': '购买方详细地址（报废产品收购必填）',
    '购买方开户银行': '购买方开户银行',
    '购买方银行账号': '购买方银行账号',
    '是否展示购买方地址电话银行账号': '是否展示购买方地址电话银行账号',
    '备注': '备注',
    '报废产品销售类型': '报废产品销售类型',
    '干基全硫': '干基全硫',
    '干燥无灰基挥发分': '干燥无灰基挥发分',
    '销售方开户行': '销售方开户行',
    '销售方银行账号': '销售方银行账号',
    '是否展示销售方地址电话银行账号': '是否展示销售方地址电话银行账号',
    '购买方邮箱': '购买方邮箱',
    '购买方经办人姓名': '购买方经办人姓名',
    '购买方经办人证件类型': '购买方经办人证件类型',
    '购买方经办人证件号码': '购买方经办人证件号码',
    '经办人国籍(地区)': '经办人国籍(地区)',
    '经办人自然人纳税人识别号': '经办人自然人纳税人识别号',
    '收款人': '收款人',
    '复核人': '复核人'
}
const result2FieldsToTitles = {
    '发票流水号': '发票流水号',
    '项目名称': '项目名称',
    '商品和服务税收编码': '商品和服务税收编码',
    '规格型号': '规格型号',
    '单位': '单位',
    '数量': '数量',
    '单价': '单价',
    '金额': '金额',
    '税率': '税率',
    '折扣金额': '折扣金额'
}

class ExcelExporter {
    /**
     * 导出处理结果为Excel文件
     */
    static async exportResults(result1, result2, filename = '发票处理结果') {
        try {
            // 1) 基于模板加载工作簿（优先使用用户上传）
            const workbook = await this.loadTemplateWorkbook();
            const { sheet1, sheet2, chosen1, chosen2 } = this.pickTargetWorksheets(workbook);
            if (!sheet1 || !sheet2) {
                throw new Error('未找到目标工作表：需要 "1-发票基本信息" 和 "2-发票明细信息"');
            }

            // 2) 自动识别表头行并解析列号（根据映射与模板表头）
            const startRowNumber = 4;  // 从第4行开始写入
            const candidates = [3, 2, 4];

            const auto1 = this.resolveColumnIndexMapAutoHeader(sheet1, candidates, result1FieldsToTitles);
            const auto2 = this.resolveColumnIndexMapAutoHeader(sheet2, candidates, result2FieldsToTitles);

            // 3) 写入数据（不生成表头，按列号写入）
            this.writeDataRows(sheet1, startRowNumber, result1 || [], auto1.fieldToCol);
            this.writeDataRows(sheet2, startRowNumber, result2 || [], auto2.fieldToCol);

            // 4) 输出并下载
            const buffer = await workbook.xlsx.writeBuffer();
            this.downloadFile(buffer, `${filename}.xlsx`);
            Logger.log(`工作表1(${chosen1.name}, 状态:${chosen1.state}) 表头行: ${auto1.headerRow}; 匹配列数: ${auto1.matchedCount}`);
            Logger.log(`工作表2(${chosen2.name}, 状态:${chosen2.state}) 表头行: ${auto2.headerRow}; 匹配列数: ${auto2.matchedCount}`);
            Logger.success(`文件 ${filename}.xlsx 导出成功`);
        } catch (error) {
            Logger.error(`导出文件失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 设置表头样式
     */
    static styleHeaders(worksheet, columnCount, headerRowNumber = 1) {
        const headerRow = worksheet.getRow(headerRowNumber);
        headerRow.font = { bold: true };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };
        
        // 自动调整列宽
        for (let i = 1; i <= columnCount; i++) {
            const column = worksheet.getColumn(i);
            column.width = 15;
        }
    }

    /**
     * 下载文件
     */
    static downloadFile(buffer, filename) {
        const blob = new Blob([buffer], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(url);
    }

    /**
     * 加载模板工作簿：优先使用已上传模板，否则使用默认模板
     */
    static async loadTemplateWorkbook() {
        const workbook = new ExcelJS.Workbook();

        const base64 = DataStorage.getTemplateData && DataStorage.getTemplateData();
        if (base64) {
            const bytes = this.base64ToUint8Array(base64);
            await workbook.xlsx.load(bytes);
            return workbook;
        }

        // 无上传模板时，直接提示用户上传模板
        throw new Error('未检测到开票模板，请先在“开票模板文件”处上传模板');
    }

    /**
     * Base64 -> Uint8Array
     */
    static base64ToUint8Array(base64) {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    /**
     * 选择目标工作表：优先按照名称定位，忽略隐藏表顺序
     */
    static pickTargetWorksheets(workbook) {
        const names = workbook.worksheets.map(ws => ws.name);
        const wanted1 = ['1-发票基本信息', '发票基本信息'];
        const wanted2 = ['2-发票明细信息', '发票明细信息', '明细信息'];

        const findByNames = (candidates) => {
            // 精确匹配（忽略大小写与前后空格）
            for (const name of candidates) {
                const target = workbook.worksheets.find(ws => this.normalizeTitleValue(ws.name).toLowerCase() === name.toLowerCase());
                if (target) return target;
            }
            // 包含匹配
            for (const name of candidates) {
                const target = workbook.worksheets.find(ws => this.normalizeTitleValue(ws.name).toLowerCase().includes(name.toLowerCase()));
                if (target) return target;
            }
            return null;
        };

        let sheet1 = findByNames(wanted1);
        let sheet2 = findByNames(wanted2);

        // 回退到可见工作表的前两个（若名称未找到）
        const visibleSheets = workbook.worksheets.filter(ws => (ws.state || 'visible') === 'visible');
        if (!sheet1) sheet1 = visibleSheets[0] || workbook.worksheets[0];
        if (!sheet2) {
            // 尝试选择第二个可见表；若只有一个可见，则选下一个存在的
            sheet2 = visibleSheets[1] || workbook.worksheets[1];
        }

        const chosen1 = { name: sheet1 ? sheet1.name : 'N/A', state: sheet1 ? (sheet1.state || 'visible') : 'N/A' };
        const chosen2 = { name: sheet2 ? sheet2.name : 'N/A', state: sheet2 ? (sheet2.state || 'visible') : 'N/A' };
        Logger.log(`选中的工作表1: ${chosen1.name} (状态:${chosen1.state})`);
        Logger.log(`选中的工作表2: ${chosen2.name} (状态:${chosen2.state})`);
        return { sheet1, sheet2, chosen1, chosen2 };
    }

    /**
     * 根据标题行解析字段的列号映射
     */
    static resolveColumnIndexMap(worksheet, headerRowNumber, fieldsToTitles, options = {}) {
        const { silentWarnings = false } = options;
        const titleToIndex = this.buildTitleToIndex(worksheet, headerRowNumber);
        const fieldToCol = {};
        let matchedCount = 0;
        const missingTitles = [];
        Object.keys(fieldsToTitles).forEach(field => {
            const title = fieldsToTitles[field];
            const colIndex = titleToIndex[title];
            if (colIndex === undefined) {
                if (!silentWarnings) missingTitles.push(title);
            } else {
                fieldToCol[field] = colIndex;
                matchedCount++;
            }
        });
        if (!silentWarnings && missingTitles.length > 0) {
            if (Logger && Logger.warn) Logger.warn(`模板表头未匹配列数: ${missingTitles.length}`);
            if (Logger && Logger.warn) Logger.warn(`未匹配标题: ${missingTitles.join(', ')}`);
        }
        return { fieldToCol, matchedCount };
    }

    /**
     * 自动选择最佳表头行并解析列号
     */
    static resolveColumnIndexMapAutoHeader(worksheet, candidateRows, fieldsToTitles) {
        let best = { headerRow: candidateRows[0], score: -1, fieldToCol: {}, matchedCount: 0 };
        for (const rowNum of candidateRows) {
            const { fieldToCol, matchedCount } = this.resolveColumnIndexMap(worksheet, rowNum, fieldsToTitles, { silentWarnings: true });
            if (matchedCount > best.score) {
                best = { headerRow: rowNum, score: matchedCount, fieldToCol, matchedCount };
            }
        }
        // 对最终选中的行再执行一次解析并输出缺失列汇总
        const final = this.resolveColumnIndexMap(worksheet, best.headerRow, fieldsToTitles, { silentWarnings: false });
        return { headerRow: best.headerRow, fieldToCol: final.fieldToCol, matchedCount: final.matchedCount };
    }

    /**
     * 将指定行的标题构建为 title -> index 映射，包含规范化
     */
    static buildTitleToIndex(worksheet, headerRowNumber) {
        const headerRow = worksheet.getRow(headerRowNumber);
        const titleToIndex = {};
        const colCount = worksheet.columnCount || (headerRow.values ? headerRow.values.length : 0);
        for (let i = 1; i <= colCount; i++) {
            const cell = headerRow.getCell(i);
            const rawValue = cell.value;
            const valueTitle = this.normalizeTitleValue(rawValue);
            const textTitle = typeof cell.text === 'string' ? cell.text.trim() : '';
            // 优先采用 text，其次 value
            const finalTitle = textTitle || valueTitle;
            if (finalTitle) {
                titleToIndex[finalTitle] = i;
            }
        }
        return titleToIndex;
    }

    /**
     * 规范化单元格标题值（处理富文本、公式结果、去空白）
     */
    static normalizeTitleValue(val) {
        if (val === undefined || val === null) return '';
        if (typeof val === 'string') return val.trim();
        if (typeof val === 'number') return String(val);
        if (val && typeof val === 'object') {
            if (Array.isArray(val.richText)) {
                return val.richText.map(rt => rt.text || '').join('').trim();
            }
            if (typeof val.text === 'string') return val.text.trim();
            if (typeof val.result === 'string') return val.result.trim();
            if (typeof val.result === 'number') return String(val.result);
        }
        try { return String(val).trim(); } catch { return ''; }
    }

    /**
     * 将数据按列映射写入到工作表，从指定行开始
     */
    static writeDataRows(worksheet, startRowNumber, dataArray, fieldToColMap) {
        if (!Array.isArray(dataArray) || dataArray.length === 0) return;

        dataArray.forEach((rowObj, idx) => {
            const rowNumber = startRowNumber + idx;
            const row = worksheet.getRow(rowNumber);
            Object.keys(fieldToColMap).forEach(field => {
                const col = fieldToColMap[field];
                if (!col) return;
                row.getCell(col).value = rowObj[field];
            });
        });
    }

    /**
     * 调试：输出模板工作表与第二表表头信息
     */
    static async debugTemplateSheets() {
        const workbook = await this.loadTemplateWorkbook();
        const names = workbook.worksheets.map(ws => `${ws.name}${(ws.state||'visible')!=='visible' ? ' (hidden)' : ''}`);
        Logger.log(`模板工作表数量: ${workbook.worksheets.length}`);
        Logger.log(`工作表名称(含隐藏标记): ${names.join(', ')}`);
        const sheet2 = this.pickTargetWorksheets(workbook).sheet2 || null;
        if (!sheet2) {
            Logger.warn('未找到目标的第二个工作表（预期名称：2-发票明细信息）');
            return { sheetCount: workbook.worksheets.length, sheetNames: names };
        }
        const rowsToCheck = [2, 3, 4];
        rowsToCheck.forEach(rn => {
            const headerRow = sheet2.getRow(rn);
            const headers = (headerRow.values || []).map(v => this.normalizeTitleValue(v));
            Logger.log(`第二表第${rn}行表头: ${headers.filter(Boolean).join(' | ')}`);
        });
        return { sheetCount: workbook.worksheets.length, sheetNames: names, chosenSheet2: sheet2.name };
    }
}

// 导出到全局作用域
window.ExcelExporter = ExcelExporter;