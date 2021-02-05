/**
 * ajaxで取得したデータを結合して、次のリンクを取得する
 *
 * @param (object) ajaxで取得したデータ
 */
const concatDiary = function (d) {
      
  let next_url = '';
  
  if (d.data) {

    // 続きがあるか判別する
    if (d.count > d.end) {
      next_url = getDiaryUrl(d.condition, d.shuffle);
      $(".js-link-diary-more").attr("data-ajax", next_url);
    } else {
      $(".js-link-diary-more").removeAttr("data-ajax");
    }

    // データを結合する
    DIARY = DIARY.concat(d.data);    
  }
}

