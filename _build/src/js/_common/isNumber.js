/**
 * 数字だけの値か判別する
 *
 * @param {string|number}
 * @return boolean
 */
const isNumber = (v) => {  
  let pattern = /^[0-9]+$/;
  return pattern.test(v);
}