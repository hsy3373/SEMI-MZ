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

//친구목록 : 놀러가기 이벤트 
const fnClick = (fn) => {
    console.log(fn)
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
            let result = ``;

            result = list.map((fn)=> {

                // let tr = document.createElement("tr");
                // let tdNicName = document.createElement("td")
                // tdNicName.textContent = fn.nicName;
                // tr.appendChild(tdNicName);

                // let td2 = document.createElement("td")
                // td2.textContent = "접속중"
                // tr.appendChild(td2);

                // let gofriend = document.createElement("td");
                // gofriend.addEventListener("click", function(){
                //     fnClick(fn.userId);
                // })
                // tr.appendChild(gofriend);
               

                // return tr.outerHTML;

                // let td = document.createElement("td");
                // td.addEventListener("click", fnClick(`${fn.userId}`));
                //'' innerHtml 으로 함수 부를 수 없음. why? 이미 td태그가 아무것도 없기떄문에 이벤트 부여도 불가능 
                //먼저 td태그 생성하고 그후 이벤트 부여해야함
                // return `<tr>
                //     <td>${fn.nicName}</td> 
                //     <td>접속중</td>
                //     <td onclick='fnClick(${fn.userId})'>놀러가기</td>
                //     </tr>`

                //onclick="fnClick(${fn.userId})""      
            });

           


            console.log(result)

            //'innerHTML' 사용했었음... 
           document.getElementById("friendList").innerHTML = result;
           //.insertAdjacentHTML('afterend', result);
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
const logoutButton = document.querySelector('.modal-button2'); //로그아웃버튼
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
    console.log("로그아웃 이벤트 부여")
});

//내정보 변경 연결
mydateButton.addEventListener('click', () => {
    console.log("내정보변경  이벤트 부여")
});