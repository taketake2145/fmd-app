<?php
/**
 * 文字列エンコード
 */
function enc($t = '') {
  return (gettype($t) === 'string')? htmlspecialchars($t, ENT_QUOTES, 'UTF-8'): $t;
}