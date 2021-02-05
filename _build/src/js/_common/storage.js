/*
 *  ストレージ（ローカル・セッション）
 */
const IS_LOCALSTORAGE = ('localStorage' in window) && window['localStorage'] !== null,
      IS_SESSIONSTORAGE = (('sessionStorage' in window) && window['sessionStorage'] !== null);

/**
 * ローカルストレージの呼び出しと保存
 *
 * @param {string} n* key
 * @param {anything} v value vがない場合は、nの呼び出し
 * @return {anything} 
 */
const storageLS = (n, v) => {
  let r = null;
  
  if (IS_LOCALSTORAGE && typeof n !== 'undefined') {
    if (typeof v !== 'undefined') {
      if (typeof v === 'object') {
        localStorage[n] = JSON.stringify(v);
      } else {
        localStorage[n] = v;        
      }
    } else {
      try {
        r = (new Function("return " + localStorage[n]))();
//        r = JSON.parse(localStorage[n]);
      } catch (e) {
        r = localStorage[n];
      }
    }
  }
  return r;
}

// ローカルストレージ削除
const storageDelLS = (n) => {
  return (typeof n !== 'undefined')? localStorage.removeItem(n): null;
}


/**
 * セッションストレージの呼び出しと保存
 *
 * @param {string} n* key
 * @param {anything} v value vがない場合は、nの呼び出し
 * @return {anything} 
 */
const storageSS = (n, v) => {
  let r = null;
  
  if (IS_SESSIONSTORAGE && typeof n !== 'undefined') {
    if (typeof v !== 'undefined') {
      if (typeof v === 'object') {
        sessionStorage[n] = JSON.stringify(v);
      } else {
        sessionStorage[n] = v;        
      }
    } else {
      try {
        r = (new Function("return " + sessionStorage[n]))();
//        r = JSON.parse(sessionStorage[n]);
      } catch (e) {
        r = sessionStorage[n];
      }
    }
  }
  return r;
}

// ローカルストレージ削除
const storageDelSS = (n) => {
  return (typeof n !== 'undefined')? sessionStorage.removeItem(n): null;
}