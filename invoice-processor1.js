// 注意：这个脚本假设已经通过CDN加载了XLSX库

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

    // 按购方名称和商品名称排序
    // invoicesData.sort((a, b) => {
    //     if (a['购方名称'] !== b['购方名称']) {
    //         return a['购方名称'].localeCompare(b['购方名称']);
    //     }
    //     return a['商品名称'].localeCompare(b['商品名称']);
    // });


    invoicesData.forEach(invoice => {
        const customerName = invoice['购方名称'] || '';
        let matchedCustomer = null;

        // 查找匹配的客户
        for (const [fullName, customerInfo] of Object.entries(customerMap)) {
            if (fullName.includes(customerName) ) {
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
            "数量": invoice['数量'],
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

    //sort result2
    
    result2.sort((a,b)=>{
        return a["发票流水号"].localeCompare(b["发票流水号"])
   })

    return { result1, result2 };
}

// 读取Excel文件并转换为JSON数据
function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
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
        const customersData = await readExcelFile(customersFile);
        const invoicesData = await readExcelFile(invoicesFile);
        const itemsData = await readExcelFile(itemsFile);

        const { result1, result2 } = processInvoiceData(customersData, invoicesData, itemsData);

        // 生成并下载结果文件
        downloadExcel(result1, 'result1.xlsx');
        downloadExcel(result2, 'result2.xlsx');

        console.log("处理完成，结果已生成并开始下载");
    } catch (error) {
        console.error('处理文件时发生错误:', error);
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