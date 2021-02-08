/**
 * touchデバイスチェック
 * HACK: Windows Chrome において、ontouchend が object を返すので、やむを得ずユーザーエージェンにょる分岐。どうにかしたい。
 */
// cmn.IS_TOUCH = (("object" == typeof document.documentElement.ontouchend) && (navigator.userAgent.indexOf('Chrome') == -1));

// http://shanabrian.com/web/javascript/is-touch-device.php
const IS_TOUCH = (('ontouchstart' in window && 'ontouchend' in window) || navigator.msPointerEnabled)? true : false;

// iOS判定 https://qiita.com/kon_yu/items/f295033107089dd6468d
const UA = navigator.userAgent;
const IS_IOS = (/iPad|iPhone|iPod/.test(UA)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)? true : false;

const eventstart = (IS_TOUCH)? 'touchstart': 'mousedown';
const eventmove = (IS_TOUCH)? 'touchmove': 'mousemove';
const eventend = (IS_TOUCH)? 'touchend': 'click';
const eventover = (IS_TOUCH)? 'touchstart': 'mouseover';
const eventout = (IS_TOUCH)? 'touchmove': 'mouseout';

let TAP_COUNT = 0;
let LONGTAPPING;
let IS_CLICK = false;
let IS_DBLCLICK = false;
let IS_LONGTAP = false;

// タップ
const tap = function (tgt, func){
  tgt
  .on(eventstart, function () {
    IS_CLICK = true;
    
    // 長押し離しは無効になるようにケア
    setTimeout(function(){
      IS_CLICK = false;
    }, 300);
    return false;
  })
  .on(eventmove, function () {
    IS_CLICK = false;
    return false;
  })
  .on(eventend, function () {    
    if (func && (IS_CLICK || !IS_TOUCH)) func($(this));
    return false;
  }); 
}

// ロングタップ（シングルタップ）
const longtap = function (tgt, func_long, func_single) {
  tgt
  .on(eventstart, function () {
    IS_CLICK = true;
    
    // 長押し離しか判別する
    if (LONGTAPPING) clearTimeout(LONGTAPPING);
    LONGTAPPING = setTimeout(function(){
      if (func_long && IS_CLICK) {
        console.log("teaaa")
        func_long($(this));
      }
      IS_CLICK = false;
    }, 300);
    return false;
  })
  .on(eventend, function () {    
    if (func_single && IS_CLICK) {
      func_single($(this));
      IS_CLICK = false;
    };
    return false;
  }); 
}

// ダブルタップ（シングルタップ）
const dbltap = function (tgt, func_double, func_single) {
  
  tgt
  .on(eventstart, function () {
    IS_CLICK = true;
    TAP_COUNT++;
        
    if (TAP_COUNT == 2) {
      IS_DBLCLICK = true;
      TAP_COUNT = 0;
    }
    
    // ダブルタップ判定解除して、シングルタップが有効か判別する
    setTimeout(function(){
      TAP_COUNT = 0;
      IS_DBLCLICK = false;
      if (func_single && IS_CLICK) {
        func_single($(this));
      }
      IS_CLICK = false;
    }, 300);
    
    return false;
  })
  .on(eventend, function(e) {
    
    if (func_double && IS_DBLCLICK) {
      e.preventDefault();
      func_double($(this));
      IS_DBLCLICK = false;
      IS_CLICK = false;
    }
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
