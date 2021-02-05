/**
 * SNSの共有リンクを取得する
 *
 * @param {string} url*
 * @param {string} title
 * @return {object} 各SNSのリンク
 */
const shareSNS = (url, title = "") => {
  return {
    twitter: 'https://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title),
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
    line: 'https://line.me/R/msg/text/?' + encodeURIComponent(title) + ' ' + url  // lineのurlはエンコード不要 
  }
}

