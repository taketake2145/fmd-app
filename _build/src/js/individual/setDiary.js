/**
 * 画面表示
 *
 * DIARY*, DIARY_NO*
 * @param {boolean|null} is_prevnext true: 前後チェックの処理を行う
 */
let setDiary = (is_prevnext) => {  
  let _diary_edit = $(".js-diary-view[data-type='edit']"),
      _diary_proofreading = $(".js-diary-view[data-type='proofreading']"),
      _diary_topics = $(".js-diary-view[data-type='topics']"),
      _diary_feedback = $(".js-diary-view[data-type='feedback']"),
      _diary_learning = $(".js-diary-view[data-type='learning']"),
      _diary_memo = $(".js-diary-view[data-type='memo']"),
      _diary_another_title = $(".js-diary-another-title"),
      _link_check = $(".js-link-check");
      
  let d = DIARY[DIARY_NO],    
      text = '',
      is_feedback_another = false;
  
  
  // データがあるか判別する
  if (d) {
    
    // チェックボックスを有効にする
    _link_check.addClass("active");    
  } else {
    d = setDairyObject();  // オールリセット
  }
    
  if (_diary_edit.length > 0) {
        
    // edit
    $(".js-diary-id", _diary_edit).val(d.diary_id);
    $(".js-diary-date", _diary_edit).val(d.diary_time);
    
    $(".js-diary-list", _diary_edit).val(getBrToNr(d.diary_list));
    $(".js-diary-ja", _diary_edit).val(getBrToNr(d.diary_ja));
    $(".js-diary-ja-summary", _diary_edit).val(getBrToNr(d.diary_ja_summary));
    $(".js-diary-en-first", _diary_edit).val(getBrToNr(d.diary_en_first));
    $(".js-diary-en-report", _diary_edit).val(getBrToNr(d.diary_en_report));
    $(".js-diary-proofreading-01", _diary_edit).val(getBrToNr(d.diary_proofreading_01));
    $(".js-diary-proofreading-02", _diary_edit).val(getBrToNr(d.diary_proofreading_02));
    $(".js-diary-vocabulary", _diary_edit).val(getBrToNr(d.diary_vocabulary));
    $(".js-diary-fix", _diary_edit).val(getBrToNr(d.diary_fix));
    $(".js-diary-final", _diary_edit).val(getBrToNr(d.diary_final));
              
    // topics
    $(".js-diary-list", _diary_topics).html(d.diary_list);
  }
  
  // feedback（処理順番大事）
  text = (d.diary_ja_summary != "")? d.diary_ja_summary: d.diary_ja;
  $(".js-diary-ja-summary", _diary_feedback).html(text);
  
  text = (d.diary_en_report == "")? d.diary_en_first: d.diary_en_report;
  $(".js-diary-en-first", _diary_feedback).html(text);
  
  switch (true) {
    case (d.diary_fix != ""):
      text = d.diary_fix;
      break;
    case (d.diary_proofreading_02 != ""):
      text = d.diary_proofreading_02;
      break;
    case (d.diary_proofreading_01 != ""):
      text = d.diary_proofreading_01;
      break;
    default:
      text = "";
  }
  $(".js-diary-fix", _diary_feedback).html(text);
  
  $(".js-diary-vocabulary", _diary_feedback).html(d.diary_vocabulary);
  
  // 添削後の項目が一つだけの場合か判別する
  if ((d.diary_proofreading_01 == "" && d.diary_proofreading_02 == "" && d.diary_fix == "") ||
     (d.diary_proofreading_01 != "" && d.diary_proofreading_02 == "" && d.diary_fix == "") ||
     (d.diary_proofreading_01 == "" && d.diary_proofreading_02 != "" && d.diary_fix == "") ||
     (d.diary_proofreading_01 == "" && d.diary_proofreading_02 == "" && d.diary_fix != "") ||
     (d.diary_proofreading_01 == "" && d.diary_proofreading_02 == "" && d.diary_fix == "")) {
    $(".js-diary-proofreading-01", _diary_feedback).html("").hide(); 
    $(".js-diary-proofreading-02", _diary_feedback).html("").hide();
  } else {      

    if (d.diary_proofreading_01 != "" && d.diary_fix != d.diary_proofreading_01 && text != "") {
      $(".js-diary-proofreading-01", _diary_feedback).html(d.diary_proofreading_01).show();
      is_feedback_another = true;
    } else {
      $(".js-diary-proofreading-01", _diary_feedback).html("").hide(); 
    }

    if (d.diary_proofreading_02 != "" && d.diary_proofreading_02 != d.diary_proofreading_01 && d.diary_fix != d.diary_proofreading_02 && text != "") {
      $(".js-diary-proofreading-02", _diary_feedback).html(d.diary_proofreading_02).show();
      is_feedback_another = true;
    } else {
      $(".js-diary-proofreading-02", _diary_feedback).html("").hide(); 
    }
  }
  
  if (is_feedback_another) {
    _diary_another_title.show();
  } else {
    _diary_another_title.hide();
  }
  
  // learning
  switch (true) {
    case (d.diary_final != ""):
      text = d.diary_final;
      break;
    case (d.diary_fix != ""):
      text = d.diary_fix;
      break;
    case (d.diary_proofreading_02 != ""):
      text = d.diary_proofreading_02;
      break;
    case (d.diary_proofreading_01 != ""):
      text = d.diary_proofreading_01;
      break;
    default:
      text = "";
  }  
  $(".js-diary-final", _diary_learning).html(text);
  $(".js-diary-vocabulary", _diary_learning).html(d.diary_vocabulary);
  
  // メモがない場合は、メモエリアを非表示にする
  if (d.diary_vocabulary === "") {
    $(".js-diary-vocabulary", _diary_learning).hide();
    $(".js-diary-vocabulary").closest(".js-diary-unit").hide();
  } else {
    $(".js-diary-vocabulary", _diary_learning).show();
    $(".js-diary-vocabulary").closest(".js-diary-unit").show();
  }
  
  // memo
  $(".js-diary-vocabulary", _diary_memo).html(d.diary_vocabulary);
  
  // pick up
  if (!LS.ary_checkdiary) LS.ary_checkdiary = [];
  if (arrayMatch(LS.ary_checkdiary, d.diary_id) === false) {
    _link_check.removeClass("select");
  } else {
    _link_check.addClass("select");
  }
  
  // 共有
  if ((+d.diary_id) > 0) {
    $(".js-share-url").val(HOME_URL + "/?user=" + USER_ID + "&id=" + d.diary_id);    
  } else {
    $(".js-share-url").val("");
  }
  
  // 音声をリセットする
  voice("reset");
  
  // 前後チェックを行う
  if (is_prevnext === true) {
    checkPrevNext();
  }

};
