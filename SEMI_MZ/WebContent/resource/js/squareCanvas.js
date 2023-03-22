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
//const myhome2 = document.getElementById("myhome2")

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
    //ctx.drawImage(myhome2,200, 200, 220,220.5);

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

//클릭에 부여하는 이벤트
canvas.addEventListener("click", function(event){

    //내가 클릭한 좌표 얻어오기
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    //img 안을 클릭할 경우 이벤트 : my home
    if(clickX >= 895 && clickX <= 1110 && clickY >= 10 && clickY <= 226 ){
        console.log("home 이벤트 부여")
    }

    //img 안을 클릭할 경우 이벤트 : noticeBoard
    if(clickX >= 1030 && clickX <= 1140 && clickY >= 411 && clickY <= 442 ){
        console.log("notice 이벤트 부여")
    }

    //img 안을 클릭할 경우 이벤트 :gamegone 
    if(clickX >= 240 && clickX <= 400 && clickY >= 200 && clickY <= 350 ){
        console.log("gamegone 이벤트 부여")
    }

    //img 안을 클릭할 경우 이벤트 :Listbutton 
    if(clickX >= 1220 && clickX <= 1270 && clickY >= 730 && clickY <= 780 ){
        //console.log("Listbutton 이벤트 부여")
        modal2.style.display = 'block';
        
    }

    //img 안을 클릭할 경우 이벤트 :friendList 
    if(clickX >= 1160 && clickX <= 1210 && clickY >= 730 && clickY <= 780 ){
        //console.log("friendList 이벤트 부여")
        modal1.style.display = 'block';
    }
    
    console.log(clickX,clickY);

})


//모달 이벤트
const modal1 = document.querySelector('.modal1'); //친구목록
const modal2 = document.querySelector('.modal2'); //환경설정
const logoutButton = document.querySelector('.modal_button2'); //로그아웃버튼
const mydateButton = document.querySelector('.modal_button1'); //내정보 변경

document.querySelector('.x-btn1').addEventListener('click', () => {
    modal1.style.display = 'none';
});

logoutButton.addEventListener('click', () => {
    console.log("로그아웃 이벤트 부여")
});

mydateButton.addEventListener('click', () => {
    console.log("내정보변경  이벤트 부여")
});





//마우스 호버 이벤트 : jsp에서 선언하고 마우스 호버이벤트 
canvas.addEventListener("mousemove", function(event){

    //내가 클릭한 좌표 얻어오기
    const clickX = event.offsetX;
    const clickY = event.offsetY;

    //img 안을 들어올 경우
    if(clickX >= 892 && clickX <= 1111 && clickY >= 10 && clickY <= 226 ){
        ctx.drawImage(myhome, 891,6, 250, 250.5);
        console.log("집안으로 들어옴")
    }

    

})




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

    //미묘하게 버벅거리는 부분 있음  

    //유저 맵 블락 : 중앙 계단 오른쪽 
    if(uesrX <= 1250 && uesrX >= 920 ){

        if(uesrY >= 494 && uesrY <= 510){
            uesrY = 490
        }

        if(uesrY >= 690 && uesrY <= 710){
            uesrY = 715
        }

        if(uesrX <= 1000 && uesrY >= 494 && uesrY <= 710 ){
            uesrX = 915;
        }

    }

    //맵 블락 : 중앙 계단 왼쪽 
    if(uesrX <= 862 && uesrX >= 490){

        if(uesrY >= 494 && uesrY <= 510){
            uesrY = 490
        }

        if(uesrY >= 690 && uesrY <= 710){
            uesrY = 715
        }

        if(uesrX >= 850 && uesrX <= 862 && uesrY >= 494 && uesrY <= 710 ){
            uesrX = 867;
        }

        if(uesrX <= 800 && uesrY >= 494 && uesrY <= 710 ){
            uesrX = 480;
        }

    }

     //맵 블락 : 절벽 왼쪽 
     if(uesrX <= 432 && uesrX >= 0){

        if(uesrY >= 510 && uesrY <= 526){
            uesrY = 530
        }

        if(uesrY >= 366 && uesrY <= 400){
            uesrY = 360
        }

        if(uesrX <= 432 &&  uesrX >= 420 && uesrY >= 366 && uesrY <= 526 ){
            uesrX = 427;
        }
    }

    
     //맵 블락 : 절벽 오른쪽

     if(uesrX <= 571 && uesrX >= 480){

        if(uesrY >= 500 && uesrY <= 535){
            uesrY = 540
        }

        if(uesrY >= 424 && uesrY <= 440){
            uesrY = 420
        }

        if(uesrX >= 565 && uesrX <= 571 && uesrY >= 424 && uesrY <= 535 ){
            uesrX = 575;
        }

        if(uesrX >= 480 && uesrX <= 490 && uesrY >= 424 && uesrY <= 535 ){
            uesrX = 480;
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
