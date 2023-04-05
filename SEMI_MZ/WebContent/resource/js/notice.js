/**
 * 작성자 : 박가영
 * 공지사항 js
 */

import { getContextPath } from './common.js';
import { modalstopfn } from './squareCanvas.js';

export let noticeModal = document.querySelector('.notice-modal');

/*공지사항 모달창*/

let close = noticeModal.querySelector("#notice-x-btn");

close.addEventListener("click", e => {
    noticeModal.style.display = 'none';
    modalstopfn();
});

let open = document.querySelector(".notice-detail-view");

function detailOn() {
	open.style.display = "block"
}
        
     /*   function isModalOn() {
            return modal.style.display === "flex"
        }
        function modalOff() {
            modal.style.display = "none"
        }*/
        
        let closeBtn = noticeModal.querySelector(".lists-bgimg")
        closeBtn.addEventListener("click", e => {
            modalOff();
        })
