<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	Notice 
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="<%=path%>/resource/css/admin/admin-common.css" />
<link rel="stylesheet"
	href="<%=path%>/resource/css/admin/admin-notice.css" />
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
</head>
<body>
	<div class="wrapper">
		<%@ include file="/views/admin/sideBar.jsp"%>
		<div class="content">
			<div class="head-text">캐릭터 스킨</div>
			<div class="inner-wrap">

				<table class="list-area" align="center">
					<thead>
						<tr>
							<th id="">#</th>
							<th >제목</th>
							<th >작성일</th>
						</tr>

					</thead>
					<tbody>
						<%
							if (list.isEmpty()) {
						%>
						<tr>
							<td colspan="6">조회된 리스트가 없습니다</td>
						</tr>
						<%
							} else {
						%>
						<%
							for (Board b : list) {
						%>
						<tr onclick="moveBoard(<%=b.getBoardNo()%>)">
							<td><%=b.getBoardNo()%></td>
							<td><%=b.getCategory()%></td>
							<td><%=b.getBoardTitle()%></td>
							<td><%=b.getBoardWriter()%></td>
							<td><%=b.getCount()%></td>
							<td><%=b.getCreateDate()%></td>
						</tr>
						<%
							}
						%>
						<%
							}
						%>
					</tbody>
				</table>


			</div>
		</div>
	</div>
</body>
</html>