$(function () {
  /*
   * プロフィール
   */
  if ($(".profile-php #email").length > 0 && $(".profile-php #email").closest(".form-table").length > 0) {
    $(".profile-php #email").closest(".form-table").addClass("show");    
  }
  if ($(".profile-php #url").length > 0) $(".profile-php #url").closest("tr").hide();
  if ($(".profile-php #password").length > 0 && $(".profile-php #password").closest(".form-table").length > 0) {
    $(".profile-php #password").closest(".form-table").addClass("show");
  }
  
  /* 言語切り替え
  if ($(".profile-php #locale").length > 0 && $(".profile-php #locale").closest(".form-table").length > 0) {
    let locale_area = $(".profile-php #locale").closest(".form-table");
    locale_area.addClass("show");
    $("tr", locale_area).hide();
    $(".user-language-wrap").show();
  }
  */
  
  if ($(".profile-php #user_login").length > 0 && $(".profile-php #user_login").closest(".form-table").length > 0) {
    let user_login_area = $(".profile-php #user_login").closest(".form-table");
    user_login_area.addClass("show");
    $("tr", user_login_area).hide();
    $(".user-user-login-wrap").show();
  }
  
  
});