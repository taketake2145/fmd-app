/**
 * 検索対象をシャッフルにしたとき
 *
 * @param {boolean|null} is_search true: シャッフルがアクティブのとき、検索も実行する
 */
const searchShuffle = (is_search) => {
  
  const _search_shuffle = $(".js-link-search-shuffle"),
        _player_shuffle = $(".js-link-player-shuffle");
    
  // 現在シャッフル設定中か判別する
  if (_search_shuffle.hasClass("selected")) {
    LS.search_shuffle = false;
    
    _search_shuffle.removeClass("selected");
    _player_shuffle.removeClass("active");
  } else {
    LS.search_shuffle = true;
    
    _search_shuffle.addClass("selected");
    _player_shuffle.addClass("active");
    
    // 音声でシャッフルがアクティブのときは検索もする
    if (is_search === true) {
      searchDiary();  // LS.search_shuffle = true 後である必要あり
    }
  }
  
  return false;
}