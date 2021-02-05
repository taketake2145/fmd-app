<?php
/**
 * 投稿者権限のユーザーに自分の投稿だけが見えるようにする
 *
 * https://www.will3in.co.jp/frontend-blog/article/custom-fields-not-displayed-when-hiding-others-posts/
 */
function mp_show_only_authorpost($query) {
  global $current_user;
  global $pagenow;
  if (is_admin() && !current_user_can('edit_others_posts') && $pagenow === 'edit.php') {
    $query -> set('author', $current_user -> ID);
  }
}
add_action('pre_get_posts', 'mp_show_only_authorpost');

/**
 * 投稿者権限のユーザーに自分の投稿したメディアのみが見えるようにする
 *
 * https://wp-doctor.jp/blog/2018/01/10/%E3%83%AF%E3%83%BC%E3%83%89%E3%83%97%E3%83%AC%E3%82%B9%E3%81%A7%E6%8A%95%E7%A8%BF%E6%A8%A9%E9%99%90%E3%81%A7%E8%87%AA%E5%88%86%E3%81%8C%E6%8A%95%E7%A8%BF%E3%81%97%E3%81%9F%E8%A8%98%E4%BA%8B%E3%81%A0/ 
 */ 
function mp_show_only_authorimage($where) {
  global $current_user;
  if (is_admin()) {
    if (current_user_can('author')) {
      if (isset($_POST['action']) && ($_POST['action'] == 'query-attachments')) {
        $where .= ' AND post_author='.$current_user -> data -> ID;
      }
    }
  }
  return $where;
}
add_filter('posts_where', 'mp_show_only_authorimage');