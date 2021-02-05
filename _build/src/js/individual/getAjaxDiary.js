/**
 * ajax
 */
const getAjaxDiary = function (obj, func) {
      
  // 検索条件
  let search_condition = {
    url: HOME_URL + "/ajax-diary/",
    type: "GET",
    dataType: "json",
    timespan: 5000
  }
  
  let args = obj || {};
    
  if (typeof args === "object") {
    search_condition["data"] = args;
  }
  
  // データを読み込む(非同期通信)
  $.ajax(search_condition)
  .done(function(d, status) {  
        
    if (status == "success") {
      concatDiary(d);    
    } else {
      sendMail("読み込み時の予期せぬエラー", $.param(args));
    }
  })
  .fail(function(e){
    
    // 読み込み時の通信エラー
  })
  .always(function(){
    if (func) func();
  });
}
