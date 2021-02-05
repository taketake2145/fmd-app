/**
 * ホーム画面からの起動か判別する
 */
cmn.is_standalone = function() {
  var is_standalone;
  switch (true) {
    // manifest.jsonのstart_urlと比較する もしくは iOSの場合
    case (-1 != location.href.indexOf("?utm_source=homescreen")):
    case navigator.standalone:
      is_standalone = true;
      break;
    default:
      is_standalone = false;
  }
  return is_standalone;
}