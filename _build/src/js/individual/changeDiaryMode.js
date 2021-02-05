/**
 * 表示モードを変更する
 */
const changeDiaryMode = function () {
  const _body = $("body"),
        _player = $(".js-player"),
        _content_diary = $(".js-content-diary"),
        _diary_view = $(".js-diary-view"),
        _link_diary_nav = $(".js-link-diary-nav"),
        _link_voice = $(".js-link-voice");        
  
  // 表示モードによって、表示ステータスを変更する
  _body.attr("data-content", DIARY_VIEW);
  
  if (DIARY_VIEW == "new" || DIARY_VIEW == "topics") {
    DIARY_VIEW_EDIT = DIARY_VIEW;
  }

  // コンテンツエリアの表示を変更する
  _content_diary.scrollTop(0);
  _diary_view.css({opacity: 0}).hide().stop();
  $(".js-diary-view[data-type='" + DIARY_VIEW + "']").show().animate({
    opacity: 1
  }, 650);
  
  // タブバーのステータスを変更する
  _link_diary_nav.removeClass("current");  
  $(".js-link-diary-nav[data-type='" + DIARY_VIEW + "']").addClass("current");
  
  // タブのボイスステータスを変更する、オーディオプレイヤーを表示・非表示する
  if (DIARY_VIEW === "learning") {
    _link_voice.addClass("active");
    _player.addClass("show");
  } else {
    _link_voice.removeClass("active");
    _player.removeClass("show");
  }
  
  // 初期表示が振り返りかまるっと暗記かメモかをローカルストレージにセットする
  if (DIARY_VIEW === "feedback" || DIARY_VIEW === "learning" || DIARY_VIEW === "memo") {
    
    if (LS.diary_view !== DIARY_VIEW) {
      LS.diary_view = DIARY_VIEW;
      saveLS(true);
    }
  }
  
  // 前後リンクを再チェックする
  checkPrevNext();
  
}
