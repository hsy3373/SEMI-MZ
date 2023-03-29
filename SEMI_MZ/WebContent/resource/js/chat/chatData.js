/**[han]
 * 채팅 데이터 관련 영역
 * - socket, DB
 */

import * as Common from "../common.js";
import * as ChatFront from "./chatFront.js";

//------------------------웹소켓 관련 구간 -------------------------------------

let ip = ["192.168.30.180", "192.168.0.2", "localhost"];
const webSocket = new WebSocket(`ws://${ip[0]}:8082/mzone/websocket`);
console.log("기본 웹소켓 객체 : ", webSocket);

webSocket.onopen = function (message) {
  console.log("소켓오픈");
  console.log(message);
};

// 2. 웹 소켓 서버에서 sendText, sendObject메소드를 실행하면 실행되는 함수
webSocket.onmessage = function (e) {
  console.log("메세지 수신");
  // 수신된 데이터를 받으려면 이벤트 객체(e)의 data속성을 이용
  //Object형태의 String데이터를 객체로 변환해주기 (JSONObject)
  let chat = JSON.parse(e.data);
  console.log(chat);
  console.log("날짜 " + chat.date);
  //만약 작성자가 현재 로그인된 유저와 같으면 본인 메세지용 클래스 추가
  let cl =
    Common.getSessionStorage("loginUser") == chat.userId
      ? "class='my-chat'"
      : "";
  let str = `<div ${cl} >[${chat.date}]${chat.userId} : ${chat.content}</div>`;

  if (chat.receiveId == "chatLogAll") {
    let chats = Common.getSessionStorage("chatLogAll");
    chats = chats ? chats : "";
    Common.setSessionStorage("chatLogAll", chats + str);
    console.log("채팅하나 all에 저장됨");
  } else {
    let rooms = Common.getSessionStorage("allChatRooms").split(",");
    // 현재 1:1 채팅이 열려있지 않은 유저에게서 채팅이 왔을 경우
    //
    if (rooms.indexOf(chat.userId) < 0) {
      insertChatRoom(chat.userId);
      Common.setSessionStorage(
        "allChatRooms",
        Common.getSessionStorage("allChatRooms") + "," + chat.userId
      );

      ChatFront.setChattingRooms();
    }
    let chats = Common.getSessionStorage("chatLog-" + chat.userId);
    chats = chats ? chats : "";
    Common.setSessionStorage("chatLog-" + chat.userId, chats + str);

    console.log(`채팅하나 ${chat.userId}에 저장됨`);
  }

  // 만약 현재 선택되어있는 채팅룸과 들어온 메세지의 발신자가 같다면
  // 채팅구역에 채팅 추가
  let selected = document.querySelector(".selected-chat");

  // 현재 선택화면 전체채팅일때
  if (selected.id == "chat-all-user" && chat.receiveId == "chatLogAll") {
    document.querySelector(".chat-item-area").innerHTML += str;
    ChatFront.checkChatScroll();
  } else if (selected.querySelector(".room-name").innerText == chat.userId) {
    document.querySelector(".chat-item-area").innerHTML += str;
    ChatFront.checkChatScroll();
  }
};

export const sendChat = (receiveId) => {
  console.log("send안에 소켓 객체 존재하나? : ", webSocket);

  let today = new Date();
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분

  let sendTime = `${month}/${date} ${hours}:${minutes}`;
  let content = document.getElementById("text-send").value;

  let chat = new Chat(
    Common.getSessionStorage("loginUser"),
    receiveId,
    content,
    sendTime
  );
  console.log("채팅객체 : ", chat);

  let str = `<div class='my-chat'>[${sendTime}]${chat.userId} : ${chat.content}</div>`;

  if (receiveId == "chatLogAll") {
    Common.setSessionStorage(
      "chatLogAll",
      Common.getSessionStorage("chatLogAll") + str
    );
  } else {
    Common.setSessionStorage(
      "chatLog-" + receiveId,
      Common.getSessionStorage("chatLog-" + receiveId) + str
    );
    insertChat(chat.receiveId, chat.content);
  }

  // 현재 채팅구역 가장 마지막에 지금 작성한 채팅메세지 추가
  document
    .querySelector(".chat-item-area")
    .insertAdjacentHTML("beforeend", str);

  // 웹 소켓 서버로 메세지를 전송
  webSocket.send(JSON.stringify(chat));
  //모두 진행된 후 채팅 입력 구역에 있던 값 삭제
  document.getElementById("text-send").value = "";
  ChatFront.checkChatScroll();
};

