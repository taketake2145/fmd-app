<?php
/**
 * データ取得可能かを確認する　TODO
 *
 * @user_id {string} user_id 取得するデータの投稿者ID
 * @return {boolean}
 */
function get_public($user_id = "") {
  $login_id = 0;
  
  // ログインしているか判別する
  if (is_user_logged_in()) {
    $login_user = wp_get_current_user();    
    $login_id = strval($login_user -> ID);    
  }
  
  // ログインしていて、取得IDと一致する場合、もしくは、取得IDの指定がなくログインしている場合
  if (($login_id > 0 && $login_id === strval($user_id)) || ($login_id > 0 && $user_id === "")) {
    $result = $login_id;
    
  } else if ($user_id != "") {
    
    // 設定ファイルがあるか判別する
    $file = dirname(__FILE__).'/../../data/'.$user_id.'/config.php';
    if (is_file($file)) {
      $data = @file_get_contents($file);
      $data = str_replace('\&quot;', '"', $data);
      $json = json_decode($data, true);
      
      // 公開設定になっているか判別する
      if (enc_param("status_publish", $json) === "publish") {
        $result = $user_id;
      } else {
        $result = false;
      }
    } else {
      $result = false;
    }
  } else {
    $result = false;
  }
  
  return $result;
}