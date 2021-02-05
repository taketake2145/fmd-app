/**
 * 全角英数字を半角にする
 * https://qiita.com/yamikoo@github/items/5dbcc77b267a549bdbae
 * https://www.yoheim.net/blog.php?q=20191101
 */
const getHankaku = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}
