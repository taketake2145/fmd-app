<?php
/**
 * functions直下のphpファイルをすべて呼び出す
 */
foreach (glob(dirname(__FILE__).'/functions/admin/{*.php}',GLOB_BRACE) as $file) {
  if (is_file($file)) {
    include_once($file);
  }
}


