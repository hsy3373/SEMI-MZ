/**
 * 작성자 : 노지의
 * 내 방명록 + 페이징바
 */

/* js 가져오기 */
import { getContextPath } from "../common.js";
/*function getContextPath() {
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(
    hostIndex,
    location.href.indexOf("/", hostIndex + 1)
  );
  //console.log("getContextPath 불림");
  return contextPath;
}*/
let path = getContextPath();
/* chatData.js -> import 참고해서 작업 */

// 페이징 처리 준비
let listCount; // 현재 게시판의 총 게시글 갯수
let boardLimit = 6; // 한 페이지에 나타낼 게시글 수
let pageLimit = 5; // 페이지 하단에 보여질 페이징바의 페이지 최대 갯수(패이지 목록들 몇개단위로 출력할건지)
let globalCurrentPage = 1; // 현재 페이지(사용자가 요청한 페이지)
let BoardList = []; // 표시하려하는 방명록 리스트
let maxPage; // 가장 마지막 페이지가 몇번 페이지인지(총 페이지 수)
let startPage; // 페이지 하단에 보여질 페이징바의 시작 수
let endPage; // 페이지 하단에 보여질 페이징바의 끝 수

$(function () {
  /* 방명록 모달창(공통) */
  $.boardModal = function () {
    $(".board-wrap").show();
    $(".board-modal").show();
    $(".board-detail").hide();
    $(".board-send-list").hide();
    $(".board-send-detail").hide();
    $(".board-write").hide();
  };

  /* x버튼 or 바깥 클릭시 모달창 사라짐 */
  $("body").on("click", function (e) {
    //c onsole.log(e.target);
    if (e.target.className == "x-btn" || e.target.className == "board-wrap") {
      $(".board-wrap").hide(); // 방명록 모달 닫힘
      $(".closet-wrap").hide(); // 옷장 모달 닫힘
    }
  });

  /* 나무아이콘 클릭 -> 방명록 리스트 */
  $(".icon-tree").click(function (e) {
    // 공통으로 떠야되는 모달 배경
    $.boardModal();

    // 마이룸으로 들어왔을 시 룸마스터 == ''
    // 친구방으로 들어갈 시  룸마스터 == 친구아이디
    console.log("로그인유저 : " + loginUserId);
    console.log("룸마스터 : " + roomMasterId);

    // 로그인한 아이디는 session영역에 담아놨고,
    // 친구들은 각각의 아이디값을 session 스토리즈 담아놨음
    if (roomMasterId == "") {
      selectboardList(loginUserId);
    } else {
      selectboardList(roomMasterId);
      // 글쓰기버튼 표시
      $("#writing-btn").css("display", "block");
    }

    //selectboardList(loginUserId);
  });
});

/* =================================== 방명록 리스트 조회 함수 =================================== */
// ★ receive_id 값에 따라 보여지는 화면구성이 다름!
// 마이룸 방문시
// receive_id('test') == 현재 로그인한 아이디('test')
// 다른방 방문시
// receive_id == (방주인 아이디 == 받은사람) && USER_ID == (현재 로그인한 아이디 == 작성자)
function selectboardList(receiveID) {
  $(".board-list").show();
  //console.log(receiveID);

  $.ajax({
    // ajax로 데이터 가져오기
    url: path + "/selectBoardList",
    dataType: "json",
    data: { receive: receiveID },
    success: function (list) {
      console.log(list);
      //listCount(총 게시글 수)
      listCount = list.length;
      // 수정, 삭제시 게시글 최상단으로 오게하기 위해 배열 초기화 후 다시 배열 담기
      BoardList = [];
      // 방명록리스트 배열에 담기
      for (let i = 0; i < list.length; i++) {
        BoardList.push({
          boardNo: list[i].boardNo,
          userId: list[i].userId,
          receiveId: list[i].receiveId,
          boardTitle: list[i].boardTitle,
          createDate: list[i].createDate,
        });
      }
      //console.log(BoardList);
      //글 목록 표시 호출 (테이블 생성)
      displayData(1, boardLimit);

      //페이징 표시 호출
      paging(listCount, boardLimit, pageLimit, 1);
    },
  });
}

