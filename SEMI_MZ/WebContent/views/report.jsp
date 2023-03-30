<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="<%= request.getContextPath() %>"/>
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
	<!-- 신고하기창 -->
	<div class="report-wrap">
		<div class="report-modal hidden">
		    <img id="report-view" src="../resource/img/icon/신고하기창.png" alt="">
		    <img id="report-bgview" src="../resource/img/icon/기본버튼2.png" alt="">
		    <form action="${contextPath}/report" id="report-form" method="post">
		    <input type="hidden" name="userId" value="${loginUser.userId}">
			<div class="report-nickname">신고 대상 닉네임</div>
			<div class="user-nickname"></div>
			<div class="report-title">제목</div>
			<input type="text" class="title-box" maxlength='20' required>
			<div class="report-content">신고 내용 작성</div>
			<div class="text-count">0</div>
			<div class="text-total">/ 300</div>
			<textarea name="report-content-text" id="report-content-text" maxlength='300' required></textarea>
			<button type="button" class="report-btn">신고하기</button>
			<button type="reset" class="reset-btn">취소</button>
		    </form>
		</div>
    </div>
    <script type="module" src="../resource/js/userInfo.js"></script>
	<script type="module" src="../resource/js/common.js"></script>
</body>
</html>