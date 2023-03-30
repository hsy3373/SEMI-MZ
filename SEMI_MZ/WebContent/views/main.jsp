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
<!-- css일반글꼴 link -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">

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
			<form action="<%= contextPath %>/login.me" method="post">
<!-- ============================ 1. 기본 로그인 ================================= -->
				<table class="login-box">
					<tr style="font-size:30px; cursor: default;">
	                    <th>ID</th>
	                    <th><input type="text" class="login-inputbox" name="userId"></th>
	                    <th rowspan="2"><button type="submit" class="login-btn">Login</button></th>
	
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
	                <tr><th><button type="button" onclick="kakaoLogin();" class="kakao-btn other-btn"></button></th></tr>
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
                	<form id="test2">
	                    <table class="display-center enroll-table">
	                        <tr>
								<th class="th1-wid">- 아이디</th>
								<td><input type="text" class="inputbox enroll-id" placeholder="아이디"></td>
								<td class="td3-wid"><button type="button" class="ncheck-btn">중복확인</button></td>
							</tr>
							<tr class="under-text">
								<td></td>
								<td><span class="idcheck-txt">영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능</span></td>
								<td></td>
							</tr>
							<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
							<tr>
								<th class="th1-wid">- 닉네임</th>
								<td><input type="text" class="inputbox enroll-nic" placeholder="닉네임"></td>
								<td class="td3-wid"><button type="button" class="ncheck-btn">중복확인</button></td>
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
제5조 (이용계약 체결)
① 이용계약은 회원이 되고자 하는 자(이하 "가입신청자"라 합니다)가 회사가 제공하는 약관의 내용과 회원정보 수집 및 이용에 대하여 동의한 다음 회사가 정한 절차에 따라 가입신청을 완료하고, 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
② 회사는 가입신청자의 신청에 대하여 아래 각 호에 해당하는 사유가 있는 경우에는 승낙을 하지 않을 수 있고, 가입 이후에도 아래 각 호의 사유가 있는 경우에는 승낙을 취소하거나 이용계약을 해지할 수 있습니다.
1. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우

2. 가입신청자가 실명이 아닌 명의 또는 타인의 명의를 이용한 경우

3. 가입신청자가 허위 또는 잘못된 정보를 기재 또는 제공하거나, 회사가 요청하는 내용을 기재하지 않은 경우

4. 가입신청자의 귀책사유로 인하여 승인이 불가능하거나 기타 이 약관에서 규정한 제반 사항을 위반하여 신청하는 경우

5. 가입신청자가 부정한 용도 또는 별개의 영업 목적으로 서비스를 이용하고자 하는 경우

6. 가입신청자가 관련 법령에 위배되거나 사회의 안녕질서 혹은 미풍양속을 저해할 수 있는 목적으로 신청한 경우

7. 기타 이 약관에 위배되거나 위법 또는 부당한 이용 신청인 경우

