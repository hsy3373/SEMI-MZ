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
	/* ========================= 방명록 리스트 조회 ========================= */
	let path = getContextPath();
	$.ajax({ // ajax로 데이터 가져오기
		url : path + "/boardList",
		dataType: "json",
		success : function(list){
			//listCount(총 게시글 수)
			listCount = list.length;

			// 방명록리스트 배열에 담기
			for(let i = 0; i < list.length; i++){
				BoardList.push({ boardNo:list[i].boardNo,
								 userId:list[i].userId,
			                	 boardTitle:list[i].boardTitle,
			                	 createDate: list[i].createDate})
			}
			console.log(BoardList);
		//글 목록 표시 호출 (테이블 생성)
		displayData(1, boardLimit);
		
		//페이징 표시 호출
		paging(listCount, boardLimit, pageLimit, 1);	
		}
		
	});
	
	

	
});

// 글 목록 표시 함수
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



/* ========================= 방명록 상세 조회 ========================= */


	

