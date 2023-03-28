<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import="mz.member.model.vo.Member"%>
<%
	/* 테스트용 유저객체 */
	Member m = new Member("admin", "admin", "관리자", "Y", 0, 500, "", "N", java.sql.Date.valueOf("2023-03-20"));
	session.setAttribute("loginUser", m);
	Member test = (Member) session.getAttribute("loginUser");
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link rel="stylesheet" href="../../resource/css/admin/admin-main.css" />
    <link rel="stylesheet" href="../../resource/css/admin/admin-common.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <div class="side-bar">
        <ul class="side-bar-ul">
          <a href="./main.jsp" class="logo-img">
            <img src="../../resource/img/icon/logo.png" />
          </a>

          <hr />
          <li>
            <a href="./main.jsp" class="selected"
              ><i class="bi bi-speedometer2"></i>Dashboard</a
            >
          </li>

          <hr />

          <li>
            <a href="">
              <i class="bi bi-key-fill"></i>
              Admin</a
            >
          </li>

          <li>
            <a href="./character.jsp">
              <i class="bi bi-file-person"></i>
              캐릭터</a
            >
          </li>

          <li>
            <a href="">
              <i class="bi bi-people-fill"></i>
              사용자</a
            >
          </li>

          <li>
            <a href=""> <i class="bi bi-clipboard-fill"></i>공지사항</a>
          </li>
        </ul>
      </div>

      <div class="content">
        <div class="card-wrap card1">
          <div class="card">
            <div class="card-left">사용자</div>
            <div class="divide"></div>
            <div class="card-right">0</div>
          </div>
        </div>

        <div class="card-wrap card2">
          <div class="card">
            <div class="card-left">공지사항</div>
            <div class="divide"></div>
            <div class="card-right">0</div>
          </div>
        </div>

        <div class="card-wrap card3">
          <div class="card">
            <div class="card-left">캐릭터</div>
            <div class="divide"></div>
            <div class="card-right">120</div>
          </div>
        </div>
      </div>
    </div>

    <script type="module" src="../../resource/js/admin/dashboard.js"></script>
  </body>
</html>
