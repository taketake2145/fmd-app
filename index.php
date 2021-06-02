<?php
// お手製のPHPファイルを読み込む
include_once("functions/index.php");

// ユーザーIDが指定されている場合は、ユーザーIDを取得する
$user_id = enc_param("user", $_GET);
$user_id = (preg_match('/^[0-9]+$/', $user_id))? strval($user_id): $user_id;

// ログインしている場合は、ログインIDを取得する
$login_id = 0;
if (is_user_logged_in()) {
  $login_user = wp_get_current_user();    
  $login_id = strval($login_user -> ID);
}

// ユーザーIDの指定がない、かつログイン中の場合はログインIDと同じにする
if ($user_id === "" && $login_id > 0) {
  $user_id = $login_id;
}

$user_type = ($user_id === $login_id && $login_id > 0)? "login-user": "another-user";
$is_same_id = ($user_id === $login_id && $login_id > 0)? "true": "false";

// POST_IDの指定がある場合は、記事ID
$diary_id = enc_param("id", $_GET);

// ユーザー指定あり、もしくはログインしているか判別する
if ($user_id !== "" || $login_id > 0) {
?>
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Five Minute Diary</title>
    <meta name="robots" content="NONE">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    <meta property="og:image" content="<?php echo ASSETS_PATH; ?>/ogp.png">
    <meta name="description" content="A Diary to learn another language. Let's get started and keep writing and listening.">
    <link rel="manifest" href="<?php echo ASSETS_PATH; ?>/manifest.json">
    <link rel="shortcut icon" href="<?php echo ASSETS_PATH; ?>/favicon.ico">
    <link rel="apple-touch-icon-precomposed" href="<?php echo ASSETS_PATH; ?>/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="<?php echo ASSETS_PATH; ?>/icomoon/style.css?t=<?php echo filemtime(ASSETS_LOOT."/icomoon/style.css"); ?>">
    <link rel="stylesheet" href="<?php echo ASSETS_PATH; ?>/css/common.min.css?t=<?php echo filemtime(ASSETS_LOOT."/css/common.min.css"); ?>">
    <style>.js-opening > * {opacity: 0;}</style>
  </head>

  <body class="view-diary js-opening">
    <div class="splash js-splash">
      <div class="splash__bg"></div>
      <h1 class="splash__title">
        <img src="<?php echo ASSETS_PATH; ?>/images/logo-squre.svg" alt="Five Minute Diary">
      </h1>
    </div>
    
    <div class="content content--diary js-content js-content-diary">
      
      <div class="content__diary diary js-diary">
        <section class="content__view diary-edit js-diary-view" data-type="new">
          <h1 class="content__title">
            <span class="en">New</span>
            <span class="ja">新規</span>
          </h1>
          <div class="diary__content-edit">
            <div class="js-diary-form-new"></div>
            <div class="diary-edit__btn">
              <a class="btn btn--01 js-link-reset-new">
                <span class="en">Delete</span>
                <span class="ja">リセットする</span>
              </a>
              <a class="btn btn--02 js-link-save">
                <span class="icon-download"></span>
                <span class="en">Save</span>
                <span class="ja">保存する</span>
              </a>
            </div>
          </div>
        </section>       
        <section class="content__view diary-edit js-diary-view" data-type="edit">
          <h1 class="content__title">
            <span class="en">Edit</span>
            <span class="ja">編集</span>
          </h1>
          <div class="diary__content-edit">
            <form class="js-form-diary" method="post">
              <input type="hidden" class="js-diary-id" name="ID" value="">
              <dl class="diary-edit__list">
                <div class="diary-edit__unit js-diary-edit-unit" data-type="date">
                  <dt class="js-diary-edit-title">
                    <span class="en">Date</span>
                    <span class="ja">日付</span>
                  </dt>
                  <dd class="diary-edit__date">
                    <input class="js-diary-date" type="datetime-local" name="post_date" value="">
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="list">
                  <dt class="js-diary-edit-title">
                    <span class="en">List about today</span>
                    <span class="ja">今日のことを箇条書きする</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-list" name="diary_list"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="ja">
                  <dt class="js-diary-edit-title">
                    <span class="en">Detail about one of the list</span>
                    <span class="ja">一つの話しを膨らませる</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-ja" name="diary_ja"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="ja-summary">
                  <dt class="js-diary-edit-title">
                    <span class="en">Summary to translate</span>
                    <span class="ja">翻訳用に話しをまとめる</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-ja-summary" name="diary_ja_summary"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="en-first">
                  <dt class="js-diary-edit-title">
                    <span class="en">Translate it. Stay it if I couldn't.</span>
                    <span class="ja">自力で翻訳する（分からないところは原語のまま）</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-en-first" name="diary_en_first"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="en-report">
                  <dt class="js-diary-edit-title">
                    <span class="en">Translate it. Check it if I couldn't.</span>
                    <span class="ja">調べながら翻訳する</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-en-report" name="diary_en_report"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="proofreading-01">
                  <dt class="js-diary-edit-title">
                    <span class="en">Proofread</span>
                    <span class="ja">添削結果</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-proofreading-01" name="diary_proofreading_01"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="proofreading-02">
                  <dt class="js-diary-edit-title">
                    <span class="en">Proofread another version</span>
                    <span class="ja">添削結果 別バージョン</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-proofreading-02" name="diary_proofreading_02"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="vocabulary">
                  <dt class="js-diary-edit-title">
                    <span class="en">Notes</span>
                    <span class="ja">メモ</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-vocabulary" name="diary_vocabulary"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="fix">
                  <dt class="js-diary-edit-title">
                    <span class="en">My proofread</span>
                    <span class="ja">添削結果 まとめ</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-fix" name="diary_fix"></textarea>
                  </dd>
                </div>
                <div class="diary-edit__unit js-diary-edit-unit" data-type="final">
                  <dt class="js-diary-edit-title">
                    <span class="en">Leaning version</span>
                    <span class="ja">暗記用</span>
                  </dt>
                  <dd>
                    <textarea class="js-diary-final" name="diary_final"></textarea>
                  </dd>
                </div>
              </dl>
            </form>
            
            <div class="diary-edit__btn">

              <!-- TODO 削除済みリストを表示する場合
              <a class="btn js-link-delete-diary" data-type="completely">
                <span class="en">Delete completely.</span>
                <span class="ja">完全にデータを削除する</span>
              </a>
              -->
              <a class="btn btn--01 js-link-delete-diary" data-type="temporary">
                <span class="en">Delete</span>
                <span class="ja">削除する</span>
              </a>
              <a class="btn btn--02 js-link-save">
                <span class="icon-download"></span>
                <span class="en">Save</span>
                <span class="ja">保存する</span>
              </a>
            </div>
          </div>
        </section>
        <section class="content__view diary-topics js-diary-view" data-type="topics">
          <h1 class="content__title">
            <span class="en">Topics</span>
            <span class="ja">日記ネタ</span>
          </h1>
          <div class="diary__content">
            <div class="js-diary-list"></div>
          </div>
        </section>
        <section class="content__view diary-feedback js-diary-view" data-type="feedback">
          <h1 class="content__title">
            <span class="en">Review</span>
            <span class="ja">振り返り</span>
          </h1>
          <div class="diary__content">
            <section class="diary__unit js-diary-unit">
              <h1 class="diary__unit-title">
                <span class="en">Original language</span>
                <span class="ja">原語</span>
              </h1>
              <p class="diary__unit-content js-diary-ja-summary"></p>
            </section>
            <section class="diary__unit js-diary-unit js-diary-fix-area">
              <h1 class="diary__unit-title">
                <span class="en">Finally</span>
                <span class="ja">最終</span>
              </h1>
              <p class="diary__unit-content js-diary-fix"></p>
            </section>
            <section class="diary__unit js-diary-unit">
              <h1 class="diary__unit-title">
                <span class="en">On my own</span>
                <span class="ja">自力</span>
              </h1>
              <p class="diary__unit-content diary__unit-content--en-first js-diary-en-first"></p>
            </section>
            <section class="diary__unit js-diary-unit">
              <h1 class="diary__unit-title">
                <span class="en">Notes</span>
                <span class="ja">メモ</span>
              </h1>
              <p class="diary__unit-content js-diary-vocabulary"></p>
            </section>          
            <section class="diary__unit diary__unit--another">
              <h1 class="diary__unit-title js-diary-another-title">
                <span class="en">Anotehr</span>
                <span class="ja">別バージョン</span>
              </h1>
              <div class="diary__sub">
                <p class="diary__sub-unit js-diary-proofreading-01"></p>
                <p class="diary__sub-unit js-diary-proofreading-02"></p>
              </div>
            </section>          
          </div>
        </section>
        <section class="content__view diary-learning js-diary-view" data-type="learning">
          <h1 class="content__title">
            <span class="en">Memorize</span>
            <span class="ja">まるっと暗記</span>
          </h1>
          <div class="diary__content">
            <div class="diary__learning js-diary-final"></div>
            <div class="diary__sub-memo js-diary-unit">
              <p class="js-diary-vocabulary"></p>
            </div>
          </div>
        </section>
        <section class="content__view diary-memo js-diary-view" data-type="memo">
          <h1 class="content__title">
            <span class="en">Notes</span>
            <span class="ja">メモ</span>
          </h1>
          <div class="diary__content">
            <p class="js-diary-vocabulary"></p>
          </div>
        </section>
        <section class="content__view diary-share js-diary-view" data-type="share">
          <h1 class="content__title">
            <span class="en">Share</span>
            <span class="ja">共有</span>
          </h1>
          <div class="diary__content">
            <form>
              <input class="share-url js-share-url" type="text" name="share-url" value="">
              <div class="diary-edit__btn-center share">
                <a class="share__link js-share" data-type="twitter"><span class="icon-twitter"></span></a>
                <a class="share__link js-share" data-type="facebook"><span class="icon-facebook"></span></a>
                <a class="share__link js-share" data-type="line"><span class="icon-line"></span></a>
                <a class="btn btn--02 js-link-copy-url">コピーする</a>
              </div>
            </form>
          </div>
        </section>
        <section class="content__view diary-zero js-diary-view" data-type="zero">
          <h1 class="content__title">
            <span class="en">No hit</span>
            <span class="ja">みつかりませんでした</span>
          </h1>
          <div class="diary__content">
            
          </div>
        </section>
      </div>      
    </div>
    
    <aside class="content content--menu js-content js-content-setting">
      <div class="dialog">
        <form class="dialog__setting-form" data-type="lang">
          <dl class="dl-flex">
            <dt>
              <span class="en">Language</span>
              <span class="ja">言語</span>
            </dt>
            <dd>
              <select class="js-display-lang">
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </dd>
          </dl>
        </form>

        <form class="dialog__setting-form" data-type="font-size">
          <dl class="dl-flex">
            <dt>
              <span class="en">Font size</span>
              <span class="ja">文字サイズ</span>
            </dt>
            <dd>
              <select class="js-display-font-size">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </dd>
          </dl>
        </form>
        
        <form class="dialog__setting-form dialog__form-frame" data-type="publish-status">
          <dl class="dl-flex">
            <dt>
              <span class="en">Status</span>
              <span class="ja">公開設定</span>
            </dt>
            <dd>
              <label>
                <input type="radio" name="publish_status" value="publish">
                <span class="en">Publish</span>
                <span class="ja">公開する</span>
              </label>
              <label>
                <input type="radio" name="publish_status" value="private">
                <span class="en">Private</span>
                <span class="ja">公開しない</span>
              </label>
            </dd>
          </dl>
          <div class="dialog__publish-status-ex js-explain-publish-status">
            <input class="js-form-const-url" type="text" name="" value="<?php echo home_url(); ?>/?user=<?php echo $login_id; ?>" readonly>
            <p>
              <span class="en">
                Check the "Publish" if you want to share at some social media.<br>
                Publish mode: anybody who knows the url can access your diary.
              </span>
              <span class="ja">
                SNSで共有したいときは、「公開する」を選択してください。<br>
                公開すると誰でも閲覧できるようになります。
              </span>
            </p>
          </div>
        </form>

        <form class="dialog__setting-form dialog__form-frame js-form-speech" data-type="speech">
          <dl>
            <div class="dl-flex">
              <dt>
                <span class="en">Voice</span>
                <span class="ja">音声</span>
              </dt>
              <dd class="dialog__flag">
                <div class="dialog__flag-inner flag">
                  <a class="flag__link js-speech-lang-flag" data-lang="ja-JP">
                    <img src="<?php echo ASSETS_PATH; ?>/images/flag-jp.svg">
                  </a>
                  <a class="flag__link js-speech-lang-flag" data-lang="en-US">
                    <img src="<?php echo ASSETS_PATH; ?>/images/flag-us.svg">
                  </a>
                  <a class="flag__link js-speech-lang-flag" data-lang="en-GB">
                    <img src="<?php echo ASSETS_PATH; ?>/images/flag-uk.svg">
                  </a>
                </div>
                <div>
                  <select class="js-speech-lang" name="ary_lang"></select>
                </div>
              </dd>
            </div>
            <div class="dl-flex js-form-speech-name">
              <dt>
                <span class="en">Voice name</span>
                <span class="ja">音声の名前</span>
              </dt>
              <dd>
                <select class="js-speech-voice" navme="ary_voice"></select>
              </dd>
            </div>
          </dl>
        </form>

        <form class="dialog__setting-form dialog__form-frame" data-type="label">
          <dl>
            <dt class="dialog__label-title">
              <span class="en">Setting the labels</span>
              <span class="ja">表示項目設定</span>
            </dt>
            <dd class="label js-label-lists"></dd>
            <dd class="dialog__label-reset-area">
              <a class="js-link-label-reset">
                <span class="en">Reset the label settings</span>
                <span class="ja">表示項目をリセットする</span>
              </a>
            </dd>
          </dl>
        </form>
        
        <div class="dialog__nav">
          <div class="dialog__nav-login">
            <a class="dialog__nav-link js-link-reset-all-setting">
              <span class="en">Reset all setting</span>
              <span class="ja">すべての設定を<span class="nowrap">初期化する</span></span>
            </a>
          </div>
          <div>
            <?php if ($login_id > 0): ?>
            <a class="dialog__nav-link" href="/app/wp-admin/profile.php">
              <span class="en">Account Management</span>
              <span class="ja">アカウント<span class="nowrap">管理</span></span>
            </a>
            <?php else: ?>
            <a class="dialog__nav-link" href="/app/">
              <span class="en">Log in</span>
              <span class="ja">ログイン</span>
            </a>
            <?php endif; ?>
          </div>
        </div>
        
        
        <section class="js-common-nav"></section>
      </div>      
    </aside>
    
    <aside class="content content--search js-content js-content-search">
      <div class="dialog">
        <form class="form-search js-form-search">
          <div class="form-search__word">
            <input type="text" name="q" value="">
          </div>
          <div class="form-search__condition">
            <a class="btn form-search__link form-search__link--check js-link-search-check">
              <span class="icon-checkmark"></span>
              <span class="en">Checked List</span><span class="ja">要チェック</span>
            </a>
            <a class="btn form-search__link form-search__link--shuffle js-link-search-shuffle">
              <span class="icon-shuffle"></span>
              <span class="en">Shuffle</span><span class="ja">シャッフル</span>
            </a>          
          </div>
          <div class="form-search__search-btn">
            <a class="btn btn--01 form-search__reset js-link-form-reset">
              <span class="en">Reset</span>
              <span class="ja">リセットする</span>
            </a>
            <a class="btn btn--02 form-search__submit-link js-link-form-search">
              <span class="icon-search"></span>
              <span class="en">Search</span><span class="ja">検索する</span>
            </a>
          </div>        
        </form>
        <section class="js-common-nav"></section>      
      </div>
    </aside>
    
    <nav class="nav js-nav">
      <div class="nav__inner nav__inner--text js-nav-text">
        <div class="nav__bar js-nav-bar">
          <div class="nav__bar-inner nav__bar-inner--text js-nav-bar-inner">
            <a class="nav__link-bar js-link-diary-nav" data-type="feedback">
              <span class="en">Review</span>
              <span class="ja">振り返り</span>
            </a>
            <a class="nav__link-bar nav__link-bar--spacing-2 js-link-diary-nav" data-type="learning">
              <span class="en">Memorize</span>
              <span class="ja">まるっと暗記</span>
            </a>
            <a class="nav__link-bar nav__link-bar--spacing-1 js-link-diary-nav" data-type="memo">
              <span class="en">Notes</span>
              <span class="ja">メモ</span>
            </a>
            <a class="nav__link-bar nav__link-bar--spacing-1 js-link-diary-nav" data-type="share">
              <span class="en">Share</span>
              <span class="ja">共有</span>
            </a>
            <a class="nav__link-bar nav__link-bar--spacing-1 js-link-diary-nav" data-type="edit">
              <span class="en">Edit</span>
              <span class="ja">編集</span>
            </a>
          </div>
        </div>
        
        <?php if ($diary_id === ''): ?>
          <div class="nav__tab js-nav-tab">
            <div class="nav__tab-inner">
              <a class="nav__link nav__link--edit js-link-edit possible"><span class="icon-pen"></span></a>
            </div>
            <div class="nav__tab-inner nav__tab-inner--prevnext">
              <!-- TODO
              <a class="nav__link nav__link--voice js-link-voice"><span class="icon-headphones"></span></a>
              -->
              <a class="nav__link nav__link--prev js-link-prevnext js-link-diary-more" data-type="prev"><span class="icon-prev"></span></a>
              <a class="nav__link nav__link--next js-link-prevnext" data-type="next"><span class="icon-next"></span></a>
              <!--
              <a class="nav__link nav__link--check js-link-check"><span class="icon-checkmark"></span></a>
              -->
            </div>
            <div class="nav__tab-inner">
              <a class="nav__link nav__link--edit-save js-link-save"><span class="icon-download"></span></a>
            </div>
          </div>
        <?php else: ?>
          <div class="nav__tab js-nav-tab">

            <div class="nav__tab-inner nav__tab-inner--share">

              <a class="nav__link nav__link--home active" href="/app/?user=<?php echo $user_id; ?>"><span class="icon-user"></span></a>

            </div>

          </div>        
        <?php endif; ?>
      </div>
      
      <div class="nav__inner nav__inner--edit js-nav-new">
        <div class="nav__bar js-nav-bar">
          <div class="nav__bar-inner nav__bar-inner--edit js-nav-bar-inner">          
            <a class="nav__link-bar nav__link-bar--spacing-1 js-link-diary-nav" data-type="new">
              <span class="en">New</span>
              <span class="ja">新規</span>
            </a>
            <a class="nav__link-bar js-link-diary-nav" data-type="topics">
              <span class="en">Topics</span>
              <span class="ja">日記ネタ</span>            
            </a>
          </div>
        </div>
        <div class="nav__tab js-nav-tab">
          <div class="nav__tab-inner">
            <a class="nav__link nav__link--close js-link-close possible"><span class="icon-close"></span></a>
          </div>
          <div class="nav__tab-inner nav__tab-inner--prevnext">
            <a class="nav__link nav__link--prev js-link-prevnext js-link-diary-more" data-type="prev"><span class="icon-prev"></span></a>
            <a class="nav__link nav__link--next js-link-prevnext" data-type="next"><span class="icon-next"></span></a>
          </div>
          <div class="nav__tab-inner">
            <a class="nav__link nav__link--save js-link-save"><span class="icon-download"></span></a>
          </div>
        </div>
      </div>      
    </nav>
    
    <nav class="nav-common js-nav-common">
      <a class="nav-common__link nav-common__link--left js-link-setting"><span class="icon-cog"></span></a>
      <a class="nav-common__link nav-common__link--left js-link-edit"><span class="icon-close"></span></a>
      <?php if ($diary_id === ''): ?>
      <a class="nav-common__link nav-common__link--right js-link-search"><span class="icon-search"></span></a>
      <?php endif; ?>
    </nav>
    
    <nav class="nav-common js-nav-dialog">
      <a class="nav-common__link js-link-close-dialog"><span class="icon-close"></span></a>
    </nav>
    
    <aside class="short-message js-short-message">
      <div class="short-message__inner js-short-message-link">
        <p class="short-message__text js-short-message-text"></p>
        <p><span class="icon-close-solid"></span></p>
      </div>
      <div class="short-message__btn">
        <a class="short-message__link-reload js-link-reload"><span class="icon-reload-alt"></span></a>
      </div>      
    </aside>
    
    <aside class="player js-player">
      <div class="player__inner">
        <div class="player__list">
          <a class="player__label js-link-player-label">
            <span class="js-player-label-type current" data-type="rate">
              <span class="en">RATE</span>
              <span class="ja">SPEED</span>
            </span>
            <span class="js-player-label-type" data-type="volume">VOLUME</span>
            <span class="js-player-label-type" data-type="pitch">PITCH</span>
          </a>
          <a class="player__link js-link-player" data-type="minus"><span class="icon-minus"></span></a>
          <a class="player__link js-link-player" data-type="plus"><span class="icon-plus"></span></a>
        </div>
        <div class="player__list">
          <a class="player__link player__link--voice js-link-voice"><span class="icon-headphones"></span></a>
        </div>
        <div class="player__list">
          <a class="player__link js-link-player-loop"><span class="icon-loop"></span></a>
          <a class="player__link js-link-player-shuffle"><span class="icon-shuffle"></span></a>
        </div>
      </div>
    </aside>
    
    <aside class="no-show js-no-show">
      <div class="no-show__inner">        
        <h1 class="no-show__title">Ohh...</h1>
        <p class="no-show__text">
          <span class="en">Can't dispay anything because this user id "<?php echo $user_id; ?>" is private mode or stop using this now.</span>
          <span class="ja">このユーザーID「<?php echo $user_id; ?>」は、非公開設定になっている、もしくは現在利用されていないため、表示することはできません。</span>
          <span class="no-show__btn">
            <a class="no-show__link js-link-home">MY DIARY</a>
          </span>
        </p>
      </div>
    </aside>
    
    <script>
      const HOME_URL = '<?php echo home_url(); ?>';
      
      const CONFIG = <?php echo config($user_id); ?>;
      
      const LOGIN_ID = "<?php echo $login_id; ?>";
            
      let LANG = "";
      
      let USER_ID = "<?php echo $user_id;?>";
      let USER_TYPE = "<?php echo $user_type; ?>";
      
      let IS_SAME_ID_USER_AND_LOGIN = <?php echo $is_same_id; ?>;
      
      let DIARY = [];
      let DIARY_NO = 0;
      
      let DIARY_VIEW = 'new';
      let DIARY_VIEW_TEMP = '';
      let DIARY_VIEW_EDIT = 'new';
      
      let PARAM = '';
      
      let IS_CONNECTING = false;
      let IS_CONFIGING = false;
            
      let MESSAGE_CODE = "";
    </script>
    <script type="text/javascript" src="<?php echo ASSETS_PATH.'/js/jquery-3.5.1.min.js'; ?>"></script>
    <script type="text/javascript" src="<?php echo ASSETS_PATH; ?>/js/common.min.js?t=<?php echo filemtime(ASSETS_LOOT."/js/common.min.js"); ?>"></script>  
  </body>
</html>
<?php
} else {
  header("Location: ".home_url()."/signin/");
}
?>
