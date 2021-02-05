<?php
/**
 * 連想配列の指定したキーが配列にあるかどうかを調べて、あればその値を返却
 * 利用条件：enc.phpを読み込んでいること
 *
 * @param $key string|number
 * @param $ary array
 * @param $def string|null $aryに対する$keyが存在しない場合の返却デフォルト値
 * @return string|number
 */
function enc_param($key = null, $ary = array(), $def = '') {
    return ('array' == gettype($ary) && array_key_exists($key, $ary) && '' != $ary[$key])? enc($ary[$key]): $def; 
}
