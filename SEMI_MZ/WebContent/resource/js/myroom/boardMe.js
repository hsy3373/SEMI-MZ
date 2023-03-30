/**
 * 작성자 : 노지의
 * 내 방명록 + 페이징바
 */

/* chatData.js -> import 참고해서 작업 */
// let roomMaster = Common.getCookie("roomMaster");

function getContextPath(){
	let hostIndex = location.href.indexOf(location.host) + location.host.length;
	let contextPath = location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1));
	return contextPath;
}

// 페이징 처리 준비
let listCount;				// 현재 게시판의 총 게시글 갯수
let boardLimit = 6; 		// 한 페이지에 나타낼 게시글 수
let pageLimit = 5; 			// 페이지 하단에 보여질 페이징바의 페이지 최대 갯수(패이지 목록들 몇개단위로 출력할건지)
let globalCurrentPag = 1; 	// 현재 페이지(사용자가 요청한 페이지)
let BoardList = []; 		// 표시하려하는 방명록 리스트
let maxPage; 				// 가장 마지막 페이지가 몇번 페이지인지(총 페이지 수)
let startPage; 				// 페이지 하단에 보여질 페이징바의 시작 수
let endPage; 				// 페이지 하단에 보여질 페이징바의 끝 수

$(function(){
	/* 방명록 모달창(공통) */
    $.boardModal = function(){
	    $(".board-wrap").show();
	    $(".board-modal").show();
	    $(".board-detail").hide();
	    $(".board-send-list").hide();
	    $(".board-send-detail").hide();
	    $(".board-write").hide();
    };

    /* x버튼 or 바깥 클릭시 모달창 사라짐 */
    $("body").on("click", function(e) {
        //c onsole.log(e.target);
        if(e.target.className == 'x-btn' || e.target.className == 'board-wrap'){
            $(".board-wrap").hide(); // 방명록 모달 닫힘 
            $(".closet-wrap").hide(); // 옷장 모달 닫힘
        }
    });
	

    /* 나무아이콘 클릭 -> 방명록 리스트 */
    $(".icon-tree").click(function(e){
		// 공통으로 떠야되는 모달 배경
        $.boardModal();
		

		// 방주인 value값 얻어서 넣기
		// -> 방주인의 value값에 따라서 보여지는 화면 구성 달라짐
		// 로그인한 아이디는 session영역에 담아놨고,
		// 친구들은 각각의 아이디값을 session 스토리즈 담아놨음
		
		selectboardList('test');
		



    });


	
}); 

/* =================================== 방명록 리스트 조회 함수 =================================== */
// ★ receive_id 값에 따라 보여지는 화면구성이 다름!
// 마이룸 방문시
// receive_id('test') == 현재 로그인한 아이디('test')
 
// 다른방 방문시
// receive_id == (방주인 아이디 == 받은사람) && USER_ID == (현재 로그인한 아이디 == 작성자) &&  
function selectboardList( receiveID ){
 	$(".board-list").show();

	let path = getContextPath();
	$.ajax({ // ajax로 데이터 가져오기
		url : path + "/selectBoardList",
		dataType: "json",
		data : { receive : receiveID },
		success : function(list){
			//listCount(총 게시글 수)
			listCount = list.length;
			// 방명록리스트 배열에 담기
			
			for(let i = 0; i < list.length; i++){
				BoardList.push({ boardNo 	: list[i].boardNo,
								 userId 	: list[i].userId,
								 receiveId  : list[i].receiveId,
			                	 boardTitle : list[i].boardTitle,
			                	 createDate : list[i].createDate})}
			//console.log(BoardList);
			//글 목록 표시 호출 (테이블 생성)
			displayData(1, boardLimit);
			
			//페이징 표시 호출
			paging(listCount, boardLimit, pageLimit, 1);	
		}
	});
};

/* =================================== 글 목록 표시 함수 =================================== */
// 현재 페이지(currentPage)와 페이지당 글 개수(boardLimit) 반영
function displayData(currentPage, boardLimit) {
	
	let str = "";
	//Number로 변환하지 않으면 아래에서 +를 할 경우 스트링 결합이 되어버림.. 
	currentPage = Number(currentPage);
	boardLimit = Number(boardLimit);
  
	let maxpnum = (currentPage - 1) * boardLimit + boardLimit; ///추가
	if(maxpnum > listCount) {maxpnum = listCount;} //추가
	
	
	//console.log(BoardList[0].receiveId);
	for (let i = (currentPage - 1) * boardLimit; i < maxpnum; i++) {
		// BoardList[0].receiveId == 방주인 == 로그인아이디
		if(BoardList[0].receiveId == 'test'){
			str += "<tr>"
			       + "<td id='board-title'><img class='apple' src='../resource/img/icon/사과.png'>" + BoardList[i].boardTitle + "</td>"
			       + "<td id='board-no' style='display: none;'>" + BoardList[i].boardNo + "</td>"
			       + "<td class='board-userid'>" + BoardList[i].userId + "</td>"
			       + "<td class='board-date'>" + BoardList[i].createDate + "</td>"
				+"</tr>";
		} else { // BoardList[0].receiveId == 'friend'
			str += "<tr>"
			       + "<td id='board-title'><img class='apple' src='../resource/img/icon/사과.png'>" + BoardList[i].boardTitle + "</td>"
			       + "<td id='board-no' style='display: none;'>" + BoardList[i].boardNo + "</td>"
			       + "<td class='board-date'>" + BoardList[i].createDate + "</td>"
				+"</tr>";
		}
  	}
  	$(".board-list .board-list-area").html(str);
}

