/**
 * 画像先読み用のメソッド
 */
cmn.preload_img = function(element, handler, errorHandler){
  var errorHandler = errorHandler || handler;
  if ("onreadystatechange" in element) {
    element.onreadystatechange = function (e) {
      if (element.readyState === "loaded" || element.readyState === "complete") {
        return handler(e);
      } else {
        return errorHandler(e);          
      }
    };
  } else {
    element.onload = handler;
    element.onerror = errorHandler;
  }  
};
