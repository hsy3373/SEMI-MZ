/**
 * 작성자 : 윤지영
 * 광장 및 마이홈에 들어갈 버튼 모달 리스트 js
 */
console.log(";;;;");
import { getContextPath, getSessionStorage } from "./common.js";
import { modalstopfn } from "./squareCanvas.js";
import { FilterUsers } from "./squareCanvas.js";
import { getUserInfo } from "./userInfo.js";
let path = getContextPath();

$(".friendList").click(function () {
  console.log("실행되나???");
});

//버튼이벤트
//버튼세팅
// const init = function(){

const friendList = document.querySelector(".friendList"); //친구목록버튼
const Listbutton = document.querySelector(".Listbutton"); //환경설정버튼
const friendtable = document.getElementById("friendList"); //친구목록 table

//console.log(friendList, Listbutton, friendtable)

//친구목록 : 놀러가기 이벤트
const fnClick = (fn) => {
  console.log("클릭함");
  document.querySelector(".info-modal").classList.remove("hidden");
  window.sessionStorage.setItem("clickedUserId", fn);
  getUserInfo();
};

//버튼 클릭 : 친구목록
friendList.addEventListener("click", () => {
  fnmodal.style.display = "block";
  let listuserId = getSessionStorage("loginUser");
  console.log("여기옴");

  //친구목록 상세조회
  $.ajax({
    url: path + "/selectFriend",
    data: { userId: listuserId },
    success: function (list) {
      //현재접속중인 유저 id
      let filterid = [];

      //이전에 생성된 td태그들 삭제
      friendtable.replaceChildren();

      //접속중인 userId 배열에 넣어주기
      for (let i of FilterUsers) {
        filterid.push(i.userId);
      }

      //받아온 친구 list 동적으로 생성 : 이벤트 부여해주려니 create 해줘야함
      for (let fn of list) {
        let tr = document.createElement("tr");
        let tdNicName = document.createElement("td");
        tdNicName.textContent = fn.nicName;
        tr.appendChild(tdNicName);

        let td2 = document.createElement("td");

        tr.appendChild(td2);

        let gofriend = document.createElement("td");
        gofriend.textContent = "놀러가기";
        gofriend.classList.add("go-to-fn");
        tr.appendChild(gofriend);

        //생성된 tr에 친구 팝업 이벤트 생성
        gofriend.addEventListener("click", function () {
          fnClick(fn.userId);
          console.log("이벤트 발생");
        });

        //접속 비접속 체크
        if (filterid.includes(fn.userId)) {
          td2.textContent = "접속중";
          friendtable.prepend(tr);
        } else {
          td2.textContent = "비접속";
          friendtable.append(tr);
        }
      }
    },
    error: function () {
      console.error();
    },
  });

  //modal창 뜨는동안 타 이벤트 정지처리
  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});

//버튼 클릭 : 환경설정
Listbutton.addEventListener("click", () => {
  pfmodal.style.display = "block";
  //모달종료로 이벤트 재실행
  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});

//모달 이벤트

//모달 세팅
const fnmodal = document.querySelector(".fn-modal"); //친구목록
const pfmodal = document.querySelector(".pf-modal"); //환경설정
const logoutButton = document.querySelector(".logout-button"); //로그아웃버튼
const mydateButton = document.querySelector(".fn-button"); //내정보 변경
//const Preferences = document.getElementById("Preferences");

//X버튼 종료이벤트 : 친구목록
document.querySelector(".fn-btn").addEventListener("click", () => {
  fnmodal.style.display = "none";

  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});

//X버튼 종료이벤트 : 환경설정
document.querySelector(".Pf-btn").addEventListener("click", () => {
  pfmodal.style.display = "none";
  if (document.getElementById("main-square")) {
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
  }
});

//alert js에서 가져옴 : 주의 !! 충돌가능성 있음!!
let logoutalert = document.getElementById("logout-alert");

//로그아웃창 연결
logoutButton.addEventListener("click", () => {
  // 취소버튼 클릭시 alert 창 닫힘
  let cancelBtn = logoutalert.querySelector(".alert-cancel");
  cancelBtn.addEventListener("click", () => {
    logoutalert.style.display = "none";
  });

  let logoutok = document.getElementById("logout-ok");
  logoutok.addEventListener("click", () => {
    //console.log("로그아웃 처리")

    location.href = path + "/logout";
  });

  // 모달  표시
  logoutalert.style.display = "block";
});

//////////////////// [내정보변경 - 작성자 : 김혜린] /////////////////////////

//내정보 변경 연결
let smodalInfo = $(".smodalInfo"); // 내정보변경 전 비밀번호입력요구 모달창
let modalMyinfo = $(".modalMyinfo"); // 내정보변경 모달창

mydateButton.addEventListener("click", () => {
  console.log("내정보변경버튼 이벤트 부여 => pw입력요청모달");
  smodalInfo.css("display", "block");
  $("#rqpwd").val("");
});

/* 내정보변경 시 비밀번호 입력 요청 모달 닫기 */
document.querySelector(".sx-btn1").addEventListener("click", () => {
  smodalInfo.css("display", "none");
});

document.querySelector(".myinfo-xbtn").addEventListener("click", () => {
  modalMyinfo.css("display", "none");
  smodalInfo.css("display", "none");
});

/* 내정보 변경 pw입력요청 모달에서 pw 확인 버튼 클릭 시 */
$("#rq-btn").on("click", function () {
  let inputPwd = $("#rqpwd").val();

  $.ajax({
    type: "post",
    url: path + "/checkPwd.me",
    dataType: "text",
    data: { inputPwd: inputPwd },
    success: (result) => {
      if (result == "O") {
        //내정보변경 전 패스워드 체크일 때(패스워드 일치 시)
        // 내정보변경 모달 block 처리
        modalMyinfo.css("display", "block");
        //*정보변경 모달띄워질 때 들어갈 기능들*
        //모달 보여질 때 유저 정보변경된거 그대로 띄워지게 하는거!!
        // input 입력란 입력하다가 닫고 다시들어왔을 때 기본 정보만 유지
        //입력하다가 만 건 비워주기!(리셋)
      }
      if (result == "X") {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      }
    },
  });
});

/*  회원탈퇴 버튼 클릭 시 비밀번호 입력 요청 모달 열고 닫기 */
let smodalNmem = $(".smodalNmem");

$("#sec-btn").on("click", function () {
  smodalNmem.css("display", "block");
  $("#sec-pwdchk").val(""); //pw 입력란 리셋용
});

$(".sx-btn2").on("click", () => {
  smodalNmem.css("display", "none");
});

// 비밀번호 입력 후 확인버튼
$("#secsub-btn").on("click", function () {
  let inputPwd = $("#sec-pwdchk").val();

  $.ajax({
    type: "post",
    url: path + "/delete.me",
    dataType: "text",
    data: { inputPwd: inputPwd },
    success: (result) => {
      if (result == "1") {
        // 패스워드 일치 => 회원탈퇴 처리

        // 탈퇴되었다는 알림과 함께
        alert("회원탈퇴 되었습니다.");
        //로그인페이지로 이동(메인페이지)
        location.replace(path + "/views/main.jsp");
      } else {
        alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      }
    },
  });
});
// }
// export { init}
