$(function () {
  
  // ロゴを差し替える
  $("#login h1:first").html('<img src="' + ASSETS_PATH + '/images/logo-squre.svg">').addClass("mp-logo");
  
  // バックリンクを削除する
  $("#backtoblog").remove();
  
  // センタリングする
  $("#login").wrap('<div class="mp-login"></div>');
  

});