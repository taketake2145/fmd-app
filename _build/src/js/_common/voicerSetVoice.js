/**
 * 音声切り替え情報をマークアップする
 *
 * 必ず、voicerInit関数の中で呼ばれ、直接呼び出すことはない前提
 * ただし、load時に言語・名前が生成されない場合は別途呼び出す
 * Androidで発覚
 */
const voicerSetVoice = (func) => {
  const tgt = $(".js-form-speech"),
        tgt_lang = $("select.js-speech-lang"),
        tgt_lang_select = $(".js-speech-lang-flag"),
        tgt_voice = $("select.js-speech-voice");
    
  let speech = new SpeechSynthesisUtterance();
  
  // 事前に最低限のマークアップがあるか判別する
  if (tgt_lang.length > 0 || tgt_voice.length > 0) {
    
    // 一度音声を再生し、タイムラグ後にならないと、音声情報を取得できないので、空テキストを再生し時間差で処理する
    speech.text = '';
    speechSynthesis.speak(speech);
    setTimeout(function () {
      let t = '',
          i;
      
      // 音声情報を取得する
      voicer.ary_voice = speechSynthesis.getVoices();
            
      // 名前をマークアップする
      arraySort(voicer.ary_voice, "name");  // 名前で並び変える
      
      t = '<option class="all" value="all">Anonymous</option>';
      for (i = 0; i < voicer.ary_voice.length; i++) {
        t += '<option class="' + voicer.ary_voice[i].lang + '" value="' + voicer.ary_voice[i].name + '">' + voicer.ary_voice[i].name + '</option>';
      }
      tgt_voice.html(t);
      
      /*
       * 言語
       */
      arraySort(voicer.ary_voice, "lang");  // langで並び替える
      voicer.ary_voice_lang = arrayDelDouble(voicer.ary_voice, "lang");  // 重複を削除して、lang用の配列をつくる

      // マークアップする
      t = '<option class="all" value="all">---</option>';
      for (i = 0; i < voicer.ary_voice_lang.length; i++) {
        t += '<option value="' + voicer.ary_voice_lang[i].lang + '">' + voicer.ary_voice_lang[i].lang + '</option>';
        voicer.ary_lang.push(voicer.ary_voice_lang[i].lang);
      }
      tgt_lang.html(t);
      
      /*
       * 言語アイコン
       * ja-JP ja_JP のように端末によって、「-」「_」があるので、そのケアも入れています
       */
      if ($(".js-speech-lang-flag").length > 0 && voicer.ary_lang.length > 0) {
        $(".js-speech-lang-flag").each(function () {
          let lang = $(this).attr("data-lang");
          
          if (arrayMatch(voicer.ary_lang, lang)) {
            $(this).attr("data-type", lang);
          } else if (arrayMatch(voicer.ary_lang, lang.replace("-", "_"))) {
            $(this).attr("data-type", lang.replace("-", "_"));       
          } else {
            $(this).remove();
          }
        });
      }

      /*
       * 言語を切り替える
       */
      tgt_lang.on("change", function () {
        let val = $(this).val();
        
        if (val === "all") {
          voicer.voice = "";
          voicer.lang = "";
        } else {
          voicer.voice = voicerGetVoice(val);
          voicer.lang = (voicer.voice)? voicer.voice.lang: "";
        }
        voicerSetSelect();
      });

      /*
       * 名前を切り替える
       */
      tgt_voice.on("change", function () {
        voicer.voice = voicerGetVoice($(this).val(), true);
        voicer.lang = (voicer.voice)? voicer.voice.lang: "";
        voicerSetSelect();
      });
      
      /**
       * 言語・名前マークアップ後に処理する
       */
      if (func) func();
    }, 100);
  }

  /**
   * 名前、もしくは言語が変更されたときの挙動
   * Hack: Safari 14.x でform要素（input, option）では、display: noneが無効になるため
   * Hack: Safari 14.x でlangが無効となるため、voiceの指定を必須とする
   * voicer.voice に値がある場合は、その値が有効であることが前提
   */
  const voicerSetSelect = () => {
    let selected_lang,
        val_voice,
        voice_lang = '',
        voice_name = '',
        i;
    
    // 音声設定を更新する
    if (voice) voice('setting');
    
    $(".bugfix-safari-hide option", tgt_voice).unwrap();  // 名前をすべて表示する
    
    // 名前が設定されていないか判別する
    if (voicer.voice === "") {      
      tgt_voice.val("all");  // 名前を選択をリセットする
      tgt_lang.val("all");  // 名前を選択をリセットする
    } else {
      voice_lang = voicer.voice.lang;
      voice_name = voicer.voice.name;
      
      selected_lang = $("option." + voice_lang, tgt_voice);
      tgt_lang.val(voice_lang);
      
      $(".js-speech-lang-flag[data-type='" + voice_lang + "']").addClass("selected");
      
      // 名前を全非表示する（Hackの都合で、一旦、すべて表示後に非表示にする必要あり
      $("option", tgt_voice).wrap('<span class="bugfix-safari-hide">');
      selected_lang.unwrap();  // 選択した言語の名前を表示する
      
      // 名前が一致するか判別する
      if ($("option." + voice_lang + "[value='" + voice_name + "']", tgt_voice).length === 1) {
        tgt_voice.val(voice_name);
      } else {

        // 選択した言語の名前が複数あるか判別する
        if (selected_lang.length > 1) {
          voicer.voice = voicerGetVoice(voice_lang);
          tgt_voice.val(voicer.voice.name);
        } else {
          val_voice = selected_lang.val();  // 名前を取得する          
          voicer.voice = voicerGetVoice(val_voice, true);          
        }
        
        voicer.lang = (voicer.voice)? voicer.voice.lang: "";        
      }
    }
    
    // 名前を変更した際に、何かしら処理を実行する場合
    if (voicer.voice != "" && voicer.changeVoice) {
      voicer.changeVoice(voicer.voice);
      
      // ピッチはリセットする
      voicer.pitch = 1;
      setVoicePlusMinus("pitch");
    }
  }
  
  /**
   * 言語をセットする
   */
  voicer.setLang = (v) => {
    voicer.voice = voicerGetVoice(v);
    voicer.lang = (voicer.voice)? voicer.voice.lang: "";
    voicerSetSelect();
  }
  
  /**
   * 名前をセットする
   */
  voicer.setVoice = (v) => {
    voicer.voice = voicerGetVoice(v, true);
    voicer.lang = (voicer.voice)? voicer.voice.lang: "";
    voicerSetSelect();
  }
  
  /**
   * リンク 音声言語アイコンをタップする
   */
  tgt_lang_select.on("click", function () {
    let tgt = $(this);
    if (!tgt.hasClass("selected")) {
      tgt.addClass("selected");
      voicer.setLang(tgt.attr("data-type"));
    }
    return false;
  });
}


