/**
 * 音声関連
 * voicer*
 */
const setVoice = () => {
  
  // ローカルストレージを反映させる
  if (LS.voicer) {
    if (LS.voicer.volume) voicer.volume = LS.voicer.volume;
    if (LS.voicer.rate) voicer.rate = LS.voicer.rate;
    if (LS.voicer.pitch) voicer.pitch = LS.voicer.pitch;
    if (LS.voicer.lang) voicer.lang = LS.voicer.lang;
    if (LS.voicer.name) voicer.name = LS.voicer.name;
    if (LS.voicer.autoplay) voicer.is_autoplay = (LS.voicer.autoplay === "yes")? true: false;
  } else {
    LS.voicer = {};
  }
  
  // voice情報取得後、かつ名前があるか判別する
  if (voicer.ary_voice.length > 0 && voicer.name != "") {
    voicer.setVoice(voicer.name);
  }
  
  // プラスマイナスをセットする
  setVoicePlusMinus($(".js-link-player-label .current").attr("data-type"));
  
  // オートプレイをセットする
  if (voicer.is_autoplay) {
    $(".js-link-player-loop").addClass("active");
  }
  
  // voiceが変更した際
  voicer.changeVoice = (voice) => {
    const _speech_lang_flag = $(".js-speech-lang-flag");
    
    // 言語アイコンにセットする
    _speech_lang_flag.removeClass("selected");
    $(".js-speech-lang-flag[data-type='" + voice.lang + "']").addClass("selected");
        
    // ローカルストレージにセットする
    if (LS.voicer.name !== voice.name) {
      LS.voicer.name = voice.name;
    }
    if (LS.voicer.lang !== voice.lang) {
      LS.voicer.lang = voice.lang;
    }
    if (LS.voicer.pitch !== voice.pitch) {
      LS.voicer.pitch = voice.pitch;
    }
    saveLS(true);
  }

  // リンク オート再生設定を変更する
  $(".js-link-player-loop").on(eventstart, function () {
    let _this = $(this),
        temp_ls;

    if (_this.hasClass("active")) {
      voicer.is_autoplay = false;
      _this.removeClass("active");
    } else {
      voicer.is_autoplay = true;
      _this.addClass("active");
    }
    
    LS.voicer.autoplay = (voicer.is_autoplay === true)? "yes": "no";
    saveLS();
    
    return false;
  });

  // リンク シャッフルする
  $(".js-link-player-shuffle").on(eventstart, function () {
    searchShuffle(true);    
    return false;
  });

  // リンク プラスマイナスタイプ変更
  $(".js-link-player-label").on(eventstart, function () {
    let tgt = $(".js-link-player-label .current"),
        tgt_next = tgt.next(),
        tgt_type = "";

    tgt.removeClass("current");
    if (tgt_next.length === 0) {
      tgt_next = $(".js-player-label-type:first-child", this);
    }
    tgt_next.addClass("current");
    
    tgt_type = tgt_next.attr("data-type");
    setVoicePlusMinus(tgt_type);

    return false;
  });
  
  // リンク プラスマイナスの値を変更する
  $(".js-link-player[data-type='plus'], .js-link-player[data-type='minus']").on(eventstart, function () {
    let tgt_type = $(".js-link-player-label .current").attr("data-type");    
    setVoicePlusMinus(tgt_type, $(this).attr("data-type"));
    return false;
  });
  
  // リンク 再生/停止
  $(".js-link-voice").on("click", function () {
    
    if (DIARY_VIEW === "learning") {
      playVoice();
    }
    return false;
  });
  
}
