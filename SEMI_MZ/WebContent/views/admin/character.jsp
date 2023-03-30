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
        
	<div class="outer">
		<br> <h2 style="text-align:center;">사진게시판 작성하기</h2> <br>
		
		<form action="<%= contextPath%>/update.th" id="enroll-form" method="post" enctype="multipart/form-data">
		
		<table align="center">
			<tr>
				<th width="120">제목</th>
				<td colspan="3">
					<input type="text" name="title" value="<%= b.getBoardTitle()%>" required>
				</td>
			</tr>
			<tr>
				<th >내용</th>
				<td colspan="3">
					<textarea name="content" style="resize:none;" rows="5" required><%= b.getBoardContent() %></textarea>
				</td>
			</tr>
			<tr>
				<th >대표이미지</th> <!--  미리보기 -->
				<td colspan="3" align="center">
					<img id="titleImg" width="250" height="170" src= "<%= contextPath + list.get(0).getFilePath()+list.get(0).getChangeName() %>">
				</td>
			</tr>
			<tr>
				<th >상세이미지</th> <!--  미리보기 -->
				<td colspan="3" >
					<% for(int i =1; i< 4; i++) {%>
						<div class="contentImg">
						<% if(i < list.size() ) { %>
							<img id="contentImg<%=i%>" width="150" height="120" src = "<%= contextPath +list.get(i).getFilePath()+list.get(i).getChangeName() %>"	>
							
						<% } else { %>
							<img id="contentImg<%=i%>" width="150" height="120">
						<% } %>
						<button type="button">사진 삭제</button>
						</div>
					<% } %>
				</td>
			</tr>
		
		</table>
		
		<div id="file-area" style="display:none;">
			<input type="file" id="file1" name="file1" onchange="loadImg(this, 1, list);" required>
			<input type="file" id="file2" name="file2" onchange="loadImg(this, 2, list);" >
			<input type="file" id="file3" name="file3" onchange="loadImg(this, 3, list);" >
			<input type="file" id="file4" name="file4" onchange="loadImg(this, 4, list);" >
		</div>
      </div>
    </div>
  </body>
</html>
