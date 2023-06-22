function randomPeopleName() {
  const firstNameList =
    "林黃吳馬謝曾鄭曹張何陳楊許蔡鄧胡劉周方蕭李柳易羅董習阮遊戴聶徐錢章粱孫高詹步權游毛趙王馮褚衞蔣沈韓朱秦尤施呂孔嚴魏陶姜戚鄒史費岑唐鮑湯畢傅顧孟尹汪姚狄貝宋龐杜梁屈江童顏郭鍾霍盧丁洪崔程裴陸甄伊葉鄺麥賴黎熊廖蘇范潘柴田魯衛於袁彭賈薛閻余夏石譚郝白邱段邵常賀龔翟申伍韋向蘆倪溫俞殷谷庄焦岳邢祝左塗時耿卜關凌苗紀靳歐項曲席景單司寧柯桂閔房池蒙姬郜遲艾藍井封巫鞠諶冼楚栗鞏";
  const secondNameList =
    "俊逸寶智健建竣順家哲隆凱秀佩成千亮文嘉書明正博和英陽興剛德武玉天鴻才勇子金長典彥朝國一祐舒萬曉燊創惠業永克紹貴樹海棟承廷清森慈劍重耀駿亞宇詩雨濟懿潤晉振宗梓浩諾日皓希焯銘立澤致星雲旭世佳冠奕宥瑞啓政";
  const thirdNameList =
    "伯名昌偉豪志傑軒群榮坤元孝泰君超樂秋祥信賢宏誠光安益朗華修卓山思勳達柏盛強嶽翔啟財宣靖圓輝岐康南雄歡聰基威義峯寬銳泓源鋒謙奇祖辰鏗維霆律東慧峰丹楠晨鵬龍棋熙熹澄齊行然喬言遠鳴濤帆凡彬飛韜睿恆曦墨昊恩翰瑋丞任霖毅庭涵捷洋";
  /*console.log(
    firstNameList.length,
    secondNameList.length,
    thirdNameList.length
  );*/
  const firstName = firstNameList.charAt(
    randomInteger(1, firstNameList.length) - 1
  );
  const secondName =
    randomInteger(1, 10) === 10
      ? ""
      : secondNameList.charAt(randomInteger(1, secondNameList.length) - 1);
  const thirdName =
    randomInteger(1, 10) === 10 && secondName !== ""
      ? ""
      : thirdNameList.charAt(randomInteger(1, thirdNameList.length) - 1);
  return { name: firstName + secondName + thirdName, firstName: firstName };
}

function randomSideName() {
  const firstNameList = [
    "民主",
    "自由",
    "永恒",
    "天使",
    "天色",
    "白月",
    "淘金",
    "避風",
    "冷泉",
    "赤岩",
    "雪白",
    "激流",
    "春田",
    "格蘭",
    "尼斯",
    "艾爾",
    "七星",
    "追風",
    "暗影",
    "風沙",
    "飛霜",
    "北斗",
    "紫雲",
    "血海",
    "無上",
    "琉璃",
    "天心",
    "日炎",
    "月光",
    "疾風",
    "百花",
    "寒風",
    "落日",
    "萬妖",
    "赤血",
    "飄渺",
    "碧雲",
    "龍虎",
    "滿月",
    "光明",
    "迷失",
    "星辰",
    "白骨",
    "黑暗",
    "霧隱",
    "雲海",
    "月牙",
    "明月",
    "幽冥",
    "死亡",
    "水雲",
    "清風",
    "吉浦",
    "奧希",
    "肯寧",
    "安帕",
    "法魯",
    "埃羅",
    "餘暉",
    "紅石",
    "火磷",
    "萬獸",
    "諸神",
    "亡靈",
    "簫月",
    "璀璨",
    "鳳凰",
    "斷魂",
    "神龍",
    "混沌",
    "暗黑",
    "無界",
    "白金",
    "黑日",
    "紅月",
    "黃金",
    "白銀",
    "黃銅",
    "統一",
    "究極",
    "閃電",
  ];
  const secondNameList = [
    "合眾國",
    "共和國",
    "酋長國",
    "帝國",
    "王國",
    "國",
    "聯邦",
    "聯盟",
    "城",
    "府",
    "神殿",
    "山",
    "神教",
    "教",
    "門",
    "盟",
    "聖殿",
    "島",
    "幫",
    "同盟",
    "邦聯",
  ];

  const firstName =
    firstNameList[randomInteger(1, firstNameList.length) - 1] +
    (randomInteger(1, 10) >= 5
      ? firstNameList[randomInteger(1, firstNameList.length) - 1]
      : "");
  const secondName =
    secondNameList[randomInteger(1, secondNameList.length) - 1];

  return firstName + secondName;
}

function randomInteger(min = 10, max = 25) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array = []) {
  let randomArray = array;
  for (let i = randomArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }
  return randomArray;
}
export { randomPeopleName, randomInteger, shuffle, randomSideName };
