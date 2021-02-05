/**
 * 設定画面の表示非表示、ラベル設定
 */
const setLabel = () => {
  
  const setlabel_body = $("body"),
        setlabel_label_list_name = $(".js-label-list-name");
  
  let html = '',
      i;
  
  if (typeof LS.label === "undefined" || $.isArray(LS.label)) LS.label = {};
  if (typeof LS.label_hide === "undefined" || $.isArray(LS.label_hide)) LS.label_hide = {
    "date": true,
    "list": true,
    "ja": true,
    "en-first": true,
    "proofreading-02": true,
    "proofreading-02": true,
    "vocabulary": true,
    "fix": true,
    "final": true
  };
  
  // ラベルを更新する
  for (i in LS.label) {
    $(".js-diary-edit-unit[data-type='" + i + "'] .js-diary-edit-title").html(LS.label[i]);
  }    

  // 箇条書きのラベルを変更する
  if (typeof LS.label.list === "string") {
    setlabel_label_list_name.html(LS.label.list);
  }
  
  // 設定用マークアップする
  $(".js-diary-view[data-type='edit'] .js-diary-edit-unit").each(function () {
    
    let _this = $(this),
        title = $(".js-diary-edit-title", _this).html(),
        view_type = _this.data("type"),
        check_attr = '',
        checked = ' checked';  // マークアップの都合で先頭に半角スペース付き
        
    // 非表示の場合
    if (typeof LS.label_hide === "object" && LS.label_hide[view_type] === true) {
      checked = "";
      $(".js-diary-edit-unit[data-type='" + view_type + "']").hide();
      
      // タブバー非表示にする
      if (view_type === "vocabulary") {
        $(".js-link-diary-nav[data-type='memo']").hide();
      } else if (view_type === "list") {
        $(".js-link-diary-nav[data-type='topics']").hide();
      }
    }  
    
    html += `
        <div class="label__unit js-label-unit" data-show="view" data-type="${view_type}">
          <div class="label__view js-label-view">
            <div class="label__action">
              <input class="js-checkbox-label" type="checkbox" name="checkbox-${view_type}" data-type="${view_type}"${checked}>
            </div>
            <div class="label__title js-label-title">
              ${title}
            </div>
            <div class="label__action">
              <a class="label__link js-link-label-change-view" data-next="edit"><span class="icon-pen"></span></a>
            </div>
          </div>
          <div class="label__edit js-label-edit">
            <div class="label__action">
              <a class="label__link js-link-label-change-view" data-next="view"><span class="icon-close-outline"></span></a>
            </div>
            <div class="label__title">
              <input type="text" name="label-title" value="">
            </div>
            <div class="label__action">
              <a class="label__link js-link-label-save" data-next="view" data-type="save"><span class="icon-download"></span></a>
            </div>
          </div>
        </div>
    `;
  });
  $(".js-label-lists").html(html);
  
  
  // 項目名切り替え
  const setLabelChangeView = (tgt) => {
    let p = tgt.closest(".js-label-unit"),
        label = $("[name='label-title']", p),
        text = $(".js-label-title", p),
        text_ja = $(".ja", text),
        text_en = $(".en", text),
        is_text_cusom = (text_ja.length > 0 && text_en.length > 0)? true: false,
        next = tgt.attr("data-next"),
        view = tgt.attr("data-type"),
        label_type = p.attr("data-type"),
        label_text = "",
        val = "";

    // 現在のテキストラベルを取得する
    if (is_text_cusom) {
      if (setlabel_body.attr("data-lang") === "en") {
        label_text = text_en.text();          
      } else {
        label_text = text_ja.text();
      }
    } else {
      label_text = text.text();
    }
    label_text = label_text.trim();
    
    /*
     * 項目アクション
     */
    if (next === "edit") { // 編集の場合
      
      // テキストをinputにセットする
      label.val(label_text);
    } else if (view === "save") {  // 保存の場合
      val = label.val();
      val = val.trim();
      val = val.substr(0, 30);
      
      // 変更前後で値が違う場合、項目名を更新する
      if (label_text != val) {
        text.html(val);
        $(".js-diary-edit-unit[data-type='" + label_type + "'] .js-diary-edit-title").html(val);
        
        if (label_type === "list") {
          setlabel_label_list_name.html(val);
        }
        
        setMessage("label_change");
        
        // データ保存する
        LS.label[label_type] = val;
        saveLS(true);
      }
    }
    
    // 表示を切り替える
    p.attr("data-show", next);
  }
  

  // 項目モードを表示・編集に切り替える
  $(".js-link-label-change-view").on("click", function () {
    setLabelChangeView($(this));
    return false;
  });
  
  // ラベル名を保存する
  $(".js-link-label-save").on("click", function () {
    setLabelChangeView($(this));
    return false;
  });
  
  // 表示チェックボックスを切り替える
  $(".js-checkbox-label").on("change", function () {
    let view_type = $(this).data("type"),
        tab_view = "";
            
    if ($(this).prop("checked") === true) {
      $(".js-diary-edit-unit[data-type='" + view_type + "']").show();
      delete LS.label_hide[view_type];
    } else {
      $(".js-diary-edit-unit[data-type='" + view_type + "']").hide();
      LS.label_hide[view_type] = true;
    }

    // メモ、もしくは日記ネタの場合、タブバーを表示・非表示にする
    if (view_type === "list") {
      tab_view = "topics";
    } else if (view_type === "vocabulary") {
      tab_view = "memo";
    }
    if (tab_view != "") {
      if (LS.label_hide[view_type] === true) {
        $(".js-link-diary-nav[data-type='" + tab_view + "']").hide();
      } else {
        $(".js-link-diary-nav[data-type='" + tab_view + "']").show();
      }
    }
    
    saveLS(true);
  });
  
  // 表示項目をリセットする
  $(".js-link-label-reset").on("click", function () {
    if (LS.label) delete LS.label;
    if (LS.label_hide) delete LS.label_hide;
    saveLS(true, true);    
    return false;
  });
  

  
}