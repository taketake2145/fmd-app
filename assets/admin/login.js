$(function () {
  
  let label_mail = 'Email Address';

  
  // ロゴを差し替える
  $("#login h1:first").html('<img src="' + ASSETS_PATH + '/images/logo-squre.svg">').addClass("mp-logo");
  
  // ロゴをリンクにする
  $("#login h1:first img").on('click', function () {
    location.href = $("#backtoblog a").attr('href');
    return false;
  });
  
  // バックリンクを削除する
  $("#backtoblog").hide();
  
  // センタリングする
  $("#login").wrap('<div class="mp-login"></div>');
    
  // ラベル変更（ユーザー名でのログインを無効にする）
  $('#loginform label[for=user_login]').html(label_mail);
  
    
  // 日本語か判別する
  if ($('html').attr('lang') === 'ja') {
    label_mail = 'メールアドレス';
  
    
    function changePathForJa (tgt, attr) {
      
      tgt.each(function () {
        let _this = $(this),
            u = _this.attr(attr);

        if (u.match(/signin$/)) {
          u = u + '?wp_lang=ja';
        } else if (u.match(/signin\?action=register$/) || 
                  u.match(/signin\?action=lostpassword$/)) {
          u = u + '&wp_lang=ja';
        }

        _this.attr(attr, u);

      });
    }
    changePathForJa($('#loginform, #lostpasswordform, #registerform'), 'action');   // フォームのactionを変更する
    changePathForJa($('#login #nav a'), 'href');   // ナビゲーションリンクを変更する
    
  }

  // ラベル変更（ユーザー名でのログインを無効にする）
  $('#loginform label[for="user_login"]').html(label_mail);  
  

});