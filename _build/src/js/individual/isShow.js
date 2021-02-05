/**
 * コンテンツが表示可能か判別する
 */
const isShow = () => {
  let is_show = true;
  
  // ログインIDと表示IDが異なる場合
  if (LOGIN_ID !== USER_ID) {
    
    // 公開設定になっていない場合は、表示しない
    if (!CONFIG.status_publish || CONFIG.status_publish === "private") {
      is_show = false;      
    }
  }
  
  return is_show;
}