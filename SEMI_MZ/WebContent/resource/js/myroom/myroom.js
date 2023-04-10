/*
 *	작성자 : 노지의
 *	마이룸  JS
 */
/* js 가져오기 */
import { getContextPath } from "../common.js";
let path = getContextPath();

$(function(){
/*	console.log("로그인아이디 : "+loginUserId);
	console.log("방주인 : "+roomMasterId);*/
	
	/*roomMasterId가 '' 이면 마이룸 -> 조회만 할 수 있도록*/
	if(roomMasterId != ''){
		document.querySelector("#my-heart-off").addEventListener("click", insertHeart);
		document.querySelector("#my-heart-on").addEventListener("click", deleteHeart);
		selectHeart();
		countHeart(roomMasterId);
		friendName();
	}
	else{
		countHeart(loginUserId);
		$('#my-heart-off').css('cursor', 'default');
		$('#my-heart-on').css('cursor', 'default');
		$('.my-heart-num').css('cursor', 'default');
	}
	
	

	
});
//loginUserId
//roomMasterId
/*친구룸에서 친구닉네임 조회*/
function friendName(){
	$.ajax({
		url : path + "/friendNickName",
		type : 'post',
		data : {receiveId : roomMasterId},
		success : function(name){
			//console.log(name);
			$(".out-friend-id").text(name);
		},
		error : function(){
			console.log("접속실패");
		}
	});
}

/*하트 클릭 했을 때 호감도 상태 db에 저장*/
function insertHeart(){
	$.ajax({
		url: path +"/heart",
		type: 'post',
		data: {receiveId : roomMasterId},
		success: function(data){
			console.log(data);
			$('#my-heart-off').css('display', 'none');
			$('#my-heart-on').css('display', 'block');
			/*1 더하기*/
			let num = $(".my-heart-num").text();
			num = parseInt(num) + 1;
			$(".my-heart-num").text(num);
			
		},
		error: function(){
			console.log("error");
		}
	});
}
//document.querySelector("#my-heart-off").addEventListener("click", insertHeart);
/*호감도 취소했을 때 db에서 삭제*/
function deleteHeart(){
	$.ajax({
		url: path + "/heart",
		type: 'get',
		data: {receiveId : roomMasterId},
		success: function(data){
			//console.log(data);
			$('#my-heart-off').css('display', 'block');
			$('#my-heart-on').css('display', 'none');
			/*1빼기*/
			let num = $(".my-heart-num").text();
			num = parseInt(num) - 1;
			$(".my-heart-num").text(num);
		},
		error: function(){
			console.log("error");
		}
	});
}
//document.querySelector("#my-heart-on").addEventListener("click", deleteHeart);

function selectHeart(){
	/*db에 저장된 호감도 현상태 불러와서 하트 이미지 바꾸기*/
	$.ajax({
		url: path +"/userInfo",
		type: 'get',
		data: {receiveId : roomMasterId},
		success: function(data){
			//console.log(data);
			if (data == 1) {
				$('#my-heart-off').css('display', 'none');
				$('#my-heart-on').css('display', 'block');
			}
		},
		error: function(){
			console.log("error");
		}
	});
}

function countHeart(receiveID){
	/*하트 총 개수 표시*/
	$.ajax({
		url : path + "/countHeart",
		type : 'post',
		data: {receiveId : receiveID},
		success : function(count){
			//console.log("좋아요 개수 : "+count);
			$(".my-heart-num").text(count);
			// 내방에서 좋아요개수 있을 때 하트표시
			if(roomMasterId == ''){
				if (count > 0) {
					$('#my-heart-off').css('display', 'none');
					$('#my-heart-on').css('display', 'block');
				}else{
					$('#my-heart-off').css('display', 'block');
					$('#my-heart-on').css('display', 'none');
					
				}
			}
		},
		error : function(){
			console.log("error");
		}
	});
}


