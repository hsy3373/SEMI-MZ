<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

    <!-- 링크 본인 jsp 페이지에 달면 됩니다! -->
    <link rel="stylesheet" href="../resource/css/alert.css">
    
<title>Insert title here</title>
</head>
<body>

	<!-- 
		삭제 버튼(각자 추가해야하는 위치에 추가하면 됨)
		alert-toggle button 은 삭제 x
		다른버튼으로 변경이나 색상싶으면 클래스명부여 하면됨
		alert.css파일 '삭제 버튼'이라고 주석달아논 곳도 변경해줘야 됨
		(현재 board-delete-btn는 css 색상변경만 된것 / css파일 참고면 됩니다)
	-->
	<!-- alert창 실행시키기위한 외부 버튼
		(각자 추가해야하는 위치에 추가하고 텍스트(삭제) 및 (class="board-delete-btn")변경하면됨) -->
	<button class="alert-toggle button" id="board-delete-btn">삭제</button>


	<!-- alert 창 -->
	<!-- 
		저는 이 alert창 아래 스크립트태그랑 묶어서 제 jsp 페이지 하단에 박아놨어요!
		따로 빼실거면 위에 링크 걸면 됩니당
	 -->
	 <div class="alert">
		<h3>삭제하시겠습니까?</h3>
		<div>
			<!-- ★★★★★★★★★ id 값 겹치면 x -> 변경 필수!!!!!!!★★★★★★★★★ -->
			<button class="button alert-ok" id="alert-ok">확인</button>
			<button class="button alert-cancel">취소</button> 
		</div>
	  </div>
	  <div class="alert-overlay"></div>

	<!-- alert script 경로 -->
	<!-- 이 태그가  head에 위치해있으니까 안먹어서 저는 제 jsp 페이지 맨 하단에 뒀습니다 -->
    <script src="../resource/js/alert.js"></script>
</body>
</html>