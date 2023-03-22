/**
 * 작성자 : 노지의
 * alert창 JS
 */
// 모달과 오버레이 찾기
var alert = document.querySelector('.alert');
var alertOverlay = document.querySelector('.alert-overlay');

var alertToggle = document.querySelector('.alert-toggle');
alertToggle.addEventListener('click', openAlert);

function openAlert() {
  // 현재 포커스 저장
  focusedElementBeforeModal = document.activeElement;

  // 모달을 닫는 표시기를 듣습니다.
  alertOverlay.addEventListener('click', closeAlert);

  /*
   * 확인버튼
   * ★★★★★★★★★★ 일단 아무런 기능없이 닫히게 해놨어요! 구현시 꼭 본인한테 맞춰서 코드 변경해주셔야해요! ★★★★★★★★★★
   */ 
  var okBtn = alert.querySelector('#alert-ok');
  okBtn.addEventListener('click', closeAlert);

  // 취소버튼
  var cancelBtn = alert.querySelector('#alert-cancel');
  cancelBtn.addEventListener('click', closeAlert);

  // 모달 및 오버레이 표시
  alert.style.display = 'block';
  alertOverlay.style.display = 'block';

}

function closeAlert() {
  // 모달과 오버레이 숨기기
  alert.style.display = 'none';
  alertOverlay.style.display = 'none';
}

