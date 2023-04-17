<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import="mz.member.model.vo.Member"%>
<%
	String path = request.getContextPath();
	Member test = (Member) session.getAttribute("loginUser");
	int userCount = (int) request.getAttribute("userCount");
	int skinCount = (int) request.getAttribute("skinCount");
	int noticeCount = (int) request.getAttribute("noticeCount");
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>M-Zone</title>
    <link rel="stylesheet" href="<%= path %>/resource/css/admin/admin-main.css" />
  </head>
  <body>
    <div class="wrapper">
    	<%@ include file="/views/admin/sideBar.jsp"%>

      <div class="content">
        <div class="card-wrap card1">
          <div class="card">
            <div class="card-left">사용자</div>
            <div class="divide"></div>
            <div class="card-right"><%= userCount %></div>
          </div>
        </div>

        <div class="card-wrap card2">
          <div class="card">
            <div class="card-left">공지사항</div>
            <div class="divide"></div>
            <div class="card-right"><%= noticeCount %></div>
          </div>
        </div>

        <div class="card-wrap card3">
          <div class="card">
            <div class="card-left">캐릭터</div>
            <div class="divide"></div>
            <div class="card-right"><%= skinCount %></div>
          </div>
        </div>
      </div>
    </div>

    <script type="module" src="<%= path %>/resource/js/admin/dashboard.js"></script>
  </body>
</html>
