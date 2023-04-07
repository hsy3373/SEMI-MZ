//현재 페이지의 contextPath 가져오는 함수
export function getContextPath() {
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(
    hostIndex,
    location.href.indexOf("/", hostIndex + 1)
  );
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
