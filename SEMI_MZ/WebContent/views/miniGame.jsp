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
<link href="<%=contextPath%>/resource/css/cardFlip.css" rel="stylesheet" type="text/css">
<script type="module" src="<%=contextPath%>/resource/js/common.js"></script>


</head>
<body>
    <div>
        <div class="filp-modal-game" id="filp-modal">
            <div class="filp-background">
                <div class="game-titel">카드 뒤집기</div>
                <div class="gamemodal-out-btn">
                    <img src="<%=contextPath%>/resource/img/icon/back2_btn.png" class="game_xbtn" id="game-back-button">
                </div>
                <div class="game">
                    <div class="game-board" id="game-board">
                </div>
            </div>
        </div>
    </div>  
     <script type="module" src="<%=contextPath%>/resource/js/gamezone/cardFlip.js"></script>

</body>
</html>