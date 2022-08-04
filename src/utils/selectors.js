/**
 * @param  {string} selector
 * @param  {HTMLElement} node
 * @return {HTMLElement}
 */
export function $(selector, node=document.body){
  return node.querySelector(selector)
}

/**
 * @param  {string} selector
 * @param  {HTMLElement} node=document.body
 */
export function $$(selector, node=document.body){
  return [...node.querySelectorAll(selector)]
}

