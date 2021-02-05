// リサイズがとまったときのイベントを追加する
$(function(){
  var stopEvent = new $.Event("resizestop"),
      timer;
 
  function stopEventTrigger(){
    if (timer) clearTimeout(timer);
    timer = setTimeout(function(){$(window).trigger(stopEvent)}, 300);
  }
  $(window).on("resize", stopEventTrigger);
});

