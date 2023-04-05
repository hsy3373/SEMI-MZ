import {
  getSessionStorage,
  getContextPath,
  setSessionStorage,
} from "../adminCommon.js";

//페이지별 리스트 가져오는 함수
let getNotice = function (num) {
  let path = getContextPath();
  $.ajax({
    url: path + "/list.notice",
    method: "post",
    data: {
      page: num,
    },
    success: function (data) {
      let noticeCount = getSessionStorage("noticeCount");
      let str = `<tr>
                    <th >#</th>
                    <th >제목</th>
                    <th >작성일</th>
                  </tr>`;
      for (let i in data) {
        str += `<tr class="notice-item">
                  <td id="${data[i].noticeNo}">${
          noticeCount - i - (num - 1) * 20
        }</td>
                  <td>${data[i].title}</td>
                  <td>${data[i].date.split(" ")[0]}</td>
                </tr>`;
      }

      document.querySelector(".list-area").innerHTML = str;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
    },
  });
};

let init = function () {
  $(document.querySelector(".list-area")).on("click", "tr", function () {
    //만약 제목용 tr태그면 이벤트 종료
    if (this.querySelector("th") != null) {
      console.log("제목용 태그임");
      return;
    }
    let str = this.querySelector("td:nth-child(1)").id;
    console.log(str);
    location.href = getContextPath() + "/update.notice?noticeNo=" + str;
  });

  document.querySelectorAll(".page-btn").forEach(function (el) {
    el.addEventListener("click", function () {
      // 기존에 선택되어있던 버튼이 있었다면 선택 해제
      if (document.querySelector(".selected-btn") != null) {
        document.querySelector(".selected-btn").className = "page-btn";
      }

      setSessionStorage("cPage", this.innerText);
      getNotice(this.innerText);

      this.className = "selected-btn page-btn";
    });
  });

  // 페이징바의 앞페이지 버튼 클릭시 동작
  document.getElementById("prev-btn").addEventListener("click", function () {
    let btns = document.querySelectorAll(".page-btn");
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) - 10;
      el.className = "page-btn";
    });

    //만약 가장 처음 버튼이 1번일 경우 앞페이지 버튼 비활성화
    if (btns[0].innerText == 1) {
      document.getElementById("prev-btn").className = "disable-btn";
    }

    // 앞페이지가 눌렸다는 것은 뒷페이지가 있다는 것이므로 뒷페이지 가기 버튼 활성화
    document.getElementById("next-btn").className = "able-btn";

    // 가장 마지막 버튼이 눌린 것으로 처리
    btns[btns.length - 1].click();
  });

  // 페이징바의 뒷페이지 버튼 클릭 시 동작
  document.getElementById("next-btn").addEventListener("click", function () {
    let count = Number(getSessionStorage("noticeCount"));
    //최대 페이지 수
    count = Math.ceil(count / 20);
    let btns = document.querySelectorAll(".page-btn");
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) + 10;

      if (Number(el.innerText) > count) {
        //만약 버튼의 숫자가 최대 페이지 수보다 크다면
        el.className = "disable-btn page-btn";
      } else {
        el.className = "page-btn";
      }
    });

    // 앞으로 가기 버튼 활성화
    document.getElementById("prev-btn").className = "able-btn";

    //만약 가장 마지막 버튼이 최대 페이지 수보다 크거나 같은 경우 뒷페이지 버튼 비활성화
    if (Number(btns[btns.length - 1].innerText) >= count) {
      document.getElementById("next-btn").className = "disable-btn";
    }

    //가장 첫 버튼 클릭
    btns[0].click();
  });
};

window.onload = function () {
  init();
};
