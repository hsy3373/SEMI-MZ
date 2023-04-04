// 파일이 선택되면 그에 맞는 칸에 이미지 미리보기 표시해주는 함수
// inputFile = 파일을 올린 input태그
export let loadImg = function (inputFile) {
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
export let checkFiles = function () {
  let boolean = true;
  document.querySelectorAll("input[type='file']").forEach((el) => {
    if (!boolean) {
      return;
    }
    var allowedExtensions = /(\.png)$/i;
    var fileName = el.value;
    if (!el.value) {
      toast('파일을 전부 등록해주세요');
      boolean = false;
      return;
    } else if (!allowedExtensions.exec(fileName)) {
      toast("확장자가 'png'인 파일만 등록 가능합니다");
      boolean = false;
      return;
    }
  });

  return boolean;
};

// toast 메세지 띄우는 메서드
export let toast = function (text) {
  $('#toast').text(text);
  if ($('.toastShow').length > 0) return; // 토스트 메세지 show 중이면 다시 뜨지 않도록 처리
  $('#toast').addClass('toastShow'); // show라는 클래스를 추가해서 토스트 메시지를 띄우는 애니메이션을 발동시킴
  setTimeout(function () {
    // 2700ms 후에 show 클래스를 제거함
    $('#toast').removeClass('toastShow');
  }, 2700);
};

export let setDefaultEvent = function () {
  // 이미지 구역 클릭 시 파일 등록 창 띄우기
  document.querySelectorAll('[id^=char-img]').forEach((item, index) => {
    item.addEventListener('click', function () {
      document.querySelector('#file' + (index + 1)).click();
    });
  });

  // file등록되었을때 이미지 미리보기 등록 관련 이벤트
  document.querySelectorAll("input[type='file']").forEach((el) => {
    el.addEventListener('change', function () {
      loadImg(el);
    });
  });
};
