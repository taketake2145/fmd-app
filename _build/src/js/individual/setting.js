/**
 * 設定画面内のアクション
 */
const setting = () => {
  const _display_lang = $(".js-display-lang"),
        _display_font_size = $(".js-display-font-size"),
        _body = $("body"),
        _publish_status = $("[name='publish_status']"),
        _explain_publish_status = $(".js-explain-publish-status"),
        _nav_bar_share = $(".js-link-diary-nav[data-type='share']");
  
  let font_size = "2";
  
  const changeLang = () => {
    LANG = _display_lang.val();
    _body.attr("data-lang", LANG);
    
    // WordPressの管理画面の言語も変更する
    $.ajax({
      url: HOME_URL + "/ajax-lang/",
      type: "POST",
      data: {
        lang: LANG
      },
      timespan: 5000
    });
    
    LS.lang = LANG;
    saveLS(true);      
  }
  
  // 表示言語を設定する
  if (LS.lang) {
    LANG = LS.lang;
    _display_lang.val(LANG);
  } else {
    LANG = "en";
    _display_lang.val(LANG);
    changeLang();
  }
  _body.attr("data-lang", LANG);
  
  // 表示言語を変更する
  _display_lang.on("change", changeLang);  
  
  
  // フォントサイズを設定する
  if (LS.font_size) font_size = LS.font_size;
  _display_font_size.val(font_size);
  _body.attr("data-font-size", font_size);
  
  // フォントサイズを変更する
  _display_font_size.on("change", function () {
    
    font_size = _display_font_size.val();
    _body.attr("data-font-size", font_size);
    
    LS.font_size = font_size;
    saveLS();
  });
  
  
  // 公開設定を設定する
  if (!LS.status_publish) LS.status_publish = "private";
  _publish_status.val([LS.status_publish]);
  if (LS.status_publish === "private") {
    _explain_publish_status.hide();
    _nav_bar_share.hide();
  }

  // 公開設定を変更する
  _publish_status.on("change", function () {    
    let val = $(this).val();
        
    if (val === "private") {
      _explain_publish_status.hide();
      _nav_bar_share.hide();
    } else {
      _explain_publish_status.show();
      _nav_bar_share.show();
    }
    
    LS.status_publish = val;
    saveLS(true);
  });
  
  // 音声の名前を非表示にする（iOSとAndroidでは名前を変えても同じ声のため）
  if (IS_TOUCH) {
    $(".js-form-speech-name").hide();
  }      
  
  // URL選択時、全選択状態にする
  $(".js-form-const-url").on("click", function (e) {
    // $(this).select();
    e.target.setSelectionRange(0, e.target.value.length);
    return false;
  });
  
  // すべての設定をリセットする（言語と公開設定は対象外）
  $(".js-link-reset-all-setting").on("click", function () {
    let temp_lang = LS.lang,
        temp_status_publish = LS.status_publish;
    
    LS = {};
    storageDelLS("fmd");
    
    if (typeof temp_lang === "string") LS.lang = temp_lang;
    if (typeof temp_status_publish === "string") LS.status_publish = temp_status_publish;
    
    saveLS(true, true);
    return false;
  });  
}