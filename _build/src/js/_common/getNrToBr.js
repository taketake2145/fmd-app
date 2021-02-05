/**
 * 改行コードを<br>に変換する
 * textareaの値をhtmlにセットする際に使う
 *
 * @param {string} str*
 * @return {string} 変換後のstr
 */
const getNrToBr = (str = '') => {
  return str.replace(/\n/g, '<br>');
};
