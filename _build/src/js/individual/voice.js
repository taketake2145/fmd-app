/**
 * 音を鳴らす
 *
 * @param {string|NULL} play|stop|setting|reset|toggle
 */
const voice = (action) => {
  const _voice_diary = $(".js-diary-view[data-type='learning'] .js-diary-final"),
        _voice_btn = $(".js-link-voice");
  
  let voice_text = '';
  
  if (action === "toggle") {
    action = (voicer.is_playing)? 'stop': 'play';
  }
  
  // 音声情報があるか判別する
  if (voicer.ary_voice.length > 0 && voicer.voice != "") {
    
    switch (action) {
      case 'stop':
        voicer.is_playing = false;
        _voice_btn.removeClass("animation-blinker");
        if (voicer.speech) speechSynthesis.cancel(voicer.speech);  // 停止する
        break;
      case 'reset':
        speechSynthesis.cancel();
        voicer.speech = null;
        if (voicer.is_playing) voice('play');
        break;
      case 'setting':
        if (voicer.speech) {
          speechSynthesis.cancel(voicer.speech);  // 停止する
          
          voicer.speech.volume = voicer.volume;
          voicer.speech.rate = voicer.rate;
          voicer.speech.pitch = voicer.pitch;
          voicer.speech.lang = voicer.lang;
          voicer.speech.voice = voicer.voice;
        }
        
        if (voicer.is_playing) {
          voicer.is_changing = true;
          
          // MEMO: setTimeout にするのは設定変更後にiPhoneで再生ができないため
          if (voicer.settiming) clearTimeout(voicer.settiming);
          voicer.settiming = setTimeout(function () {
            voice('play');
          }, 350);          
        }
        
        break;
      case 'play':
        voicer.is_playing = true;
        _voice_btn.addClass("animation-blinker");
        
        if (voicer.speech) {
          speechSynthesis.speak(voicer.speech);  // はじめから再生する
        } else {
          
          // 念のため、初期化
          speechSynthesis.cancel();
          voicer.speech = null;
          
          // text()ではなく html()。<br>は改行コードにすることで音声の区切りをつける
          voice_text = _voice_diary.html();
          voice_text = getBrToNr(voice_text);
          
          // テキストがあるか判別する
          if (voice_text != "") {
            
            // MEMO はじめの再生時、setTimeoutを使っての再生は有効にならないため
            if (!voicer.is_not_first) {
              voicer.is_not_first = true;
              voicerPlay({
                text: "",
                volume: 0
              });
            }
            
            // 音声を再生する
            if (voicer.settiming) clearTimeout(voicer.settiming);
            voicer.settiming = setTimeout(function () {
              if (voicer.is_playing) {
                voicerPlay({
                  text: voice_text,
                  volume: voicer.volume,
                  rate: voicer.rate,
                  pitch: voicer.pitch,
                  lang: voicer.lang,
                  voice: voicer.voice,
                  func: function () {
                                        
                    // MEMO: 音声終了時の解釈がブラウザで異なる
                    // 音声途中でも音声が停止したときに発火（Chrome)
                    // 音声が最後まで再生したときに発火（iOS）
                    setTimeout(function () {
                                                                  
                      if (voicer.is_changing && !IS_IOS) {
                        voicer.is_changing = false;
                      } else {

                        // 再生中で、オートプレイ設定中か判別する
                        if (voicer.is_playing && voicer.is_autoplay) {

                          // すべてか現在表示中のリピートか判別する
                          if (voicer.status_autoplay === "all") {
                            changeDiary("prev");
                          } else {
                            voice('play');
                          }
                        } else {
                          voice('stop');
                        }    
                      }
                    }, 350);
                  }
                });                
              }
            }, 1000);
          } else if (voicer.is_autoplay && voicer.status_autoplay === "all") {  // 全オートプレイモードか判別する
            changeDiary("prev");
          } else {
            voice('stop');
          }
        }
        break;
        
      // default なし
    }
  } else {
    
    // 音声情報をマークアップする
    voicerSetVoice(function() {
      
      // 音声情報があるか判別する
      if (voicer.ary_lang.length > 0) {
        
        // 指定言語が一致するか判別する
        if (arrayMatch(voicer.ary_lang, voicer.lang)) {
          voicer.setLang(voicer.lang);
        } else {
          setMessage("select_no_lang", 6000);
        }
      } else {
        setMessage("no_voice", 6000);
      }
    });
  }  
}