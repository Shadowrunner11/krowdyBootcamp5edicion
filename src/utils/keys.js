export function groupBy() {

}
/**
 * Returns an array without null, undefined, false or 0 elements
 * @param  {any[]} array
 */
export function filterOutFalsify(array, callback) {
  return array.flatMap((e, i, a) => {
    const result = callback(e, i, a);
    return result ? [result] : [];
  });
}

/**
 * Returns an array without null, undefined, false or 0 elements
 * @param  {any[]} array
 */
export function filterOutNill(array, callback) {
  return array.flatMap((e, i, a) => {
    const result = callback(e, i, a);
    result == undefined ? [] : [e];
  });
}

