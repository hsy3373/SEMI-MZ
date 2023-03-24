/**
 * 작성자 : 노지의
 * alert창 JS
 */
// 모달과 오버레이 찾기
let alert = document.querySelector('.alert');
let alertOverlay = document.querySelector('.alert-overlay');

let alertToggle = document.querySelector('.alert-toggle');
alertToggle.addEventListener('click', openAlert);

function openAlert() {
  // 모달을 닫는 표시기를 듣습니다.
  alertOverlay.addEventListener('click', closeAlert);

  // 취소버튼
  let cancelBtn = alert.querySelector('.alert-cancel');
  cancelBtn.addEventListener('click', closeAlert);

  // 모달 및 오버레이 표시
  alert.style.display = 'block';
  alertOverlay.style.display = 'block';

}

export function closeAlert() {
  // 모달과 오버레이 숨기기
  alert.style.display = 'none';
  alertOverlay.style.display = 'none';
}




export function alertAddClass(str){
  //  okBtn 안의 click 이벤트 함수가 만약 있다면 해당 이벤트 삭제
  //~~~
  $("#alert-text").attr("class" , str);
  openAlert();
}


//--------------------------------------------------------------------

//자기 파일용 함수작성
function testF(){
  //숨겨놓은 div class값 조회해 와서 그에따라 함수 실행됨
    let str = $("#alert-text").attr("class");

    switch(str){
      case "update" : 

          break;

      case "delete" : 

          break;
  }
  closeAlert();
}

// 위에서 자기용으로 만든 함수를 이벤트로 넣어주기
document.querySelector("#alert-ok").addEventListener('click', testF);

// 각 본인이 만든 버튼을 누르면 어떤 class명을 줄건지 각각 설정
$("#test1").click(function(){
  $("#alert-text").html("테스트중");
  alertAddClass("update");
});
$("#test2").click(function(){
  $("#alert-text").html("테스트중2");
  alertAddClass("delete");
})

