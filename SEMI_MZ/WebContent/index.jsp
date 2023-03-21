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

<%@ include file="views/realmain.jsp" %>

</body>
</html>