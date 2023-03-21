<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="mz.member.model.vo.Member"%>
<% 
	/* 테스트용 유저 객체 */
	Member m = new Member( "test",  "test",  "NIC_test",  "Y",  0, 500 , "", "N", java.sql.Date.valueOf("2023-03-20"));
	session.setAttribute("loginUser", m);
	Member test = (Member)session.getAttribute("loginUser");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Insert title here</title>
</head>
<body>

	<%@ include file="views/myroom.jsp" %>>

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