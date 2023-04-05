<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import = "mz.member.model.vo.Member, java.util.ArrayList"%>

<%
	String path = request.getContextPath();	
 	ArrayList<Member> list = (ArrayList<Member>) request.getAttribute("list");

	//현재 페이지
	int cPage = (int) request.getAttribute("page");
	
	//총 개수
 	int memberCount = (int) request.getAttribute("memberCount");
 	
 	//총 페이지 수 얼마나 나와야 하는지 확인용 총공지수/20(페이지당 표시수)
 	int pageCount = (int) Math.ceil(memberCount / 20.0);
 	
 	//버튼 숫자 설정 기준용 변수
 	int btnRange = cPage/10; 


%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link
      rel="stylesheet"
      href="../../../resource/css/admin/admin-member.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
  </head>
  <body>
    <div class="wrapper">
      <%@ include file="/views/admin/sideBar.jsp"%>
      <div class="content">
        <div class="head-text">일반 계정</div>
        <div class="inner-wrap">
          <div class="search">
            <div>
              <i class="bi bi-search"></i>
            </div>
            <div>
              <select name="search" id="search">
                <option value="userId" selected>아이디</option>
                <option value="nicName">닉네임</option>
              </select>
            </div>
            <div class="search-input">
              <input
                type="text"
                placeholder="검색어 입력 후 엔터를 눌러주세요"
              />
              <div class="search-result">
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
                <div class="search-result-item">아이디 / 닉네임 / 가입일</div>
              </div>
            </div>
          </div>

				<div class="filter">
					<div>
						<div>정렬 :</div>
						<select name="sorting" id="sorting">
							<option value="userId" selected>아이디</option>
							<option value="">가입일</option>
						</select>
					</div>

					<div>
						<div>API :</div>
						<label> <input type="radio" name="api" id="api"
							value="all" checked /> ALL
						</label> <label> <input type="radio" name="api" id="api"
							value="kakao" /> Kakao
						</label> <label> <input type="radio" name="api" id="api"
							value="google" /> Google
						</label>
					</div>
				</div>
				<table class="list-area">
					<tr>
						<th>#</th>
						<th>아이디</th>
						<th>닉네임</th>
						<th>코인</th>
						<th>API</th>
						<th>상태</th>
						<th>가입일</th>
					</tr>
					<tr>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
					</tr>
					<tr>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
						<td>유저 리스트</td>
					</tr>
				</table>
				<div class="paging-bar">
					<!-- 현재 페이지가 10보다 클때 이전 버튼 활성화 -->
					<%
						if (cPage > 10) {
					%>
					<button type="button" class="able-btn" id="prev-btn">&lt;</button>
					<%
						} else {
					%>
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
            sessionStorage.setItem("noticeCount", JSON.stringify(<%= memberCount%>));
    </script>
     <script type="module" src="<%= path %>/resource/js/admin/member/activeMemberList.js"></script>
  </body>
</html>
