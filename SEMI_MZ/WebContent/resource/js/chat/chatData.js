/**[han]
 * 채팅 데이터 관련 영역
 * - socket, DB
 *
 * todo! 나중에 아예 실행용 js 파일을 따로 만들어버리고
 * 여기있는 대부분의 함수들을 export처리 해버릴지.. 생각좀 해보기
 */

import * as Common from "../common.js";
import * as ChatFront from "./chatFront.js";

//------------------------웹소켓 관련 구간 -------------------------------------

let ip = ["192.168.30.180", "192.168.0.2", "localhost"];
const webSocket = new WebSocket(`ws://${ip[2]}:8081/mzone/websocket`);
console.log("기본 웹소켓 객체 : ", webSocket);
// 지의 학원: 192.168.30.174:8084
// 지의 집 : 192.168.0.16:8084
let socketOpen = function (message) {
  //console.log("소켓오픈");
  //console.log(message);
};

// 2. 웹 소켓 서버에서 sendText, sendObject메소드를 실행하면 실행되는 함수
let socketOnmessage = function (e) {
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

  let content = chat.content;
  content = content.replace(/(?:\r\n|\r|\n)/g, "<br/>");

  let str = `<div ${cl} >[${chat.date}]${chat.userId} : ${content}</div>`;

  //받는이가 전체 채팅으로 되어있을 경우
  if (chat.receiveId == "chatLogAll") {
    let chats = Common.getSessionStorage("chatLogAll");
    chats = Common.isEmpty(chats) ? "" : chats;
    Common.setSessionStorage("chatLogAll", chats + str);
    console.log("채팅하나 all에 저장됨");
  } else {
    // 받는이가 전체 채팅이 아닐때

    let rooms = Common.getSessionStorage("allChatRooms").split(",");

    // 현재 1:1 채팅이 열려있지 않은 유저에게서 채팅이 왔을 경우
    // 다시 방 정보 불러오도록
    if (rooms.indexOf(chat.userId) < 0) {
      console.log("채팅 열려있지 않음" + chat.userId);
      // 새로 열려야 할 채팅방 아이디 값 전달
      getChatRoomList(null, chat.userId);
    }

    // 만약 해당 채팅 로그에 뭔가 데이터가 있을때만 정보 저장
    let chats = Common.getSessionStorage("chatLog-" + chat.userId);

    if (!Common.isEmpty(chats)) {
      // 채팅 로그가 있는 채팅방일 경우 == 이미 한번 이상 해당 방의 채팅 데이터를 불러왔다는 뜻
      Common.setSessionStorage("chatLog-" + chat.userId, chats + str);
      console.log(`채팅하나 ${chat.userId}에 저장됨`);
    }
  }

  // 만약 현재 선택되어있는 채팅룸과 들어온 메세지의 발신자가 같다면
  // 채팅구역에 채팅 추가
  let selected = document.querySelector(".selected-chat");

  if (selected.id == "chat-all-user" && chat.receiveId == "chatLogAll") {
    // 현재 선택화면 전체채팅이면서 메세지도 전체채팅으로 왔을 때
    document.querySelector(".chat-item-area").innerHTML += str;
    ChatFront.checkChatScroll();
  } else if (
    chat.receiveId != "chatLogAll" &&
    !Common.isEmpty(selected.querySelector(".room-name")) &&
    selected.querySelector(".room-name").innerText == chat.userId
  ) {
    console.log("기타 채팅에 들어옴");
    // 현재 선택화면이 전체 채팅이 아니면서 선택된 화면 텍스트 값이 발신자 아이디와 같을 때
    document.querySelector(".chat-item-area").innerHTML += str;
    ChatFront.checkChatScroll();
  }
};

let fnSocket = {
  onopen: socketOpen,
  onmessage: socketOnmessage,
  onclose: function (e) {
    console.log("재연결...");
    setTimeout(function () {
      //재연결하기...
      webSocket = new WebSocket(socketAddress);
      initSocket(socket);
      console.log("재연결...보냈당");
    }, 1000);
  },
  onerror: (event) => {
    //console.log("WebSocket error: ", event);
  },
};

