/**
 * 메인(로그인/회원가입/찾기) 스크립트
 * 작성자 : 김혜린
 */

import { getContextPath } from './common.js';
import * as Common from "./common.js";
import { openAlert, closeAlert, cancelConfrim } from "./alert.js"; // confirm
import { homeOpenAlert } from "./homeAlert.js"; // alert
let path = getContextPath();


$(document).ready(function(){
	//[아이디 저장]
	const saveUserId = localStorage.getItem("saveid");
	if(saveUserId != null){ // 로컬에 저장된 userid 가 있는 경우
		$("[name=userId]").val(saveUserId); //id 입력 input칸 
	    $("input:checkbox[id='save-id']").prop("checked", true); // 아이디저장 체크상태 유지
	}
	//[자동 로그인]
	const autoLogin = localStorage.getItem("autoLogin");
	if(autoLogin != null){ // 로컬에 자동로그인 남아있는 경우
		location.replace(path+"/views/square.jsp"); //바로 광장으로 자동로그인 처리
	}
});

	/* 메인 시작 로그인판 슬라이드다운 */
	$(function(){
			$( 'button.logo-img-btn' ).click( function() {
				$('.mz-logo').css('display','none');
				$('.login').slideDown(1000);
			});
	});
	
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
	
	/* 로그인버튼 enter 이벤트 */
	document.querySelector('.enter-pwd').addEventListener('keyup', function(e){
		if(e.key == 'Enter'){
		  document.querySelector('.enterLogin').addEventListener('click', mainLogin());
		}
	});
	
	/* 메인 기본 로그인(로그인처리, 아이디저장, 자동로그인) */
	$('.login-btn').on("click", function(){
		mainLogin();
	});
	
	function mainLogin(){
		let userId = $("[name=userId]").val();
		let userPwd = $("[name=userPwd]").val();

		// [아이디 저장] 체크박스
		if($("input:checkbox[id='save-id']").prop("checked")){
			// local storage에 유저아이디 저장
			localStorage.setItem('saveid', userId );
			//console.log("로컬스토리지 담긴 값 : "+localStorage.getItem("saveid"));
		 }
		else { // 아이디 저장 체크 안했다면
			localStorage.removeItem('saveid'); // 로컬 삭제
		 }

		 // [자동로그인] 체크박스
		 if($("input:checkbox[id='auto-login']").prop("checked")){
          
			// local storage에 boolean값 저장해줘야함
			  localStorage.setItem('autoLogin', userId );
			console.log("로컬스토리지 담긴 값 : "+localStorage.getItem("autoLogin"));
		 }
		else { // 자동로그인 체크 안했다면
			localStorage.removeItem('autoLogin');    // 로컬 삭제
		 }

		// [로그인처리]
		$.ajax({
			type : "post",
			url : path + "/login.me",
			dataType :  "json",
			data : {userId: userId , userPwd: userPwd },
			success: (result) => {
				if(result == "0"){ // 로그인 실패
					/*alert*/
					document.getElementById("home-alert-text").innerHTML = "로그인에 실패하였습니다.<br> id/pw를 다시 확인해주세요.";
					/*alert 창 띄우기*/
					homeOpenAlert();
				}
				if(result == "6"){ // 차단 계정
					/*alert*/
					document.getElementById("home-alert-text").innerHTML = "차단 된 계정입니다.<br> 서비스 이용이 불가능합니다.";
					/*alert 창 띄우기*/
					homeOpenAlert();
				}
				if(result == "1"){ // 로그인 처리(성공). 광장으로.
					location.href = path+"/forwarding.sq";
				}
				if(result == "7"){ // 관리자계정인경우(userid = admin)
					location.href = path+"/main.admin";
				}
				if(result == "5"){ // 탈퇴  계정 재로그인 (알람, 로그인처리)
					/*alert*/
                    document.getElementById("home-alert-text").innerHTML = "회원탈퇴가 해제 되었습니다. ";
                    /*alert 창 띄우기*/
                    homeOpenAlert3(); // alert 확인 버튼 클릭 후 페이지 이동
				}
			} 
		})
	};

	function pathSquare(){ // alert에서 페이지 이동
		location.href = path+"/forwarding.sq";
	}
	
	function homeOpenAlert3() {
		// alert과 오버레이 찾기
		let alert = document.querySelector(".home-alert");
		let alertOverlay = document.querySelector(".home-alert-overlay");
		// alert 및 오버레이 표시
		alert.style.display = "block";
		alertOverlay.style.display = "block";
	  
		let okBtn = alert.querySelector(".home-alert-ok");
	  
		okBtn.addEventListener("click",  pathSquare);
	  }
	
	/* 회원가입 처리 */ 
	$('#enroll-btn').on("click", function(){
		// Member테이블 insert 시 사용
		let userId = $("[name=enrollId]").val();
		let nicName = $("[name=enrollNick]").val();
		let userPwd = $(".enroll-chkpwd").val();
		// API 테이블 insert 시 사용
		let apiKey = Common.getCookie("key");
		let apiKind = Common.getCookie("kind");

		$.ajax({
			type : "post",
			url : path + "/enroll.me",
			dataType : "json",
			data : {userId: userId, nicName: nicName, userPwd: userPwd, apiKey: apiKey, apiKind: apiKind},
			success : (result) => {

				if(result == "1"){ //멤버테이블 insert 성공
					/* 회원가입 완료 confirm */
					document.getElementById("alert-text").innerHTML = "회원가입이 완료되었습니다.<br> 바로 접속하시겠습니까?";
					openAlert("enroll-login");
					cancelConfrim("enroll-not-login");
					//console.log("멤버, 캐릭터, API 테이블 insert 성공(1)? : " + result);
				}
				if(result == "0"){ //캐릭터 or API 테이블 insert 실패
					/*alert*/
					document.getElementById("home-alert-text").innerHTML = "회원가입에 실패하였습니다.<br> 다시 확인해주세요.";
					/*alert 창 띄우기*/
					homeOpenAlert();
				}
				modal2.css('display', 'none'); //회원가입 모달 닫기
			}
		})
	});

	 /*confirm창 확인버튼 클릭시 요청처리*/
	 $(".alert").on("click", ".enroll-login", function(){
		location.href = path+"/forwarding.sq";
        closeAlert();
    });

    /*confirm창 취소버튼 클릭시 요청처리*/
    $(".alert").on("click", ".enroll-not-login", function(){
        /*alert*/
		document.getElementById("home-alert-text").innerHTML = "로그인 화면으로 이동합니다.";
		/*alert 창 띄우기*/
		homeOpenAlert();
    	document.querySelector(".alert-cancel").classList = "button alert-cancel";
    });




