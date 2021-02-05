/**
 * ローディング時のスクロールの可否を制御する
 * http://arakaze.ready.jp/archives/3152
 */
cmn.loading = {};

cmn.loading.scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

//スクロール禁止
cmn.loading.scroll_stop = function() {
  
  //PC用
  $(document).on(cmn.loading.scroll_event,function(e){e.preventDefault();});

  //SP用
  $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
}

//スクロール復活
cmn.loading.scroll_able = function() {

  //PC用
  $(document).off(cmn.loading.scroll_event);

  //SP用
  $(document).off('.noScroll');  
}

