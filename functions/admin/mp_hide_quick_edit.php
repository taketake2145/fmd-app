<?php
/**
 * クイック編集を非表示にする
 *
 * https://www.webantena.net/wordpress/functions-php-hide-quickedit/
 */
function mp_hide_quick_edit($actions) {
  unset($actions['inline hide-if-no-js']);
  return $actions;
}
add_filter('post_row_actions', 'mp_hide_quick_edit');
// add_filter('page_row_actions', 'mp_hide_quick_edit');