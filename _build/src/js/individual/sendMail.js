/**
 * ajax通信に失敗した場合、メール通知する
 * 
 + @param {string} title* メールタイトル
 + @param {string} message*　メール本文
 + @param {boolean|null} is_not_login　true: ログイン不要
 */
const sendMail = (title, message, is_not_login) => {
    
  // メール通知
  $.ajax({
    url: HOME_URL + "/send-mail/",
    type: "POST",
    data: {
      title: title,
      message: message,
      need_login: (is_not_login === true)? 'no': 'yes',
      user_id: USER_ID
    },
    timespan: 5000
  });
}