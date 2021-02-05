// スクロールがとまったときのイベントを追加する
// http://www.risewill.co.jp/blog/archives/2618
$(function(){
  var stopEvent = new $.Event("scrollstop"),
      timer;
 
  function stopEventTrigger(){
    if (timer) clearTimeout(timer);
    timer = setTimeout(function(){$(window).trigger(stopEvent)}, 100);
  }
  $(window).on("scroll", stopEventTrigger);
});