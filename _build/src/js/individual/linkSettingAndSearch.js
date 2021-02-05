/**
 * メニューを表示する
 */
const linkSettingAndSearch = () => {
  
 const _body = $("body"),
       _content_diary = $(".js-content-diary"),
       _content_setting = $(".js-content-setting"),
       _content_search = $(".js-content-search");
    
  // メニューを閉じる
  $(".js-link-close-dialog").on(eventstart, closeSettingAndSearch);

  // 設定や検索を表示する
  $(".js-link-setting, .js-link-search").on(eventstart, function () {
    
    // 検索か設定か判別する
    let tgt = ($(this).hasClass("js-link-setting"))? _content_setting: _content_search,
        class_name = ($(this).hasClass("js-link-setting"))? "view-setting": "view-search";
    
    // 通信中ではないか判別する
    if (!IS_CONNECTING) {
      _body.addClass(class_name);
      _content_diary.hide();     
      tgt.css({opacity: 0}).show();
      tgt.scrollTop(0);
      tgt.stop().animate({opacity: 1}, 650);      
    } else {
      setMessage("connecting", 10000);
    }
    
    // 言語・名前を取得していない場合、音声情報をマークアップする (for Android)
    if (voicer.ary_voice.length === 0) {
      voicerSetVoice(function () {
        
        if (voicer.name != '') {
          voicer.setVoice(voicer.name);
        }
      });
    }
    
    return false;    
  });
  
}

// メニューを閉じる
const closeSettingAndSearch = () => {
  
 const _body = $("body"),
       _content_diary = $(".js-content-diary"),
       _content_setting = $(".js-content-setting"),
       _content_search = $(".js-content-search");
  
  _body.removeClass("view-setting");
  _body.removeClass("view-search");
  _content_setting.hide();
  _content_search.hide();
  _content_diary.css({opacity: 0}).show();
  _content_diary.stop().animate({opacity: 1}, 650);
  return false;    
}  


