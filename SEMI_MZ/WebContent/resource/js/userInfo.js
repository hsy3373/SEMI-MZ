/**
 * 
 *//**
* 작성자: 박가영
* 유저 정보창 js
*/

import { getContextPath } from './common.js';
import { modalstopfn } from './squareCanvas.js';
import { openChatRoom } from './chat/chatFront.js';
import * as Alert from "./alert.js";
import { homeOpenAlert } from "./homeAlert.js";


let plusBtn = document.querySelector(".plus");
let deleteBtn = document.querySelector(".delete");
let reportBtn = document.querySelector(".report-btn");

let userGender = document.querySelector("#user-gender");
let userHeart = document.querySelector("#user-heart");

let alert = document.querySelector(".alert");
	alert.classList = "alert " + "infoAlert";

let alertOverlay = document.querySelector(".alert-overlay");
	alertOverlay.classList = "alert-overlay " + "infoAlert-overlay";

// 유저 정보창에서 alert 떠있을 시 오버레이 클릭 안되게 유저 정보창 전용 오버레이 만듦
let infoModalOverlay = document.querySelector(".info-modal-overlay");

let infoModalOpenOverlay = function() {
	infoModalOverlay.style.display = "block";
}

let infoModalCloseOverlay = function() {
	infoModalOverlay.style.display = "none";
}

// 유저 신고창에서 alert 떠있을 시 오버레이 클릭 안되게 유저 신고창 전용 오버레이 만듦
let reportModalOverlay = document.querySelector(".report-modal-overlay");

let reportModalOpenOverlay = function() {
	reportModalOverlay.style.display = "block";
}

let reportModalCloseOverlay = function() {
	reportModalOverlay.style.display = "none";
}

// 1:1 채팅 클릭 시 클릭한 해당 유저와의 채팅방 생성
document.querySelector(".info-chatting").addEventListener("click", function() {
	openChatRoom(sessionStorage.clickedUserId);
});

// 놀러가기 클릭 시 클릭한 해당 유저의 마이룸으로 이동
if (document.querySelector(".friend-home")) {
	document.querySelector(".friend-home").addEventListener("click", function() {
		location.href = getContextPath() + '/home?roomMaster=' + sessionStorage.clickedUserId;
	});
}

/*유저 정보 모달창 닫기*/
let close = () => {
	document.querySelector(".info-modal").classList.add("hidden");
	if(!document.getElementById("tree")){
		modalstopfn();
	}
	infoModalCloseOverlay();
}

document.querySelector("#info-x-btn").addEventListener("click", close);



let nickName;

/*유저 정보 가져오기*/
/*
	sessionStorage.clickedUserId
*/
export function getUserInfo() {
	//console.log('d')
	selectHeart();
	selectFriend();
	countHeart();
	infoModalOpenOverlay();
	$.ajax({
		url: getContextPath() + "/userInfo",
		data: { userId: sessionStorage.clickedUserId }, /*userId = 로그인 유저(나)x , 다른 유저*/
		method: 'post',
		success: function(data) {
			// console.log('유저 정보 가져왔음 : ', data);

			// 데이터 가져오기	
			nickName = data.nicName;
			$(".info-nickname").html(nickName);
			$(".report-user").html(nickName);

			/* 스킨 경로가 비어있어 오류 뜸 */
			let skinId = data.skinId;
			$("#info-skin").attr("src", getContextPath() + '/resource/img/user/skin' + skinId + '/fs.png');

			if (data.info == null) {
				$(".info-introduce").html("");
			} else {
				$(".info-introduce").html(data.info);
			}

			let gender = data.gender;
			//console.log(gender);


			if (gender == 'W') {
				/*$("#gender-w").attr("src", getContextPath()+"/resource/img/icon/여자.png");
				
				$('#gender-w').css('display', 'block');
				$('#gender-m').css('display', 'none');
				$('#gender-n').css('display', 'none');*/
				userGender.classList.add("gender-w");


			} else if (gender == 'M') {
				/*$("#gender-m").attr("src", getContextPath()+"/resource/img/icon/남자.png");
				
				$('#gender-w').css('display', 'none');
				$('#gender-m').css('display', 'block');
				$('#gender-n').css('display', 'none');*/
				userGender.classList.add("gender-m");

			} else if (gender == 'N') {
				/*$("#gender-n").attr("src", getContextPath()+"/resource/img/icon/성별비공개.png");
				
				$('#gender-w').css('display', 'none');
				$('#gender-m').css('display', 'none');
				$('#gender-n').css('display', 'block');*/
				userGender.classList.add("gender-n");
			}


		}
	});
};

