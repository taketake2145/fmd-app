<?php
/**
 * タイトルに公開日を設定する
 * https://wpdocs.osdn.jp/%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3_API/%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%95%E3%83%83%E3%82%AF%E4%B8%80%E8%A6%A7/save_post
 https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/wp_update_post
 */
function mp_auto_title_to_date() {
  global $post;
  
  $id = $post -> ID;
  
  // 日付が変更されたか判別して、タイトルの日付を決定する
  $title = (array_key_exists("post_date", $_POST))? $_POST["post_date"]: $post -> post_date;
  
  // リビジョンは何も処理しない
  if (!wp_is_post_revision($id)) {
    
    // この関数をフックから外し、無限ループを防ぐ。
    remove_action('save_post', 'mp_auto_title_to_date', 19);    

    //post_typeを判定(post, page, カスタム投稿)
    if ($post -> post_type === 'post') {      
      
      $my_post = array(
        'ID' => $id,
        'post_title' => $title,
      );        
      wp_update_post($my_post);
    }

    // この関数を改めてフックする。
    add_action('save_post', 'mp_auto_title_to_date', 19);    
  }  
}
add_action('save_post', 'mp_auto_title_to_date', 19);



