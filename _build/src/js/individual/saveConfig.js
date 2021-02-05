/**
 * configファイルを作成する
 *
 * @param {boolean|null} true: リロード
 */
const saveConfig = (is_reload) => {
  
  let copy_ls = {...LS},
      args = {};
  
  
  // 設定ファイルに保存しない項目
  if (copy_ls.search_checked) delete copy_ls.search_checked;  // PICKUP
  if (copy_ls.search_shuffle) delete copy_ls.search_shuffle;  // シャッフル
  if (copy_ls.diary_view) delete copy_ls.diary_view;  // 初期表示
  
  args.login_id = LOGIN_ID;
  args.json = JSON.stringify(copy_ls);
        
  // 設定ファイルを生成する
  $.ajax({
    url: HOME_URL + "/config/",
    type: "POST",
    dataType: "html",
    data: args,
    cache: false,
    timespan: 5000
  })
  .done(function(d, status) {
    if (status == "success") {
      LS.time = d.trim();
      saveLS();
      if (is_reload) {
        location.reload();  // TODO リロードしなくても対応できるようにする
      }
    } else {
      sendMail("設定ファイル作成時の予期せぬエラー01", $.param(args));
    }
  })
  .fail(function(e){
    
    // 読み込み時の通信エラー
    sendMail("設定ファイル作成時の予期せぬエラー02", $.param(args));
  })
  .always(function(){
  });
}
