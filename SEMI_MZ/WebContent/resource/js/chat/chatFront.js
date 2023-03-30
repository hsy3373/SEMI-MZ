/**[han]
 * 채팅 화면 표시 관련 영역
 * - css 변경, 클릭 이벤트 등
 */
import * as Common from "../common.js";
import * as ChatData from "./chatData.js";

// ----------------- 채팅 영역 높이 변경 이벤트 --------------------

// 사용자 드래그를 통한 채팅 전체 영역 높이 변경
let resizeChatarea = function () {
  // 대상 Element 선택
  const resizer = document.getElementById("dragMe");
  const leftSide = resizer.previousElementSibling;
  const rightSide = resizer.nextElementSibling;

  // 마우스의 위치값 저장을 위해 선언
  let x = 0;
  let y = 0;

  // 크기 조절시 왼쪽 Element를 기준으로 삼기 위해 선언
  let rightHeight = 0;

  // resizer에 마우스 이벤트가 발생하면 실행하는 Handler
  const mouseDownHandler = function (e) {
    // 마우스 위치값을 가져와 x, y에 할당
    x = e.clientX;
    y = e.clientY;
    // left Element에 Viewport 상 height 값을 가져와 넣음
    rightHeight = rightSide.getBoundingClientRect().height;

    // 마우스 이동과 해제 이벤트를 등록
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // 마우스가 움직이면 기존 초기 마우스 위치에서 현재 위치값과의 차이를 계산
    const dx = x - e.clientX;
    const dy = y - e.clientY;

    // 크기 조절 중 마우스 커서를 변경함
    // class="resizer"에 적용하면 위치가 변경되면서 커서가 해제되기 때문에 body에 적용
    document.body.style.cursor = "col-resize";

    // 이동 중 양쪽 영역(왼쪽, 오른쪽)에서 마우스 이벤트와 텍스트 선택을 방지하기 위해 추가
    leftSide.style.userSelect = "none";
    leftSide.style.pointerEvents = "none";

    rightSide.style.userSelect = "none";
    rightSide.style.pointerEvents = "none";

    // 초기 height 값과 마우스 드래그 거리를 더한 뒤 상위요소(container)의 너비를 이용해 퍼센티지를 구함
    // 계산된 퍼센티지는 새롭게 left의 height로 적용
    //const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
    const newRightHeight =
      ((rightHeight + dy) * 100) /
      resizer.parentNode.getBoundingClientRect().height;
    rightSide.style.height = `${newRightHeight}%`;
  };

  const mouseUpHandler = function () {
    // 모든 커서 관련 사항은 마우스 이동이 끝나면 제거됨
    resizer.style.removeProperty("cursor");
    document.body.style.removeProperty("cursor");

    rightSide.style.removeProperty("user-select");
    rightSide.style.removeProperty("pointer-events");

    rightSide.style.removeProperty("user-select");
    rightSide.style.removeProperty("pointer-events");

    // 등록한 마우스 이벤트를 제거
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  // 마우스 down 이벤트를 등록
  resizer.addEventListener("mousedown", mouseDownHandler);
};

//-------------------- 채팅 입력 구역 높이 조절 -------------------
// 채팅입력 구역 내용 길이에 따라 자동 높이 변경
const handleResizeHeight = () => {
  const textarea = $("#text-send");
  textarea.css("height", "auto"); //height 초기화
  // 입력구역 총 길이가 30~100사이로 되도록 처리
  if (textarea.prop("scrollHeight") <= 30) {
    textarea.css("height", "30px");
  } else if (textarea.prop("scrollHeight") <= 100) {
    textarea.css("height", textarea.prop("scrollHeight") + "px");
  } else {
    textarea.css("height", "100px");
  }
};

let resizeSendarea = function () {
  // 내용 변경있을 때의 이벤트에 높이조절 함수 대입
  $("#text-send").bind("input propertychange", handleResizeHeight);
};

//----------------- 채팅 스크롤 하단 고정 -------------

export let checkChatScroll = function () {
  let chatArea = document.querySelector(".chat-item-area");

  // clientHeight : 요소의 내부 높이, 패딩 값은 포함, 스크롤바/테두리/마진은 제외
  // scrollTop : 요소의 스크롤바 수직 위치
  // eh = 요소의 내부높이(전체높이가 아니라 현재 화면에서 차지하고있는 높이) + 요소 스크롤바 위치
  let eh = chatArea.clientHeight + chatArea.scrollTop;

  // 스크롤이 최하단 근처 일때만 고정
  if (Math.abs(chatArea.scrollHeight - eh) <= 60) {
    // scrollHeight   : 요소에 들어있는 컨텐츠의 전체 높이, 패딩/테두리포함, 마진은 제외
    chatArea.scrollTop = chatArea.scrollHeight;
  }
};

// 채팅 테스트용 함수
const start = () => {
  let i = 1;
  setInterval(() => {
    document.querySelector(
      ".chat-item-area"
    ).innerHTML += `<p>${i}번째 메시지입니다.</p>`;
    i++;
    checkChatScroll();
  }, 1500);
};

//-------------------- 채팅룸 리스트 아이템들 클릭 이벤트 ---------------

//채팅룸 리스트 아이템 클릭시 해당 채팅룸 선택되며 내용 표시
export let clickChatRoom = function (e) {
  // 만약 동일한 것을 클릭했다면 함수 종료
  if ($(".selected-chat") == $(e)) {
    return;
  }

  //모든 채팅룸들 width 값 리셋
  $(".chat-room-item").css({ width: "20%" });
  $(".room-name").css({ "padding-left": "4px" });

  //전체채팅 외에 다른 룸이 선택되었을 경우 추가 조정
  if ($(e).attr("id") != "chat-all-user") {
    // 현재 눌린 채팅룸 width 값 추가 조정
    $(e).css({
      width: $(e).children(".room-name").text().length * 15 + 50 + "px",
    });
    // 현재눌림 채팅룸 이름에 패딩 값 없애기
    $(e).children(".room-name").css({
      "padding-left": "0px",
    });
  }

  // 이전에 적용되어있던 클래스 삭제
  $(".selected-chat").removeClass("selected-chat");

  // this의 현재 클래스들 모두 불러옴
  let currentClasses = $(e).prop("class");
  // selected-chat을 가장 상위로 적용받게 하기위에 앞에 넣고 클래스들 값 합쳐서 클래스추가
  $(e)
    .removeClass(currentClasses)
    .addClass("selected-chat" + " " + currentClasses);

  // 선택된 채팅룸의 채팅 내용 불러오기 위한 로직
  let id = "";
  if ($(e).attr("id") == "chat-all-user") {
    id = "chatLogAll";
  } else {
    id = $(e).children(".room-name").text();
  }
  if (id == "chatLogAll") {
    //전체채팅은 따로 DB에 저장되어있지 않기때문에 그냥 보여주기
    showChattings(id);
  } else {
    // 처음 눌리는 채팅창의 경우 로그가 없을 수 밖에 없기 때문에 로그가 비어있으면 새로 채팅내용 불러와함
    if (Common.isEmpty(Common.getSessionStorage("chatLog-" + id))) {
      // 로그가 비어있다면
      ChatData.getChattings(id, "bottom");
    } else {
      showChattings("chatLog-" + id);
    }
  }
};

//------------------  채팅내부 클릭, 외부클릭시 색 변경용 함수 -----------

//todo!! 나중에 좀 더 다듬어야 함
// 색변경 함수 따로 빼면 좋을 것 같고 중간에 사이즈 변경용 div 클릭때도 색 진하게 되도록추가해야함
let changeChatColor = function () {
  $("html").click(function (e) {
    if (
      $(e.target).parents(".right").length < 1 &&
      $(e.target).parents(".div-send").length < 1 &&
      $(e.target).attr("class") != $(".div-send").attr("class")
    ) {
      console.log("팝업 외 부분");
      //실행 이벤트 부분
      document.documentElement.style.setProperty(
        "--chat-background",
        "rgba(255, 255, 255, 0.288)"
      );
      document.documentElement.style.setProperty(
        "--chat-btn-background",
        " rgb(19, 140, 215, 0.4)"
      );
      document.documentElement.style.setProperty(
        "--chat-btn-border",
        " rgba(0, 0, 0, 0.35)"
      );
      document.documentElement.style.setProperty(
        "--chat-text-color",
        " rgba(0, 0, 0, 0.8)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--chat-background",
        "#fffffff2"
      );
      document.documentElement.style.setProperty(
        "--chat-btn-background",
        " rgb(19, 140, 215, 0.75)"
      );
      document.documentElement.style.setProperty(
        "--chat-btn-border",
        "#00000087"
      );
      document.documentElement.style.setProperty("--chat-text-color", " black");
    }
  });
};

//--------------- enter 입력 관련 처리 ---------------

// 채팅창 내부 textarea 안에서 엔터가 눌렸을 경우 처리
let textareaEnterKey = function () {
  document
    .getElementById("text-send")
    .addEventListener("keydown", function (e) {
      // 엔터키면 보내기 후 내용 없애기, shift+enter 면 줄바꿈 처리

      if (e.key == "Enter") {
        console.log(
          "현재 입력창 글자수 : ",
          document.querySelector("#text-send").value,
          document.querySelector("#text-send").value.length
        );
        if (!e.shiftKey) {
          //todo 중복 엔터 막기
          e.preventDefault(); // 기본 새로고침 동작 막기
          sendChat();
          handleResizeHeight();
        }
      }
    });
};

// todo!!! 이후 방명록 작성화면에서 충돌이 날 수 있으니 합칠때 다시 로직 변경해야함!!!
// 윈도우 화면에서 엔터가 눌렸을 경우 처리
let eventEnterKey = function () {
  window.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      if (document.getElementById("text-send") != document.activeElement) {
        //todo 색변경 하려고 클릭 보냈는데 나중에 그냥 색변경용 함수 써버리자
        document.querySelector(".div-send").click();
        document.getElementById("text-send").focus();
      }
    }
  });
};

