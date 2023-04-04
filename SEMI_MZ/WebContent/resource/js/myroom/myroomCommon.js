/**
 * 
 */
//---------------- sessionstorage로 데이터 저장/조회/삭제 -----------------------------------

export let setSessionStorage = function (name, value) {
  sessionStorage.setItem(name, JSON.stringify(value));
};

export let getSessionStorage = function (name) {
  return JSON.parse(sessionStorage.getItem(name));
};