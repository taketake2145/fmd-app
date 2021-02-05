/**
 * 検索対象を要チェックのON/OFF
 */
const searchCheckDiary = () => {
  
  const _search_check = $(".js-link-search-check");
    
  // 要チェックのデータがあるか判別する
  if (LS.ary_checkdiary && LS.ary_checkdiary.length > 0) {

    // 現在、要チェック設定中か判別する
    if (_search_check.hasClass("selected")) {
      if (LS.search_checked) delete LS.search_checked;

      _search_check.removeClass("selected");
    } else {
      LS.search_checked = true;

      _search_check.addClass("selected");    
    }

    saveLS();
    
  } else {
    
    _search_check.removeClass("selected");
    setMessage("no_checked_list", 7000);
  }
  
  return false;
}