// 채팅 객체 생성용
let Chat = function (userId, receiveId, content, date) {
  this.userId = userId;
  this.receiveId = receiveId;
  this.content = content;
  this.date = date;
};

//---------------- 채팅관련 데이터 주고받기용 함수들--------------------

// 상대 id값 받아서 해당 상대와의 채팅 내역 불러오기
// 스크롤 위치 받아서 끝난 후 채팅화면 스크롤 위치 적용
export let getChattings = function (id, scroll) {
  console.log("채팅 가져오는중");

  let keyName = "chatLog-" + id;
  let path = Common.getContextPath();
  //저장소상 저장되어있는 마지막 chatNo값
  let min = Common.getSessionStorage(keyName + "-no");

  $.ajax({
    type: "get",
    url: path + "/chat.chat",
    dataType: "json",
    data: { recevier: id, minNo: Common.isEmpty(min) ? 0 : min },
    success: (result) => {
      console.log(result, "결과값  ", result.length);

      //만약 불러온 값이 없으면 함수 종료
      if (result.length <= 0) {
        return;
      }

      let str = "";
      let num = result[0].chatNo; // 최저 chatNo 값 저장용 변수
      for (let chat of result) {
        //만약 현재 로그인 된 유저가 보낸 채팅이면 내 채팅용 클래스 추가
        let cl = id != chat.userId ? "class='my-chat'" : "";
        num = num < chat.chatNo ? num : chat.chatNo;
        str += `<div ${cl} >[${chat.date}]${chat.userId} : ${chat.content}</div>`;
      }

      //만약 기존 채팅로그가 쿠키에 저장되어있을경우 처리(기존값에 더함)
      if (!Common.isEmpty(Common.getSessionStorage(keyName))) {
        str += Common.getSessionStorage(keyName);
      }

      Common.setSessionStorage(keyName + "-no", num);
      Common.setSessionStorage(keyName, str);
    },
    befroeSend: function () {
      $(".loadingAni").fadeIn(300);
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  }).done(function () {
    ChatFront.showChattings(keyName);
    let chatArea = document.querySelector(".chat-item-area");
    // 스크롤 위치를 어디로 할 것인지 받아서 해당 위치로 세팅
    if (scroll == "top") {
      chatArea.scrollTop = 0;
    } else if (scroll == "bottom") {
      chatArea.scrollTop = chatArea.scrollHeight;
    } else {
      console.log("위치설정 없었음 : ", chatArea.scrollTop);
    }
    $(".loadingAni").fadeOut();
  });
};

// DB에 채팅 저장하기
let insertChat = function (id, text) {
  let path = Common.getContextPath();
  $.ajax({
    type: "post",
    url: path + "/chat.chat",
    data: {
      recevier: id,
      content: text,
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

// db에서 현재 가지고 있는 채팅 룸 리스트 불러와서 저장소에 저장
export let getChatRoomList = function (id = "") {
  let path = Common.getContextPath();
  $.ajax({
    type: "get",
    url: path + "/room.chat",
    dataType: "json",
    success: (result) => {
      // string list로 들어옴
      let rooms = "";
      for (let room of result) {
        rooms += room + ",";
      }

      //마지막으로 들어간 ',' 제거
      rooms = rooms.slice(0, -1);

      Common.setSessionStorage("allChatRooms", rooms);
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  }).done(function () {
    ChatFront.setChattingRooms(id);
  });
};

//채팅룸 삭제용
export let deleteChatroom = function (el) {
  console.log("앞요소 : ", el.previousElementSibling.innerHTML);
  let id = el.previousElementSibling.innerHTML;
  let path = Common.getContextPath();
  $.ajax({
    type: "post",
    url: path + "/room.chat",
    data: { recevier: id, order: "delete" },
    success: (result) => {
      console.log(id, " 채팅룸 삭제 완료 : ", result);
      getChatRoomList();
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

// 채팅룸 추가용 함수
export let insertChatRoom = function (id, select) {
  let path = Common.getContextPath();
  $.ajax({
    type: "post",
    url: path + "/room.chat",
    data: { receiver: id, order: "insert" },
    success: (result) => {
      console.log(id, " 채팅룸 추가 완료 : ", result);
      //룸 추가가 완료되면 채팅룸 다시부름
      getChatRoomList(id);
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};
