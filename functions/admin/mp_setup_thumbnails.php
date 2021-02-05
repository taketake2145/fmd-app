<?php
/**
 * アイキャッチ画像を表示する
 * /design/wordpress/post_14.html
 */
function mp_setup_thumbnails() {
  add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'mp_setup_thumbnails');