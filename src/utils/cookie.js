export function getCookie(cookieKey, cookieString){
  return cookieString
    .split(';')
    .find(cookie => cookie.includes(cookieKey))
    .replace(cookieKey+'=','')
    .replaceAll('"','')
    .trim();
  // return document.cookie.match(/ajax.+";/)[0].replaceAll(/"|;/,'')
}