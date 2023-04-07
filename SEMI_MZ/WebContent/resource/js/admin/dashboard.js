// [han]

import { getContextPath } from './adminCommon.js';

let setDefaultEvent = function () {
  document.querySelector('.card1').addEventListener('click', function () {
    location.href = getContextPath() + '/activelist.member';
  });

  document.querySelector('.card2').addEventListener('click', function () {
    location.href = getContextPath() + '/list.notice';
  });

  document.querySelector('.card3').addEventListener('click', function () {
    console.log('눌림');
    location.href = getContextPath() + '/list.skin';
  });
};

//----------------------------------------------------------------------------------

window.onload = function () {
  setDefaultEvent();
};
