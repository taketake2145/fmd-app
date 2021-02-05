/**
 * <br>を改行コードに変換する
 * textareaの値にセットする際に使う
 * PHP htmlspecialcharsで処理されたケースも想定する
 *
 * @param {string} str*
 * @return {string} 変換後のstr
 */
const getBrToNr = (str = '') => {
  str = str.replace(/(<br>|<br \/>)/gi, '\n');
  str = str.replace(/&apos;/gi, "'");
  str = str.replace(/&#039;/gi, "'");
  str = str.replace(/&quot;/gi, '"');
  str = str.replace(/&lt;/gi, '<');
  str = str.replace(/&gt;/gi, '>');
  str = str.replace(/&amp;/gi, '&');
  return str;
};
