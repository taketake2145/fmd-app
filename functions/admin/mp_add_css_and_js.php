<?php
/**
 * プロフィール画面に追加する
 * https://blog-and-destroy.com/26711
 * http://wpcj.net/1209
 */
function mp_add_css_and_js($file) {
  global $post;  
  
  /*
  if ($file == "profile.php") {
    wp_enqueue_style('profile', get_stylesheet_directory_uri().'/assets/admin/profile.css?'.time());
    echo '<script src="'.get_stylesheet_directory_uri().'/assets/admin/jquery-3.5.0.min.js"></script>';
    echo '<script src="'.get_stylesheet_directory_uri().'/assets/admin/profile.js?'.time().'"></script>';    
  }
  
  if ($file == "edit-comments.php") {
    wp_enqueue_style('comments', get_stylesheet_directory_uri().'/assets/admin/comment.css?'.time());
  }
  */
  echo '<script>let ASSETS_PATH = "'.get_stylesheet_directory_uri().'/assets";</script>';
	wp_enqueue_style('custom-css', get_stylesheet_directory_uri().'/assets/admin/admin.css?'.time());
  wp_enqueue_script('custom-jquery', get_template_directory_uri().'/assets/admin/jquery-3.5.1.min.js');
  wp_enqueue_script('custom-login', get_template_directory_uri().'/assets/admin/admin.js?'.time());
}
add_action('admin_enqueue_scripts', 'mp_add_css_and_js');

