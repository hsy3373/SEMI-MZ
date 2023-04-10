<%@ page import="mz.member.model.vo.Member" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%

    // 현재 로그인 유저의 정보 내정보변경에 표시하기 위한 변수선언
    //System.out.println(loginUser);
    String userId = loginUser.getUserId();
    String nickName = loginUser.getNicName();
    String gender = loginUser.getGender();  // N,M,W
    String info = loginUser.getInfo();


    if(info == null){
        info = "";
    }



%>



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


    <!-- ========================== [김혜린] 내정보 변경 / 비밀번호 입력 요구 모달 공간 ========================== -->
    <!-- ======= 내정보변경 시 비밀번호 입력 요청 모달 ======== -->      
    <div class="modal smodalInfo">
        <div class="s-modal-back">
            <div class="smodal-th"><button class="smodal-xbtn"><img src="../resource/img/icon/엑스 버튼.png" class="sx-btn sx-btn1"></button></div>
            <form>
            <table class="smodal-table">
                <tr class="smodal-tb"><th colspan="2">비밀번호 입력</th></tr>
                <tr>
                    <td><input type="password" class="rqpwd-input" id="rqpwd"></td>
                    <td><button type="button" class="rqpwd-submit-btn" id="rq-btn">확인</button></td>.
                </tr>
            </table>
            </form>
        </div>
    </div>
    <!-- ========================= 내정보변경 모달 ========================= -->     
    <div class="modal modalMyinfo">
        <div>
            <div class="rin-modal-background">
                <div class="rin-modal-header">내 정보 변경</div>
                <div class="rin-modal-out-btn"><img src="../resource/img/icon/엑스 버튼.png" class="sx-btn myinfo-xbtn"></div>
                <div class="rin-empty-space"></div>
                <div class="myinfo-modaltxtarea">
                <form>
                    <table class="myinfo-table">
                        <tr>
                            <th class="rin-th1-wid">- 아이디</th>
                            <td><input type="text" class="rin-inputbox rin-readonly" placeholder="<%= userId %>" readonly></td>
                            <td></td>
                        </tr>
                        <tr></tr><tr></tr>
                        <tr>
                            <th class="rin-th1-wid">- 닉네임 변경</th>
                            <td><input type="text" class="rin-inputbox cge-nick" name="cge-nick" value="<%= nickName %>"></td>
                            <td class="rin-td3-wid"><button type="button" class="rncheck-btn" disabled>중복확인</button></td>
                        </tr>
                        <tr class="rin-under-text">
                            <td></td>
                            <td><span class="cgenick-txt">영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능</span></td>
                            <td></td>
                        </tr>
                        <tr></tr><tr></tr><tr></tr><tr></tr>
                        <tr>
                            <th class="rin-th1-wid">- 비밀번호 변경</th>
                            <td><input type="password" class="rin-inputbox cge-pwd" placeholder="비밀번호"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th class="rin-th1-wid"></th>
                            <td><input type="password" class="rin-inputbox cge-chkpwd" id="cge-chkpwd" placeholder="비밀번호 확인"></td>
                            <td></td>
                        </tr>
                        <tr class="rin-under-text">
                            <td></td>
                            <td><span class="cgepwd-txt">영문, 숫자, 특수기호 포함 8~16자 입력 가능</span></td>
                            <td></td>
                        </tr>
                        <tr></tr><tr></tr>
                        <tr>
                            <th class="rin-th1-wid rin-th1-hgt">- 성별</th>
                            <td>
                                <input type="radio" id="W" name="gender" value="W">
                                <label for="W">여</label>
                                <input type="radio" id="M" name="gender" value="M">
                                <label for="M">남</label>
                                <input type="radio" id="N" name="gender" value="N" checked>
                                <label for="N">비공개</label>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th class="rin-th1-wid">- 자기소개</th>
                            <td>
                                <textarea class="scroll-fix rself-info" name="selfInfo" cols="53" rows="6" style="resize:none;"><%= info %></textarea>
                            </td>
                            <td></td>
                        </tr>
                        <tr class="rin-under-text">
                            <td></td>
                            <td><span id="self-txt">100자 이내로 작성해 주세요.</span></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <th><button type="button" id="cge-btn" class="rin-green-btn">정보수정</button></th>
                            <td style="text-align: right;"><button type="button" id="sec-btn">회원탈퇴</button></td>
                        </tr>
                    </table>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- ============== 회원탈퇴 버튼 클릭 시 비밀번호 입력 요청 모달 =============== -->      
	<div class="modal smodalNmem">
		<div class="s-modal-back">
			<div class="smodal-th"><button class="smodal-xbtn"><img src="../resource/img/icon/엑스 버튼.png" class="sx-btn sx-btn2"></button></div>
			<form>
			<table class="smodal-table">
				<tr class="smodal-tb"><th colspan="2">정말 탈퇴하시겠습니까?</th></tr>
				<tr>
					<td><input type="password" class="rqpwd-input" id="sec-pwdchk"></td>
					<td><button type="button" class="rqpwd-submit-btn" id="secsub-btn">확인</button></td>.
				</tr>
			</table>
			</form>
		</div>
	</div>
     <!-- ============================================================================================================ -->

    <script>
        var gender = '${loginUser.gender}';
        var orgName = '${loginUser.nicName}';
        var orgPwd = '${loginUser.userPwd}';
        var orgInfo = '${loginUser.info}';
    </script>





      <script type="module" src="<%=contextPath%>/resource/js/buttonList.js"></script>
      <!--유효성 및 버튼 활성화 script -->
      <script type="module" src="../resource/js/validation.js"></script>
</body>
</html>