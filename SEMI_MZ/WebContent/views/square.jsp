<%@ page import="mz.member.model.vo.Member" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String contextPath = request.getContextPath();
	Member loginUser = (Member) session.getAttribute("loginUser");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>M-Zone</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="<%=contextPath%>/resource/css/common.css" rel="stylesheet" type="text/css">
<script type="module" src="<%=contextPath%>/resource/js/common.js"></script>

</head>
<body>
	<!-- 광장 메인 jsp 작성 : 윤지영 -->
	<div id="main-square" style="display: flex; justify-content : center; position: relative;">
	
	</div>
        

    <!--버튼 모달 jps 가져옴 : 윤지영-->
    <%@ include file="./buttonList.jsp" %>

	
   	<%@ include file="./chatting.jsp" %>
	
   <%@ include file="./userInfo.jsp" %>
   <%@ include file="./notice.jsp" %>
   	<!--${loginUser.nicName}  -->
   	
    <!--game 모달 jps 가져옴 : 윤지영-->
   	<%@ include file="./game.jsp" %>
   		
    
    <!-- 확인용 ^^ --> 
	<%
		//System.out.print(contextPath);
		//System.out.print(loginUser);
		//Member [userId=test, userPwd=test, nicName=NIC_test, status=Y, skinId=0, coin=500, info=, gender=N, date=2023-03-20]
	%>
	
	<script>
		//console.log(contextPath);
		//유저네임 
		var userName = '${loginUser.nicName}';
		//유저 skin
		var userSkin = '${loginUser.skinId}';	
		//console.log(userSkin);
		var userId = '${loginUser.userId}';

		//클릭한 친구 함수
		var clickedUserId = sessionStorage.clickedUserId;
	</script>
	
	
    <script type="module" src="<%=contextPath%>/resource/js/squareinit.js"></script>
	
    
    <script type="module">


	import {uesrX , uesrY} from '<%=contextPath%>/resource/js/squareCanvas.js';
    


	</script>

		
 
			
	 <!--이미지선언-->
    <img id="myhome2" src="<%=contextPath%>/resource/img/icon/home.png" style="display: none;">
    
</body>
</html>