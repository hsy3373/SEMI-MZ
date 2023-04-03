<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>버튼모달</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="<%=contextPath%>/resource/css/common.css" rel="stylesheet" type="text/css">
<link href="<%=contextPath%>/resource/css/buttonList.css" rel="stylesheet" type="text/css">
</head>
<body>

      <!--모달창 분리를 위해 버튼도 따로뻄-->
      <div class="button-area">
        <div class="friendList">
            <img src="<%=contextPath%>/resource/img/icon/친구목록 버튼.png" style=" width: 50px;" > 
        </div>
    </div>
    <div class="button-area">
        <div class="Listbutton">
            <img src="<%=contextPath%>/resource/img/icon/목록 버튼.png" style=" width: 50px;">
        </div>
    </div>


    <!--모달창 : 친구목록 -->
    <div class="modal modal1">
        <div class="modal_body">
            <div class="modal-out-btn"><img src="<%=contextPath%>/resource/img/icon/엑스 버튼.png" class="x-btn1" style=" width: 55px; height: 55px;" ></div>
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
            <div class="modal-out-btn2"><img src="<%=contextPath%>/resource/img/icon/엑스 버튼.png" class="x-btn2" style=" width: 55px; height: 55px;"></div>
            <div class="modal-button1">
            <a>내 정보 변경</a>
            </div>
            <div class="modal-button2">
            <a> 로그아웃 </a>
            </div>
        </div>
      </div>


   

</body>
</html>