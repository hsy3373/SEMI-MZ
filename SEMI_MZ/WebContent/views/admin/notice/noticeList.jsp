<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import = "mz.notice.model.vo.Notice, java.util.ArrayList"%>
<%
	ArrayList<Notice> list = (ArrayList<Notice>) request.getAttribute("list");

	//현재 페이지
	int cPage = (int) request.getAttribute("page");
	
	//총 공지 개수
 	int noticeCount = (int) request.getAttribute("noticeCount");
 	
 	//총 페이지 수 얼마나 나와야 하는지 확인용 총공지수/20(페이지당 표시수)
 	int pageCount = (int) Math.ceil(noticeCount / 20.0);
 	
 	//버튼 숫자 설정 기준용 변수
 	int btnRange = cPage/10;


%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="<%=path%>/resource/css/admin/admin-notice.css" />
</head>
<body>
	<div class="wrapper">
		<%@ include file="/views/admin/sideBar.jsp"%>
		<div class="content">
			<div class="head-text">공지사항</div>
			<div class="inner-wrap">
	          <div class="notice-add-btn">
	            <a href="<%=path %>/insert.notice">공지 등록</a>
	          </div>
				<table class="list-area">
					<thead>
						<tr>
							<th >#</th>
							<th >제목</th>
							<th >작성일</th>
						</tr>
					</thead>
					<tbody>
						<% if (list.isEmpty()) { %>
						<tr>
							<td colspan="3">조회된 리스트가 없습니다</td>
						</tr>
						<% } else { %>
							<% for (int i=0; i< list.size(); i++) { %>
								<tr class="notice-item">
									<td id="<%=list.get(i).getNoticeNo() %>"><%= noticeCount - i - (cPage - 1) * 20%></td>
									<td><%= list.get(i).getTitle()%></td>
									<td><%= list.get(i).getDateExceptTime()%></td>
								</tr>
							<% } %>
						<% } %>
					</tbody>
				</table>

	
	          <div class="paging-bar">
	          	<!-- 현재 페이지가 10보다 클때 이전 버튼 활성화 -->
	  	        <% if( cPage > 10 ) { %>
		            <button type="button" class="able-btn" id="prev-btn">&lt;</button>
	            <% } else { %>
	            	<button type="button" class="disable-btn" id="prev-btn">&lt;</button>
	            <% } %>
	          
	            <% for(int i=btnRange*10 + 1; i<= btnRange*10 + 10; i++) { %>
	            	<% if( i <= pageCount) { %>
	            		<% if(i == cPage) { %>            		
				            <button type="button" class="selected-btn page-btn"><%= i %></button>
	            		<% } else { %>
		            		<button type="button" class="page-btn"><%= i %></button>
	            		<% } %>
	            	<% } else {%>
	            		<button type="button" class="disable-btn page-btn"><%= i %></button>
	            	<% } %>
	            <% } %>
	            <!-- 버튼의 최대 값보다 총 페이지 수가 크면 다음 버튼 활성화 -->
	            <% if( btnRange*10 + 10 < pageCount ) { %>
		            <button type="button" class="able-btn" id="next-btn">&gt;</button>
	            <% } else { %>
	            	<button type="button" class="disable-btn" id="next-btn">&gt;</button>
	            <% } %>
	          </div>

			</div>
		</div>
	</div>
	
    <script type="text/javascript">
    	sessionStorage.setItem("cPage", JSON.stringify(<%= cPage%>));
    	sessionStorage.setItem("noticeCount", JSON.stringify(<%= noticeCount%>));
    </script>
    
    <script type="module" src="<%= path %>/resource/js/admin/notice/noticeList.js"></script>
</body>
</html>