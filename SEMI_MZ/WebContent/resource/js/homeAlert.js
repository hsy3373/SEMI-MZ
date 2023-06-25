/**
 * 작성자 : 노지의
 * home alert창 JS(확인만 있음)
 */

// alert과 오버레이 찾기
let alert = document.querySelector(".home-alert");
let alertOverlay = document.querySelector(".home-alert-overlay");

// openAlert() : 외부 버튼 클릭시 alert 창 실행시키기 위한 함수
export function homeOpenAlert() {
  // alert 및 오버레이 표시
  alert.style.display = "block";
  alertOverlay.style.display = "block";

  let okBtn = alert.querySelector(".home-alert-ok");

  okBtn.addEventListener("click", homeCloseAlert);
}

// alert과 오버레이 숨기기
export function homeCloseAlert() {
  alert.style.display = "none";
  alertOverlay.style.display = "none";
}

