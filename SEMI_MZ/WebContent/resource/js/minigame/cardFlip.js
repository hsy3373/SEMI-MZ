/**
 * 미니게임 : 카드 뒤집기 JS
 * 작성자 : 윤지영
 */

import { getContextPath,setip } from "../common.js";
import {openAlert} from "../alert.js"

let path = getContextPath();
let ip = setip 

let Flipsocket = new WebSocket(`ws://${ip}${path}/FilpGame`); // 소켓연결
let playnum; //나의 턴/ 상대 턴 설정하는 변수
let firstCard; //첫번쨰 카드 함수
let secondCard; //두번째 카드함수

let cardCheck = false; //두개 이상 뒤집히지 않게 막아주기
let openCard = []; // 뒤집혀진 카드 넣어주기
let score = 0; //점수
let returnsquare = document.getElementById("return-square") 


Flipsocket.onopen = function () {
  let msg = "0," + userName + "," + userSkin;
  Flipsocket.send(msg);
};

Flipsocket.onmessage = function (e) {
  let msg = e.data.split(",");

  //로그인시 msg : 0 -> 퍼즐의 경우 : 1 -> 순서변경시 2 -> 게임 종료시 3,4 -> 카드 틀렸을시 : 7 -> 게임종료 : 9

  if (msg[0] == 0) {
    if (msg.length > 3) {
      playnum = false; //게임 순서 결정
    } else {
      playnum = true;
    }
    user2render(msg); //2p 들어왔을 경우 render해주기
  }

  if (msg[0] == 1) {
    //카드 뒤집는거 체크
    for (let i = 0; i < cardDeck.length; i++) {
      if (cardDeck[i].card == msg[1]) {
        if (cardDeck[i].check1 == msg[2]) {
          cards[i].classList.toggle("flip");
          openCard.push(String(i)); 
          break;
        }
      }
    }  
  }

  if (msg[0] == 2) { // 턴 체인지
    mygametrun = false;
  }

  if(msg[0] == 3 ){
    //2p가 나갔음
    userRenderRemove();
    retunsquareAlert1P();
  }


  if(msg[0] == 4 ){
    //1p가 나갔음 
    userRenderRemove();
    retunsquareAlert1P();
    
    let msg = "0," + userName + "," + userSkin; //내가 이제 1p
    Flipsocket.send(msg);
  }

  if(msg[0] == 7 ){ //틀렸음
    for (let i = 0; i < cardDeck.length; i++) {
      if (cardDeck[i].card == msg[1]) {
        if (cardDeck[i].check1 == msg[2]) {
          cards[i].classList.toggle("flip");
          openCard.pop();
          break;
        }
      }
    }  
  }

  if(msg[0] == 9 ){ //게임종료   
    gameScore(); //게임 결과 호출
  } 
};

const user2Card = document.getElementById("user2-Card"); //상대방 

//상대방 정보를 랜더링
function user2render(msg) {
  user2Card.innerHTML =
    user2Card.innerHTML +
    `<div class="user-front" style="background-image: url(${path}/resource/img/user/skin${msg[2]}/fs.png)">
            <div class="user-name">${msg[1]}</div>
        </div> 
        <div class="user-back"></div>`;
  //2p 데이터 랜더링

  gameStart(); //두명다 들어왔으니 게임 start
}

function userRenderRemove(){
  user2Card.replaceChildren(); //상대방이 떠났을 경우
}

let mygametrun = true; //나의 게임턴인지 여부 결정

const CARD_IMG = [ //카드 덱
  "bear",
  "cat",
  "chick",
  "elephant",
  "kitty",
  "koala",
  "monkey",
  "penguin",
  "rabbit",
  "snail",
  "snake",
  "whale",
  "bear",
  "cat",
  "chick",
  "elephant",
  "kitty",
  "koala",
  "monkey",
  "penguin",
  "rabbit",
  "snail",
  "snake",
  "whale",
];

