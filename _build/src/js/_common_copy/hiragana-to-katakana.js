/**
 * ひらがなをカタカナに変換する
 * https://gist.github.com/kawanet/5553478
 * http://shinespark.hatenablog.com/entry/2015/10/30/002903
 */
cmn.hiragana_to_katakana = function(src, is_all_hiragana) {  
  return src.replace(/[\u3041-\u3096]/g, function(match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });  
};
