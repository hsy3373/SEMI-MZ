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
<title>광장</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="../resource/css/common.css" rel="stylesheet" type="text/css">


</head>
<body>
	<!-- 광장 메인 jsp 작성 : 윤지영 -->
	<div id="main-square" style="display: flex; justify-content : center;">
	</div>
        

    <!--버튼 모달 jps 가져옴 : 윤지영-->
    <%@ include file="./buttonList.jsp" %>

   
   	<!--${loginUser.nicName}  -->
   		
    
    <!-- 확인용 ^^ --> 
	<%
		//System.out.print(contextPath);
		System.out.print(loginUser);
		//Member [userId=test, userPwd=test, nicName=NIC_test, status=Y, skinId=0, coin=500, info=, gender=N, date=2023-03-20]
	%>
	
	<script>
		//console.log(contextPath);
       
		//유저네임 
		var username = '${loginUser.nicName}';
		//유저 skin
		var userSkin = Number('${loginUser.skinId}')+1;
		
		
		
		//console.log(userSkin);
	</script>
    
   
	

    <!--이미지선언-->
    <img id="myhome2" src="../resource/img/icon/home.png" style="display: none;">

    <script type="text/javascript" src="../resource/js/squareCanvas.js"></script>
    <script type="text/javascript" src="../resource/js/common.js"></script>

</body>
</html>