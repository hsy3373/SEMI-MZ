import {
  getSessionStorage,
  getContextPath,
  setSessionStorage,
} from './adminCommon.js';

// toast 메세지 띄우는 메서드
let toast = function (text) {
  $('#toast').text(text);
  if ($('.toastShow').length > 0) return; // 토스트 메세지 show 중이면 다시 뜨지 않도록 처리
  $('#toast').addClass('toastShow'); // show라는 클래스를 추가해서 토스트 메시지를 띄우는 애니메이션을 발동시킴
  setTimeout(function () {
    // 2700ms 후에 show 클래스를 제거함
    $('#toast').removeClass('toastShow');
  }, 2700);
};

let deleteCancelMem = function () {
  let path = getContextPath();
  $.ajax({
    url: path + '/delete.member',
    method: 'post',
    success: function (data) {
      location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

let updatePwd = function (originPwd, newPwd) {
  let path = getContextPath();
  $.ajax({
    url: path + '/admin.admin',
    method: 'post',
    data: {
      originPwd: originPwd,
      newPwd: newPwd,
    },
    success: function (data) {
      if (Number(data) > 0) {
        toast('비밀번호가 변경되었습니다');
        document.querySelectorAll('input').forEach((el) => {
          el.value = '';
        });
      } else {
        toast('기존 비밀번호가 맞지 않거나 변경에 실패했습니다.');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

let deleteChatLog = function () {
  let path = getContextPath();
  $.ajax({
    url: path + '/delete.chat',
    method: 'post',
    success: function (data) {
      location.reload();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

let init = function () {
  document
    .getElementById('update-pwd-btn')
    .addEventListener('click', function () {
      let originPwd = document.getElementById('origin-pwd').value;
      let pwd1 = document.querySelectorAll('.new-pwd')[0].value;
      let pwd2 = document.querySelectorAll('.new-pwd')[1].value;
      if (originPwd.length <= 0 || pwd1.length <= 0 || pwd2.length <= 0) {
        toast('입력되지 않은 내용이 있습니다');
        return;
      }

      if (pwd1 === pwd2) {
        updatePwd(originPwd, pwd1);
      } else {
        toast('입력하신 신규 비밀번호가 서로 다릅니다');
        document.querySelectorAll('.new-pwd')[0].focus();
      }
    });

  document
    .querySelector('.delete-cancel-btn button')
    .addEventListener('click', function () {
      if (confirm('정말 삭제하시겠습니까?')) {
        deleteCancelMem();
      }
    });

  $(document.querySelector('.cancel-table')).on('click', 'tr', function () {
    //만약 제목용 tr태그면 이벤트 종료
    if (this.querySelector('th') != null) {
      return;
    }
    let id = this.querySelector('td:nth-child(2)').innerText;
    location.href = getContextPath() + '/update.member?userId=' + id;
  });

  document
    .querySelector('.delete-chat-btn button')
    .addEventListener('click', function () {
      if (confirm('정말 삭제하시겠습니까?')) {
        deleteChatLog();
      }
    });
};

window.onload = function () {
  console.log('init');
  init();
};
