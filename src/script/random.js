function randomPeopleName() {
  const firstNameList =
    "林黃吳馬謝曾鄭曹張何陳楊許蔡鄧胡劉周方蕭李柳易羅董習阮遊戴聶徐錢章粱孫高詹步權游毛趙王馮褚衞蔣沈韓朱秦尤施呂孔嚴魏陶姜戚鄒史費岑唐鮑湯畢傅顧孟尹汪姚狄貝宋龐杜梁屈江童顏郭鍾霍盧丁洪崔程裴陸甄伊葉鄺喬麥賴黎熊";
  const secondNameList =
    "俊逸寶智健建竣順逸家哲隆凱秀佩成千亮文嘉書明正博和英陽興剛德武玉天鴻才勇子金長典彥朝國一祐舒萬曉燊創惠業永克紹貴樹海棟";
  const thirdNameList =
    "伯名昌偉豪志傑軒群榮坤元孝泰君超樂秋祥信賢宏誠光安益朗華修卓山思勳達柏盛強嶽翔啟財宣靖圓輝岐康南雄歡聰基威";
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

function randomWorldName() {
  const firstNameList =
    "格聖蘭尼斯伊韋因羅艾塞阿埃詹奎魯法維莫基磨特屬安帕索阪班厄姑易沙奧希塔邁肯寧浦吉巴";
  const secondNameList =
    "爾弗克萊倫瓦宿霍隆納塔達戈瑟蘭沙拉敘德格斯門姆佛卡苟雷哈瑞康清";
  const thirdNameList = "文里哈拉洛丹蘭倫加徹爾茲斯羅科達納柏瑪特希瓦";
  const forthNameList = "奧卡斯德尼丹布什隆雷爾特坦";
  const fifthNameList = "萊哈";
  const firstName = firstNameList.charAt(
    randomInteger(1, firstNameList.length) - 1
  );
  const secondName = secondNameList.charAt(
    randomInteger(1, secondNameList.length) - 1
  );
  const thirdName =
    randomInteger(1, 10) > 7
      ? thirdNameList.charAt(randomInteger(1, thirdNameList.length) - 1)
      : "";
  let forthName = "";

  let fifthName = "";
  if (thirdName !== "") {
    forthName =
      randomInteger(1, 10) === 10
        ? forthNameList.charAt(randomInteger(1, forthNameList.length) - 1)
        : "";
  }
  if (forthName !== "") {
    fifthName =
      randomInteger(1, 10) === 10
        ? fifthNameList.charAt(randomInteger(1, fifthNameList.length) - 1)
        : "";
  }
  return firstName + secondName + thirdName + forthName + fifthName;
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
export { randomPeopleName, randomInteger, shuffle, randomWorldName };