//------------------ 채팅방 리스트, 내용 불러오기 구역 ------------------

// 채팅룸 개수에 따라 좌우 화살표 있게할지 말지 결정
let hideArrow = function (is) {
  if (is) {
    // true값이 들어오면 화살표 숨기기
    $(".chat-room-container").css("grid-template-columns", "60px 1fr");
    $(".chat-arrow").css("display", "none");
  } else {
    // false값이 들어오면 화살표 표시하기
    $(".chat-room-container").css("grid-template-columns", "60px 1fr 60px");
    $(".chat-arrow").css("display", "flex");
  }
};

// 저장소에서 룸 리스트 불러와서 화면상 표시해주는 함수
// id 값을 넣어주면 해당 id 값을 가진 탭 자동 선택
export let setChattingRooms = function (id) {
  let rooms = Common.getSessionStorage("allChatRooms").split(",");
  console.log("rooms : ", rooms);
  let page = Common.getSessionStorage("roomPage");

  //만약 첫번째 룸이 "" 등으로 가진 값이 없을 때 == 룸이 없을때
  // 모든 탭, 화살표 없애고 전체채팅 표시하고 함수 종료
  if (Common.isEmpty(rooms[0])) {
    hideArrow(true);
    $(".chat-room-item").css("display", "none");
    showChattings("chatLogAll");
    return;
  }

  //page 값 설정용 로직
  if (!Common.isEmpty(id)) {
    // 만약 아이디 값이 있으면 현재 들어온 id값인 방으로 자동 선택
    let num = rooms.indexOf(id);
    page = Math.trunc(num / 5);
  } else if (Common.isEmpty(page) || Number(page) < 0) {
    // 만약 페이지 값이 없거나, 0보다 작을경우 기본값 0
    page = 0;
  } else if (Number(page) > Math.trunc(rooms.length / 5)) {
    //page가 rooms의 총길이보다 커버릴 경우 최고 page값으로 변경
    page = Math.trunc(rooms.length / 5);
  }

  // 페이지 값 세션스토리지에 저장
  Common.setSessionStorage("roomPage", page);

  // 해당 페이지에 표시해야하는 룸 개수가 실제 총 룸 길이보다 크면 화살표 숨기기
  hideArrow(page * 5 + 5 >= rooms.length);

  // 현재 페이지에 해당하는 룸 이름 부여
  for (let i = Number(page); i < Number(page) + 5; i++) {
    let num = i % 5;
    if (i < rooms.length) {
      $(".chat-room-item").eq(num).css({
        display: "grid",
      });

      $(".room-name").eq(num).text(rooms[i]);
    } else {
      $(".chat-room-item").eq(num).css("display", "none");
    }
  }

  if (!Common.isEmpty(id)) {
    // 아이디 값이 들어왔을 경우엔 해당 아이디를 가진 탭을 자동 선택
    let num = rooms.indexOf(id) % 5;
    $(".chat-room-item").eq(num).click();
  } else if (document.querySelector(".selected-chat").id == "chat-all-user") {
    // 기존에 선택되어있던 것이 전체 채팅일 때
    $(".loadingAni").fadeOut();
  } else {
    // 기존에 선택되어있는 것이 전체채팅이 아닐때 현재 페이지 내용이 바뀌면서
    // 자동으로 선택되어있게 된 탭의 채팅내용으로 다시 표시
    showChattings(
      document.querySelector(".selected-chat > .room-name").innerText
    );
  }
};

