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
	<!-- 유저 정보창 - 가영 -->
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
				<button class="report" type="button">신고하기</button>
			</div>
			<div class="x-btn">
				<img alt="닫기 버튼" src="../resource/img/icon/엑스 버튼.png">
			</div>
		</div>
		<!-- 신고하기창 -->
		<div class="report-wrap">
			<div class="report-modal hidden">
		        <img id="report-view" src="../resource/img/icon/신고하기창.png" alt="">
		        <img id="report-bgview" src="../resource/img/icon/기본버튼2.png" alt="">
		        <div class="report-nickname">신고 대상 닉네임</div>
		        <div class="user-nickname">박가영입니다람쥐</div>
		        <div class="report-content">신고 내용 작성</div>
		        <textarea name="report-content-text" id="report-content-text" cols="30" rows="10"></textarea>
		        <button type="submit" class="report-btn">신고하기</button>
		        <button type="reset" class="reset-btn">취소</button>
			</div>
    	</div>
	</div>
	<button class="user1" onclick="getUserInfo()">유저캐릭터</button>
	<script type="module" src="../resource/js/userInfo.js"></script>
	<script type="module" src="../resource/js/common.js"></script>
</body>
</html>