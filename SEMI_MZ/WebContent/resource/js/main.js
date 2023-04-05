/**
 * 메인(로그인/회원가입/찾기) 스크립트
 * 작성자 : 김혜린
 */

import { getContextPath } from './common.js';
import * as Common from "./common.js";
//import * as API from "./mainAPI.js";

let path = getContextPath();



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
	

	
	/* 메인 기본 로그인 */
	$('.login-btn').on("click", function(){
		
		let userId = $("[name=userId]").val();
		let userPwd = $("[name=userPwd]").val();
		
		$.ajax({
			type : "post",
			url : path + "/login.me",
			dataType :  "json",
			data : {userId: userId , userPwd: userPwd},
			success: (result) => {
				if(result == "0"){ // 로그인 실패
					alert("로그인에 실패하였습니다. id/pw를 다시 확인해주세요.");
				}
				if(result == "6"){ // 탈퇴 혹은 차단 계정
					alert("탈퇴 혹은 차단 된 계정입니다. 서비스 이용이 불가능합니다.");
				}
				if(result == "1"){ // 로그인 처리(성공). 광장으로.
					location.replace(path+"/views/square.jsp");
				}
				if(result == "7"){ // 관리자계정인경우(userid = admin)
					location.replace(path+"/views/admin/main.jsp");
				}
			} 
		})
	});
	
	/* 회원가입 처리 */   //insert(member / login_api) 
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
			data : {userId: userId, nicName: nicName, userPwd: userPwd},
			success : (result) => {

				if(result == "1"){ //멤버테이블 insert 성공
					let autoLogin = confirm("회원가입이 완료되었습니다. 자동 로그인하시겠습니까?");

					if( autoLogin == 1){ // confirm 확인버튼(true 반환) 
						location.replace(path+"/views/square.jsp");  // 광장으로 이동

					}else{ // confirm 취소버튼
						alert("로그인 화면으로 이동합니다.");
					}
					//console.log("멤버테이블 insert 성공" + result);
					//alert("회원가입이 완료되었습니다. 로그인 창으로 이동합니다.");
				}
				if(result == "0"){ //멤버테이블 insert 실패
					//console.log("멤버테이블 insert 실패" + result);
					alert("회원가입에 실패하였습니다. 다시 확인해주세요.");
				}


				modal2.css('display', 'none');
			}
		})
		// API테이블에 insert
		$.ajax({
			type : "post",
			url : path + "/enroll.api",
			dataType : "json",
			data : {userId: userId, apiKind: apiKind, apiKey: apiKey},
			success : (result) => {

				if(result == "11"){ //API테이블 insert 성공
					//console.log("API테이블 insert 성공" + result);
					modal2.css('display', 'none');
				 	//console.log("전달용 : API키 정보 insert 성공.");
				}else{ //API테이블 insert 실패
					//console.log("API테이블 insert 실패" + result);
				 	modal2.css('display', 'none');
				 	//console.log("전달용 : API키 정보 insert 실패.");
				}
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

//////////////////////광장 js(내정보변경) (백업용 나중에 지울 것...ㅎㅎ)/////////////////////////////////

// 	/* 내정보변경 시 비밀번호 입력 요청 모달 */
// 	const modal4 = document.querySelector('.modal4');
// 	const rqPwdModal = document.querySelector('.rqpwd-modal');
	
// 	document.querySelector('.x-btn4').addEventListener('click', () => {
// 	      modal4.style.display = 'none';
// 	});
	
// 	rqPwdModal.addEventListener('click', () => {
// 	      modal4.style.display = 'block';
// 	});

// 	/* 내정보변경 모달 */
// 	const modal5 = document.querySelector('.modal5');
	
// 	document.querySelector('.x-btn5').addEventListener('click', () => {
// 	      modal5.style.display = 'none';
// 	      modal4.style.display = 'none';
// 	});
	



// /* 내정보 변경 pw입력요청 모달에서 pw 확인 버튼 클릭 시 */
// $('#rq-btn').on("click", function(){
// 	let inputPwd = $('#rqpwd').val();

// 	$.ajax({
// 		type : "post",
// 		url : path + "/checkPwd.me",
// 		dataType : "text",
// 		data : {inputPwd: inputPwd},
// 		success : (result) => {
// 			if(result == "O"){
// 				//내정보변경 전 패스워드 체크일 때(패스워드 일치 시)
// 				// 내정보변경 모달 block 처리
// 				modal5.css('display','block');
// 			}else{
// 				alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
// 			}
// 		}
// 	})

// });








// /*  회원탈퇴 버튼 클릭 시 비밀번호 입력 요청 모달 열고 닫기 */
// let modal6 = $('.modal6');

// $('#sec-btn').on("click", function(){
// 	modal6.css('display', 'block');
// });

// $('.x-btn6').on('click', () => {
// 	modal6.css('display', 'none');
// });

// $('#secsub-btn').on("click", function(){
// 	let inputPwd = $('#sec-pwdchk').val();

// 	$.ajax({
// 		type : "post",
// 		url : path + "/checkPwd.me",
// 		dataType : "text",
// 		data : {inputPwd: inputPwd},
// 		success : (result) => {
// 			if(result == "O"){
// 				// 회원탈퇴 전 패스워드 체크일 때(패스워드 일치 시)
// 				// 탈퇴되었다는 알림과 함께 로그인페이지(메인페이지로 이동하면서)세션정보지우기
// 				// 그리고 테이블에 탈퇴처리하고, 상태테이블에 추가



// 			}else{
// 				alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
// 			}
// 		}
// 	})

// });




	
		