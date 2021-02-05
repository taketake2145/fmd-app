<?php
/**
 * Ajaxで日記を新規作成・編集更新する
 *
 * ログインしていて、削除する記事の投稿者であることが必須条件
 *
 * https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/wp_delete_post
 */
include("functions/index.php");
$param = $_POST;
$param_id = enc_param("ID", $param);
$return_text = 0;

// ログインしているか判別する
if (is_user_logged_in()) {
  
  // ログインID
  $login_user = wp_get_current_user();    
  $login_id = strval($login_user -> ID);
  
  // 投稿者IDとログインIDが一致しているか判別する
  if ($param_id != "" && strval(get_post_field('post_author', $param_id)) === $login_id) {
    
    // 完全削除か判別する
    $is_complete = (enc_param("status", $param) === "completely")? true: false;
    
    //削除する
    $is_status = wp_delete_post($param_id, $is_complete);
    
    if ($is_status !== false) {
      $return_text = 1;
    }
  }
}
echo $return_text;
