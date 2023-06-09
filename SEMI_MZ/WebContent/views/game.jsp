<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>game</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="<%=contextPath%>/resource/css/common.css" rel="stylesheet" type="text/css">
<link href="<%=contextPath%>/resource/css/game.css" rel="stylesheet" type="text/css">

</head>
<body>
    <!--게임모달 작성자 : 윤지영-->
    <div class="modal-game" id="game-modal">
        <div class="game-area">
            <div class="gamemodal-background">
                <div class="game-titel">미니게임-Zone</div>
                <div class="gamemodal-out-btn">
                    <img src="<%=contextPath%>/resource/img/icon/엑스 버튼.png" class="game_xbtn" id="game_xbtn">
                </div>
                <div id="game1" class="">
                    <img class="card-Filp-title" src="<%=contextPath%>/resource/img/minigame/FlipGame/cardFlipimg.PNG">
                    <div class="card-Filp-text">2인</div>
                    <div class="game-strat" id="Strat-match">시작하기</div>
                </div>
              

                <div id="before_btn" class="disPlayNone"><img src="<%=contextPath%>/resource/img/icon/before2_btn.png" class="before_btn"></div>
                <div id="after_btn"><img src="<%=contextPath%>/resource/img/icon/next2_btn.png" class="after_btn"></div> 
                
               <div id="game2" class="">
               		<img class="skin-pang-title" src="<%=contextPath%>/resource/img/minigame/skinPang/skinPang-title.png">
               		<div class="skin-pang-text">1인</div>
                	<div  id="go-skin-pang">시작하기</div>
               </div>
               
            </div>
        </div>
    </div>

    
    
    

    <script type="module" src="<%=contextPath%>/resource/js/gamezone/gamezone.js"></script>
   
   

</html>