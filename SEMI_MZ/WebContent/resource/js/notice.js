/**
 * 작성자 : 박가영
 * 공지사항 js
 */

import { getContextPath } from './common.js';
import { modalstopfn } from './squareCanvas.js';

export let noticeModal = document.querySelector('.notice-modal');

/*공지사항 모달창*/

/*let close = noticeModal.querySelector("#notice-x-btn");

close.addEventListener("click", e => {
    noticeModal.style.display = 'none';
    modalstopfn();
});

let detailModal = document.querySelector('.notice-detail-view');
let open = detailModal.querySelector('.list-bgimg');

open.addEventListener("click", e => {
	detailModal.style.display = 'block';
});*/
$("body").on("click", function(e) {
	console.log(e.target);
	if (e.target.id == 'notice-x-btn') {
		$(".notice-modal").css('display', 'none');
	} else if (e.target.className == 'list-bgimg') {
		$(".notice-modal").css('display', 'none');
		$(".notice-detail-view").css('display', 'block');
	} else if (e.target.id == 'notice-detail-x-btn') {
		$(".notice-detail-view").css('display', 'none');
	}
});

	
function getNoticeList(){
	$.ajax({
		url: getContextPath()+"/selectNotice",
		success : function(data){
			console.log(data);
			if (data > 0) {
				console.log(data);
			} else {
				$(".notice-title").html("공지사항이 없습니다.");
			}
		}, error : function(){
					console.log("실패")
				}
	});
}

