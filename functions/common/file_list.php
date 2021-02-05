<?php
/**
 * ファイルリスト
 *
 * @param $path ファイル一覧を取得したいパス
 * @param $format 抽出するファイル形式（デフォルト: php）ex) jpg,png,gif,svg
 * @param $sort name|update とりあえずnameのみで（デフォルト: name）
 * @param $is_asc デフォルトfalse true: 昇順 false: 降順
 *
 * @return (array) ファイル名リストを返却
 */
function file_list($path = "", $format = "php", $sort = "name", $is_asc = false) {
  $array_filename = array();
  
  // $pathの指定がない場合は、現在開いているディレクトリ直下を検索対象にする
  if ($path == '') {
    $path = dirname(__FILE__);
  }
  
  // 該当ファイルを取得する
  foreach(glob($path.'/{*.'.$format.'}', GLOB_BRACE) as $file){
    if(is_file($file)){
      array_push($array_filename, array(
        "name" => basename($file),
        "update" => filemtime($file),
      ));
    }
  }
  
  // sort|rsort
  // https://www.php.net/manual/ja/function.array-multisort.php
  // https://www.php.net/manual/ja/function.array-column.php
  // $key_name  = array_column($array_filename, 'name');
  // $key_update = array_column($array_filename, 'update');
  // array_multisort($key_name, SORT_DESC, $key_update, SORT_ASC, $array_filename);
  
  // 並び替えの基準とするキーだけの配列を用意する
  $sort_array  = array_column($array_filename, $sort);
  
  // 降順か昇順か決定する
  $sort_order = ($is_asc === false)? SORT_DESC: SORT_ASC;
  
  // 並び替えをする
  array_multisort($sort_array, $sort_order, $array_filename);
  
  return array_column($array_filename, "name");
}