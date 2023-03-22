<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>mainPage</title>
<script src="//code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
	$(function(){
		$( 'button.logo-img-btn' ).click( function() {
			$('.mz-logo').css('display','none');
			$('.login').slideDown(1000);
		});
	})
</script>
<style>

	@font-face {
    font-family: "DOSSaemmul";
    src: url(<%= contextPath %>/resource/font/DOSSaemmul.ttf) format("truetype");
    font-weight: bolder;
	}
	* {font-family: 'DOSSaemmul', serif;}

	body{
        margin: 0;
    }
    
  
    
    
    div, table, tr, td, th{
        box-sizing: border-box;
        border: 1px solid rgba(255, 0, 0, 0); 
    }
    
    .wrap{
        width: 1300px;
        height: 800px;
        background-image: url(<%= contextPath %>/resource/img/login_img/login_background_구름o.png);
        background-size: contain;
        margin: auto;
    }
    
    .login{
        width: 400px;
        height: 600px;
        margin-left: 450px;
        position: relative;
        background-image: url(<%= contextPath %>/resource/img/login_img/로그인판.png);
        background-size: 400px 600px;
        background-repeat: no-repeat;
        display:none;
       
    }
    .login-box{
        color: white;
        width: 350px;
        margin-top: 195px;
        margin-inline-start: 6%;
    }
    .login-btn{
        width: 80px;
        height: 60px;
        font-weight: 600;
        font-size: 18px;
        border-radius: 30%;
        cursor: pointer;
    }
    .login-btn:hover{
        transform: scale(0.975);
    }
    .login-inputbox{
        width: 200px;
        height: 27px;
        color: white;
        font-size: 20px;
        border-top: 0; border-left: 0; border-right: 0;
        border-bottom: 2px dashed white;
        background-color: rgba(255, 0, 0, 0);
    }
    .login-inputbox:focus{
        outline: none;
    }
    input[type="checkbox"] {
        outline: 0;
        border: none !important;
        cursor: pointer;
    }
    .check-area{
        padding-top: 10px;
    }
    .other-login{
        width: 300px;
        margin-top: 110px;
        margin-inline-start: 10%;
    }
    .kakao-btn{
        width: 310px;
        height: 50px;
        background-position-x: center;
        background-image: url(<%= contextPath %>/resource/img/login_img/kakao_login_medium_wide.png);
        background-repeat: no-repeat;
        border: none;
        background-color: rgba(0, 0, 0, 0);
    }
    .other-btn:hover{
        transform: scale(0.975);
    }
    
    .google-btn{
        width: 310px;
        height: 50px;
        background-position-x: center;
        background-image: url(<%= contextPath %>/resource/img/login_img/btn_google_signin_light_normal_web@2x.png);
        background-size: 310px 50px;
        backgrond-repeat: no-repeat;
        border: none;
        background-color: rgba(0, 0, 0, 0);
    }
    .kakao-btn:hover, .google-btn:hover{
        cursor: pointer;
    }
    .find-text{
        background-color: rgba(0, 0, 0, 0);
        color:white;
        font-size: 14px;
        font-weight: 600;
        border: 0;
        cursor: pointer;
    }
    .find-text:hover{
        color: rgba(230, 218, 218, 0.973);
    }
    
    
    
    .modal {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        display: none;

        background-color: rgba(0, 0, 0, 0.4);
      }
      
     
      
      .modal-background{
        border: 0px solid red;
        width: 880px;
        height: 580px;
        background-image: url(<%= contextPath %>/resource/img/icon/notice_in.png);
        background-repeat: no-repeat;
        margin: 100px auto;
      }

      .modal-background *{
        border: 0px solid red;

      }
      .modal-header{
        height: 11%;
        text-align: center;
        font-size: 20px;
        font-weight:900;
        padding-top: 27px;
        padding-right: 15px;
      }
      .modal-out-btn{
        height: 9%;
        display: flex;
        justify-content: right;
      }
      .x-btn{
        width: 55px;
        height: 55px;
      }
      .x-btn:hover{
        transform: scale(0.970);
        cursor: pointer;
      }
      
      .display-center{
        margin-top: 150px;
        display: flex;
        justify-content: center;
      }
    
    	
    .s-modal-back{
        width: 400px;
        height: 230px;
        background-size: 400px 200px;
        background-position: center bottom;
    	background-image: url(<%= contextPath %>/resource/img/icon/modal_pop.png);
    	background-repeat: no-repeat;
        margin: 300px auto;
    }
    .modal4-table{
    	width: 400px;
    	margin: auto;
    }
    .smodal-th{
    	padding-left: 350px;
    }
    .smodal-xbtn{
    	background-color: rgba(0, 0, 0, 0);
    	border: none;
    	width: 100%"
    }
   .smodal-tb{
    	font-size: 20px;
    	color: white;
    } 
   
    
    
    .rqpwd-input{
   		width: 210px;
        height: 27px;
        margin-left: 50px;
        margin-top: 30px;
        color: white;
        font-size: 20px;
        border-top: 0; border-left: 0; border-right: 0;
        border-bottom: 2px dashed white;
        background-color: rgba(255, 0, 0, 0);
        }
    .rqpwd-input:focus{
    	 outline: none;
    }
    
    .subpwd-btn{
    	width: 70px;
    	height:35px;
    	margin-right: 30px;
    	margin-top: 30px;
    	border: none;
    	background-size: 70px 35px;
    	background-image: url(<%= contextPath %>/resource/img/icon/기본버튼.png);
    	background-color: rgba(0, 0, 0, 0);
    	background-repeat: no-repeat;
    	font-size:15px;
    	font-weight: 900;
    }
    .subpwd-btn:hover{
    	transform: scale(0.970);
        cursor: pointer;
    }
    .mz-logo{
    	margin-top: 220px;
    }
	.logo-img-btn{
		width:450px;
		height:350px;
    	border: none;
		background-color: rgba(0, 0, 0, 0.05);
    	margin-left: 410px;
		border-radius: 10%;
	}
	.logo-img-btn:hover{
        cursor: pointer;
        transform: scale(0.95);
    }
	.logo-img-btn>img{
		width:100%;
		height:100%;
	}
