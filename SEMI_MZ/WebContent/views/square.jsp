<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>광장</title>
<link href="../resource/css/common.css" rel="stylesheet" type="text/css">
<link href="../resource/css/square.css" rel="stylesheet" type="text/css">

</head>
<body>
	<!-- 광장 메인 jsp 작성 : 윤지영 -->
	<div id="mainSquare" style="display: flex; justify-content : center;">
        
    </div>

    
    <!--모달창 : 친구목록 -->
    <div class="modal modal1">
        <div class="modal_body">
            <div class="modal-out-btn"><img src="../resource/img/icon/엑스 버튼.png" class="x-btn x-btn1"></div>
            <div class="modal-background">
                <div class="modal-textarea">
                    <table class="display-center"> 
                        <!--데이터 베이스에서 받아서 적용할 에정 : 10명까지 -->
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                        <tr><td>친구1 :</td><td>접속중</td><td>놀러가기</td></tr>
                    </table> 
                </div> 
            </div>
        </div>
      </div>

    <!--모달창 : 환경설정 -->
    <div class="modal modal2" >
        <div class="modal_body" id="Preferences">
            <div class="modal-out-btn2"><img src="../resource/img/icon/엑스 버튼.png" class="x-btn x-btn2"></div>
            <div class="modal_button1">
            <a>내 정보 변경</a>
            </div>
            <div class="modal_button2">
            <a> 로그아웃 </a>
            </div>
        </div>
      </div>

    
    <script>
       
    </script>


    <!--이미지선언-->
    <img id="myhome2" src="../resource/img/icon/home.png" style="display: none;">

    <script type="text/javascript" src="../resource/js/squareCanvas.js"></script>
    <script type="text/javascript" src="../resource/js/common.js"></script>

</body>
</html>