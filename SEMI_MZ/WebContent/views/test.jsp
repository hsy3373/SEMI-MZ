<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import="mz.member.model.vo.Member"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	/* 테스트용 유저 객체 */ 
	Member m = new Member("test", "test", "NIC_test", "Y", 0, 500, "", "N",
							java.sql.Date.valueOf("2023-03-20"));
	session.setAttribute("loginUser", m);
	session.setAttribute("testing", "testingtesting");
	Member test = (Member) session.getAttribute("loginUser");
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>M-Zone</title>
    <link href="../resource/css/common.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    test용 페이지 <br />
    현재 테스트용 유저아이디 : <%= test.getUserId() %> <br />
    현재 테스트용 유저 정보 : <%= test.toString() %> <br />
    <br />
    

    <a href="./myroom.jsp">마이룸</a> <br />
    <br />
    <a href="./chatting.jsp">채팅</a>
    <br />
    <br />
    <a href="./square.jsp">광장</a>

    <script type="module" src="../resource/js/common.js"></script>
  </body>
</html>
