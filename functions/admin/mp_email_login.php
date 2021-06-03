<?php

/** 
 * ログイン認証をメールアドレスのみに変更.
 */
function mp_email_login($user, $username, $password) {
  
  // ユーザ情報を'email'を対象に検索
  $user = get_user_by('email',$username);
 
  // ユーザ情報が存在する場合
  if(!empty($user->user_login)) {
    
    // ユーザ名を取得しセットする
    $username = $user->user_login;
  } else {
    
    // メールアドレスに該当するユーザが存在しない場合は強制的に空文字
    $username = 'ありえない文字列';  // 認証失敗にする
  }
  // ログイン認証の判定結果を返す
  return wp_authenticate_username_password(null, $username, $password);
}
add_filter('authenticate', 'mp_email_login', 20, 3);





/**
* $user : null or WP_User or WP_Error
* $username : 入力されたユーザー名
* $password : 入力されたパスワード
*/
/*
function force_email_login( $user, $username, $password ) {

  //「ユーザー名またはメールアドレス」に入力された情報を email情報 としてユーザー検索
  $user_data = get_user_by( 'email', $username );

  if( !empty( $user_data ) ) {
  //email情報からユーザーが見つかればログイン認証用の関数にデータを渡す
  return wp_authenticate_username_password( null, $user_data->user_login, $password );
  }
  //emailでユーザー取得できなかった場合
  return wp_authenticate_username_password( null, '___', $password );

}
add_filter('authenticate', 'force_email_login', 20, 3);
*/