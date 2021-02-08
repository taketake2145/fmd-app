/**
 * 音声関連
 * voicer*
 */
const setVoice = () => {
  
  const _link_player_loop = $(".js-link-player-loop");
  
  // ローカルストレージを反映させる
  if (LS.voicer) {
    if (LS.voicer.volume) voicer.volume = LS.voicer.volume;
    if (LS.voicer.rate) voicer.rate = LS.voicer.rate;
    if (LS.voicer.pitch) voicer.pitch = LS.voicer.pitch;
    if (LS.voicer.lang) voicer.lang = LS.voicer.lang;
    if (LS.voicer.name) voicer.name = LS.voicer.name;
    if (LS.voicer.autoplay) {
      voicer.is_autoplay = (LS.voicer.autoplay === "stop")? false: true;
      voicer.status_autoplay = LS.voicer.autoplay;
    }
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
  if (voicer.status_autoplay === "all") {
    _link_player_loop.addClass("active");
  } else if (voicer.status_autoplay === "one") {
    _link_player_loop.addClass("active").addClass("one");
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
  _link_player_loop.on(eventstart, function () {
    let _this = $(this),
        temp_ls;
    
    switch (voicer.status_autoplay) {
      case "all":
        voicer.is_autoplay = true;
        voicer.status_autoplay = 'one';
        _this.addClass("one");
        break;
      case "one":
        voicer.is_autoplay = false;
        voicer.status_autoplay = 'stop';
        _this.removeClass("active").removeClass("one");
        break;
      default:
        voicer.is_autoplay = true;
        voicer.status_autoplay = 'all';
        _this.addClass("active");
      
    }
    
    LS.voicer.autoplay = voicer.status_autoplay;
    saveLS();
    
    return false;
  });

  // リンク シャッフルする
  $(".js-link-player-shuffle").on(eventstart, function () {
    searchShuffle(true);    
    return false;
  });

  // リンク プラスマイナスタイプ変更もしくは初期化にもどす
  longtap($(".js-link-player-label"), function () {
    
    // ダブルタップでデフォルト値に変更する
    let tgt_type = $(".js-link-player-label .current").attr("data-type");
    setVoicePlusMinus(tgt_type, $(this).attr("data-type"), true);
  }, function () {
    
    // プラスマイナスタイプを変更する
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
    voice('toggle');
    return false;
  });
  
}
