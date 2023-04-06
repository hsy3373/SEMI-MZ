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
				<img id="ranking-heart" src="../resource/img/icon/하트.png" alt="호감도 아이콘">
				<div class="ranking-heart-int">50</div>
				<img id="ranking-user" src="" alt="유저 스킨">
				<div class="ranking-nickname">박가영입니다_</div>
			</div>
			<div class="ranking2">
				<img id="ranking-heart" src="../resource/img/icon/하트.png" alt="호감도 아이콘">
				<div class="ranking-heart-int">50</div>
				<img id="ranking-user" src="" alt="유저 스킨">
				<div class="ranking-nickname">박가영입니다_</div>
			</div>
			<div class="ranking3">
				<img id="ranking-heart" src="../resource/img/icon/하트.png" alt="호감도 아이콘">
				<div class="ranking-heart-int">50</div>
				<img id="ranking-user" src="" alt="유저 스킨">
				<div class="ranking-nickname">박가영입니다_</div>
			</div>
		</div>
		<!-- <div class="notice-list">
			<div class="list-post">
				<img alt="" class="post-img" src="../resource/img/icon/포스트잇.png">
				<div class="notice-title">첫번재 공지사항 입니다.</div>
			</div>
		</div> -->
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
		<div class="notice-list-item">
			<!-- <div class="notice-no" style="display: none;">
				<ul class="notice-detail-list">
					<li>공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li>
					<li>공지사항1</li>
				</ul>
			</div> -->
		</div>
		<!-- 페이징바 자리 -->
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