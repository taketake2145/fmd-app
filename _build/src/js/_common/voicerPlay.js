/**
 * 音声を再生する
 * lang はSafari14で無効のため、voiceを指定する
 *
 * @param {object} obj*
 */
const voicerPlay = (obj) => {
  if (voicer.speech) speechSynthesis.cancel(voicer.speech);  // 再生中があれば、停止する
  voicer.speech = new SpeechSynthesisUtterance();  // 読み上げます
  voicer.speech.text = obj.text || "";
  if (typeof obj.rate === "number") voicer.speech.rate = obj.rate;
  if (typeof obj.pitch === "number") voicer.speech.pitch = obj.pitch;
  if (typeof obj.volume === "number") voicer.speech.volume = obj.volume;
  if (typeof obj.voice === "object") {
    voicer.speech.lang = obj.voice.lang;
    voicer.speech.voice = obj.voice;
  }
  if (obj.lang) voicer.speech.lang = obj.lang;
  
  speechSynthesis.speak(voicer.speech);  // 再生する
  
  // 音声読み上げ終了時に処理する
  if (obj.func) {
    voicer.speech.onend = () => {
      obj.func();
    }
  }
}
