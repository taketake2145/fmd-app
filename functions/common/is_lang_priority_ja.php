<?php
/**
 * 優先言語が日本語か確認する
 * http://qiita.com/Sankame/items/ceaaf07c7d870e5e5248
 *
 * return boolean
 */
function is_lang_priority_ja() {
    $priority_language = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    return (preg_match('/^ja/i', $priority_language));
}
