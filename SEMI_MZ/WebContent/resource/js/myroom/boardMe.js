/**
 * 작성자 : 노지의
 * 내 방명록 + 페이징바
 */
function getContextPath(){
	let hostIndex = location.href.indexOf(location.host) + location.host.length;
	let contextPath = location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1));
	return contextPath;
}

// 페이징 처리 준비
let listCount;				// 현재 게시판의 총 게시글 갯수
let boardLimit = 7; 		// 한 페이지에 나타낼 게시글 수
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

        /* -------- 내 마이룸에서 보게될 화면 -------- */
		// 방명록 리스트 조회
		
		
		selectboardList('friend');
		
		/* -------- 친구네 집에서 보게될 화면 -------- */
		// $(".board-send-list").show();
		// 내가 쓴 방명록 리스트 조회
		// ★ 로그인한 내 아이디 == BOARD(USER_ID)가 동일한 값을 가져와야됨
		
    });










    
	/* ==================== 방명록 상세 조회 ==================== */
    /* 방명록 리스트 중 해당 게시글 클릭 -> 방명록 상세 */
    $(document).on("click", ".board-list tr" ,function(){
	    $(".board-list").hide();
	    $(".board-detail").show();
	    
		let path = getContextPath();
	
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
		})

    });

    /* 방명록 상세:back-btn 클릭 -> 방명록 리스트 */
    $(".board-detail .back-btn").click(function(){
        $(".board-detail").hide();
        $(".board-list").show();
    });
	
	
	/* ==================== 친구네룸 - 내가 쓴 방명록 상세 조회 ==================== */
	$(document).on('click', '.board-send-list .board-send-list-tr', function(){
        $(".board-send-detail").show();
        $(".board-send-list").hide();


	});
	
	
	
	// let BoardNo = $(this).children("#board-no").text();
	let path = getContextPath();
	
	$.ajax({
		url : path+"/selectSendBoard",
		data : {boardNo : 25},
		success : function(b){
			//console.log(b);
		},
		error : function(e){
			//console.log(e);
		},
		complete : function(){
			//console.log("접속 성공")
		}
	});

	
	
}); // 전체틀 닫는거

/* ==================== 방명록 리스트 조회 함수 ==================== */
// ★ 내가 받은 방명록만 조회해와야됨
// 현재 로그인한 아이디('test') == receive_id('test')
// receive_id == 현재 로그인한 아이디
 
// 다른방 방문시
// USER_ID == (현재 로그인한 아이디 == 작성자) &&  receive_id == (방주인 아이디 == 받은사람)
function selectboardList( receiveID ){
	console.log("불렸니???");
	
	
 	$(".board-list").show();

	let path = getContextPath();
	$.ajax({ // ajax로 데이터 가져오기
		url : path + "/selectBoardList",
		dataType: "json",
		data : { receive : receiveID },
		success : function(list){
			console.log(list);
			//listCount(총 게시글 수)
			listCount = list.length;

			// 방명록리스트 배열에 담기
			for(let i = 0; i < list.length; i++){
				BoardList.push({ boardNo:list[i].boardNo,
								 userId:list[i].receiveId,
			                	 boardTitle:list[i].boardTitle,
			                	 createDate: list[i].createDate})}
			console.log(BoardList);
			//글 목록 표시 호출 (테이블 생성)
			displayData(1, boardLimit);
		
			//페이징 표시 호출
			paging(listCount, boardLimit, pageLimit, 1);	
		}
	});
};

// 글 목록 표시 함수 (마이룸일때)
// 현재 페이지(currentPage)와 페이지당 글 개수(boardLimit) 반영
function displayData(currentPage, boardLimit) {

	let str = "";
	//Number로 변환하지 않으면 아래에서 +를 할 경우 스트링 결합이 되어버림.. 
	currentPage = Number(currentPage);
	boardLimit = Number(boardLimit);
  
	let maxpnum = (currentPage - 1) * boardLimit + boardLimit; ///추가
	if(maxpnum > listCount) {maxpnum = listCount;} //추가
	
	for (let i = (currentPage - 1) * boardLimit; i < maxpnum; i++) {
		str += "<tr>"
		       + "<td id='board-title'><img class='apple' src='../resource/img/icon/사과.png'>" + BoardList[i].boardTitle + "</td>"
		       + "<td id='board-no' style='display: none;'>" + BoardList[i].boardNo + "</td>"
		       + "<td class='board-userid'>" + BoardList[i].userId + "</td>"
		       + "<td class='board-date'>" + BoardList[i].createDate + "</td>"
			+"</tr>";
  	}
  	$(".board-list .board-list-area").html(str);
}


// 페이징 표시 함수
function paging(listCount, boardLimit, pageLimit, currentPage) {
	console.log("currentPage : " + currentPage);
	
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