③ 이용계약의 성립 시기는 회사가 계정 생성 완료를 신청절차 상에서 표시하거나 홈페이지의 메시지, 전화, 문자메시지, 팩스, 전자우편 기타 이에 준하는 방법을 통한 통지가 가입신청자에게 도달한 시점으로 합니다.
④ 회사는 회원이 제공한 정보가 사실과 일치하는지 여부를 확인하기 위하여 법령에 의하여 허용된 범위에서 전문기관을 통한 실명확인 또는 본인인증을 요청할 수 있습니다.
⑤ 가입신청자가 기재하는 모든 회원정보는 사실인 것으로 간주하고, 진실한 정보를 입력하지 않은 가입신청자 또는 회원에 대하여 회사는 책임을 부담하지 않으며, 해당 회원은 서비스 사용의 제한을 받을 수 있습니다.
제6조 (회원정보 사용에 대한 동의)
① 회사는 회원의 개인정보를 본 이용계약의 이행과 본 이용계약 상의 서비스제공을 위한 목적으로 이용합니다.
② 회원이 회사 및 회사와 제휴한 서비스들을 편리하게 이용할 수 있도록 하기 위해 회원 정보는 회사와 제휴한 업체에 제공될 수 있습니다. 단, 회사는 회원 정보 제공 이전에 제휴 업체, 제공 목적, 제공할 회원 정보의 내용 등을 사전에 공지하고 회원의 동의를 얻어야 합니다.
③ 회사는 회원의 명시적인 수신거부 의사에 반하여 제휴한 서비스의 광고성 정보를 전송하지 않습니다. 단, 회사는 제휴서비스의 이용편의를 위하여 이용안내 및 상품정보 등의 SMS 및 SMS URL을 전송할 수 있고, 회원은 그 수신을 원치 않을 경우 정보 수신거부를 할 수 있으나 그러한 경우 회사로부터 서비스의 일부(단, 거래, 그 대금 결제 등 본질적인 서비스는 제외)를 제공받지 못할 수 있습니다.
④ 회원은 회원정보 수정을 통해 언제든지 개인 정보에 대한 열람 및 수정을 할 수 있습니다.
제7조 (회원 정보의 변경)
① 회원은 서비스를 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디는 수정이 불가능합니다.
② 회원은 회원가입신청 시 기재한 사항이 변경되었을 경우 서비스에서 직접 수정하거나 고객센터를 통하여 회사에 변경 사항을 통지하여야 합니다.
③ 회원이 전항의 변경사항을 회사에 통지하지 않아 발생한 불이익에 대하여 회사는 책임을 부담하지 않습니다.
제8조 (회원 정보의 관리)
① 회사는 회원이 입력한 계정과 비밀번호 등이 회사에 등록된 것과 일치할 경우에는 별도의 확인절차 없이 이용자를 회원으로 간주합니다.
② 회원은 본인의 허가를 받지 않은 제3자가 회원의 계정에 무단으로 접근하지 않도록, 비밀번호를 포함하여 계정 접근을 위해 필요한 일체의 정보를 안전하게 보관할 책임이 있습니다.
③ 회원은 계정 접근정보를 분실했거나, 도용 당했거나, 제3자에게 공개되었음을 인지한 경우 이를 즉시 회사에 통지해야 합니다. 이 경우, 회사는 즉시 계정 이용중단 등의 조치를 취할 수 있습니다.
④ 회원의 계정 아이디와 비밀번호에 관한 관리 책임은 회사뿐만 아니라 회원에게도 있습니다. 따라서 회원에게 부여된 아이디와 비밀번호의 관리소홀, 부정사용 등에 회원의 귀책사유 또는 불가항력으로 인하여 회원에게 발생한 손해에 대하여 회사는 책임을 부담하지 아니합니다.
제9조 (개인정보의 보호)
회사는 정보통신망 이용촉진 및 정보보호 등에 관한법률, 개인정보보호법 등 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다. 다만, 회사가 제작하여 제공한 화면 이외의 외부로 링크된 화면 등에서는 회사의 개인정보처리방침이 적용되지 않습니다.

제10조 (회사의 의무)
① 회사는 관련 법령과 이 약관을 준수하고, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.
② 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함) 보호를 위해 보안시스템을 갖출 수 있으며, 개인정보처리방침을 공시하고 준수합니다.
③ 회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 하며, 서비스 내 게시판, 전자우편 등을 통하여 회원에게 처리과정 및 결과를 전달할 수 있습니다.
제11조 (회원의 의무)
① 회원은 아래의 행위를 하여서는 안 됩니다.
1) 타인의 정보도용

2) 회사가 게시한 정보의 변경

3) 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시

4) 회사와 기타 제3자의 저작권 등 지식재산권에 대한 침해

5) 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위

6) 외설 또는 폭력적인 메시지, 화상, 음성, 허위사실, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위

7) 회사의 사전 동의 없이 영리를 목적으로 서비스를 사용하는 행위

