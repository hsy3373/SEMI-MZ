//게임존 js : 작성자 윤지영

import { modalstopfn } from '../squareCanvas.js';
import { getContextPath } from '../common.js';

const gameStat = document.getElementById('Strat-match'); // 시작버튼 누르면

//게임존 닫는 이벤트
const gameModal = document.getElementById('game-modal');
if (document.getElementById('main-square')) {
  document.getElementById('game_xbtn').addEventListener('click', () => {
    gameModal.style.display = 'none';
    modalstopfn();
  });

  gameStat.addEventListener('click', () => {
    gogame();
  });
}

export function gameModalopen() {
  gameModal.style.display = 'block';
}

//게임존으로 이동
const gogame = () => {
  let path = getContextPath();
  location.href = path + '/goGame';
};

if (document.getElementById('skin-pang')) {
  //[han]스킨팡 게임 이동 이벤트 할당용
  document.getElementById('skin-pang').addEventListener('click', function () {
    location.href = getContextPath() + '/skinPang.game';
  });
}
