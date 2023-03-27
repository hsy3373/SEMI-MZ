<%@page import="mz.member.model.vo.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% Member m = (Member)request.getAttribute("m"); %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="../resource/css/common.css">
<link rel="stylesheet" href="../resource/css/userInfo.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8">
		sessionStorage.setItem("contextpath", "${pageContext.request.contextPath}");
</script>
<title>Insert title here</title>
</head>
<body>
	<!-- 유저 정보창 - 가영 -->
	<div class="info-wrap">
		<div class="modal hidden">
			<div class="user-info">
				<img id="info-view" alt="유저정보창" src="../resource/img/icon/정보창폰트x.png">
			</div>
			<div class="nickname">${m.get}</div> <!-- 유저 닉네임 -->
			<div class="heart">
				<img id="heart-off" alt="호강도 상태" src="../resource/img/icon/빈하트.png"> 
			</div>
			<div class="heart-int">50</div> <!-- 호감도 갯수 -->
			<div class="user-skin"> <!-- 유저 캐릭터 -->
				<img id="skin" src="../resource/img/user/skin19/fs.png" alt="">
			</div>
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
	</div>
	<div class="user1">유저캐릭터</button>
	<div class="test"></div>
	<script src="../resource/js/userInfo.js"></script>
	<script type="module" src="../resource/js/common.js"></script>
</body>
</html>