/*하트 클릭 했을 때 호감도 상태 db에 저장*/
function insertHeart() {
	$.ajax({
		url: getContextPath() + "/heart",
		type: 'post',
		data: { receiveId: sessionStorage.clickedUserId },
		success: function(data) {
			//console.log(data);
			$('#heart-off').css('display', 'none');
			$('#heart-on').css('display', 'block');

			let num = $(".heart-int").text();
			// console.log('num: ', num);
			num = parseInt(num) + 1;

			$(".heart-int").html(num);
			// console.log('num: ', num);
		},
		error: function() {
			console.log("error");
		}
	});
}
document.querySelector("#heart-off").addEventListener("click", insertHeart);

/*호감도 취소했을 때 db에서 삭제*/
function deleteHeart() {
	$.ajax({
		url: getContextPath() + "/heart",
		type: 'get',
		data: { receiveId: sessionStorage.clickedUserId },
		success: function(data) {
			//console.log(data);
			$('#heart-off').css('display', 'block');
			$('#heart-on').css('display', 'none');

			let num = $(".heart-int").text();
			num = parseInt(num) - 1;

			$(".heart-int").html(num);
		},
		error: function() {
			console.log("error");
		}
	});
}
document.querySelector("#heart-on").addEventListener("click", deleteHeart);

/*db에 저장된 호감도 현상태 불러와서 하트 이미지 바꾸기*/
function selectHeart() {
	$.ajax({
		url: getContextPath() + "/userInfo",
		type: 'get',
		data: { receiveId: sessionStorage.clickedUserId },
		success: function(data) {
			// console.log(data);
			if (data == 1) {
				$('#heart-off').css('display', 'none');
				$('#heart-on').css('display', 'block');
			} else {
				$('#heart-off').css('display', 'block');
				$('#heart-on').css('display', 'none');
			}


		},
		error: function() {
			console.log("error");
		}
	});
}

function countHeart() {
	/*하트 총 개수 표시*/
	$.ajax({
		url: getContextPath() + "/countHeart",
		type: 'post',
		data: { receiveId: sessionStorage.clickedUserId },
		success: function(data) {

			// console.log("좋아요 개수 : " + data);

			$(".heart-int").html(data);
		},
		error: function() {
			console.log("error");
		}
	});
}

/*친구 추가*/
function insertFriend() {
	$.ajax({
		url: getContextPath() + "/friend",
		type: 'get',
		data: { friendId: sessionStorage.clickedUserId },
		success: function(data) {
			// console.log(data);
			$('.plus').css('display', 'none');
			$('.delete').css('display', 'block');

		}, error: function() {
			console.log("error");
		}
	});
}

plusBtn.addEventListener("click", () => {

	document.getElementById("alert-text").innerText = "친구 추가하시겠습니까?";
	document.getElementById("alert-ok").innerText = "추가";

	Alert.openAlert("user-plus");


});
/*동적요소에 이벤트 부여하기 위해 부모요소에게 이벤트를 부여함*/
$('.alert').on('click', '.user-plus', function() {
	/*본인이 실행할 이벤트를 여기에 적용!!!!!!*/
	insertFriend();
	Alert.closeAlert();
	alert.classList.remove("infoAlert");
	alertOverlay.classList.remove("infoAlert-overlay");
})


