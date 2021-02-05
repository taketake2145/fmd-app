/**
 * 日記を検索する
 *
 * @param {boolean|null} is_reset true: リセットして初期表示
 */
const searchDiary = (is_reset) => {
  
  const _link_search = $(".js-link-form-search"),
        _freeword = $(".js-form-search [name='q']"),
        _content_diary = $(".js-content-diary"),
        _body = $("body");
  
  let obj = {},
      val_fw = _freeword.val().trim(),
      is_checked = (LS.search_checked && LS.ary_checkdiary && LS.ary_checkdiary.length > 0)? true: false,
      is_shuffle = (LS.search_shuffle && LS.search_shuffle === true)? true: false,
      can_search = false,
      temp_diary = [],
      temp_diary_no = 0;
  
  
  // 通信中ではないか判別する
  if (!IS_CONNECTING) {
    
    // 再生中の音声があればストップする（リアルタイム反映ができないため）
    if (voicer.is_playing) {
      playVoice();
    }
    
    // 検索条件を確認する
    if (is_reset === true || (val_fw == "" && !is_checked && !is_shuffle)) {
      can_search = true;
      DIARY = [];
      DIARY_NO = 0;
      
      _freeword.val("");
      if (is_checked) searchCheckDiary();
      if (is_shuffle) searchShuffle();
            
    } else if (val_fw != "" || is_checked || is_shuffle) {
      can_search = true;
      obj.q = val_fw;
      if (is_checked) obj.id = LS.ary_checkdiary.join(",");
      if (is_shuffle) obj.shuffle = 1;
      
      // データをリセットする
      temp_diary = DIARY;
      temp_diary_no = DIARY_NO;
      DIARY = [];
      DIARY_NO = 0;    
    }
    
    // ログインIDと取得する投稿者IDが異なる場合
    if (!IS_SAME_ID_USER_AND_LOGIN) {
      obj.user = USER_ID;    
    }
        
    // 該当データを取得する
    if (can_search) {
      IS_CONNECTING = true;
      
      // ボタンをブリンカーする
      _link_search.addClass("animation-blinker");
      
      getAjaxDiary(obj, function () {

        let is_zero = false;
                
        IS_CONNECTING = false;
        $(".js-short-message").hide();
        
        if (DIARY.length === 0) {
          is_zero = true;
          DIARY = temp_diary;
          DIARY_NO = temp_diary_no;
          setMessage("zero_hit");
        }
        
        // まるっと暗記以外はタブを切り替える
        if (DIARY_VIEW !== "learning") {
          DIARY_VIEW = (_body.hasClass("view-diary-new"))? "edit": "feedback";
          
          if (_body.hasClass("view-diary-new")) {
            _body.removeClass("view-diary-new").addClass("view-diary");
            $(".js-nav-common").addClass("nav-common--search")
          }
          
          changeDiaryMode();          
        }
        
        // データをセットする
        setDiary();
        
        _link_search.removeClass("animation-blinker");  // ボタンのブリンカーを解除する
        if (!is_zero) {
          $(".js-short-message").hide();  // ショートメッセージを非表示にする
          closeSettingAndSearch();  // メニュー画面を閉じるjs-short-message
          _content_diary.scrollTop(0); // スクロールトップにする
        }
      });      
    }
  } else {
    setMessage("connecting", 10000);
  }
  
  
  return false;
}