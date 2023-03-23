<!-- 지의 옷장 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<c:set var="contextPath" value="<%= request.getContextPath() %>"/>
<link href="${ contextPath }/resource/css/closet.css" rel="stylesheet" type="text/css">
<link href="${ contextPath }/resource/css/common.css" rel="stylesheet" type="text/css">
<style>
@font-face {
    font-family: "DOSSaemmul";
    src: url(${ contextPath }/resource/font/DOSSaemmul.ttf) format("truetype");
	font-weight: bolder;
}
* {font-family: 'DOSSaemmul', serif;}
</style>
<title>옷장</title>
</head>
<body>
    <div class="myroom">
        <!-- 유저 -->
        <div class="user">
            <img id="user-skin" src="${ contextPath }/resource/img/user/skin01/fs.png" alt="유저캐릭터">
            <div class="font-wh">닉네임</div>
        </div>
        <!-- 옷장 -->
        <div class="furniture">
            <img src="${ contextPath }/resource/img/icon/빈옷장.png">
        </div>
        <!-- 뒤로가기 버튼 -->
        <a href="myroom.jsp">
            <img id="back-btn" src="${ contextPath }/resource/img/icon/back2_btn.png">
        </a>
        <!-- 잔여 코인 -->
        <img class="coin-label" src="${ contextPath }/resource/img/icon/라벨2.png">
        <div class="coin">
            <img id="coin-img" src="${ contextPath }/resource/img/icon/coin.png">
            <p class="coin-text font">16000</p>
        </div>
        <!-- 보유캐릭터 상점 -->
        <div class="closet">
		    <!-- 옷장 클릭시 내옷장 -->
        	<button class="closet-btn font font-bk" id="my-skin">옷장</button>
		    <!-- 상점 클릭시 상점 -->
        	<button class="closet-btn font font-bk" id="store">상점</button>
        </div>
    </div>
    
    


</body>
</html>