// 저장소에서 채팅 내용 가져와 보여주기용 함수
// keyName = 저장소 키값
export let showChattings = function (keyName) {
  console.log("채팅 보여주기 불림 : ", keyName);
  let chatLog = Common.getSessionStorage(keyName);

  //만약 저장된 채팅로그가 없다면 빈 문자열 처리
  chatLog = Common.isEmpty(chatLog) ? "" : chatLog;

  document.querySelector(".chat-item-area").innerHTML = chatLog;

  document.querySelector(".chat-item-area").scrollTop =
    document.querySelector(".chat-item-area").scrollHeight;
  $(".loadingAni").fadeOut();
};

// 저장소에 뭐가 없어서 빈 채팅 눌리면 어케되더라???

// 다음 페이지 룸들 표시
let showNextRooms = function (arrow) {
  let page = Common.getSessionStorage("roomPage");
  if (arrow == ">") {
    Common.setSessionStorage("roomPage", page + 1);
  } else if (arrow == "<") {
    Common.setSessionStorage("roomPage", page - 1);
  }

  setChattingRooms();
};

// 채팅보내기용 함수
let sendChat = function () {
  let selected = document.querySelector(".selected-chat");
  let id = "";
  if (selected.id == "chat-all-user") {
    id = "chatLogAll";
  } else {
    id = selected.querySelector(".room-name").innerText;
  }
  ChatData.sendChat(id);
};