8) 회사의 사전 승낙 없이 에이전트(Agent), 스크립트(Script), 스파이더(Spider), 스파이웨어(Spyware), 툴바(Toolbar) 등의 자동화된 수단, 기타 부정한 방법을 통하여 서비스에 접속하는 행위, 노출횟수 및 클릭횟수를 부정하게 생성하거나 증가시키는 행위, 서비스 이용 신청을 하는 행위, 회사의 서버에 부하를 야기하는 행위

9) 다른 회원의 개인정보 및 계정정보를 수집하는 행위

10) 타일의 시세에 부당한 영향을 주는 등의 방법으로 건전한 거래질서를 교란하는 행위

11) 기타 불법적이거나 회사 또는 타인에게 손해를 발생시키는 행위

② 회원은 관련 법령, 본 약관, 이용안내 및 서비스와 관련하여 회사가 공지하거나 통지한 사항 등을 준수하여야 하고, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.
③ 회원은 자신의 아이디와 비밀번호 등 계정 접근정보가 부정하게 사용된 사실을 알게 될 경우 반드시 회사에게 그 사실을 통지하고 회사의 안내에 따라야 합니다.
④ 전항의 경우 회원이 회사에 그 사실을 통지하지 않거나, 그 통지를 지연하거나, 통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는 일체 책임지지 않습니다.
제12조 (게시물의 저작권)
① 회원이 서비스 내에 게시한 게시물의 저작권은 저작권법에 의하여 보호를 받으며, 적법한 절차와 방법으로 회사에 다음과 같이 사용할 수 있는 영구적인 라이선스를 제공합니다. 상기 라이선스의 사용 및 허용 범위는 아래와 같습니다.
1. 서비스의 운영, 향상, 개선, 신규 서비스 개발, 프로모션 등을 위하여 게시물을 사용, 편집, 저장, 복제, 수정, 공개, 전송, 공개적 실연, 공개적인 게시, 배포할 수 있는 권리

2. 게시물의 2차적 저작물 제작 및 배포할 수 있는 권리

3. 서비스 홍보를 위한 목적으로 미디어, 통신사 등이 게시물의 내용을 보도, 방영하게 할 수 있는 권리

② 회사가 전항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우에는 전화, 문자메시지, 팩스, 전자우편 등을 통해 사전에 회원의 동의를 얻을 수 있습니다.
③ 이용계약이 해지되는 경우에도(해지의 사유나 주체를 불문한다) 서비스의 운영 향상, 개선, 홍보 등 제1항 각 호에 규정된 목적 범위 내에서 본 라이선스는 존속합니다.
제13조 (게시물의 이용권)
① 회원이 게시물을 임의로 무단 사용하여 발생하는 손실이나 기타의 문제는 회원 개인의 판단에 따른 책임이고, 회사는 이에 대하여 책임지지 않습니다.
② 회원은 타인의 초상권, 저작권 등 지식재산권 및 기타 권리를 침해하는 목적으로 게시물을 사용할 수 없고, 만일 타인의 권리를 침해하는 행위로 인하여 발생하는 결과에 대한 모든 책임은 회원 본인에게 있습니다.
③ 회원은 게시물을 무단으로 상업적이거나 기타 개인적인 이익을 위한 용도로 사용할 수 없습니다.
④ 회원이 게시물을 회사의 동의를 받지 않고 사용하여 회사에 피해를 입힌 경우, 회원은 회사에 법적인 절차에 따른 피해 배상 또는 보상 의무가 있습니다.
제14조 (게시물의 관리)
① 회원은 타인의 저작권을 침해하는 내용 혹은 허위 사실을 게시물에 포함하여서는 아니 됩니다. 회원의 게시물이 정보통신망 이용촉진 및 정보보호등에관한법률 및 저작권법 등 관련 법령에 위반되는 내용을 포함하는 경우 권리자는 관련 법령이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있고, 회사는 회원의 동의 없이도 관련 법령에 따라 적절한 조치를 취할 수 있습니다.
② 회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나, 허위 사실로 판단되거나, 기타 회사 정책 및 관련 법령에 위반될 경우에는 회원의 동이 없이도 관련 법령에 따라 해당 게시물에 대하여 게시 거부나 삭제 등의 조치를 취할 수 있습니다.
제15조 (권리의 귀속)
① 서비스에 대한 저작권 및 지식재산권은 회사에 귀속됩니다.
② 회사는 서비스와 관련하여 회원에게 회사가 정한 이용조건에 따라 서비스 등을 이용할 수 있는 이용권만을 부여하고, 회원은 이를 양도, 판매, 담보제공 등의 처분행위와 상업적 활동을 할 수 없습니다.
제16조 (서비스의 제공 등)
① 회사는 서비스를 일정 범위로 분할하여 각 범위 별로 이용가능 시간을 별도로 지정할 수 있습니다. 다만 이러한 경우에 그 내용을 사전에 공지합니다.
② 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
③ 전항에도 불구하고 회사는 다음 각호의 경우 서비스의 제공을 일시적으로 중단할 수 있고, 이 경우 회사는 사전에 서비스 초기 화면이나 공지사항 게시판을 통하여 회원에게 통지합니다. 다만, 회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.
1) 서비스 제휴 업체의 사정에 따른 제휴 서비스 중단

