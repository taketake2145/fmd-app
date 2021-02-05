<?php
$array_cf = array("diary_list", "diary_link", "diary_ja", "diary_ja_summary", "diary_en_first", "diary_en_report", "diary_proofreading_01", "diary_proofreading_02", "diary_vocabulary", "diary_fix", "diary_final");
define("ARRAY_CF", $array_cf);

if (enc_param("user", $_GET) == "") {
  array_push($array_cf, "diary_list");
}

