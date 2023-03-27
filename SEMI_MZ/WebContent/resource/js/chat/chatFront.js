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
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    // 크기 조절 중 마우스 커서를 변경함
    // class="resizer"에 적용하면 위치가 변경되면서 커서가 해제되기 때문에 body에 적용
    document.body.style.cursor = "col-resize";

    // 이동 중 양쪽 영역(왼쪽, 오른쪽)에서 마우스 이벤트와 텍스트 선택을 방지하기 위해 추가
    leftSide.style.userSelect = "none";
    leftSide.style.pointerEvents = "none";

    rightSide.style.userSelect = "none";
    rightSide.style.pointerEvents = "none";

    // 초기 width 값과 마우스 드래그 거리를 더한 뒤 상위요소(container)의 너비를 이용해 퍼센티지를 구함
    // 계산된 퍼센티지는 새롭게 left의 width로 적용
    const newRightHeight =
      ((rightHeight + dy) * 100) /
      resizer.parentNode.getBoundingClientRect().height;
    rightSide.style.height = `${100 - newRightHeight}%`;
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

let checkChatScroll = function () {
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
let clickChatRoom = function () {
  $(document).on("click", ".chat-room-item, .chat-all-user", function () {
    //기존에 넣었던 width 값 리셋(전체채팅이 아닐경우에만) 및 클래스 삭제
    if ($(this).attr("id") != "chat-all-user") {
      //현재 전체채팅 외에 다른 룸이 눌렸을 경우
      //모든 채팅룸들 width 값 조정
      $(".chat-room-item").css({ width: "20%" });
      $(".room-name").css({ "padding-left": "4px" });

      // 현재 눌린 채팅룸 width 값 추가 조정
      $(this).css({
        width: $(this).children(".room-name").text().length * 15 + 50 + "px",
      });
      // 현재눌림 채팅룸 이름에 패딩 값 없애기
      $(this).children(".room-name").css({
        "padding-left": "0px",
      });
    } else {
      // 지금 눌린게 전체채팅인 경우
      //다른 채팅룸 리스트들 width값 설정, 하위 룸 네임 패딩값 설정
      $(".chat-room-item").css({ width: "20%" });
      $(".room-name").css({ "padding-left": "4px" });
    }

    $(".selected-chat").removeClass("selected-chat");

    //만약 클릭된 요소가 전체채팅이 아니라면 width값 더 여유있게변경

    // this의 현재 클래스들 모두 불러옴
    let currentClasses = $(this).prop("class");
    // selected-chat을 가장 상위로 적용받게 하기위에 앞에 넣고 클래스들 값 합쳐서 클래스추가
    $(this)
      .removeClass(currentClasses)
      .addClass("selected-chat" + " " + currentClasses);

    // 해당 채팅룸의 채팅 내용 불러오기 위한 로직
    let id = "";
    if ($(this).attr("id") != "chat-all-user") {
      id = "chatLog-" + $(this).children(".room-name").text();
    } else {
      id = "chatLogAll";
    }

    if (Common.getCookie(id)) {
      // 쿠키상 기존 채팅 로그가 있다면
      showChattings(id);
      let chatArea = document.querySelector(".chat-item-area");
      // 채팅 로그 불러오고 스크롤 최하단으로 변경
      chatArea.scrollTop = chatArea.scrollHeight;
    } else if(id != "chatLogAll") {
      // 쿠키상에 저장된 채팅 로그가 없고 전체채팅이 아니라면
      console.log("채팅내역 불러오는중 : " + id);
      ChatData.getChattings(id, "bottom");
    }
  });
};

//------------------  채팅내부 클릭, 외부클릭시 색 변경용 함수 -----------
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

// todo!!! 이후 방명록 작성화면에서 충돌이 날 수 있으니 합칠때 다시 로직 변경해야함!!!

// 채팅창 내부 textarea 안에서 엔터가 눌렸을 경우 처리
let textareaEnterKey = function () {
  document
    .getElementById("text-send")
    .addEventListener("keydown", function (e) {
      // 엔터키면 보내기 후 내용 없애기, shift+enter 면 줄바꿈 처리
      if (e.key == "Enter") {
        if (!e.shiftKey) {
          let receiveId = "";

          //전체채팅이 아닐경우 수신자 id 가져오기
          if ($(".selected-chat").attr("id") != "chat-all-user") {
            receiveId = "chatLogAll";
          } else {
            receiveId = $(".selected-chat").children(".room-name").text();
          }

          // db와 소켓에 채팅내용 전달하는 로직 구성해야 함
          e.preventDefault(); // 기본 동작 막기
          sendChat(receiveId);
          handleResizeHeight();
        }
      }
    });
};

// 윈도우 화면에서 엔터가 눌렸을 경우 처리
let eventEnterKey = function () {
  window.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      if (document.getElementById("text-send") != document.activeElement) {
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

// 쿠키에서 룸 리스트 불러와서 화면상 표시해주는 함수
let setChattingRooms = function () {
  let rooms = Common.getCookie("allRooms").split(",");
  console.log("rooms : ", rooms);

  let page = Common.getCookie("roomPage");

  // 만약 페이지 값이 없거나, 0보다 작거나, rooms의 총길이보다 커버릴 경우 대응
  if (!page || page < 0) {
    page = 0;
    Common.setCookie("roomPage", 0);
  } else if (page > Math.trunc((rooms.length - 1) / 5)) {
    page = Math.trunc((rooms.length - 1) / 5);
    Common.setCookie("roomPage", page);
  }

  for (let i = Number(page); i < Number(page) + 5; i++) {
    let num = i % 5;
    if (i < rooms.length - 1) {
      $(".chat-room-item").eq(num).css({
        display: "grid",
      });

      $(".room-name").eq(num).text(rooms[i]);
    } else {
      $(".chat-room-item").eq(num).css("display", "none");
    }
  }

  // 해당 페이지에 표시해야하는 룸 개수가 실제 총 룸 길이보다 크면 화살표 숨기기
  hideArrow(page + 5 >= rooms.length);
};

let showNextRooms = function (arrow) {
  let page = Common.getCookie("roomPage");
  if (arrow == ">") {
    Common.setCookie("roomPage", page + 1);
  } else if (arrow == "<") {
    Common.setCookie("roomPage", page - 1);
  }

  setChattingRooms();
};


//------------ 클릭 이벤트들 부여 구역 --------------

let setDefaultEvents = function () {
  document
    .querySelector("#btn-send")
    .addEventListener("click", setChattingRooms);

  //   $("#btn-send").click(function () {
  //   setChattingRooms();
  // });

  document.querySelector("#chat-prev").addEventListener("click", function () {
    showNextRooms("<");
  });
  document.querySelector("#chat-next").addEventListener("click", function () {
    showNextRooms(">");
  });

  document.querySelectorAll(".delete-room").forEach(function (el) {
    el.addEventListener("click", function (e) {
      console.log("X버튼 눌림  : ", e.target);
      deleteChatroom(e.target);

      // 부모요소로 클릭이 전파되지 않도록 막기
      e.stopPropagation();
    });
  });
  // $("#chat-prev").click(function () {
  //   showNextRooms("<");
  // });
  // $("#chat-next").click(function () {
  //   showNextRooms(">");
  // });
};

// ----------------- init 구역 ---------------------

window.onload = function () {
  resizeChatarea();
  resizeSendarea();
  //start();
  clickChatRoom();
  changeChatColor();
  eventEnterKey();
  textareaEnterKey();
  getChatRoomList();

  setDefaultEvents();
};
