/**
 * プラスマイナス
 *
 * @param string* t* volume|rate|pitch
 * @param {string|NULL} v plus|minus|NULL
 * @return {object}
 */
const voicerPlusMinus = (t, v) => {
  let diff = 0,
      is_plus = true,
      is_minus = true,
      num;
  
  
  // タイプに分ける
  switch (t) {
    case "volume":  // 音量を調整する（0〜1）デフォルト:1
      if (v) {
        diff = (v === "plus")? 3: -3;
        voicer[t] = (voicer[t]*10 + diff)/10;        
      }
      num = voicer[t]*10;
      if (num <= 1) {
        voicer[t] = 0.1;
        is_minus = false;
      } else if (num >= 9) {
        voicer[t] = 1;
        is_plus = false;
      }
      break;
    case "rate":  // 速度を調整する（0.1〜10）言語によってレンジは異なる デフォルト:1
      if (v) {
        diff = (v === "plus")? 3: -3;
        voicer[t] = (voicer[t]*10 + diff)/10;
      }
      num = voicer[t]*10;
      if (num <= 4) {
        voicer[t] = 0.4;
        is_minus = false;
      } else if (num >= 13) {
        voicer[t] = 1.3;
        is_plus = false;
      }
      
      break;
    case "pitch":  // ピッチを調整する（0.0 〜 2.0）言語によってレンジは異なる デフォルト:1
      if (v) {
        diff = (v === "plus")? 3: -3;
        voicer[t] = (voicer[t]*10 + diff)/10;
      }
      num = voicer[t]*10;
      if (num <= 7) {
        voicer[t] = 0.7;
        is_minus = false;                       
      } else if (num >= 13) {
        voicer[t] = 1.3;
        is_plus = false;
      }
      break;

    // default なし
  }
  
  /*
   * 再生中に値が変更（プラスマイナスタップ）の場合は、リアルタイム反映
   * 再生中は値が変更されない、一時停止では設定が反映されないので注意が必要
   */
  voicer.is_setting_change = true;
  if (voicer.is_playing) {    
    playVoice();
  }
  
  return {
    can_plus: is_plus,
    can_minus: is_minus
  }  
}
