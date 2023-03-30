<!-- 지의 마이룸 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String contextPath = request.getContextPath();
	// test.jsp -> 값 가져옴
	// String roomMaster = (String)request.getAttribute("roomMaster");
/* 	if(roomMaster == null) {
		//~~~
	} */
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<c:set var="contextPath" value="<%= request.getContextPath() %>" />
<!-- css link -->
<link href="../resource/css/common.css" rel="stylesheet" type="text/css">
<link href="../resource/css/myroom.css" rel="stylesheet" type="text/css">
<link href="../resource/css/board.css" rel="stylesheet" type="text/css">
<link href="../resource/css/closet.css" rel="stylesheet" type="text/css">
<link href="../resource/css/buttonListMyroom.css" rel="stylesheet" type="text/css">
<link href="../resource/css/alert.css" rel="stylesheet">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<style>
ul {
    text-align: center;
    display: inline-block;
    border: 1px solid #ccc;
    border-right: 0;
	padding-left :0;
}
ul li {
    text-align: center;
    float: left;
	list-style:none;

}

ul li a {
    display: block;
    font-size: 14px;
	color: black;
    padding: 0 12px;
    border-right: solid 1px #ccc;
    box-sizing: border-box;
	text-decoration-line:none;	
    line-height: 30px;
    font-weight: 300;
}

