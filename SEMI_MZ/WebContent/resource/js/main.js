/**
 * 메인/로그인/회원가입/정보변경 스크립트
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
		
		
	/* 회원가입창 모달 
	
	const enrollModal = document.querySelector('.enroll-modal');
	
	enrollModal.addEventListener('click', () => {
	  modal2.style.display = 'block';
	});  */

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
	//const changePwdModal = document.querySelector('.changepwd-modal');
	
	// changePwdModal.addEventListener('click', () => {
	//       modal3.style.display = 'block';
	// });


	/* 내정보변경 시 비밀번호 입력 요청 모달 */
	const modal4 = document.querySelector('.modal4');
	const rqPwdModal = document.querySelector('.rqpwd-modal');
	
	document.querySelector('.x-btn4').addEventListener('click', () => {
	      modal4.style.display = 'none';
	});
	
	rqPwdModal.addEventListener('click', () => {
	      modal4.style.display = 'block';
	});


	/* 내정보변경 모달 */
	const modal5 = document.querySelector('.modal5');
	const changeInfModal = document.querySelector('.chg-inf-modal');
	
	document.querySelector('.x-btn5').addEventListener('click', () => {
	      modal5.style.display = 'none';
	      modal4.style.display = 'none';
	});
	
	changeInfModal.addEventListener('click', () => {
	      modal5.style.display = 'block';
	});


	/* 탈퇴 alert창 */
	//var okBtn = alert.querySelector('#alert-ok1');
	//okBtn.addEventListener('click', closeAlert);
	/* 회원가입완료 alert창 */
	//var okBtn = alert.querySelector('#alert-ok2');
	//okBtn.addEventListener('click', closeAlert);
	
	

	
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
					console.log("멤버테이블 insert 실패" + result);
					alert("회원가입에 실패하였습니다. 다시 확인해주세요.");
				}


				modal2.css('display', 'none');
			}
		})


		$.ajax({
			type : "post",
			url : path + "/enroll.api",
			dataType : "json",
			data : {userId: userId, apiKind: apiKind, apiKey: apiKey},
			success : (result) => {

				if(result == 11){ //API테이블 insert 성공
					console.log("API테이블 insert 성공" + result);
					modal2.css('display', 'none');
				 	console.log("전달용 : API키 정보 insert 성공.");
				}else{ //API테이블 insert 실패
					console.log("API테이블 insert 실패" + result);
				 	modal2.css('display', 'none');
				 	console.log("전달용 : API키 정보 insert 실패.");
				}

			}
		})

		
	});













	
		