</style>





</head>


<body>
	<div class="wrap">
		<div class="mz-logo">
			<button type="button" class="logo-img-btn"><img src="<%= contextPath %>/resource/img/login_img/mz_logo.png"></button>
		</div>
		<div class="login">
			<table class="login-box">
				<tr style="font-size:30px; cursor: default;">
                    <th>ID</th>
                    <th><input type="text" class="login-inputbox"></th>
                    <th rowspan="2"><button type="button" class="login-btn">Login</button></th>

                </tr>
                <tr style="font-size:30px; cursor: default;">
                    <th>PW</th>
                    <th><input type="password" class="login-inputbox"></th>
                </tr>
               
                <tr>
                    <th colspan="3" class="check-area">
                        <input type="checkbox" name="save-id" value="save-id" id="save-id">
                        <label for="save-id">아이디 저장</label>
                        <input type="checkbox" name="auto-login" value="auto-login" id="auto-login">
                        <label for="auto-login">자동로그인</label>
                    </th>
                </tr>
			</table>
			
			<table class="other-login">
                <tr><th><button type="button" class="kakao-btn other-btn enroll-modal"></button></th></tr>
                <tr><th><button type="button" class="google-btn other-btn rqpwd-modal"></button></th></tr>
                
                <tr>
                    <th colspan="3" style="padding-top: 10px;">
                        <button type="button" class="find-modal find-text">아이디 찾기 / 비밀번호 찾기</button>
                    </th>
                </tr>
            </table>
		</div>
	</div>

	<div class="modal modal1">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">아이디 / 비밀번호 찾기</div>
                <div class="modal-out-btn"><img src="<%= contextPath %>/resource/img/icon/엑스 버튼.png" class="x-btn x-btn1"></div>
                <div class="modal-textarea">
                    <table class="display-center">
                        <tr><th>회원가입 시에 사용한 계정을 선택해주세요.</th></tr>
                        <tr><th style="color: rgba(119, 117, 117, 0.918);">-----------------------------------------</th></tr>
                        <tr><th><button type="button" class="kakao-btn other-btn"></button></th></tr>
                        <tr></tr>
                        <tr><th><button type="button" class="google-btn other-btn changepwd-modal"></button></th></tr>
                    </table>
                </div>
            </div>
        </div>
      </div>
	
	<div class="modal modal2">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">회원가입</div>
                <div class="modal-out-btn"><img src="<%= contextPath %>/resource/img/icon/엑스 버튼.png" class="x-btn x-btn2"></div>
                <div class="modal-textarea">
                    <table class="display-center">
                        <tr></tr>
                    </table>

                </div>
            </div>
        </div>
      </div>
	
	<div class="modal modal3">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">비밀번호 재설정</div>
                <div class="modal-out-btn"><img src="<%= contextPath %>/resource/img/icon/엑스 버튼.png" class="x-btn x-btn3"></div>
                <div class="modal-textarea">
                    <table class="display-center">
                        <tr></tr>
                    </table>
                </div>
            </div>
        </div>
      </div>
      
     <div class="modal modal4">
     	<div class="s-modal-back">
     		<div class="smodal-th"><button class="smodal-xbtn"><img src="<%= contextPath %>/resource/img/icon/엑스 버튼.png" class="x-btn x-btn4"></button></div>
     		<table class="modal4-table">
     			<tr class="smodal-tb"><th colspan="2">비밀번호 입력</th></tr>
     			<tr class="smodal-tf">
     				<td><input type="password" class="rqpwd-input"></td>
     				<td><button type="button" class="subpwd-btn chg-inf-modal">확인</button></td>
     			</tr>
     		</table>
     	</div>
     </div>
     
     <div class="modal modal5">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">내 정보 변경</div>
                <div class="modal-out-btn"><img src="<%= contextPath %>/resource/img/icon/엑스 버튼.png" class="x-btn x-btn5"></div>
                <div class="modal-textarea">
                    <table class="display-center">
                        <tr></tr>
                    </table>
                </div>
            </div>
        </div>
      </div>
      
	
	
	<script>
		
		
	
	
	
	
	
	
	
	
	
	
		const modal1 = document.querySelector('.modal1');
	    const modal2 = document.querySelector('.modal2');
	    const modal3 = document.querySelector('.modal3');
	    const modal4 = document.querySelector('.modal4');
	    const modal5 = document.querySelector('.modal5');
	    
	    const findModal = document.querySelector('.find-modal');
	    const enrollModal = document.querySelector('.enroll-modal');
	    const changePwdModal = document.querySelector('.changepwd-modal');
	    const rqPwdModal = document.querySelector('.rqpwd-modal');
	    const changeInfModal = document.querySelector('.chg-inf-modal');
	    
	    document.querySelector('.x-btn1').addEventListener('click', () => {
	      modal1.style.display = 'none';
	    });
	    
	    document.querySelector('.x-btn2').addEventListener('click', () => {
	      modal2.style.display = 'none';
	    });
	    
	    document.querySelector('.x-btn3').addEventListener('click', () => {
	      modal3.style.display = 'none';
	      modal1.style.display = 'none';
	    });
	    
	    document.querySelector('.x-btn4').addEventListener('click', () => {
		      modal4.style.display = 'none';
		    });
	    
	    document.querySelector('.x-btn5').addEventListener('click', () => {
		      modal5.style.display = 'none';
		      modal4.style.display = 'none';
		    });
	    
	    
	
	    findModal.addEventListener('click', () => {
	      modal1.style.display = 'block';
	    });
	
	    enrollModal.addEventListener('click', () => {
	      modal2.style.display = 'block';
	    });
	    
	    changePwdModal.addEventListener('click', () => {
		      modal3.style.display = 'block';
		    });
	    
	    rqPwdModal.addEventListener('click', () => {
		      modal4.style.display = 'block';
		    });
	    
	    changeInfModal.addEventListener('click', () => {
		      modal5.style.display = 'block';
		    });
	 
	
	    
	    
	    
	    
	    
	    
	   
	    
	    
	    
	    
	    
	    
	    
	</script>
	
	
	
	
	
	
	
	
	
	
	
	
</body>
</html>