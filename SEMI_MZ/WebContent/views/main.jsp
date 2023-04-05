<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">


<!-- css일반글꼴 link -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">

<!-- script link / jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<!-- css link -->
<link href="<%= contextPath %>/resource/css/common.css" rel="stylesheet" type="text/css">
<link href="<%= contextPath %>/resource/css/main.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../resource/css/alert.css">




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
			<form name="login-form" method="post">
<!-- ============================ 1. 기본 로그인 ================================= -->
				<table class="login-box">
					<tr style="font-size:30px; cursor: default;">
	                    <th>ID</th>
	                    <th><input type="text" class="login-inputbox" name="userId"></th>
	                    <th rowspan="2"><button type="button" class="login-btn" >Login</button></th>
	
	                </tr>
	                <tr style="font-size:30px; cursor: default;">
	                    <th>PW</th>
	                    <th><input type="password" class="login-inputbox" name="userPwd"></th>
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
<!-- ============================ 2. 카카오/구글로 시작하기 ================================= 회원가입 모달 열리는 클래스 .enroll-modal -->
				<table class="other-login">
	                <tr><th><button type="button" id="main-kakaobtn" class="kakao-btn other-btn"></button></th></tr>
	                <tr><th><button type="button" class="google-btn other-btn"></button></th></tr>
	                
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
                        <tr><th><button type="button" id="find-kakaobtn" class="kakao-btn other-btn"></button></th></tr>
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
                	<form id="test2">
	                    <table class="display-center enroll-table">
	                        <tr>
								<th class="th1-wid">- 아이디</th>
								<td><input type="text" class="inputbox enroll-id" name="enrollId" placeholder="아이디"></td>
								<td class="td3-wid"><button type="button" class="ncheck-btn check-id" disabled>중복확인</button></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td><span class="idcheck-txt">영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능</span></td>
								<td></td>
							</tr>
							<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
							<tr>
								<th class="th1-wid">- 닉네임</th>
								<td><input type="text" class="inputbox enroll-nic" name="enrollNick" placeholder="닉네임"></td>
								<td class="td3-wid"><button type="button" class="ncheck-btn check-nic" disabled>중복확인</button></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td><span class="niccheck-txt">영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능</span></td>
								<td></td>
							</tr>
							<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
							<tr>
								<th class="th1-wid">- 비밀번호</th>
								<td><input type="password" class="inputbox enroll-pwd" placeholder="비밀번호"></td>
								<td></td>
							</tr>
							<tr>
								<th class="th1-wid"></th>
								<td><input type="password" class="inputbox enroll-chkpwd" placeholder="비밀번호 확인"></td>
								<td></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td><span class="pwd-txt">영문, 숫자, 특수기호 포함 8~16자 입력 가능</span></td>
								<td></td>
							</tr>
							<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
							<tr>
								<th class="th1-wid">- 이용약관 동의</th>
								<td>
									<textarea class="scroll-fix agree-text" name="enroll-agree" cols="72" rows="6" style="resize:none;" readonly>
이용약관

제1조 (목적)
이 약관은 (주)M-ZONE(이하 “회사”라 합니다)이 제공하는 메타버스 및 메타버스 관련 제반 서비스의 이용에 대해 회사와 회원의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
이 약관에서 사용하는 용어의 정의는 다음과 같습니다.

