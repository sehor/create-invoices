/**
 * 数据处理工具模块
 * 负责发票数据的业务逻辑处理
 */
class DataProcessor {
    /**
     * 生成发票号码
     */
    static generateInvoiceNumber(customerName) {
        const min = -9999;
        const max = 9999;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        const hash = customerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return randomNum.toString() + hash.toString();
    }

    /**
     * 生成发票基本信息记录
     */
    static generateInvoiceEntry(invoiceNumber, matchedCustomer) {
        return {
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
            "买方所在地区（报废产品收购必填）": "",
            "购买方详细地址（报废产品收购必填）": "",
            "购买电话": matchedCustomer['电话'] || '',
            "购买方开户银行": matchedCustomer['开户行名称'] || '',
            "购买方银行账号": matchedCustomer['银行账号'] || '',
            "是否展示购买方地址电话银行账号": "",
            "备注": "",
            "报废产品销售类型": "",
            "每千克煤炭发热量": "",
            "干基全硫": "",
            "干燥无灰基挥发分": "",
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
    }

    /**
     * 生成发票明细记录
     */
    static generateInvoiceDetailEntry(invoiceNumber, invoice, itemInfo) {
        // 确保数量是数字
        let amount = invoice['数量'];
        if (typeof amount === 'string') {
            amount = amount.replace(/[,\s]/g, '');
            amount = parseFloat(parseFloat(amount).toFixed(4)) || 0;
        } else if (typeof amount !== 'number') {
            amount = 0;
        }

        // 确保单价是数字
        let price = invoice['单价'];
        if (typeof price === 'string') {
            price = price.replace(/[,\s]/g, '');
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

        console.log(`计算明细：数量=${amount}, 单价=${price}, 金额=${total}`);

        return {
            "发票流水号": invoiceNumber,
            "项目名称": invoice['品名'] || '',
            "商品和服务税收编码": itemInfo ? itemInfo['商品和服务税收分类编码'] : "",
            "规格型号": invoice['规格'] || '',
            "单位": invoice['单位'] || '',
            "数量": amount,
            "单价": price,
            "金额": total,
            "税率": itemInfo ? parseFloat(itemInfo['税率/征收率']) : 0.13,
            "折扣金额": discount,
            "是否使用优惠政策": "",
            "优惠政策类型": "",
            "即征即退类型": ""
        };
    }

    /**
     * 处理发票数据主函数
     */
    static processInvoiceData(customersData, invoicesData, itemsData, useMergedCells = false) {
        // 验证输入数据
        this.validateInputData(customersData, invoicesData, itemsData);

        const result1 = [];
        const result2 = [];
        
        console.log(`开始处理发票数据，客户数据共 ${customersData.length} 条，发票数据共 ${invoicesData.length} 条，项目数据共 ${itemsData.length} 条`);

        // 按客户名称分组处理发票数据
        const invoiceGroups = this.groupInvoicesByCustomer(invoicesData, useMergedCells);
        
        // 处理每个分组
        for (const [groupKey, group] of Object.entries(invoiceGroups)) {
            this.processInvoiceGroup(group, customersData, itemsData, result1, result2);
        }

        console.log(`处理完成，生成 ${result1.length} 条发票记录，${result2.length} 条明细记录`);
        
        return { result1, result2 };
    }

    /**
     * 验证输入数据
     */
    static validateInputData(customersData, invoicesData, itemsData) {
        if (!customersData || !Array.isArray(customersData)) {
            throw new Error('客户数据无效或为空');
        }
        
        if (!invoicesData || !Array.isArray(invoicesData)) {
            throw new Error('发票数据无效或为空');
        }
        
        if (!itemsData) {
            console.warn('项目数据为空，将使用默认税率');
            itemsData = [];
        }

        if (!Array.isArray(itemsData)) {
            console.warn('项目数据不是数组，将转换为空数组并使用默认税率');
            itemsData = [];
        }
    }

    /**
     * 按客户分组发票数据
     */
    static groupInvoicesByCustomer(invoicesData, useMergedCells) {
        const invoiceGroups = {};
        let lastValidName = '';
        let currentGroupId = 0;
        
        if (useMergedCells) {
            // 公司名称+备注来分组
            invoicesData.forEach(invoice => {
                const shortName = invoice['公司名称'] ? invoice['公司名称'].split(' ')[0] : '';
                const remark = invoice['备注'] || '';
                const groupIdentifier = `${shortName}_${remark}`;
                
                if (shortName !== '') {
                    let existingGroupKey = null;
                    for (const [key, group] of Object.entries(invoiceGroups)) {
                        if (group.identifier === groupIdentifier) {
                            existingGroupKey = key;
                            break;
                        }
                    }
                    
                    if (existingGroupKey) {
                        invoiceGroups[existingGroupKey].invoices.push(invoice);
                        lastValidName = existingGroupKey;
                    } else {
                        currentGroupId++;
                        const groupKey = `group_${currentGroupId}`;
                        invoiceGroups[groupKey] = {
                            name: shortName,
                            identifier: groupIdentifier,
                            invoices: [invoice]
                        };
                        lastValidName = groupKey;
                    }
                } else if (lastValidName !== '') {
                    invoiceGroups[lastValidName].invoices.push(invoice);
                }
            });
        } else {
            // 按公司名称来分组
            invoicesData.forEach(invoice => {
                const shortName = invoice['公司名称'] ? invoice['公司名称'].split(' ')[0] : '';
                if (shortName !== '') {
                    lastValidName = shortName;     
                } else {
                    invoice['公司名称'] = lastValidName;
                }
            });
            
            invoicesData.forEach(invoice => {
                const shortName = invoice['公司名称'] ? invoice['公司名称'].split(' ')[0] : '';
                if (shortName === '') {
                    return;
                }
                
                let existingGroupKey = null;
                for (const [key, group] of Object.entries(invoiceGroups)) {
                    if (group.name === shortName) {
                        existingGroupKey = key;
                        break;
                    }
                }
                
                if (existingGroupKey) {
                    invoiceGroups[existingGroupKey].invoices.push(invoice);
                } else {
                    currentGroupId++;
                    const groupKey = `group_${currentGroupId}`;
                    invoiceGroups[groupKey] = {
                        name: shortName,
                        invoices: [invoice]
                    };
                }
            });
        }
        
        return invoiceGroups;
    }

    /**
     * 创建新客户对象
     */
    static createNewCustomer(customerName) {
        // 生成唯一ID
        const customerId = `NEW_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        return {
            "客户名称": customerName,
            "公司名称": customerName,
            "统一社会信用代码/纳税人识别号": "",
            "地址": "",
            "电话": "",
            "开户行名称": "",
            "银行账号": "",
            "id": customerId
        };
    }

    /**
     * 处理单个发票分组
     */
    static processInvoiceGroup(group, customersData, itemsData, result1, result2) {
        const customerName = group.name;
        
        // 查找匹配的客户
        let matchedCustomer = customersData.find(customer => {
            const customerKey = customer['客户名称'] || customer['公司名称'] || '';
            return customerKey.includes(customerName) || customerName.includes(customerKey);
        });

        // 如果找不到匹配的客户，创建新客户
        if (!matchedCustomer) {
            console.warn(`未找到匹配的客户: ${customerName}，创建新客户`);
            matchedCustomer = this.createNewCustomer(customerName);
        }

        // 生成发票号
        const invoiceNumber = this.generateInvoiceNumber(customerName);
        
        // 生成发票基本信息
        const invoiceEntry = this.generateInvoiceEntry(invoiceNumber, matchedCustomer);
        result1.push(invoiceEntry);

        // 处理发票明细
        group.invoices.forEach(invoice => {
            const itemName = invoice['品名'] || '';
            const matchedItem = itemsData.find(item => 
                item['商品名称'] && item['商品名称'].includes(itemName)
            );

            const detailEntry = this.generateInvoiceDetailEntry(invoiceNumber, invoice, matchedItem);
            result2.push(detailEntry);
        });
    }
}

// 导出到全局作用域
window.DataProcessor = DataProcessor;