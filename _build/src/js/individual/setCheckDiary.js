/**
 * 日記にチェックをつける・外す
 *
 * DIARY*, DIARY_NO*
 */
const setCheckDiary = () => {
  const checkdiary_tgt = $(".js-link-check"),
        diary_id = DIARY[DIARY_NO].diary_id;
    
  // 指定している日記が存在するか確認する
  if (typeof diary_id === "number") {

    if (!LS.ary_checkdiary) LS.ary_checkdiary = [];

    // 一旦、チェックリストから削除する
    LS.ary_checkdiary.some(function (v, i) {
      if (v === diary_id) LS.ary_checkdiary.splice(i, 1);    
    });

    if (checkdiary_tgt.hasClass("select")) {
      checkdiary_tgt.removeClass("select");
      
      if (LS.ary_checkdiary.length === 0) {
        $(".js-link-search-check").removeClass("selected");
      }
    } else {
      checkdiary_tgt.addClass("select");

      // 先頭に追加する
      LS.ary_checkdiary.unshift(diary_id);
    }
    
    // 設定を保存する
    saveLS(true);
  }
}