/**
 * 작성자 : 윤지영
 * 광장에 들어가는 캔버스 관련 JS
 */

/* js 가져오기  */
import { getContextPath } from './common.js';
import { getUserInfo } from './userInfo.js';


//캔버스 세팅
let canvas
let ctx;


canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 1300;
canvas.height = 800;
document.getElementById("main-square").appendChild(canvas);

let noticeBoard, myhome, squarebackground, gamezone;

//모달 떠있는 동안 움직임 stop

let modalstop = false;
export let modalstopfn = function () {
    modalstop = !modalstop
    console.log(modalstop, "호출")
    main();
}

//배경 이미지 세팅
function loadImage() {
    squarebackground = new Image();
    squarebackground.src = "../resource/img/background/background_main.png"

    myhome = new Image();
    myhome.src = "../resource/img/icon/home.png"

    noticeBoard = new Image();
    noticeBoard.src = "../resource/img/icon/notice_icon.png"

    gamezone = new Image();
    gamezone.src = "../resource/img/icon/gamezone.png"

}


//유저 네임 세팅 
//console.log(userName) 
//console.log(userSkin)

//캐릭터 세팅 

let userbd = new Image();
userbd.src = "../resource/img/user/skin" + userSkin + "/bd.png"

let userbs = new Image();
userbs.src = "../resource/img/user/skin" + userSkin + "/bs.png"

let userfd = new Image();
userfd.src = "../resource/img/user/skin" + userSkin + "/fd.png"

let userfs = new Image();
userfs.src = "../resource/img/user/skin" + userSkin + "/fs.png"

let userld = new Image();
userld.src = "../resource/img/user/skin" + userSkin + "/ld.png"

let userls = new Image();
userls.src = "../resource/img/user/skin" + userSkin + "/ls.png"

let userrd = new Image();
userrd.src = "../resource/img/user/skin" + userSkin + "/rd.png"

let userrs = new Image();
userrs.src = "../resource/img/user/skin" + userSkin + "/rs.png"



//캐릭터 좌표(스타팅 x,y)
export let uesrX = canvas.width - 400
export let uesrY = canvas.height - 70;

//유저 이미지 지정
let user = userfs;

//이미지 랜더링
function render() {
    ctx.drawImage(squarebackground, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(myhome, 891, 6, 220, 220.5);
    ctx.drawImage(noticeBoard, 960, 350, 271, 140.5)
    ctx.drawImage(gamezone, 230, 200, 180, 146.4)
    ctx.drawImage(user, uesrX, uesrY, 50, 50);
    ctx.font = '12px Sans-Serif'
    ctx.fillText(userName, uesrX + 2, uesrY + 60);

}



//keys 다운에 부여하는 캐릭터 이동 이벤트
let keysDown = {};
function setupKeyboard() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true

        //이벤트 호출
        //console.log(event.key)
        //sendMsg(event.key); //이거 위치를 옮겨보기 => 체크 : 해결. but 호출속도가 빨라서, 문제생길시 다시 back;      
    });

    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode] // 키보드를 떼면 이벤트 삭제

    })


}


//클릭에 부여하는 이벤트
canvas.addEventListener("click", function (event) {

    //내가 클릭한 좌표 얻어오기
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    //img 안을 클릭할 경우 이벤트 : my home
    if (clickX >= 895 && clickX <= 1110 && clickY >= 10 && clickY <= 226) {
        console.log("home 이벤트 부여")
        gohome();

    }

    //img 안을 클릭할 경우 이벤트 : noticeBoard
    if (clickX >= 1030 && clickX <= 1140 && clickY >= 411 && clickY <= 442) {
        console.log("notice 이벤트 부여")
    }

    //img 안을 클릭할 경우 이벤트 :gamegone 
    if (clickX >= 240 && clickX <= 400 && clickY >= 200 && clickY <= 350) {
        console.log("gamegone 이벤트 부여")
    }


    console.log(clickX, clickY);

})


//마우스 호버 이벤트 : 미구현
canvas.addEventListener("mousemove", function (event) {

    //내가 클릭한 좌표 얻어오기
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    //img 안을 들어올 경우
    if (clickX >= 892 && clickX <= 1111 && clickY >= 10 && clickY <= 226) {
        //console.log("집안으로 들어옴")
    }
})


