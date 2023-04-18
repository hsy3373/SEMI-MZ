/**
 * 작성자 : 윤지영(광장 및 마이홈에 들어갈 버튼 모달 리스트 js)
 *          김혜린(내정보 변경 모달)
 */

import { getContextPath, getSessionStorage } from "./common.js";
import { modalstopfn } from "./squareCanvas.js";
import { FilterUsers } from "./squareCanvas.js";
import { getUserInfo } from "./userInfo.js";
import * as vali from "./validation.js";
import {openAlert} from "./alert.js";
import { homeOpenAlert } from "./homeAlert.js";
let path = getContextPath();



//버튼이벤트
//버튼세팅
// const init = function(){

const friendList = document.querySelector(".friendList"); //친구목록버튼
const Listbutton = document.querySelector(".Listbutton"); //환경설정버튼
const friendtable = document.getElementById("friendList"); //친구목록 table


//친구목록 : 놀러가기 이벤트

const fnClick = (fn) => {
  document.querySelector(".info-modal").classList.remove("hidden");
  window.sessionStorage.setItem("clickedUserId", fn);
  getUserInfo();
};


//버튼 클릭 : 친구목록
friendList.addEventListener("click", () => {
  fnmodal.style.display = "block";
  let listuserId = getSessionStorage("loginUser");
 
  //친구목록 상세조회
  $.ajax({
    url: path + "/selectFriend",
    data: { userId: listuserId },
    success: function (list) {
      //현재접속중인 유저 id
      let filterid = [];

      //이전에 생성된 td태그들 삭제
      friendtable.replaceChildren();

      //접속중인 userId 배열에 넣어주기
      for (let i of FilterUsers) {
        filterid.push(i.userId);
      }

      //받아온 친구 list 동적으로 생성 : 이벤트 부여해주려니 create 해줘야함
      for (let fn of list) {
        let tr = document.createElement("tr");
        let tdNicName = document.createElement("td");
        tdNicName.textContent = fn.nicName;
        tr.appendChild(tdNicName);

        let td2 = document.createElement("td");

        tr.appendChild(td2);

        let gofriend = document.createElement("td");
        gofriend.textContent = "놀러가기";
        gofriend.classList.add("go-to-fn");
        tr.appendChild(gofriend);

        //생성된 tr에 친구 팝업 이벤트 생성
        gofriend.addEventListener("click", function () {
          fnClick(fn.userId);
        });

        //접속 비접속 체크
        if (filterid.includes(fn.userId)) {
          td2.textContent = "접속중";
          friendtable.prepend(tr);
        } else {
          td2.textContent = "비접속";
          friendtable.append(tr);
        }
      }
    },
    error: function () {
      console.error();
    },
  });

  //modal창 뜨는동안 타 이벤트 정지처리
  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});

//버튼 클릭 : 환경설정
Listbutton.addEventListener("click", () => {
  pfmodal.style.display = "block";


  //모달종료로 이벤트 재실행
  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});

//모달 이벤트

//모달 세팅
const fnmodal = document.querySelector(".fn-modal"); //친구목록
const pfmodal = document.querySelector(".pf-modal"); //환경설정
const logoutButton = document.querySelector(".logout-button"); //로그아웃버튼
const mydateButton = document.querySelector(".fn-button"); //내정보 변경
//const Preferences = document.getElementById("Preferences");

//X버튼 종료이벤트 : 친구목록
document.querySelector(".fn-btn").addEventListener("click", () => {
  fnmodal.style.display = "none";

  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});

//X버튼 종료이벤트 : 환경설정
document.querySelector(".Pf-btn").addEventListener("click", () => {
  pfmodal.style.display = "none";
  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});


//alert js에서 가져옴 : 주의 !! 충돌가능성 있음!!
let logoutalertOperate = false;
//로그아웃창 연결
  logoutButton.addEventListener("click", () => {

    document.getElementById("alert-text").innerText = "로그아웃 하시겠습니까?"; /*여기 text 만교체하기 */

    openAlert("sqaue-logout"); /*내가쓸 calss 명 고유값  */

    let logoutok = document.querySelector(".sqaue-logout"); /*내가쓸 클래스명으로 교체 */
    logoutok.addEventListener("click", () => {
     /*본인 확인에 들어갈 이벤트! */
    localStorage.removeItem('autoLogin'); 
      location.href = path + "/logout";
    });

  });


