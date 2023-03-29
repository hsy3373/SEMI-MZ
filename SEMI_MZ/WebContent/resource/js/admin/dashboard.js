// [han]

import * as Common from '../common.js';

// todo! 서블릿에서 아래놈들 불러오는 로직 필요
let getUserCount = function () {
  let path = Common.getContextPath();
  $.ajax({
    type: 'get',
    url: path + '/select.mem',
    data: {},
    success: (result) => {
      document.querySelector('.card1 > .card-right').innerHTML = result;
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

let getNoticeCount = function () {
  let path = Common.getContextPath();
  $.ajax({
    type: 'get',
    url: path + '/select.notice',
    data: {},
    success: (result) => {
      document.querySelector('.card2 > .card-right').innerHTML = result;
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

let getChracterCount = function () {
  let path = Common.getContextPath();
  $.ajax({
    type: 'get',
    url: path + '/select.char',
    data: {},
    success: (result) => {
      document.querySelector('.card3 > .card-right').innerHTML = result;
    },
    error: function (req, status, error) {
      console.log(req, status, error);
    },
  });
};

let setDefaultEvent = function () {
  document.querySelector('.card1').addEventListener('click', function () {
    location.href = '';
  });

  document.querySelector('.card2').addEventListener('click', function () {
    location.href = '';
  });

  document.querySelector('.card3').addEventListener('click', function () {
    console.log('눌림');
    location.href = './character.jsp';
  });
};

//----------------------------------------------------------------------------------

let init = function () {
  setDefaultEvent();
  // getUserCount();
  // getNoticeCount();
  // getChracterCount();
};

window.onload = function () {
  init();
};
