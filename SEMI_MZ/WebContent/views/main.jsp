<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<!-- css link -->
<link href="../resource/css/main.css" rel="stylesheet" type="text/css">
<link href="../resource/css/common.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../resource/css/alert.css">

<!-- script link / jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>






<title>MainPage</title>


</head>


<body>
	<div class="wrap">
<!-- ============================ 메인 로고 ================================= -->
		<div class="mz-logo">
			<button type="button" class="logo-img-btn"><img src="../resource/img/login_img/mz_logo.png"></button>
		</div>
<!-- ============================ 로그인 ================================= -->
		<div class="login">
			<form>
<!-- ============================ 1. 기본 로그인 ================================= -->
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
<!-- ============================ 2. 카카오/구글로 시작하기 ================================= -->
				<table class="other-login">
	                <tr><th><button type="button" class="kakao-btn other-btn enroll-modal"></button></th></tr>
	                <tr><th><button type="button" class="google-btn other-btn rqpwd-modal"></button></th></tr>
	                
	                <tr>
	                    <th colspan="3" style="padding-top: 10px;">
	                        <button type="button" class="find-modal find-text">아이디 찾기 / 비밀번호 찾기</button>
	                    </th>
	                </tr>
	            </table>
            </form>
		</div>
	</div>
<!-- ============================ 아이디/비밀번호 찾기 모달 ================================= -->
	<div class="modal modal1">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">아이디 / 비밀번호 찾기</div>
                <div class="modal-out-btn"><img src="../resource/img/icon/엑스 버튼.png" class="x-btn x-btn1"></div>
                <div class="modal-textarea">
                	<form>
                    <table class="display-center" style="margin-top: 150px;">
                        <tr><th>회원가입 시에 사용한 계정을 선택해주세요.</th></tr>
                        <tr><th style="color: rgba(119, 117, 117, 0.918);">-----------------------------------------</th></tr>
                        <tr><th><button type="button" class="kakao-btn other-btn"></button></th></tr>
                        <tr></tr>
                        <tr><th><button type="button" class="google-btn other-btn changepwd-modal"></button></th></tr>
                    </table>
                    </form>
                </div>
            </div>
        </div>
      </div>
<!-- ============================ 회원가입창 모달 ================================= -->
	<div class="modal modal2">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">회원가입</div>
                <div class="modal-out-btn"><img src="../resource/img/icon/엑스 버튼.png" class="x-btn x-btn2"></div>
                <div class="empty-space"></div>
                <div class="modal-textarea">
                	<form>
	                    <table class="display-center enroll-table">
	                        <tr>
								<th class="th1-wid">- 아이디</th>
								<td><input type="text" class="inputbox" placeholder="아이디"></td>
								<td class="td3-wid"><button type="button" class="ncheck-btn">중복확인</button></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td>영문, 숫자 사용하여 5~20자 공백없이 가능</td>
								<td></td>
							</tr>
							<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
							<tr>
								<th class="th1-wid">- 닉네임</th>
								<td><input type="text" class="inputbox" placeholder="닉네임"></td>
								<td class="td3-wid"><button type="button" class="ncheck-btn">중복확인</button></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td>영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능</td>
								<td></td>
							</tr>
							<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
							<tr>
								<th class="th1-wid">- 비밀번호</th>
								<td><input type="password" class="inputbox" placeholder="비밀번호"></td>
								<td></td>
							</tr>
							<tr>
								<th class="th1-wid"></th>
								<td><input type="password" class="inputbox" placeholder="비밀번호 확인"></td>
								<td></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td>영문, 숫자, 특수기호 포함 8~16자 입력 가능</td>
								<td></td>
							</tr>
							<tr class="empty-space"></tr>
							<tr>
								<th colspan="3"><button id="enroll-btn">회원 가입</button></th>
							</tr>
	                    </table>
					</form>
                </div>
            </div>
        </div>
      </div>
<!-- ============================ id/pw찾기 후 비밀번호 재설정 모달 ================================= -->	
	<div class="modal modal3">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">비밀번호 재설정</div>
                <div class="modal-out-btn"><img src="../resource/img/icon/엑스 버튼.png" class="x-btn x-btn3"></div>
                <div class="empty-space"></div>
                <div class="modal-textarea">
                	<form>
	                    <table class="display-center" style="margin-top:50px;">
							<tr><th colspan="3">이용 중인 아이디 : //사용자아이디표시//</th></tr>
							<tr><th colspan="3" style="color: rgba(119, 117, 117, 0.918);">-------------------------------------------------------------</th></tr>
							<tr class="empty-space"></tr>
							<tr>
								<th class="th1-wid">- 새 비밀번호</th>
								<td><input type="password" class="inputbox" placeholder="비밀번호"></td>
								<td></td>
							</tr>
							<tr>
								<th class="th1-wid"></th>
								<td><input type="password" class="inputbox" placeholder="비밀번호 확인"></td>
								<td></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td>영문, 숫자, 특수기호 포함 8~16자 입력 가능</td>
								<td></td>
							</tr>
							<tr style="height:90px"></tr>
							<tr>
								<th colspan="3"><button id="enroll-btn">비밀번호 재설정</button></th>
							</tr>
						</table>
	                </form>
                </div>
            </div>
        </div>
      </div>