2) 서비스 제공과 관련된 제반 설비의 유지∙보수∙정기점검 등 필요가 있는 경우

3) 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 발생한 경우

4) 전자금융 사기 등 위법행위 발생 또는 발생의심 등으로 인하여 수사기관, 사법부, 행정청, 기타 공권력의 조사가 이루어져 해당 계정 및 전자지갑 등의 동결이 필요할 경우

5) 불가항력 사태가 발생한 경우. 본 호에서 불가항력 사태라 함은 회사의 통제에서 벗어난 사건이 발생한 경우로서 예컨대 (i) 정전이나 공중 또는 전용 통신망의 사용 불가능, (ii) 관할 당국의 법률, 명령, 지시, (iii) 파업, 직장폐쇄 또는 기타 노동쟁의, 민란, 폭동, 침입, 테러 공격이나 테러 공격의 위협, 전쟁 등 국가비상사태 발생, (iv) 모든 종류의 자연재해 등을 말합니다.

④ 회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있고, 정기점검 시간은 서비스제공화면에 공지한 바에 따릅니다.
제17조 (서비스의 변경)
① 회사는 안정적인 서비스 제공을 위하여 서비스의 내용, 운영상, 기술상 사항 등을 변경할 수 있습니다.
② 회사는 서비스를 변경할 경우 변경 내용과 적용일자를 명시하여 사전에 공지합니다. 다만, 회사가 사전에 공지할 수 없는 부득이한 사유가 있는 경우 사후에 공지할 수 있습니다.
③ 회원은 서비스 변경에 동의하지 않을 경우 회사에 거부의사를 표시하고 이용계약을 해지할 수 있습니다.
④ 회사는 서비스 제공과 관련한 회원의 재산 보호, 서비스정책의 변경 등 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경 또는 중단할 수 있고, 이에 대해 관련 법령에 특별한 규정이 없는 한 회사는 회원에게 별도의 보상이나 배상을 하지 않습니다.
제18조 (서비스의 이용)
① 회원이 회사가 지정하는 계좌에 현금을 입금하면 회사는 입금한 현금에 대해 메타달러로 회원의 계정에 지급합니다. (이 금액은 한국원화로 입금시에는 매일 달라지는 환율에 따라 달러화로 변환되고, 실제 서비스에는 해당 달러 금액만큼의 메타달러로 입금됩니다. 또한, 달러화로 입금시에는 실제 서비스에는 해당 달러 금액만큼의 메타달러로 입금됩니다.
② 회원은 회사가 정하는 방법에 따라 거래 주문을 회사에 제출하여야 합니다.
③ 회원이 타일 매매 주문을 요청할 경우, 진행을 위해 필요한 메타달러는 회원의 메타버스2 계정에 보유하고 있어야 합니다.
④ 회사는 회원이 거래를 진행하기 전에 회원이 거래하려고 하는 타일이나 자산의 수량, 가격 및 수수료 등을 요약한 정보를 제공합니다. 이러한 정보를 제공하지 못하는 경우에도 회원이 제출한 거래 요청에는 영향을 미치지 않습니다.
⑤ 메타버스2내의 타일이나 자산, 메타달러의 가격 변동에 대해서 회사는 책임지지 않습니다. 타일이나 자산의 거래나 메타달러의 출금 중단 또는 회사의 고의 또는 중과실이 개입되지 않은 비상 상황이 발생한 경우 회사는 다음 각호 중 하나 이상의 조치를 수행할 수 있고 이러한 조치로 인해서 회원에게 발생한 손실에 대해서 회사는 책임을 지지 않습니다.
1) 서비스에 대한 접근 중단

