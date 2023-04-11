/**
 * 메인(로그인/회원가입/찾기) 스크립트
 * 작성자 : 김혜린
 */

//import { getCookie } from './common.js';
//import { isEmpty } from './common.js';
//import { setCookie } from './common.js';
import { getContextPath } from './common.js';
import * as Common from "./common.js";
//import * as API from "./mainAPI.js";
import * as vali from "./validation.js";
let path = getContextPath();

$(document).ready(function(){
	// === 로그인이 안되어있는 상태일 때
  // === 로컬 스토리지에 저장된 key가 "saveid" 인 userid 값을 불러와서 input 태그 userid 에 넣어주기
  //if(${empty sessionScope.loginuser}){ // 로그인이 안된 상태라면
	// alert("loginuser 없음");
 
	const loginUserid = localStorage.getItem("saveid");
	console.log(loginUserid);
	if(loginUserid != null){ // 로컬에 저장된 userid 가 있는 경우
		$("[name=userId]").val(loginUserid);
	   $("input:checkbox[id='save-id']").prop("checked", true);
	}

	const autoLogin = localStorage.getItem("autoLogin");

	if(autoLogin != null){
		location.replace(path+"/views/square.jsp");
	}


	 
});





	/* 메인 시작 슬라이드다운 */
	$(function(){
			$( 'button.logo-img-btn' ).click( function() {
				$('.mz-logo').css('display','none');
				$('.login').slideDown(1000);
			});
		})
	
	
	/* 아이디 비밀번호 찾기 모달 */
	const modal1 = document.querySelector('.modal1');
	const findModal = document.querySelector('.find-modal');
	
	document.querySelector('.x-btn1').addEventListener('click', () => {
	  modal1.style.display = 'none';
	});
	
	findModal.addEventListener('click', () => {
	  modal1.style.display = 'block';
	});
		
		
	/* 회원가입창 모달 닫기 */
	let modal2 = $('.modal2');
	let enrollXbtn = $('.x-btn2');

	enrollXbtn.on("click", function(){
	  	modal2.css('display', 'none');
	});
	
	/* id/pw찾기 후 비밀번호 변경 모달 */
	const modal3 = document.querySelector('.modal3');
	
	document.querySelector('.x-btn3').addEventListener('click', () => {
		modal3.style.display = 'none';
		modal1.style.display = 'none';
	});
	

	
	/* 메인 기본 로그인(로그인처리, 아이디저장, 자동로그인) */
	$('.login-btn').on("click", function(){
		
		let userId = $("[name=userId]").val();
		let userPwd = $("[name=userPwd]").val();



		// 아이디 저장 체크박스
		if($("input:checkbox[id='save-id']").prop("checked")){
          
			// local storage에 아이디 정보를 저장해줘야함
			  localStorage.setItem('saveid', userId );
			console.log("로컬스토리지 담긴 값 : "+localStorage.getItem("saveid"));
		 }
		else { // 아이디 저장 체크 안했다면
			localStorage.removeItem('saveid');    // 삭제
		 }

		 // 자동로그인 체크박스
		 if($("input:checkbox[id='auto-login']").prop("checked")){
          
			// local storage에 boolean값 저장해줘야함
			  localStorage.setItem('autoLogin', userId );
			console.log("로컬스토리지 담긴 값 : "+localStorage.getItem("autoLogin"));
		 }
		else { // 자동로그인 체크 안했다면
			localStorage.removeItem('autoLogin');    // 삭제
		 }

		
		
///////////////////////////////////////////////////////////////

		// 로그인처리
		$.ajax({
			type : "post",
			url : path + "/login.me",
			dataType :  "json",
			data : {userId: userId , userPwd: userPwd },
			success: (result) => {
				if(result == "0"){ // 로그인 실패
					alert("로그인에 실패하였습니다. id/pw를 다시 확인해주세요.");
				}
				if(result == "6"){ // 탈퇴 혹은 차단 계정
					alert("탈퇴 혹은 차단 된 계정입니다. 서비스 이용이 불가능합니다.");
				}
				if(result == "1"){ // 로그인 처리(성공). 광장으로.
					//location.replace(path+"/views/square.jsp");
					location.href = path+"/forwarding.sq";
					
				}
				if(result == "7"){ // 관리자계정인경우(userid = admin)
					location.replace(path+"/views/admin/main.jsp");
				}
			} 
		})




	});



	
	/* 회원가입 처리 */   //insert(member / login_api / character) 
	$('#enroll-btn').on("click", function(){

		let userId = $("[name=enrollId]").val();
		let nicName = $("[name=enrollNick]").val();
		let userPwd = $(".enroll-chkpwd").val();
		let apiKey = Common.getCookie("key");
		let apiKind = Common.getCookie("kind");

		$.ajax({
			type : "post",
			url : path + "/enroll.me",
			dataType : "json",
			data : {userId: userId, nicName: nicName, userPwd: userPwd, apiKey: apiKey, apiKind: apiKind},
			success : (result) => {

				if(result == "1"){ //멤버테이블 insert 성공

					let autoLogin = confirm("회원가입이 완료되었습니다. 바로 접속하시겠습니까?");

					if( autoLogin == 1){ // confirm 확인버튼(true 반환) 

						location.href = path+"/forwarding.sq";

					}else{ // confirm 취소버튼

						alert("로그인 화면으로 이동합니다.");

					}
					console.log("멤버, 캐릭터, API 테이블 insert 성공(1)? : " + result);
				}

				if(result == "0"){ //캐릭터 or API 테이블 insert 실패
					//console.log("멤버테이블 insert 실패" + result);
					alert("회원가입에 실패하였습니다. 다시 확인해주세요.");
				}

				modal2.css('display', 'none');

			}
		})
	});


/* id/pw찾기 => 비밀번호 재설정 */
$('#newpwd-btn').on("click", function(){

	let userPwd = $('.re-chkpwd').val();

	$.ajax({
		type : "post",
		url : path + "/updatePwd.me",
		dataType : "text",
		data : {userPwd : userPwd},
		success : (result) => {
			if(result == "1"){ //update성공
				alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
				modal3.style.display = 'none';
				modal1.style.display = 'none';
			}else{ // update 실패
				alert("비밀번호 변경에 실패하였습니다. 다시 확인해주세요.");
			}
		}
	});
});