// 소켓 객체에 미리 설정해둔 이벤트들 부여해주는 함수
let initSocket = function (s) {
  //console.log(s);
  for (let key in fnSocket) {
    s[key] = fnSocket[key];
  }
};

// 소켓 설정 진행
initSocket(webSocket);

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

  //전체채팅은 소켓에서 전체로 다 뿌려주기 때문에 굳이 여기서 또
  // 세션스토리지에 저장할 필요가 없음
  if (receiveId != "chatLogAll") {
    Common.setSessionStorage(
      "chatLog-" + receiveId,
      Common.getSessionStorage("chatLog-" + receiveId) + str
    );

    //DB에 채팅내역 등록
    insertChat(chat.receiveId, chat.content);
    // 채팅룸 등록하되 포커스 되지는 않도록
    insertChatRoom(chat.receiveId, false);

    // 현재 채팅구역 가장 마지막에 지금 작성한 채팅메세지 추가
    document
      .querySelector(".chat-item-area")
      .insertAdjacentHTML("beforeend", str);
  }

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
        let content = chat.content;
        content = content.replace(/(?:\r\n|\r|\n)/g, "<br/>");
        str += `<div ${cl} >[${chat.date}]${chat.userId} : ${content}</div>`;
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
    ChatFront.showChattings(keyName, scroll);
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
// id - 룸리스트 불러온 뒤 자동으로 탭 선택 되어야 할 친구 아이디 값
// newRoom - 만약 현재 없는 룸에서 채팅 수신받았을때 해당 룸 표시될때까지 getChatRoomList 해야함
export let getChatRoomList = function (id, newRoom) {
  let path = Common.getContextPath();
  $.ajax({
    type: "get",
    url: path + "/room.chat",
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
    if (!Common.isEmpty(newRoom)) {
      let rooms = Common.getSessionStorage("allChatRooms");

      if (rooms.indexOf(newRoom) < 0) {
        //만약 새로 불러온 룸 리스트 중에 newRoom이 없다면 다시 getChatRoomList 부르고 함수 종료
        getChatRoomList(id, newRoom);
        return;
      }
    }
    ChatFront.setChattingRooms(id);
  });
};

//채팅룸 삭제용
export let deleteChatroom = function (el) {
  console.log("앞요소 : ", el.previousElementSibling.innerText);
  let id = el.previousElementSibling.innerText;
  console.log(typeof id, id);
  let path = Common.getContextPath();
  $.ajax({
    type: "post",
    url: path + "/room.chat",
    data: { receiver: `${id}`, order: "delete" },
    success: (result) => {
      console.log(id, " 채팅룸 삭제 완료 : ", result);

      Common.delSessionStorage("chatLog-" + id);
      Common.delSessionStorage("chatLog-" + id + "-no");

      getChatRoomList();
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

// 채팅룸 추가용 함수
export let insertChatRoom = function (id, focus) {
  let path = Common.getContextPath();
  $.ajax({
    type: "post",
    url: path + "/room.chat",
    data: { receiver: id, order: "insert" },
    success: (result) => {
      console.log(id, " 채팅룸 추가 완료 : ", result);
      //룸 추가가 완료되면 채팅룸 다시부름
      //다시부를때 해당 채팅룸 포커스 할건지 선택하여 진행
      if (focus) {
        //포커스 됨
        getChatRoomList(id);
      } else {
        // 포커스 안됨
        getChatRoomList();
      }
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

// let checkChatRoom = function(){
//   let path = Common.getContextPath();
//   $.ajax({
//     type: "post",
//     url: path + "/room.chat",
//     data: { receiver: id, order: "insert" },
//     success: (result) => {
//       console.log(id, " 채팅룸 추가 완료 : ", result);
//       //룸 추가가 완료되면 채팅룸 다시부름 + 해당 채팅룸 자동선택
//       getChatRoomList(id);
//     },
//     error: function (req, status, error) {
//       console.log(req, status, error);
//     },
//   });
// }
