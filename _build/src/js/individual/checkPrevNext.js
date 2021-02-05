/**
 * 条件に合う前後の記事があるか判別する
 *
 * DIARY*, DIARY_NO*
 * @param {number} num: DIARYを表示している配列ナンバー
 */
const checkPrevNext = (num) => {
  
  let diary_number = (typeof num === "number")? num: DIARY_NO;
  
  if (DIARY_VIEW == "new" || DIARY_VIEW == "proofreading") {
    $(".js-link-prevnext").removeClass("active");
  } else {
    checkPrev(diary_number);
    checkNext(diary_number);
  }  
}

const checkNext = (num) => {
  let _btn = $(".js-link-prevnext[data-type='next']"),
      diary_number = num - 1;
  
  // 条件に合う未来の日記があるか判別する
  if (isViewDiary(diary_number)) {
    _btn.addClass("active");
  } else if (DIARY[diary_number]) {  // データがある場合はさらに次のデータを確認する
    checkNext(diary_number);
  } else {
    _btn.removeClass("active");
  }
  
}

const checkPrev = (num) => {
  let _btn = $(".js-link-prevnext[data-type='prev']"),
      diary_number = num + 1,
      _more = $(".js-link-diary-more"),
      data_ajax = _more.attr("data-ajax");
  
  
  // 条件に合う過去の日記があるか判別する
  if (isViewDiary(diary_number)) {
    _btn.addClass("active");
  } else if (DIARY[diary_number]) {  // データがある場合はさらに次のデータを確認する
    checkPrev(diary_number);
  } else if (data_ajax && data_ajax != "") {  // DBにアクセスしてデータを追加して確認する

    getAjaxDiary(getParam(data_ajax), function() {
      if (isViewDiary(diary_number)) {
        _btn.addClass("active");
      } else {
        checkPrev(diary_number);        
      }
    });    
  } else {
    _btn.removeClass("active");
  }
  
}