//카드를 무작위로 섞는 함수
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  //0.5~0.5까지 음수, 양수 무작위 반환
  //sort 를 통해 비교적으로 정렬
}

let cardDeck = []; //카드덱 선언
const BOARD_SIZE = 24; //게임 사이즈 선언


//덱에 카드를 셋팅해주는 함수
function SettingCardDeck() {
  cardDeck = []; //1, 2 로 나눠져서 Deck 들어감

  for (let i = 0; i < 12; i++) {
    cardDeck.push({ card: CARD_IMG[i], check1: 1 });
  }

  for (let i = 12; i < BOARD_SIZE; i++) {
    cardDeck.push({ card: CARD_IMG[i], check1: 2 });
  }

  return cardDeck;
}

// 카드 화면에 세팅
const gameBoard = document.getElementById("game-board");
const cardFront = document.getElementsByClassName("card-front");

//화면에 카드를 랜더링 해주는 함수
function render() { 
  for (let i = 0; i < BOARD_SIZE; i++) {
    gameBoard.innerHTML =
      gameBoard.innerHTML +
      `<div class="card" data-id="${i}" data-card="${cardDeck[i].card}">
        <div class="card-back"></div>
        <div class="card-front"></div>
    </div>`;

    cardFront[
      i
    ].style.backgroundImage = `url(${path}/resource/img/card_img/${cardDeck[i].card}.png)`;
  }
}

function gamerender() {
  SettingCardDeck(); //셋팅된 카드 덱이 넣어주기
  shuffle(cardDeck); ///카드 세팅
  render(); //카드랜더
  retunsquareAlert1P(); //리턴버튼이벤트
}

gamerender(); //메인함수 호출

const cards = document.querySelectorAll(".card"); //랜더링된 카드 셋

//처음 1회 카드 보여주는 함수
function firstOpenDeck() { 
  let count = 0;

  let cardOpen = setInterval(() => {
    cards[count++].classList.toggle("flip");

    if (count == BOARD_SIZE) {
      clearInterval(cardOpen); //24개 열고 정지
      setTimeout(() => hideDeck(), 200);
    } //다시 뒤집기
  }, 200);
}

//보여준 함수 다시 뒤집기
function hideDeck() { 
  for (let i = 0; i < cardDeck.length; +i++) {
    cards[i].classList.toggle("flip");
  }

}

//게임 시작하는 함수 : 뒤집는 함수 호출
function gameStart() {
  retunsquareAlert2P();
  setTimeout(() => firstOpenDeck(), 2000); //1 초뒤에 시작; 
  mygametrun = playnum; 
}

//각각의 카드에 클릭이벤트 부여
cards.forEach((card) => card.addEventListener("click", flipCard));



//카드 클릭이벤트 호출
function flipCard() {
  if (!mygametrun) {
     //같은카드나 open된 카드를 눌렀을 경우 
    //이미 누른카드거나 or 동일한 카드를 눌렀을 경우 이벤트 리턴
    if (openCard.includes(this.dataset.id)) {
      return;
    }

    //카드 뒤집어지는 css 
    if (!cardCheck) { 
      this.classList.toggle(
        "flip"
      ); /*toggle은 추가와 다르게 추가 삭제가 둘다 가능*/

     //상대방에게도 이벤트 전달
      Flipsocket.send(
        "1," + this.dataset.card + "," + cardDeck[this.dataset.id].check1
      );

      //첫번째누른 카드인지
      //두번째로 누른 카드인지 판별
      if (firstCard == null) {
        firstCard = this;
         //첫번쨰로 누른 카드정보 넣어주기
        openCard.push(this.dataset.id);
      } else {
        //두번쨰 카드에 정보 넣어주기
        secondCard = this;
        cardCheck = true;
        setTimeout(() => CardMatch(), 1000); //눈으로 확인할 시간 주기
      }
    }
  }
}

