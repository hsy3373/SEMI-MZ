/**
 * 작성자 : 박가영
 * 공지사항 js
 */

import { getContextPath, setSessionStorage, getSessionStorage } from './common.js';
import { modalstopfn } from './squareCanvas.js';

export let noticeModal = document.querySelector('.notice-modal');

/*공지사항 모달창*/

$("body").on("click", function(e) {
	console.log(e.target);
	if (e.target.id == 'notice-x-btn') {
		$(".notice-modal").css('display', 'none');
	} else if (e.target.className == 'list-post') {
		$(".notice-modal").css('display', 'none');
		$(".notice-detail-modal").css('display', 'block');
	} else if (e.target.id == 'notice-detail-x-btn') {
		$(".notice-detail-modal").css('display', 'none');
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

			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					str += "<div class='list-post'>"
						+ "<div class='notice-title'>" + data[i].title + "</div>"
						+ "</div>";
				}
			} else {
				for (let i = 0; i == data.length; i++) {
					str += "<div class='list-post'>"
						+ "<div class='notice-title'>" + '공지사항이 없습니다.' + "</div>"
						+ "</div>";
				}
			}
			$(".notice-list").html(str);
		}, error: function() {
			console.log("실패");
		}
	});
};

$(".list-post").click(function(){
	getNoticeList();
});

// 공지사항 리스트 조회 함수
function getNoticeList() {
	$.ajax({
		url: path + "/selectNotice",
		success: function(data) {
			console.log(data);

			listCount = data.length;
			// 수정, 삭제시 게시글 최상단으로 오게하기 위해 배열 초기화 후 다시 배열 담기			
			noticeList = [];
			// 공지사항 리스트 배열에 담기
			for (let i = 0; i < data.length; i++) {
				noticeList.push({
					noticeNo: data[i].noticeNo,
					noticeTitle: data[i].noticeTitle,
					noticeContent: data[i].noticeContent,
					createDate: data[i].createDate
				})
			}
			console.log(noticeList);

			//글 목록 표시 호출 (테이블 생성)
			displayData(1, noticeLimit);

			//페이징 표시 호출
			paging(listCount, noticeLimit, pageLimit, 1);
		}
	});
}

// 글 목록 표시 함수
// 현재 페이지(currentPage)와 페이지당 글 개수(noticeLimit) 반영
function displayData(currentPage, boardLimit) {

	let str = "";

	//Number로 변환하지 않으면 아래에서 +를 할 경우 스트링 결합이 되어버림.. 
	currentPage = Number(currentPage);
	noticeLimit = Number(noticeLimit);

	let maxpnum = (currentPage - 1) * noticeLimit + noticeLimit;
	if (maxpnum > listCount) { maxpnum = listCount; }

	for (let i = (currentPage - 1) * boardLimit; i < maxpnum; i++) {
		let str = "";

		if (listCount > 0) {
			for (let i = 0; i < listCount; i++) {
				str += "<ul class='notice-detail-list'>"
					+ "<li class='detail-list'>" + noticeList[i].noticeTitle + "</li>"
			}
		} else {
			for (let i = 0; i == listCount; i++) {
				str += "<ul class='notice-detail-list'>"
					+ "<li class='detail-list'>" + '공지사항이 없습니다.' + "</li>"
			}
		}
	}
	$(".notice-list").html(str);
	console.log(currentPage, noticeLimit, maxpnum)

}

// 페이징 표시 함수
function paging(listCount, noticeLimit, pageLimit, currentPage) {
	console.log("currentPage : " + currentPage);

	maxPage = Math.ceil(listCount / noticeLimit); //총 페이지 수

	if (maxPage < pageLimit) {
		pageLimit = maxPage;
	}
	let pageGroup = Math.ceil(currentPage / pageLimit); // 페이지 그룹
	let endPage = pageGroup * pageLimit; //화면에 보여질 마지막 페이지 번호

	if (endPage > maxPage) {
		endPage = maxPage;
	}

	let startPage = parseInt((currentPage - 1) / 5) * 5 + 1;  //화면에 보여질 첫번째 페이지 번호

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
		selectedPage = $(this).text();

		if ($id == "next") selectedPage = next;
		if ($id == "prev") selectedPage = prev;

		//전역변수에 선택한 페이지 번호를 담는다...
		globalCurrentPage = selectedPage;
		//페이징 표시 재호출
		paging(listCount, noticeLimit, pageLimit, selectedPage);
		//글 목록 표시 재호출
		displayData(selectedPage, noticeLimit);
	});
};




