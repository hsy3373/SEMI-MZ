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
						<td class="myroom-board-title">
							<img class="apple" src="../resource/img/icon/사과.png">
							안녕하세요안녕하세요안녕하세요안녕하세요
						</td>
						<td class="myroom-board-user">노지의</td>
					</tr>
					<tr>
						<td class="myroom-board-title">
							<img class="apple" src="../resource/img/icon/사과.png">
							안녕하세요안녕하세요안녕하세요안녕하세요
						</td>			
						<td class="myroom-board-user">노지의노지의노</td>
					</tr>
					<tr>
						<td class="myroom-board-title">
							<img class="apple" src="../resource/img/icon/사과.png">
							안녕하세요안녕하세요안녕하세요안녕하세요
						</td>
						<td class="myroom-board-user">노지의노지의노</td>
					</tr>
					<tr>
						<td class="myroom-board-title">
							<img class="apple" src="../resource/img/icon/사과.png">
							안녕하세요안녕하세요안녕하세요안녕하세요
						</td>
						<td class="myroom-board-user">노지의노지의노</td>
					</tr>
				</table>
			</div>
        </div>
		<!-- 마이룸 주인 스킨 -->
        <div class="myroom_user">
			<!-- 호감도 -->
			<input type="checkbox" name="heart-ck" id="heart">
            <label class="font" for="heart">12</label>

            <img class="user-skin" src="../resource/img/user/skin1/fs.png">
        </div>

		<!--버튼 모달 jps 가져옴 : 노지의-->
		<!-- <%@ include file="./buttonListMyroom.jsp" %> -->
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
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">방명록제목열다섯글자가나다라마</td>
	                        <td class="board-userid">내닉네임여덜글자</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">내닉네임여덜글자</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">내닉네임여덜글자</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">내닉네임여덜글자</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">내닉네임여덜글자</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">내닉네임여덜글자</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-userid">내닉네임여덜글자</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	
	                </table>
	                <!-- 페이징바 -->
	                <div class="pageing-area">
						페이징바
					</div>
	            </div>
	        </div>
	        
			<!-- ============================= 방명록 상세 ============================= -->
			<div class="board-detail">
				<!-- back 버튼 -->
				<img class="back-btn" src="../resource/img/icon/back2_btn.png">
				<div class="board-detail-title">가나다라마바사아자차카타파하가</div>
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
					<button class="alert-toggle board-delete-btn button" id="board-delete" >삭제</button>
				</div>
			</div>  

			
			<!-- ============================= 친구한테 쓴 방명록 리스트 ============================= -->
			<div class="board-send-list">
				<img class="x-btn" src="../resource/img/icon/엑스 버튼.png">
				
	            <div class="board-content">
	                <table class="board-list-area">
	                    <tr>
	                        <td colspan="2" id="writing-btn"><button class="button board-write-btn" id="board-write">글쓰기</button></td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	                    <tr>
	                        <td id="board-title"><img class="apple" src="../resource/img/icon/사과.png">제목</td>
	                        <td class="board-date">2023-03-22</td>
	                    </tr>
	
	                </table>
	                <!-- 페이징바 -->
	                <div class="pageing-area">
						페이징바
					</div>
	            </div>
			</div>
			
			<!-- ============================= 친구한테 쓴 방명록 상세 ============================= -->
			<div class="board-send-detail">
				<!-- back 버튼 -->
				<img class="back-btn" src="../resource/img/icon/back2_btn.png">
				<!-- 작성란 전체 감싼 form -->
				<form action="<%= contextPath %>/update.bo" class="board-write-area" id="board-update-form" method="post" >
				
					<!-- 제목부분(상세 제목이랑 동일) -->
					<div class="board-detail-title">
						<input type="text" id="board-write-title" required value="tererfdsf" onclick="this.select();" >
					</div>
	
					<!-- 방명록 내용 작성부분 -->
					<!-- onclick="this.select();" : 클릭시 자동으로 선택됨 -->
					<textarea name="board-write-content" id="board-write-content" cols="62" rows="8" required>
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
					</textarea>
					
					<!-- 비밀글 체크박스 -->
					<div class="board-secret-box">
						<input type="checkbox" id="board-ck">
						<label for="board-ck">비밀글</label>
					</div>
				
					<button class="button board-send-update-btn">수정</button>
					<button class="alert-toggle board-send-delete-btn button" id="board-send-delete">삭제</button>

				</form>
			</div>
			
			<!-- ============================= 방명록 작성 ============================= -->
			<div class="board-write">
				<!-- x 버튼 -->
				<img class="x-btn" src="../resource/img/icon/엑스 버튼.png">
				<!-- 작성란 전체 감싼 form -->
				<form action="<%= contextPath %>/insert.bo" class="board-write-area" id="board-enroll-form" method="post" >
					
					<!-- 제목부분(상세 제목이랑 동일) -->
					<div class="board-detail-title">
						<input type="text" id="board-write-title" required placeholder="제목을 입력해주세요" onclick="this.select();" >
					</div>

					<!-- 방명록 내용 작성부분 -->
					<!-- onclick="this.select();" : 클릭시 자동으로 선택됨 -->
					<textarea name="board-write-content" id="board-write-content" cols="62" rows="8" required onclick="this.select();"></textarea>
					
					<!-- 비밀글 체크박스 -->
					<div class="board-secret-box">
						<input type="checkbox" id="board-ck">
						<label for="board-ck">비밀글</label>
					</div>
				
					<button class="button board-write-btn">작성</button>

				</form>
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


	<script src="../resource/js/myroom.js"></script>
    <script type="module" src="../resource/js/alert.js"></script>
    <script type="module" src="../resource/js/common.js"></script>
</body>
</html>