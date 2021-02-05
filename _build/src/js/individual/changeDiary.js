/**
 * 日記を切り替える
 *
 * @param (string) prevnext* next|prev
 * @param (number) num: DIARYを表示している配列ナンバー
 * @param {boolean} 
 */
const changeDiary = function (prevnext, num) {
  const _diary = $(".js-diary"),
        _more = $(".js-link-diary-more"),
        _btn_next = $(".js-link-prevnext[data-type='next']"),
        _btn_prev = $(".js-link-prevnext[data-type='prev']"),
        _btn_prev_icon = $("> span", _btn_prev),
        _voice_btn = $(".js-link-voice");
      
  let data_ajax = _more.attr("data-ajax"),
      diary_number =(typeof num === "number")? num: DIARY_NO,
      new_number = (prevnext === "prev")? diary_number + 1: diary_number - 1;
        
  // DBアクセス中ではない場合
  if (!_btn_prev_icon.hasClass("animation-blinker")) {
        
    // 次の日記があるか判別する
    if (DIARY[new_number]) {
      
      // 表示条件を満たしているか判別する
      if (isViewDiary(new_number)) {
        DIARY_NO = new_number;
        
        $(".js-content-diary").scrollTop(0);
        _diary.css({opacity: 0, top: 10});
        
        setDiary();
        
        _diary.stop().animate({
          opacity: 1,
          top: 0
        }, 650);

        // 前後リンクありなしチェック
        checkPrevNext();
      } else if (!(new_number === 0 && prevnext === "next")) {
        
        changeDiary(prevnext, new_number); 
      }      
    } else if (data_ajax && data_ajax != "" && prevnext === "prev") {
      
      // DBにアクセスする
      // _btn_prev.removeAttr("data-ajax"); 通信に失敗したことも考えて属性は残しておく
      _btn_prev_icon.addClass("animation-blinker");
      getAjaxDiary(getParam(data_ajax), function() {
        _btn_prev_icon.removeClass("animation-blinker");
        changeDiary("prev", new_number);
      });    
    } else if (voicer.is_playing) {  // 音声再生中か確認する

      // 一旦、再生を止める
      voicer.is_playing = false;
      voicer.is_pausing = false;
      _voice_btn.removeClass("animation-blinker");

      if (voicer.is_autoplay) {  // リピート再生中は最初に戻る
        
        if (isViewDiary(0, "learning")) {
          voicer.is_playing = true;
          voicer.is_pausing = true;
          _voice_btn.addClass("animation-blinker");
          DIARY_NO = 0;
          setDiary(true);
        } else {
          changeDiary("prev", 0);
        }       
      }
    }
  }
}
