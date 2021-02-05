/**
 * スプラッシュ
 *
 * @param {string} status* start|end
 */
const setSplash = (status) => {
  let splashing;
  
  if (status === "start") {

    // ロゴを表示する
    splashing = setTimeout(function () {
      $(".js-splash img").animate({
        opacity: 1
      }, 650);
    }, 300);    
  } else {

    // ロゴを非表示にする
    $("body").removeClass("js-opening");
    if (splashing) clearTimeout(splashing);
    splashing = setTimeout(function () {
      $(".js-splash").fadeOut();
    }, 300);    
  }
}