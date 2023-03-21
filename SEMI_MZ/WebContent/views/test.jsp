<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"  import="mz.member.model.vo.Member"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% 
	/* 테스트용 유저 객체 */
	Member m = new Member( "test",  "test",  "NIC_test",  "Y",  0, 500 , "", "N", java.sql.Date.valueOf("2023-03-20"));
	session.setAttribute("loginUser", m);
	Member test = (Member)session.getAttribute("loginUser");
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<c:set var="contextPath" value="<%= request.getContextPath() %>"/>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%-- 	test용 페이지 <br>
	현재 테스트용 유저아이디 : <%= test.getUserId() %> <br>
	현재 테스트용 유저 정보 : <%= test.toString() %>
	 --%>
	<%@ include file="myroom.jsp" %>
</body>
</html>