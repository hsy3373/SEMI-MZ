<!-- 지의 마이룸 -->
<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<c:set var="contextPath" value="<%= request.getContextPath() %>"/>
	<!-- css link -->
    <link href="../resource/css/myroom.css" rel="stylesheet" type="text/css">
    <link href="../resource/css/common.css" rel="stylesheet" type="text/css">
    <link href="../resource/css/board.css" rel="stylesheet" type="text/css">
	<link href="../resource/css/closet.css" rel="stylesheet" type="text/css">
    <!-- <link href="../resource/css/closet.css" rel="stylesheet" type="text/css"> -->
    <link rel="stylesheet" href="../resource/css/alert.css">
    
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>    
	<!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    
    

    

<title>My Room</title>
</head>
</head>
<body>
	<!-- ============================= 마이룸 ============================= -->
    <div class="myroom">
        <div class="icon-closet">
            <!-- 옷장 클릭시 모달창 -->
	        <img id="closet" src="../resource/img/icon/옷장.png">
	        <img id="closet-hover" src="../resource/img/icon/옷장_hover.png">
        </div>
        <div class="icon-tree">
            <!-- 나무 클릭시 모달창 -->
            <img id="tree" src="../resource/img/icon/tree.png">
            <img id="tree-hover" src="../resource/img/icon/tree_hover.png">
        </div>
        <div class="myroom_user">
            <input type="checkbox" name="heart-ck" id="heart">
            <label class="font" for="heart">12</label>
            <img class="user-skin" src="../resource/img/user/skin1/fs.png">
        </div>
		<button class="alert-toggle board-delete-btn2 button" id="test1">수정</button>
		<button class="alert-toggle board-delete-btn button" id="test2" >삭제</button>
    </div>
	
	<!-- ============================= 방명록 모달 ============================= -->
	<div class="board-wrap">
		<div class="board-modal">
			<!-- ============================= 방명록 리스트 ============================= -->
	        <div class="board-list">
	            <img class="x-btn" src="../resource/img/icon/엑스 버튼.png">
	            <div class="board-content">
	                <table class="board-list-area">
	                    <tr>
	                        <td id="board-title"><img id="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">노지의노지의노</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img id="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">노지의노지의노</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img id="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">노지의노지의노</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img id="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">노지의노지의노</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img id="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">노지의노지의노</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img id="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">노지의노지의노</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img id="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">노지의노지의노</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	
	                </table>
	                <!-- 페이징바 -->
	                <div class="pageing-area"></div>
	            </div>
	        </div>
	        
			<!-- ============================= 방명록 상세 ============================= -->
			<div class="board-detail">
				<!-- back 버튼 -->
				<img class="back-btn" src="../resource/img/icon/back2_btn.png">
				<div class="board-detail-title">방명록제목작성페이지안녕하세요</div>
				<div class="board-detail-area">
				    <div class="board-detail-content">
				        <div class="board-detail-friend">
			                <img class="friend-skin" src="../resource/img/user/skin2/fs.png">
				            <div class="friend-id">swldml 노</div>
				        </div>
				        <div class="board-detail-table">
				            <div class="detail-table-date">2023-03-22</div>
				            <div class="detail-table-text">
				                원질이 가장 꽃이 끓는다.
				                열락의 풍부하게 실현에 가슴에 심장은 위하여서,
				                너의 그들의 못하다 있는가? 보는 있는 따뜻한 꽃이 위하여서.
				                가진 그들의 같이 놀이 안고, 되려니와, 길지 풀이 인류의 힘있다.
				                찾아 않는 그와 온갖 밝은 실로 것이다.
				                곳으로 힘차게 황금시대의 이상이 품었기 있으랴?
				                이상의 방황하였으며, 옷을 수 듣는다. 청춘을 위하여서,
				                설산에서 온갖 아름다우냐? 인간이 구하지 얼음 뿐이다.
				                같은 있을 것이다.보라, 어디 있는 따뜻한 날카로우나 보라.
				                산야에 있는 미묘한 어디 살 희망의 것이다.
				                
				                얼마나 곧 긴지라 청춘의 구할 살 든 그것은 이상은 있다.
				                열매를 커다란 보이는 품에 광야에서 그리하였는가?
				                놀이 얼음과 이 열락의 우는 있는 것이다.
				                위하여 고행을 그들의 힘있다.
				                지혜는 이것을 심장의 같이, 같이 있는 그러므로 바이며, 목숨이 있다.
				                그들을 풀이 스며들어 것이다.보라, 위하여서.
				                않는 동산에는 힘차게 끓는 열락의 앞이 일월과 것이다.
				                힘차게 모래뿐일 가슴에
				            </div>
				        </div>
				    </div>
			    	<!-- 삭제 버튼 -->
					<!-- <button class="alert-toggle board-delete-btn button" id="test2" >삭제</button> -->
				</div>
			</div>  


			<!-- ============================= 방명록 작성 ============================= -->
			<div class="board-write">
				<!-- x 버튼 -->
				<img class="x-btn" src="../resource/img/icon/엑스 버튼.png">
				<!-- 제목부분(상세 제목이랑 동일) -->
				<div class="board-detail-title">방명록제목작성페이지안녕하세요</div>
				<!-- 작성란 전체 감싼 div -->
				<div class="board-write-area">
					<!-- 방명록 작성란 -->
					<!-- onclick="this.select();" : 클릭시 자동으로 선택됨 -->
					<textarea name="board-write-content" id="board-write-content" cols="62" rows="8" onclick="this.select();"></textarea>
					<!-- 비밀글 체크박스 -->
					<div class="board-write-ck">
						<input type="checkbox" id="board-ck">
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
        <img class="fur-img" src="../resource/img/icon/빈옷장.png">
        <img class="coin-label-img" src="../resource/img/icon/라벨2.png">
        <img class="coin-img" src="../resource/img/icon/coin.png">
		<!-- back 버튼 -->
		<img class="x-btn" src="../resource/img/icon/엑스 버튼.png">

        <div class="closet-modal">
			<img class="user-skin" id src="../resource/img/user/skin1/fs.png">
            <!-- 잔여 코인 -->
            <div class="coin">
                <p class="coin-text font">16000</p>
            </div>
			<div>
				<div id="1"></div>
				<div id="2"></div>
				<div id="3"></div>
				<div id="4"></div>
				<div id="5"></div>
				<div id="7"></div>
			</div>
        </div>
		<div class="store-modal">

		</div>
        
	</div>

	<!-- ============================= alert ============================= -->
	<div class="alert">
		<!--  id="alert-hidden" -->
		<h3 id="alert-text"></h3>
		<div>
			<button class="button alert-ok" id="alert-ok">확인</button>
			<button class="button alert-cancel">취소</button> 
		</div>
	</div>
	<div class="alert-overlay"></div>

	<!-- alert script -->
    <script type="module" src="../resource/js/alert.js"></script>


	<script src="../resource/js/myroom.js"></script>
    <script type="module" src="../resource/js/common.js"></script>

</body>
</html>