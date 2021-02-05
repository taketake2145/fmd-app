/**
 * 配列に合致するか判別する
 *
 * @param {array} ary*
 * @param {string} val*
 * @return {array|boolean} マッチした配列がある場合は、その配列。ない場合はfalse
 */
const arrayMatch = (ary, val) => {
  let check = [];
  if (ary.length > 0 && val) {
    check = ary.filter(function(v){
      return (v == val);
    });
  }
  return (check.length > 0)? check: false;
};
