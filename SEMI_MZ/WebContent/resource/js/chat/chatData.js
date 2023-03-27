/**[han]
 * 채팅 데이터 관련 영역
 * - socket, DB
 */

import * as Common from '../common.js';
import * as ChatFront from './chatFront.js';

let ip = ['192.168.30.180', '192.168.0.2'];
const webSocket = new WebSocket('ws://localhost:8082/mzone/websocket');
console.log('기본 웹소켓 객체 : ', webSocket);

webSocket.onopen = function (message) {
  console.log('소켓오픈');
  console.log(message);
};

// 2. 웹 소켓 서버에서 sendText, sendObject메소드를 실행하면 실행되는 함수
webSocket.onmessage = function (e) {
  console.log('메세지 수신');
  // 수신된 데이터를 받으려면 이벤트 객체(e)의 data속성을 이용
  console.log(e);
  console.log(e.data);

  //Object형태의 String데이터를 객체로 변환해주기 (JSONObject)
  console.log(JSON.parse(e.data));

  let chat = JSON.parse(e.data);
  let cl =
    Common.getCookie('loginUser') == chat.userId ? "class='my-chat'" : '';
  let str = `<div ${cl} >[${chat.date}]${chat.userId} : ${chat.content}</div>`;

  if (chat.receiveId == 'chatLogAll') {
    let chats = Common.getCookie('chatLogAll');
    chats = chats ? chats : '';
    Common.setCookie('chatLogAll', chats + str);
    console.log('채팅하나 all에 저장됨');
  } else {
    let rooms = Common.getCookie('allChatRooms').split(',');
    // 현재 1:1 채팅이 열려있지 않은 유저에게서 채팅이 왔을 경우
    if (rooms.indexOf(chat.userId) < 0) {
      insertChatRoom(chat.userId);
      Common.setCookie(
        'allChatRooms',
        Common.getCookie('allChatRooms') + chat.userId + ','
      );
    }
    let chats = Common.getCookie('chatLog-' + chat.userId);
    chats = chats ? chats : '';
    Common.setCookie('chatLog-' + chat.userId, chats + str);

    console.log(`채팅하나 ${chat.userId}에 저장됨`);
  }

  // 만약 현재 선택되어있는 채팅룸과 들어온 메세지의 발신자가 같다면
  // 채팅구역에 채팅 추가
  let selected = document.querySelector('.selected-chat');
  if (
    (selected.id == 'chat-all-user' && chat.receiveId == 'chatLogAll') ||
    selected.querySelector('.room-name').innerText == chat.userId
  ) {
    document.querySelector('.chat-item-area').innerHTML += str;
    ChatFront.checkChatScroll();
  }
};

// 3. 웹 소켓 서버에서 메세지를 전송하는 함수
export const sendChat = (receiveId) => {
  console.log('send안에 소켓 객체 존재하나? : ', webSocket);
  let chat = new Chat(
    Common.getCookie('loginUser'),
    receiveId,
    document.getElementById('text-send').value
  );

  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분

  let str = `<div class='my-chat'>[${month}/${date} ${hours}:${minutes}]${chat.userId} : ${chat.content}</div>`;

  if (receiveId == 'chatLogAll') {
    Common.setCookie('chatLogAll', Common.getCookie('chatLogAll') + str);
  } else {
    Common.setCookie(
      'chatLog-' + receiveId,
      Common.getCookie('chatLog-' + receiveId) + str
    );
    insertChat(chat.receiveId, chat.content);
  }

  document.querySelector('.chat-item-area').append(str);

  webSocket.send(JSON.stringify(chat));
  //모두 진행된 후 채팅 입력 구역에 있던 값 삭제
  document.getElementById('text-send').value = '';
};

let Chat = function (userId, receiveId, content) {
  this.userId = userId;
  this.receiveId = receiveId;
  this.content = content;
};

let insertChat = function (id, text) {
  let path = Common.getContextPath();
  $.ajax({
    type: 'post',
    url: path + '/chat.chat',
    data: {
      recevier: id,
      content: text,
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

//---------------- 채팅 내역 관련 함수들--------------------

// 상대 id값 받아서 해당 상대와의 채팅 내역 불러오기
// 상대 아이디, 불러온 후의 스크롤 위치 설정 값 필요
export let getChattings = function (id, scroll) {
  let path = Common.getContextPath();
  //쿠키상 저장되어있는 마지막 chatNo값
  let min = Common.getCookie('chatLog-' + id + '-no');
  $.ajax({
    type: 'get',
    url: path + '/chat.chat',
    data: { recevier: id, minNo: min ? min : 0 },
    success: (result) => {
      let str = '';
      let num = result[0].chatNo; // 최저 chatNo 값 저장용 변수
      for (let chat of result) {
        //만약 현재 로그인 된 유저가 보낸 채팅이면 내 채팅용 클래스 추가
        let cl = id != chat.userId ? "class='my-chat'" : '';
        num = num < chat.chatNo ? num : chat.chatNo;
        str += `<div ${cl} >[${chat.date}]${chat.userId} : ${chat.content}</div>`;
      }

      //만약 기존 채팅로그가 쿠키에 저장되어있을경우 처리(기존값에 더함)
      if (Common.getCookie('chatLog-' + id)) {
        str += Common.getCookie('chatLog-' + id);
      }
      Common.setCookie('chatLog-' + id, str);
      Common.setCookie('chatLog-' + id + '-no', num);
    },
    befroeSend: function () {
      $('.loadingAni').fadeIn(300);
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  }).done(function () {
    showChattings(id);
    let chatArea = document.querySelector('.chat-item-area');
    // 스크롤 위치를 어디로 할 것인지 받아서 해당 위치로 세팅
    if (scroll == 'top') {
      chatArea.scrollTop = 0;
    } else if (scroll == 'bottom') {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
    $('.loadingAni').fadeOut();
  });
};

// 쿠키에서 채팅 내용 가져와 보여주기용 함수
export let showChattings = function (id) {
  console.log('채팅 보여주기 불림 : ', id);
  let chatLog = Common.getCookie('chatLog-' + id);

  chatLog =
    "<div class='loadingAni'><div class='loader10'></div></div>" + chatLog;

  document.querySelector('.chat-item-area').innerHTML = chatLog;

  $('.loadingAni').fadeOut();
};

//채팅룸 삭제용
export let deleteChatroom = function (el) {
  console.log('앞요소 : ', el.previousElementSibling.innerHTML);
  let id = el.previousElementSibling.innerHTML;
  let path = Common.getContextPath();
  $.ajax({
    type: 'post',
    url: path + '/room.chat',
    data: { recevier: id, order: 'delete' },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });

  let rooms = Common;
};

export let insertChatRoom = function (id) {
  $.ajax({
    type: 'post',
    url: path + '/room.chat',
    data: { recevier: id, order: 'insert' },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

// db에서 현재 가지고 있는 채팅 룸 리스트 불러와서 쿠키에 저장
export let getChatRoomList = function () {
  let path = Common.getContextPath();
  $.ajax({
    type: 'get',
    url: path + '/room.chat',
    success: (result) => {
      // string list로 들어옴
      let rooms = '';
      for (let room of result) {
        rooms += room + ',';
      }
      Common.setCookie('allChatRooms', rooms);
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  }).done(function () {
    $('.loadingAni').fadeOut();
    ChatFront.setChattingRooms();
  });
};