//좌표값 업데이트 
function update() {


    if (39 in keysDown) { //키를 아래로 누른경우 
        uesrX += 4; // 캐릭터 속도 4 // 오른쪽이동

        if (user === userrs) {
            user = userrd
        } else {
            user = userrs
        }

        sendMsg("ArrowRight"); //소켓에 캐릭터 이동 메세지 전송

    }

    if (37 in keysDown) {
        uesrX -= 4; // 왼쪽이동

        if (user === userls) {
            user = userld
        } else {
            user = userls
        }

        sendMsg("ArrowLeft"); //소켓에 캐릭터 이동 메세지 전송


    }

    if (38 in keysDown) { //위로이동
        uesrY -= 4;

        if (user === userbs) {
            user = userbd
        } else {
            user = userbs
        }

        sendMsg("ArrowUp"); //소켓에 캐릭터 이동 메세지 전송


    }

    if (40 in keysDown) { // 아래로이동 
        uesrY += 4;

        if (user === userfs) {
            user = userfd
        } else {
            user = userfs
        }

        sendMsg("ArrowDown"); //소켓에 캐릭터 이동 메세지 전송

    }

    //맵 블락 (상하좌우)
    if (uesrX >= canvas.width - 50) {
        uesrX = canvas.width - 50;
    }

    if (uesrX <= 0) {
        uesrX = 0;
    }

    if (uesrY >= canvas.height - 50) {
        uesrY = canvas.height - 50;
    }

    if (uesrY <= 0) {
        uesrY = 0;
    }

    //미묘하게 버벅거리는 부분 있음 

    //유저 맵 블락 : 중앙 계단 오른쪽 
    if (uesrX <= 1250 && uesrX >= 920) {

        if (uesrY >= 494 && uesrY <= 504) {
            uesrY = 490
        }

        if (uesrY >= 700 && uesrY <= 710) {
            uesrY = 715
        }

        if (uesrX <= 1000 && uesrY >= 494 && uesrY <= 710) {
            uesrX = 915;
        }

    }

    //맵 블락 : 중앙 계단 왼쪽 
    if (uesrX <= 862 && uesrX >= 490) {

        if (uesrY >= 494 && uesrY <= 504) {
            uesrY = 490
        }

        if (uesrY >= 700 && uesrY <= 710) {
            uesrY = 715
        }

        if (uesrX >= 850 && uesrX <= 862 && uesrY >= 494 && uesrY <= 710) {
            uesrX = 867;
        }

        if (uesrX <= 500 && uesrY >= 494 && uesrY <= 710) {
            uesrX = 484;
        }

    }

    //맵 블락 : 절벽 왼쪽 
    if (uesrX <= 432 && uesrX >= 0) {

        if (uesrY >= 510 && uesrY <= 526) {
            uesrY = 530
        }

        if (uesrY >= 366 && uesrY <= 400) {
            uesrY = 360
        }

        if (uesrX <= 432 && uesrX >= 420 && uesrY >= 366 && uesrY <= 526) {
            uesrX = 433;
        }
    }


    //맵 블락 : 절벽 오른쪽

    if (uesrX <= 571 && uesrX >= 475) {

        if (uesrY >= 500 && uesrY <= 535) {
            uesrY = 540
        }

        if (uesrY >= 424 && uesrY <= 434) {
            uesrY = 420
        }

        if (uesrX >= 565 && uesrX <= 571 && uesrY >= 424 && uesrY <= 535) {
            uesrX = 575;
        }

        if (uesrX >= 475 && uesrX <= 490 && uesrY >= 424 && uesrY <= 535) {
            uesrX = 469;
        }
    }

    //충돌이벤트 구현
    if (uesrX <= 1020 && uesrX >= 960 && uesrY <= 200 && uesrY >= 191) {
        console.log('home이벤트')
        gohome();

    }

    if (uesrX <= 1130 && uesrX >= 1000 && uesrY <= 463 && uesrY >= 426) {
        console.log('공지사항 이벤트')
        //캐릭터 좌표 어떻게 처리할지 정하기 : 게시판 보는동안 좌표값

        uesrY = 468
    }

    if (uesrX <= 345 && uesrX >= 298 && uesrY <= 330 && uesrY >= 300) {
        console.log('게임존 이벤트')

        uesrY = 335
    }

    //집 블락
    if (uesrX <= 1080 && uesrX >= 872) {

        //아래블락
        if (uesrY >= 174 && uesrY <= 184) {
            uesrY = 190
        }

        //오른쪽블락
        if (uesrX >= 1000 && uesrY <= 184) {
            uesrX = 1084;
        }

        //왼쪽블락
        if (uesrX <= 952 && uesrY <= 184) {
            uesrX = 868;
        }
    }


    //공지사항 블락
    if (uesrX <= 1132 && uesrX >= 996) {

        //위 블락
        if (uesrY >= 352 && uesrY <= 362) {
            uesrY = 348
        }

        //오른쪽블락
        if (uesrX - user.width <= 1144 && uesrX >= 1100 && uesrY <= 412 && uesrY >= 352) {
            uesrX = 1136;
        }

        //왼쪽블락
        if (uesrX <= 1006 && uesrX >= 996 && uesrY <= 412 && uesrY >= 352) {
            uesrX = 992
        }

    }

    //게임존 블락
    if (uesrX <= 380 && uesrX >= 216) {

        //위 블락
        if (uesrY >= 148 && uesrY <= 160) {
            uesrY = 144
        }

        //오른쪽블락
        if (uesrX <= 380 && uesrX >= 368 && uesrY <= 290 && uesrY >= 158) {
            uesrX = 384;
        }

        //왼쪽블락
        if (uesrX <= 224 && uesrX >= 216 && uesrY <= 290 && uesrY >= 158) {
            uesrX = 212
        }

        //아래블락
        if (uesrY >= 280 && uesrY <= 290) {
            uesrY = 294
        }

    }

}