/* =================================== 글 목록 표시 함수 =================================== */
// 현재 페이지(currentPage)와 페이지당 글 개수(boardLimit) 반영
function displayData(currentPage, boardLimit) {
  let str = "";

  //Number로 변환하지 않으면 아래에서 +를 할 경우 스트링 결합이 되어버림..
  currentPage = Number(currentPage);
  boardLimit = Number(boardLimit);

  let maxpnum = (currentPage - 1) * boardLimit + boardLimit;
  if (maxpnum > listCount) {
    maxpnum = listCount;
  }

  //console.log(currentPage, boardLimit, maxpnum)
  for (let i = (currentPage - 1) * boardLimit; i < maxpnum; i++) {
    // 방명록 받은 유저 == 로그인 유저가 같을 때로 비교한것! ★★★★★★★★★★★★★★★ 변경 필수 ★★★★★★★★★★★★★★★
    if (BoardList[i].receiveId == loginUserId) {
      str +=
        "<tr>" +
        "<td id='board-title" +
        i +
        "'><img class='apple' src='./resource/img/icon/사과.png'>" +
        BoardList[i].boardTitle +
        "</td>" +
        "<td id='board-no' style='display: none;'>" +
        BoardList[i].boardNo +
        "</td>" +
        "<td class='board-userid'>" +
        BoardList[i].userId +
        "</td>" +
        "<td class='board-date'>" +
        BoardList[i].createDate +
        "</td>" +
        "</tr>";
    } else {
      str +=
        "<tr>" +
        "<td id='board-title" +
        i +
        "'><img class='apple' src='./resource/img/icon/사과.png'>" +
        BoardList[i].boardTitle +
        "</td>" +
        "<td id='board-no' style='display: none;'>" +
        BoardList[i].boardNo +
        "</td>" +
        "<td class='board-date'>" +
        BoardList[i].createDate +
        "</td>" +
        "</tr>";
    }
  }

  $(".board-list .board-list-area").html(str);
}

