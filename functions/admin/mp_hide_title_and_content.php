<?php
/**
 * タイトルと本文を非表示にする
 *
 * https://www.webantena.net/wordpress/functions-php-my-remove-post-editor-support/
 */
function mp_hide_title_and_content() {
  remove_post_type_support('post', 'title');
  remove_post_type_support('post', 'editor');
}
add_action('init', 'mp_hide_title_and_content');
