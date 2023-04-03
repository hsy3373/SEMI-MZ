/**
 * 메인/로그인/회원가입/정보변경 스크립트
 * 작성자 : 김혜린
 */


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
		
		
	/* 회원가입창 모달 */
	const modal2 = document.querySelector('.modal2');
	const enrollModal = document.querySelector('.enroll-modal');
	
	document.querySelector('.x-btn2').addEventListener('click', () => {
	  modal2.style.display = 'none';
	});
	
	enrollModal.addEventListener('click', () => {
	  modal2.style.display = 'block';
	});
	
	
	/* id/pw찾기 후 비밀번호 변경 모달 */
	const modal3 = document.querySelector('.modal3');
	const changePwdModal = document.querySelector('.changepwd-modal');
	
	document.querySelector('.x-btn3').addEventListener('click', () => {
	  modal3.style.display = 'none';
	  modal1.style.display = 'none';
	});
	
	changePwdModal.addEventListener('click', () => {
	      modal3.style.display = 'block';
	});


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
	var okBtn = alert.querySelector('#alert-ok1');
	okBtn.addEventListener('click', closeAlert);
	/* 회원가입완료 alert창 */
	var okBtn = alert.querySelector('#alert-ok2');
	okBtn.addEventListener('click', closeAlert);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		