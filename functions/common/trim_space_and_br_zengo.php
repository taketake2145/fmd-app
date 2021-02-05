<?php
/**
 * 前後の余白・改行コードをトルツメ
 * http://qiita.com/saku/items/2cac8fbd7cfd4c493b52
 */
function trim_space_and_br_zengo($str = "") {
  $chars = "[\\x0-\x20\x7f\xc2\xa0\xe3\x80\x80]";
  return preg_replace("/\A{$chars}++|{$chars}++\z/u", '', $str);
}

