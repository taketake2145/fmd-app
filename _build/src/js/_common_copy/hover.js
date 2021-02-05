cmn.hover = function(_tgt) {
  _tgt
  .on(cmn.eventover, function(){
    $(this).addClass("hover");
  })
  .on(cmn.eventout, function(){
    $(this).removeClass("hover");
  });
}