//========================[내정보변경 - 작성자 : 김혜린]============================

//내정보 변경 연결
let smodalInfo = $(".smodalInfo"); // 내정보변경 전 비밀번호입력요구 모달창
let modalMyinfo = $(".modalMyinfo"); // 내정보변경 모달창

if(!logoutalertOperate){
mydateButton.addEventListener("click", () => { // 설정 => 내정보변경 버튼
  //console.log("내정보변경버튼 이벤트 부여 => 정보변경 모달 전에 pw입력요청 모달 열기");
  smodalInfo.css("display", "block");
  $('.pwdInput').focus();
  $('.chat-container').css("display","none"); // 채팅컨테이너 가리기
  $("#rqpwd").val("");
});

}

document.querySelector(".sx-btn1").addEventListener("click", () => {
  smodalInfo.css("display", "none");
  $('.chat-container').css("display","block");
});

/* 내정보변경모달 닫을 때 동시에 비밀번호 입력 요청 모달 닫기 */
document.querySelector(".myinfo-xbtn").addEventListener("click", () => {
  modalMyinfo.css("display", "none");
  smodalInfo.css("display", "none");
  $('.chat-container').css("display","block");
});

// 내정보변경 모달 초기화용 변수들
let nickBox = $('input[name=cge-nick]');
let infoBox = $('textarea[name=selfInfo]');
let pwdBox = $('.cge-pwd');
let chkpwdBox = $('.cge-chkpwd');

let nickTxt = $('.cgenick-txt');
let pwdTxt = $('.cgepwd-txt');
let infoTxt = $('#self-txt');


/* 내정보 변경 pw입력요청 모달에서 pw 확인 버튼 클릭 시 */
$("#rq-btn").on("click", function(){
  openInfo();
});

function openInfo() {
  let inputPwd = $("#rqpwd").val();

  $.ajax({
    type: "post",
    url: path + "/checkPwd.me",
    dataType: "text",
    data: { inputPwd: inputPwd , userId: userId},
    success: (result) => {
      if (result == "O") {
        //내정보변경 전 패스워드 체크일 때(패스워드 일치 시)
        // 내정보변경 모달 block 처리
		    smodalInfo.css("display", "none");
        modalMyinfo.css("display", "block");
        nickBox.prop('readonly', false); // 닉네임 readonly풀기
        pwdBox.val("");  //비밀번호칸 리셋
        chkpwdBox.val(""); // 비밀번호확인란 리셋

        //txt 닉네임 밑에, 비밀번호 밑에,, 자기ㅗㅅ개 밑에
        nickTxt.html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
        nickTxt.css('color', 'black');
        pwdTxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
        pwdTxt.css('color', 'black');
        infoTxt.html("100자 이내로 작성해 주세요.");
        infoTxt.css('color', 'black');

        // 활성화 처음 상태로 리셋
        vali.cgeInfoObj.nick = true;
        vali.cgeInfoObj.chknick = true;
        vali.cgeInfoObj.pwd = true;
        vali.cgeInfoObj.chkpwd = true;
        vali.cgeInfoObj.info = true;
        vali.cgeInfoEnable();

        //console.log("userId 뭐 담겼? : "+userId);

        $.ajax({
          type: "post",
          url: path + "/selectUser.me",
          dataType: "json",
          data: { userId: userId},
          success: (m) => {
            nickBox.val(m.nicName);  
            //console.log(nickBox.val())

            infoBox.val(m.info);
            //console.log(infoBox.val());

            if(m.gender == "M"){
              $("label[for='M']").click();
           }else if(m.gender == "W"){
              $("label[for='W']").click();
           }else{
              $("label[for='N']").click();
           }
          
          }
        });
      }
      if (result == "X") {

        /*alert*/
        document.getElementById("home-alert-text").innerHTML = "비밀번호가 일치하지 않습니다.<br> 다시 확인해주세요.";
        /*alert 창 띄우기*/
        homeOpenAlert();

      }
    },
  });
}


