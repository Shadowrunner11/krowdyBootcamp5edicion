export function getUrlParams(url) {
  return new URLSearchParams(
    url.match(/\?.+/)[0].replace('?','')
  );
}

export function addUrlParams(url, urlParams) {
  return url.replace(/\?.+/,'?'+urlParams.toString());
}