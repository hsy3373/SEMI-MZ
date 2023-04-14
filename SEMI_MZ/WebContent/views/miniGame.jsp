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
<link href="<%=contextPath%>/resource/css/cardFilp.css" rel="stylesheet" type="text/css">
<script type="module" src="<%=contextPath%>/resource/js/common.js"></script>


</head>
<body class="mini-game">
    <div >
        <div class="game-titel">
            <div class="game-title-text">짝 맞추기</div>
        </div>
        
        <div class="filp-modal-game" id="filp-modal">
         <div class="filp-background">
                <div class="return-square" id="return-square">
                    <img src="<%=contextPath%>/resource/img/icon/back2_btn.png" class="game_xbtn" id="game-back-button">
                </div>
               <div class="user-Card" >
                     <div class="user-front" style="background-image: url(<%=contextPath%>/resource/img/user/skin<%=loginUser.getSkinId()%>/fs.png)">
                        <div class="user-name"><%=loginUser.getNicName()%></div>
                    </div> 
                    <div class="user-back"></div>
               </div>
               <div class="user2-Card" id="user2-Card">
                    상대방!!
                </div>
               
                <div class="game">
                    <div class="game-board" id="game-board">
                </div>
            </div>
        </div>




    </div>  
    <script>
        //유저네임 
		var userName = '${loginUser.nicName}';
		//유저 skin
		var userSkin = '${loginUser.skinId}';	
		//console.log(userSkin);
		var userId = '${loginUser.userId}';

    </script>

     <script type="module" src="<%=contextPath%>/resource/js/gamezone/cardFlip.js"></script>
    </body>
</html>