cmn.typewriter = function(_tgt) {
    
  _tgt.each(function(){
    var _tgt = $(this),
        _tgt_words = _tgt.text(),
        t = 0;

    // 文字列を空にする
    _tgt.html("");
    
    /**
     * 文字をセットする
     */
    function set_word(word, i) {

      // 間隔調整する
      t = t + Math.floor(Math.random()*350) + 10;

      setTimeout(function(){
        _tgt.append(word);

        // 最後の文字の場合、文末のバーを削除する
        if (i == _tgt_words.length - 1) {
          setTimeout(function(){
            _tgt.removeClass("typewriter");          
          }, 500);
        }      
      }, t);
    }

    // 文末のバーを追加する
    _tgt.addClass("typewriter");

    //  時間差で一文字ずつ処理する
    setTimeout(function(){    
      for (var i in _tgt_words) {
        set_word(_tgt_words[i], i);
      }    
    }, 1000);    
  });
}
