import {
  getSessionStorage,
  getContextPath,
  setSessionStorage,
} from '../adminCommon.js';

let cencelMember = function (order, id) {
  let path = getContextPath();
  $.ajax({
    url: path + '/update.member',
    method: 'post',
    data: {
      order: order,
      userId: id,
    },
    success: function (data) {
      console.log(typeof data);

      if (data == 'success') {
        if (order == 'delete') {
          location.href = path + '/activelist.member';
        } else {
          location.reload();
        }
      } else {
        toast(data);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    },
  });
};

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

let init = function () {
  document.getElementById('delete-btn').addEventListener('click', function () {
    let id = document.getElementById('userId').innerText;
    cencelMember('delete', id);
  });

  document
    .getElementById('blocking-btn')
    .addEventListener('click', function () {
      let id = document.getElementById('userId').innerText;
      cencelMember('blocking', id);
    });

  document.querySelector('.back').addEventListener('click', function () {
    let path = getContextPath();
    location.href = path + '/activelist.member';
  });
};

window.onload = function () {
  init();
};
