/**
 *  配列をシャッフルする
 */
cmn.shuffle = function(ary) {
  var ary = [].concat(ary),
      i = ary.length;
  
  while(i > 0){
    var j = Math.floor(Math.random()*i),
        t = ary[--i];
    
    ary[i] = ary[j];
    ary[j] = t;
  }
  return ary;  
};
