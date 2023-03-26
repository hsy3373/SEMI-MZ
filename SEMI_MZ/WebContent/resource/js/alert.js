/**
 * 작성자 : 노지의
 * alert창 JS
 */
// 모달과 오버레이 찾기
let alert = document.querySelector('.alert');
let alertOverlay = document.querySelector('.alert-overlay');

let alertToggle = document.querySelector('.alert-toggle');
alertToggle.addEventListener('click', openAlert);

// openAlert() : 외부 버튼 클릭시 alert 창 실행시키기 위한 함수
function openAlert() {
  // 취소버튼 클릭시 alert 창 닫힘
  let cancelBtn = alert.querySelector('.alert-cancel');
  cancelBtn.addEventListener('click', closeAlert);

  // 모달 및 오버레이 표시
  alert.style.display = 'block';
  alertOverlay.style.display = 'block';

}

// closeAlert() : 모달과 오버레이 숨기기
export function closeAlert() {
  alert.style.display = 'none';
  alertOverlay.style.display = 'none';
}

export function alertAddClass(str){
  // id="alert-text" 요소에 class 속성을 추가하고 속성의 값은 변수명이 str인 값으로 한다.
  $("#alert-text").attr("class" , str);
  openAlert();
}


// -------------------------------------- 추가 및 생성해야할 파일 --------------------------------------

// 자기 파일용 함수작성
function testF(){
  // id="alert-text"의 class 속성의 값을 가져와 str 변수에 담아둔다.
  let str = $("#alert-text").attr("class");

  switch(str){
    case "update" : 
      // 실행시 구현할 코드 작성
      
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
  $("#alert-text").html("수정 테스트중");
  alertAddClass("update");
});
$("#test2").click(function(){
  $("#alert-text").html("삭제 테스트중");
  alertAddClass("delete");
})
 
  


// -------------------------- 마이룸(지의) --------------------------
function myroomAlert(){

  let str = $("#alert-text").attr("class");

  switch(str){
    case "board-delete" :
    
    // 


    break;

    case "closet-buy" :
     
    // 

    break;

    case "board-send-delete" :
     
    // 

    break;
  }
  closeAlert();
}

// alert 창에서 확인 버튼 클릭 이벤트 추가
document.querySelector("#alert-ok").addEventListener('click', myroomAlert);

$("#board-delete").click(function(){
  $("#alert-text").html("삭제하시겠습니까?");
  alertAddClass("board-delete");
})
$("#closet-buy").click(function(){
  $("#alert-text").html("구입하시겠습니까?");
  alertAddClass("closet-buy");
})
$("#board-send-delete").click(function(){
  $("#alert-text").html("방명록을 삭제하시겠습니까?");
  alertAddClass("board-send-delete");
})


