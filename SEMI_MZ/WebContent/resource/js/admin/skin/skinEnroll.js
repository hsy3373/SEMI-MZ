import * as Skin from './skinCommon.js';

let init = function () {
  document
    .querySelector('#enroll-form')
    .addEventListener('submit', function (e) {
      console.log('서브밋 눌림');
      let check = Skin.checkFiles();
      console.log('체크 파일즈 : ', check);
      if (!check) {
        console.log('폼전송 막으러 들어옴');
        e.preventDefault(); // 폼 전송을 막음
      }
    });

  document.querySelector('.back').addEventListener('click', function () {
    // back 버튼 눌리면  뒤로가기 시킴
    window.history.back();
  });
};

//------------------------init 구역-------------------
window.onload = function () {
  Skin.setDefaultEvent();
  init();
};