2) 서비스 안에서의 모든 활동 중단

⑥ 회원이 보유한 메타달러에 대해서 회사에 현금으로 출금을 요청하면, 회사는 회원이 요청한 메타달러에 수수료를 제외한 금액만큼의 현금을 회원이 사전에 등록한 계좌로 지급합니다. (회원이 보유한 메타달러는 달러 기준이므로 출금 액수는 매일 환율에 따라서 변동이 있을 수 있습니다. 이 경우는 보유한 달러를 대한민국 원화나 타 국가의 화폐로 환전하여 지급할 경우에 해당합니다. 수수료의 경우는 회사의 정책에 따라 비율이 달라질 수 있습니다.)
⑦ 회사는 입출금 시 회원이 제공한 정보가 사실과 일치하는지 여부를 확인하기 위하여 법령에 의하여 허용된 범위에서 전문기관을 통한 실명확인 또는 본인인증을 요청할 수 있습니다.
제19조 (서비스 이용 관련 유의사항)
1. 회사는 일정한 기준을 사전에 고지함으로써, 서비스를 통해 제출된 거래를 거부하거나 자산 거래금액 및 기타 다른 자산 거래 조건에 제한을 둘 수 있습니다. 예를 들어, 서비스를 통해 설정할 수 있는 미완료된 자산의 거래 수를 제한하거나 특정 국가나 지역 회원과의 거래를 제한할 수 있습니다.
2. 회원은 서비스에 제출한 자산 거래가 완료되기 전에만 취소할 수 있습니다. 부분적으로 완료된 자산 거래에 대해서는 체결되지 않은 나머지 자산 거래를 취소할 수 있습니다.
3. 회원의 계정에서 이용 가능한 메타달러가 회원이 제출한 자산 거래를 완료하기 위해 부족한 경우 회사는 ㉠ 전체 자산 거래를 취소하거나 ㉡ 회원의 계정에 이용 가능한 메타달러에 해당하는 부분만큼만 자산 거래를 진행할 수 있고, 위 ㉠과 ㉡에 대한 선택권은 회사에게 있습니다.
4. 회사는 서비스에서 회원이 이용할 수 있는 메타달러를 회사의 재량으로 추가하거나, 사전 공지를 거쳐서 제외할 수 있습니다.
5. 회원의 판매되지 않은 타일은 구매일 기준 15일 이후 2배로 타일이 자동등록 될 수 있습니다.
제20조 (서비스 수수료)
1. 회원은 타일이나 자산의 거래 서비스 등 회사가 제공하는 서비스를 이용하는 경우 이에 따른 수수료를 지급하여야 합니다. 서비스 수수료는 회사의 홈페이지에 명시되어 있고, 회사 또는 시장 상황에 따라 변경될 수 있습니다.
제21조 (이용제한 등)
① 회사는 다음 각 호에 해당하는 경우 회원의 서비스 로그인을 제한할 수 있습니다.
1) 타인의 서비스 아이디 및 비밀번호를 도용한 경우

