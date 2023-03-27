/**
 * 작성자: 박가영
 * 유저 정보창 js
 */

/*import { getContextPath } from './common.js';*/

let open = document.querySelector(".user1");
let close = document.querySelector(".x-btn");
let modal = document.querySelector(".user-modal");

function init() {
	open.addEventListener("click", function() {
		modal.classList.remove(".hidden");
	});
	close.addEventListener("click", function() {
		modal.classList.add(".hidden");
	});
}

init();