function CardMatch() {
  //첫번쨰카드와 두번째 카드 비교
  if (firstCard.dataset.card != secondCard.dataset.card) {
    //다를 경우 :
    //1. 틀리다면 다시 뒤집어주기
    //2. 카드 두개 초기화
    //3. 배열에 넣어준 뒤집혀진 카드 삭제
    //4. 상대방에게 턴 넘기기
    firstCard.classList.toggle("flip");
    secondCard.classList.toggle("flip");
    openCard.pop(); 
    cardCheck = false;

    /*2p상대방에게 전달 */
    Flipsocket.send(
      "7," +
        firstCard.dataset.card +
        "," +
        cardDeck[firstCard.dataset.id].check1
    );
    Flipsocket.send(
      "7," +
        secondCard.dataset.card +
        "," +
        cardDeck[secondCard.dataset.id].check1
    );

    Flipsocket.send("2");
    mygametrun = true;
  } else {
    //비교해서 첫번쨰와 두번쨰가 동일한 카드면 뒤집힌 채로 유지
    //뒤집어진 카드 셋에 넣어주기
    openCard.push(secondCard.dataset.id);
    cardCheck = false;
    score++;

    //카드가 다 열리면 게임종료
    if (openCard.length == BOARD_SIZE) {
      Flipsocket.send("9,"+score);
      gameScore();
    }
  }

  //카드초기화 
  firstCard = null;
  secondCard = null;
}


// openAlert() : 외부 버튼 클릭시 alert 창 실행시키기 위한 함수
function homeOpenAlert() {
  // alert과 오버레이 찾기
let alert = document.querySelector(".home-alert");
let alertOverlay = document.querySelector(".home-alert-overlay");
  // alert 및 오버레이 표시
  alert.style.display = "block";
  alertOverlay.style.display = "block";

  let okBtn = alert.querySelector(".home-alert-ok");

  //ok 버튼 누르면 광장으로 돌아가기
  okBtn.addEventListener("click",  goSQuare); 
}


function gameScore(){
  let scoreResult;
  if(score < 6){ // 진경우
    document.getElementById("home-alert-text").innerHTML = "패배하셨습니다.<br> 10포인트 획득!";
    scoreResult = 10; //질 경우

  }else if(score == 6){ //비겼을 경우
    document.getElementById("home-alert-text").innerHTML = "무승부.<br> 30포인트 획득!";
    scoreResult = 30;
  
  }else{ // 이겼을 경우 
    document.getElementById("home-alert-text").innerHTML = "승리하셨습니다. <br> 50포인트 획득! ";
    scoreResult = 50;
    
  }

  // ajax로 스코어에 따라 코인 변동 : DB변경
  $.ajax({
    url: path + "/FlipScore",
    data: { score: scoreResult },
    success: function () {
      homeOpenAlert(); 
    }
  });

}

//광장으로 돌아가는 함수
const goSQuare = () => {
  location.href = path + "/forwarding.sq";
}


//상대방이 없을 경우 광장으로 돌아가는 이벤트
function retunsquareAlert1P(){
  returnsquare.addEventListener("click", function() { /*광장으로 돌아가는 알람 */
  document.getElementById("alert-text").innerText = "광장으로 돌아가시겠습니까?";
  openAlert("cardFilp-square")

});

$('.alert').on('click', '.cardFilp-square', function (){
  goSQuare();
})
}

//상대방이 들어오고 게임이 시작된후 광장으로 돌아가는 이벤트
function retunsquareAlert2P(){
  returnsquare.addEventListener("click", function() { /*게임시작후 돌아가는 경우 경고 */
    document.getElementById("alert-text").innerHTML = "게임 시작되었습니다. <br> 지금 광장으로 돌아갈 경우 <br> 패널티가 부과됩니다. <br> 정말 돌아가시겠습니까? ";
    openAlert("start-acardFilp-square")
  });

  //ajax로 게임 패널티 적용시켜주기 코인 -10 
  $('.alert').on('click', '.start-acardFilp-square', function (){
    let scoreResult = -10;
    $.ajax({
      url: path + "/FlipScore",
      data: { score: scoreResult },
      success: function () {
        goSQuare();
      }
    })
    
  })
}