<!-- ============================ 내정보변경 시 비밀번호 입력 요청 모달 ================================= -->      
     <div class="modal modal4">
     	<div class="s-modal-back">
     		<div class="smodal-th"><button class="smodal-xbtn"><img src="../resource/img/icon/엑스 버튼.png" class="x-btn x-btn4"></button></div>
     		<form>
     		<table class="modal4-table">
     			<tr class="smodal-tb"><th colspan="2">비밀번호 입력</th></tr>
     			<tr class="smodal-tf">
     				<td><input type="password" class="rqpwd-input"></td>
     				<td><button type="button" class="subpwd-btn chg-inf-modal">확인</button></td>.
     			</tr>
     		</table>


     		</form>
			



     	</div>
     </div>
<!-- ============================ 내정보변경 모달 ================================= -->     
     <div class="modal modal5">
        <div class="modal_body">
            <div class="modal-background">
                <div class="modal-header">내 정보 변경</div>
                <div class="modal-out-btn"><img src="../resource/img/icon/엑스 버튼.png" class="x-btn x-btn5"></div>
                <div class="empty-space"></div>
                <div class="modal-textarea">
                <form id="test">
                    <table class="change-info-table">
                    	<tr>
                        	<th class="th1-wid">- 아이디</th>
                        	<td><input type="text" class="inputbox readonly" placeholder="유저 아이디" readonly></td>
                        	<td></td>
                        </tr>
                        <tr></tr><tr></tr>
                        <tr>
                        	<th class="th1-wid">- 닉네임 변경</th>
                        	<td><input type="text" class="inputbox" placeholder="닉네임"></td>
                        	<td class="td3-wid"><button type="button" class="ncheck-btn">중복확인</button></td>
                        </tr>
                        <tr class="under-text">
                        	<td></td>
                        	<td> 영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능</td>
                        	<td></td>
                        </tr>
                        <tr></tr><tr></tr><tr></tr><tr></tr>
                        <tr>
                        	<th class="th1-wid">- 비밀번호 변경</th>
                        	<td><input type="password" class="inputbox" placeholder="비밀번호"></td>
                        	<td></td>
                        </tr>
                        <tr>
							<th class="th1-wid"></th>
                        	<td><input type="password" class="inputbox" placeholder="비밀번호 확인"></td>
                        	<td></td>
                        </tr>
						<tr class="under-text">
							<td></td>
							<td>영문, 숫자, 특수기호 포함 8~16자 입력 가능</td>
							<td></td>
						</tr>
                        <tr></tr><tr></tr>
                        <tr>
                        	<th class="th1-wid th1-hgt">- 성별</th>
                        	<td>
                        		<input type="radio" id="W" name="gender" value="W">
        						<label for="W">여</label>
                        		<input type="radio" id="M" name="gender" value="M">
        						<label for="M">남</label>
        						<input type="radio" id="N" name="gender" value="N" checked>
        						<label for="N">비공개</label>
                        	</td>
                        	<td></td>
                        </tr>
                        
                        <tr>
                        	<th class="th1-wid">- 자기소개</th>
                        	<td>
                        		<textarea class="scroll-fix self-info" name="selfInfo" cols="53" rows="8" style="resize:none;" placeholder="자기소개 작성란"></textarea>
                        	</td>
                        	<td></td>
                        </tr>
                        <tr>
							<td></td>
                        	<th><button id="cge-btn">정보수정</button></th>
							<td style="text-align: right;"><button type="button" id="sec-btn" class="alert-toggle button2">회원탈퇴</button></td>
                        </tr>
                    </table>
                    </form>
                </div>
            </div>
        </div>
      </div>
<!-- ============================ //// ================================= -->      
	

	
	
	





<!-- ============================ alert 창 ================================= -->      
<div class="alert">
	<h3>정말 탈퇴하시겠습니까?</h3>
	<div>
	   <button class="button alert-ok" id="alert-ok1" onclick="document.querySelector('#test').submit();">확인</button>
	   <button class="button alert-cancel">취소</button> 
	</div>
  </div>
  <div class="alert-overlay"></div>
 <!-- alert script -->
 <script src="../resource/js/main.js"></script> 
  <script src="../resource/js/alert.js"></script>



	
	
	
</body>
</html>