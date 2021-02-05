/**
 * 現在時刻を取得する
 * 
 * @return {string} ex) "2020-12-17T10:27";
 */
const getNowTime = () => {
  let now = new Date(),
      y = now.getFullYear(),
      m = (now.getMonth() + 1),
      d = now.getDate(),
      h = now.getHours(),
      i = now.getMinutes();
      
  if (m < 10) m = '0' + m;
  if (d < 10) d = '0' + d;
  if (h < 10) h = '0' + h;
  if (i < 10) i = '0' + i;
      
  return y + "-" + m + "-" + d + "T" + h + ":" + i;
};