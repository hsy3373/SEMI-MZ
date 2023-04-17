<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"  import = "mz.member.model.vo.Member, java.util.ArrayList"%>
<%
	String path = request.getContextPath();

	ArrayList<Member> list = (ArrayList<Member>) request.getAttribute("list");
	int chatLogCount = (int) request.getAttribute("chatLogCount");
	int heartCount = (int) request.getAttribute("heartCount");
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>M-Zone</title>
    <link rel="stylesheet" href="<%=path %>/resource/css/admin/admin-admin.css" />
  </head>
  <body>
    <div class="wrapper">
	  <%@ include file="/views/admin/sideBar.jsp"%>
      <div class="content">
        <div class="inner-wrap">
          <div class="wrap">
            <div class="update-info">
              <h3>비밀번호 변경</h3>
              <div  id="update-pwd-form">
                <div class="pwd-text">*기존 비밀번호 :</div>
                <input type="password" name="origin-pwd" id="origin-pwd" />
                <div class="pwd-text">*신규 비밀번호 :</div>
                <input type="password" name="new-pwd" class="new-pwd" />
                <div class="pwd-text">*비밀번호 확인 :</div>
                <input type="password" class="new-pwd" />

                <button id="update-pwd-btn" type="button">비밀번호 변경</button>
                <div id="toast">알림</div>
              </div>
            </div>
            
            <div class="delete-card-wrap">
	            <div class= "delete-chat">
	            	<div>
		        	    <div  class= "chat-text">채팅내역 삭제</div>
				        <div class= "chat-count"><%= chatLogCount %> 개</div>
			            <div class="delete-chat-btn">
							<button>일괄삭제</button>
			            </div>
	            	</div>
	            	<div>
	            		※7일이상 지난 채팅내역을 삭제합니다
	            	</div>
	            	
	            </div>
	            <div class= "delete-heart">
	            	<div>
		        	    <div  class= "heart-text">호감도내역 삭제</div>
				        <div class= "heart-count"><%= heartCount %> 개</div>
			            <div class="delete-heart-btn">
							<button>일괄삭제</button>
			            </div>
	            	</div>
	            	<div>
	            		※현재 랭킹 집계기간 이전의 호감도내역을 삭제합니다
	            	</div>
	            	
	            </div>

	            <div class="delete-cancel">
	              <h3>탈퇴계정 삭제</h3>
	
	              <div class="delete-cancel-btn">
	                <button>일괄삭제</button>
	              </div>
	
	              <div>
	                <div class="cancel-info">
	                  ※탈퇴 후 15일이 지난 계정들을 삭제합니다
	                </div>
	                <div class="cancel-table">
	                  <table>
	                    <tr>
	                      <th>#</th>
	                      <th>아이디</th>
	                      <th>닉네임</th>
	                      <th>신고건</th>
	                      <th>대상건</th>
	                      <th>탈퇴일</th>
	                    </tr>
	                    <% if(list.size() <= 0) { %>
	                   		<tr>
		                      <th colspan="6">조회된 리스트가 없습니다</td>
		                    </tr>
	                    <% } else { %>
							<% for(int i =0; i< list.size(); i++) { %>
			                    <tr>
			                      <td><%= list.size() - i %></td>
			                      <td><%= list.get(i).getUserId() %></td>
			                      <td><%= list.get(i).getNicName() %></td>
			                      <td><%= list.get(i).getUserReportCount() %></td>
			                      <td><%= list.get(i).getReceiveReportCount() %></td>
			                      <td><%= list.get(i).getCancellationDate() %></td>
			                    </tr>				
							<% } %>
						<% } %>
	                  </table>
	                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <script type="module"
		src="<%= path %>/resource/js/admin/admin.js"></script>
  </body>
</html>
