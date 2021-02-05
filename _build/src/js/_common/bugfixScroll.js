/**
 * 【Bugfix】iPhoneでたまに惰性ロックされてしまうのを無効にする
 * CSSでscroll領域のmin-heightに100% + 1px しておくのがポイント
 */
const bugfixScroll = (tgt) => {  
  let h_tgt = tgt.height(),
      is_top = true,
      is_bottom = false,
      moving;
  
  if (tgt.scrollTop() == 0) {
    tgt.scrollTop(1);      
  }  
  
  function check_scroll() {
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
    check_scroll();
  });

}