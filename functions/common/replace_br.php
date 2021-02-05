<?php
/**
 * 改行コードをbrタグに変換する
 */
function replace_br($val = "") {
  $val = preg_replace('/\r\n/', '<br>', $val);
  $val = preg_replace('/\r/', '<br>', $val);
  $val = preg_replace('/\n/', '<br>', $val);
  
  return $val;
}