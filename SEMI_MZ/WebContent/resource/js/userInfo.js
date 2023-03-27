/**
 * 작성자: 박가영
 * 유저 정보창 js
 */

/*import { getContextPath } from './common.js';*/

/*유저 정보창 모달 띄우기*/
let open = () => {
	document.querySelector(".modal").classList.remove("hidden");
}

let close = () => {
	document.querySelector(".modal").classList.add("hidden");
}

document.querySelector(".user1").addEventListener("click", open);
document.querySelector(".x-btn").addEventListener("click", close);

/*유저 성별 조건식*/
let fUrl = '../img/icon/여자.png';
$(document).ready(function() {
    let F = new Image();
    F.src = url;
    $('.user-gender').append(F);
});

/*$(function(){
	if(gender == 'F'){
		$("#skin").attr("src", "../img/icon/여자.png")
	} else if(gender == 'M'){
		$("#skin").attr("src", "../img/icon/남자.png")
	} else {
		$("#skin").attr("src", "../img/icon/성별비공개.png")
	}
}); */

/*$(function(){
	$(".user1").on("click", function(){
		$.ajax({
			url: getContextPath()+"/userInfo.me",
			success : function(data) {
				$(".nickname").text
			}
		});
	});
});*/