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
<link href="../resource/css/square.css" rel="stylesheet" type="text/css">


</head>
<body>
	<!-- 광장 메인 jsp 작성 : 윤지영 -->
	<div id="mainSquare" style="display: flex; justify-content : center;">
	
	</div>
        

    <!--모달창 분리를 위해 버튼도 따로뻄-->
    <div class="button_area">
        <div class="friendList">
            <img src="../resource/img/icon/친구목록 버튼.png" style=" width: 50px;" > 
        </div>
    </div>
    <div class="button_area">
        <div class="Listbutton">
            <img src="../resource/img/icon/목록 버튼.png" style=" width: 50px;">
        </div>
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