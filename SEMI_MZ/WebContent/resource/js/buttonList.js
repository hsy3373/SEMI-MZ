/**
 * 작성자 : 윤지영
 * 광장 및 마이홈에 들어갈 버튼 모달 리스트 js
 */
import {modalstopfn} from './squareCanvas.js';
import { getContextPath } from './common.js';
import{FilterUsers} from './squareCanvas.js';
 
//버튼이벤트
//버튼세팅 
const friendList = document.querySelector('.friendList'); //친구목록버튼
const Listbutton = document.querySelector('.Listbutton'); //환경설정버튼
const friendtable = document.getElementById("friendList"); //친구목록 table

//친구목록 : 놀러가기 이벤트 
const fnClick = (fn) => {
    console.log("닉네임" +fn)
    console.log("클릭함")
}

//버튼 클릭 : 친구목록
friendList.addEventListener('click', () => {
    modal1.style.display = 'block';
    let path = getContextPath();

    let listuserId = userId;

    //친구목록 상세조회 
    $.ajax({
        url: path+"/selectFriend",
        data : {userId : listuserId},
        success : function(list){
            //현재접속중인 유저 id
            let filterid = [] 

            //이전에 생성된 td태그들 삭제
            friendtable.replaceChildren();
            
            //접속중인 userId 배열에 넣어주기
            for(let i of FilterUsers){
                filterid.push(i.userId);
            }

            //받아온 친구 list 동적으로 생성 : 이벤트 부여해주려니 create 해줘야함 
            for(let fn of list){
                let tr = document.createElement("tr");
                let tdNicName = document.createElement("td")
                tdNicName.textContent = fn.nicName;
                tr.appendChild(tdNicName);

                let td2 = document.createElement("td")
                
                tr.appendChild(td2);

                let gofriend = document.createElement("td");
                gofriend.textContent = "놀러가기"
                gofriend.classList.add('go-to-fn')
                tr.appendChild(gofriend);
  
                //생성된 tr에 친구 팝업 이벤트 생성 
                gofriend.addEventListener("click", function(){
                    fnClick(fn.userId);
                    console.log("이벤트 발생")
                })

                //접속 비접속 체크
                if(filterid.includes(fn.userId)){
                    td2.textContent = "접속중"
                    friendtable.prepend(tr);
                }else{
                    td2.textContent = "비접속"
                    friendtable.append(tr);
                };
            }
        },
        error : function(){
            console.error();
        }
    })

    //modal창 뜨는동안 타 이벤트 정지처리
    modalstopfn();
});



//버튼 클릭 : 환경설정
Listbutton.addEventListener('click', () => {
    modal2.style.display = 'block';
    //모달종료로 이벤트 재실행
    modalstopfn();
});

//모달 이벤트

//모달 세팅
const modal1 = document.querySelector('.modal1'); //친구목록
const modal2 = document.querySelector('.modal2'); //환경설정
const logoutButton = document.querySelector('.logout-button'); //로그아웃버튼
const mydateButton = document.querySelector('.modal-button1'); //내정보 변경
const Preferences = document.getElementById("Preferences");

//X버튼 종료이벤트 : 친구목록 
document.querySelector('.x-btn1').addEventListener('click', () => {
    modal1.style.display = 'none';
    //modal창 뜨는동안 타이벤트 정지처리
    modalstopfn();
});


//X버튼 종료이벤트 : 환경설정 
document.querySelector('.x-btn2').addEventListener('click', () => {
    modal2.style.display = 'none';
    modalstopfn();
});

//로그아웃창 연결
logoutButton.addEventListener('click', () => {
    console.log("로그아웃 이벤트 부여");
});

//내정보 변경 연결
mydateButton.addEventListener('click', () => {
    console.log("내정보변경  이벤트 부여")
});