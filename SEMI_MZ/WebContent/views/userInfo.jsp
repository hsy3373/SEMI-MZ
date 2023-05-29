<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="<%= contextPath %>/resource/css/common.css">
<link rel="stylesheet" href="<%= contextPath %>/resource/css/userInfo.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<!-- 가영 -->
	<!------- 다른 유저 정보창 ------->
	<div class="info-modal hidden">
		<div class="user-info">
			<img id="info-view" alt="유저정보창" src="<%= contextPath %>/resource/img/icon/정보창폰트x.png">
		</div>
		<!-- 유저 닉네임 -->
		<div class="info-nickname"></div>
		<!-- 호감도 -->
		<div class="info-heart">
			<img id="heart-off" alt="호강도 상태" src="<%= contextPath %>/resource/img/icon/빈하트.png">
			<img id="heart-on" alt="호강도 상태" src="<%= contextPath %>/resource/img/icon/하트.png">
			<!-- <div id="user-heart"></div> -->
		</div>
		<!-- 호감도 갯수 -->
		<div class="heart-int"></div>
		<!-- 유저 캐릭터 -->
		<div class="info-skin">
			<img id="info-skin">
		</div>
		<!-- 유저 성별 -->
		<div class="info-gender">
			<img id="gender-w">
			<img id="gender-m">
			<img id="gender-n">
		</div>
		<!-- 자기소개 -->
		<div class="info-introduce"></div>
		<!-- 하단 버튼들 -->
		<div class="btns1">
			<button class="plus alert-toggle" type="button">친구추가</button>
			<button class="delete alert-toggle" type="button">친구삭제</button>
			<button class="friend-home" type="button">놀러가기</button>
		</div>
		<div class="btns2">
			<button class="info-chatting" type="button">1:1 채팅</button>
			<button class="info-report-btn" type="button">신고하기</button>
		</div>
		<div class="info-x-btn">
			<img id="info-x-btn" alt="닫기 버튼" src="<%= contextPath %>/resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	<div class="info-modal-overlay"></div>
	<!-- 내 정보창 -->
	<div class="my-info-modal hidden">
		<div class="my-info">
			<img id="my-info-view" alt="유저정보창" src="<%= contextPath %>/resource/img/icon/정보창.png">
		</div>
		<!-- 내 닉네임 -->
		<div class="my-info-nickname"></div>
		<!-- 호감도 -->
		<div class="my-info-heart">
			<img id="my-info-heart-on" alt="호강도 상태" src="<%= contextPath %>/resource/img/icon/하트.png">
			<img id="my-info-heart-off" alt="호강도 상태" src="<%= contextPath %>/resource/img/icon/빈하트.png">
			<!-- <div id="user-heart"></div> -->
		</div>
		<!-- 내 호감도 갯수 -->
		<div class="my-heart-int"></div>
		<!-- 내 캐릭터 -->
		<div class="my-info-skin">
			<img id="my-info-skin">
		</div>
		<!-- 내 성별 -->
		<div class="my-info-gender">
			<img id="my-gender-w">
			<img id="my-gender-m">
			<img id="my-gender-n">
		</div>
		<div class="info-my-room">
			<img id="info-my-room" src="<%= contextPath %>/resource/img/icon/home_btn.png">
		</div>
		<!-- 자기소개 -->
		<div class="my-info-introduce"></div>
		<!-- 정보창 닫는 버튼 -->
		<div class="my-info-x-btn">
			<img id="my-info-x-btn" alt="닫기 버튼" src="<%= contextPath %>/resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	<!------- 신고하기창 ------->
	<div class="report-modal hidden">
		<div class="user-report">
			<img id="report-view" src="<%= contextPath %>/resource/img/icon/신고하기창.png" alt="">
			<img id="report-bgview" src="<%= contextPath %>/resource/img/icon/기본버튼2.png" alt="">
		</div>
			<%-- <input type="hidden" name="userId" value="${loginUser.userId}"> --%>
			<div class="report-nickname">신고 대상 닉네임</div>
			<div class="report-user"></div>
			<div class="report-title">제목</div>
			<input type="text" class="report-title-box" maxlength='20' required>
			<div class="report-content">신고 내용 작성</div>
			<div class="content-text-count">0</div>
			<div class="content-text-total">/ 300</div>
			<textarea name="report-content-text" id="report-content-text"
				maxlength='300' required></textarea>
			<div class="report-precautions">해당 신고자와 어떤 일이 있었는지 자세히 설명해 주세요.
				</br>
				허위 신고는 강력한 제재 사항입니다.
			</div>
			<button type="button" class="report-btn alert-toggle">신고하기</button>
			<button type="reset" class="reset-btn">취소</button>
	</div>
	<div class="report-modal-overlay"></div>
	
	<script type="module" src="<%= contextPath %>/resource/js/userInfo.js"></script>
	<script type="module" src="<%= contextPath %>/resource/js/common.js"></script>
	<script type="module" src="<%= contextPath %>/resource/js/alert.js"></script>
	<script type="module" src="<%= contextPath %>/resource/js/homeAlert.js"></script>
	
</body>
</html>