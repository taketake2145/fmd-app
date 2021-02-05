/**
 * 日記を削除する
 *
 * @param {string} t: temporary|completely
 */
const deleteDiary = (t) => {
  let _content_diary = $(".js-content-diary"),
      form_data = {};
  
  // 完全に削除でキャンセルした場合、もしくはゴミ箱の場合
  if ((t == "completely" && confirm(getText("confirmDeleteDiary"))) || 
      (t == "temporary" && confirm(getText("confirm_delete")))) {
    
    // 通信中ではないか判別する
    if (!IS_CONNECTING) {
      IS_CONNECTING = true;

      // ボタンを点滅
      if (t == "completely") {
        $(".js-link-delete-diary[data-type='completely']").addClass("animation-blinker");
      } else {
        $(".js-link-delete-diary[data-type='temporary']").addClass("animation-blinker");      
      }

      // パラメーターをセットする
      form_data.ID = $(".js-diary-view[data-type='edit'] .js-diary-id").val();
      form_data.status = t;

      // データを読み込む(非同期通信)
      $.ajax({
        url: HOME_URL + "/ajax-diary-delete/",
        type: "POST",
        data: form_data,
        timespan: 5000
      })
      .done(function(d_num, status) {

        if (status == "success") {

          if (isNumber(d_num) && (+d_num) === 1) {

            // 画面を一時非表示する
            _content_diary.css({opacity: 0});

            // PICK UPにある場合は削除する
            if (LS.ary_checkdiary && LS.ary_checkdiary.length > 0 && arrayMatch(LS.ary_checkdiary, form_data.ID)) {
              LS.ary_checkdiary.some(function (v, i) {
                if (v === (+form_data.ID)) LS.ary_checkdiary.splice(i, 1);    
              });

              // 設定を保存する
              saveLS(true);
            }          

            // データを削除する
            DIARY.splice(DIARY_NO, 1);

            // 削除後のデータがあるか判別する
            if (DIARY.length > 0) {

              if (!DIARY[DIARY_NO]) {
                DIARY_NO = DIARY_NO - 1;
              }
              
              // 編集タブ表示
              $(".js-link-diary-nav[data-type='edit']").show();
            } else {

              // 新規画面に変更する
              DIARY_VIEW = "new";
              $("body").removeClass("view-diary").addClass("view-diary-new");
              changeDiaryMode();
              
              // 編集タブ非表示
              $(".js-link-diary-nav[data-type='edit']").hide();
            }

            // データをセットする
            setDiary(true);

            // 画面を表示する
            _content_diary.scrollTop(1).stop().animate({opacity: 1}, 650);

            MESSAGE_CODE = "delete_success";
          } else {

            // 想定外のエラー
            sendMail("日記削除時の想定外のエラー 01", $.param(form_data));
            MESSAGE_CODE = "delete_error_01";
          }
        } else {
          sendMail("日記削除時の想定外のエラー 02", $.param(form_data));
          MESSAGE_CODE = "delete_error_02";
        }

      })
      .fail(function(e){
        MESSAGE_CODE = "delete_error_network";
      })
      .always(function(){
        IS_CONNECTING = false;
        $(".js-link-delete-diary").removeClass("animation-blinker");  // 点滅解除
        setMessage(MESSAGE_CODE);
      });

    } else {
      setMessage("connecting", 10000);
    }
  }
  
  return false;
}
