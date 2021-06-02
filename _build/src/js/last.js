let LS = (typeof storageLS("fmd") === "object")? storageLS("fmd"): {};

// CONFIGではなくLSで上書きする項目
let temp_ls_voicer = LS.voicer;
let temp_ls_lang = LS.lang;
let temp_ls_font_size = LS.font_size;
let temp_ls_diary_view = LS.diary_view;

// 設定ファイルがあるか判別する
if (CONFIG && $.isNumeric(CONFIG.time)) {

  // ログインIDと表示IDが同じ場合か判別する
  if (IS_SAME_ID_USER_AND_LOGIN === true) {
          
    // LSがない、もしくは設定ファイルの方が新しい場合、CONFIGをLSに上書きする
    if (!LS.time || ($.isNumeric(LS.time) && (+CONFIG.time) >= (+LS.time))) {
      
      // 1時間以上経過している場合は、初期表示をfeedbackにする
      if ((+CONFIG.time) - (+LS.time) > 60*60) {
        CONFIG.diary_view = "feedback";
      }
      
      // CONFIGをLSに上書きする
      LS = null;
      LS = {...CONFIG};

      // 音声はLSを採用する（端末によって取得情報が異なるため）
      LS.voicer = temp_ls_voicer;
    }    
  } else {  // 他人の場合、他人の設定ファイルに差し替える
    LS = null;
    LS = {...CONFIG};

    // 言語はLSを採用する
    LS.lang = temp_ls_lang;
  }
  
  // フォントサイズはLSを採用する
  LS.font_size = temp_ls_font_size;
  
  // 初期ビューはLSを採用する
  LS.diary_view = temp_ls_diary_view;
}

