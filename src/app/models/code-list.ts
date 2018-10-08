// 01.狀態代碼表
const StatusList = [{
    key: 'NONE',
    value: '未公告'
}, {
    key: 'OPEN',
    value: '開放認養'
}, {
    key: 'ADOPTED',
    value: '已認養'
}, {
    key: 'OTHER',
    value: '其他'
}, {
    key: 'DEAD',
    value: '死亡'
}];

// 02.動物性別代碼表
const SexList = [
    {
        key: 'M',
        value: '公'
    }, {
        key: 'F',
        value: '母'
    }, {
        key: 'N',
        value: '未輸入'
    }, {
        key: 'none',
        value: '不拘'
    }];

// 03.動物體型代碼表
const BodyTypeList = [{
    key: 'MINI',
    value: '迷你'
}, {
    key: 'SMALL',
    value: '小型'
}, {
    key: 'MEDIUM',
    value: '中型'
}, {
    key: 'BIG',
    value: '大型'
}, {
    key: 'none',
    value: '不拘'
}];

// 04.地區代碼表
const AgeList = [{
    key: 'CHILD',
    value: '幼年'
}, {
    key: 'ADULT',
    value: '成年'
}, {
    key: 'none',
    value: '不拘'
}];

// 05.縣市代碼表
const AreaList = [
    {
        key: 2,
        value: '臺北市'
    }, {
        key: 3,
        value: '新北市'
    }, {
        key: 4,
        value: '基隆市'
    }, {
        key: 5,
        value: '宜蘭縣'
    }, {
        key: 6,
        value: '桃園縣'
    }, {
        key: 7,
        value: '新竹縣'
    }, {
        key: 8,
        value: '新竹市'
    }, {
        key: 9,
        value: '苗栗縣'
    }, {
        key: 10,
        value: '台中市'
    }, {
        key: 11,
        value: '彰化縣'
    }, {
        key: 12,
        value: '南投縣'
    }, {
        key: 13,
        value: '雲林縣'
    }, {
        key: 14,
        value: '嘉義縣'
    }, {
        key: 15,
        value: '嘉義市'
    }, {
        key: 16,
        value: '臺南市'
    }, {
        key: 17,
        value: '高雄市'
    }, {
        key: 18,
        value: '屏東縣'
    }, {
        key: 19,
        value: '花蓮縣'
    }, {
        key: 20,
        value: '臺東縣'
    }, {
        key: 21,
        value: '澎湖縣'
    }, {
        key: 22,
        value: '金門縣'
    }, {
        key: 23,
        value: '連江縣'
    }];

// 06.是否絕育代碼表
const SterilizationList = [
    {
        key: 'T',
        value: '是'
    }, {
        key: 'F',
        value: '否'
    }, {
        key: 'N',
        value: '未輸入'
    }, {
        key: 'none',
        value: '不拘'
    }
];

// 07.是否施打狂犬病代碼表
const BacterinList = [
    {
        key: 'T',
        value: '是'
    }, {
        key: 'F',
        value: '否'
    }, {
        key: 'N',
        value: '未輸入'
    }, {
        key: 'none',
        value: '不拘'
    }
];

// 08.類型
const KindList = [
    {
        key: '貓',
        value: '貓'
    }, {
        key: '狗',
        value: '狗'
    }, {
        key: '其他',
        value: '其他'
    }, {
        key: 'none',
        value: '不拘'
    }
]

// 09.毛色
const ColourList = [
    {
        key: '灰色',
        value: '灰色'
    },
    {
        key: '棕色',
        value: '棕色'
    }, {
        key: '黑色',
        value: '黑色'
    }, {
        key: '白色',
        value: '白色'
    }, {
        key: '黃色',
        value: '黃色'
    }, {
        key: '咖啡色',
        value: '咖啡色'
    }, {
        key: '黑白色',
        value: '黑白色'
    },
    {
        key: '黃白色',
        value: '黃白色'
    }, {
        key: '黑棕色',
        value: '黑棕色'
    }, {
        key: '黑黃色',
        value: '黑黃色'
    }, {
        key: '黑白色',
        value: '黑白色'
    },
    {
        key: '虎斑色',
        value: '虎斑色'
    },
    {
        key: '三花色',
        value: '三花色'
    },
    {
        key: '三花色',
        value: '三花色'
    },
    {
        key: '虎斑白色',
        value: '虎斑白色'
    }, {
        key: 'none',
        value: '不拘'
    }
]

