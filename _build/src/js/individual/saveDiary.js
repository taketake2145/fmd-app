/**
 * 日記の新規更新、新規作成
 *
 * DIARY_VIEW* {string} proofreading|new|edit
 */
const saveDiary = () => {
    
  let tgt_new,
      tgt_edit,
      form_data;
  
  switch (DIARY_VIEW) {
    case "new":
      tgt_new = $(".js-diary-view[data-type='new'] .js-form-diary");
      break;

    case "edit":
      tgt_edit = $(".js-diary-view[data-type='edit'] .js-form-diary");
      break;

    // default なし
  }
  
  // 音声を停止する
  voice("stop");

  
  // 新規、もしくは編集の場合
  if (tgt_new || tgt_edit) {

    // 通信中か判別する
    if (!IS_CONNECTING) {
      IS_CONNECTING = true;

      // ボタンを点滅する
      $(".js-link-save").addClass("animation-blinker");

      // パラメータ情報を取得する
      form_data = (tgt_new)? tgt_new.serialize(): tgt_edit.serialize();

      // データを読み込む(非同期通信)
      $.ajax({
        url: HOME_URL + "/ajax-diary-save/",
        type: "POST",
        data: form_data,
        cache: false,
        timespan: 5000
      })
      .done(function(d_num, status) {
        let d = {};
        
        

        if (status == "success") {

          if ($.isNumeric(d_num) && (+d_num) > 0) {

            // データを整形する
            d = setDairyObject(form_data);
            
            // IDをセットする
            d.diary_id = (+d_num);

            // 新規か編集か判別する
            if (DIARY_VIEW == "new" || DIARY.length === 0) {
              
              d.diary_id = (+d_num);

              DIARY.unshift(d);
              DIARY_NO = 0;
              setDiary();

              DIARY_VIEW = "edit";
              $("body").removeClass("view-diary-new").addClass("view-diary");
              changeDiaryMode();
              
              // 編集タブ表示
              $(".js-link-diary-nav[data-type='edit']").show();

              // 新規の初期化
              $("textarea, input", tgt_new).val("");
              $("input[name='post_date']", tgt_new).val(getNowTime());
            } else {              
              DIARY[DIARY_NO] = d;  // データ更新          
              setDiary();
            }

            MESSAGE_CODE = "save_success";
          } else if ((+d_num) === 0) {
            
            sendMail("日記保存時の想定外のエラー01", "ID=0");
            MESSAGE_CODE = "save_error_01";
          } else {

            sendMail("日記保存時の想定外のエラー02", $.param(form_data));
            MESSAGE_CODE = "save_error_02";
          }
        } else {
          sendMail("日記保存時の想定外のエラー03", $.param(form_data));
          MESSAGE_CODE = "save_error_03";
        }        
      })
      .fail(function(e){
        MESSAGE_CODE = "save_error_network";
      })
      .always(function(){
        let set_time = (MESSAGE_CODE === "save_success")? 3500: 10000;
        
        IS_CONNECTING = false;
        $(".js-link-save").removeClass("animation-blinker");  // 点滅解除
        setMessage(MESSAGE_CODE, set_time);
      });

    } else {
      setMessage("connecting", 10000);
    }
  }
  
  return false;
};