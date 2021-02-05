/**
 * 言語もしくは名前を指定して、voice情報を取得する
 *
 * @param {string} val*
 * @param {boolean|NULL} is_name true: valが名前の場合
 * @return {object|string} voice情報、なければ、空テキスト
 *
 * https://cpoint-lab.co.jp/article/201908/11323/ 連想配列 マッチ
 */
const voicerGetVoice = (val, is_name) => {
  let lang_name = [],
      lang_default = [],
      i,
      r = "";
  
  // 名前でマッチするか判別する
  if (is_name) {
    for (i = 0; i < voicer.ary_voice.length; i++) {
      let n = voicer.ary_voice[i].name;

      if (n === val) {
        r = voicer.ary_voice[i];
        break;
      }
    }
    
  } else {  // 言語でマッチするvoiceを取得する
    lang_name = voicer.ary_voice.filter((u) => u.lang === val);
    if (lang_name.length > 0) {
      lang_default = lang_name.filter((u) => u.default === true);
      r = (lang_default.length > 0)? lang_default[0]: lang_name[0];
    }
    r = (typeof r === "object" && r.name)? r: "";
  }  
  
  return r;
}
