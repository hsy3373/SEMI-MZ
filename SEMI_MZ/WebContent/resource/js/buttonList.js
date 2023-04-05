/**
 * 작성자 : 윤지영
 * 광장 및 마이홈에 들어갈 버튼 모달 리스트 js
 */
import { getContextPath } from './common.js';
import {modalstopfn} from './squareCanvas.js';
let path = getContextPath();

//버튼이벤트
//버튼세팅 
const friendList = document.querySelector('.friendList'); //친구목록버튼
const Listbutton = document.querySelector('.Listbutton'); //환경설정버튼

//버튼 클릭 : 친구목록
friendList.addEventListener('click', () => {
    modal1.style.display = 'block';
    modalstopfn();
});

//버튼 클릭 : 환경설정
Listbutton.addEventListener('click', () => {
    modal2.style.display = 'block';
    modalstopfn();
});

//모달 이벤트

//모달 세팅
const modal1 = document.querySelector('.modal1'); //친구목록
const modal2 = document.querySelector('.modal2'); //환경설정
const logoutButton = document.querySelector('.modal-button2'); //로그아웃버튼
const mydateButton = document.querySelector('.modal-button1'); //내정보 변경
const Preferences = document.getElementById("Preferences");

//X버튼 종료이벤트 : 친구목록 
document.querySelector('.x-btn1').addEventListener('click', () => {
    modal1.style.display = 'none';
    modalstopfn();
});


//X버튼 종료이벤트 : 환경설정 
document.querySelector('.x-btn2').addEventListener('click', () => {
    modal2.style.display = 'none';
    modalstopfn();
});

//로그아웃창 연결
logoutButton.addEventListener('click', () => {
    console.log("로그아웃 이벤트 부여")
});


//////////////////// [김혜린] /////////////////////////

//내정보 변경 연결
let smodalInfo = $('.smodalInfo'); // 내정보변경 전 비밀번호입력요구 모달창
let modalMyinfo = $('.modalMyinfo'); // 내정보변경 모달창

mydateButton.addEventListener('click', () => {
    console.log("내정보변경버튼 이벤트 부여 => pw입력요청모달");
    smodalInfo.css('display','block');
});

/* 내정보변경 시 비밀번호 입력 요청 모달 닫기 */	
document.querySelector('.sx-btn1').addEventListener('click', () => {
    smodalInfo.css('display','none');
});

document.querySelector('.myinfo-xbtn').addEventListener('click', () => {
    modalMyinfo.css('display','none');
    smodalInfo.css('display','none');
});
	



/* 내정보 변경 pw입력요청 모달에서 pw 확인 버튼 클릭 시 */
$('#rq-btn').on("click", function(){
	let inputPwd = $('#rqpwd').val();

	$.ajax({
		type : "post",
		url : path + "/checkPwd.me",
		dataType : "text",
		data : {inputPwd: inputPwd},
		success : (result) => {
			if(result == "O"){
				//내정보변경 전 패스워드 체크일 때(패스워드 일치 시)
				// 내정보변경 모달 block 처리
				modalMyinfo.css('display','block');
			}else{
				alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
			}
		}
	})

});


/*  회원탈퇴 버튼 클릭 시 비밀번호 입력 요청 모달 열고 닫기 */
let smodalNmem = $('.smodalNmem');

$('#sec-btn').on("click", function(){
	smodalNmem.css('display', 'block');
});

$('.sx-btn2').on('click', () => {
	smodalNmem.css('display', 'none');
});

$('#secsub-btn').on("click", function(){
	let inputPwd = $('#sec-pwdchk').val();

	$.ajax({
		type : "post",
		url : path + "/checkPwd.me",
		dataType : "text",
		data : {inputPwd: inputPwd},
		success : (result) => {
			if(result == "O"){
				// 회원탈퇴 전 패스워드 체크일 때(패스워드 일치 시)
				// 탈퇴되었다는 알림과 함께 로그인페이지(메인페이지로 이동하면서)세션정보지우기
				// 그리고 테이블에 탈퇴처리하고, 상태테이블에 추가



			}else{
				alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
			}
		}
	})

});