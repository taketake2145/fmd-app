<?php
include("functions/index.php");

$param = $_POST;
$lang = enc_param("lang", $param);


// ログインしているか判別する
if (is_user_logged_in()) {
  
  if ($lang === "ja" || $lang === "en") {
    update_user_meta(get_current_user_id(), 'locale', $lang);    
  }
}
