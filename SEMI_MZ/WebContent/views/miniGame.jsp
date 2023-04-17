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
<link href="<%=contextPath%>/resource/css/alert.css" rel="stylesheet" type="text/css">
<script type="module" src="<%=contextPath%>/resource/js/common.js"></script>


</head>
<body class="mini-game">
    <div >
        <div class="game-titel">
            <div class="game-title-text">짝 맞추기</div>
        </div>
        
        <div class="filp-modal-game" id="filp-modal">
         <div class="filp-background">
                <div class="return-square alert-toggle" id="return-square">
                    <img src="<%=contextPath%>/resource/img/icon/back2_btn.png" class="game_xbtn" id="game-back-button">
                </div>
               <div class="user-Card" >
                     <div class="user-front" style="background-image: url(<%=contextPath%>/resource/img/user/skin<%=loginUser.getSkinId()%>/fs.png)">
                        <div class="user-name"><%=loginUser.getNicName()%></div>
                    </div> 
                    <div class="user-back"></div>
               </div>
               <div class="user2-Card" id="user2-Card">
                </div>
               
                <div class="game">
                    <div class="game-board" id="game-board">
                </div>

                

            </div>
            <div style="width:460px; height: 150px; position: fixed; bottom: 0px; left: 0px; border: 1px solid red;">채팅창</div>
        </div>


        <!--alert 창-->
        <div class="alert">
            <h3 id="alert-text"></h3>
            <div>
              <button class="button alert-ok" id="alert-ok">확인</button>
              <button class="button alert-cancel">취소</button>
            </div>
          </div>
          <div class="alert-overlay"></div>
          <!-- alert 창 실행시 뒷배경 오버레이 태그 -->

        <!-- alert(확인만 있음) -->
        <div class="home-alert">
            <h3 id="home-alert-text"></h3>
            <div>
            <button class="button home-alert-ok">확인</button>
            </div>
        </div>
        <div class="home-alert-overlay"></div>



    </div>  
    <script>
        //유저네임 
		var userName = '${loginUser.nicName}';
		//유저 skin
		var userSkin = '${loginUser.skinId}';	
		//console.log(userSkin);
		var userId = '${loginUser.userId}';

    </script>  
    <script type="model" src ="<%=contextPath%>/resource/js/alert.js"></script>
     <script type="module" src="<%=contextPath%>/resource/js/gamezone/cardFlip.js"></script>
     
    </body>
</html>