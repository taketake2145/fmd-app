<?php
/**
 * ログイン画面にCSSを追加する
 * https://www.nxworld.net/wordpress/wp-custom-login-page.html
 */
function mp_login_custom() {
  echo '<script>let ASSETS_PATH = "'.get_stylesheet_directory_uri().'/assets";</script>';
	wp_enqueue_style('custom-css', get_stylesheet_directory_uri().'/assets/admin/login.css?1');
  wp_enqueue_script('custom-jquery', get_template_directory_uri().'/assets/admin/jquery-3.5.1.min.js');
  wp_enqueue_script('custom-login', get_template_directory_uri().'/assets/admin/login.js');
  
  //	wp_enqueue_style('custom', get_stylesheet_directory_uri().'/assets/admin/login.css?'.time());
  //  echo '<script src="'.get_stylesheet_directory_uri().'/assets/admin/jquery-3.5.0.min.js"></script>';
  //  echo '<script src="'.get_stylesheet_directory_uri().'/assets/admin/login.js?'.time().'"></script>';
}
add_action('login_enqueue_scripts', 'mp_login_custom');
