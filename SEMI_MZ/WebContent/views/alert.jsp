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
		alert.css파일 '삭제(지의 방명록)'이라고 주석달아논 곳 참고해서 클래스 추가
		(현재 board-delete-btn는 css 색상변경만 된것 / css파일 참고면 됩니다)
	-->
	<!-- alert창 실행시키기위한 외부 버튼
		(각자 위치에 추가하고 텍스트(삭제) 및 (class="board-delete-btn")변경하면됨)
		id 값 => 스크립트 실행시 필요
	-->
		<button class="alert-toggle board-delete-btn button" id="test2">삭제</button>
		<button class="alert-toggle board-delete-btn2 button" id="test1">수정</button>






	<!-- ===========================================  =========================================== -->
	<!-- alert 창 -->
	<!-- 
		저는 이 alert창 아래 스크립트태그랑 묶어서 제 jsp 페이지 하단에 박아놨어요!
		따로 빼실거면 위에 링크 걸면 됩니당
	 -->
	 <div class="alert">
		<h3 id="alert-text"></h3>
		<div>
			<button class="button alert-ok" id="alert-ok">확인</button>
			<button class="button alert-cancel">취소</button> 
		</div>
	</div>
	<div class="alert-overlay"></div>

	<!-- alert script 경로 -->
	<!-- 이 태그가  head에 위치해있으니까 안먹어서 저는 제 jsp 페이지 맨 하단에 뒀습니다 -->
    <script type="module" src="../resource/js/alert.js"></script>
</body>
</html>