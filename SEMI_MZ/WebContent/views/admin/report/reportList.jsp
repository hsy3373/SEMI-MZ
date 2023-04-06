<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="mz.report.model.vo.Report, java.util.ArrayList"%>

<%
	String path = request.getContextPath();
	ArrayList<Report> list = (ArrayList<Report>) request.getAttribute("list");
	
	//현재 페이지
	int cPage = (int) request.getAttribute("page");
	String search = (String) request.getAttribute("search");
	String keyword = (String) request.getAttribute("keyword");
	
	//총 개수
	int reportCount = (int) request.getAttribute("reportCount");
	
	//총 페이지 수 얼마나 나와야 하는지 확인용 총개수/20(페이지당 표시수)
	int pageCount = (int) Math.ceil(reportCount / 20.0);
	
	//버튼 숫자 설정 기준용 변수
	int btnRange = cPage / 10;
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Insert title here</title>
<link rel="stylesheet"
	href="<%=path%>/resource/css/admin/admin-report.css" />
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
</head>
<body>
	<div class="wrapper">
		<%@ include file="/views/admin/sideBar.jsp"%>
		<div class="content">
			<div class="head-text">신고 목록</div>
			<div class="inner-wrap">
				<div class="search">
					<div>
						<i class="bi bi-search"></i>
					</div>
					<div>
						<select name="search" id="search">
							<% if(search.equals("userId")) { %>
								<option value="receveId">대상자</option>
								<option value="userId" selected>신고자</option>
								<option value="title" >제목</option>
							<% } else if(search.equals("title")) { %>
								<option value="receveId" >대상자</option>
								<option value="userId" >신고자</option>
								<option value="title" selected>제목</option>
							<% } else { %>
								<option value="receveId" selected>대상자</option>
								<option value="userId" >신고자</option>
								<option value="title" >제목</option>
							<% } %>
						</select>
					</div>
					<div class="search-input">
						<input type="text" id="keyword" placeholder="검색어 입력 후 엔터를 눌러주세요" value="<%=keyword%>"/>
					</div>
				</div>
				<div class="report-wrap">
					<div class="report-list-area">
						<table class="report-list-table">
							<tr>
								<th>#</th>
								<th>신고번호</th>
								<th>제목</th>
								<th>신고자</th>
								<th>대상자</th>
								<th>신고일</th>
							</tr>
							<% if (list.isEmpty()) { %>
								<tr>
									<td colspan="6">조회된 리스트가 없습니다</td>
								</tr>
							<% } else { %>
								<% for (int i=0; i< list.size(); i++) { %>
									<tr class = "report-item">
										<th><%= reportCount - i - (cPage -1) * 20 %></th>
										<td><%= list.get(i).getReportNo()%></td>
										<td><%= list.get(i).getReportTitle()%></td>
										<td><%= list.get(i).getUserId()%></td>
										<td><%= list.get(i).getReceiveId()%></td>
										<td><%= list.get(i).getFormatDate()%></td>
									</tr>
								<% } %>
							<% } %>
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
					<div class="detail-area">
						<div class="btn-area">
							<button type="button" id="delete-btn">삭제</button>
							<button type="button" id="update-btn">수정</button>
						</div>
						<div>
							<table class="member-detail-table user-table">
								<tr>
									<th rowspan="2">신고자</th>
									<th>아이디</th>
									<td class = "id-box"></td>
									<th>닉네임</th>
									<td class= "nic-box"></td>
									<th>상태</th>
									<td class= "status-box"></td>
								</tr>
								<tr>
									<th>신고건</th>
									<td class= "user-report-box"></td>
									<th>대상건</th>
									<td class= "receive-report-box"></td>
									<td colspan="2">
										<button class="check-member">유저 조회</button>
									</td>
								</tr>
							</table>
							<table class="member-detail-table receiver-table">
								<tr>
									<th rowspan="2">대상자</th>
									<th>아이디</th>
									<td class = "id-box"></td>
									<th>닉네임</th>
									<td class= "nic-box"></td>
									<th>상태</th>
									<td class= "status-box"></td>
								</tr>
								<tr>
									<th>신고건</th>
									<td class= "user-report-box"></td>
									<th>대상건</th>
									<td class= "receive-report-box"></td>
									<td colspan="2">
										<button class="check-member">유저 조회</button>
									</td>
								</tr>
							</table>
							<table class="report-detail-table">
								<thead>
									<tr>
										<th>신고번호</th>
										<td class="report-no"></td>
										<th>신고일</th>
										<td class="report-date"></td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>제목</th>
										<td colspan="3"><input type="text" name="title"
											id="title" maxlength="20" /></td>
									</tr>
									<tr>
										<th>내용</th>
										<td colspan="3"><textarea name="content" id="content"
												cols="30" rows="10" maxlength="300"></textarea>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		sessionStorage.setItem("cPage", JSON.stringify(
	<%=cPage%>
		));
		sessionStorage.setItem("reportCount", JSON.stringify(
	<%=reportCount%>
		));
	</script>
	<script type="module"
		src="<%=path%>/resource/js/admin/report/reportList.js"></script>
</body>
</html>
