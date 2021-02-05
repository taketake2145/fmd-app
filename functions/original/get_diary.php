<?php
/**
 * 日記検索
 *
 * GETパラメータで絞り込み検索できる
 * q: 検索ワード 下記との掛け合わせ検索も可能。検索対象はカスタムフィールドのすべての値
 * id: 単数、もしくはカンマで複数指定可能 ex) 1 or 2,3,4
 * ym: 年月指定 ex) 202012
 * shuffle: ランダム表示 
 */
function get_diary() {
  $data = array();

  // 定義
  $post_per_page = 50;
  
  // ログインしているかもしくは公開設定しているユーザーが判別する
  $user_id = get_public(enc_param("user", $_GET));
    
  if ($user_id) {

    // パラメータを取得する
    $post_id = enc_param("id", $_GET);

    $q = enc_param("q", $_GET);

    $ym = enc_param("ym", $_GET);
    $ym = (preg_match("/^\d{6}$/", $ym))? $ym: "";

    $offset = enc_param("pg", $_GET);
    $offset = (preg_match("/^\d{1,}$/", $offset))? (int) $offset: 1;

    $is_shuffle = (enc_param("shuffle", $_GET) != "")? true: false;

    // 検索クエリを用意する
    $args = array(
      'author' => $user_id,
      'post_type' => 'post',
      'category_name' => 'd',
      'post_status' => array('publish'),
      'posts_per_page' => $post_per_page,
    );

    // 検索条件を検索クエリに追加する
    switch (true) {

      // 検索ワードがある場合
      case $q != "":
        $args["meta_query"] = array(
          'relation' => 'OR',
        );

        foreach (ARRAY_CF as $cf) {
          array_push($args["meta_query"], array(
            'key' => $cf,
            'value' => $q,
            'compare' => 'LIKE',
          ));
        }

        // 年月指定がある場合
        if ($ym != "") {
          $args["m"] = $ym;
        }

        // 記事指定がある場合
        if ($post_id != "") {
          $args["post__in"] = explode(",", $post_id);
          $args["posts_per_page"] = -1;
        }

        break;

      // 記事指定がある場合
      case $post_id != "":
        $args["post__in"] = explode(",", $post_id);
        $args["posts_per_page"] = -1;
        break;

      // 年月指定がある場合
      case $ym != "":
        $args["m"] = $ym;
        break;

      // default なし
    }

    // オフセットがある場合
    if ($offset > 1) {
      $args["offset"] = ($offset - 1)*$post_per_page;
    }

    // シャッフルがある場合
    if ($is_shuffle === true) {
      $args["orderby"] = "rand";
      $args["posts_per_page"] = $post_per_page;
    }

    // データを取得する
    $the_query = new WP_Query($args);

    // 検索結果数を取得する
    $count_posts = $the_query -> found_posts;

    // 検索結果があるか判別する
    if ($count_posts > 0) {

      $data["condition"] = $_SERVER['REQUEST_URI'];
      $data["shuffle"] = ($is_shuffle === true)? "true": "false";
      $data["count"] = $count_posts;
      $data["start"] = ($offset - 1)*$post_per_page + 1;
      $data["end"] = min($count_posts, ($offset - 1)*$post_per_page + $post_per_page);
      $data["data"] = array();

      if ($the_query->have_posts()):
      while ($the_query->have_posts()): $the_query->the_post();

      $id = get_the_id();

      $unit = diary_info($id);

      array_push($data["data"], $unit);

      endwhile;
      endif;

      // 投稿データのリセット
      wp_reset_query();
    }
  }

  if (count($data) > 0) {

    // php → json
    $data = json_encode($data);  
  } else {
    $data = "[]";
  }

  return $data;
}
