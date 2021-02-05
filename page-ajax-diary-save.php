<?php
/**
 * Ajaxで日記を新規作成・編集更新する
 *
 * ログインしていることが必須条件
 * 編集更新の場合は、自分が書いた記事のみでしか更新ができないのが条件
 *
 * https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/wp_insert_post
 * https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/wp_update_post
 */
include("functions/index.php");
$post_id = 0;
$param = $_POST;
$param_id = enc_param("ID", $param);

// ログインしているか判別する
if (is_user_logged_in()) {
  
  // ログインID
  $login_user = wp_get_current_user();    
  $login_id = strval($login_user -> ID);  

  // 新規か編集か、日記IDがあるかで判別する
  if ($param_id == "") {  // 新規
    $param["post_title"] = date("Y-m-d H:i:s");
    
    // WordPressの必須入力と公開設定を設定する
    $param["post_content"] = "no data";
    $param["post_status"] = "publish";
    
    $post_id = wp_insert_post($param);
    
  } else if (strval(get_post_field('post_author', $param_id)) === $login_id) {  // 編集（投稿者IDとログインIDが一致しているか判別する）
    
    $post_id = wp_update_post($param);
  }

  // 保存が成功したか判別する
  if ($post_id > 0) {

    // カスタムフィールドを更新する
    foreach($param as $key => $val ) {
      if (strpos($key, "diary_") !== false) {
        update_post_meta($post_id, $key, $val);
      }
    }  
  }
}

echo $post_id;
