const linkNavBar = function () {
  let _this = $(this);
  
  // 通信中ではないか判別する
  if (!IS_CONNECTING) {
    
    // 選択中ではないか判別する
    if (!_this.hasClass("current")) {
      DIARY_VIEW = _this.attr("data-type");
      changeDiaryMode();
    }
  } else {
    setMessage("connecting", 10000);
  }
  return false;  
}