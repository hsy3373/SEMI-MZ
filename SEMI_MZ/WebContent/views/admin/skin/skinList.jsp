<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %>
<%@ page import="mz.skin.model.vo.Skin, java.util.ArrayList" %> 
<%
 	String path = request.getContextPath(); 

 	String defaultRoot = (String) request.getAttribute("defaultRoot");
 	defaultRoot = defaultRoot.substring(defaultRoot.lastIndexOf("/") + 1);
 	int skinCount = (int) request.getAttribute("skinCount");
 	ArrayList<Skin> rewardList = (ArrayList<Skin>) request.getAttribute("rewardList");
 	ArrayList<Skin> basicList = (ArrayList<Skin>) request.getAttribute("basicList");
 	
 	//총 페이지 수 얼마나 나와야 하는지 확인용 (총 스킨수 - 리워드용 수 - 디폴트용 하나)/10(페이지당 표시수)
 	int pageCount = (int) Math.ceil((skinCount - rewardList.size() - 1) / 10);
 	
 	// 현재 상황에서 표시될 페이지 버튼 수 설정용
 	// 최대 10개까지 표시해야 함
 	int minPage = pageCount > 10 ? 10 : pageCount;
 
 %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link
      rel="stylesheet"
      href="<%=path %>/resource/css/admin/admin-common.css"
    />
    <link rel="stylesheet" href="<%=path %>/resource/css/admin/admin-skin.css" />
  </head>
  <body>
    <div class="wrapper">
      <%@ include file="/views/admin/sideBar.jsp"%>
      <div class="content">
        <div class="head-text">캐릭터 스킨</div>
        <div class="inner-wrap">
          <div class="skin-add-btn">
            <a href="<%=path %>/insert.skin">스킨 등록</a>
          </div>
          <div class="top-skin-wrap">
            <div class="default-skin">
              <div>Default 스킨</div>
              <img
                class="title-img"
                src="<%=path %>/resource/img/user/<%=defaultRoot %>/fs.png"
              />
            </div>
            

            <div class="reward-skin">
              <div>보상용 스킨</div>
              <div class="reward-skin-list">
              	<% for(int i =0; i< rewardList.size(); i++) { %>
        	  		<div class="reward-skin-item">
                  		<div>
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/fs.png" />
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/fd.png" />
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/bs.png" />
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/bd.png" />
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/ls.png" />
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/ld.png" />
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/rs.png" />
		                    <img src="<%=path %>/resource/img/user/<%=rewardList.get(i).getSaveFolder() %>/rd.png" />
                  		</div>
                  		<div class="dvide" id="<%=rewardList.get(i).getSkinId()%>"></div>
                  		<div><%= rewardList.get(i).getSaveFolder() %></div>
                	</div>
              	<% } %>
              </div>
            </div>
          </div>

          <table class="skin-table">
            <tr>
              <th>#</th>
              <th>대표사진</th>
              <th>폴더명</th>
              <th>가격(코인)</th>
              <th>보상</th>
            </tr>
            
            <% for(int i=0; i<basicList.size(); i++) { %>
	            <tr class="skin-info-box">
	              <td><%= skinCount - rewardList.size() - 1 - i %></td>
	              <td>
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/fs.png" />
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/fd.png" />
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/bs.png" />
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/bd.png" />
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/ls.png" />
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/ld.png" />
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/rs.png" />
	                <img src="<%=path %>/resource/img/user/<%=basicList.get(i).getSaveFolder() %>/rd.png" />
	              </td>
	              <td><%=basicList.get(i).getSaveFolder() %></td>
	              <td><%=basicList.get(i).getPrice() %></td>
	              <td><%=basicList.get(i).getReward() %></td>
	            </tr>
            <% } %>
          </table>

          <div class="paging-bar">
            <button type="button" class="disable-btn" id="prev-btn">&lt;</button>
            <button type="button" class="selected-btn">1</button>
            <% for(int i=2; i<= 10; i++) { %>
            	<% if( i <= minPage) { %>
            		<button type="button" class="able-btn"><%= i %></button>
            	<% } else {%>
            		<button type="button" class="disable-btn"><%= i %></button>
            	<% } %>
            <% } %>
            <% if( minPage > 1 ) { %>
	            <button type="button" class="able-btn" id="next-ptn">&gt;</button>
            <% } else { %>
            	<button type="button" class="disable-btn" id="next-ptn">&gt;</button>
            <% } %>
          </div>
        </div>
      </div>
    </div>
    
    <script type="text/javascript">
    	sessionStorage.setItem("maxSkinPage", JSON.stringify(<%= pageCount%>));
    </script>
    
  </body>
</html>
