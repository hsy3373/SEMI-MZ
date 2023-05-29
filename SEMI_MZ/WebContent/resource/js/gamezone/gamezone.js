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

  //cardFlip으로 이동
  gameStat.addEventListener('click', () => {
    gogame();
  });
}

//모달 오픈 이벤트
export function gameModalopen() {
  gameModal.style.display = 'block';
}

//게임존으로 이동
const gogame = () => {
  let path = getContextPath();
  location.href = path + '/goGame';
};

if (document.getElementById('go-skin-pang')) {
  //[han]스킨팡 게임 이동 이벤트 할당용
  document.getElementById('go-skin-pang').addEventListener('click', function () {
    location.href = getContextPath() + '/skinPang.game';
  });
}


//게임존 앞뒤 게임 변경 이벤트 
if(document.getElementById('after_btn')){
  document.getElementById('after_btn').addEventListener('click', function(){
    document.getElementById('game1').classList.toggle("disPlayNone");
    document.getElementById('game2').classList.toggle("disPlayNone");
    this.classList.toggle("disPlayNone");
    document.getElementById('before_btn').classList.toggle("disPlayNone");
  })
}

if(document.getElementById('before_btn')){
  document.getElementById('before_btn').addEventListener('click', function(){
    this.classList.toggle("disPlayNone");
    document.getElementById('game1').classList.toggle("disPlayNone");
    document.getElementById('game2').classList.toggle("disPlayNone");
    document.getElementById('after_btn').classList.toggle("disPlayNone");
  })
}