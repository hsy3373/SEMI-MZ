/**
 * 작성자 : 윤지영
 * 광장에 들어가는 캔버스 관련 JS
 */

/* js 가져오기  */
import { getContextPath } from './common.js';


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

    //Listbutton = new Image();
    //Listbutton.src = "../resource/img/icon/목록 버튼.png"

    //friendList = new Image();
    //friendList.src = "../resource/img/icon/친구목록 버튼.png"

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
userld.src = "../resource/img/user/skin"+userSkin+ "/ld.png"

let userls = new Image();
userls.src = "../resource/img/user/skin"+userSkin+ "/ls.png"

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
    //ctx.drawImage(Listbutton, 1220,730, 50,50)
    //ctx.drawImage(friendList, 1160,730,50,50)
    ctx.drawImage(user, uesrX, uesrY, 50, 50);
    ctx.font = '12px Sans-Serif'
    ctx.fillText(userName, uesrX + 2, uesrY + 60);

}


//keys 다운에 부여하는 캐릭터 이동 이벤트
let keysDown = {};
function setupKeyboard() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true

        console.log(event.key)
        sendMsg(event.key);
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

    // //img 안을 클릭할 경우 이벤트 :Listbutton 
    // if(clickX >= 1220 && clickX <= 1270 && clickY >= 730 && clickY <= 780 ){
    //     //console.log("Listbutton 이벤트 부여")
    //     modal2.style.display = 'block';

    // }

    // //img 안을 클릭할 경우 이벤트 :friendList 
    // if(clickX >= 1160 && clickX <= 1210 && clickY >= 730 && clickY <= 780 ){
    //     //console.log("friendList 이벤트 부여")
    //     modal1.style.display = 'block';
    // }

    console.log(clickX, clickY);

})


//마우스 호버 이벤트 : 미구현
canvas.addEventListener("mousemove", function (event) {

    //내가 클릭한 좌표 얻어오기
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    //img 안을 들어올 경우
    if (clickX >= 892 && clickX <= 1111 && clickY >= 10 && clickY <= 226) {
        console.log("집안으로 들어옴")
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
    }

    if (37 in keysDown) {
        uesrX -= 4; // 왼쪽이동

        if (user === userls) {
            user = userld
        } else {
            user = userls
        }

    }

    if (38 in keysDown) { //위로이동
        uesrY -= 4;

        if (user === userbs) {
            user = userbd
        } else {
            user = userbs
        }
    }

    if (40 in keysDown) { // 아래로이동 
        uesrY += 4;

        if (user === userfs) {
            user = userfd
        } else {
            user = userfs
        }
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

//집으로 이동하는 함수
const gohome = () => {
    let path = getContextPath()
    console.log(path + "/gohome")
    location.href = path + "/gohome";

}



let UsersData = []; // 유저들 데이터 담아줄 배열
let FilterUsers = [];//필터링된 유저 1개 만큼 담아줄 배열
// 웹소켓으로 연결하기
// 웹소켓 서버 생성 : 학원 192.168.30.171
let path = getContextPath()
const socket = new WebSocket("ws://192.168.30.171:8083" + path + "/multiAccess");
//집 : 192.168.35.13


//소켓 설정
socket.onopen = function (e) {
    console.log("접속성공");
    console.log(e);

}

//웝소켓서버에서 sendObjcet 메소드를 실행하면 실행되는 함수 
socket.onmessage = function (e) {
    // console.log('메세지 감지');
    // console.log(e);
    // console.log(e.data);

    UsersData.push(JSON.parse(e.data)); // String -> 배열 변환  
    console.log(UsersData)  //object

    //userData에 담겨있는 userId 값 기준으로 필터링 : 마지막 값만 남김 
    FilterUsers = UsersData.filter(
        (arr, index, callback) =>
            index === callback.findLastIndex(t =>
                t.userId === arr.userId
            )
    )

    
    UsersData = FilterUsers; // Userdate 정보를 Fileter 정보로 바꿔주기  : 잠깐 필터생략 (추후 다시 사용해야함 )
    //console.log(FilterUsers);

     //userrender 함수 호출 
     usersreder();

}






//데이터 전송 JSON
const sendMsg = (keyboardCode) => {

    //유저객체 넣어주기 : 랜더링에 필요한 정보들 : x, y , skin, id , name, code;
    let User = new UserData(uesrX, uesrY, userSkin, userId, userName, keyboardCode);
    console.log(User)

    socket.send(JSON.stringify(User));
    //문자열 객체 데이터로 바꿔줌 

}

//넘겨줄 데이터 유저 좌표, 유저스킨, 유저아이디
function UserData(uesrX, uesrY, userSkin, userId, userName, keyboardCode) {
    this.uesrX = uesrX;
    this.uesrY = uesrY;
    this.userSkin = userSkin;
    this.userId = userId;
    this.userName = userName;
    this.keyboardCode = keyboardCode;
}




let skinImages = {};

function usersreder() {

    
    let moveMotion = true;

    for (let i = 0; i < FilterUsers.length; i++) {
        let imgMotion ="";
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
            default :
                return;

        }


        if (moveMotion) {
            imgMotion += "d"
        } else {
            imgMotion += "s"
        }

        console.log(imgMotion);
      

        let img = new Image();
        img.src = "../resource/img/user/skin" + FilterUsers[i].userSkin + "/"+imgMotion+".png"
        skinImages[i] = img;

    }
   
    

    console.log(skinImages);


    //만든 유저 img 하나씩 뽑아서 캔버스에 draw
    // for (let i = 0; i < FilterUsers.length; i++) {
    //     let user = FilterUsers[i];
    //     let x = parseInt(user.uesrX);
    //     let y = parseInt(user.uesrY);
    //     let username = user.userName;

    //     let img = skinImages[i];
    //     img.onload = function () {
    //         ctx.drawImage(img, x, y, 50, 50);
    //         ctx.font = '12px Sans-Serif'
    //         ctx.fillText(username, x + 4, y + 60);
    //     };
    // }


}


 //클릭이벤트로 해당 userid 넘겨주기
 canvas.addEventListener('click', function (e) {


    let x = e.clientX; //클릭좌표값
    let y = e.clientY; //클릭좌표값

    console.log(x)
    console.log(y)

    for (let user of FilterUsers) { //랜더링된 filter user 정보 받아서 좌표값 체크
        let ux = parseInt(user.uesrX);
        let uy = parseInt(user.uesrY);
        let id = user.userId; 

        if (x >= ux && x <= ux + 50 && y >= uy && y <= uy + 50) {
            window.sessionStorage.setItem('clickedUserId', id);
            break; //sesion에 clickUserId로 id 값 넘겨주기
        }
    }

    console.log(sessionStorage)
})





//랜더링 프레임으로 호출
function main() {

    if (!modalstop) {
        update(); //좌표값 업데이트
        render(); //업데이트 된 좌표값으로 재 랜더링
        requestAnimationFrame(main); // 프레임에 맞춰서 반복호출

        

    }


    

     //만든 유저 img 하나씩 뽑아서 캔버스에 draw 
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









//시작  호출 
loadImage();
main();
setupKeyboard();