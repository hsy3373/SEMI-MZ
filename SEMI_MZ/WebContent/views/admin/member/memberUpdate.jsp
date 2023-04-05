<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="../../../resource/css/admin/admin-member.css" />
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
</head>
<body>

	<div class="wrapper">
		<%@ include file="/views/admin/sideBar.jsp"%>
		<div class="content">
			<div class="head-text">일반 계정</div>
			<div class="inner-wrap"></div>
		</div>
	</div>

</body>
</html>