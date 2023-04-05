<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>버튼모달</title>
<!--버튼 list : 작성자 윤지영 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="<%=contextPath%>/resource/css/common.css" rel="stylesheet" type="text/css">
<link href="<%=contextPath%>/resource/css/buttonList.css" rel="stylesheet" type="text/css">
</head>
<body>

      <!--모달창 분리를 위해 버튼도 따로뻄 -->
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
                        <tbody id="friendList">
                        </tbody>
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
            <div class="logout-button" id="userlogout">
            <a> 로그아웃 </a>
            </div>
        </div>
      </div>


   

</body>
</html>