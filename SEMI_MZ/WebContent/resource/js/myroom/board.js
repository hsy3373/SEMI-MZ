/**
 * 작성자 : 노지의
 * 내 방명록 + 친구 방명록 + 페이징바
 */

/* js 가져오기 */
import { getContextPath } from "../common.js";
import { getUserInfo } from "../userInfo.js";
import { openAlert, closeAlert } from "../alert.js";
import { homeOpenAlert } from "./homeAlert.js";
//import { getContextPath, getSessionStorage } from "../common.js";

let path = getContextPath();

// 페이징 처리 준비
let listCount; 				// 현재 게시판의 총 게시글 갯수
let boardLimit = 6; 		// 한 페이지에 나타낼 게시글 수
let pageLimit = 5; 			// 페이지 하단에 보여질 페이징바의 페이지 최대 갯수(페이지 목록들 몇개단위로 출력할건지)
let globalCurrentPage = 1; 	// 현재 페이지(사용자가 요청한 페이지)
let BoardList = []; 		// 표시하려하는 방명록 리스트
let maxPage; 				// 가장 마지막 페이지가 몇번 페이지인지(총 페이지 수)
let startPage; 				// 페이지 하단에 보여질 페이징바의 시작 수
let endPage; 				// 페이지 하단에 보여질 페이징바의 끝 수

$(function() {
	/* 방명록 모달창(공통) */
	$.boardModal = function() {
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
		if (e.target.className == "x-btn" || e.target.className == "board-wrap") {
			$(".board-wrap").hide(); // 방명록 모달 닫힘
			$(".closet-wrap").hide(); // 옷장 모달 닫힘
		}
	});

	/* 나무아이콘 클릭 -> 방명록 리스트 */
	$(".icon-tree").click(function(e) {
		// 공통으로 떠야되는 모달 배경
		$.boardModal();

		// 마이룸으로 들어왔을 시 룸마스터 == ''
		// 친구방으로 들어갈 시  룸마스터 == 친구아이디

		if (roomMasterId == "") {
			selectboardList(loginUserId);
		} else {
			selectboardList(roomMasterId);
			// 글쓰기버튼 표시
			$("#writing-btn").css("display", "block");
		}

	});
});

/* ========================= 방명록 리스트 조회 함수 ========================= */
/*★ receiveID 값에 따라 보여지는 화면구성이 다름!
	마이룸 방문시 -> receiveID == 현재 로그인한 아이디
	다른방 방문시 -> receiveID == 방주인 아이디 && USER_ID == (현재 로그인한 아이디 == 작성자)*/
function selectboardList(receiveID) {
	$(".board-list").show();

	$.ajax({
		url: path + "/selectBoardList",
		dataType: "json",
		data: { receive: receiveID },
		success: function(list) {
			//listCount(총 게시글 수)
			listCount = list.length;
			// 수정, 삭제시 게시글 최상단으로 오게하기 위해 배열 초기화 후 다시 배열 담음
			BoardList = [];
			// 방명록리스트 배열에 담기
			for (let i = 0; i < list.length; i++) {
				BoardList.push({
					boardNo	  : list[i].boardNo,
					userId	  : list[i].userId,
					receiveId : list[i].receiveId,
					boardTitle: list[i].boardTitle,
					secret	  : list[i].secret,
					createDate: list[i].createDate,
					nickName  : list[i].nickName
				});
			}
			//글 목록 표시 호출 (테이블 생성)
			displayData(1, boardLimit);

			//페이징 표시 호출
			paging(listCount, boardLimit, pageLimit, 1);
		},
	});
}

