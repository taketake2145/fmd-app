<?php
/**
 * データを表示する
 */
include("functions/index.php");

// jsonファイルとして表示する
header('content-type: application/json; charset=utf-8');
echo get_diary();
