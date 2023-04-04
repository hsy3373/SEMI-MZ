import * as Skin from "./skinCommon.js";
import { getContextPath, getSessionStorage } from "../adminCommon.js";

let init = function () {
  if (document.getElementById("delete-btn") != null) {
    document.getElementById("delete-btn").onclick = function () {
      // alert 창을 띄우고, 확인 버튼이 눌렸을 때 onDeleteConfirmed 함수를 실행합니다.
      if (confirm("정말 삭제하시겠습니까?")) {
        let id = document.getElementById("skinId").value;
        location.href = getContextPath() + "/delete.skin?skinId=" + id;
      }
    };
  }

  document.querySelector(".back").addEventListener("click", function () {
    // back 버튼 눌리면  뒤로가기 시킴
    location.href =
      getContextPath() + "/list.skin?page=" + getSessionStorage("cPage");

    console.log("백버튼 눌림");
  });
};

//------------------------init 구역-------------------
window.onload = function () {
  Skin.setDefaultEvent();
  init();
};
