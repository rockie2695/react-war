function randomPeopleName() {
  const firstNameList =
    "林黃吳馬謝曾鄭曹張何陳楊許蔡鄧胡劉周方蕭李柳易羅董習阮遊戴聶徐錢章粱孫高詹步權游毛趙王馮褚衞蔣沈韓朱秦尤施呂孔嚴魏陶姜戚鄒史費岑唐鮑湯畢傅顧孟尹汪姚狄貝宋龐杜梁屈江童顏郭鍾霍盧丁洪崔程裴陸甄伊葉";
  const secondNameList =
    "俊逸寶智健建竣順逸家哲隆凱秀佩成千亮文嘉書明正博和英陽興剛德武玉天鴻才勇子金長典彥朝國一祐舒";
  const thirdNameList =
    "伯名昌偉豪志傑軒群榮坤元孝泰君超樂秋祥信賢宏誠光安益朗華修卓山思勳達柏盛強嶽翔啟財宣靖";
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
export { randomPeopleName, randomInteger, shuffle };
