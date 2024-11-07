// Sample test data
const sampleCustomersData = [
    {
        "客户名称": "上海测试科技有限公司",
        "统一社会信用代码/纳税人识别号": "91310000XXXXXXXXXX",
        "地址": "上海市浦东新区XX路123号",
        "电话": "021-12345678",
        "开户行名称": "中国工商银行上海分行",
        "银行账号": "1234567890123456789"
    },
    {
        "客户名称": "北京示例贸易有限公司",
        "统一社会信用代码/纳税人识别号": "911100007XXXXXXXX",
        "地址": "北京市朝阳区XX街456号",
        "电话": "010-87654321",
        "开户行名称": "中国建设银行北京分行",
        "银行账号": "9876543210987654321"
    }
];

const sampleInvoicesData = [
    {
        "公司名称": "上海测试科技有限公司",
        "品名": "软件开发服务",
        "规格": "定制开发",
        "单位": "项",
        "数量": "1",
        "单价": "100000.00",
        "折扣金额": "0"
    },
    {
        "公司名称": "",  // 空公司名称，应该归属于上一个公司
        "品名": "技术咨询服务",
        "规格": "年度服务",
        "单位": "年",
        "数量": "1",
        "单价": "50000.00",
        "折扣金额": "0"
    },
    {
        "公司名称": "北京示例贸易有限公司",
        "品名": "硬件设备",
        "规格": "服务器",
        "单位": "台",
        "数量": "2",
        "单价": "80000.00",
        "折扣金额": "0"
    }
];

const sampleItemsData = [
    {
        "项目名称": "软件开发服务",
        "商品和服务税收分类编码": "3040202",
        "税率/征收率": "0.13"
    },
    {
        "项目名称": "技术咨询服务",
        "商品和服务税收分类编码": "3040201",
        "税率/征收率": "0.13"
    },
    {
        "项目名称": "硬件设备",
        "商品和服务税收分类编码": "1070212",
        "税率/征收率": "0.13"
    }
];

// Test function
function runTests() {
    console.log('开始测试数据处理函数...');

    try {
        const { result1, result2 } = processInvoiceData(
            sampleCustomersData,
            sampleInvoicesData,
            sampleItemsData
        );

        // 测试结果1的基本属性
        console.log('\n测试结果1:');
        console.log(`总记录数: ${result1.length}`);
        console.log('第一条记录示例:', JSON.stringify(result1[0], null, 2));

        // 测试结果2的基本属性
        console.log('\n测试结果2:');
        console.log(`总记录数: ${result2.length}`);
        console.log('第一条记录示例:', JSON.stringify(result2[0], null, 2));

        // 验证发票流水号匹配
        const firstInvoiceNumber = result1[0]['发票流水号'];
        const matchingResult2Entries = result2.filter(
            entry => entry['发票流水号'] === firstInvoiceNumber
        );
        console.log('\n发票流水号匹配测试:');
        console.log(`第一个发票号对应的商品条目数: ${matchingResult2Entries.length}`);

        // 验证金额计算
        const firstResult2Entry = result2[0];
        const calculatedAmount = (
            parseFloat(firstResult2Entry['数量']) * 
            parseFloat(firstResult2Entry['单价'])
        ).toFixed(2);
        console.log('\n金额计算测试:');
        console.log(`计算金额: ${calculatedAmount}`);
        console.log(`记录金额: ${firstResult2Entry['金额']}`);

        console.log('\n测试完成！');
    } catch (error) {
        console.error('测试过程中发生错误:', error);
    }
}

// 运行测试
runTests(); 