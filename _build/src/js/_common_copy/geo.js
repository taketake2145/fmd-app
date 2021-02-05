/*
 *  位置情報（現在地取得）
 *
 *  リクエスト
 *  継続取得（成功時と失敗時の関数セット）
 *  一度取得（成功時と失敗時の関数セット、必要に応じて初期時の関数セット）
 *
 *  レスポンス
 *  成功時、object(lat, lng, radius)を返却 # radius とは accuracy のこと
 *  失敗時、number(error number)を返却
 *
 * << error number >>
 * 0          : お使いの端末・ブラウザでは位置情報を取得することができません。 
 * 1          : PERMISSION_DENIED（「現在地」を取得できる設定になっていないか、インターネットの接続が途切れたため位置情報を取得できませんでした。）
 * 2          : POSITION_UNAVAILABLE （現在地を取得できませんでした。何度か繰り返したり、移動すると位置情報を取得できます。また、Wi-Fiをお使いでない場合、「設定」でWi-Fiを有効にすると現在地をより正確に取得できます。）
 * 3          : TIMEOUT（現在地を取得できませんでした。）
 * 8          : 精度が悪い（現在地を取得できませんでした。）
 * 9          : 予期せぬエラー（エラー文言は「2」と同じ）
 * 99        : お呼びでない（キャンセル処理があった場合）
 * default : 位置情報を取得するには位置情報サービスをオンにしてください。
 *
 */
const GEO = {};

GEO.gettingCount = 0;

// GEO.location 初期化
GEO.stopping = function() {
  if (GEO.isWatching) navigator.geolocation.clearWatch(GEO.isWatching);
  if (GEO.isGetting) clearTimeout(GEO.isGetting);
  GEO.isWatching = false;
  GEO.isGetting = false;
};

// 継続取得
GEO.watching = function(func, func_error) {
  var posObj = {},
      radius;
  
  if (navigator.geolocation) {
    GEO.stopping();
    
    GEO.isWatching = navigator.geolocation.watchPosition(function (position) {

      // 現在地取得成功時
      try {
        posObj = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          radius: position.coords.accuracy 
        }
        if (posObj.radius < 20) {
          if (func) func(posObj);
        } else {
          if (func_error) func_error(posObj);          
        }
      } catch (e) {
        if (func_error) func_error(9);
      }
                
    }, function (error) {

      // 現在地取得失敗時
      if (func_error) func_error(error.code);
    }, {
      timeout: 30000,
      maximumAge: 3000,
      enableHighAccuracy: true
    });
  } else {
    if (func_error) func_error(0);
  }
};

// 一度取得
GEO.getting = function(func, funcError, funcInit) {
  var posObj = {},
        radius;
  
  if (navigator.geolocation) {
    if (funcInit) funcInit();
    
    GEO.stopping();
    
    navigator.geolocation.getCurrentPosition(function(position) {

      // 現在地取得成功時
      try {
        posObj = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          radius: position.coords.accuracy 
        }
        if (GEO.gettingCount > 5 || posObj.radius < 20) {
          GEO.gettingCount = 0;
          if (func) func(posObj);
        } else {
          GEO.isGetting = setTimeout(function(){
            GEO.gettingCount++;
            GEO.getting(func, funcError);
          }, 1500);
        }
      } catch (e) {
        if (funcError) funcError(position.coords.latitude);
      }
    }, function(error) {

      // 現在地取得失敗時
      GEO.gettingCount = 0;
      if (funcError) funcError(error.code);
    }, {
      timeout: 30000,
      maximumAge: 3000,
      enableHighAccuracy: true
    });
  } else {
    if (funcError) funcError(0);
  }
};

// エラーメッセージ
GEO.message = function(errorCode) {
  var error_txt = "";
  
  switch ('' + errorCode) {
    case '0':
      error_txt = 'お使いの端末・ブラウザでは位置情報を取得することができません。';
      break;
    case '1':
      error_txt = '「現在地」を取得できる設定になっていないか、インターネットの接続が途切れたため位置情報を取得できませんでした。';
      break;
    case '2':
    case '9':
      error_txt = '現在地を取得できませんでした。何度か繰り返したり、移動すると位置情報を取得できます。また、Wi-Fiをお使いでない場合、「設定」でWi-Fiを有効にすると現在地をより正確に取得できます。';
      break;
    case '3':
      error_txt = '現在地を取得できませんでした。';
      break;
    case '8':
      error_txt = '現在地を取得できませんでした。';
      break;
    case '99':
      error_txt = 'キャンセルしました。';
      break;
    default:
      error_txt = '位置情報を取得するには位置情報サービスをオンにしてください。';
  } 
  return error_txt;
};

