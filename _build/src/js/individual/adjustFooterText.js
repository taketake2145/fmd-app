const adjustFooterText = function() {
  const _nav_bar_text = $(".js-nav-text .js-nav-bar-inner"),
        _nav_bar_new = $(".js-nav-new .js-nav-bar-inner"),
        _body = $("body");
  
  let w = window.innerWidth,
      w_bar = 0,
      tgt;

  tgt = (_body.hasClass("view-diary-new"))? _nav_bar_new: _nav_bar_text;
    
  tgt.each(function() {
    $("a", this).each(function () {    
      w_bar = w_bar + $(this).outerWidth(true);
    });
  });
    
  if (w > w_bar) {
    tgt.addClass("center");
  } else {
    tgt.removeClass("center")
  }
  
}