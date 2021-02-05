/**
 * プラスマイナスをセットする
 *
 * @param string* t* volume|rate|pitch
 * @param {string|NULL} v plus|minus|NULL
 */
const setVoicePlusMinus = (t, v) => {
  let obj = voicerPlusMinus(t, v);

  if (obj.can_plus) {
    $(".js-link-player[data-type='plus']").addClass("active");        
  } else {
    $(".js-link-player[data-type='plus']").removeClass("active");        
  }

  if (obj.can_minus) {
    $(".js-link-player[data-type='minus']").addClass("active");        
  } else {
    $(".js-link-player[data-type='minus']").removeClass("active");        
  }
  
  // ローカルストレージを更新する
  LS.voicer[t] = voicer[t];
  saveLS(true);    
}
