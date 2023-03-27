/**
 * 작성자: 박가영
 * 유저 정보창 js
 */

/*import { getContextPath } from './common.js';*/

let open = () => {
	document.querySelector(".modal").classList.remove("hidden");
}

let close = () => {
	document.querySelector(".modal").classList.add("hidden");
}

document.querySelector(".user1").addEventListener("click", open);
document.querySelector(".x-btn").addEventListener("click", close);