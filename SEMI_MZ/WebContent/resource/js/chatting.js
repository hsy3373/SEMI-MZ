/**[han]
 * 채팅관련 영역
 */

let ip = ["192.168.30.180"];

const socket = new WebSocket(`ws://${ip[0]}/mzone/chatting.do`);
socket.onopen = function (e) {
  console.log("접속성공");
  console.log(e);
};

// 2. 웹 소켓 서버에서 sendText, sendObject메소드를 실행하면 실행되는 함수
socket.onmessage = function (e) {
  console.log("메세지 수신");
  // 수신된 데이터를 받으려면 이벤트 객체(e)의 data속성을 이용
  console.log(e);
  console.log(e.data);

  //Object형태의 String데이터를 객체로 변환해주기 (JSONObject)
  console.log(JSON.parse(e.data));

  let msg = JSON.parse(e.data);
  if (msg["sender"] == $("#sender").val()) {
    $("#msgContainer").append(
      $("<p>")
        .text("<" + msg["sender"] + ">" + msg["msg"])
        .css("text-align", "right")
    );
  } else {
    $("#msgContainer").append(
      $("<p>")
        .text("<" + msg["sender"] + ">" + msg["msg"])
        .css("text-align", "left")
    );
  }

  // 			let msg = e.data.split(",");
  // 				console.log(msg);
  // 			if(msg[0] == $("#sender").val()){
  // 				$("#msgContainer").append($("<p>").text("<"+msg[0]+">"+msg[2]).css("text-align","right"));
  // 			}else{
  // 				$("#msgContainer").append($("<p>").text("<"+msg[0]+">"+msg[2]).css("text-align","left"));
  // 			}
};

// 3. 웹 소켓 서버에서 메세지를 전송하는 함수
const sendMsg = () => {
  // 전송할 메세지 전처리
  // 전처리한 메세지를 전송하는 방법 : socket.send(데이터); -> 데이터가 서버로 전송됨
  // 발송자, 수신자, 메세지 내용
  // socket.send($("#sender").val()+","+$("#receiver").val()+","+$("#msg").val());
  //  			let msg = {
  // 					sender : $("#sender").val(),
  // 					receiver : $("#receiver").val(),
  // 					msg : $("#msg").val(),
  // 					};

  let msg = new Message(
    $("#sender").val(),
    $("#receiver").val(),
    $("#msg").val()
  );

  socket.send(JSON.stringify(msg));
};

function Message(sender, receiver, msg) {
  // this = {}  <- 눈에 보이진 않지만 묵시적으로 추가되어있음
  this.sender = sender;
  this.receiver = receiver;
  this.msg = msg;
  // return this; <- 눈에 보이진 않지만 묵시적으로 추가되어있음
}

//------------------ 채팅방 리스트, 내용 불러오기 ------------------

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

//-------------------- 채팅 리스트 아이템들 클릭 이벤트 ---------------

let clickChatRoom = function () {
  $(document).on("click", ".chat-room-item, .chat-all-user", function () {
    //기존에 넣었던 width 값 리셋 및 클래스 삭제
    if ($(".selected-chat").attr("id") != "chat-all-user") {
      $(".selected-chat").css({ width: "20%" });
    }
    $(".selected-chat").removeClass("selected-chat");

    // this의 현재 클래스들 모두 불러옴
    let currentClasses = $(this).prop("class");
    // selected-chat을 가장 상위로 적용받게 하기위에 앞에 넣고 클래스들 값 합쳐서 클래스추가
    $(this)
      .removeClass(currentClasses)
      .addClass("selected-chat" + " " + currentClasses);

    //만약 클릭된 요소가 전체채팅이라면 width값 변경X
    if ($(this).attr("id") != "chat-all-user") {
      $(this).css({ width: $(this).width() + 50 + "px", flex: "" });
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

let textareaEnterKey = function () {
  document
    .getElementById("text-send")
    .addEventListener("keydown", function (e) {
      if (e.key == "Enter") {
        if (!e.shiftKey) {
          e.preventDefault(); // 기본 동작 막기
          document.getElementById("text-send").value = "";
          handleResizeHeight();
        }
      }
    });
};

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

// ----------------- init 구역 ---------------------

window.onload = function () {
  resizeChatarea();
  resizeSendarea();
  //start();
  clickChatRoom();
  changeChatColor();
  eventEnterKey();
  textareaEnterKey();
};
