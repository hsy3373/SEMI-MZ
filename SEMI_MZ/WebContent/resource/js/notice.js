/**
 * 작성자 : 박가영
 * 공지사항 js
 */

import { getContextPath } from './common.js';

/*공지사항 모달창 띄우기*/
let open = () => {
	document.querySelector(".notice-modal").classList.remove("hidden");
}

let close = () => {
	document.querySelector(".notice-modal").classList.add("hidden");
}


document.querySelector(".x-btn").addEventListener("click", close); 