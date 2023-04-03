<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="<%=request.getContextPath()%>" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
<link rel="stylesheet" href="../resource/css/common.css">
<link rel="stylesheet" href="../resource/css/userInfo.css">
<link rel="stylesheet" href="../resource/css/alert.css" />
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<!-- 가영 -->
	<!------- 유저 정보창 ------->
	<div class="info-modal hidden">
		<div class="user-info">
			<img id="info-view" alt="유저정보창" src="../resource/img/icon/정보창폰트x.png">
		</div>
		<!-- 유저 닉네임 -->
		<div class="nickname"></div>
		<!-- 호감도 -->
		<div class="heart">
			<img id="heart-off" alt="호강도 상태" src="../resource/img/icon/빈하트.png">
			<img id="heart-on" alt="호강도 상태" src="../resource/img/icon/하트.png">
		</div>
		<!-- 호감도 갯수 -->
		<div class="heart-int"></div>
		<!-- 유저 캐릭터 -->
		<div class="user-skin">
			<img id="skin">
		</div>
		<!-- 유저 성별 -->
		<div class="user-gender">
			<img id="gender-m"> <img id="gender-w"> <img
				id="gender-n">
		</div>
		<!-- 자기소개 -->
		<div class="introduce"></div>
		<!-- 하단 버튼들 -->
		<div class="btns1">
			<button class="plus" type="button">친구추가</button>
			<input type="hidden" class="delete" value="친구삭제">
			<button class="friend-home" type="button">놀러가기</button>
		</div>
		<div class="btns2">
			<button class="chatting" type="button">1:1 채팅</button>
			<button class="info-report-btn" type="button">신고하기</button>
		</div>
		<div class="x-btn">
			<img id="x-btn" alt="닫기 버튼" src="../resource/img/icon/엑스 버튼.png">
		</div>
	</div>
	<!------- 신고하기창 ------->
	<div class="report-modal hidden">
		<div class="user-report">
			<img id="report-view" src="../resource/img/icon/신고하기창.png" alt="">
			<img id="report-bgview" src="../resource/img/icon/기본버튼2.png" alt="">
		</div>
			<input type="hidden" name="userId" value="${loginUser.userId}">
			<div class="report-nickname">신고 대상 닉네임</div>
			<div class="user-nickname"></div>
			<div class="report-title">제목</div>
			<input type="text" class="title-box" maxlength='20' required>
			<div class="report-content">신고 내용 작성</div>
			<div class="text-count">0</div>
			<div class="text-total">/ 300</div>
			<textarea name="content-text" id="content-text"
				maxlength='300' required></textarea>
			<button type="button" class="report-btn">신고하기</button>
			<button type="reset" class="reset-btn">취소</button>
	</div>
	<div class="alert">
		<h3 id="alert-text"></h3>
		<div>
			<button class="button alert-ok" id="report-ok">신고</button>
			<button class="button alert-cancel">취소</button>
		</div>
	</div>
	<div class="alert-overlay"></div>
	
	<div class="user1">유저 캐릭터</div>

	<script type="module" src="../resource/js/userInfo.js"></script>
	<script type="module" src="../resource/js/common.js"></script>
	<!--<script type="module" src="../resource/js/alert.js"></script>-->
	<script>

	
	/* var target = $('.heart');
	
		$(function(){
			getHeartInfo();
		}); */
	
		/* //클릭 했을때 좋아요 db에 인설트!
		function goheart(){
			$.ajax({
				url:"/mzone/heart",
				type:"get",
				data : {userId : 'friend'},
				success: function(){
					$('#heartOff').css('display', 'none');
					$('#heartOn').css('display', 'block');
				},
				error: function(){ alert('error')}
			});
		} */
		
		/* function getHeartInfo(){
			$.ajax({
				url:"/mzone/heart2",
				type:"post",
				data : {userId : 'friend'},
				success: resultHeart,
				error: function(){ alert('error')}
			});
		}
		
		function resultHeart(data){
			console.log(data);
			if(data == 1){
				$('#heartOff').css('display', 'none');
				$('#heartOn').css('display', 'block');
			}
			
		} */
		
		
		/* function goDelete(){
			$.ajax({
				url:"/mzone/heartDelete",
				type:"get",
				data : {userId : 'friend'},
				success: function(){
					$('#heartOff').css('display', 'block');
					$('#heartOn').css('display', 'none');
				},
				error: function(){ alert('error')}
			});
		} */
		
		
		
		
		
		
		
		
		
		
	</script>
</body>
</html>