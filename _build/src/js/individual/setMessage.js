/**
 * ステータスメッセージ
 *
 * @param {string} code: ステータスコード
 * @param {number} t: ステータスメッセージを表示する時間
 */
let messaging;
const setMessage = (code, settimeout_time = 3500) => {
  
  let str = getText(code);
  
  if (code === "connecting" || code === "save_error_01" || code === "save_error_02") {
    $(".js-link-reload").css({visibility: "visible"});
  } else {
    $(".js-link-reload").css({visibility: "hidden"});
  }
  
  $(".js-short-message-text").html(str);
  $(".js-short-message").fadeIn();

  if (messaging) clearTimeout(messaging);
  messaging = setTimeout(function () {
    $(".js-short-message").hide();
  }, settimeout_time);  
  
};