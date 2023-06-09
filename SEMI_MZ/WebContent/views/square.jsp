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
<link href="<%=contextPath%>/resource/css/alert.css" rel="stylesheet" type="text/css">
<link href="<%=contextPath%>/resource/css/game.css" rel="stylesheet" type="text/css">

</head>
<body>
	<!-- 광장 메인 jsp 작성 : 윤지영 -->
	<div id="main-square" style="display: flex; justify-content : center; position: relative;">
	
	</div>
        

	<div class="alert">
		<h3 id="alert-text"></h3>
		<div>
		  <button class="button alert-ok" id="alert-ok">확인</button>
		  <button class="button alert-cancel">취소</button>
		</div>
	  </div>
	  <div class="alert-overlay"></div>

    <!--버튼 모달 jps 가져옴 : 윤지영-->
    <%@ include file="./buttonList.jsp" %>

	
   	<%@ include file="./chatting.jsp" %>
	
   <%@ include file="./notice.jsp" %>
   	
    <!--game 모달 jps 가져옴 : 윤지영-->
   	<%@ include file="./game.jsp" %>
   		
	
	<script>
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
	<script type="module" src="<%=contextPath%>/resource/js/alert.js"></script>
	
    
    <script type="module">
	import {uesrX , uesrY} from '<%=contextPath%>/resource/js/squareCanvas.js';
	</script>

    <%@ include file="./userInfo.jsp" %>
</body>
</html>