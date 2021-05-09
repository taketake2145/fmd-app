/**
 * 【Bugfix】iPhoneでたまに惰性ロックされてしまうのを無効にする
 * CSSでscroll領域（tgt）のmin-heightに100% + 1px しておくのがポイント
 * 画面表示後に実行するのがポイント（display:none; の状態では動作しない）
 *
 * @param object* tgt jQueryでの要素指定
 */
const bugfixScroll = (tgt) => {  
  let h_tgt = tgt.height(),
      is_top = true,
      is_bottom = false,
      moving;
  
  if (tgt.scrollTop() == 0) {
    tgt.scrollTop(1);      
  }  
  
  function checkScroll() {
    let t = tgt.scrollTop(),
        h = $("> :first-child", tgt).outerHeight(true) - tgt.outerHeight(true);
    
    h = Math.ceil(h);
    
    if (t < 0) {
      is_top = true;
    } else if (is_top){
      
      if (moving) clearTimeout(moving);
      moving = setTimeout(function(){
        tgt.scrollTop(1);
        is_top = false;        
      }, 10);
    }
        
    if (t > h) {
      is_bottom = true;      
    } else if (is_bottom) {
      
      if (moving) clearTimeout(moving);
      moving = setTimeout(function(){
        tgt.scrollTop(t - 1);
        is_bottom = false;      
      }, 10);      
    }
  }
  
  tgt.on("scroll", function(){
    checkScroll();
  });

}