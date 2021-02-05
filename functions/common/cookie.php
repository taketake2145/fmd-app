<?php
/*
* cookieセット
* http://php.net/manual/ja/function.setcookie.php
*
* 第2引数がない場合は、削除として機能する
*
* (事前定義が必要) COOKIE_DOMAIN_NAME
*/
function cookie($key = '', $val = '', $path = "/") {
    
  // https確認
  $is_https = (empty($_SERVER["HTTPS"]))? false: true;

  // 90日間保持
  $expire = time()+60*60*24*90;
  
  // 10分保持（ローカル環境 http://{xxx}.localhost の場合）
  if (preg_match('/\.localhost/', COOKIE_DOMAIN_NAME)) {
    $expire = time()+600;    
  }

  // 一時無効にする
  setcookie($key, '', time() - 3600, $path, COOKIE_DOMAIN_NAME, $is_https, true);

  // 削除か更新をおこなう
  if ("" === $val) {
    unset($_COOKIE[$key]);
  } else {
    setcookie($key, $val, $expire, $path, COOKIE_DOMAIN_NAME, $is_https, true);
  }
}
