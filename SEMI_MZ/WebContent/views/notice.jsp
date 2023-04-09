<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="../resource/css/common.css">
<link rel="stylesheet" href="../resource/css/notice.css">
<title>Insert title here</title>
</head>
<body>
	<!-- 공지사항 게시판 - 가영 -->
	<div class="notice-modal">
		<div class="notice-view">
			<img id="notice-view" src="../resource/img/icon/공지사항.png" alt="공지사항 게시판">
		</div>
		<div class="notice-name">공지사항</div>
		<div class="ranking">
			<div class="ranking1">
				<img id="ranking-heart1 rh-on" src="../resource/img/icon/하트.png" alt="호감도 아이콘">
				<img id="ranking-heart1 rh-off" src="../resource/img/icon/빈하트.png" alt="호감도 아이콘">
				<!-- <img id="heart-off" alt="호강도 상태" src="../resource/img/icon/빈하트.png">
				<img id="heart-on" alt="호강도 상태" src="../resource/img/icon/하트.png"> -->
				<div class="ranking-heart-int1 rh-int"></div>
				<img id="ranking-user1" src="" alt="유저 스킨">
				<div class="ranking-nickname1"></div>
			</div>
			<div class="ranking2">
				<img id="ranking-heart2 rh-on" src="../resource/img/icon/하트.png" alt="호감도 아이콘">
				<img id="ranking-heart2 rh-off" src="../resource/img/icon/빈하트.png" alt="호감도 아이콘">
				<div class="ranking-heart-int2 rh-int"></div>
				<img id="ranking-user2" src="" alt="유저 스킨">
				<div class="ranking-nickname2"></div>
			</div>
			<div class="ranking3">
				<img id="ranking-heart3 rh-on" src="../resource/img/icon/하트.png" alt="호감도 아이콘">
				<img id="ranking-heart3 rh-off" src="../resource/img/icon/빈하트.png" alt="호감도 아이콘">
				<div class="ranking-heart-int3 rh-int"></div>
				<img id="ranking-user3" src="" alt="유저 스킨">
				<div class="ranking-nickname3"></div>
			</div>
		</div>
		<div class="notice-list">
			<!-- <div class="list-post">
				<div class="notice-title">첫번재 공지사항 입니다.</div>
			</div> -->
		</div>
		<div class="notice-x-btn">
			<img id="notice-x-btn" alt="닫기 버튼" src="../resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	<!-- 공지사항 게시판 상세보기 -->
	<div class="notice-detail-modal">
		<div class="detail-view">
			<img id="detail-view" src="../resource/img/icon/상세보기.png" alt="">
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
			<img id="notice-detail-x-btn" alt="닫기 버튼" src="../resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	<script type="module" src="../resource/js/notice.js"></script>
	<script type="module" src="../resource/js/common.js"></script>
</body>
</html>