<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="../resource/css/common.css">
<link rel="stylesheet" href="../resource/css/userInfo.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<!-- 가영 -->
	<!-- 유저 정보창 -->
	<div class="info-wrap">
		<div class="modal hidden">
			<div class="user-info">
				<img id="info-view" alt="유저정보창" src="../resource/img/icon/정보창폰트x.png">
			</div>
			<!-- 유저 닉네임 -->
			<div class="nickname"></div>
			<!-- 호감도 -->
			<div class="heart">
				<img id="heart-off" alt="호강도 상태" src="../resource/img/icon/빈하트.png"> 
			</div>
			<div class="heart-int"></div> <!-- 호감도 갯수 -->
			<!-- 유저 캐릭터 -->
			<div class="user-skin">
				<img id="skin">
			</div>
			<!-- 유저 성별 -->
			<div class="user-gender"> 
				<img id="gender-m">
				<img id="gender-w">
				<img id="gender-n">
			</div>
			<!-- 자기소개 -->
			<div class="introduce"></div> 
			<!-- 하단 버튼들 -->
			<div class="btns1">
				<button class="plus" type="button">친구추가</button>
				<input type="hidden" class="delete" value="친구삭제">
				<button class="friend-home" type="button">놀러가기</button> <br>
			</div>
			<div class="btns2">
				<button class="chatting" type="button">1:1 채팅</button>
				<button class="info-report-btn" type="button">신고하기</button>
			</div>
			<div class="x-btn">
				<img id="x-btn" alt="닫기 버튼" src="../resource/img/icon/엑스 버튼.png">
			</div>
		</div>
	</div>
	<button class="user1" >유저캐릭터</button>
	<script type="module" src="../resource/js/userInfo.js"></script>
	<script type="module" src="../resource/js/common.js"></script>
</body>
</html>