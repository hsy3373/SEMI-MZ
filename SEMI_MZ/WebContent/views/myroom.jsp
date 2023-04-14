<!-- 지의 마이룸 -->
<%@ page import="mz.member.model.vo.Member" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String contextPath = request.getContextPath();
	/* 
		광장에 있는 마이룸으로 들어올시 roomMaster값 null
		친구유저 클릭으로 들어올시	 roomMaster값 친구아이디(정적으로 friend 넣어둠)
	*/
	// roomMaster == 친구아이디
	String roomMaster = (String)request.getAttribute("roomMaster");
	// session에 있는 로그인 유저
	Member loginUser = (Member)request.getSession().getAttribute("loginUser");
	//System.out.println("jsp roomMaster : "+roomMaster);
	//System.out.println("jsp loginUser : "+loginUser);

%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<c:set var="contextPath" value="<%= request.getContextPath() %>" />
<!-- css link -->
<link href="${contextPath}/resource/css/common.css" rel="stylesheet" type="text/css">
<link href="${contextPath}/resource/css/myroom.css" rel="stylesheet" type="text/css">
<link href="${contextPath}/resource/css/board.css" rel="stylesheet" type="text/css">
<link href="${contextPath}/resource/css/closet.css" rel="stylesheet" type="text/css">
<link href="${contextPath}/resource/css/alert.css" rel="stylesheet">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<style>

</style>
<title>M-Zone</title>
</head>
</head>
<body>

	<!-- ============================= 마이룸 ============================= -->
	<div class="myroom">
 	<%@ include file="chatting.jsp" %>

		<!-- 옷장 클릭시 모달창 -->
		<div class="icon-closet">
	 		<img id="closet" src="${contextPath}/resource/img/icon/옷장.png">
		</div>
		<!-- 나무 클릭시 모달창 -->
		<div class="icon-tree">
			<img id="tree" src="${contextPath}/resource/img/icon/tree.png">

			<!-- 방명록 내용 나무에 표시 -->
			<div class="myroom-board">
				<table class="myroom-board-list">
<%-- 					<tr>
						<td class="myroom-board-title">
						<img class="apple" src="${contextPath}/resource/img/icon/사과.png"></td>
						<td class="myroom-board-user"></td>
					</tr> --%>
				</table>
			</div>
		</div>
		<!-- 마이룸 주인 스킨 -->
		<div class="myroom_user">
			<!-- 호감도 -->
			<div class="my-heart">
				<!-- 하트이미지 -->
				<div class="my-heart-img">
					<img id="my-heart-off" alt="호감도 상태" src="${contextPath}/resource/img/icon/빈하트.png">
					<img id="my-heart-on" alt="호감도 상태" src="${contextPath}/resource/img/icon/하트2.png">
				</div>
				<!-- 호감도 갯수 -->
				<div class="my-heart-num"></div>
			</div>
			<c:choose>
				<c:when test="${empty roomMaster}">
					<img class="user-skin" src="${contextPath}/resource/img/user/skin<%= loginUser.getSkinId() %>/fs.png">
				</c:when>
				<c:otherwise>
					<!-- 친구스킨 표현해줘야함 closet.js 에서 처리 -->
					<img class="friend-skin">
					<div class="out-friend-id"></div>
				</c:otherwise>
			</c:choose>
		</div>

		<!--버튼 모달 jps 가져옴 -->
		<div class="button-area">
			<div class="squareGo" onclick="gosquare();">
				<img src="resource/img/icon/home_btn.png">
			</div>
			<%@ include file="./buttonList.jsp"  %>
		</div>
		
	</div>
	
	<!-- ============================= 방명록 모달 ============================= -->
	<div class="board-wrap">
		<div class="board-modal">
			<!-- ============================= 방명록 리스트 ============================= -->
			<div class="board-list">
				<img class="x-btn" src="${contextPath}/resource/img/icon/엑스 버튼.png">
				<div class="board-content">
					<table class="board-list-area">
						<!-- boardList 로 조회해옴 -->
