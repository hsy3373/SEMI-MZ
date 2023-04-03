/**
 * 작성자 : 윤지영
 * 광장 및 마이홈에 들어갈 버튼 모달 리스트 js
 */
import {modalstopfn} from './squareCanvas.js';


//버튼이벤트
//버튼세팅 
const friendList = document.querySelector('.friendList'); //친구목록버튼
const Listbutton = document.querySelector('.Listbutton'); //환경설정버튼

//버튼 클릭 : 친구목록
friendList.addEventListener('click', () => {
    modal1.style.display = 'block';
    modalstopfn();
});

//버튼 클릭 : 환경설정
Listbutton.addEventListener('click', () => {
    modal2.style.display = 'block';
    modalstopfn();
});

//모달 이벤트

//모달 세팅
const modal1 = document.querySelector('.modal1'); //친구목록
const modal2 = document.querySelector('.modal2'); //환경설정
const logoutButton = document.querySelector('.modal-button2'); //로그아웃버튼
const mydateButton = document.querySelector('.modal-button1'); //내정보 변경
const Preferences = document.getElementById("Preferences");

//X버튼 종료이벤트 : 친구목록 
document.querySelector('.x-btn1').addEventListener('click', () => {
    modal1.style.display = 'none';
    modalstopfn();
});


//X버튼 종료이벤트 : 환경설정 
document.querySelector('.x-btn2').addEventListener('click', () => {
    modal2.style.display = 'none';
    modalstopfn();
});

//로그아웃창 연결
logoutButton.addEventListener('click', () => {
    console.log("로그아웃 이벤트 부여")
});

//내정보 변경 연결
mydateButton.addEventListener('click', () => {
    console.log("내정보변경  이벤트 부여")
});