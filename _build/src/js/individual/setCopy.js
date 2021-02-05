/**
 * 添削用のテキストエリアをコピーする
 *
 * @param {object} tgt* jQueryの要素指定
 */
const setCopy = (tgt, text = '') => {
  
  if (text.trim() !== '') {
    tgt.select();
    document.execCommand('copy');
    setMessage("copy_text");
  } else {
    setMessage("no_copy_text");
  }
}