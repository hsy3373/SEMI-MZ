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


//////////////////// [내정보변경 - 작성자 : 김혜린] /////////////////////////

//내정보 변경 연결
let smodalInfo = $('.smodalInfo'); // 내정보변경 전 비밀번호입력요구 모달창
let modalMyinfo = $('.modalMyinfo'); // 내정보변경 모달창

mydateButton.addEventListener('click', () => {
    console.log("내정보변경버튼 이벤트 부여 => pw입력요청모달");
    smodalInfo.css('display','block');
	$('#rqpwd').val("");
	$('#rqpwd').focus();
	$('.chat-container').css('display', 'none');
});

/* 내정보변경 시 비밀번호 입력 요청 모달 닫기 */	
document.querySelector('.sx-btn1').addEventListener('click', () => {
    smodalInfo.css('display','none');
	$('.chat-container').css('display', 'flex');

});

document.querySelector('.myinfo-xbtn').addEventListener('click', () => {
    modalMyinfo.css('display','none'); 
    smodalInfo.css('display','none');
	$('.chat-container').css('display', 'flex');

});

/* 내 정보 변경 성별(radio) */
let radioW = $('input:radio[name="gender"]:radio[value="W"]');
let radioM = $('input:radio[name="gender"]:radio[value="M"]');
let radioN = $('input:radio[name="gender"]:radio[value="N"]');

// console.log("radioM:"+radioM.val());
// console.log("radioW:"+radioW.val());
// console.log("radioN:"+radioN.val());

// console.log(gender); //gender = 세션안에 담긴 성별정보

/* 내정보 변경 pw입력요청 모달에서 pw 확인 버튼 클릭 함수*/
$('#rq-btn').on("click", function(){

	/* 내정보변경 input박스 초기화용 변수 선언 */
	let rsnick = $('.cge-nick').val();
	let rspwd = $('.cge-pwd').val("");
	let rschkpwd = $('.cge-chkpwd').val("");
	let rsselftxt = $('textarea[name="selfInfo"]').val();
	//let rsgender = $('input:radio[name="gender"]:checked').val();
	// 비밀번호 입력요구 input값
	let inputPwd = $('#rqpwd').val();
	
	$.ajax({
		type : "post",
		url : path + "/checkPwd.me",
		dataType : "text",
		data : {inputPwd: inputPwd},
		success : (result) => {
			if(result == "O"){  // 패스워드 일치 결과 반환

				//내정보변경 전 패스워드 체크일 때(패스워드 일치 시)
				// 내정보변경 모달 block 처리
				smodalInfo.css('display', 'none');
				modalMyinfo.css('display','block');

				//*정보변경 모달띄워질 때 들어갈 기능들*
				//모달 보여질 때 유저 정보변경된거 그대로 띄워지게 하는거!! 0
				// 		(아마도? 세션정보에서 그대로 꺼내오니까? 업데이트문 하고 
				// 		새롭게 보이는지 확인 새로고침 필요한지 안필요한지) 
				// input 입력란 입력하다가 닫고 다시들어왔을 때 기본 정보만 유지 0
				//입력하다가 만 건 비워주기!(리셋) 0
				rsnick; rspwd; rschkpwd; rsselftxt;
				$('input:radio[name="gender"][value="'+updateM.gender+'"]');
				$('.cgenick-txt').html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
				$('.cgenick-txt').css('color', 'black');
				$('.cgepwd-txt').html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
				$('.cgepwd-txt').css('color', 'black');
				$('input[name=cge-nick]').prop('readonly', false);

				/* 현재 로그인 유저의 성별 표시*/
				if(gender == "M"){
					radioM.prop('checked', true);
				}else if(gender == "W"){
					radioW.prop('checked', true);
				}else{
					radioN.prop('checked', true);
				}
			}
			if(result == "X"){ // 패스워드 불일치
				alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
			}
		}
	})

});

console.log("세션로그인유저 비번 : "+orgPwd);







////////////  정보수정 버튼 함수 //////////////
$('#cge-btn').on("click", function(){
	// jsp 인풋 값 => 변경할 내용
	let nickName = $('input[name=cge-nick]').val();
	let chkpwd = $('#cge-chkpwd').val();
	let info = $('textarea[name="selfInfo"]').val(); 
	let gender1 = $('input:radio[name="gender"]:checked').val();

	//gender는 항상 값이 체크되어있음
	// 닉네임, 패스워드 없을 수도 있음.
	// 이 때 값이 없으면 원래정보를 넣어줌..
	// if(nickName == ""){
	// 	nickName += orgName;
	// }
	if(chkpwd == ""){
		chkpwd += orgPwd;
	}
	console.log(nickName +"///"+ chkpwd);
	$.ajax({
		type : "post",
		url : path + "/update.me",
		dataType: "json",
		data : {nickName: nickName, chkpwd: chkpwd, gender: gender1, info: info},
		success : (updateM) => { 
			if(updateM == null){
				alert("정보변경에 실패하였습니다. 다시 확인해주세요.");
			}else{
				alert("정보 수정 완료.");
				$('input[name=cge-nick]').attr("value",updateM.nicName);
				$('textarea[name="selfInfo"]').text(updateM.info);
				$('input:radio[name="gender"][value="'+updateM.gender+'"]');
				gender1.val(updateM.gender);
				
				setSessionStorage("loginUserNick", updateM.nicName);


			}
		}
	})
});


/*  회원탈퇴 버튼 클릭 시 비밀번호 입력 요청 모달 열고 닫기 */
let smodalNmem = $('.smodalNmem');

$('#sec-btn').on("click", function(){
	smodalNmem.css('display', 'block');
	$('#sec-pwdchk').val(""); //pw 입력란 리셋용
	$('#sec-pwdchk').focus();
});

$('.sx-btn2').on('click', () => {
	smodalNmem.css('display', 'none');
});

// 비밀번호 입력 후 확인버튼
$('#secsub-btn').on("click", function(){
	let inputPwd = $('#sec-pwdchk').val();

	$.ajax({
		type : "post",
		url : path + "/delete.me",
		dataType : "text",
		data : {inputPwd: inputPwd},
		success : (result) => {
			if(result == "1"){ // 패스워드 일치 => 회원탈퇴 처리

				// 탈퇴되었다는 알림과 함께
				alert("회원탈퇴 되었습니다.");
				//로그인페이지로 이동(메인페이지)
				location.replace(path+"/views/main.jsp");

			}else{
				alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
			}
		}
	})

});