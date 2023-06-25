<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="mz.notice.model.vo.Notice"%>
<%
	String path = request.getContextPath();		
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>M-Zone</title>
<link rel="stylesheet"
	href="<%=path%>/resource/css/admin/admin-notice.css" />
</head>
<body>

<div class="wrapper">
		<%@ include file="/views/admin/sideBar.jsp"%>
		<div class="content">
			<div class="head-text">
				<div class="back">
					<i class="bi bi-arrow-left-square"></i>
				</div>
				공지사항 등록
			</div>

			<div class="inner-wrap">
				<form id="enroll-notice" action="<%=path%>/insert.notice"
					method="post">
					
					<div class= "btn-area">
			            <button id="insert-btn">등록</button>
					</div>

					<table class="item-area">
						<tbody>
							<tr>
								<td>제목</td>
								<td><input type="text" name="title" id="title" maxlength="100"
									></td>
							</tr>
							<tr>
								<td>내용</td>
								<td ><textarea cols="100" maxlength="300" id="content"
										name="content"></textarea></td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
	</div>
	<div id="toast">알림</div>
	
	
<script type="module" src="<%=path%>/resource/js/admin/notice/noticeEnroll.js"></script>
</body>
</html>