/**
 * 
 *//**
 * 작성자: 박가영
 * 유저 정보창 js
 */

import { getContextPath } from './common.js';

/*유저 정보 모달창 띄우기*/
let open = () => {
	document.querySelector(".info-modal").classList.remove("hidden");
}

let close = () => {
	document.querySelector(".info-modal").classList.add("hidden");
}


document.querySelector("#x-btn").addEventListener("click", close);

let nickName;

/*유저 정보 가져오기*/
export function getUserInfo(){
	$.ajax({
		url: getContextPath()+"/userInfo",
		data : {userId : sessionStorage.clickedUserId}, /*'test' 부분에 나중에 session 유저id 객체 넣으면 됨 / sessionStorage.getItem('')*/
		method: 'post',
		success : function(data) {
			console.log(data);
			
			// 데이터 가져오기	
			nickName = data.nicName;
			$(".nickname").html(nickName);
			$(".user-nickname").html(nickName);
				
			/* 스킨 경로가 비어있어 오류 뜸 */
			/*let skinId = data.skinId;
			$("#skin").attr(skinId);*/
				
			let info = data.info;
			$(".introduce").html(info);
			selectHeart();	
			let gender = data.gender;
			console.log(gender);
			if (gender == 'W') {
				$("#gender-w").attr("src", "../resource/img/icon/여자.png");
			} else if (gender == 'M') {
				$("#gender-m").attr("src", "../resource/img/icon/남자.png");
			} else {
				$("#gender-n").attr("src", "../resource/img/icon/성별비공개.png");
			}
		}
	});
};

/*하트 클릭 했을 때 호감도 상태 db에 저장*/
function insertHeart(){
	$.ajax({
		url: getContextPath()+"/heart",
		type: 'post',
		data: {receiveId : sessionStorage.clickedUserId},
		success: function(data){
			console.log(data);
			$('#heart-off').css('display', 'none');
			$('#heart-on').css('display', 'block');
		},
		error: function(){
			console.log("error");
		}
	});
}
document.querySelector("#heart-off").addEventListener("click", insertHeart);

/*호감도 취소했을 때 db에서 삭제*/
function deleteHeart(){
	$.ajax({
		url: getContextPath()+"/heart",
		type: 'get',
		data: {receiveId : sessionStorage.clickedUserId},
		success: function(data){
			console.log(data);
			$('#heart-off').css('display', 'block');
			$('#heart-on').css('display', 'none');
		},
		error: function(){
			console.log("error");
		}
	});
}
document.querySelector("#heart-on").addEventListener("click", deleteHeart);

/*db에 저장된 호감도 현상태 불러와서 하트 이미지 바꾸기*/
function selectHeart(){
	$.ajax({
		url: getContextPath()+"/userInfo",
		type: 'get',
		data: {receiveId : sessionStorage.clickedUserId},
		success: function(data){
			console.log(data);
			if (data == 1) {
				$('#heart-off').css('display', 'none');
				$('#heart-on').css('display', 'block');
			}
		},
		error: function(){
			console.log("error");
		}
	});
}

/*친구 추가*/
function insertFriend(){
	$.ajax({
		url: getContextPath()+"/friend",
		type: 'get',
		data: {receiveId : sessionStorage.clickedUserId},
		success: function(data){
			console.log(data);
			$('.plus').css('display', 'none');
			$('.delete').css('display', 'block');
		},
		error: function(){
			console.log("error");
		}
	});
}
document.querySelector(".plus").addEventListener("click", insertFriend);

/*신고 상세내용 내보내기*/
function report(){
	console.log(nickName);
	$.ajax({
		url: getContextPath()+"/report",
		data: {receiveId : sessionStorage.clickedUserId,
		       reportTitle: $(".title-box").val(),
		       reportContent: $("#content-text").val()},
		method: 'post',
		success : function(data) {
			console.log(data);
			if(result > 0){
				close2();
			}else{
				alert("에러가 발생했습니다.");
			}			
		}
	});
};
document.querySelector(".report-btn").addEventListener("click", report);

/* 신고하기 모달창 띄우기 */
let open2 = () => {
	document.querySelector(".report-modal").classList.remove("hidden");
}

let close2 = () => {
	document.querySelector(".report-modal").classList.add("hidden");
}

document.querySelector(".info-report-btn").addEventListener("click", open2);
document.querySelector(".reset-btn").addEventListener("click", close2);

/* 신고 후 신고창 숨기기 */
/*document.querySelector(".report-btn").addEventListener("click", close2);*/

/*window.onload = function(){
	let reset = document.querySelector(".reset-btn");
	reset.addEventListener("click", function(){
		console.log('reset 눌림');
	});
};*/

/* 신고 내용 글자수 제한 */
$('#report-content-text').keyup(function (e) {
	console.log(e);
	let content = $(this).val();
    
    // 글자수 세기
    if (content.length == 0 || content == '') {
    	$('.text-count').text(0);
    } else {
    	$('.text-count').text(content.length);
    }
})
