/**
 * ローカルストレージと設定ファイルの更新
 *
 * @param {boolean|undifined} true: コンフィグファイルを更新する
 * @param {boolean|undifined} true: すぐに設定ファイルを更新する
 */
const saveLS = (is_config, is_asap) => {
  let copy_ls = {...LS};
  
  // ログインIDと表示IDが同じ場合、ストレージを更新する
  if (IS_SAME_ID_USER_AND_LOGIN === true) {
        
    // LSに保存しない
    if (copy_ls.search_checked) delete copy_ls.search_checked;  // PICKUP
    if (copy_ls.search_shuffle) delete copy_ls.search_shuffle;  // シャッフル

    storageLS("fmd", copy_ls);

    // 設定ファイルを更新する
    if (is_asap === true) {
      saveConfig(is_asap);
    } else if (is_config === true) {
      if (IS_CONFIGING) clearTimeout(IS_CONFIGING);
      IS_CONFIGING = setTimeout(saveConfig, 2000);
    }
  }
}