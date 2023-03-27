<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />

    <!-- 링크 본인 jsp 페이지에 달아줄것 -->
    <link rel="stylesheet" href="../resource/css/alert.css" />

    <title>Insert title here</title>
  </head>
  <body>
    <!-- 
		alert창 실행시키기위한 외부 버튼
		
		★본인 고유 id 값 지정 필수★ => 스크립트 실행시 필요

		class 중 board-delete-btn => 버튼 색상 지정
		(- 색상 변경시 alert.css파일 '삭제(지의 방명록)'이라고 주석달아논 곳 참고해서 클래스 추가)
		(- class 중 alert-toggle button 은 삭제 x)
	-->
    <button class="alert-toggle button board-update-btn" id="test1">
      수정
    </button>
    <button class="alert-toggle button board-delete-btn" id="test2">
      삭제
    </button>

    <!-- =========================================================================== -->

    <!-- alert 창 -->
    <!-- 
		저는 이 alert창이랑 스크립트태그랑 묶어서 제 jsp 페이지 하단에 박아놨어요!
	 -->
    <div class="alert">
      <h3 id="alert-text"></h3>
      <div>
        <button class="button alert-ok" id="alert-ok">확인</button>
        <button class="button alert-cancel">취소</button>
      </div>
    </div>
    <div class="alert-overlay"></div>
    <!-- alert 창 실행시 뒷배경 오버레이 태그 -->

    <!-- alert script 경로 -->
    <script type="module" src="../resource/js/alert.js"></script>
  </body>
</html>
