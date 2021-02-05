/**
 * 半角スペース、全角スペースを除去する
 */
const getTrimSpace = (str = '') => {
  return str.trim().replace(/[ |　]/g, '');
}