//----------------------- 외부에서 가져다 써야할 함수 --------------------------

// 룸 추가용 함수
let openChatRoom = function (id) {
  let rooms = Common.getSessionStorage("allChatRooms").split(",");

  // 만약 현재 가지고 있는 룸에 상대 아이디가 없으면
  if (rooms.indexOf(id) < 0) {
    // 상대 아이디와의 채팅룸 DB에도 추가후 해당 룸으로 탭이동
    ChatData.insertChatRoom(id);
  } else {
    //  상대 아이디가 있으면 해당 룸으로 탭 이동
    setChattingRooms(id);
  }
};

//------------ 요소 이벤트들 부여 구역 --------------

let setDefaultEvents = function () {
  document.querySelector("#btn-send").addEventListener("click", sendChat);

  document.querySelector("#chat-prev").addEventListener("click", function () {
    showNextRooms("<");
  });
  document.querySelector("#chat-next").addEventListener("click", function () {
    showNextRooms(">");
  });

  document.querySelectorAll(".delete-room").forEach(function (el) {
    el.addEventListener("click", function (e) {
      // 부모요소로 클릭이 전파되지 않도록 막기
      e.stopPropagation();
      console.log("X버튼 눌림  : ", e.target);
      ChatData.deleteChatroom(e.target);
    });
  });

  // 스크롤이 채팅내용 구역 상단에 닿을때마다 채팅 더 불러오기
  $(".chat-item-area").scroll(function () {
    if ($(".seleted-chat").attr("id") != "chat-all-user") {
      //현재 로딩 애니메이션이 없고(= 있으면 이미 불러오고 있는중임), 스크롤이 맨 위일때 동작
      if (
        $(".loadingAni").css("display") == "none" &&
        $(".chat-item-area").scrollTop() == 0
      ) {
        ChatData.getChattings($(".seleted-chat > .room-name").text(), "top");
        console.log(
          "스크롤에서 불림 : ",
          $(".seleted-chat > .room-name").text()
        );
      }
    }
  });

  $(document).on("click", ".chat-room-item, .chat-all-user", function (e) {
    console.log(this);
    console.log(e.target);
    clickChatRoom(this);
  });

  document.querySelector("#insert-room").addEventListener("click", function () {
    openChatRoom("friend");
  });
};

// ----------------- init 구역 ---------------------

window.onload = function () {
  resizeChatarea();
  resizeSendarea();
  //start();
  changeChatColor();
  eventEnterKey();
  textareaEnterKey();
  ChatData.getChatRoomList();
  setDefaultEvents();
};
