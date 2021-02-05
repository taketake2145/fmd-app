/**
 * 日記を切り替えたときに表示条件を満たしているか確認する
 *
 * DIARY*
 * DIARY_NO*
 * @param {number} num* DIARYを表示している配列ナンバー
 * @param {string|null} v マッチするか確認したい画面タイプ
 * @return {boolean}
 */
const isViewDiary = (num, v) => {
  let flag,
      view = v || DIARY_VIEW,
      diary_number = (typeof num === "number")? num: DIARY_NO;
        
  if (DIARY[diary_number]) {
    
    if ((view == "edit") ||
       (view == "topics" && DIARY[diary_number].diary_list && DIARY[diary_number].diary_list != "") ||
       (view == "memo" && DIARY[diary_number].diary_vocabulary && DIARY[diary_number].diary_vocabulary != "") ||
       (view == "share") ||
       (view == "feedback") ||
       (view == "learning" && (DIARY[diary_number].diary_final != "" || 
            DIARY[diary_number].diary_fix != "" || 
            DIARY[diary_number].diary_proofreading_02 != "" || 
            DIARY[diary_number].diary_proofreading_01 != ""))) {
      
      flag = true;
    } else {
      flag = false;    
    }
  } else {
    flag = false;
  }
  
  return flag;
}