/*친구 삭제*/
function deleteFriend() {
	$.ajax({
		url: getContextPath() + "/friend",
		type: 'post',
		data: { friendId: sessionStorage.clickedUserId },
		success: function(data) {
			// console.log(data);
			$('.plus').css('display', 'block');
			$('.delete').css('display', 'none');
		},
		error: function() {
			console.log("error");
		}
	});
}

deleteBtn.addEventListener("click", () => {
	

	document.getElementById("alert-text").innerText = "친구 삭제하시겠습니까?";
	document.getElementById("alert-ok").innerText = "삭제";

	Alert.openAlert("user-delete");

});

$('.alert').on('click', '.user-delete', function() {
	
	deleteFriend();
	Alert.closeAlert();
	alert.classList.remove("infoAlert");
	alertOverlay.classList.remove("infoAlert-overlay");
})


/*친구 정보 불러와서 버튼 이미지 바꾸기*/
function selectFriend() {
	$.ajax({
		url: getContextPath() + "/friendInfo",
		type: 'get',
		data: { friendId: sessionStorage.clickedUserId },
		success: function(data) {
			// console.log(data);
			if (data == 1) {
				$('.plus').css('display', 'none');
				$('.delete').css('display', 'block');
			} else {
				$('.plus').css('display', 'block');
				$('.delete').css('display', 'none');
			}
		},
		error: function() {
			console.log("error");
		}
	});
}

/*신고 상세내용 내보내기*/
function report() {
	// console.log(nickName);
	$.ajax({
		url: getContextPath() + "/report",
		data: {
			receiveId: sessionStorage.clickedUserId,
			reportTitle: $(".report-title-box").val(),
			reportContent: $("#report-content-text").val()
		},
		method: 'post',
		success: function(data) {
			// console.log(data);
			if (data > 0) {
				close2();
			} else {
				alert("에러가 발생했습니다.");
			}
		}
	});
};

reportBtn.addEventListener("click", () => {

	document.getElementById("alert-text").innerText = "신고 하시겠습니까?";
	document.getElementById("alert-ok").innerText = "신고";

	Alert.openAlert("report-ok");
});

$('.alert').on('click', '.report-ok', function() {

	if ($(".report-title-box").val() != "" && $("#report-content-text").val() != "") {
		
		report();
		
		Alert.closeAlert();
		alert.classList.remove("infoAlert");
		alertOverlay.classList.remove("infoAlert-overlay");
		
		document.getElementById("home-alert-text").innerHTML = "신고가 접수되었습니다.";
		homeOpenAlert();
	} else if ($(".report-title-box").val() == "") {
		
		document.getElementById("home-alert-text").innerHTML = "제목을 입력해주세요.";
		homeOpenAlert();
		
		Alert.closeAlert();
		alert.classList.remove("infoAlert");
		alertOverlay.classList.remove("infoAlert-overlay");
		
		$(".report-title-box").focus();
	}  else if ($("#report-content-text").val() == "") {
		
		document.getElementById("home-alert-text").innerHTML = "내용을 입력해주세요.";
		homeOpenAlert();
		
		Alert.closeAlert();
		alert.classList.remove("infoAlert");
		alertOverlay.classList.remove("infoAlert-overlay");
		
		$("#report-content-text").focus();
	}
})


/* 신고하기 모달창*/
let open2 = () => {
	document.querySelector(".report-modal").classList.remove("hidden");
	reportModalOpenOverlay();
	
	// 신고하기 누를 때 마다 내용 비워주기
	$(".report-title-box").val("");
	$("#report-content-text").val("");
}

let close2 = () => {
	document.querySelector(".report-modal").classList.add("hidden");
	reportModalCloseOverlay();
}

document.querySelector(".info-report-btn").addEventListener("click", open2);
document.querySelector(".reset-btn").addEventListener("click", close2);


/* 신고 내용 글자수 제한 */
$('#report-content-text').keyup(function(e) {
	//console.log('e : ',e);
	let content = $(this).val();

	// 글자수 세기
	if (content.length == 0 || content == '') {
		$('.content-text-count').text(0);
	} else {
		$('.content-text-count').text(content.length);
	}
})