//클릭이벤트로 해당 userid 넘겨주기
canvas.addEventListener('click', function (e) {


    let x = e.clientX; //클릭좌표값
    let y = e.clientY; //클릭좌표값

    console.log(x, y)


    for (let user of FilterUsers) { //랜더링된 filter user 정보 받아서 좌표값 체크
        let ux = parseInt(user.uesrX);
        let uy = parseInt(user.uesrY);
        let id = user.userId;

        if (x >= ux && x <= ux + 50 && y >= uy && y <= uy + 50) {
            window.sessionStorage.setItem('clickedUserId', id);
            break; //sesion에 clickUserId로 id 값 넘겨주기
        }
    }

    console.log(sessionStorage.clickedUserId)
})




//집으로 이동하는 함수
const gohome = () => {
    let path = getContextPath()
    console.log(path + "/gohome")
    location.href = path + "/gohome";

}

///////////////////////////////////////////////////////////////여기!!! ///////////////////////////////

let receivedUserId = "";
let UsersData = []; // 유저들 데이터 담아줄 배열
let FilterUsers = [];//필터링된 유저 1개 만큼 담아줄 배열
// 웹소켓으로 연결하기
// 웹소켓 서버 생성 : 학원 192.168.30.171
let path = getContextPath()
let socket = new WebSocket("ws://192.168.30.171:8083" + path + "/multiAccess");
///////////////////////////////////////////////////////////////자기 ws로 바꿔주기!!! ///////////////////////////////

let fnSocket = {
    onopen : function(e){
        console.log("접속성공");
        console.log(e);
        sendMsg("ArrowRight");     
    },
    onmessage : function (e) {
        // console.log('메세지 감지');
        // console.log(e);
        // console.log(e.data);
    
    
        //데이터가 나인 경우 걸러내기 
        let receivedUser = JSON.parse(e.data);
        receivedUserId = receivedUser.userId;
    
        if (receivedUser.userId !== userId) {
    
            //console.log(receivedUserId)
            UsersData.push(receivedUser);
            //userData에 담겨있는 userId 값 기준으로 필터링 : 마지막 값만 남김 
            FilterUsers = UsersData.filter(
                (arr, index, callback) =>
                    index === callback.findLastIndex(t =>
                        t.userId === arr.userId
                    )
            )
    
    
        }
    
        //떠난 유저 체크해서 삭제하기 
        FilterUsers = FilterUsers.filter(user => user.connecting != 'N'); //삭제 
    
        //UsersData.push(JSON.parse(e.data)); // String -> 배열 변환  
        //console.log(UsersData)  //object
    
    
        UsersData = FilterUsers; // Userdate 정보를 Fileter 정보로 바꿔주기 
        //console.log(FilterUsers);
    
        //userrender 함수 호출 
        usersreder();
    
    },
    onclose: function(e){
        //console.log(e);
        console.log('재연결...')
        setTimeout(function () {
           //재연결하기...
           socket = new WebSocket("ws://192.168.30.171:8083" + path + "/multiAccess");
           initSocket(socket);
           console.log('재연결...보냈당')
        }, 1000)    
    },
    onerror : (event) => {
        console.log("WebSocket error: ", event);
    }
}
function initSocket(s){
    console.log(s);
    for(let key in fnSocket){
        s[key] = fnSocket[key];
        //console.log(s[key] , fnSocket[key]);
    }
}

