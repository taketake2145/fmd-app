<?php
/**
 * JSONファイルを生成する際の個々のカスタムフィールド
 * mp_update_data.php で単独インクルードもしている
 *
 * ATTENSION setDiaryObject.js と関連しているので、このファイルを修正するときは該当ファイルも修正する
 *
 * @param $id 投稿ID
 *
 * @return (array) $unitに情報追加して返却 
 */
function diary_info($id) {
  $array_cf = ARRAY_CF;
  
  $unit = array(
    "diary_id" => $id,
    "diary_time" => get_the_date('Y-m-d\TH:i'),
    "diary_time_ymd" => get_the_date('Y-m-d'),
  );
    
  foreach ($array_cf as $cf) {
    $cf_value = esc_html(get_field($cf));
    $cf_value = trim_space_and_br_zengo($cf_value);
    $cf_value = replace_br($cf_value);
    $unit[$cf] = $cf_value;
  }
  
  return $unit;
}
