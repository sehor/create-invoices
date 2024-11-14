const generateInvoiceNumber = (customerName) => {
    const min = -9999;
    const max = 9999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const hash = customerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return randomNum.toString() + hash.toString();
}

const generateResult1Entry = (invoiceNumber, matchedCustomer) => {
    // 生成 result1 记录
    const result1Entry = {
        "发票流水号": invoiceNumber,
        "发票类型": "增值税专用发票",
        "特定业务类型": "",
        "是否含税": "是",
        "受票方自然人标识": "",
        "购买方名称": matchedCustomer['客户名称'] || matchedCustomer['公司名称'] || '',
        "购买方纳税人识别号": matchedCustomer['统一社会信用代码/纳税人识别号'] || '',
        "购买方证件类型": "",
        "购买方证件号码": "",
        "购买方国籍（或地区）": "",
        "购买方地址": matchedCustomer['地址'] || '',
        "购买电话": matchedCustomer['电话'] || '',
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
    return result1Entry;
}

const generateResult2Entry = (invoiceNumber, invoice, itemInfo) => {
    // 确保数量是数字
    let amount = invoice['数量'];
    if (typeof amount === 'string') {
        // 移除所有逗号和空格
        amount = amount.replace(/[,\s]/g, '');
        // 转换为数字，并保留4位小数
        amount = parseFloat(parseFloat(amount).toFixed(4)) || 0;
    } else if (typeof amount !== 'number') {
        amount = 0;
    }

    // 确保单价是数字
    let price = invoice['单价'];
    if (typeof price === 'string') {
        price = price.replace(/[,\s]/g, '');
        // 转换为数字，并保留8位小数
        price = parseFloat(parseFloat(price).toFixed(8)) || 0;
    } else if (typeof price !== 'number') {
        price = 0;
    }

    // 计算金额：数量 * 单价，保留2位小数
    const total = parseFloat((amount * price).toFixed(2));

    // 处理折扣金额
    let discount = invoice['折扣金额'];
    if (typeof discount === 'string') {
        discount = discount.replace(/[,\s]/g, '');
        discount = parseFloat(discount) || 0;
    } else if (typeof discount !== 'number') {
        discount = 0;
    }

    // 打印调试信息
    console.log(`计算明细：数量=${amount}, 单价=${price}, 金额=${total}`);

    return {
        "发票流水号": invoiceNumber,
        "项目名称": invoice['品名'] || '',
        "商品和服务税收编码": itemInfo ? itemInfo['商品和服务税收分类编码'] : "",
        "规格型号": invoice['规格'] || '',
        "单位": invoice['单位'] || '',
        "数量": amount,  // 确保是数字
        "单价": price,   // 确保是数字
        "金额": total,   // 确保是数字
        "税率": itemInfo ? parseFloat(itemInfo['税率/征收率']) : 0.13,
        "折扣金额": discount,  // 确保是数字
        "是否使用优惠政策": "",
        "优惠政策类型": "",
        "即征即退类型": ""
    }
}

function processInvoiceData(customersData, invoicesData, itemsData) {
    const result1 = [];
    const result2 = [];
    const processedCustomers = new Set();  // 用于跟踪已处理的客户

    console.log(`开始处理发票数据，客户数据共 ${customersData.length} 条`);

    // 按客户名称分组处理发票数据
    const invoiceGroups = {};
    invoicesData.forEach(invoice => {
        const shortName = invoice['公司名称'];
        if (!invoiceGroups[shortName]) {
            invoiceGroups[shortName] = [];
        }
        invoiceGroups[shortName].push(invoice);
    });

    // 处理每个客户组
    Object.entries(invoiceGroups).forEach(([shortName, invoices]) => {
        console.log(`处理客户 "${shortName}" 的发票，共 ${invoices.length} 条`);
        
        // 查找匹配的客户信息
        const matchedCustomer = customersData.find(customer => 
            customer['客户名称'].includes(shortName)
        ) || { '客户名称': shortName };

        console.log(`找到匹配客户: ${matchedCustomer['客户名称']}`);

        // 为这个客户生成一个发票流水号
        const invoiceNumber = generateInvoiceNumber(matchedCustomer['客户名称']);

        // 只生成一条result1记录
        result1.push(generateResult1Entry(invoiceNumber, matchedCustomer));

        // 为每个发票项生成result2记录
        invoices.forEach(invoice => {
            const itemInfo = itemsData.find(item => item['项目名称'] === invoice['品名']);
            result2.push(generateResult2Entry(invoiceNumber, invoice, itemInfo));
        });
    });

    console.log(`处理完成，生成了 ${result1.length} 条客户记录和 ${result2.length} 条商品记录`);
    return { result1, result2 };
}