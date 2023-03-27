<%@page import="mz.member.model.vo.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="../resource/css/common.css">
<link rel="stylesheet" href="../resource/css/userInfo.css">
<title>Insert title here</title>
</head>
<body>
	<!-- 유저 정보창 - 가영 -->
	<div class="user-info hidden">
		<div class="user-info-view">
			<img alt="유저정보창" src="../resource/img/icon/정보창폰트x.png">
		</div>
		<div class="nickname">박가영입니다람쥐</div> <!-- 유저 닉네임 -->
		<div class="heart">
			<img class="heart-off" alt="호강도 상태" src="../resource/img/icon/빈하트.png"> 
		</div>
		<div class="heart-int">50</div> <!-- 호감도 갯수 -->
		<div class="user"><img src="../resource/img/user/skin19/fs.png" alt=""></div> <!-- 유저 캐릭터 -->
		<div class="gender"> <!-- 성별 -->
			<img alt="" src="../resource/img/icon/여자.png">
		</div>
		<div class="introduce"></div> <!-- 자기소개 -->
		<!-- 하단 버튼들 -->
		<div class="btns1">
			<button class="plus" type="button">친구추가</button>
			<input type="hidden" class="delete" value="친구삭제">
			<button class="friend-home" type="button">놀러가기</button> <br>
		</div>
		<div class="btns2">
			<button class="chatting" type="button">1:1 채팅</button>
			<button class="report" type="button">신고하기</button>
		</div>
		<div class="x-btn">
			<img alt="닫기 버튼" src="../resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	<button class="user1">유저캐릭터</button>
	<!-- <script src="../resource/js/userInfo.js"></script> -->
	<script type="module" src="../resource/js/common.js"></script>
</body>
</html>