// 10.收容中心 
const ShelterList = [
    {
        key: '48',
        value: '基隆市寵物銀行'
    }, {
        key: '49',
        value: '臺北市動物之家'
    }, {
        key: '50',
        value: '新北市板橋區公立動物之家'
    }, {
        key: '51',
        value: '新北市新店區公立動物之家'
    }, {
        key: '53',
        value: '新北市中和區公立動物之家'
    }, {
        key: '55',
        value: '新北市淡水區公立動物之家'
    }, {
        key: '56',
        value: '新北市瑞芳區公立動物之家'
    }, {
        key: '58',
        value: '新北市五股區公立動物之家'
    }, {
        key: '59',
        value: '新北市八里區公立動物之家'
    }, {
        key: '60',
        value: '新北市三芝區公立動物之家'
    }, {
        key: '61',
        value: '桃園市動物保護教育園區'
    }, {
        key: '62',
        value: '新竹市動物收容所'
    }, {
        key: '63',
        value: '新竹縣動物收容所'
    }, {
        key: '67',
        value: '臺中市動物之家南屯園區'
    }, {
        key: '68',
        value: '臺中市動物之家后里園區'
    }, {
        key: '69',
        value: '彰化縣流浪狗中途之家'
    }, {
        key: '70',
        value: '南投縣公立動物收容所'
    }, {
        key: '71',
        value: '嘉義市流浪犬收容中心'
    }, {
        key: '72',
        value: '嘉義縣流浪犬中途之家'
    }, {
        key: '73',
        value: '臺南市動物之家灣裡站'
    }, {
        key: '74',
        value: '臺南市動物之家善化站'
    }, {
        key: '75',
        value: '高雄市壽山動物保護教育園區'
    }, {
        key: '76',
        value: '高雄市燕巢動物保護關愛園區'
    }, {
        key: '77',
        value: '屏東縣流浪動物收容所'
    }, {
        key: '78',
        value: '宜蘭縣流浪動物中途之家'
    }, {
        key: '80',
        value: '花蓮縣流浪犬中途之家'
    }, {
        key: '83',
        value: '澎湖縣流浪動物收容中心'
    }, {
        key: '82',
        value: '金門縣動物收容中心'
    }, {
        key: '89',
        value: '雲林縣流浪動物收容所'
    }, {
        key: '96',
        value: '新北市政府動物保護防疫處'
    }, {
        key: '96',
        value: '苗栗縣生態保育教育中心'
    }
];

// 11.feedback 類型
const FeedbackTypeList = [
    {
        key: '1',
        value: '使用回饋'
    }, {
        key: '2',
        value: '建議事項'
    }, {
        key: '3',
        value: '其它'
    }
];

// 11.IssuesStatusList
const IssuesStatusList = [
    {
        key: '0',
        value: '提交'
    }, {
        key: '1',
        value: '追蹤中'
    }, {
        key: '2',
        value: '待解決'
    }, {
        key: '3',
        value: '已處理'
    }, {
        key: '99',
        value: '歸檔'
    }
];

export const CodeList = {
    StatusList: StatusList,
    SexList: SexList,
    BodyTypeList: BodyTypeList,
    AgeList: AgeList,
    AreaList: AreaList,
    SterilizationList: SterilizationList,
    BacterinList: BacterinList,
    KindList: KindList,
    ColourList: ColourList,
    ShelterList: ShelterList,
    FeedbackTypeList: FeedbackTypeList,
    IssuesStatusList:IssuesStatusList
};