$(function(){
  let _diary_form_new = $(".js-diary-form-new"),
      _diary_no_show = $(".js-no-show"),
      diary_report;
  
  setSplash("start");
  
  if (isShow()) {

    // タブエリアのスクロールを無効にする
    stopScroll($(".js-nav-tab"));

    // iPhoneの惰性ロックされるバグ対応
    bugfixScroll($(".js-content"));

    // 設定画面アクション
    setting();  // 言語設定
    setLabel();  // 設定画面の表示項目関連

    // フッターテキストの表示位置を調整する
    $(window).on("resizestop", adjustFooterText);
    
    // 登録者の日記かログインユーザーの日記か判別する
    $("body").addClass(USER_TYPE);

    // 1. 新規用のフォームを用意する
    _diary_form_new.html($(".js-form-diary").clone());
    $(".js-diary-date", _diary_form_new).val(getNowTime());
    $(".js-diary-form-new", _diary_form_new).remove();  

    // 2. 日記データを読み込む
    PARAM = getParam(decodeURIComponent(location.href));

    getAjaxDiary(PARAM, function () {

      // 日記があるか判別する
      if (DIARY.length > 0) {

        // 初期画面をセットする
        DIARY_VIEW = LS.diary_view || "feedback";
        DIARY_VIEW_EDIT = "new";
        
        // パラメータありの場合は、まるっと暗記をデフォルト表示にする
        if (location.href.indexOf("user=") !== -1) {
          DIARY_VIEW = "learning";
        }

        // 日記を表示する
        if (isViewDiary()) {
          setDiary(true);
        } else {
          changeDiary("prev");
        }
      } else if (location.href.split("?").length > 1){  // 検索結果がない場合
        DIARY_VIEW = "zero";
      } else {
        DIARY_VIEW = "feedback";
        
        // 編集タブ非表示
        $(".js-link-diary-nav[data-type='edit']").hide();        
      }
      
      // 初期表示
      $(".js-diary-view[data-type='" + DIARY_VIEW + "']").addClass("current");
      $(".js-diary-nav-bar[data-type='" + DIARY_VIEW + "']").addClass("current");
      changeDiaryMode();
      
      setDiary();
      
      // フッターテキストの表示位置を調整する
      adjustFooterText();

      // シャッフル表示確認
      if (PARAM.shuffle) {
        $(".js-link-search-shuffle").addClass("selected");
      } else if (LS.search_shuffle && LS.search_shuffle === true) {
        delete LS.search_shuffle;
      }
      
      // PICKUP表示確認
      if (PARAM.checked) {
        $(".js-link-search-check").addClass("selected");
      } else if (LS.search_checked && LS.search_checked === true) {
        delete LS.search_checked;      
      }
      
      // スプラッシュを消す
      setSplash("end");
    });

    // 3. Android対策 仮想キーボードを閉じたときにblurが発行されないことがあるので、その対応
    $("input, textarea")
    .on("focus", function () {
      if (IS_TOUCH) {
        $("body").addClass("focusing");      
      }
    })
    .on("blur", function () {
      $("body").removeClass("focusing");
    });  

    // 音声関連
    voicerInit(function () {
      if (voicer) {
        setVoice();      
      } else {
        $(".js-link-voice, .js-form-speech, .js-player").remove();
        voicer = {};
      }
    });

    // ご意見ボックスと共通ナビ
    markupCommonNav();

    // リンク 検索する
    $(".js-link-form-search").on("click", searchDiary);
    $(".js-form-search").on("submit", searchDiary);

    // リンク 検索リセットする
    $(".js-link-form-reset").on("click", function () {
      if (LS.search_checked) {
        LS.search_checked = false;
        $(".js-link-search-check").removeClass("selected");
      }
      if (LS.search_shuffle) {
        LS.search_shuffle = false;
        $(".js-link-search-shuffle").removeClass("selected");
      }
      $(".js-form-search [name='q']").val("");
      return false;
    });

    // リンク タブテキストをタップする
    $(".js-link-diary-nav").on("click", linkNavBar);

    // リンク 前後矢印をタップする
    $(".js-link-prevnext").on(eventstart, function () {
      let is_autoplay = voicer.is_playing && voicer.is_autoplay;
      
      // 通信中ではないか判別する
      if (!IS_CONNECTING) {

        if (DIARY_VIEW != "new") {
          voicer.is_changing = true;  // memo: Androidでendが発火するのを防ぐ対応
          changeDiary($(this).data("type"));
        }
      } else {
        setMessage("connecting", 10000);
      }
      return false;
    });

    // リンク　編集/新規ボタンをタップする
    $(".js-link-edit").on(eventstart, function () {
      DIARY_VIEW_TEMP = DIARY_VIEW;
      DIARY_VIEW = DIARY_VIEW_EDIT;
      changeDiaryMode();
      $("body").removeClass("view-diary").addClass("view-diary-new");
      $(".js-nav-common").removeClass("nav-common--search");
      voice('stop');
      adjustFooterText();
      return false;
    });

    // リンク 日記編集の閉じるをタップする
    $(".js-link-close").on(eventstart, linkDiaryClose);

    // リンク 更新ボタンをタップする
    $(".js-link-save").on(eventstart, saveDiary);
    $(".js-form-diary").on("submit", saveDiary);

    // リンク チェックをタップする
    $(".js-link-check").on(eventstart, setCheckDiary);

    // リンク チェックをタップする（検索条件）
    $(".js-link-search-check").on("click", searchCheckDiary);

    // リンク シャッフルをタップする（検索条件）
    $(".js-link-search-shuffle").on("click", searchShuffle);

    // リンク 日記を削除する  
    $(".js-link-delete-diary").on("click", function () {
      deleteDiary($(this).data("type"));
      return false;
    });
    
    // リンク　日記をリセットする
    $(".js-link-reset-new").on("click", function () {
      $("textarea", _diary_form_new).val("");
      $(".js-diary-date", _diary_form_new).val(getNowTime());
      return false;
    });
    
    // リンク 共有用URLをコピーする
    $(".js-link-copy-url").on("click", function () {
      setCopy($(".js-share-url"), $(".js-share-url").val());
      return false;
    });

    // リンク メニューや検索を表示/非表示する
    linkSettingAndSearch();

    // リンク ショートメッセージ
    $(".js-short-message-link").on(eventstart, function () {
      $(".js-short-message").stop().hide();
      return false;
    });
    
    // リンク リロード 
    $(".js-link-reload").on("click", function () {
      location.reload();
      return false;
    });
    
    // リンク SNS
    $(".js-share").on("click", function () {
      let sns_link = $(".js-share-url").val(),
          sns_type = $(this).attr("data-type"),
          sns_info = shareSNS(sns_link, "【Five Minute Diary】");
      
      location.href = sns_info[sns_type];
      return false;
    });
  } else {
    setSplash("end");
    
    _diary_no_show.show();
    $("body").html(_diary_no_show);
    
    // リンク MY DIARY
    $(".js-link-home").on("click", function () {
      $(this).addClass("animation-blinker");
      location.href = "/app/";
      return false;
    });
  }
  
  // リンク処理
  setHover($(".js-nav a, .btn, .share__link, .js-link-reload"));
  setHover($(".js-player a").not(".js-link-player-label"));
});

