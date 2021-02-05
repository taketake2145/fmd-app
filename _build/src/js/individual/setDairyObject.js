/**
 * 新規・編集・削除があった場合に、変更後のオブジェクトをフォームの値から返却する
 *
 * @param {string} form_data: POSTパラメータの文字列
 * @param {object}
 */
const setDairyObject = (form_data) => {
  let param = getParam(form_data),
      diary_time = "",
      diary_time_ymd = "",
      obj = {};
  
  if (!param.post_date) {
    param.post_date = getNowTime(); 
  }

  obj = {
    diary_id: (param.ID)? (+param.ID): 0,
    diary_time: getDiaryParam(param.post_date),
    diary_time_ymd: param.post_date.split("T")[0],
    diary_link: (param.diary_link)? getDiaryParam(param.diary_link): "",
    diary_list: (param.diary_list)? getDiaryParam(param.diary_list): "",
    diary_ja: (param.diary_ja)? getDiaryParam(param.diary_ja): "",
    diary_ja_summary: (param.diary_ja_summary)? getDiaryParam(param.diary_ja_summary): "",
    diary_en_first: (param.diary_en_first)? getDiaryParam(param.diary_en_first): "",
    diary_en_report: (param.diary_en_report)? getDiaryParam(param.diary_en_report): "",
    diary_proofreading_01: (param.diary_proofreading_01)? getDiaryParam(param.diary_proofreading_01): "",
    diary_proofreading_02: (param.diary_proofreading_02)? getDiaryParam(param.diary_proofreading_02): "",
    diary_vocabulary: (param.diary_vocabulary)? getDiaryParam(param.diary_vocabulary): "",
    diary_fix: (param.diary_fix)? getDiaryParam(param.diary_fix): "",
    diary_final: (param.diary_final)? getDiaryParam(param.diary_final): "",
  }

  return obj;
};

/**
 * パラメータをデコードして、特殊文字をHTMLエンティティに変換して、改行コードを<br>にして、返却する
 */
const getDiaryParam = (str) => {
  if (str) {
    str = decodeURIComponent(str);
    str = getHtmlSpecialChars(str);
    str = getNrToBr(str);
  }
  return str;
};
