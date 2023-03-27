/**[han]
 * 공통으로 적용되어야 하는 js
 */

// 현재 창의 크기수정을 막고 지정 크기로 맞추는 로직
window.resizeTo(1316, 868);
window.onresize = (_) => {
  window.resizeTo(1316, 868);
  console.log('onresize 불림');
};

//현재 페이지의 contextPath 가져오는 함수
export function getContextPath() {
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(
    hostIndex,
    location.href.indexOf('/', hostIndex + 1)
  );
  console.log('getContextPath 불림');
  return contextPath;
}

// 쿠키 추가하는 함수
export function setCookie(cname, cvalue) {
  // 특수문자가 포함되었을 경우를 대비하여 인코딩 수행
  document.cookie = cname + '=' + encodeURIComponent(cvalue);
}

// 지정 쿠키의 값을 반환하는 함수
export function getCookie(name) {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      //decodeURIComponent는 encodeURIComponent로 이스케이핑 된 문자열을
      //정상적인 문자열로 되돌려주는 역할
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}
