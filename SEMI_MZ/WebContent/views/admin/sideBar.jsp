<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>admin</title>
    <link
      rel="stylesheet"
      href="<%=path%>/resource/css/admin/admin-common.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
  </head>
  <body>
    <div class="side-bar">
      <ul class="side-bar-ul">
        <a href="<%=path%>/main.admin" class="logo-img">
          <img src="<%=path%>/resource/img/icon/logo.png" />
        </a>

        <hr />
        <li>
          <a href="<%=path%>/main.admin" class="selected"
            ><i class="bi bi-speedometer2"></i>Dashboard</a
          >
        </li>

        <hr />

        <li>
          <a href="<%=path%>/admin.admin">
            <i class="bi bi-key-fill"></i> Admin
          </a>
        </li>

        <li>
          <a href="<%=path%>/list.skin">
            <i class="bi bi-file-person"></i> 캐릭터
          </a>
        </li>
        <li>
          <div class="member-menu">
            <i class="bi bi-people-fill"></i> 사용자
          </div>
        </li>
        <div class="member-menu-item">
          <a href="<%=path%>/activelist.member">일반 계정</a>
          <a href="<%=path%>/cancelList.member">탈퇴/차단 계정</a>
          <a href="<%=path%>/list.report">신고 관리</a>
        </div>
        <li>
          <a href="<%=path%>/list.notice">
            <i class="bi bi-clipboard-fill"></i>공지사항
          </a>
        </li>
      </ul>
    </div>

    <script type="text/javascript">
    $(".member-menu-item").css("display", "none");
      $(document).ready(function () {
        $(".member-menu").click(function () {
          $(".member-menu-item").slideToggle();
        });
      });
    </script>
  </body>
</html>
