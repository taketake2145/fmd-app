<?php
/**
 * WordPress用 wp_ を接頭文字にすると本家と重複する可能性があるため、mp_ を接頭文字とする
 *
 * 画像パスを取得する（記事リスト用）
 * 1. サムネイルがある場合はその画像
 * 2. サムネイルはないけど本文内に画像がある場合はその1枚目
 * 3. 記事のカテゴリ共通用の画像がある場合はその画像
 *
 * get_the_post_thumbnail_url
 * https://wpdocs.osdn.jp/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%BF%E3%82%B0/get_the_post_thumbnail
 *
 * return string
 */
function mp_get_thumbnail($id = '', $category = '', $content = '') {
	$img_path = '';
	
	if (get_the_post_thumbnail_url($id)) {
    
    // 記事にサムネイル画像がセットされているか判別する
		$img_path = get_the_post_thumbnail_url($id, 'medium');
	} else {	
		preg_match('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $content, $matches);
        
		if (!empty($matches)) {
			
      // 本文内に画像がある場合は、その一枚目を取得する
      $img_path = $matches[1];
		} else if (file_exists(ASSETS_LOOT.'/thumbnail/'.$category.'.jpg')) {
      
      // あらかじめ用意したカテゴリー用の画像パスを取得する
			$img_path = ASSETS_PATH.'/thumbnail/'.$category.'.jpg';
		} else if (file_exists(ASSETS_LOOT.'/thumbnail/_noimage.png')) {
      
      // あらかじめ用意したNO IMAGE画像パスを取得する
			$img_path = ASSETS_PATH."/thumbnail/_noimage.png";
		}
	}
	
	return $img_path;
}

