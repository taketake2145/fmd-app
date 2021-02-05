/**
 * 音声情報
 * https://www.codegrid.net/articles/2016-web-speech-api-1/
 */
let voicer;
const voicerInit = (func) => {

  // 音声再生ができるか判別する
  if (window.speechSynthesis) {
    voicer = {};

    // 初期設定
    voicer.volume = 1;
    voicer.rate = 1;
    voicer.pitch = 1;
    voicer.voice = "";
    voicer.lang = "";
    voicer.name = "";

    // 音声情報
    voicer.ary_voice = [];
    voicer.ary_voice_lang = [];
    voicer.ary_lang = [];
    
    // 予約後
    voicer.speech;  // {object} 音声情報
    voicer.changeVoice;  // {function} 名前を変更した際に処理を実行する場合に利用する関数名
    voicer.settiming;  // オートプレイ時のsettimeout監視用
    voicer.status_autoplay;  // {string} all|one|stop
    voicer.is_autoplay;  // {boolean} オートプレイ設定中かどうか
    voicer.is_playing;  // {boolean} 再生中かどうか
    voicer.is_pausing;  // {boolean} 一時停止中かどうか

    // 音声情報をマークアップする
    voicerSetVoice(func);
  }  
}

// 画面をリロードしても音声再生は停止しないための対応
window.addEventListener('beforeunload', function(){
  if (speechSynthesis) speechSynthesis.cancel();
});  
