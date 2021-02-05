/**
 * スライドショー
 * Create by Simple Simples Design / Takenori Kawakami
 * 2011-03-08 Version 1
 * 2017-02-10 Version 2　タッチイベントを追加
 * 2017-04-19 Version 3 スライドクリックとオートスライドを追加
 * 2017-06-20 Version 4 スライド中の縦移動を制御する
 * 2018-10-14 Version 5 CSSのclass名変更
 * 2018-10-14 Version 6 第3引数の追加：初期表示を途中からにする（1スタート）
 * 2018-10-15 Version 6.1 data-image属性がない場合に対応、data-image属性は読み込み後に削除する
 * 2018-10-15 Version 6.2 version6 第3引数の値が1の時の振る舞いを変更する
 * 2020-04-22 Version 7 すべて書き直し
 *
 * const で定義のは、変数名被りを防ぐため
 *
 * 同一ページに複数箇所スライドショーがあるとき、前後リンクを外部から呼び出せるのは、最後に読み込んだslideshowのみ
 * そもそも外部から参照できる（書き換え可能）のはよろしくない
 * その場合は、classで記述する必要があるが、class内ではjQueryのメソッドがほとんど使えない
 * そのため、ネイティブjavascript + class での実装が必要となるが、現段階ではスキルオーバー
 *
 * 共通化の道のりは長い...
 * icomoon利用あり
 *
 
 * サンプルコード
 * classに　slideshow を含むこと（slideshow.scssと連携）
 * js-photo-only
 * スライドされる対象は、slideshowの子要素
<div class="slideshow">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
 
 */

const slideshow = {};

/**
 * スライドショーを表示する際に一度処理する
 *
 * @param {object} tgt: jQueryで指定した要素 例：$(".js-slideshow")、かつユニークであること
 */