/* =================================== 페이징 표시 함수 =================================== */
function paging(listCount, boardLimit, pageLimit, currentPage) {
  //console.log("currentPage : " + currentPage);

  maxPage = Math.ceil(listCount / boardLimit); //총 페이지 수

  if (maxPage < pageLimit) {
    pageLimit = maxPage;
  }
  let pageGroup = Math.ceil(currentPage / pageLimit); // 페이지 그룹
  let endPage = pageGroup * pageLimit; //화면에 보여질 마지막 페이지 번호

  if (endPage > maxPage) {
    endPage = maxPage;
  }

  let startPage = parseInt((currentPage - 1) / 5) * 5 + 1; //화면에 보여질 첫번째 페이지 번호

  let next = endPage + 1;
  let prev = startPage - 1;

  let pageHtml = "";

  if (prev > 0) {
    pageHtml += "<li><a href='#' id='prev'> &lt; </a></li>";
  }

  //페이징 번호 표시
  for (let i = startPage; i <= endPage; i++) {
    if (currentPage == i) {
      pageHtml +=
        "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
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
}
/* ====================================================================================== */

$(function () {
  /* ================================== 방명록 상세 조회 =================================== */
  $(document).on("click", ".board-list tr", function () {
    /* BoardList[0].receiveId랑 로그인한 아이디랑 비교해야함!!! */
    /* 마이룸에서 상세조회 */
    if (BoardList[0].receiveId == loginUserId) {
      $(".board-list").hide();
      $(".board-detail").show();

      // 방명록 번호
      let boardNo = $(this).children("#board-no").text();
      console.log(boardNo);

      /* 방명록 상세 조회 */
      $.ajax({
        url: path + "/selectBoard",
        data: { boardNo: boardNo },
        success: function (b) {
          // 제목
          let title = b.boardTitle;
          let no = b.boardNo;
          // 유저스킨
          let skin = "";
          skin +=
            "<img class='friend-skin' src=''>" +
            "<div class='friend-id'>" +
            b.receiveId +
            "</div>";

          // 방명록 내용
          let content = "";
          content +=
            "<div class='detail-table-date'>" +
            b.createDate +
            "</div>" +
            "<div class='detail-table-text'>" +
            b.boardContent +
            "</div>";

          // 해당 클래스에 내용 추가
          $(".board-no").html(no);
          $(".board-detail-title").html(title);
          $(".board-detail-friend").html(skin);
          $(".board-detail-table").html(content);
        },
        error: function () {
          console.log("실패");
        },
      });
      /* 친구룸에서 상세조회 */
    } else {
      $(".board-wrap").show();
      $(".board-modal").show();
      $(".board-list").hide();
      $(".board-send-detail").show();

      // 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
      $("#board-ck").change(function () {
        if (this.checked) {
          $(this).attr("value", "Y");
        } else {
          $(this).attr("value", "N");
        }
      });

      let boardNo = $(this).children("#board-no").text();
      console.log(boardNo);
      function selectList(boardNo) {
        $.ajax({
          type: "post",
          url: path + "/selectSendBoard",
          data: { boardNo: boardNo },
          success: function (b) {
            console.log("상세조회에서 : " + b.boardNo);
            console.log(b.boardTitle);
            console.log(b.boardContent);
            // 제목, 내용
            let no = b.boardNo;
            let title = $(".board-send-detail .board-write-title").val(
              b.boardTitle
            );
            //console.log(no);
            $(".board-no").html(no);
            $(".board-send-detail .board-detail-title").html(title);
            $(".board-send-detail .board-write-content").text(b.boardContent);
            console.log("비밀글 조회시 체크상태 : " + b.secret);
            // 비밀글 체크상태
            if (b.secret == "Y") {
              $("#board-ck").prop("checked", true);
            } else {
              $("#board-ck").prop("checked", false);
            }
          },
          error: function (e) {
            console.log(e);
          },
        });
      }
      selectList(boardNo);
    }
  });

  /* 방명록 상세:back-btn 클릭 -> 방명록 리스트 */
  $(".board-detail .back-btn").click(function () {
    $(".board-detail").hide();
    $(".board-list").show();
  });

  /* 친구한테 쓴 방명록 상세:back-btn 클릭 -> 친구한테 쓴 방명록 리스트 */
  $(".board-send-detail .back-btn").click(function () {
    $(".board-send-detail").hide();
    $(".board-list").show();
  });
});

/* ================================= 방명록 작성 ================================= */
$(function () {
  $(document).on("click", "#boardWrite", function () {
    console.log("클릭됨000");
    $(".board-list").hide();
    $(".board-write").show();

    $(".board-write .board-write-title").val("");
    $(".board-write .board-write-content").val("");
    $(".board-write #board-ck").prop("checked", false);
  });
});
/*function boardWriter(){
};*/

/* 해당 룸마스터 값 boardInsert의 매개변수에 넣어줌 */
$(function () {
  $(document).on("click", "#boardInsert", function () {
    boardInsert(roomMasterId);
  });
});
/* 방명록 작성 함수 */
function boardInsert(receiveID) {
  // 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
  $("#board-ck").change(function () {
    if (this.checked) {
      $(this).attr("value", "Y");
    } else {
      $(this).attr("value", "N");
    }
  });
  console.log("방작성룸마스터 : " + roomMasterId);

  $.ajax({
    url: path + "/insertBoard",
    data: {
      //userId : loginUserId ,
      receiveId: receiveID,
      title: $(".board-write .board-write-title").val(),
      content: $(".board-write .board-write-content").val(),
      secret: $(".board-write #board-ck").prop("checked") ? "Y" : "N",
    },
    success: function (result) {
      console.log(result);
      alert("글등록이 되었습니다.");
      //reload();
      // 최근에 쓴 리스트가 맨 마지막에 뜨고 새로고침해야 제대로 정렬됨
      if (result > 0) {
        //BoardList.push();
        $(".board-write").hide();

        return selectboardList(roomMasterId);
      }
    },
    error: function (e) {
      console.log(e);
    },
  });
}

/* 글작성:back-btn 클릭 -> 친구한테 쓴 방명록 리스트 */
$(".board-write .back-btn").click(function () {
  $(".board-write").hide();
  selectboardList(roomMasterId);
});

/* ================================= 친구네룸 - 내가 쓴 방명록 수정 ================================= */
// 수정 제목, 내용, 비밀번호 클릭시 버튼 활성화 -> 적용이안됨..
$(function () {
  $(document).on("keyup", ".board-write-title", function () {
    console.log("키업됨");
  });
});
function updateBoard() {
  // 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
  $("#board-ck").change(function () {
    if (this.checked) {
      $(this).attr("value", "Y");
    } else {
      $(this).attr("value", "N");
    }
  });

  // 방명록 번호
  let boardNo = $(".board-send-detail .board-no").text();
  // console.log(boardNo);

  $.ajax({
    type: "post",
    url: path + "/updateBoard",
    data: {
      boardNo: boardNo,
      boardTitle: $(".board-send-detail .board-write-title").val(),
      boardContent: $(".board-send-detail .board-write-content").val(),
      secret: $("#board-ck").prop("checked") ? "Y" : "N",
    },
    success: function (b) {
      /*			$(".board-send-detail").hide();
        	$(".board-list").show();*/
      console.log("수정된 : " + b.boardTitle, b.boardContent);
      let no = b.boardNo;
      let title = $(".board-send-detail .board-write-title").val(b.boardTitle);
      $(".board-no").html(no);
      $(".board-send-detail .board-detail-title").html(title);
      $(".board-send-detail .board-write-content").text(b.boardContent);

      $(".board-send-detail").css("display", "none");
      // 방명록 리스트 불러오는 함수 호출
      selectboardList(roomMasterId);
    },
    error: function (e) {
      console.log(e);
    },
  });
}
$(function () {
  $(document).on("click", "#board-send-update", function () {
    console.log("수정클릭됨");
    updateBoard();
  });
});
/* ======================= 방명록 삭제(내마이룸, 친구룸 동일하게 적용) ======================= */
/*내 마이룸에서 방명록 삭제*/
function deleteBoard(){
	let boardNo = $(".board-detail .board-no").text();
	$.ajax({
		url : path + "/deleteBoard",
		data : {boardNo : boardNo},
		success : function(result){}
	})
}
deleteBoard();
$(function(){
	$(document).on("click", "#board-delete",function(){
		if(confirm("삭제하시겠습니까?")){
			deleteBoard();
			// 현재 모달 숨기기
			$(".board-detail").css("display", "none");
			// 방명록 리스트 불러오는 함수 호출
			selectboardList(loginUserId);
		}else{
			return;
		}
	})
});
/*친구마이룸에서 내가 쓴 방명록 삭제*/
function deleteSendBoard(){
	let boardNo = $(".board-send-detail .board-no").text();
	$.ajax({
		url : path + "/deleteBoard",
		data : {boardNo : boardNo},
		success : function(result){}
	})
}
deleteSendBoard();
$(function(){
	$(document).on("click", "#board-send-delete",function(){
		if(confirm("삭제하시겠습니까?")){
			deleteBoard();
			// 현재 모달 숨기기
			$(".board-send-detail").css("display", "none");
			// 방명록 리스트 불러오는 함수 호출
			selectboardList(roomMasterId);
		}else{
			return;
		}
	})
});

/* ================================= 나무아이콘에 방명록 ================================= */
/* 시작하자마자 실행되도록 */
$(document).ready(function () {
  if (roomMasterId == "") {
    loadList(loginUserId);
  } else {
    loadList(roomMasterId);
  }
});

function loadList(receiveID) {
  $.ajax({
    url: path + "/selectBoardList",
    dataType: "json",
    data: { receive: receiveID },
    success: function (list) {
      // 배열의 크기가 4보다 크면 4
      // 배열의 크기가 4보다 작으면
      if (list.length > 4) {
        list.length = 4;
      } else {
        list.length = list.length;
      }
      let str = "";
      if (roomMasterId == "") {
        for (let i = 0; i < list.length; i++) {
          str +=
            "<tr>" +
            "<td class='myroom-board-title'>" +
            "<img class='apple' src='./resource/img/icon/사과.png'>" +
            list[i].boardTitle +
            "</td>" +
            "<td class='myroom-board-user'>" +
            list[i].userId +
            "</td>" +
            "</tr>";
        }
      } else {
        for (let i = 0; i < list.length; i++) {
          str +=
            "<tr>" +
            "<td class='myroom-board-title'>" +
            "<img class='apple' src='./resource/img/icon/사과.png'>" +
            list[i].boardTitle +
            "</td>" +
            "<td class='myroom-board-user'>" +
            list[i].userId +
            "</td>" +
            "</tr>";
        }
      }
      $(".myroom-board-list").html(str);
    },
    error: function (e) {
      console.log("에러");
    },
  });
}
