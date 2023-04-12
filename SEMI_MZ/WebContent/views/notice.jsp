<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="<%= contextPath %>/resource/css/common.css">
<link rel="stylesheet" href="<%= contextPath %>/resource/css/notice.css">
<title>Insert title here</title>
</head>
<body>
	<!-- 공지사항 게시판 - 가영 -->
	<div class="notice-modal">
		<div class="notice-view">
			<img id="notice-view" src="<%= contextPath %>/resource/img/icon/공지사항.png" alt="공지사항 게시판">
		</div>
		<div class="notice-name">공지사항</div>
		<div class="ranking">
			<div class="ranking1">
				<img class="rh-on" src="<%= contextPath %>/resource/img/icon/하트.png" alt="호감도 아이콘">
				<!-- <img id="heart-off" alt="호강도 상태" src="../resource/img/icon/빈하트.png">
				<img id="heart-on" alt="호강도 상태" src="../resource/img/icon/하트.png"> -->
				<div class="rh-int"></div>
				<img class="ranking-user" src="">
				<div class="ranking-nickname"></div>
			</div>
			<div class="ranking2">
				<img class="rh-on" src="<%= contextPath %>/resource/img/icon/하트.png" alt="호감도 아이콘">
				<div class="rh-int"></div>
				<img class="ranking-user" src="">
				<div class="ranking-nickname"></div>
			</div>
			<div class="ranking3">
				<img class="rh-on" src="<%= contextPath %>/resource/img/icon/하트.png" alt="호감도 아이콘">
				<div class="rh-int"></div>
				<img class="ranking-user" src="">
				<div class="ranking-nickname"></div>
			</div>
		</div>
		<div class="notice-list">
			<!-- <div class="list-post">
				<div class="notice-title">첫번재 공지사항 입니다.</div>
			</div> -->
		</div>
		<div class="notice-x-btn">
			<img id="notice-x-btn" alt="닫기 버튼" src="<%= contextPath %>/resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	<!-- 공지사항 게시판 상세보기 -->
	<div class="notice-detail-modal">
		<div class="detail-view">
			<img id="detail-view" src="<%= contextPath %>/resource/img/icon/상세보기.png" alt="">
		</div>
		<div class="notice-detail-name">공지사항</div>
		<ul class="notice-detail-list">
<!-- 				<li id="detail-list">공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li> -->
		</ul>
		<!-- 페이징바 자리 -->
		<div class="notice-pageing-area">
			<ul id="notice-pagingul"></ul>
		</div>
		<div class="notice-date"></div>
		<div class="notice-detail-title"></div>
		<div class="notice-content"></div>
		<div class="notice-detail-x-btn">
			<img id="notice-detail-x-btn" alt="닫기 버튼" src="<%= contextPath %>/resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	
	<script>
		var loginUserId = '${loginUser.userId}';
	</script>
	
	<script type="module" src="<%= contextPath %>/resource/js/notice.js"></script>
	<script type="module" src="<%= contextPath %>/resource/js/common.js"></script>
	<script type="module" src="<%= contextPath %>/resource/js/userInfo.js"></script>
</body>
</html>