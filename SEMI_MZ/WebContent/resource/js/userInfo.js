/**
 * 작성자: 박가영
 * 유저 정보창 js
 */

import { getContextPath } from './common.js';

/*유저 정보 모달창 띄우기*/
let open = () => {
	document.querySelector(".modal").classList.remove("hidden");
}

let close = () => {
	document.querySelector(".modal").classList.add("hidden");
}

document.querySelector(".user1").addEventListener("click", open);
document.querySelector(".x-btn").addEventListener("click", close);

/*유저 정보 가져오기*/
function getUserInfo(){
	$.ajax({
		url: getContextPath()+"/userInfo.me",
		data : {userId : 'user2'}, /*'test' 부분에 나중에 session 유저id 객체 넣으면 됨*/
		method: 'post',
		success : function(data) {
			console.log(data);
			
			// 데이터 가져오기	
			let nickName = data.nicName
			$(".nickname", ".user-nickname").html(nickName);
				
			/* 스킨 경로가 비어있어 오류 뜸 */
			/*let skinId = data.skinId
			$("#skin").attr(skinId);*/
				
			let info = data.info
			$(".introduce").html(info);
				
			let gender = data.gender
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
}
getUserInfo();

/* 신고하기 모달창 띄우기 */
let open2 = () => {
	document.querySelector(".report-modal").classList.remove("hidden");
}

let close2 = () => {
	document.querySelector(".report-modal").classList.add("hidden");
}

document.querySelector(".report").addEventListener("click", open2);
document.querySelector(".reset-btn").addEventListener("click", close2);

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