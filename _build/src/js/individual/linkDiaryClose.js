/**
 * 日記の編集画面を閉じる
 */
const linkDiaryClose = () => {

  // 通信中ではないか判別する
  if (!IS_CONNECTING) {
    
    // focus中の場合は、blurする （Android対策 仮想キーボードを非表示にした際に、blur処理が実行されない場合がある）
    if ($("body").hasClass("focusing")) {
      $(".js-diary-view[data-type='" + DIARY_VIEW + "']").hide();
      setTimeout(function () {
        $(".js-diary-view[data-type='" + DIARY_VIEW + "']").show();
        $("body").removeClass("focusing");        
      }, 100);
    } else {
      if (DIARY_VIEW_TEMP === '') DIARY_VIEW_TEMP = "feedback"; 
      DIARY_VIEW = DIARY_VIEW_TEMP;
      changeDiaryMode();    
      $("body").addClass("view-diary").removeClass("view-diary-new");
      adjustFooterText();        
    }
  } else {
    setMessage("connecting", 10000);
  }
  return false;
}