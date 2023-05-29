/**
 * 작성자 : 노지의
 * alert창 JS
 */
// alert과 오버레이 찾기
let alert = document.querySelector(".alert");
let alertOverlay = document.querySelector(".alert-overlay");

// alert창 실행시키기 위한 외부버튼
let alertToggle = document.querySelector(".alert-toggle");
if(alertToggle){
  alertToggle.addEventListener("click", openAlert);
}

let alertOk = document.querySelector(".alert-ok");

// openAlert() : 외부 버튼 클릭시 alert 창 실행시키기 위한 함수
export function openAlert(classname) {
  // 취소버튼 클릭시 alert 창 닫힘
  alertOk.classList =  "button alert-ok "+ classname;
  
  let cancelBtn = alert.querySelector(".alert-cancel");

  cancelBtn.addEventListener("click", closeAlert);

  // alert 및 오버레이 표시
  alert.style.display = "block";
  alertOverlay.style.display = "block";
}

//closeAlert() : 모달과 오버레이 숨기기
export function closeAlert() {
  alert.style.display = "none";
  alertOverlay.style.display = "none";
}

export function cancelConfrim(classname){
  let cancelBtn = alert.querySelector(".alert-cancel");
  cancelBtn.classList =  "button alert-cancel " + classname;
}