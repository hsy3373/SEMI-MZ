//게임존 js : 작성자 윤지영

import { modalstopfn } from "./squareCanvas.js";

//게임존 닫는 이벤트
const gameModal = document.getElementById("game-modal");
if (document.getElementById("main-square")) {
  document.querySelector(".game_xbtn").addEventListener("click", () => {
    gameModal.style.display = "none";
    modalstopfn();
  });
}

export function gameModalopen() {
  gameModal.style.display = "block";
}