/*function selectNotice(num){
	console.log('num : ', num);
	$.ajax({
		url : getContextPath()+"/detail.list",
		data : {page : num},
		success : function(data){
			console.log('공지사항 : ', data);

			let str = "";

			for (let i in data){
				str += `<div class="notice-no">${data[i].noticeNo}>
						${noticeCount - i - (num - 1) * 6}
						<ul class='notice-detail-list'>
						<li class='detail-list'>${data[i].title}</li>
						</ul>
						</div>`
			}
			(".notice-list-item").html(str);
		}, error : function(){
			console.log("실패");
		}
	});
}

function init(){
	$(document.querySelector(".notice-list-item")).on("click", ".detail-list", function () {

    // 앞 공지사항 포스트잇에 notice-no 주기
    let str = this.querySelector(".notice-title");

    console.log(str);
    location.href = getContextPath() + "/update.notice?noticeNo=" + str;
  });

  document.querySelectorAll(".page-btn").forEach(function (el) {
    el.addEventListener("click", function () {
      // 기존에 선택되어있던 버튼이 있었다면 선택 해제
      if (document.querySelector(".selected-btn") != null) {
        document.querySelector(".selected-btn").className = "page-btn";
      }

      setSessionStorage("cPage", this.innerText);
      getNotice(this.innerText);

      this.className = "selected-btn page-btn";
    });
  });

  // 페이징바의 앞페이지 버튼 클릭시 동작
  document.getElementById("prev-btn").addEventListener("click", function () {
    let btns = document.querySelectorAll(".page-btn");
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) - 10;
      el.className = "page-btn";
    });

    //만약 가장 처음 버튼이 1번일 경우 앞페이지 버튼 비활성화
    if (btns[0].innerText == 1) {
      document.getElementById("prev-btn").className = "disable-btn";
    }

    // 앞페이지가 눌렸다는 것은 뒷페이지가 있다는 것이므로 뒷페이지 가기 버튼 활성화
    document.getElementById("next-btn").className = "able-btn";

    // 가장 마지막 버튼이 눌린 것으로 처리
    btns[btns.length - 1].click();
  });

  // 페이징바의 뒷페이지 버튼 클릭 시 동작
  document.getElementById("next-btn").addEventListener("click", function () {
    let count = Number(getSessionStorage("noticeCount"));
    //최대 페이지 수
    count = Math.ceil(count / 20);
    let btns = document.querySelectorAll(".page-btn");
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) + 10;

      if (Number(el.innerText) > count) {
        //만약 버튼의 숫자가 최대 페이지 수보다 크다면
        el.className = "disable-btn page-btn";
      } else {
        el.className = "page-btn";
      }
    });

    // 앞으로 가기 버튼 활성화
    document.getElementById("prev-btn").className = "able-btn";

    //만약 가장 마지막 버튼이 최대 페이지 수보다 크거나 같은 경우 뒷페이지 버튼 비활성화
    if (Number(btns[btns.length - 1].innerText) >= count) {
      document.getElementById("next-btn").className = "disable-btn";
    }

    //가장 첫 버튼 클릭
    btns[0].click();
  });
}*/

/*function NoticeDetailList(){
	$.ajax({
		url : getContextPath()+"/selectNotice",
		success : function(data){
			console.log(data);

			let str = "";

			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					str += "<li class='detail-list'>" + data[i].title + "</li>"
				}
			} else {
				for (let i = 0; i == data.length; i++) {
					str += "<li class='detail-list'>" + '공지사항이 없습니다.' + "</li>"
				}
			}
			$(".notice-detail-list").html(str);
		}, error : function(){
			console.log("실패");
		}
	});
}*/

