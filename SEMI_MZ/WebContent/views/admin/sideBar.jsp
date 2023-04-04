<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>admin</title>
  
  </head>
  <body>
    <div class="side-bar">
      <ul class="side-bar-ul">
        <a href="<%=path %>/main.admin" class="logo-img">
          <img src="<%= path %>/resource/img/icon/logo.png" />
        </a>

        <hr />
        <li>
          <a href="<%=path %>/main.admin" class="selected"
            ><i class="bi bi-speedometer2"></i>Dashboard</a
          >
        </li>

        <hr />

        <li>
          <a href="<%=path %>/insert.char">
            <i class="bi bi-key-fill"></i>
            Admin</a
          >
        </li>

        <li>
          <a href="<%=path %>/list.skin">
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
  </body>
</html>
