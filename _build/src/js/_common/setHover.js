/**
 * aタグのスタイル処理
 *
 * @param tgt* jQueryのDOM
 *
 * @return なし
 */
const setHover = (tgt) => {
  let hovering;
  
  tgt
  .on(eventover, function(){
    let _this = $(this);
    _this.addClass("hover");
    
    // touchstart処理時、clickが発火しない場合に対応
    if (hovering) clearTimeout(hovering);
    hovering = setTimeout(function(){
      _this.removeClass("hover");
    }, 300);
  })
  .on(eventout, function(){
    $(this).removeClass("hover");
  })
  .on("click", function(){
    $(this).removeClass("hover");		
  });  
}
