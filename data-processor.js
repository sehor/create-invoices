const generateInvoiceNumber = (customerName) => {
    // 生成一个大范围的随机数（-99999到99999之间）
    const min = -9999;
    const max = 9999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    //hash the customerName to a number
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
        "购买方名称": matchedCustomer['客户名称'] || '',
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
        "经办人自然人纳税人识别号": "",
        "放弃享受减按1%征收率原因": "",
        "收款人": "张宗兵",
        "复核人": "张珂珂"
    };
    return result1Entry;
}

const generateResult2Entry = (invoiceNumber, invoice, itemInfo) => {
    const amount = typeof invoice['数量'] != 'string' ?
    invoice['数量'] :
    invoice['数量'].replace(/,/g, '');
    const price = invoice['单价'];
    const total = (parseFloat(amount) * parseFloat(price)).toFixed(2);

    return {
        "发票流水号": invoiceNumber,
        "项目名称": invoice['品名'],
        "商品和服务税收编码": itemInfo ? itemInfo['商品和服务税收分类编码'] : "",
        "规格型号": invoice['规格'],
        "单位": invoice['单位'],
        "数量": amount,
        "单价": price,
        "金额": parseFloat(total),
        "税率": itemInfo ? parseFloat(itemInfo['税率/征收率']) : 0.13,
        "折扣金额": invoice['折扣金额'],
        "是否使用优惠政策": "",
        "优惠政策类型": "",
        "即征即退类型": ""
    }

}

function processInvoiceData(customersData, invoicesData, itemsData) {
    log('开始处理发票数据...');
    log(`输入数据统计: 客户数据 ${customersData.length} 条, 发票数据 ${invoicesData.length} 条, 商品编码 ${itemsData.length} 条`);

    const result1 = [];
    const result2 = [];
    
    // 创建客户名称到完整信息的映射
    log('创建客户信息映射...');
    const customerMap = {};
    customersData.forEach(customer => {
        const fullName = customer['客户名称'].trim();
        customerMap[fullName] = customer;
       
    });

    //create a map <customerName, [invoice]>, if the customerName is empty, use the previous customerName
    log('开始处理发票分组...');
    const customerInvoicesMap = new Map();
    let currentCustomerName = null;
    
    invoicesData.forEach((invoice, index) => {
        const customerName = invoice['公司名称'];
        log(`处理第 ${index + 1} 条发票记录, 客户名称: ${customerName || '空'}`);
        
        if (index === 0 && (!customerName || customerName.trim() === '')) {
            const error = '第一行客户不能为空';
            log(`错误: ${error}`);
            throw new Error(error);
        }
        
        if (customerInvoicesMap.has(customerName)) {
            customerInvoicesMap.get(customerName).push(invoice);
        } else {
            customerInvoicesMap.set(customerName, [invoice]);
        } 
        log(`将发票添加到客户 ${customerName} 的发票组: ${customerInvoicesMap.get(customerName).length} 条`);
    });

    //find matchedCustomer
    const findMatchedCustomer = (customerName) => {
        log(`查找客户信息: "${customerName}"`);
        for (const [fullName, customerInfo] of Object.entries(customerMap)) {
            if (fullName.includes(customerName)) {
                log(`找到匹配客户: ${fullName}`);
                return customerInfo;
            }
        }
        log(`未找到匹配客户，使用默认信息: ${customerName}`);
        return { '客户名称': customerName };
    }

    log('开始生成发票记录...');
    for (const [customerName, invoices] of customerInvoicesMap) {
        log(`处理客户 "${customerName}" 的发票，共 ${invoices.length} 条记录`);
        
        //生成发票流水号
        const invoiceNumber = generateInvoiceNumber(customerName);
        log(`生成发票流水号: ${invoiceNumber}`);

        //生成一条result1记录
        const matchedCustomer = findMatchedCustomer(customerName);
        result1.push(generateResult1Entry(invoiceNumber, matchedCustomer));
        log(`生成发票基础信息记录完成`);

        //生成相关客户的result2记录
        for (const invoice of invoices) {
            const itemInfo = itemsData.find(item => item['项目名称'] === invoice['品名']);
            log(`处理商品 "${invoice['品名']}", ${itemInfo ? '找到' : '未找到'}税收编码信息`);
            result2.push(generateResult2Entry(invoiceNumber, invoice, itemInfo));
        }
    }

    log(`数据处理完成！生成了 ${result1.length} 条发票记录和 ${result2.length} 条商品明细`);
    return { result1, result2 };
}