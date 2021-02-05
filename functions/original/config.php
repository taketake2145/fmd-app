<?php
/**
 * CONFIG情報を取得/保存する
 *
 */
function config($user_id = 0) {
  
  $write_login_id = enc_param("login_id", $_POST);
  $write_json_stringify = enc_param("json", $_POST);
  $get_time = time();
  
  $text = '';
  
  // ログインしている場合はログインID
  $login_id = 0;
  if (is_user_logged_in()) {
    
    // ログインIDを取得する
    $login_user = wp_get_current_user();
    $login_id = strval($login_user -> ID);    
  }
  
  // loadかoverwriteか判別する
  if ($user_id !== 0) {  // 呼び出し    
    
    // 設定ファイルがあるか判別する
    $file = dirname(__FILE__).'/../../data/'.$user_id.'/config.php';
    if (is_file($file)) {
      $data = @file_get_contents($file);
      $data = str_replace('\&quot;', '"', $data);
      $json = json_decode($data, true);
      
      // 公開設定になっている、もしくは取得する情報がログインIDか判別する
      if (enc_param("status_publish", $json) === "publish" || ($login_id === strval($user_id) && $user_id > 0)) {
        $text = $data;
      } else {
        $text = "{}";
      }
    } else {
      $text = "{}";
    }
  } else if ($write_login_id !== "") {  // 保存
   
    // ログインしているか判別する
    if ($login_id > 0) {
      
      // ログインIDと遷移元のログインIDが一致しているか判別する
      if ($write_login_id === $login_id) {
         
        // 設定用フォルダがあるか判別して、なければディレクトリを作る
        $dir = dirname(__FILE__).'/../../data/'.$login_id;
        if (!is_dir($dir)) {
          mkdir($dir);
        }
        
        $data = str_replace('\&quot;', '"', $write_json_stringify);
        $json = json_decode($data, true);
        $json["time"] = $get_time;
        $json_decode = json_encode($json);
        
        // あらためてディレクトリがあるか判別する
        if (is_dir($dir)) {
          $file_set = @file_put_contents($dir.'/config.php', $json_decode);
          if ($file_set !== false) {
            $text = $get_time;
          }
        }
      }
    }
  } else {
    $text = "{}";
  }
  return $text;
}
