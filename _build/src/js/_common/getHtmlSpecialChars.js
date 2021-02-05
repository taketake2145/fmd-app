/**
 * 特殊文字をHTMLエンティティに変換する
 *
 * @param {string}
 * @return {string}
 */
const getHtmlSpecialChars = (str) => {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#039;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  return str;
}