/* id/pw찾기 => 비밀번호 재설정 */
$('#newpwd-btn').on("click", function(){
	// DB로 전달할 pwd
	let userPwd = $('.re-chkpwd').val();

	$.ajax({
		type : "post",
		url : path + "/updatePwd.me",
		dataType : "text",
		data : {userPwd : userPwd},
		success : (result) => {
			if(result == "1"){ //update성공

				/*alert*/
				document.getElementById("home-alert-text").innerHTML = "비밀번호가 변경되었습니다.<br> 다시 로그인해주세요.";
				/*alert 창 띄우기*/
				homeOpenAlert();

				modal3.style.display = 'none';
				modal1.style.display = 'none';
			}else{ // update 실패

			/*alert*/
			document.getElementById("home-alert-text").innerHTML = "비밀번호 변경에 실패하였습니다.<br> 다시 확인해주세요.";
			/*alert 창 띄우기*/
			homeOpenAlert();

			}
		}
	});
});

//지영작성  : 더블 로그인 안내문
const doubleLogin = localStorage.getItem("doubleLogin");
if(localStorage.getItem('doubleLogin') == "true"){
	document.getElementById("home-alert-text").innerHTML = "중복로그인 되였습니다. <br> 재 로그인 해주세요.";
	/*alert 창 띄우기*/
	homeOpenAlert();
	localStorage.removeItem('doubleLogin');
}