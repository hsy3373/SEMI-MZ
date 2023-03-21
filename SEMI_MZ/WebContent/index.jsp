<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Insert title here</title>
</head>
<body>
	<script>
		// 인덱스 화면 진입시 화면 사이즈 고정된 새창으로 test.jsp 화면 열리며 기존 창은 히스토리 남기지 않고 naver로 이동
		location.replace("<%= request.getContextPath()%>");
		popupWindow = window.open("<%= request.getContextPath()%>/views/test.jsp", "windowName", "resizeable");
		popupWindow.resizeTo(1300, 800);
		popupWindow.onresize = (_=>{
		    popupWindow.resizeTo(1300,800);
		});
		location.replace("https://www.naver.com/");
	</script>

</body>
</html>