initSocket(socket);

//소켓 설정
// socket.onopen = function (e) {
//     console.log("접속성공");
//     console.log(e);
//     sendMsg("ArrowRight")

// }
//웝소켓서버에서 sendObjcet 메소드를 실행하면 실행되는 함수 
// socket.onmessage = function (e) {
//     // console.log('메세지 감지');
//     // console.log(e);
//     // console.log(e.data);


//     //데이터가 나인 경우 걸러내기 
//     let receivedUser = JSON.parse(e.data);
//     receivedUserId = receivedUser.userId;

//     if (receivedUser.userId !== userId) {

//         //console.log(receivedUserId)
//         UsersData.push(receivedUser);
//         //userData에 담겨있는 userId 값 기준으로 필터링 : 마지막 값만 남김 
//         FilterUsers = UsersData.filter(
//             (arr, index, callback) =>
//                 index === callback.findLastIndex(t =>
//                     t.userId === arr.userId
//                 )
//         )


//     }

//     //떠난 유저 체크해서 삭제하기 
//     FilterUsers = FilterUsers.filter(user => user.connecting != 'N'); //삭제 

//     //UsersData.push(JSON.parse(e.data)); // String -> 배열 변환  
//     //console.log(UsersData)  //object


//     UsersData = FilterUsers; // Userdate 정보를 Fileter 정보로 바꿔주기 
//     //console.log(FilterUsers);

//     //userrender 함수 호출 
//     usersreder();

// }




//데이터 전송 JSON
const sendMsg = (keyboardCode) => {

    let connecting = "Y"

    //유저객체 넣어주기 : 랜더링에 필요한 정보들 : x, y , skin, id , name, code;
    let User = new UserData(uesrX, uesrY, userSkin, userId, userName, keyboardCode, connecting);
    //console.log(User)

    socket.send(JSON.stringify(User));
    //문자열 객체 데이터로 바꿔줌 

}


// socket.addEventListener("error", (event) => {
//     console.log("WebSocket error: ", event);
// });

// socket.onclose = function(e){
//     console.log(e);
//     console.log('재연결...')
//     setTimeout(function () {
//        //재연결하기...
//        socket = new WebSocket("ws://192.168.30.171:8083" + path + "/multiAccess");
//        console.log('재연결...보냈당')
//     }, 1000)

// }



//넘겨줄 데이터 유저 좌표, 유저스킨, 유저아이디 : 유저 정보 컨트롤 
function UserData(uesrX, uesrY, userSkin, userId, userName, keyboardCode, connecting) {
    this.uesrX = uesrX;
    this.uesrY = uesrY;
    this.userSkin = userSkin;
    this.userId = userId;
    this.userName = userName;
    this.keyboardCode = keyboardCode;
    this.connecting = connecting;
}



let skinImages = {};
let moveMotion = true;

//user 랜더링
function usersreder() {

    //필터링된 유저들 img 불러오기
    for (let i = 0; i < FilterUsers.length; i++) {
        let imgMotion = "";
        switch (FilterUsers[i].keyboardCode) {
            case "ArrowDown":
                imgMotion = "f"
                break;
            case "ArrowLeft":
                imgMotion = "l"
                break;
            case "ArrowRight":
                imgMotion = "r"
                break;
            case "ArrowUp":
                imgMotion = "b"
                break;
            default:
                return;

        }

        if (receivedUserId == FilterUsers[i].userId) {
            if (moveMotion) {
                moveMotion = false;
            } else {
                moveMotion = true;
            }
        }

        if (moveMotion) {
            imgMotion += "d"
        } else {
            imgMotion += "s"
        }

        //console.log(imgMotion);


        //불러온 img skinimg에 넣어줌
        let img = new Image();
        img.src = "../resource/img/user/skin" + FilterUsers[i].userSkin + "/" + imgMotion + ".png"
        skinImages[i] = img;

    }



    //console.log(skinImages);

}