// 정보수정 버튼 클릭 함수 //
$('#cge-btn').on("click", function(){
	// jsp 인풋 값 => 변경할 내용
	let nickName = $('input[name=cge-nick]').val();
	let chkPwd = $('#cge-chkpwd').val();
	let info = $('textarea[name="selfInfo"]').val(); 
	let gender1 = $('input:radio[name="gender"]:checked').val();
  //console.log("gender1(라디오버튼 체크된거) 담긴거 : "+gender1);

	//console.log("닉네임///패스워드안에 뭐담겼니? : "+nickName +"///"+ chkPwd);
  function updateMem(){
	$.ajax({
		type : "post",
		url : path + "/update.me",
		dataType: "json",
		data : {nickName: nickName, chkPwd: chkPwd, gender: gender1, info: info},
		success : (updateM) => { 
			if(updateM == null){
				//alert("정보변경에 실패하였습니다. 다시 확인해주세요.");

        /*alert*/
        document.getElementById("home-alert-text").innerHTML = "정보변경에 실패하였습니다.<br> 다시 확인해주세요.";
        /*alert 창 띄우기*/
        homeOpenAlert();
        
			}else{
				//alert("정보 수정 완료.");

        /*alert*/
        document.getElementById("home-alert-text").innerHTML = "정보 수정 완료.";
        /*alert 창 띄우기*/
        homeOpenAlert();
        
        sessionStorage.setItem("loginUserNick", JSON.stringify(updateM.nicName));
       
			}
		}
	})
}
updateMem();
});


/*  회원탈퇴 버튼 클릭 시 비밀번호 입력 요청 모달 열고 닫기 */
let smodalNmem = $(".smodalNmem");

$("#sec-btn").on("click", function () {
  smodalNmem.css("display", "block");
  $('.pwdInput2').focus();
  $("#sec-pwdchk").val(""); //pw 입력란 리셋용
});

$(".sx-btn2").on("click", () => {
  smodalNmem.css("display", "none");
});

// 비밀번호 입력 후 확인버튼
$("#secsub-btn").on("click", function() {
  exitBtn();
});

function exitBtn() {
  let inputPwd = $("#sec-pwdchk").val();

  $.ajax({
    type: "post",
    url: path + "/delete.me",
    dataType: "text",
    data: { inputPwd: inputPwd },
    success: (result) => {
      if (result == "1") {

        /*alert*/
        document.getElementById("home-alert-text").innerHTML = "정상적으로 회원탈퇴 되었습니다.<br>15일 이내 재 로그인 시<br>탈퇴처리가 취소됩니다.<br>이용해주셔서 감사합니다.";
        /*alert 창 띄우기*/
        homeOpenAlert2(); // alert확인 버튼 클릭 시 페이지 이동

      } else {

        /*alert*/
        document.getElementById("home-alert-text").innerHTML = "비밀번호가 일치하지 않습니다.<br> 다시 확인해주세요.";
        /*alert 창 띄우기*/
        homeOpenAlert();
      }
    },
  });
}

function pathMain(){
  location.href = path + "/views/main.jsp";
}

function homeOpenAlert2() {
  // alert과 오버레이 찾기
  let alert = document.querySelector(".home-alert");
  let alertOverlay = document.querySelector(".home-alert-overlay");
  // alert 및 오버레이 표시
  alert.style.display = "block";
  alertOverlay.style.display = "block";

  let okBtn = alert.querySelector(".home-alert-ok");

  okBtn.addEventListener("click",  pathMain);
}

//============== enter key 이벤트 =================
document.querySelector('.pwdInput').addEventListener('keyup', function(e){
  if(e.key == 'Enter'){
    document.querySelector('.pwdcheckBtn').addEventListener('click', openInfo());
  }
});

document.querySelector('.pwdInput2').addEventListener('keyup', function(e){
  if(e.key == 'Enter'){
    document.querySelector('.pwdcheckBtn2').addEventListener('click', exitBtn());
  }
});