ul li.on {background: #eda712;}

ul li.on a {color: #fff;}
</style>


<title>My Room</title>
</head>
</head>
<body>
	<!-- ============================= 마이룸 ============================= -->
	<div class="myroom">
		<!-- 옷장 클릭시 모달창 -->
		<div class="icon-closet">
			<img id="closet" src="../resource/img/icon/옷장.png">
		</div>
		<!-- 나무 클릭시 모달창 -->
		<div class="icon-tree">
			<img id="tree" src="../resource/img/icon/tree.png">

			<!-- 방명록 내용 나무에 표시 -->
			<div class="myroom-board">
				<table class="myroom-board-list">
					<tr>
						<td class="myroom-board-title"><img class="apple"
							src="../resource/img/icon/사과.png"> 안녕하세요안녕하세요안녕하세요안녕하세요</td>
						<td class="myroom-board-user">노지의</td>
					</tr>
					<tr>
						<td class="myroom-board-title"><img class="apple"
							src="../resource/img/icon/사과.png"> 안녕하세요안녕하세요안녕하세요안녕하세요</td>
						<td class="myroom-board-user">노지의노지의노</td>
					</tr>
					<tr>
						<td class="myroom-board-title"><img class="apple"
							src="../resource/img/icon/사과.png"> 안녕하세요안녕하세요안녕하세요안녕하세요</td>
						<td class="myroom-board-user">노지의노지의노</td>
					</tr>
					<tr>
						<td class="myroom-board-title"><img class="apple"
							src="../resource/img/icon/사과.png"> 안녕하세요안녕하세요안녕하세요안녕하세요</td>
						<td class="myroom-board-user">노지의노지의노</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- 마이룸 주인 스킨 -->
		<div class="myroom_user">
			<!-- 호감도 -->
			<input type="checkbox" name="heart-ck" id="heart"> <label
				class="font" for="heart">12</label> <img class="user-skin"
				src="../resource/img/user/skin1/fs.png">
		</div>

		<!--버튼 모달 jps 가져옴 : 노지의-->
		<%@ include file="./buttonListMyroom.jsp"%>
	</div>
	<!-- 내가 유저아이디와 로그인유저아이디 비교 -->
	<!-- 
		광장에서 집아이콘으로 들어갔을 때
	 -->

	<!-- 
		친구목록에서 친구네놀러가기 클릭할때
		bno 처럼 userId값을 받아오면 됨
	  -->

	<!-- ============================= 방명록 모달 ============================= -->
	<div class="board-wrap">
		<div class="board-modal">
			<!-- ============================= 방명록 리스트 ============================= -->
			<div class="board-list">
				<img class="x-btn" src="../resource/img/icon/엑스 버튼.png">
				<div class="board-content">
					<table class="board-list-area">
						<!-- boardList 로 조회해옴 -->
<!-- 	                <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">유저2</td>
	                        <td class="board-date">2023-03-25</td>
	                    </tr> -->
					</table>
					<!-- 페이징바 -->
					<div class="pageing-area">
						<ul id="pagingul"></ul>
					</div>
				</div>
			</div>

			<!-- ============================= 방명록 상세 ============================= -->
			<div class="board-detail">
				<!-- back 버튼 -->
				<img class="back-btn" src="../resource/img/icon/back2_btn.png">
				<div class="board-detail-title"></div>
				<div class="board-detail-area">
					<div class="board-detail-content">
 					<div class="board-detail-friend">
							<!-- <img class="friend-skin" src="../resource/img/user/skin2/fs.png">
							<div class="friend-id">swldml 노</div> -->
						</div>
						<div class="board-detail-table">
							<!-- <div class="detail-table-date">2023-03-22</div>
							<div class="detail-table-text">
							</div> -->
						</div>
					</div>
					<!-- 삭제 버튼 -->
					<button class="alert-toggle board-delete-btn button" id="board-delete">삭제</button>
				</div>
			</div>


<!-- ============================= 친구한테 쓴 방명록 리스트 ============================= -->
<!-- 리스트 전체조회 통합으로 일단 안써서 주석 -->
<!-- 			<div class="board-send-list">
				<img class="x-btn" src="../resource/img/icon/엑스 버튼.png">

				<div class="board-content">
					<table class="board-list-area">
						<tr class="board-send-list-tr">
 							<td id="board-title"><img class="apple"src="../resource/img/icon/사과.png">제목</td>
							<td class="board-date">2023-03-22</td>
						</tr>
					</table>
					<div id="writing-btn">
						<button class="button board-write-btn" id="board-write">글쓰기</button>
					</div>
					페이징바
					<div class="pageing-area">
						<ul id="pagingul"></ul>
					</div>
				</div>
			</div>
 -->
			<!-- ============================= 친구한테 쓴 방명록 상세 ============================= -->
			<div class="board-send-detail">
				<!-- back 버튼 -->
				<img class="back-btn" src="../resource/img/icon/back2_btn.png">
				<!-- 작성란 전체 감싼 form -->
				<div class="board-write-area" id="board-update-form">

					<!-- 제목부분(상세 제목이랑 동일) -->
					<div class='board-detail-title'>
						<input type='text' id='board-write-title' required maxlength="15" onclick='this.select();'>
					</div>

					<!-- 방명록 내용 작성부분 -->
					<!-- onclick="this.select();" : 클릭시 자동으로 선택됨 -->
					<textarea name='board-write-content' id='board-write-content' cols='62' rows='8' required>
					</textarea>

					<!-- 비밀글 체크박스 -->
					<div class='board-secret-box'>
						<input type="hidden" id="secret" name="secret">
						<input type='checkbox' id='board-ck' name="board-ck">
						<label for='board-ck'>비밀글</label>
					</div>

					<button type="button" class="button board-send-update-btn" onclick="updateBoard();">수정</button>
					<button class="alert-toggle board-send-delete-btn button" id="board-send-delete">삭제</button>

				</div>
			</div>
			<script>
			
			</script>

			<!-- ============================= 방명록 작성 ============================= -->
			<div class="board-write">
				<!-- back 버튼 -->
				<img class="back-btn" src="../resource/img/icon/back2_btn.png">
				<!-- 작성란 전체 감싼 form -->
				<div class="board-write-area" id="board-enroll-form">

					<!-- 제목부분(상세 제목이랑 동일) -->
					<div class="board-detail-title">
						<input type="text" id="board-write-title" required placeholder="제목을 입력해주세요" onclick="this.select();">
					</div>

					<!-- 방명록 내용 작성부분 -->
					<!-- onclick="this.select();" : 클릭시 자동으로 선택됨 -->
					<textarea name="board-write-content" id="board-write-content" cols="62" rows="8" required onclick="this.select();"></textarea>

					<!-- 비밀글 체크박스 -->
					<div class="board-secret-box">
						<input type="hidden" id="secret" name="secret">
						<input type='checkbox' id='board-ck' name="board-ck">
						<label for="board-ck">비밀글</label>
					</div>

					<button class="button board-write-btn">작성</button>

				</div>
			</div>
		</div>
	</div>

	<!-- ============================= 옷장, 상점 모달 ============================= -->
	<div class="closet-wrap">
		<!-- 옷장 상점 기본 베이스 배경 -->
		<img class="fur-img" src="../resource/img/icon/빈옷장.png"> <img
			class="coin-label-img" src="../resource/img/icon/라벨2.png"> <img
			class="coin-img" src="../resource/img/icon/coin.png">
		<!-- back 버튼 -->
		<img class="x-btn" src="../resource/img/icon/엑스 버튼.png">

		<div class="closet-modal">

			<!-- =============== 왼쪽 =============== -->
			<!-- 현재 스킨 -->
			<div class="view-skin">
				<img class="user-skin" src="../resource/img/user/skin1/fs.png">
			</div>

			<!-- 구입 버튼 -->
			<button class="closet-buy closet-btn" id="closet-buy">구입</button>
			<!-- 착용 버튼 -->
			<button class="closet-wear closet-btn" disabled>착용</button>


			<!-- =============== 오른쪽 =============== -->
			<!-- 내 코인 -->
			<div class="coin">16000</div>

			<!-- 옷장 버튼 -->
			<button class="dress-btn closet-btn">옷장</button>

			<!-- 상점 버튼 -->
			<button class="store-btn closet-btn">상점</button>

			<!-- 스킨 박스 -->
			<div class="closet-skins">
				<!-- 각각의 스킨박스(일단 정적으로 구현함 -> 추후 db에서 끌어와야됨) -->
				<div class="closet-item">

					<!-- 가격 or 보유중 라벨 -->
					<div class="closet-price">보유중</div>

					<!-- 스킨목록들 -->
					<div class="closet-skin">
						<img src="../resource/img/user/skin2/fs.png">
					</div>
				</div>

				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin3/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">보유중</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin4/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin5/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin6/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin7/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin8/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin9/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin10/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin11/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin12/fs.png">
					</div>
				</div>
				<div class="closet-item">
					<div class="closet-price">300</div>
					<div class="closet-skin">
						<img src="../resource/img/user/skin13/fs.png">
					</div>
				</div>
			</div>
		</div>

	</div>

	<!-- ============================= alert ============================= -->
	<div class="alert">
		<h3 id="alert-text"></h3>
		<div>
			<button class="button alert-ok" id="alert-ok">확인</button>
			<button class="button alert-cancel">취소</button>
		</div>
	</div>
	<div class="alert-overlay"></div>
	
	
	<script>
		/* 상단 스크립틀릿으로 받아온 roomMaster 값 사용하는 방법 */
<%-- 		let tree = function(){
			//방법1 스크립틀릿으로 정보 받아와서 함수 작성
			let roomMaster = <%= roomMaster%>;
			//방법2 쿠키/세션스토리지에 룸마스터 저장 -> 더 권장!
		  document.cookie = 'roomMaster='+ encodeURIComponent(roomMaster) + "; path=/mzone; expires=Session";
		}
 --%>		
	</script>

	<!-- <script src="../resource/js/myroom/myroom.js"></script> -->
	<script type="module" src="../resource/js/alert.js"></script>
	<script type="module" src="../resource/js/common.js"></script>
	<script src="../resource/js/myroom/boardMe.js"></script>

</body>
</html>