1. "서비스"란 단말기(PC, 휴대형 단말기 등의 각종 유무선 장치를 포함)에 상관없이, 회원이 이용할 수 있는 메타버스2의 거래 서비스 및 이와 관련된 제반 서비스를 의미합니다.
2. "회원"이란 이 약관에 따라 회사와 이용계약을 체결하고, 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
3. "아이디(ID 또는 계정)"란 회원이 본 약관 및 개인정보처리방침에 동의한 후 회사가 회원을 식별하고 서비스를 제공하기 위해 회원에게 승인한 문자 또는 숫자의 조합대로 설정한 것을 말합니다.
4. "메타달러"란 회원이 서비스 내에서 거래 등에 사용할 수 있고, 현금으로 교환이 가능한 가상의 화폐를 말합니다.
5. "게시물"이란 회원이 서비스에 게시한 부호·문자·음성·음향·화상·동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.
6. "콘텐츠"란 회사가 회원에게 제공하는 부호, 문자, 도형, 색채, 음선, 음향, 이미지, 영상 등(이들의 복합체를 포함한다) 온라인 디지털 형태의 정보나 자료를 말합니다.
7. "오픈마켓"이란 "오픈마켓 사업자"가 운영하는 어플리케이션 거래 사이트를 의미합니다.
8. "오픈마켓 사업자"란 서비스의 설치, 결제 기능을 제공하는 전자상거래 업체를 의미합니다.
9. "결제업체"란 신용카드, 휴대폰결제 등 "오픈마켓"에서 사용가능한 전자지급수단을 제공하는 업체를 말합니다.
10. "유료 결제"란 서비스 내에서 유료로 콘텐츠 등을 구매하기 위한 결제행위를 말합니다.
11. "유료 콘텐츠"란 "유료 결제"를 통해 유료로 구매한 "콘텐츠"를 의미합니다.
제3조 (약관의 게시와 개정)
① 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 내 또는 연결화면을 통하여 게시합니다.
② 회사는 필요한 경우 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
③ 회사가 이 약관을 개정할 경우에는 개정 내용과 적용일자를 명시하여 서비스에서 적용일자 7일 전부터 적용일자 전일까지 공지합니다.
④ 회사가 전항에 따라 약관 개정에 관하여 공지하면서 회원에게 ‘적용일자 전일까지 거부의 의사표시를 하지 않으면 약관 개정에 대한 동의의 의사표시가 표명된 것으로 본다’는 뜻을 명확하게 공지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정 약관에 동의한 것으로 봅니다.
⑤ 회원은 개정 약관에 동의하지 않는 경우 적용일자 전일까지 회사에 거부 의사를 표시하고 서비스 이용계약을 해지할 수 있습니다.
제4조 (약관의 해석)
① 회사는 이 약관 외에 별도의 운영정책을 둘 수 있습니다.
② 이 약관에서 정하지 아니한 사항이나 해석에 대해서는 운영 정책, 이용안내, 관련 법령에 따릅니다.

제31조 (준거법)
회사와 회원 간 발생한 분쟁에 대하여는 대한민국 법을 적용합니다.

<부칙>
이 약관은 2023년 4월 21일부터 적용됩니다.
									</textarea>
								</td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td class="check-right">
									<div><input type="checkbox" id="check-agree" name="check-agree" >
									<label for="check-agree">동의</label></div>
								</td>
								<td></td>
							</tr>
							<tr>
								<th colspan="3"><button type="button" id="enroll-btn" class="green-btn" disabled>회원 가입</button></th>
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
							<tr><th colspan="3"><span class="findId-txt"></span></th></tr>
							<tr><th colspan="3" style="color: rgba(119, 117, 117, 0.918);">-------------------------------------------------------------</th></tr>
							<tr class="empty-space"></tr>
							<tr>
								<th class="th1-wid">- 새 비밀번호</th>
								<td><input type="password" class="inputbox re-pwd" placeholder="비밀번호"></td>
								<td></td>
							</tr>
							<tr>
								<th class="th1-wid"></th>
								<td><input type="password" class="inputbox re-chkpwd" placeholder="비밀번호 확인"></td>
								<td></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td><span class="repwd-txt">영문, 숫자, 특수기호 포함 8~16자 입력 가능</span></td>
								<td></td>
							</tr>
							<tr style="height:90px"></tr>
							<tr>
								<th colspan="3"><button type="button" class="green-btn" id="newpwd-btn" disabled>비밀번호 재설정</button></th>
							</tr>
						</table>
	                </form>
                </div>
            </div>
        </div>
      </div>

	  







<!-- ============================ //// ================================= -->      
	

	
	




<!-- ============================ alert 창 ================================= -->    
<!-- ============= 탈퇴 alert 창 ================= -->    
<div class="alert">
	<h3>정말 탈퇴하시겠습니까?</h3>
	<div>
	   <button class="button alert-ok" id="alert-ok1" onclick="document.querySelector('#test').submit();">확인</button>
	   <button class="button alert-cancel">취소</button> 
	</div>
</div>
<div class="alert-overlay"></div>

<!-- ============= 회원가입완료 alert 창 ================= -->    
<div class="alert2 alert">
	<h3>회원가입이 완료되었습니다.</h3>
	<div>
	   <button class="button alert-ok" id="alert-ok2" onclick="document.querySelector('#test2').submit();">확인</button>
	   <button class="button alert-cancel">취소</button> 
	</div>
</div>
<div class="alert2-overlay"></div> 















	


<!-- common.js -->
<script type="module" src="../resource/js/common.js"></script>
<!--alert script -->
<!--<script  src="../resource/js/alert.js"></script>-->
<!-- 메인 script(modal) -->
<script type="module" src="../resource/js/main.js"></script>
<!--유효성 script -->
<script type="module" src="../resource/js/validation.js"></script>
<!-- API script --> 
<script type="module" src="../resource/js/mainAPI.js"></script> 
<!--kakao-->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
	
	
	
</body>
</html>