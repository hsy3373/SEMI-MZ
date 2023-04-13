/**
 * 작성자 : 박가영
 * 공지사항 js
 */

import { getContextPath, getSessionStorage } from './common.js';
import { modalstopfn } from './squareCanvas.js';
import { getUserInfo } from './userInfo.js';

export let noticeModal = document.querySelector('.notice-modal');

/*공지사항 모달창*/

$(".notice-modal, .notice-detail-modal").on("click", function(e) {
	console.log(e.target);
	if (e.target.id == 'notice-x-btn') {
		$(".notice-modal").css('display', 'none');
		modalstopfn();
	} else if (e.target.className == 'list-post') {
		$(".notice-modal").css('display', 'none');
		$(".notice-detail-modal").css('display', 'block');
	} else if (e.target.id == 'notice-detail-x-btn') {
		$(".notice-detail-modal").css('display', 'none');
		modalstopfn();
	}
});

let listCount;				// 현재 게시판의 총 게시글 갯수
let noticeLimit = 6; 		// 한 페이지에 나타낼 게시글 수
let pageLimit = 4; 			// 페이지 하단에 보여질 페이징바의 페이지 최대 갯수(패이지 목록들 몇개단위로 출력할건지)
let globalCurrentPage = 1; 	// 현재 페이지(사용자가 요청한 페이지)
let noticeList = []; 		// 표시하려하는 방명록 리스트
let maxPage; 				// 가장 마지막 페이지가 몇번 페이지인지(총 페이지 수)
let startPage; 				// 페이지 하단에 보여질 페이징바의 시작 수
let endPage; 				// 페이지 하단에 보여질 페이징바의 끝 수


$(document).ready(function() {
	NoticeList();
	selectRanking();
});

/*공지사항 게시판 하단 공지사항 리스트(4개만 보이게)*/
function NoticeList() {
	$.ajax({
		url: getContextPath() + "/selectNotice",
		success: function(data) {
			console.log(data);

			if (data.length > 4) {
				data.length = 4;
			} else {
				data.length = data.length;
			}

			let str = "";
			let replaced_str = "";

			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					str += "<div class='list-post'>"
						+ "<div class='notice-title'>" + data[i].title + "</div>"
						+ "</div>";

					data[3].title = '더보기';
				}
			} else {
				str += "<div class='list-post' style='pointer-events: none;'>"
					+ "<div class='notice-title'>" + '공지사항이 없습니다.' + "</div>"
					+ "</div>";
			}
			$(".notice-list").html(str, replaced_str);
		}, error: function() {
			console.log("실패");
		}
	});
};

$(document).on('click', ".list-post", function() {
	getNoticeList();
})

// 공지사항 리스트 조회 함수
function getNoticeList() {
	$.ajax({
		url: getContextPath() + "/selectNotice",
		success: function(data) {
			//console.log(data);

			listCount = data.length;

			// 수정, 삭제시 게시글 최상단으로 오게하기 위해 배열 초기화 후 다시 배열 담기			
			noticeList = [];
			// 공지사항 리스트 배열에 담기
			for (let i = 0; i < data.length; i++) {
				noticeList.push({
					noticeNo: data[i].noticeNo,
					noticeTitle: data[i].title,
					noticeContent: data[i].content,
					noticeDate: data[i].date
				})
			}

			//글 목록 표시 호출 (테이블 생성)
			displayData(1, noticeLimit);

			//페이징 표시 호출
			paging(listCount, noticeLimit, pageLimit, 1);

		}
	});
}

// 글 목록 표시 함수
// 현재 페이지(currentPage)와 페이지당 글 개수(noticeLimit) 반영
function displayData(currentPage, noticeLimit) {

	let str = "";

	//Number로 변환하지 않으면 아래에서 +를 할 경우 스트링 결합이 되어버림.. 
	currentPage = Number(currentPage);
	noticeLimit = Number(noticeLimit);

	let maxpnum = (currentPage - 1) * noticeLimit + noticeLimit;
	if (maxpnum > listCount) { maxpnum = listCount; }
	/*console.log("max : " + maxpnum);
	console.log("listCount : " + listCount);
	console.log(noticeList);*/

	for (let i = (currentPage - 1) * noticeLimit; i < maxpnum; i++) {

		if (listCount > 0) {
			str += "<li class='detail-list' id='" + noticeList[i].noticeNo + "'>" + noticeList[i].noticeTitle + "</li>";
		}

		// 공지사항 최신글 보이게
		$(".notice-date").html(noticeList[0].noticeDate);

		$(".notice-detail-title").html(noticeList[0].noticeTitle);

		$(".notice-content").html(noticeList[0].noticeContent);
	}

	$(".notice-detail-list").html(str);
	//console.log(currentPage, noticeLimit, maxpnum)

}

