/**
 * 작성자 : 노지의
 * alert창 JS
 */
// 모달과 오버레이 찾기
let alert = document.querySelector('.alert');
let alertOverlay = document.querySelector('.alert-overlay');

let alert2 = document.querySelector('.alert2');
let alert2Overlay = document.querySelector('.alert2-overlay');


let alertToggle = document.querySelector('.alert-toggle');
alertToggle.addEventListener('click', openAlert);

function openAlert1() {
  // 현재 포커스 저장
  focusedElementBeforeModal = document.activeElement;

  // 모달을 닫는 표시기를 듣습니다.
  alertOverlay.addEventListener('click', closeAlert);
  
  /*
   * ★★★★★★★★★ 확인버튼 - 본인 jsp 파일로 가져가서 쓰기(alert.js에서 사용 금지!!) ★★★★★★★★★
   * ★★★★★★★★★ 일단 아무런 기능없이 닫히게 해놨어요! 구현시 꼭 본인한테 맞춰서 코드 변경해주셔야해요! ★★★★★★★★★
   * ★★★★★★★★★ id 값 겹치면 x -> 변경 필수!!!!!!!★★★★★★★★★
   */ 
  // let okBtn = alert.querySelector('#alert-ok');
  // okBtn.addEventListener('click', closeAlert);

  // 취소버튼
  let cancelBtn = alert.querySelector('.alert-cancel');
  cancelBtn.addEventListener('click', closeAlert);

  // 모달 및 오버레이 표시
  alert.style.display = 'block';
  alertOverlay.style.display = 'block';

}

function openAlert2() {
  focusedElementBeforeModal = document.activeElement;

  alert2Overlay.addEventListener('click', closeAlert);

  let cancelBtn = alert.querySelector('.alert-cancel');
  cancelBtn.addEventListener('click', closeAlert);

 
  alert2.style.display = 'block';
  alert2Overlay.style.display = 'block';


}








function closeAlert() {
  // 모달과 오버레이 숨기기
  alert.style.display = 'none';
  alertOverlay.style.display = 'none';

  alert2.style.display = 'none';
  alert2Overlay.style.display = 'none';

}
