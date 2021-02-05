/**
 * 文字参照
 */        
cmn.get_entityify = function(t){
  var character = { 
    '<' : '&lt;', 
    '>' : '&gt;', 
    '&' : '&amp;', 
    '"' : '&quot;',
    "'": '&#39;'
  }; 
  return t.replace(/[<>&"']/g, function (c) {return character[c];});        
};

