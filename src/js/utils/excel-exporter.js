/**
 * Excel文件导出工具
 * 负责将处理后的数据导出为Excel文件
 */
class ExcelExporter {
    /**
     * 导出处理结果为Excel文件
     */
    static async exportResults(result1, result2, filename = '发票数据') {
        try {
            const workbook = new ExcelJS.Workbook();
            
            // 创建发票信息工作表
            const invoiceSheet = workbook.addWorksheet('发票信息');
            if (result1.length > 0) {
                const headers = Object.keys(result1[0]);
                invoiceSheet.addRow(headers);
                
                result1.forEach(row => {
                    const values = headers.map(header => row[header]);
                    invoiceSheet.addRow(values);
                });
                
                // 设置表头样式
                this.styleHeaders(invoiceSheet, headers.length);
            }
            
            // 创建发票明细工作表
            const detailSheet = workbook.addWorksheet('发票明细');
            if (result2.length > 0) {
                const headers = Object.keys(result2[0]);
                detailSheet.addRow(headers);
                
                result2.forEach(row => {
                    const values = headers.map(header => row[header]);
                    detailSheet.addRow(values);
                });
                
                // 设置表头样式
                this.styleHeaders(detailSheet, headers.length);
            }
            
            // 生成文件并下载
            const buffer = await workbook.xlsx.writeBuffer();
            this.downloadFile(buffer, `${filename}.xlsx`);
            
            Logger.success(`文件 ${filename}.xlsx 导出成功`);
            
        } catch (error) {
            Logger.error(`导出文件失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 设置表头样式
     */
    static styleHeaders(worksheet, columnCount) {
        const headerRow = worksheet.getRow(1);
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
}

// 导出到全局作用域
window.ExcelExporter = ExcelExporter;