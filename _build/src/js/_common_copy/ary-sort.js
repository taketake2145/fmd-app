/**
 * 連想配列の並び替え
 * http://www.allinthemind.biz/markup/javascript/sort_array_object.html
 * ary: 配列, ky: 並び替えのキー, st: 降順(true) | 昇順(false)
 */
cmn.ary_sort = function(ary, ky, st) {
  var ary_ky = ('string' == typeof ky || 'number' == typeof ky)? new Array(ky): ky,
  ary_ky_num = ary_ky.length,
  ary_st = [],
  key = null,
  srt = null;

  // 並び替え（降順かどうか）
  if ('boolean' == typeof st) {
    ary_st.push(st);
  } else if (st) {
    ary_st = st;
  }
  
  ary.sort(function(a, b) {
    function ary_chk(i) {
      key = ary_ky[i];
      srt = (ary_st[i])? -1: 1;

      if (a[key] < b[key]) {
        return -1 * srt;
      } else if (a[key] > b[key]) {
        return 1 * srt;
      } else {
        if (i < ary_ky_num) {
          return ary_chk(i+1);
        } else {
          return 0;
        }
      }
    }
    return ary_chk(0);
  });
  
  return ary;
};