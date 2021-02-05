/**
 * 日記の「MORE」をタップしたときのAjax URLを生成する
 *
 * @param (string) u 現在呼び出しているAjax URL
 * @param (string) shuffle true|false booleanではないので注意
 *
 * @return (string) Ajaxで呼び出すURL
 */
const getDiaryUrl = function (u, shuffle) {
  
  let params = (u)? u.split("?"): "",
      param = [],
      r = {},
      is_pg = false;
    
  // GETパラメータがあるか判別する
  if (params.length == 2) {
    
    u = '/?';

    // GETパラメータを再設定する
    param = params[1].split('&');
    for (var i in param) {
      let p = param[i].split('=');
      
      // キーと値の両方があるか判別する
      if (p.length == 2 && "" != p[1].trim()) {
        
        // キーがpgの場合、値に1プラスする、シャッフルの場合は常に値は2にする
        if (p[0] === "pg") {
          is_pg = true;
          p[1] = (shuffle === "true")? 2: (+p[1]) + 1;
        }
        
        u += p[0] + '=' + p[1] + '&';        
      }
    }
    
    // 末尾の「&」を削除する
    u = u.slice(0, -1);    
    
    // pg があるか判別する
    if (!is_pg) {
      u = u + '&pg=2';
    }
    
  } else if (params.length == 1) {  // GETパラメータがない場合
    u = u + '?pg=2';
  }
  
  return u;
}

