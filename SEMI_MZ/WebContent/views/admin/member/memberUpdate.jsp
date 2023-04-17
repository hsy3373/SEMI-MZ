<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import= "mz.member.model.vo.Member, mz.skin.model.vo.Skin, java.util.ArrayList"%> 
<% 
	String path = request.getContextPath(); 
	Member m = (Member) request.getAttribute("member");
	ArrayList<Skin> skinList = (ArrayList<Skin>) request.getAttribute("skinList");
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>M-Zone</title>
    <link
      rel="stylesheet"
      href="<%= path%>/resource/css/admin/admin-member-detail.css"
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
        <div class="head-text">
          <div class="back">
            <i class="bi bi-arrow-left-square"></i>
          </div>
          유저 정보
        </div>
        <div class="inner-wrap">
        	<form action="<%= path%>/update.member" method="post">
        		<input type="hidden" name="userId" value="<%= m.getUserId()%>">
	          <div class="btn-area">
	            <button type="button" id="delete-btn">삭제</button>
		            <% if( m.getStatus().equals("X")){ %>
						<button type="button" id="blocking-btn" >차단 해제</button>       	
		            <% } else { %>
		            	<button type="button" id="blocking-btn" >차단</button>    
		            <% } %>
		          <button type="submit" id="update-btn">수정</button>
	          </div>
	          <table>
	            <thead>
	              <tr>
	                <td>적용 스킨 : <%= m.getSkinId() %></td>
	                <td class="menu">아이디</td>
	                <td id="userId"><%= m.getUserId() %></td>
	                <td class="menu">API</td>
	                <td><%= m.getApiKind() %></td>
	                <td class="menu">상태</td>
	                <td><%= m.getStatus() %></td>
	              </tr>
	              <tr>
	                <td rowspan="3">
	                  <img
	                    src="<%= path%>/resource/img/user/skin<%=m.getSkinId() %>/fs.png"
	                    class="title-img"
	                  />
	                </td>
	                <td class="menu">닉네임</td>
	                <td><%= m.getNicName() %></td>
	                <td class="menu">가입일</td>
	                <td><%=m.getFormatDate() %></td>
	                <td class="menu">비활성일</td>
	                <td><%= m.getCancellationDate() %></td>
	              </tr>
	              <tr>
	                <td class="menu">코인</td>
	                <td>
	                	<input type="text" pattern="\d*" maxlength="4" name="coin" id="coin" value= "<%=m.getCoin() %>">
	                </td>
	                <td rowspan="2" class="menu">자기소개</td>
	                <td colspan="3" rowspan="2">
	                  <textarea
	                  	name= "info"
	                    id="my-info"
	                    cols="30"
	                    rows="10"
	                  ><%=m.getInfo() %></textarea>
	                </td>
	              </tr>
	              <tr>
	                <td class="menu">성별</td>
	                <td><%= m.getGender() %></td>
	              </tr>
	            </thead>
	          </table>
				<table>
					<tr>
						<th class="menu">보유중 스킨</th>
					</tr>
					<tr>
						<td>
							<div class="my-skin">
								<%	for (Skin skin : skinList) { %>
									<div class="my-skin-item">
										<div><%= skin.getSkinId() %></div>
										<img src="<%= path + skin.getSaveRoot() %>/fs.png" />
									</div>
								<% } %>
							</div>
						</td>
					</tr>
				</table>
	        </form>
			<div id="toast">알림</div>
			</div>
      </div>
    </div>
    	<script type="module"
		src="<%= path %>/resource/js/admin/member/memberUpdate.js"></script>
  </body>
</html>
