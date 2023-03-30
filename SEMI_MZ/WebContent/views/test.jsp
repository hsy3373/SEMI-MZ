<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="mz.member.model.vo.Member"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	/* 테스트용 유저 객체 */
	Member m = new Member("test", "test", "NIC_test", "Y", 0, 500, "", "N", java.sql.Date.valueOf("2023-03-20"));
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
    <%-- test용 페이지 <br />
    현재 테스트용 유저아이디 : <%= test.getUserId() %> <br />
    현재 테스트용 유저 정보 : <%= test.toString() %> <br />
    <br /> --%>

    <a href="./changeUser.jsp">유저 체인지 -> friend</a> <br />

    <a href="./myroom.jsp">마이룸</a> <br />
    <br />
    <a href="./chatting.jsp">채팅</a>
    <br />
    <br />
    <a href="./square.jsp">광장</a>
    <br />
    <a href="./admin/main.jsp">관리자페이지</a>
    <br />
    <a href="./main.jsp">메인/로그인</a>
    <br />
    <a href="./userInfo.jsp">유저정보창</a>

    <br />
    <button id="btn1">관리자로 바꾸기</button>

    <script type="module" src="../resource/js/common.js"></script>
    <script>
      $(function () {
        $("#btn1").click(function () {
          $.ajax({
            url: "<%=path%>/friendtest",
            type: "get",
            success: function () {
              console.log("성공");
              location.reload();
            },
            error: function () {
              console.log("ajax통신 실패");
            },
          });
        });
      });
    </script>
  </body>

  <script type="text/javascript">
    sessionStorage.setItem("loginUser", JSON.stringify("test"));
    document.cookie =
      "loginUser=" + encodeURIComponent("test") + "; path=/mzone";
  </script>
</html>
