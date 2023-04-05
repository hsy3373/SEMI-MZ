// toast 메세지 띄우는 메서드
export let toast = function (text) {
  $("#toast").text(text);
  if ($(".toastShow").length > 0) return; // 토스트 메세지 show 중이면 다시 뜨지 않도록 처리
  $("#toast").addClass("toastShow"); // show라는 클래스를 추가해서 토스트 메시지를 띄우는 애니메이션을 발동시킴
  setTimeout(function () {
    // 2700ms 후에 show 클래스를 제거함
    $("#toast").removeClass("toastShow");
  }, 2700);
};

let init = function () {
  document
    .querySelector("#enroll-notice")
    .addEventListener("submit", function (e) {
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;

      if (title.length <= 0 || content.length <= 0) {
        e.preventDefault(); // 폼 전송을 막음
        toast("입력되지 않은 내용이 있습니다");
      }
    });

  document.querySelector(".back").addEventListener("click", function () {
    // back 버튼 눌리면  뒤로가기 시킴
    window.history.back();
  });
};

window.onload = function () {
  init();
};
