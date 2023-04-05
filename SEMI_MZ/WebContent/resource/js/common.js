/**[han]
 * 공통으로 적용되어야 하는 js
 */

// 현재 창의 크기수정을 막고 지정 크기로 맞추는 로직
window.resizeTo(1316, 868);
window.onresize = (_) => {
  window.resizeTo(1316, 868);
  console.log("onresize 불림");
};

//현재 페이지의 contextPath 가져오는 함수
export function getContextPath() {
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(
    hostIndex,
    location.href.indexOf("/", hostIndex + 1)
  );
  //console.log("getContextPath 불림");
  return contextPath;
}

// 문자열이 비었거나, null, undefined 일 때 true 반환
export let isEmpty = function (str) {
  if (
    str == "undefined" ||
    typeof str == "undefined" ||
    str == "null" ||
    str == null ||
    str == ""
  )
    return true;
  else return false;
};

//-------------------------- 쿠키 데이터 추가/조회/삭제 ------------------------------

// 쿠키 추가하는 함수
export function setCookie(cname, cvalue) {
  console.log("쿠키 세팅중 : ", cname);
  // 특수문자가 포함되었을 경우를 대비하여 인코딩 수행
  document.cookie =
    cname + "=" + encodeURIComponent(cvalue) + "; path=/mzone; expires=Session";
}

// 지정 쿠키의 값을 반환하는 함수
export function getCookie(name) {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      //decodeURIComponent는 encodeURIComponent로 이스케이핑 된 문자열을
      //정상적인 문자열로 되돌려주는 역할
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

// 쿠키 전체 삭제하기
export let delAllCookies = () => {
  // const doc = document;
  // domain = domain || document.domain;
  let path = "/mzone";

  const cookies = document.cookie.split("; "); // 배열로 반환
  console.log(cookies);
  const expiration = "Sat, 01 Jan 1972 00:00:00 GMT";

  // 반목문 순회하면서 쿠키 전체 삭제
  if (!document.cookie) {
    console.log("삭제할 쿠키가 없습니다.");
  } else {
    for (let i = 0; i < cookies.length; i++) {
      // const uname = cookies[i].split('=')[0];
      // document.cookie = `${uname}=; expires=${expiration}`;
      document.cookie =
        cookies[i].split("=")[0] + "=; path=/mzone; expires=" + expiration;
      // document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration + '; domain =' + domain;
    }
    console.log("쿠키 전부 삭제완료!!");
  }
};

// 특정 쿠키 삭제
export let delCookie = (cname) => {
  // 쿠키 삭제는? 이미 한참 지나간 시간을 입력해버림으로써 쿠키를 삭제시킨다.
  // document.cookie = 'user-id=; expires=Sat, 01 Jan 1972 00:00:00 GMT'
  const expiration = "Sat, 01 Jan 1972 00:00:00 GMT";
  setCookie(cname, "", 0);
  document.cookie = cname + "=; path=/;  expires=" + expiration;
  console.log("쿠키를 삭제했습니다.");
};

//---------------- sessionstorage로 데이터 저장/조회/삭제 -----------------------------------

export let setSessionStorage = function (name, value) {
  sessionStorage.setItem(name, JSON.stringify(value));
};

export let getSessionStorage = function (name) {
  return JSON.parse(sessionStorage.getItem(name));
};

export let delSessionStorage = function (name) {
  sessionStorage.removeItem(name);
};

// 세션 스토리지 모든 내용 삭제
export let delAllSessionStorage = function () {
  sessionStorage.clear();
};