2) 회사의 서비스 운영을 고의 또는 과실로 방해한 경우

3) 가입한 이름이 실명이 아닌 경우

4) 공공질서 및 미풍양속에 저해되는 내용을 고의 또는 과실로 유포시킨 경우

5) 회원이 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획 또는 실행하는 경우

6) 타인의 명예를 손상시키거나 불이익을 주는 행위를 고의 또는 과실로 한 경우

7) 서비스의 안정적 운영을 방해할 목적으로 다량의 정보를 전송하거나 광고성 정보를 전송하는 경우

8) 정보통신설비의 오작동이나 정보 등의 파괴를 유발시키는 컴퓨터 바이러스 프로그램 등을 유포하는 경우

9) 타인의 개인정보, 이용자 아이디 및 비밀번호로 부정하게 사용하는 경우

10) 회사의 서비스 정보를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통시키거나 상업적으로 이용하는 경우

11) 회사, 다른 회원 또는 제3자의 지식재산권을 침해하는 경우

12) 방송통신심의위원회 등 외부기관의 시정요구가 있거나 불법선거운동과 관련하여 선거관리위원회의 유권해석을 받은 경우

13) 본 약관을 포함하여 기타 회사가 정한 이용조건에 2회 이상 위반한 경우

14) 장기간 미접속 회원 중 미접속 기간이 11개월인 회원에게는 ‘계속 미접속 시 로그인 제한이 예정된다’는 취지로 통지하고 그 통지 기간 내에도 해당 회원의 로그인이 없는 경우

15) 회원에 대한 개인정보를 그 동의 없이, 수집, 저장, 공개하는 경우

16) 범죄와 결부된다고 객관적으로 판단되는 행위

17) 기타 관계 법령에 위배되는 행위

② 회사는 다음 각호에 해당하는 경우 회원의 입금 및 출금 이용을 제한하거나 지연하여 승인할 수 있습니다.
1) 가입 회원명과 입금자명이 다르게 입금되었을 경우

2) 보이스피싱/파밍 등 금융사기 예방을 위해 고객이 대한민국 원(KRW)화로 처음 입금시 72시간 동안 출금이 제한되며, 72시간 후 출금 요청 절차를 거쳐야 합니다.

3) 기타 회사의 운영정책상 입금 및 출금 이용을 제한하거나 지연해야 하는 경우

4) 회사가 정한 서비스 이용 권한의 범위를 벗어난 경우

③ 제1항의 경우 회사는 해당 내용을 회원에게 홈페이지의 메시지, 전화, 문자메시지, 팩스, 전자우편 기타 이에 준하는 방법을 통해 알립니다.
④ 이용제한 및 지연 사유가 중복 발생 시에는 관리자 또는 운영자가 요구하는 해제조건을 갖추었을 경우에 한해 해제 처리할 수 있습니다.
⑤ 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 운영정책, 이용안내 등에서 회사가 합리적으로 정하는 바에 의합니다.
⑥ 본 조에 따라 서비스 이용을 제한 또는 지연하거나 이용계약을 해지하는 경우에는 회사는 홈페이지의 메시지, 전화, 문자메시지, 팩스, 전자우편 기타 이에 준하는 방법으로 회원에게 통지합니다. 다만, 회사는 긴급하게 이용을 중지 또는 지연해야 할 사유가 존재하는 경우에는 그 통지를 사후에 할 수 있습니다.
⑦ 회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라 이의신청을 할 수 있습니다. 당해 이의신청이 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개할 수 있습니다
제22조 (이용계약 해지)
① 회원은 언제든지 서비스 내 정보 관리 메뉴 또는 고객센터 등을 통하여 이용계약 해지를 신청할 수 있고, 회사는 관련 법령이 정하는 바에 따라 이를 즉시 처리하여야 합니다.
② 회사는 회원에게 다음과 같은 사유가 발생할 경우 이용계약을 해지할 수 있습니다.
1) 본 약관을 포함하여 기타 회사가 정한 이용 조건의 중요 항목을 3회 이상 위반한 경우

