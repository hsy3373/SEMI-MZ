<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link rel="stylesheet" href="../../resource/css/admin/admin-common.css" />
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
            <a href="./main.jsp"><i class="bi bi-speedometer2"></i>Dashboard</a>
          </li>

          <hr />

          <li>
            <a href="">
              <i class="bi bi-key-fill"></i>
              Admin</a
            >
          </li>

          <li>
            <a href="./character.jsp" class="selected">
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
            <a href=""> <i class="bi bi-clipboard-fill"></i> 공지사항</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <div>
          <table></table>
        </div>
      </div>
    </div>
  </body>
</html>
