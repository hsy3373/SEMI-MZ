// 파일이 선택되면 그에 맞는 칸에 이미지 미리보기 표시해주는 함수
// inputFile = 파일을 올린 input태그
let loadImg = function (inputFile) {
  let id = inputFile.id;
  let imgEl = document.querySelector('#char-img' + id.slice(-1));
  console.log(id, imgEl);

  // 선택된 파일이 존재 하는 경우
  if (inputFile.files.length != 0) {
    let reader = new FileReader();

    reader.readAsDataURL(inputFile.files[0]);

    reader.onload = function (e) {
      let url = e.target.result;
      imgEl.src = url;
    };
  } else {
    imgEl.src = '';
  }
};

//submit 할때 파일 뭐 안올린 것 있으면 안된다고 사용자에게 알림
let checkFiles = function () {
  document.querySelectorAll("input[type='file']").forEach((el) => {
    if (!el.value) {
      console.log('파일첨부 안된거 있음');
      //todo! 파일첨부 안된거 있다고 알림 띄우기
      return false;
    }
  });
};

//------------------------init 구역-------------------

let setDefaultEvent = function () {
  // 이미지 구역 클릭 시 파일 등록 창 띄우기
  document.querySelectorAll('[id^=char-img]').forEach((item, index) => {
    console.log(index, item);
    item.addEventListener('click', function () {
      document.querySelector('#file' + (index + 1)).click();
    });
  });

  // file등록되었을때 이미지 미리보기 등록 관련 이벤트
  document.querySelectorAll("input[type='file']").forEach((el) => {
    console.log('인풋 : ', el);
    el.addEventListener('change', function () {
      loadImg(el);
    });
  });

  document.querySelector('.back').addEventListener('click', function () {
    // back 버튼 눌리면  뒤로가기 시킴
    window.history.back();
  });

  document.querySelector('#insert-btn').addEventListener('click', checkFiles);
};

window.onload = function () {
  setDefaultEvent();
};