slideshow.init = function(tgt) {
  var html_control = '',
      num = 1,
      total = 0,
      w_w = window.innerWidth,
      w_h = window.innerHeight,
      scroll_distance = 0,
      is_auto_view = true,
      is_touch = (('ontouchstart' in window && 'ontouchend' in window) || navigator.msPointerEnabled),
      animate_auto_viewing,
      animate_scrolling,
      animate_resizing;
  
  // スライドショーする要素があり、その要素がユニークか判別する
  if (tgt && tgt.length == 1) {
        
    /**
     * スライドの値と幅高さをセットする
     */
    function set_size() {
      var w = tgt.width(),
          h = tgt.height();      
      
      $(".slideshow__content", tgt).children().each(function(){
        $(this).css({
          "width": w,
          "min-width": w,
          "height": h
        });
      });
    }    
    
    /**
     * 初期設定
     */
    function init() {
      
      // デフォルトクラスをつける
      tgt.addClass("slideshow--cover").addClass("slideshow--white");

      // 子要素にクラスをつける
      tgt.children().addClass("slideshow__unit");

      // フレームとスクロールエリアを追加する
      tgt.append('<div class="slideshow__scroll"><div class="slideshow__content"></div></div>');

      // コントローラーを追加する
      html_control += '<div class="slideshow__control">';
      html_control += ' <div class="slideshow__control-close">';
      html_control += '   <a class="slideshow__link-close"><span class="icon-close"></span></a>';
      html_control += ' </div>';
      html_control += ' <div class="slideshow__control-size">';
      html_control += '   <a class="slideshow__link-cover"><span class="icon-cover"></span></a>';
      html_control += '   <a class="slideshow__link-white"><span class="icon-contain"></span></a>';
      html_control += '   <a class="slideshow__link-black"><span class="icon-contain"></span></a>';
      html_control += ' </div>';
      html_control += '</div>';
      html_control += '<div class="slideshow__prevnext">';
      html_control += '  <a class="slideshow__link-prev"><span class="icon-prev"></span></a>';
      html_control += '  <a class="slideshow__link-next"><span class="icon-next"></span></a>';
      html_control += '</div>';
      tgt.append(html_control);

      // スライドを別の要素内に移動する
      $(".slideshow__content", tgt).append($(".slideshow__unit", tgt));
      
      // スライドサイズをセットする
      set_size();
      
      // スライドする合計数を取得する
      total = $(".slideshow__unit", tgt).length;      
    }
    
    // 初期設定を実行する
    init();

    /**
     * スライドの表示位置を変更する（外部からコントロール可能）
     *
     * @param {number} n: スライドの呼び出す番号（最初のスライドを1として指定したナンバーのスライドを表示する)
     * @param {boolean} is_auto: スライドショーを続けるかどうか
     */
    slideshow.moving = function(n, is_auto) {
      var w = tgt.width();
      
      // オートスライドを止めるか判定する
      is_auto_view = (is_auto)? true: false;
      
      // パラメータが有効か判別する
      if (n && typeof n == "number") {
        num = n;
      }
      
      // アニメーション中のスライドを止め、指定したスライドをすぐに表示する      
      $(".slideshow__scroll", tgt).stop().animate({
        "scrollLeft": (num - 1)*w + "px"
      }, 0);
      
      // スライド前後リンクは有効にしたまま、画面に表示しない
      $(".slideshow__prevnext", tgt).css({opacity: 0});
      
      // スライドの高さと幅を再セットする
      set_size();      
    }
    
    /**
     * スライド
     *
     * @param {string|null} prevnext: next|prev|null
     */
    function scrolling(prevnext) {
      var w = tgt.width();
      
      // 最後の場合は最初に、最初の場合は最後を指定する
      switch (prevnext) {
        case "next":
          num++;
          if (num > total) {
            num = 1;
          }
          break;
        case "prev":
          num--;
          if (num < 1) {
            num = total;
          }
          break;
      }
      
      // 指定したスライドが表示されるまでは、次のスライドアクションを有効にしない
      if (!animate_scrolling) {
        animate_scrolling = $(".slideshow__scroll", tgt).stop().animate({
          "scrollLeft": (num - 1)*w + "px"
        }, 350, function(){
          animate_scrolling = null;
        });
      }
    }
    
    /**
     * コントールエリアを非表示にする
     */
    function hide_control() {
      $(".slideshow__prevnext", tgt).css({opacity: 0});
      $(".slideshow__control", tgt).hide();      
    }
    
    /**
     * コントロールエリアの表示（全画面表示のときは非表示）
     */
    function view_control() {
      
      // オートスライドを止める
      is_auto_view = false;
      
      // スクロール位置を調整する
//      scrolling();
      
      // 全画面表示か判別する
      if ($("body").hasClass("js-photo-only")) {
        
        // 全画面表示前の表示位置に移動する
        $("body").removeClass("js-photo-only");
        window.scrollTo(0, slideshow.pos || 0);
        $(".slideshow__prevnext", tgt).css({opacity: 0}); 
        set_size();
      } else {
        
        // コントロールエリアを表示する
        $(".slideshow__control", tgt).show();        
        $(".slideshow__prevnext", tgt).css({opacity: 1});        
      }                
      return false;      
    }
    
    // コントロールエリアを表示する（全画面表示のときは非表示にする）
    $(".slideshow__unit", tgt).on("click", view_control);
    
    // コントロールエリアを非表示にする
    $(".slideshow__link-close, .slideshow__control", tgt).on("click", function(){
      hide_control();
      return false;
    });
    
    // 背景サイズをcoverに変更する
    $(".slideshow__link-cover", tgt).on("click", function(e){
      e.stopPropagation();
      tgt.addClass("slideshow--cover").removeClass("slideshow--contain");
      hide_control();
      return false;
    });
    
    // 背景サイズをcontainに変更して、背景色を黒にする
    $(".slideshow__link-black", tgt).on("click", function(e){
      e.stopPropagation();
      tgt.addClass("slideshow--contain").removeClass("slideshow--cover").addClass("slideshow--black").removeClass("slideshow--white");
      hide_control();
      return false;
    });
    
    // 背景サイズをcontainに変更して、背景色を白にする
    $(".slideshow__link-white", tgt).on("click", function(e){
      e.stopPropagation();
      tgt.addClass("slideshow--contain").removeClass("slideshow--cover").addClass("slideshow--white").removeClass("slideshow--black");
      hide_control();
      return false;
    });
        
    // 前へをクリックする
    $(".slideshow__link-prev", tgt).on("click", function(e){
      e.stopPropagation();
      
      // コントロールエリアを非表示にし、次のスライドを表示する
      hide_control();
      scrolling("prev");
      return false;
    });
    
    // 次へをクリックする
    $(".slideshow__link-next", tgt).on("click", function(e){
      e.stopPropagation();
      
      // コントロールエリアを非表示にし、前のスライドを表示する
      hide_control();
      scrolling("next");
      return false;
    });
    
    
    // リサイズした際にスライドサイズを調整する
    $(window).on("resize", function(){
      if (animate_resizing) clearTimeout(animate_resizing);
      animate_resizing = setTimeout(function(){
        var new_w_w = window.innerWidth,
            new_w_h = window.innerHeight;
        
        if (w_w != new_w_w || w_h != new_w_h) {
          
          // リサイズして、移動する
          set_size();
          scrolling();
          
          w_w = new_w_w;
          w_h = new_w_h;
        }
      }, 300);
    });
    
    /**
     * オートスライド
     * 再開するには、is_auto_view=trueにしてから、func_auto_viewを実行する
     */
    function func_auto_view() {
      if (is_auto_view) {
        scrolling("next");
        
        if (animate_auto_viewing) clearTimeout(animate_auto_viewing);
        animate_auto_viewing = setTimeout(function(){          
          func_auto_view();
        }, 2000);        
      }
    }
    setTimeout(func_auto_view, 3000);

    /**
     * 手動スライド処理
     */
    function touch_slide() {
      var pos_scroll_x = 0,
          pos_scroll_y = 0,
          pos_scroll_x_diff = 0,
          pos_scroll_y_diff = 0,
          moving = null;
            
      $(".slideshow__unit", tgt).on("touchstart", function(e){        
        pos_scroll_x = e.touches[0].pageX;
        pos_scroll_y = e.touches[0].pageY;
        pos_scroll_x_diff = 0;
        pos_scroll_y_diff = 0;      
      });
      

      $(".slideshow__unit", tgt).on("touchmove", function(e) {                        
        pos_scroll_x_diff = pos_scroll_x - e.touches[0].pageX;
        pos_scroll_y_diff = pos_scroll_y - e.touches[0].pageY;
        
        if (moving) {
          clearTimeout(moving);
        }
        moving = setTimeout(function(){
          
          if (Math.abs(pos_scroll_y_diff) < 50) {            
                        
            if (pos_scroll_x_diff > 50) {
              is_auto_view = false;
              scrolling("next");
            } else if (pos_scroll_x_diff < -50) {
              is_auto_view = false;
              scrolling("prev");
            }
          }
        }, 100);
      });
    }
    
    // タッチイベントが有効な場合
    if (is_touch) {
      touch_slide();
    }    
  }
}
