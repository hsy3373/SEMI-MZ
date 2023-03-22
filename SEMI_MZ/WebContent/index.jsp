<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Insert title here</title>
<link href="./resource/css/common.css" rel="stylesheet" type="text/css">
<style>
	.index-logo{
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: center;
		margin-top: 10vh;
	}

</style>

</head>
<body>
	<div class="index-logo">
		<img src="./resource/img/icon/logo.png" >
	</div>
	<script>
		window.onload = function (event) {
			let navType = performance.getEntriesByType('navigation')[0].type;
			// 인덱스 화면 진입시 접속방법이 새로고침/뒤로가기가 아니라면 화면 사이즈 고정된 새창으로 test.jsp 화면 팝업
			if(navType != 'reload' && navType != 'back_forward'){
				location.replace("<%= request.getContextPath()%>");
				popupWindow = window.open("<%= request.getContextPath()%>/views/test.jsp", "windowName", "resizeable");
			}
		}
	</script>
</body>
</html>