<!-- 	                <tr>
	                        <td id="board-title"><img class="apple" src="${contextPath}/resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">유저2</td>
	                        <td class="board-date">2023-03-25</td>
	                    </tr> -->
					</table>
					<div id="writing-btn" style="display: none;">
						<button class="button board-write-btn" id="boardWrite" >글쓰기</button>
					</div>
					<!-- 페이징바 -->
					<div class="pageing-area">
						<ul id="pagingul"></ul>
					</div>
				</div>
			</div>
			<!-- ============================= 방명록 상세 ============================= -->
			<div class="board-detail">
				<!-- back 버튼 -->
				<img class="back-btn" src="${contextPath}/resource/img/icon/back2_btn.png">
				<div class="board-no" style="display: none;"></div>
				<div class="board-detail-title"></div>
				<div class="board-detail-area">
					<div class="board-detail-content">
 					<div class="board-detail-friend">
							<!-- <img class="friend-skin" src="${contextPath}/resource/img/user/skin2/fs.png">
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

			<!-- ============================= 친구한테 쓴 방명록 상세 ============================= -->
			
			<div class="board-send-detail">
				<!-- back 버튼 -->
				<img class="back-btn" src="${contextPath}/resource/img/icon/back2_btn.png">
				<!-- 작성란 전체 감싼 -->
				<div class="board-write-area" id="board-update-form">
					<div class="board-no" style="display: none;"></div>
					<div class="board-write-id" style="display: none;"></div>
					<!-- 제목부분(상세 제목이랑 동일) -->
					<div class='board-detail-title'>
						<input type='text' class='board-write-title' maxlength="15">
					</div>

					<!-- 방명록 내용 작성부분 -->
					<!-- onclick="this.select();" : 클릭시 자동으로 선택됨 -->
					<textarea name='board-write-content' class='board-write-content' cols='62' rows='8'>
					</textarea>

					<!-- 비밀글 체크박스 -->
					<div class='board-secret-box'>
						<input type="hidden" id="secret" name="secret">
						<input type='checkbox' id='board-ck' name="board-ck">
						<label for='board-ck'>비밀글</label>
					</div>

					<button type="button" class="button board-send-update-btn" id="board-send-update" disabled>수정</button>
					<button class="alert-toggle board-send-delete-btn button" id="board-send-delete">삭제</button>

				</div>
			</div>

			<!-- ============================= 방명록 작성 ============================= -->
			<div class="board-write">
				<!-- back 버튼 -->
				<img class="back-btn" src="${contextPath}/resource/img/icon/back2_btn.png">
				<!-- 작성란 전체 감싼 form -->
				<div class="board-write-area" id="board-enroll-form">

					<!-- 제목부분(상세 제목이랑 동일) -->
					<div class="board-detail-title">
						<input type="text" class="board-write-title"  maxlength="15" required placeholder="제목을 입력해주세요" onclick="this.select();">
					</div>

					<!-- 방명록 내용 작성부분 -->
					<!-- onclick="this.select();" : 클릭시 자동으로 선택됨 -->
					<textarea name="board-write-content" class="board-write-content" cols="62" rows="8" required placeholder="내용을 입력해주세요" onclick="this.select();"></textarea>

					<!-- 비밀글 체크박스 -->
					<div class="board-secret-box">
						<input type="hidden" id="secret" name="secret">
						<input type='checkbox' id='board-ck' name="board-ck">
						<label for="board-ck">비밀글</label>
					</div>

					<button class="button board-write-btn" id="boardInsert">작성</button>

				</div>
			</div>
		</div>
	</div>

	<!-- ============================= 옷장, 상점 모달 ============================= -->
	<div class="closet-wrap">
		<!-- 옷장 상점 기본 베이스 배경 -->
		<div class="closet-fur">
			<img class="fur-img" src="${contextPath}/resource/img/icon/빈옷장.png">
			<!-- 페이징 -->
			<!-- 옷장 페이징 -->

			<!-- 상점페이징 -->
			<div class="pageing-closet">
				<ul id="store-pg"></ul>
			</div>

		</div>
		<img class="coin-label-img" src="${contextPath}/resource/img/icon/라벨2.png">
		<img class="coin-img" src="${contextPath}/resource/img/icon/coin.png">
		<!-- back 버튼 -->
		<img class="x-btn" src="${contextPath}/resource/img/icon/엑스 버튼.png">
		
		<div class="closet-modal">

			<!-- =============== 왼쪽 =============== -->
			<!-- 현재 스킨 -->
			<div class="view-skin">
				<img class="user-skin" src="${contextPath}/resource/img/user/skin<%= loginUser.getSkinId() %>/fs.png">
			</div>
			<!-- 구입 버튼 -->
			<button class="closet-btn-frame closet-buy" id="closet-buy">구입</button>
			<!-- 착용 버튼 -->
			<button class="closet-btn-frame closet-wear" disabled>착용</button>


			<!-- =============== 오른쪽 =============== -->
			<!-- 내 코인 : 로그인유저의 코인 -->
			<div class="coin"><%= loginUser.getCoin() %></div>
			
			<!-- 옷장 버튼 -->
			<button class="closet-btn-frame dress-btn">옷장</button>

			<!-- 상점 버튼 -->
			<button class="closet-btn-frame store-btn">상점</button>

			<!-- 스킨 박스 -->
			<!-- 옷장 박스 -->
			<div class="closet-skins">
			</div>
			<!-- 상점박스 -->
			<div class="store-skins">
			</div>
		</div>
	</div>

	<!-- ============================= alert ============================= -->
	<!-- confirm -->
	<div class="alert">
		<h3 id="alert-text"></h3>
		<div>
			<button class="button alert-ok" id="alert-ok">확인</button>
			<button class="button alert-cancel">취소</button>
		</div>
	</div>
	<div class="alert-overlay"></div>
	
	
	<!-- alert(확인만 있음) -->
	<div class="home-alert">
		<h3 id="home-alert-text"></h3>
		<div>
			<button class="button home-alert-ok">확인</button>
		</div>
	</div>
	<div class="home-alert-overlay"></div>

	<script>
		/* 광장으로 가는 버튼 */
		function gosquare() {
			location.href = "${contextPath}/forwarding.sq";
		};
		
		/* 로그인유저, 방주인 js에서 사용하기 위해 변수에 담기 */
		var loginUserId = '${loginUser.userId}';
		var loginUserSkinId = '${loginUser.skinId}';
		var loginUserCoin = '${loginUser.coin}';
		var roomMasterId = "${roomMaster}";
	</script>
	

	<%-- <script type="module" src="${contextPath}/resource/js/common.js"></script> --%>
	<script type="module" src="${contextPath}/resource/js/alert.js"></script>
	<script type="module" src="${contextPath}/resource/js/homeAlert.js"></script>
	<script type="module" src="${contextPath}/resource/js/myroom/myroom.js"></script>
	<script type="module" src="${contextPath}/resource/js/myroom/board.js"></script>
	<script type="module" src="${contextPath}/resource/js/myroom/closet.js"></script>
	<script type="module" src="${contextPath}/resource/js/buttonList.js"></script>
	
	<!-- 유저정보창 최상단에 띄워야됨 -->
	<%@ include file="./userInfo.jsp" %>
</body>
</html>