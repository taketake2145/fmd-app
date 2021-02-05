/**
 * ご意見ボックスを設定する
 */
const markupCommonNav = () => {
  const box = $(".js-common-nav"),
        html = `
<div class="comment">
  <form class="comment__form js-form-comment">
    <h1 class="comment__title">
      <span class="en">Tell me about this web app.</span>
      <span class="ja">ご意見聞かせてください</span>
    </h1>
    <p class="comment__text">
      <span class="en">Your message gives me a power to create somthing!</span>
      <span class="ja">その一言が制作者のモチベーションを上げ、今後の制作の力になります！ぜひお気軽にコメントください。</span>
    </p>
    <textarea class="js-form-comment-text" name="message" value=""></textarea>
    <p class="comment__submit-btn">
      <a class="btn btn--02 js-form-comment-submit">
        <span class="en">Send</span>
        <span class="ja">送信する</span>
      </a>
    </p>
  </form>
</div>
<ul style="display:none;" data-type="TODO">
  <li>
    <a href="https://www.fiveminutediary.com/about/" target="_blang">
      <span class="en">What's Five Minute Diary?</span>
      <span class="ja">Five Minute Diary のこと</span>
    </a>
  </li>
</ul>
  `;
  
  /**
   * メール送信
   */
  const sendVoice = (tgt) => {
    let body_text = $("[name='message']", tgt).val();
        
    if (body_text.trim() != "") {
      sendMail("ご意見箱", body_text, true);
      $("[name='message']").val("");
      setMessage("thanks_voice", 10000);
    }
    return false;
  }
  
  box.html(html);
  
  $(".js-form-comment").on("submit", function () {
    sendVoice($(this));
    return false;
  });
  $(".js-form-comment-submit").on("click", function () {
    sendVoice($(this).closest(".js-form-comment"));
    return false;
  });
} 
