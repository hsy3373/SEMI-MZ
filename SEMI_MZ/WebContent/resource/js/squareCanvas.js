/**
 * 작성자 : 윤지영
 * 광장에 들어가는 캔버스 관련 JS
 */

//캔버스 세팅
let canvas
let ctx;


canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 1300;
canvas.height = 800;
document.getElementById("mainSquare").appendChild(canvas);

let noticeBoard, myhome, squarebackground, Listbutton, friendList;

//배경 이미지 세팅
function loadImage(){
    squarebackground = new Image();
    squarebackground.src = "../resource/img/background/background_main.png"

    myhome = new Image();
    myhome.src = "../resource/img/icon/home.png"

    noticeBoard = new Image();
    noticeBoard.src = "../resource/img/icon/notice_icon.png"

    gamezone = new Image();
    gamezone.src = "../resource/img/icon/gamezone.png"

    Listbutton = new Image();
    Listbutton.src = "../resource/img/icon/목록 버튼.png"

    friendList = new Image();
    friendList.src = "../resource/img/icon/친구목록 버튼.png"


   
}

//캐릭터 세팅 (추후 DB로 변경예정)
let userbd = new Image();
userbd.src = "../resource/img/user/skin01/bd.png"

let userbs = new Image();
userbs.src = "../resource/img/user/skin01/bs.png"

let userfd = new Image();
userfd.src = "../resource/img/user/skin01/fd.png"

let userfs = new Image();
userfs.src = "../resource/img/user/skin01/fs.png"

let userld = new Image();
userld.src = "../resource/img/user/skin01/ld.png"

let userls = new Image();
userls.src = "../resource/img/user/skin01/ls.png"

let userrd = new Image();
userrd.src = "../resource/img/user/skin01/rd.png"

let userrs = new Image();
userrs.src = "../resource/img/user/skin01/rs.png"


//캐릭터 좌표(스타팅 x,y)
let uesrX = canvas.width - 400
let uesrY = canvas.height - 70;

//유저 이미지 지정
let user = userfs;

//이미지 랜더링
function render(){
    ctx.drawImage(squarebackground,0, 0, canvas.width , canvas.height)
    ctx.drawImage(myhome, 891,6, 220,220.5);
    ctx.drawImage(noticeBoard,960, 350, 271,140.5 )
    ctx.drawImage(gamezone, 230,200,180,146.4)
    ctx.drawImage(Listbutton, 1220,730, 50,50)
    ctx.drawImage(friendList, 1160,730,50,50)
    ctx.drawImage(user, uesrX, uesrY,50,50);

}

//keys 다운에 부여하는 캐릭터 이동 이벤트
let keysDown = {};
function setupKeyboard(){
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true
        console.log(uesrX)
        console.log(uesrY)
    });

    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode] // 키보드를 떼면 이벤트 삭제

    })

   
    
}



//좌표값 업데이트 
function update(){

    

    if( 39 in keysDown){
        uesrX += 4; // 캐릭터 속도 4 // 오른쪽이동

        if(user === userrs){
            user = userrd
        }else{
            user = userrs
        }
    }

    if( 37 in keysDown){
        uesrX -= 4; // 왼쪽이동

        if(user === userls){
            user = userld
        }else{
            user = userls
        }

    }

    if( 38 in keysDown){ //위로이동
        uesrY -= 4;

        if(user === userbs){
            user = userbd
        }else{
            user = userbs
        }
    }

    if( 40 in keysDown){ // 아래로이동 
        uesrY += 4;

        if(user === userfs){
            user = userfd
        }else{
            user = userfs
        }
    }


    
    //맵 블락 (상하좌우)
    if(uesrX >= canvas.width - 50){
        uesrX = canvas.width - 50;
    }

    if(uesrX <= 0){
        uesrX = 0;
    }

    if(uesrY >= canvas.height - 50){
        uesrY = canvas.height  - 50;
    }

    if(uesrY <= 0){
        uesrY = 0;
    }

    //오류있음. 시간날떄 체크 

    //유저 맵 블락 : 중앙 계단 오른쪽 
    if(uesrX <= 1250 && uesrX >= 920 ){
        if(uesrY >= 494 && uesrY <= 710){
           
            if(user == userfd){
                uesrY = 484
            }else if(user == userbd){
                uesrY = 720
            }else if(user == userrd){
                uesrX = 910;
            }
        }
        
    }

    //맵 블락 : 중앙 계단 왼쪽 
    if(uesrX <= 862 && uesrX >= 490 ){
        if(uesrY >= 494 && uesrY <= 710){
            if(user == userfd){
                uesrY = 484
            }else if(user == userbd){
                uesrY = 720
            }else if(user == userld){
                uesrX = 867;
            }else if(user == userrd){
                uesrX = 480
            }
        }
    }

     //맵 블락 : 절벽 오른쪽
     if(uesrX <= 571 && uesrX >= 487 ){
        if(uesrY >= 424 && uesrY <= 496){
            if(user == userfd){
                uesrY = 420
            }else if(user == userbd){
                uesrY = 490
            }else if(user == userld){
                uesrX = 575
            }else if(user == userrd){
                uesrX = 480
            }
        }
    } 

     //맵 블락 : 절벽 왼쪽 
     if(uesrX <= 432 && uesrX >= 0 ){
        if(uesrY >= 366 && uesrY <= 526){
            if(user == userfd){
                uesrY = 356
            }else if(user == userbd){
                uesrY = 516
            }else if(user == userld){
                uesrX = 427
            }
        }
    } 





}




//랜더링 프레임으로 호출
function main() {
        
        update(); //좌표값 업데이트
        render(); 
        requestAnimationFrame(main)

   
}

loadImage();
main();
setupKeyboard();