/* ========================= 글 목록 표시 함수 ========================= */
// 현재 페이지(currentPage)와 페이지당 글 개수(boardLimit) 반영
function displayData(currentPage, boardLimit) {
	let str = "";

	//Number로 변환하지 않으면 아래에서 +를 할 경우 스트링 결합이 되어버림..
	currentPage = Number(currentPage);
	boardLimit = Number(boardLimit);

	// maxpnum : 각페이지별 마지막으로 보여질 숫자(ex 1페이지->5 , 2페이지-> 11...)
	let maxpnum = (currentPage - 1) * boardLimit + boardLimit;
	if (maxpnum > listCount) {
		maxpnum = listCount;
	}
	// 방명록이 없을 경우
	if(listCount == 0){
		str += `<tr>
				<td style="text-align: center;">방명록 없음</td>
			  </tr>`;
	}else{
		for (let i = (currentPage - 1) * boardLimit; i < maxpnum; i++) {
			str += "<tr>"
					+ "<td id='board-title"+i+"'><img class='apple' src='./resource/img/icon/사과.png'>"
						+ BoardList[i].boardTitle
					+ "</td>"
					+ "<td id='board-no' style='display: none;'>"
						+ BoardList[i].boardNo
					+ "</td>"
					+ "<td class='board-userid' style='display: none;'>"
						+ BoardList[i].userId
					+ "</td>"
					+ "<td class='board-secret' style='display: none;'>"
						+ BoardList[i].secret
					+ "</td>"
					+ "<td class='board-nick'>"
						+ BoardList[i].nickName
					+ "</td>"
					+ "<td class='board-date'>"
						+ BoardList[i].createDate
					+ "</td>"
				+ "</tr>";
		}
	}
	$(".board-list .board-list-area").html(str);
	
	for(let i = 0; i < BoardList.length; i++){
		// 방명록 받은 유저 == 로그인 유저가 같을 때 : 마이룸
		if (BoardList[i].receiveId == loginUserId){
			if(BoardList[i].secret == 'Y'){
				$("#board-title"+i+" img").attr('src', './resource/img/icon/secret.png');
			}
		// 친구룸
		}else{
			// 비밀글일 경우 아이콘 변경
			if(BoardList[i].secret == 'Y'){
				$("#board-title"+i+" img").attr('src', './resource/img/icon/secret.png');
				// 작성자와 로그인유저가 다를 경우 글제목:비밀글
				if(BoardList[i].userId != loginUserId){
					$("#board-title"+i).html("<img class='apple' src='./resource/img/icon/secret.png'>비밀글");
				}
			}
		}
	}
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
	$("#pagingul li a").click(function() {
		let $id = $(this).attr("id");
		let selectedPage = $(this).text();

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

$(function() {
	/* ================================== 방명록 상세 조회 =================================== */
	$(document).on("click", ".board-list tr", function() {
		/* BoardList[0].receiveId랑 로그인한 아이디랑 비교해야함!!! */
		/* 마이룸에서 상세조회 */
		if (BoardList[0].receiveId == loginUserId) {
			$(".board-list").hide();
			$(".board-detail").show();

			// 방명록 번호
			let boardNo = $(this).children("#board-no").text();
			//console.log(boardNo);

			/* 방명록 상세 조회 */
			$.ajax({
				url: path + "/selectBoard",
				data: { boardNo: boardNo },
				success: function(b) {
					// 제목
					let title = b.boardTitle;
					let no = b.boardNo;
					// 유저스킨
					let skin = "";
					skin += "<img class='friend-skin' src='" + path + "/resource/img/user/skin" + b.skinId + "/fs.png'>"
						 + "<div class='friend-id' style='display: none;'>" + b.userId + "</div>"
						 + "<div class='friend-nick'>" + b.nickName + "</div>";

					// 방명록 내용
					let content = "";
					content += "<div class='detail-table-date'>" + b.createDate + "</div>"
							 + "<div class='detail-table-text'>" + b.boardContent + "</div>";

					// 해당 클래스에 내용 추가
					$(".board-no").html(no);
					$(".board-detail-title").html(title);
					$(".board-detail-friend").html(skin);
					$(".board-detail-table").html(content);
				},
				error: function() {
					console.log("실패");
				},
			});
		/* 친구룸에서 상세조회 */
		} else {
			let boardNo = $(this).children("#board-no").text();
			let boardId = $(this).children(".board-userid").text();
			let secret = $(this).children(".board-secret").text();
			
			//console.log("loginUserId : "+loginUserId + " 작성한사람 : "+boardId + " 비밀글 상태 : "+secret);
			
			// 작성자가 다르고 비밀글이라면 클릭이벤트 막기
			if(loginUserId != boardId && secret == 'Y'){
				$(this).off("click");
				/*alert*/
				document.getElementById("home-alert-text").innerHTML = "비밀글 조회 불가!";
				/*alert 창 띄우기*/
				homeOpenAlert();
				
				$(".closet-buy").attr("disabled", true);
				$(".closet-buy").css("cursor", "default");
				
				
			}else{
				$(".board-wrap").show();
				$(".board-modal").show();
				$(".board-list").hide();
				$(".board-send-detail").show();
				/*수정버튼 막기*/
				$("#board-send-update").attr("disabled", true);

				// 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
				$("#board-ck").change(function() {
					if (this.checked) {
						$(this).attr("value", "Y");
					} else {
						$(this).attr("value", "N");
					}
				});

				function selectList(boardNo) {
					$.ajax({
						type: "post",
						url: path + "/selectSendBoard",
						data: { boardNo: boardNo },
						success: function(b) {
							//console.log("상세조회에서 : " + b.boardNo);
							//console.log(b.boardTitle);
							//console.log(b.boardContent);
							// 제목, 내용
							let no = b.boardNo;
							let userId = b.userId;
							let title = $(".board-send-detail .board-write-title").val(b.boardTitle);
							let content = $(".board-send-detail .board-write-content").val(b.boardContent);
							
							$(".board-no").html(no);
							$(".board-write-id").html(userId);
							$(".board-send-detail .board-write-title").html(title);
							$(".board-send-detail .board-write-content").html(content);
							//console.log("비밀글 조회시 체크상태 : " + b.secret);
							// 비밀글 체크상태
							if (b.secret == "Y") {
								$("#board-ck").prop("checked", true);
							} else {
								$("#board-ck").prop("checked", false);
							}
							//console.log("작성자?"+userId);
							// 로그인유저와 작성자가 같지않을 경우 읽기만 가능
							if(loginUserId != userId){
								$(".board-send-detail .board-write-title").prop('readonly', true);
								$(".board-send-detail .board-write-content").prop('readonly', true);
								$('#board-ck').attr('disabled', 'disabled');
								/*수정버튼 막기*/
								$("#board-send-update").attr("disabled", 'disabled');
								/*삭제버튼 막기*/
								$("#board-send-delete").attr("disabled", 'disabled');
							}else{
								$(".board-send-detail .board-write-title").prop('readonly', false);
								$(".board-send-detail .board-write-content").prop('readonly', false);
								$('#board-ck').attr('disabled', false);
								$("#board-send-delete").attr("disabled", false);
								
								/*원래 제목, 내용 값*/
								let beforeTitle = $(".board-send-detail .board-write-title").val();
								let beforeContent = $(".board-send-detail .board-write-content").val();
								//console.log("beforeTitle : "+beforeTitle);
								
								/*제목 변경 -> 수정버튼 활성화 (원래 제목값과 비교)*/
								$(".board-send-detail .board-write-title").on("keyup", function() {
								    let afterTitle = $(this).val();
									//console.log("afterTitle : "+afterTitle);
								    if(beforeTitle == afterTitle) {
										$("#board-send-update").attr("disabled", true);
								        return;
								    }else{
										$("#board-send-update").attr("disabled", false);
									}
								});
								
								/*내용 변경 -> 수정버튼 활성화 (원래 내용값과 비교)*/
								$(".board-send-detail .board-write-content").on("keyup", function() {
								    let afterContent = $(this).val();
								    if(beforeContent == afterContent) {
										$("#board-send-update").attr("disabled", true);
								        return;
								    }else{
										$("#board-send-update").attr("disabled", false);
									}
								});
								
								/*비밀글 체크상태 변경 -> 수정버튼 활성화*/
								$("#board-ck").on('change', function(){
										$("#board-send-update").attr("disabled", false);
								})
								
							}
						},
						error: function(e) {console.log(e);},
					});
				}
				selectList(boardNo);
			}
			
		}
	});

	/* 방명록 상세:back-btn 클릭 -> 방명록 리스트 */
	$(".board-detail .back-btn").click(function() {
		$(".board-detail").hide();
		$(".board-list").show();
	});

	/* 친구한테 쓴 방명록 상세:back-btn 클릭 -> 친구한테 쓴 방명록 리스트 */
	$(".board-send-detail .back-btn").click(function() {
		$(".board-send-detail").hide();
		$(".board-list").show();
	});
	
	
	/*내마이룸 방명록 상세조회 -> 친구 스킨 클릭시 userInfo 모달창*/
	$(document).on("click", ".board-detail .friend-skin", function(){
		//console.log($(".friend-id").text());
		let friendId = $(".friend-id").text();
		document.querySelector(".info-modal").classList.remove("hidden");
		// 세션스토리지에 해당 유저 저장
		window.sessionStorage.setItem("clickedUserId", friendId);
		getUserInfo();
	});

});


/* ================================= 친구네룸 - 내가 쓴 방명록 수정 ================================= */
/*방명록 수정 클릭이벤트*/
$(document).on("click", "#board-send-update", function() {
	/*alert*/
	document.getElementById("alert-text").innerText = "수정하시겠습니까?";
	openAlert("myroom-board-update");
});
$('.alert').on('click', '.myroom-board-update', function (){
	/*방명록 수정 함수*/
	updateBoard();
	/*나무에 방명록 표시*/
	loadList(roomMasterId);
})
/*방명록 수정*/
function updateBoard() {
	// 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
	$("#board-ck").change(function() {
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
		success: function(b) {
			console.log("수정된 : " + b.boardTitle, b.boardContent);
			if (b != null) {
				let no = b.boardNo;
				let title = $(".board-send-detail .board-write-title").val(b.boardTitle);
				$(".board-no").html(no);
				$(".board-send-detail .board-detail-title").html(title);
				$(".board-send-detail .board-write-content").text(b.boardContent);

				$(".board-send-detail").css("display", "none");
				// 방명록 리스트 불러오는 함수 호출
				selectboardList(roomMasterId);
				closeAlert();

			}
		},
		error: function(e) { console.log(e); },
	});
}

		
/* ======================= 방명록 삭제 ======================= */
/*내 마이룸에서 방명록 삭제 클릭 이벤트*/
$(document).on("click", "#board-delete", function() {
	document.getElementById("alert-text").innerText = "삭제하시겠습니까?";
	openAlert("myroom-board-delete");
})
/*alert창 확인버튼 클릭시 요청처리*/
$(".alert").on("click", ".myroom-board-delete", function(){
	let boardNo = $(".board-detail .board-no").text();
	console.log(boardNo);
	$.ajax({
		url: path + "/deleteBoard",
		data: { boardNo: boardNo },
		success: function(result) {
			// 현재 모달 숨기기
			$(".board-detail").css("display", "none");
			// alert 숨기기
			closeAlert();
			// 방명록 리스트 불러오는 함수 호출
			selectboardList(loginUserId);
			// 나무아이콘에 바로 적용
			loadList(loginUserId);
		}
	})
});


/*친구마이룸에서 내가 쓴 방명록 삭제 클릭 이벤트*/
$(document).on("click", "#board-send-delete", function() {
	document.getElementById("alert-text").innerText = "삭제하시겠습니까?";
	openAlert("myroom-send-board-delete");
});
/*alert창 확인버튼 클릭시 요청처리*/
$(".alert").on("click", ".myroom-send-board-delete", function(){
	let boardNo = $(".board-send-detail .board-no").text();
	$.ajax({
		url: path + "/deleteSendBoard",
		data: { boardNo: boardNo },
		success: function(result) {
			// 현재 모달 숨기기
			$(".board-send-detail").css("display", "none");
			// alert 숨기기
			closeAlert();
			// 방명록 리스트 불러오는 함수 호출
			selectboardList(roomMasterId);
			// 나무아이콘에 바로 적용
			loadList(roomMasterId);
		}
	})
});

/* ======================= 방명록 작성 ======================= */
/* 방명록 작성 함수 */
function boardInsert(receiveID) {
	// 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
	$("#board-ck").change(function() {
		if (this.checked) {
			$(this).attr("value", "Y");
		} else {
			$(this).attr("value", "N");
		}
	});
	//console.log("방작성룸마스터 : " + roomMasterId);

	$.ajax({
		url: path + "/insertBoard",
		data: {
			receiveId: receiveID,
			title	 : $(".board-write .board-write-title").val(),
			content  : $(".board-write .board-write-content").val(),
			secret	 : $(".board-write #board-ck").prop("checked") ? "Y" : "N",
		},
		success: function(result) {
			if (result > 0) {
				$(".board-write").hide();
				
				// 방명록 리스트 불러오는 함수 호출
				selectboardList(roomMasterId);
				
				// 나무아이콘에 표시
				loadList(roomMasterId);
				
				/*alert*/
				document.getElementById("home-alert-text").innerHTML = "방명록이 작성되었습니다.";
				/*alert 창 띄우기*/
				homeOpenAlert();
			}
		},
		error: function(e) {console.log(e);},
	});
}

$(function() {
	/*방명록 리스트에서 글쓰기 버튼*/
	$(document).on("click", "#boardWrite", function() {
		$(".board-list").hide();
		$(".board-write").show();
		
		// 글쓰기 클릭할때마다 내용 비워주기
		$(".board-write .board-write-title").val("");
		$(".board-write .board-write-content").val("");
		$(".board-write #board-ck").prop("checked", false);
	});
	
	
	/* 해당 룸마스터 값 boardInsert의 매개변수에 넣어줌 */
	$(document).on("click", "#boardInsert", function() {
		// 제목, 내용이 비어있으면 실행안됨
		if($(".board-write .board-write-title").val() != "" && $(".board-write .board-write-content").val() != ""){
			boardInsert(roomMasterId);
			loadList(roomMasterId);
		}else if($(".board-write .board-write-title").val() == ""){
			/*alert*/
			document.getElementById("home-alert-text").innerHTML = "제목을 입력해주세요.";
			/*alert 창 띄우기*/
			homeOpenAlert();
			
			$(".board-write .board-write-title").focus();
		}else if($(".board-write .board-write-content").val() == ""){
			/*alert*/
			document.getElementById("home-alert-text").innerHTML = "내용을 입력해주세요.";
			/*alert 창 띄우기*/
			homeOpenAlert();
			
			$(".board-write .board-write-content").focus();
		}
	});
});

/* 글작성:back-btn 클릭 -> 친구한테 쓴 방명록 리스트 */
$(".board-write .back-btn").click(function() {
	$(".board-write").hide();
	selectboardList(roomMasterId);
});

/* ================================= 나무아이콘에 방명록 ================================= */
/* 시작하자마자 실행되도록 */
$(document).ready(function() {
	if (roomMasterId == "") {
		loadList(loginUserId);
	} else {
		loadList(roomMasterId);
	}
});

/*나무아이콘 방명록 리스트 가져오기*/
function loadList(receiveID) {
	$.ajax({
		url: path + "/selectBoardList",
		dataType: "json",
		data: { receive: receiveID },
		success: function(list) {
			// 4개 항목만 표시
			if (list.length > 5) {
				list.length = 5;
			} else {
				list.length = list.length;
			}
			let str = "";
			
			for (let i = 0; i < list.length; i++){
				str += "<tr>" +
							"<td class='myroom-board-title' id='myroom-board-title"+i+"'>" +
								"<img class='apple' src='./resource/img/icon/사과.png'>" + 
								list[i].boardTitle + 
							"</td>" +
							"<td class='myroom-board-friend-nick'>" + list[i].nickName + "</td>" +
							"<td class='myroom-board-user' style='display: none;'>" + list[i].userId + "</td>" +
							"<td class='myroom-board-secret' style='display: none;'>" + list[i].secret + "</td>" +
						"</tr>";
			}
			$(".myroom-board-list").html(str);
			// 본인방
			for (let i = 0; i < list.length; i++){
				if (roomMasterId == "") {
					if(list[i].secret == 'Y'){
						$("#myroom-board-title"+i+" img").attr('src', './resource/img/icon/secret.png');
					}
				}else{
					// 비밀글일 경우 아이콘 변경
					if(list[i].secret == 'Y'){
						$("#myroom-board-title"+i+" img").attr('src', './resource/img/icon/secret.png');
						// 작성자와 로그인유저가 다를 경우 글제목:비밀글
						if(list[i].userId != loginUserId){
							$("#myroom-board-title"+i).html("<img class='apple' src='./resource/img/icon/secret.png'>비밀글");
						}
					}
				}
			}

		},
		error: function(e) {console.log("에러");}
	});
}
