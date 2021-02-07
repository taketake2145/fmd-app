/**
 * テキストを取得する
 *
 * LANG*
 */
const getText = (code) => {
  let str = "";
  
  switch (code) {
      
    // 日記保存時
    case "save_success":
      str = (LANG === "ja")? 
        "保存しました": 
        "Saved it.";
      break;    
    case "save_error_01":
    case "save_error_02":
      str = (LANG === "ja")? 
        "保存できませんでした。ログインしていることを確認してから、もう一度お試しください。": 
        "It wasn't saved. So check whether log in and try again.";
      break;    
    case "save_error_network":
      str = (LANG === "ja")? 
        "インターネットに接続できませんでした。もう一度お試しください。": 
        "Try again later because I couldn't connect on web.";        
      break;
      

    // 日記の完全削除を確認する時
    case "confirmDeleteDiary":
      str = (LANG === "ja")? 
        "この日記を完全に削除してもよろしいですか？\nこの操作は取り消しできません。": 
        "Is it okey this diary is deleted?\nThis operation can't be canceled.";
      break;
      
    // 日記の削除確認する時
    case "confirm_delete":
      str = (LANG === "ja")? 
        "ほんとうに、この日記を削除してもよろしいですか？": 
        "Is it okey this diary is deleted?";
      break;
    
    // 日記削除時
    case "delete_success":
      str = (LANG === "ja")? 
        "削除しました": 
        "Deleted it.";        
      break;
    case "delete_error_01":
    case "delete_error_02":
      str = (LANG === "ja")? 
        "削除できませんでした。もう一度お試しください。": 
        "Try again after because it was saved.";
      break;    
    case "delete_error_network":
      str = (LANG === "ja")? 
        "インターネットに接続できませんでした。もう一度お試しください。": 
        "Try again after because I couldn't connect on web.";        
      break;
      
    // 音声言語、未選択時
    case "select_no_lang":
      str = (LANG === "ja")? 
        "音声の言語を選択してください（左上の設定から変更できます）。": 
        "Select a voice lang from setting on top and left of this screen.";
      break;

    // 音声ない時
    case "no_voice":
      str = (LANG === "ja")? 
        "おっと。この端末では音声再生ができないようです。": 
        "Oops. There is no voice for playing at this device.";
      break;
      
    // ラベルを変更した時
    case "label_change":
      str = (LANG === "ja")? 
        "変更しました": 
        "Changed the label.";
      break;
      
    // 要チェックがない時
    case "no_checked_list":
      str = (LANG === "ja")? 
        "要チェックした日記はありません。": 
        "No checked diary";
      break;
      
    // 検索結果がない時
    case "zero_hit":
      str = (LANG === "ja")? 
        "おっと。検索条件にマッチした日記はありません。": 
        "Oops. There is no diary which match the condition.";
      break;
    
    // ご意見
    case "thanks_voice":
      str = (LANG === "ja")? 
        "貴重なご意見、ありがとうございます！<br>また何かお気づきのことなどありましたら、何度でもお気軽にメッセージください。": 
        "Thanks for sharing your message.<br>Take it easy to message if you notice something again.";
      break;
      
    // テキストコピー
    case "copy_text":
      str = (LANG === "ja")? 
        "コピーしました。": 
        "Copy done";
      break;
      
    // テキストコピーなし
    case "no_copy_text":
      str = (LANG === "ja")? 
        "うーむ、コピーするテキストはありません。": 
        "Umm. No copy text.";
      break;
      
    // 通信中
    case "connecting":
      str = (LANG === "ja")? 
        "処理中です。少々お待ちくださいませ。": 
        "Processing now. Wait a second.";
      break;
      
    default:
      str = code;
  }
  
  return str;
} 
