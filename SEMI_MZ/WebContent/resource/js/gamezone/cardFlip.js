/**
 * 미니게임 : 카드 뒤집기 JS
 * 작성자 : 윤지영
 * 
 */

import { getContextPath } from "../common.js";
let path = getContextPath();


let Flipsocket = new WebSocket("ws://192.168.30.171:8083" + path + "/FilpGame");






// let fnSocket = {
//     onopen: function (e) {
//       console.log("접속성공");
//       let User = new UserData(
//         uesrX,
//         uesrY,
//         userSkin,
//         userId,
//         userName,
//         "ArrowDown",
//         "F"
//       ); //처음유저
//       socket.send(JSON.stringify(User)); //첫 접속 알려줌
//     },
//     onmessage: function (e) {
//       // console.log('메세지 감지');
//       //console.log(e);
//       //console.log(e.data);
  
//       //데이터가 나인 경우 걸러내기
//       let receivedUser = JSON.parse(e.data);
//       receivedUserId = receivedUser.userId;
  
//       if (receivedUser.connecting == "X") {
//         alert("이중 로그인 되었습니다. 재 로그인 해주세요");
//         location.href = path + "/logout"; //둘 다 쫒겨남..^^...
//       }
  
//       if (receivedUser.userId !== userId) {
//         //console.log(receivedUserId)
//         UsersData.push(receivedUser);
//         //userData에 담겨있는 userId 값 기준으로 필터링 : 마지막 값만 남김
//         FilterUsers = UsersData.filter(
//           (arr, index, callback) =>
//             index === callback.findLastIndex((t) => t.userId === arr.userId)
//         );
//       }
  
//       //떠난 유저 체크해서 삭제하기
//       FilterUsers = FilterUsers.filter((user) => user.connecting != "N"); //삭제
  
//       //UsersData.push(JSON.parse(e.data)); // String -> 배열 변환
//       //console.log(UsersData)  //object
  
//       UsersData = FilterUsers; // Userdate 정보를 Fileter 정보로 바꿔주기
//       //console.log(FilterUsers);
  
//       //userrender 함수 호출
//       usersreder();
//     },
//     onclose: function (e) {
//       //console.log(e);
//       console.log("재연결...");
//       setTimeout(function () {
//         //재연결하기...
//         socket = new WebSocket(
//           "ws://192.168.30.171:8083" + path + "/multiAccess"
//         );
//         initSocket(socket);
//         console.log("재연결...보냈당");
//       }, 1000);
//     },
//     onerror: (event) => {
//       console.log("WebSocket error: ", event);
//     },
//   };
//   function initSocket(s) {
//     for (let key in fnSocket) {
//       s[key] = fnSocket[key];
//       //console.log(s[key] , fnSocket[key]);
//     }
//   }
  
//   //데이터 전송 JSON
//   const sendMsg = (keyboardCode) => {
//     let connecting = "Y";
  
//     //유저객체 넣어주기 : 랜더링에 필요한 정보들 : x, y , skin, id , name, code;
//     let User = new UserData(
//       uesrX,
//       uesrY,
//       userSkin,
//       userId,
//       userName,
//       keyboardCode,
//       connecting
//     );
//     //console.log(User)
  
//     socket.send(JSON.stringify(User));
//     //문자열 객체 데이터로 바꿔줌
//   };
















const CARD_IMG = ['bear', 'cat', 'chick', 'elephant',
    'kitty', 'koala', 'monkey', 'penguin', 'rabbit', 'snail', 'snake', 'whale',
    'bear', 'cat', 'chick', 'elephant',
    'kitty', 'koala', 'monkey', 'penguin', 'rabbit', 'snail', 'snake', 'whale'];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    //0.5~0.5까지 음수, 양수 무작위 반환
    //sort 를 통해 비교적으로 정렬
}



let cardDeck = []; //카드덱 선언
const BOARD_SIZE = 24; //게임 사이즈 선언

function SettingCardDeck() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        cardDeck.push({ card: CARD_IMG[i], isOpen: false, isMatch: false })
    }

    return cardDeck;
}



// 카드 화면에 세팅
const gameBoard = document.getElementById("game-board")
const cardBack = document.getElementsByClassName("card-back");
const cardFront = document.getElementsByClassName("card-front");

function render() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        gameBoard.innerHTML = gameBoard.innerHTML +
            `<div class="card" data-id="${i}" data-card="${cardDeck[i].card}">
        <div class="card-back"></div>
        <div class="card-front"></div>
    </div>`

        cardFront[i].style.backgroundImage = `url(${path}/resource/img/card_img/${cardDeck[i].card}.png)`;
    }
}




function gameStart(){
    shuffle(CARD_IMG); ///카드 세팅
    SettingCardDeck(); //셋팅된 카드 덱이 넣어주기
    render();

}


gameStart();




const cards = document.querySelectorAll('.card');
console.log(cards)


function firstOpenDeck() {

    let count = 0;

    let cardOpen = setInterval(() => {

        cards[count++].classList.toggle('flip');

        if (count == BOARD_SIZE) {
            clearInterval(cardOpen);//24개 열고 정지
            setTimeout(() => hideDeck(), 200);
        } //다시 뒤집기 
    }, 200)
}

firstOpenDeck();

function hideDeck() {
    for (let i = 0; i < cardDeck.length; +i++) {
        cards[i].classList.toggle('flip');
    }

    //start : 이전 구상한거 뒤집은 이후 적용할 수 있게 정리해주기

}




let firstCard; //첫번쨰 카드 함수
let secondCard; //두번째 카드함수

let cardCheck = false; //두개 이상 뒤집히지 않게 막아주기
let openCard = []; // 뒤집혀진 카드 넣어주기


//클릭이벤트
cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    console.log(openCard);

    if (openCard.includes(this.dataset.id)) { //같은카드나 open된 카드를 눌렀을 경우
        console.log('돌아가용~~');
        return;
    }




    if (!cardCheck) {
        this.classList.toggle('flip'); /*toggle은 추가와 다르게 추가 삭제가 둘다 가능*/

        //console.log(this.dataset); //누른 div 정보

        //이미 누른카드거나 or 동일한 카드를 눌렀을 경우 이벤트 리턴


        console.log(openCard)

        //첫번째누른 카드인지 
        //두번째로 누른 카드인지 판별
        if (firstCard == null) {
            firstCard = this
            openCard.push(this.dataset.id);
            //첫번쨰로 누른 카드정보 넣어주기
        } else {
            //두번쨰 카드에 정보 넣어주기
            secondCard = this
            cardCheck = true;
            setTimeout(() => CardMatch(), 1000); //눈으로 확인할 시간 주기
        }

    }

}

function CardMatch() {
    //첫번쨰카드와 두번째 카드 비교
    if (firstCard.dataset.card != secondCard.dataset.card) { //다를 경우
        //틀리다면 다시 뒤집어주기
        //카드 두개 초기화 
        firstCard.classList.toggle('flip');
        secondCard.classList.toggle('flip');
        openCard.pop(); //배열에 넣어준 뒤집혀진 카드 삭제
        cardCheck = false;
    } else {
        //비교해서 첫번쨰와 두번쨰가 동일한 카드면 뒤집힌 채로 유지
        //뒤집어진 카드 셋에 넣어주기 
        openCard.push(secondCard.dataset.id);
        cardCheck = false;

        //카드가 다 열리면 게임종료
        if (openCard.length == BOARD_SIZE) {

            alert("클리어!!")
            console.log("여기왔어!!!")

        }

    }

    //카드초기화
    firstCard = null;
    secondCard = null;

}