// 페이징 표시 함수
function paging(listCount, noticeLimit, pageLimit, currentPage) {
	//console.log("currentPage : " + currentPage);

	maxPage = Math.ceil(listCount / noticeLimit); //총 페이지 수

	if (maxPage < pageLimit) {
		pageLimit = maxPage;
	}
	let pageGroup = Math.ceil(currentPage / pageLimit); // 페이지 그룹
	let endPage = pageGroup * pageLimit; //화면에 보여질 마지막 페이지 번호

	if (endPage > maxPage) {
		endPage = maxPage;
	}

	let startPage = parseInt((currentPage - 1) / 4) * 4 + 1;  //화면에 보여질 첫번째 페이지 번호

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

	$("#notice-pagingul").html(pageHtml);

	//페이징 번호 클릭 이벤트 
	$("#notice-pagingul li a").click(function() {
		let $id = $(this).attr("id");
		//console.log('selectedPage', $(this).text());

		let selectedPage = $(this).text();
		//console.log("전selectedPage : " + selectedPage);

		if ($id == "next") selectedPage = next;
		if ($id == "prev") selectedPage = prev;

		/*console.log("전globalCurrentPage : " + globalCurrentPage);
		console.log("전selectedPage : " + selectedPage);*/

		//전역변수에 선택한 페이지 번호를 담는다...
		globalCurrentPage = selectedPage;

		/*console.log("globalCurrentPage : " + globalCurrentPage);
		console.log("selectedPage : " + selectedPage);*/

		//페이징 표시 재호출
		paging(listCount, noticeLimit, pageLimit, selectedPage);
		//글 목록 표시 재호출
		displayData(selectedPage, noticeLimit);
	});
};

// 공지사항 리스트 클릭 시 상세보기
$(document).on('click', ".detail-list", function() {
	let noticeNo = $(this).attr("id");
	selectNoticeDetail(noticeNo);
});

function selectNoticeDetail(noticeNo) {
	$.ajax({
		url: getContextPath() + "/selectNotice",
		method: 'post',
		data: { noticeNo },
		success: function(data) {
			//console.log(data);

			let date = data.date;
			$(".notice-date").html(date);

			let title = data.title;
			$(".notice-detail-title").html(title);

			let content = data.content;
			$(".notice-content").html(content);



		}, error: function() {
			console.log("가져오기 실패");
		}
	});
}

// 호감도 top3
function selectRanking() {
	$.ajax({
		url: getContextPath() + "/ranking",
		type: 'get',
		success: function(data) {
			console.log('유저정보 : ', data);

			let num = data.length < 3 ? data.length : 3;

			for (let i = 0; i < num; i++) {
				$(".ranking-nickname").eq(i).html(data[i].nicName);
				$(".ranking-user").eq(i).attr("src", getContextPath() + '/resource/img/user/skin' + data[i].skinId + '/fs.png');
				$(".ranking-user").eq(i).attr("id", data[i].userId);

				if (getSessionStorage('loginUser') == data[i].userId) {
					$(".ranking-user").eq(i).css('pointer-events', 'none');
				}

				$(".rh-on").eq(i).css('display', 'block');
				$(".ranking-user").eq(i).css('display', 'block');

				selectRankingHeart(i, data[i].userId);
				//console.log('i : ', i);
				//console.log('data[i].userId : ', data[i].userId);
			}

		}, error: function() {
			console.log("error");
		}
	});
}

// 호감도 랭킹에 있는 유저 클릭 시 해당 유저 정보창 띄우기
$(document).on('click', '.ranking .ranking-user', function(e) {
	console.log($(this).attr("id"));
	
	//$("#notice-x-btn").css('pointer-events', 'none');
	
	let rankingId = $(this).attr("id");

	document.querySelector(".info-modal").classList.remove("hidden");
	
	/*if (document.querySelector(".info-modal").classList.add("hidden")){
		$("#notice-x-btn").css('cursor', 'pointer');
	}*/

	window.sessionStorage.setItem("clickedUserId", rankingId);

	getUserInfo();
	modalstopfn();
});



/*db에 저장된 호감도 카운트 불러오기*/
function selectRankingHeart(num, receiveId) {
	$.ajax({
		url: getContextPath() + "/countHeart",
		type: 'post',
		data: { receiveId },
		success: function(data) {
			//console.log('호감도 개수 : ', data);

			$(".rh-int").eq(num).html(data);

		},
		error: function() {
			console.log("error");
		}
	});
}