2) 저작권법을 위반한 불법프로그램의 제공 및 운영방해, 정보통신망이용촉진및정보보호등에관한법률을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련 법령을 위반한 경우

3) 회사가 제공하는 서비스의 원활한 진행을 방해하는 행위를 하거나 시도한 경우

4) 제21조 제1항 각호의 이용제한사유에 해당하는 때, 당해 행위를 정지하지 않고 계속하는 경우

③ 전항에 따른 이용계약 해지 시 서비스 이용을 통해 획득한 모든 혜택이 소멸되고, 회사는 이에 대해 보상하지 않습니다.
④ 본 조에 따라 서비스 이용계약을 해지하는 경우에는 회사는 홈페이지의 메시지, 전화, 문자메시지, 팩스, 전자우편 기타 이에 준하는 방법으로 회원에게 통지합니다.
⑤ 이용계약 해지가 완료되는 경우 관련 법령 및 개인정보처리방침에 따라 회사가 보유하여야 하는 정보를 제외한 회원의 모든 정보가 삭제됩니다.
⑥ 전항에도 불구하고 제2항에 따라 회사가 이용계약을 해지하는 경우 회사는 회원의 이의신청 접수 및 처리 등을 위하여 일정 기간 동안 회원의 정보를 보관할 수 있고, 해당 기간이 경과한 후에 회원의 정보(단, 매매내역은 제외)를 삭제합니다.
제23조 (회원에 대한 통지)
① 회사가 회원에 대하여 통지를 하는 경우 이 약관에 별도의 규정이 없는 한 회원이 제공한 전자우편주소, 휴대전화 등에 할 수 있습니다.
② 회사는 회원 전체에 대하여 통지를 하는 경우 5일 이상 서비스 내 게시판에 게시함으로써 전항의 통지에 갈음할 수 있습니다.
제24조 (회사의 책임 제한)
① 본조에서 정하는 회사의 책임제한 사유는 회원이 계약상 손해배상청구권 등을 행사하고자 하는 경우는 물론 불법행위에 기한 손해배상청구권 등을 행사하는 경우에도 적용됩니다.
② 서비스에서 제공하는 콘텐츠는 서비스 이용을 위한 보조 도구이고, 그 어떠한 투자 또는 거래를 권유하거나 암시하지 않습니다. 콘텐츠 및 타 정보제공자가 제공하는 정보는 오류, 지연 및 기타 부정확성이 있을 수 있고, 회사는 이러한 정보에 대하여 회원이 조사 등을 소홀히 하여 입은 손해를 책임지지 않습니다.
③ 서비스 및 서비스에서 얻은 정보에 따른 투자에는 손실이 발생할 수 있고, 이에 대한 최종적 판단과 책임은 전적으로 회원에게 있습니다. 회사는 회원의 투자손실에 대해 어떠한 책임도 지지 않습니다.
④ 서비스 내에서 회원이 게시한 정보, 의견 및 자료 등은 회사와 아무런 관련이 없고, 게시물의 내용과 관련하여 발생한 법적 책임은 전적으로 해당 게시물을 게시한 회원 및 이를 열람한 회원에게 있습니다. 회사는 회원 간 또는 회원과 제3자 간에 서비스를 매개하여 발생한 분쟁에 관여할 법적 의무가 없고, 이와 관련하여 어떠한 책임도 지지 않습니다.
⑤ 회사는 천재지변, 디도스(DDOS)공격, IDC장애, 기간통신사업자의 회선 장애 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에, 회사의 고의 또는 중대한 과실이 없다면 이로 인해 발생하는 회원의 손해에 대해서 책임을 지지 않습니다.
⑥ 제3자에 의한 불법적인 회사 서버 접속행위나 기타 서버의 정상적인 운영을 방해하는 행위 또는 회원 정보의 무단 사용으로 인해 발생하는 회원의 손해에 대해서, 회사는 그 관리에 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.
⑦ 회사는 운영에 필요한 전반적인 시설과 내부 시스템 등을 구축하고 이를 유지·보수·관리하며, 회사가 이러한 유지·보수·관리에 고의 또는 중대한 과실이 없는 한 기술적 한계 등으로 인하여 불가피하게 발생한 장애, 서비스 제한 등에 대해서 책임을 지지 않습니다.
⑧ 회사는 제16조의 경우를 포함하여 서비스 제공을 위하여 회사의 서버를 점검하는 경우 점검 중 서비스 제공에 관한 책임이 없습니다.
⑨ 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
⑩ 회사는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성, 적법성 등에 관하여는 책임을 지지 않습니다.
⑪ 회사는 무료로 제공되는 서비스 이용과 관련하여 관련 법령에 특별한 규정이 없는 한 책임을 지지 않습니다.
⑫ 회원이 서비스를 이용함에 있어 회원 본인이 행한 불법행위나 이 약관 위반행위로 인하여 회사가 해당 회원 이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의제기를 받는 경우 해당 회원은 자신의 책임과 비용으로 회사를 면책하여야 합니다.

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
								<th colspan="3"><button type="button" id="enroll-btn" class="alert-toggle green-btn" disabled>회원 가입</button></th>
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
								<th colspan="3"><button class="green-btn" id="newpwd-btn" disabled>비밀번호 재설정</button></th>
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
     				<td><input type="password" class="rqpwd-input" id="rqpwd"></td>
     				<td><button type="button" class="subpwd-btn chg-inf-modal" id="rq-btn">확인</button></td>.
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
                        	<td><input type="text" class="inputbox cge-nick" placeholder="유저닉네임"></td>
                        	<td class="td3-wid"><button type="button" class="ncheck-btn ">중복확인</button></td>
                        </tr>
                        <tr class="under-text">
                        	<td></td>
                        	<td><span class="cgenick-txt">영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능</span></td>
                        	<td></td>
                        </tr>
                        <tr></tr><tr></tr><tr></tr><tr></tr>
                        <tr>
                        	<th class="th1-wid">- 비밀번호 변경</th>
                        	<td><input type="password" class="inputbox cge-pwd" placeholder="비밀번호"></td>
                        	<td></td>
                        </tr>
                        <tr>
							<th class="th1-wid"></th>
                        	<td><input type="password" class="inputbox cge-chkpwd" placeholder="비밀번호 확인"></td>
                        	<td></td>
                        </tr>
						<tr class="under-text">
							<td></td>
							<td><span class="cgepwd-txt">영문, 숫자, 특수기호 포함 8~16자 입력 가능</span></td>
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
                        		<textarea class="scroll-fix self-info" name="selfInfo" cols="53" rows="6" style="resize:none;" placeholder="자기소개 작성란"></textarea>
                        	</td>
                        	<td></td>
                        </tr>
						<tr class="under-text">
							<td></td>
							<td><span class="self-txt">100자 이내로 작성해 주세요.</span></td>
							<td></td>
						</tr>
                        <tr>
							<td></td>
                        	<th><button id="cge-btn" class="green-btn">정보수정</button></th>
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
 <!--유효성 script -->
 <script src="../resource/js/validation.js"></script>
 <!--alert script -->
 <script src="../resource/js/alert.js"></script>
 <!-- 메인 script(modal) -->
 <script src="../resource/js/main.js"></script>
 <!--kakao-->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
 <!-- API script --> 
 <script src="../resource/js/mainAPI.js"></script> 
	
	
	
</body>
</html>