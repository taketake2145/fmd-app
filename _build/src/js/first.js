/**
 * touchデバイスチェック
 * HACK: Windows Chrome において、ontouchend が object を返すので、やむを得ずユーザーエージェンにょる分岐。どうにかしたい。
 */
// cmn.IS_TOUCH = (("object" == typeof document.documentElement.ontouchend) && (navigator.userAgent.indexOf('Chrome') == -1));

// http://shanabrian.com/web/javascript/is-touch-device.php
const IS_TOUCH = (('ontouchstart' in window && 'ontouchend' in window) || navigator.msPointerEnabled)? true : false;

const eventstart = (IS_TOUCH)? 'touchstart': 'mousedown';
const eventmove = (IS_TOUCH)? 'touchmove': 'mousemove';
const eventend = (IS_TOUCH)? 'touchend': 'click';
const eventover = (IS_TOUCH)? 'touchstart': 'mouseover';
const eventout = (IS_TOUCH)? 'touchmove': 'mouseout';

let IS_CLICK = false;

// タップ
const tap = function(tgt, func){
  tgt
  .on(eventstart,function(){
    IS_CLICK = true;
    
    // 長押し離しは無効になるようにケア
    setTimeout(function(){
      IS_CLICK = false;
    }, 300);
    return false;
  })
  .on(eventmove, function(){
    IS_CLICK = false;
    return false;
  })
  .on(eventend, function(){    
    if (func && (IS_CLICK || !IS_TOUCH)) func($(this));
    return false;
  }); 
}

// ダブルクリックを無効にする
const stopDblClick = function(tgt){
  if (IS_TOUCH) {
    tgt.on("touchend", function(e){
      e.preventDefault();
    });
  }
}

// スクロールを無効にする
const stopScroll = function(tgt){
  if (IS_TOUCH) {
    tgt.on("touchmove", function(e){
      e.preventDefault();
    });
  }
}

// ダブルクリックとスクロール処理を無効にする
const stopDblClickAndScroll = function(tgt){
  if (IS_TOUCH) {
    tgt
    .on("touchmove", function(e){
      e.preventDefault();
    })
    .on("touchend", function(e){
      e.preventDefault();
    });  
  }
}
