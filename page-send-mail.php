<?php
include("functions/index.php");

if (enc_param("need_login", $_POST) == "no") {
  
  if (enc_param("title", $_POST) === "ご意見箱") {
    wp_mail(ADMIN_EMAIL, "英語日記 ".enc_param("title", $_POST).time(), enc_param("message", $_POST));
  }  
} else if (is_user_logged_in()) {  // ログインしているか判別する
  
  // 対象IDを取得する
  $login_user = wp_get_current_user();
  $id = strval($login_user -> ID);

  $content = "";
  
  $message = enc_param("message", $_POST);
  $message = rawurldecode($message);
  $message = str_replace("&amp;", "&", $message);
  
  $content .= "USER_ID: ".$id."\n";
  $content .= home_url()."/ajax-diary/?".$message."\n";
  
  // 引継ぎ変数とログインIDが一致しているか判別する
  if (enc_param("user_id", $_POST) == $id) {

    wp_mail(ADMIN_EMAIL, "英語日記 ".enc_param("title", $_POST).time(), $content);
  }
}
