<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="mz.report.model.vo.Report, java.util.ArrayList"%>

<%-- <%
	String path = request.getContextPath();
ArrayList<Report> list = (ArrayList<Report>) request.getAttribute("list");

//현재 페이지
int cPage = (int) request.getAttribute("page");
String sort = (String) request.getAttribute("sort");

//총 개수
int reportCount = (int) request.getAttribute("reportCount");

//총 페이지 수 얼마나 나와야 하는지 확인용 총개수/20(페이지당 표시수)
int pageCount = (int) Math.ceil(reportCount / 20.0);

//버튼 숫자 설정 기준용 변수
int btnRange = cPage / 10;
%> --%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Insert title here</title>
<link rel="stylesheet"
	href="<%=path%>/resource/css/admin/admin-member.css" />
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
							<option value="title" selected>제목</option>
							<option value="userId">신고자</option>
							<option value="receveId">대상자</option>
						</select>
					</div>
					<div class="search-input">
						<input type="text" id="keyword" placeholder="검색어 입력 후 엔터를 눌러주세요" />
						<div class="search-result"></div>
					</div>
				</div>
				<div class="filter">
					<div>
						<div>정렬 :</div>
						<select name="sort" id="sort">
							<option value="date" selected>신고일</option>
							<option value="userId">신고자</option>
							<option value="receveId">대상자</option>
							
							<%-- <%
								if (sort.equals("date")) {
							%>
							<option value="date" selected>신고일</option>
							<option value="userId">신고자</option>
							<option value="receveId">대상자</option>
							<%
								} else if (sort.equals("userId")) {
							%>
							<option value="date">신고일</option>
							<option value="userId" selected>신고자</option>
							<option value="receveId">대상자</option>
							<%
								} else {
							%>
							<option value="date">신고일</option>
							<option value="userId">신고자</option>
							<option value="receveId" selected>대상자</option>
							<%
								}
							%> --%>
						</select>
					</div>
				</div>
				<div class="report-wrap">
					<div class="report-list-area">
						<%-- <table class="list-table">
							<tr>
								<th>#</th>
								<th>제목</th>
								<th>신고자</th>
								<th>대상자</th>
								<th>신고일</th>
							</tr>
							<% if (list.isEmpty()) { %>
							<tr>
								<td colspan="4">조회된 리스트가 없습니다</td>
							</tr>
							<% } else { %>
							<% for(int i=0; i< list.size(); i++) { %>
							<tr class="report-item">
								<td><%= memberCount - i - (cPage - 1) * 20%></td>
								<td><%= list.get(i).getUserId()%></td>
								<td><%= list.get(i).getNicName()%></td>
								<td><%= list.get(i).getCoin()%></td>
								<td><%= list.get(i).getApiKind()%></td>
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
						</div> --%>
					</div>

					<div class="detail-area">
						<div>
							<table class = "detail-table">
								<tr>
									<th rowspan="2">신고자</th>
									<th>ID</th>
									<td>id</td>
									<th>닉네임</th>
									<td>nic</td>
									<th>상태</th>
									<td>y</td>
								</tr>
								<tr>
									<th>신고건</th>
									<td colspan="2"></td>
									<th>대상건</th>
									<td colspan="2"></td>
								</tr>
							</table>
							<table class = "detail-table">
								<tr>
									<th rowspan="2">대상자</th>
									<th>ID</th>
									<td>id</td>
									<th>닉네임</th>
									<td>nic</td>
									<th>상태</th>
									<td>y</td>
								</tr>
								<tr>
									<th>신고건</th>
									<td colspan="2"></td>
									<th>대상건</th>
									<td colspan="2"></td>
								</tr>
							</table>
							<table>
								<thead>
									<tr>
										<th>신고번호</th>
										<th></th>
										<th>일자</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>제목</td>
										<td colspan="3"></td>
									</tr>
									<tr>
										<td>내용</td>
										<td colspan="3"></td>
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
		sessionStorage.setItem("memberCount", JSON.stringify(
	<%=memberCount%>
		));
	</script>
	<script type="module"
		src="<%=path%>/resource/js/admin/member/cancelMemberList.js"></script>
</body>
</html>
