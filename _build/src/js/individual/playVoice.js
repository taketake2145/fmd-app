/**
 * 音を鳴らす
 * changeDiary.js と連動しているので扱い注意
 *
 * @param {bookean|NULL} is_prev 次の日記を読み込んでいるどうか
 */
const playVoice = (is_prev) => {
  const _voice_diary = $(".js-diary-view[data-type='learning'] .js-diary-final"),
        _voice_btn = $(".js-link-voice");
  
  let voice_text = '',
      i;
  
  // 音声情報があるか判別する
  if (voicer.ary_voice.length > 0 && voicer.voice != "") {

    // 次の日記をautoplayで読み込んでいるかどうか
    if (is_prev) {
      voicer.is_playing = false;    
      playVoice();
    } else if (voicer.is_playing) {  // 再生中か確認する
      
      if (voicer.speech) {
                
        // 設定が変更したか確認する
        if (voicer.is_setting_change) {
          voicer.is_setting_change = false;
          speechSynthesis.cancel(voicer.speech);  // 停止する MEMO: 一時停止で設定を変更しても反映されない
          voicer.speech.volume = voicer.volume;
          voicer.speech.rate = voicer.rate;
          voicer.speech.pitch = voicer.pitch;
          voicer.speech.lang = voicer.lang;
          voicer.speech.voice = voicer.voice;
          speechSynthesis.speak(voicer.speech);  // はじめから再生する
          
        } else {

          voicer.is_playing = false;
          _voice_btn.removeClass("animation-blinker");

          // オートプレイ設定中か判別する
          if (voicer.is_autoplay) {
            voicer.is_pausing = true;
            speechSynthesis.pause(voicer.speech);  // 一時停止する
          } else {
            voicer.is_pausing = false;
            speechSynthesis.cancel(voicer.speech);  // 停止する
            voicer.speech = null;
          }
        }
      }

    } else {
      voicer.is_playing = true;
      _voice_btn.addClass("animation-blinker");
      
      // すでに再生中か判別する
      if (voicer.speech) {
        
        if (voicer.is_pausing) {
          speechSynthesis.resume(voicer.speech);  // 再開する
        } else {
          speechSynthesis.speak(voicer.speech);  // はじめから再生する            
        }
      } else {
        
        // まずはキャンセル
        speechSynthesis.cancel(voicer.speech);
        speechSynthesis.cancel();
        voicer.speech = null;

        // text()ではなく html()。<br>は改行コードにすることで音声の区切りをつける
        voice_text = _voice_diary.html();
        voice_text = getBrToNr(voice_text);
        
        // テキストがあるか判別する
        if (voice_text != "") {
          
          voicerPlay({
            text: voice_text,
            volume: voicer.volume,
            rate: voicer.rate,
            pitch: voicer.pitch,
            lang: voicer.lang,
            voice: voicer.voice,
            func: function () {
              if (voicer.speech) voicer.speech = null;

              // 再生中で、オートプレイ設定中で、前の日記があるか判別する
              if (voicer.is_playing && voicer.is_autoplay) {
                
                // すべてか現在表示中のリピートか判別する
                if (voicer.status_autoplay === "all") {
                  changeDiary("prev");                    
                } else {
                  setDiary(); 
                }
                
                
                // 次の日記がある場合
                /*
                if ($(".js-link-diary-more").hasClass("active") || (+DIARY_NO) < DIARY.length) {
                  changeDiary("prev");
                } else if (DIARY.length - 1 === DIARY_NO) {  // 日記が一件の場合、最初のヴォイスありに戻る NOTES 最後の日記に結果がある前提
                  for (i = 0; i < DIARY.length; i++) {
                    if (isViewDiary(i)) {
                      DIARY_NO = i;
                      setDiary(true);
                      break;
                    }
                  }                           
                }
                */
              } else {
                
                voicer.is_playing = false;
                voicer.is_pausing = false;
                _voice_btn.removeClass("animation-blinker");
              }    
            }
          });
        } else {
          changeDiary("prev");
        }
      }
    }
    
  } else {
    
    // 音声情報をマークアップする
    voicerSetVoice(function() {
      
      // 音声情報があるか判別する
      if (voicer.ary_lang.length > 0) {
        
        // 指定言語が一致するか判別する
        if (arrayMatch(voicer.ary_lang, voicer.lang)) {
          voicer.setLang(voicer.lang);
          playVoice(is_prev);            
        } else {
          setMessage("select_no_lang", 6000);
        }
      } else {
        setMessage("no_voice", 6000);
      }
    });
  }
}