/* =================================== 페이징 표시 함수 =================================== */
function paging(listCount, boardLimit, pageLimit, currentPage) {
	//console.log("currentPage : " + currentPage);
	
	maxPage = Math.ceil(listCount / boardLimit); //총 페이지 수

	if(maxPage < pageLimit){
		pageLimit=maxPage;
	}
	let pageGroup = Math.ceil(currentPage / pageLimit); // 페이지 그룹
	let endPage = pageGroup * pageLimit; //화면에 보여질 마지막 페이지 번호

	if (endPage > maxPage) {
		endPage = maxPage;
	}

	let startPage = parseInt((currentPage-1) / 5) * 5 +1;  //화면에 보여질 첫번째 페이지 번호
	
	let next = endPage + 1;
	let prev = startPage - 1;

	let pageHtml = "";

	if (prev > 0) {
	  pageHtml += "<li><a href='#' id='prev'> &lt; </a></li>";
	}

	//페이징 번호 표시 
	for (let i = startPage; i <= endPage; i++) {
		if (currentPage == i) {
			pageHtml += "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
		} else {
			pageHtml += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
		}
	}
	if (endPage < maxPage) {
		pageHtml += "<li><a href='#' id='next'> &gt; </a></li>";
}

$("#pagingul").html(pageHtml);

//페이징 번호 클릭 이벤트 
$("#pagingul li a").click(function () {
	let $id = $(this).attr("id");
	selectedPage = $(this).text();
	
	if ($id == "next") selectedPage = next;
	if ($id == "prev") selectedPage = prev;
	
	//전역변수에 선택한 페이지 번호를 담는다...
	globalCurrentPage = selectedPage;
	//페이징 표시 재호출
	paging(listCount, boardLimit, pageLimit, selectedPage);
	//글 목록 표시 재호출
	displayData(selectedPage, boardLimit);
	});
};
/* ====================================================================================== */

$(function(){
/* ================================== 방명록 상세 조회 =================================== */
	$(document).on("click", ".board-list tr" , function(){
		console.log("상세조회시 접속아이디 : "+BoardList[0].receiveId); // 접속아이디
		
		let path = getContextPath();
		
		if(BoardList[0].receiveId == 'test'){
			
		    $(".board-list").hide();
		    $(".board-detail").show();
		    
			// 방명록 번호
			let boardNo = $(this).children("#board-no").text();
			console.log(boardNo);
			
			/* 방명록 상세 조회 */
			$.ajax({
				url : path+"/selectBoard" ,
				data : { boardNo : boardNo } ,
				success : function(b){
					// 제목
					title = b.boardTitle;
					
					// 유저스킨
					skin = "";
					skin += "<img class='friend-skin' src=''>"
						  + "<div class='friend-id'>" + b.receiveId + "</div>";
					
					// 방명록 내용
					content = "";
					content += "<div class='detail-table-date'>" + b.createDate + "</div>"
							 + "<div class='detail-table-text'>" + b.boardContent + "</div>";
					
					// 해당 클래스에 내용 추가
					$(".board-detail-title").html(title);
					$(".board-detail-friend").html(skin);
					$(".board-detail-table").html(content);
					
				},
				error : function(){
					console.log("실패")
				}
			});
		}else{
		    $(".board-wrap").show();
	    	$(".board-modal").show();
        	$(".board-list").hide();
			$(".board-send-detail").show();
		
			// ★★★★★★★★★★★★★★★ 방명록 리스트 처리되면 위에 코드 안으로 넣어줘야됨(코드 넣기전 테스트 완료) ★★★★★★★★★★★★★★★
			// 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
			$("#board-ck").change(function(){
				if(this.checked){
					$(this).attr("value", 'Y');
				}else{
					$(this).attr("value", 'N');
				}
			});
		
			
			let BoardNo = $(this).children("#board-no").text();
			//console.log("friend로 접속 : "+BoardNo);
			$.ajax({
				type : 'post',
				url : path+"/selectSendBoard",
				data : {boardNo : BoardNo},
				success : function(b){
					
					// 제목, 내용
					title = $("#board-write-title").val(b.boardTitle);
					content = b.boardContent;
					
					$(".board-detail-title").html(title);
					$("#board-write-content").html(content);
					console.log("비밀글 조회시 체크상태 : " + b.secret);
					// 비밀글 체크상태
					if(b.secret == 'Y'){
						$("#board-ck").prop("checked", true);
					}else{
						$("#board-ck").prop("checked", false);
					}
				},
				error : function(e){
					console.log(e);
				}
	
			});
		}
			
		
	})
	
	/* 방명록 상세:back-btn 클릭 -> 방명록 리스트 */
    $(".board-detail .back-btn").click(function(){
        $(".board-detail").hide();
        $(".board-list").show();
    });

    /* 친구한테 쓴 방명록 상세:back-btn 클릭 -> 친구한테 쓴 방명록 리스트 */
    $(".board-send-detail .back-btn").click(function(){
        $(".board-send-detail").hide();
        $(".board-list").show();
    });


	
});





/* ================================= 친구네룸 - 내가 쓴 방명록 수정 ================================= */
function updateBoard(){

	// 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
	$("#board-ck").change(function(){
		if(this.checked){
			$(this).attr("value", 'Y');
		}else{
			$(this).attr("value", 'N');
		}
	});
	
	let path = getContextPath();
	$.ajax({
		type : 'post',
		url : path + "/updateBoard",
		data : {
			boardNo : 69,
			boardTitle : $(".board-send-detail #board-write-title").val(),
			boardContent : $("#board-write-content").val(),
			secret : $("#board-ck").prop("checked") ? "Y" : "N"
		},
		success : function(b){
			console.log(b);
		},
		error : function(e){
			console.log(e);
		}
	});


};
/* ====================================================================================== */