//클릭이벤트로 해당 userid 넘겨주기
canvas.addEventListener('click', function (e) {


    let x = e.clientX; //클릭좌표값
    let y = e.clientY; //클릭좌표값

    console.log(x, y)


    for (let user of FilterUsers) { //랜더링된 filter user 정보 받아서 좌표값 체크
        let ux = parseInt(user.uesrX);
        let uy = parseInt(user.uesrY);
        let id = user.userId;

        if (x >= ux && x <= ux + 50 && y >= uy && y <= uy + 50) {
            document.querySelector(".info-modal").classList.remove("hidden");
            window.sessionStorage.setItem('clickedUserId', id);
            getUserInfo();
            break; //sesion에 clickUserId로 id 값 넘겨주기

        }
    }

    //console.log(sessionStorage.clickedUserId)
})


//만든 유저 img 하나씩 뽑아서 캔버스에 draw  
function userDraw() {

    for (let i = 0; i < FilterUsers.length; i++) {
        let user = FilterUsers[i];
        let x = parseInt(user.uesrX);
        let y = parseInt(user.uesrY);
        let username = user.userName;

        let img = skinImages[i];

        ctx.drawImage(img, x, y, 50, 50);
        ctx.font = '12px Sans-Serif'
        ctx.fillText(username, x + 4, y + 60);

    }
}




//랜더링 프레임으로 호출
function main() {

    //호출됨
    if (!modalstop) {
        update(); //좌표값 업데이트
        render(); //업데이트 된 좌표값으로 재 랜더링
        userDraw();
        requestAnimationFrame(main); // 프레임에 맞춰서 반복호출        
        //들어와서 호출

    }



}


//종료한 user 체크하기
// 윈도우 종류 이벤트 체크 1 
window.addEventListener('beforeunload', function (event) {
    event.preventDefault(); //브라우저를 종료할때 
    let User = new UserData(uesrX, uesrY, userSkin, userId, userName, '', 'N'); //떠난 유저
    socket.send(JSON.stringify(User)); //떠났다고 알려줌 

})


//소켓 끊어보기 
// setTimeout(function () {
//     //소켓끊어보기  
//     console.log('끊어졌당...')
//     socket.close();
//  }, 10000)



//소켓 버벅이는거 해결해보기...!!
//1 번 : 키보드 이벤트 제한하기 ..!!
// function 제한..(callback, delay) {
//     let timeoutId;

// return function() {
//       const context = this;
//       const args = arguments;

//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         callback.apply(context, args);
//       }, delay);
//     };
//   }

//   debounce(event => {
//     const message = event.target.value;
//     sendSocketMessage(message);
//   }, 500)); 

//2 번 : 버퍼..써보기...잘모르겠지만..
//let messageBuffer = []; 버퍼에 담아서...
//function addToMessageBuffer(message) {
//     messageBuffer.push(message);
// // }

// inputElement.addEventListener('keyup', event => {
//     const message = event.target.value;
//     addToMessageBuffer(message);
//   });
// setInterval(() => {
//     // 버퍼에 보낼 메세지 확인
//     if (messageBuffer.length > 0) {

//       //소켓에 메세지 보내기
//       sendSocketMessage(messages);

//       // 버퍼 비워주기
//       messageBuffer = [];
//     }
//   }, 1000); 


//3번 : 둘다 안되면.. 서버에서 필터링해보기. 찾아보니 관련함수 있는듯?? 잘모르겠지만..해보는걸로...

// 4번 : 끊어짐 감지해서 재 연결시키기 
//
// webSocket.onclose = async (e) => {
//     console.log('Socket is closed. Reconnect will be attempted in 1 second.', e);
//     setTimeout(function() {
//       twelveDataConnect();
//     }, 1000);
//   }



//시작  호출 
loadImage();
main();
setupKeyboard();



