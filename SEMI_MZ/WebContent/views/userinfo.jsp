<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="../resource/css/common.css">
<link rel="stylesheet" href="../resource/css/userinfo.css">
<title>Insert title here</title>
</head>
<body>
	
	<div class="user-info">
		<img alt="유저정보창" class="user-info-view" src="../resource/img/icon/정보창.png">
		<div class="nickname">박가</div>
		<div class="heart">
			<input type="checkbox" name="heart-ck" id="heart">
            <label for="heart">25</label>
		</div>
		<div class="heart-int"></div>
		<div class="user"></div>
		<div class="gender"></div>
		<div class="introduce"></div>
		<button class="plus" type="submit">
			<img alt="친구추가 버튼" src="../resource/img/icon/친구추가.png/">
		</button>
	</div>
	<script src="../resource/js/common.js"></script>
</body>
</html>