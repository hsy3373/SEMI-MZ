/**[han]
 * 공통으로 적용되어야 하는 js
 */

// 현재 창의 크기수정을 막고 1300/800 크기로 맞추는 로직
window.resizeTo(1316, 868);
window.onresize = (_) => {
  window.resizeTo(1316, 868);
};

//현재 페이지의 contextPath 가져오는 함수(각 js파일에 )
export let getContextPath = function () {
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(
    hostIndex,
    location.href.indexOf("/", hostIndex + 1)
  );
  return contextPath;
};
