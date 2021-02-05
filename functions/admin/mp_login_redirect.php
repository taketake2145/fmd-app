<?php
/**
 * ログイン後、管理者権限以外は、ホーム画面へ遷移する
 *
 * https://hirashimatakumi.com/blog/3713.html
 *
 */
function mp_redirect_home($user_login, $user) {
  if ($user -> roles[0] != 'administrator') {
    wp_redirect(home_url());
    exit();    
  }
}
add_action('wp_login', 'mp_redirect_home', 10, 2);
