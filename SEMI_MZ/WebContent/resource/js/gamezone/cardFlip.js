/**
 * 미니게임 : 카드 뒤집기 JS
 * 작성자 : 윤지영
 *
 */

import { getContextPath } from "../common.js";
let path = getContextPath();

let Flipsocket = new WebSocket("ws://192.168.30.171:8083" + path + "/FilpGame");
let playnum;
let firstCard; //첫번쨰 카드 함수
let secondCard; //두번째 카드함수

let cardCheck = false; //두개 이상 뒤집히지 않게 막아주기
let openCard = []; // 뒤집혀진 카드 넣어주기
let score = 0; //점수

Flipsocket.onopen = function (e) {
  console.log("접속성공");
  let msg = "0," + userName + "," + userSkin;
  console.log(msg);
  Flipsocket.send(msg);
};

Flipsocket.onmessage = function (e) {
  console.log("메세지 감지");
  let msg = e.data.split(",");
  console.log(msg[0]);

  //고민해봤는데 공백기준말고 ,기준으로 나누는게 나을듯
  // 0번은 : 로그인시 msg -> 퍼즐의 경우 1 -> 순서변경시 2 -> 게임 종료시 3,4

  if (msg[0] == 0) {
    if (msg.length > 3) {
      playnum = false;
      console.log("내가 1p야");
    } else {
      //내가 늦게들어간 경우
      playnum = true;
      console.log("내가 2p야");
    
    }
    user2render(msg); //2p 들어왔을 경우 render해주기
  }

  if (msg[0] == 1) {
    //카드 뒤집는거 체크
    for (let i = 0; i < cardDeck.length; i++) {
      if (cardDeck[i].card == msg[1]) {
        if (cardDeck[i].check1 == msg[2]) {
          console.log("check1까지 체크");
          cards[i].classList.toggle("flip");
          openCard.push(String(i)); 
          console.log(openCard);
          break;
        }
      }
    }  
  }

  if (msg[0] == 2) {
    console.log("체인지..");
    mygametrun = false;
  }

  if(msg[0] == 3 ){
    //2p가 나갔음
    userRenderRemove();
  }


  if(msg[0] == 4 ){
    //1p가 나갔음 
    userRenderRemove();
    
    let msg = "0," + userName + "," + userSkin; //내가 이제 1p
    Flipsocket.send(msg);
  }

  if(msg[0] == 7 ){ //틀렸음
    for (let i = 0; i < cardDeck.length; i++) {
      if (cardDeck[i].card == msg[1]) {
        if (cardDeck[i].check1 == msg[2]) {
          console.log("check1까지 체크");
          cards[i].classList.toggle("flip");
          openCard.pop();
          break;
        }
      }
    }  
  }

  if(msg[0] == 9 ){ //게임종료 
    
    gameScore();
    console.log(score);
  } 
};


const user2Card = document.getElementById("user2-Card");

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
  user2Card.replaceChildren();
}

let mygametrun = true;

const CARD_IMG = [
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

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  //0.5~0.5까지 음수, 양수 무작위 반환
  //sort 를 통해 비교적으로 정렬
}

let cardDeck = []; //카드덱 선언
const BOARD_SIZE = 24; //게임 사이즈 선언

function SettingCardDeck() {
  cardDeck = [];

  for (let i = 0; i < 12; i++) {
    cardDeck.push({ card: CARD_IMG[i], check1: 1 });
  }
  //   test = cardDeck.;
  //   console.log(test);

  for (let i = 12; i < BOARD_SIZE; i++) {
    cardDeck.push({ card: CARD_IMG[i], check1: 2 });
  }

  console.log(cardDeck);
  return cardDeck;
}

// 카드 화면에 세팅
const gameBoard = document.getElementById("game-board");
const cardBack = document.getElementsByClassName("card-back");
const cardFront = document.getElementsByClassName("card-front");

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
  // retunsquare.style.display = "none"; /////////////여기!!!!
  SettingCardDeck(); //셋팅된 카드 덱이 넣어주기
  shuffle(cardDeck); ///카드 세팅
  render();
}

gamerender();

const cards = document.querySelectorAll(".card");
console.log(cards);

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

function hideDeck() {
  for (let i = 0; i < cardDeck.length; +i++) {
    cards[i].classList.toggle("flip");
  }

  //start : 이전 구상한거 뒤집은 이후 적용할 수 있게 정리해주기
}

function gameStart() {
  setTimeout(() => firstOpenDeck(), 1000); //1 초뒤에 시작; : 후에 수정할지도
  mygametrun = playnum;
}



cards.forEach((card) => card.addEventListener("click", flipCard));

//클릭이벤트

function flipCard() {
  console.log(openCard);


  if (!mygametrun) {
    if (openCard.includes(this.dataset.id)) {
      //같은카드나 open된 카드를 눌렀을 경우
      console.log("돌아가용~~");
      return;
    }

    if (!cardCheck) {
      this.classList.toggle(
        "flip"
      ); /*toggle은 추가와 다르게 추가 삭제가 둘다 가능*/

      //console.log(this.dataset); //누른 div 정보

      //이미 누른카드거나 or 동일한 카드를 눌렀을 경우 이벤트 리턴

      //console.log(openCard);
      //console.log(cardDeck[this.dataset.id].check1);
      // console.log(this.dataset.card+","+cardDeck[this.dataset.id].check1)
      Flipsocket.send(
        "1," + this.dataset.card + "," + cardDeck[this.dataset.id].check1
      );

      //첫번째누른 카드인지
      //두번째로 누른 카드인지 판별
      if (firstCard == null) {
        firstCard = this;
        openCard.push(this.dataset.id);
        //첫번쨰로 누른 카드정보 넣어주기
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
    //다를 경우
    //틀리다면 다시 뒤집어주기
    //카드 두개 초기화
    firstCard.classList.toggle("flip");
    secondCard.classList.toggle("flip");
    openCard.pop(); //배열에 넣어준 뒤집혀진 카드 삭제
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
      alert("클리어!!");
      console.log("여기왔어!!!");
      Flipsocket.send("9,"+score);
      gameScore();
    }
  }

  //카드초기화
  firstCard = null;
  secondCard = null;
}

function gameScore(){
  let scoreResult;
  if(score <= 6){ // 진경우
    console.log("나!! 졌어!!!")
    scoreResult = 10; //질 경우

  }else if(score == 6){ //비겼을 경우
    console.log("나!! 비겼어!! !!!")
    scoreResult = 30;
  
  }else{ // 이겼을 경우 
    console.log("나!! 이겼어!!!!!")
    scoreResult = 50;
    
  }

  $.ajax({
    url: path + "/FlipScore",
    data: { score: scoreResult },
    success: function (result) {
      console.log(result);
      goSQuare();
    }
    
    
  });

  


}

function noEvent() { //새로고침 막는거랬는디..
  if (event.keyCode == 116) {
  event.keyCode= 2;
  return false;
  }
  else if(event.ctrlKey && (event.keyCode==78 || event.keyCode == 82))
  {
  return false;
  }
  }
  document.onkeydown = noEvent;

const goSQuare = () => {
  console.log(path + "/forwarding.sq");
  location.href = path + "/forwarding.sq";
}

let returnsquare = document.getElementById("return-square")
returnsquare.addEventListener("click", goSQuare);

