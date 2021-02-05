/**
 * ひらがなか判別する
 * http://winter-tail.sakura.ne.jp/pukiwiki/index.php?JavaScript%A4%A2%A4%EC%A4%B3%A4%EC%2F%C0%B5%B5%AC%C9%BD%B8%BD%A5%D1%A5%BF%A1%BC%A5%F3#a6655ac9
 */
cmn.is_hiragana = function(str){
  var s = str || "aiueo";
  return ("string" == typeof str && s.match(/^[\u3040-\u309F]+$/));
};

