/**
 * 유효성검사 스크립트
 * 작성자 : 김혜린
 */

    let regGap = /\s/;
    let regKor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    let regSym = /[`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/im;


    let regPwd1 = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$/;
    // 영문, 숫자만(특수기호 빠짐)
    let regPwd2 = /^(?=.*[0-9])(?=.*[!@#$%^&*_])[0-9!@#$%^&*_]{8,16}$/;
    // 숫자, 특수기호만(영문 빠짐)
    let regPwd3 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*_])[a-zA-Z!@#$%^&*_]{8,16}$/;
    // 영문, 특수기호만(숫자 빠짐)
    let regPwd4 = /^(?=.*[a-zA-Z])[a-zA-Z]{8,16}$/;  //영문만
    let regPwd5 = /^(?=.*[0-9])[0-9]{8,16}$/; //숫자만
    let regPwd6 = /^(?=.*[!@#$%^&*_])[!@#$%^&*_]{8,16}$/; //특수기호만

    let regId = /^[a-zA-Z0-9_]{5,20}$/;
    let regNic = /^[ㄱ-ㅎㅏ-ㅣ가-힣0-9\w]{2,8}$/;
    let regPwd = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;
    let regself = /{,100}/;



    /////////////////////회원가입 활성화 객체/////////////////////////////
    let validateObj = {
        id : false,
        nick :false,
        pwd : false,
        chkpwd : false,
        agree : false
    }


//============아이디 하단 안내 텍스트 조건문=============

    $('.enroll-id').keyup(function(){
        let id = this.value;
        //console.log(id)
        validateObj.id = false;
        let txt = $('.idcheck-txt');
    
        if(id == ""){
            txt.css('color','red');
            txt.html("아이디를 입력해 주세요.");
        }else if(regGap.test(id)){
            txt.css('color','red');
            txt.html("공백없이 입력해 주세요.");
        }else if(regKor.test(id)){
            txt.css('color','red');
            txt.html("한글없이 입력해주세요.");
        }else if(regSym.test(id)){
            txt.css('color','red');    
            txt.html("특수기호는 (_)만 가능합니다.");
        }else if(id.length < 5 || id.length > 20 ) {
            txt.css('color','red');
            txt.html("5~20자 이내로 입력해 주세요.");
        }else{
            txt.css('color','green');
            txt.html("사용가능. 중복확인 버튼을 눌러주세요.");
            validateObj.id = true;
        }
        enabledSubmit();
    });



//============닉네임 하단 안내 텍스트 조건문=============
$('.enroll-nic').keyup(function(){
    let nic = this.value;
    //console.log(nic)

    validateObj.nick = false;

    let txt = $('.niccheck-txt');

    if(nic == ""){
        txt.css('color','red');
        txt.html("닉네임을 입력해 주세요.");
    }else if(regGap.test(nic)){
        txt.css('color','red');
        txt.html("공백없이 입력해 주세요.");
    }else if(regSym.test(nic)){
        txt.css('color','red');
        txt.html("특수기호는 (_)만 가능합니다.")    
    }else if(nic.length < 2 || nic.length > 8 ) {
        txt.css('color','red');
        txt.html("2~8자 이내로 입력해 주세요.");
    }else{
        txt.css('color','green');
        txt.html("사용가능. 중복확인 버튼을 눌러주세요.");
        validateObj.nick = true;
    }
    enabledSubmit();

});


//============비밀번호 하단 안내 텍스트 조건문=============
// 영문 숫자 특수기호 각 1개씩 필수로 입력해야하는 조건 추가
$('.enroll-pwd').keyup(function(){
    let pwd = this.value;
    //console.log(pwd)
    //console.log(regPwd.test(pwd));
    validateObj.pwd = false;
    let txt = $('.pwd-txt');
    
    if(pwd == ""){
        txt.css('color','red');
        txt.html("비밀번호를 입력해 주세요.");
    }else if(regGap.test(pwd)){
        txt.css('color','red');
        txt.html("공백없이 입력해 주세요.");
    }else if(pwd.length < 8 || pwd.length > 16 ){
        txt.css('color','red');
        txt.html("8~16자 이내로 입력해 주세요.");
    }else if(regPwd1.test(pwd)){
        txt.css('color','red');
        txt.html("특수기호를 넣어 입력해 주세요.");
    }else if(regPwd2.test(pwd)){
        txt.css('color','red');
        txt.html("영문자를 넣어 입력해 주세요.");
    }else if(regPwd3.test(pwd)){
        txt.css('color','red');
        txt.html("숫자를 넣어 입력해 주세요.");
    }else if( regPwd.test(pwd) == 0){
    //}else if(regPwd4.test(pwd) || regPwd5.test(pwd) ||regPwd6.test(pwd)){
        txt.css('color','red');
        txt.html("영문, 숫자, 특수기호를 혼합하여 입력해 주세요.");
    }
    else{
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
        validateObj.pwd = true;

    }
    enabledSubmit();

});

$('.enroll-chkpwd').keyup(function(){
    let chkpwd = this.value;
    let pwd = $('.enroll-pwd').val();
    //console.log(chkpwd);
    //console.log(regPwd.test(chkpwd));
    validateObj.chkpwd = false;

    let txt = $('.pwd-txt');

    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
        }else{
            txt.css('color','green');
            txt.html("일치");
            validateObj.chkpwd = true;

        }
    }else if(chkpwd == ""){
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
        validateObj.chkpwd = false;

    }
    enabledSubmit();

});
/////////////////////////////회원가입끝//////////////////////////////////////





//=========== 새 비밀번호 설정 하단 txt ===============
let newPwdObj = {
    pwd : false,
    chkpwd : false
}
//////////////////////////////////
$('.re-pwd').keyup(function(){
    let pwd = this.value;
    //console.log(pwd)
    //console.log(regPwd.test(pwd));
    newPwdObj.pwd = false;

    let txt = $('.repwd-txt');
    
    if(pwd == ""){
        txt.css('color','red');
        txt.html("비밀번호를 입력해 주세요.");
    }else if(regGap.test(pwd)){
        txt.css('color','red');
        txt.html("공백없이 입력해 주세요.");
    }else if(pwd.length < 8 || pwd.length > 16 ){
        txt.css('color','red');
        txt.html("8~16자 이내로 입력해 주세요.");
    }else if(regPwd1.test(pwd)){
        txt.css('color','red');
        txt.html("특수기호를 넣어 입력해 주세요.");
    }else if(regPwd2.test(pwd)){
        txt.css('color','red');
        txt.html("영문자를 넣어 입력해 주세요.");
    }else if(regPwd3.test(pwd)){
        txt.css('color','red');
        txt.html("숫자를 넣어 입력해 주세요.");
    }else if( regPwd.test(pwd) == 0){
    //}else if(regPwd4.test(pwd) || regPwd5.test(pwd) ||regPwd6.test(pwd)){
        txt.css('color','red');
        txt.html("영문, 숫자, 특수기호를 혼합하여 입력해 주세요.");
    }
    else{
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
        newPwdObj.pwd = true;
    }
    newpwdEnable();
});

$('.re-chkpwd').keyup(function(){
    let chkpwd = this.value;
    let pwd = $('.re-pwd').val();
    //console.log(chkpwd);
    //console.log(regPwd.test(chkpwd));
    let txt = $('.repwd-txt');

    newPwdObj.chkpwd = false;

    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
        }else{
            txt.css('color','green');
            txt.html("일치");
            newPwdObj.chkpwd = true;
        }
    }else if(chkpwd == ""){
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
        newPwdObj.chkpwd = false;
    }
    newpwdEnable();

});
//////////////////////////////////////////////////////





//=========== 내 정보 변경 하단 txt ===============

let cgeInfoObj = {
    nick : true,
    pwd : true,
    chkpwd : true
}


//===== 닉네임 변경 =====
$('.cge-nick').keyup(function(){
    let nic = this.value;
    //console.log(nic)

    
    let txt = $('.cgenick-txt');
    //console.log(txt)
    if(nic == ""){
        txt.css('color','red');
        txt.html("닉네임을 입력해 주세요.");
        //cgeInfoObj.nick = true;
    }else if(regGap.test(nic)){
        txt.css('color','red');
        txt.html("공백없이 입력해 주세요.");
        //cgeInfoObj.nick = false;
    }else if(regSym.test(nic)){
        txt.css('color','red');
        txt.html("특수기호는 (_)만 가능합니다.")
       // cgeInfoObj.nick = false;    
    }else if(nic.length < 2 || nic.length > 8 ) {
        txt.css('color','red');
        txt.html("2~8자 이내로 입력해 주세요.");
       // cgeInfoObj.nick = false;
    }else{
        txt.css('color','green');
        txt.html("사용가능. 중복확인 버튼을 눌러주세요.");
       //cgeInfoObj.nick = true;
    }
   // cgeInfoEnable();

   
    if(regNic.test(nic) == 1){
        cgeInfoObj.nick = true;
    }
    if(regNic.test(nic) == 0){
        cgeInfoObj.nick = false;
    }
    if(nic == ""){
        cgeInfoObj.nick = true;

    }
    
    console.log(regNic.test(nic));
    cgeInfoEnable();
    console.log(cgeInfoObj)


});

//===== 자기소개 textarea =====
$('.self-info').keyup(function(){
    let selfInfo = this.value;
    //console.log(selfInfo)
   // console.log(regself.test(selfInfo))
    let txt = $('.self-txt');

    if(selfInfo.length > 100){
        txt.css('color','red');
        txt.html("100자 초과.");
    }else{
        txt.html("");
    }
});

//=====  내정보 pw 변경 =============================

$('.cge-pwd').keyup(function(){
    let pwd = this.value;
   // console.log(pwd)
    //console.log(regPwd.test(pwd));
    let txt = $('.cgepwd-txt');
    
    if(pwd == ""){
        txt.css('color','red');
        txt.html("비밀번호를 입력해 주세요.");
        //cgeInfoObj.pwd = true;
    }else if(regGap.test(pwd)){
        txt.css('color','red');
        txt.html("공백없이 입력해 주세요.");
       // cgeInfoObj.pwd = false;
    }else if(pwd.length < 8 || pwd.length > 16 ){
        txt.css('color','red');
        txt.html("8~16자 이내로 입력해 주세요.");
        //cgeInfoObj.pwd = false;
    }else if(regPwd1.test(pwd)){
        txt.css('color','red');
        txt.html("특수기호를 넣어 입력해 주세요.");
       // cgeInfoObj.pwd = false;
    }else if(regPwd2.test(pwd)){
        txt.css('color','red');
        txt.html("영문자를 넣어 입력해 주세요.");
       // cgeInfoObj.pwd = false;
    }else if(regPwd3.test(pwd)){
        txt.css('color','red');
        txt.html("숫자를 넣어 입력해 주세요.");
       // cgeInfoObj.pwd = false;
    }else if( regPwd.test(pwd) == 0){
    //}else if(regPwd4.test(pwd) || regPwd5.test(pwd) ||regPwd6.test(pwd)){
        txt.css('color','red');
        txt.html("영문, 숫자, 특수기호를 혼합하여 입력해 주세요.");
        //cgeInfoObj.pwd = false;
    }else{
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
       //cgeInfoObj.pwd = true;
    }
   // cgeInfoEnable();

   let chkpwd = $('.cge-chkpwd').val();

   if(regPwd.test(pwd) == 1){
        cgeInfoObj.pwd = true;
    }
    if(regPwd.test(pwd) == 0){
        cgeInfoObj.pwd = false;
    }
    if(pwd == ""){
        cgeInfoObj.pwd = true;
    }
    if(pwd != chkpwd){
        cgeInfoObj.chkpwd = false;
    }
    if(pwd == chkpwd){
        cgeInfoObj.chkpwd = true;
    }

    console.log(regPwd.test(pwd));
    cgeInfoEnable();
    console.log(cgeInfoObj);








});
//=========내정보변경 pw확인 =============
$('.cge-chkpwd').keyup(function(){
    let chkpwd = this.value;
    let pwd = $('.cge-pwd').val();
    
    //console.log(chkpwd);
   // console.log(pwd == chkpwd);
    let txt = $('.cgepwd-txt');

    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
           // cgeInfoObj.chkpwd = false;
        }else{
            txt.css('color','green');
            txt.html("일치");
           // cgeInfoObj.chkpwd = true;
        }
    }else if(chkpwd == ""){
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
       // cgeInfoObj.chkpwd = true;
    }
   

    if(regPwd.test(chkpwd) == 1){
        cgeInfoObj.chkpwd = true;
    }
    if(regPwd.test(chkpwd) == 0){
        cgeInfoObj.chkpwd = false;
    }
    if(chkpwd == ""){
        cgeInfoObj.chkpwd = true;
    }
    if(pwd != chkpwd){
        cgeInfoObj.chkpwd = false;
    }

    console.log(regPwd.test(chkpwd));
    cgeInfoEnable();
    console.log(cgeInfoObj);





});



////////////////회원가입 약관동의체크/////////////////////////


$('#check-agree').click(function(){
    if(!$('#check-agree').is(':checked')){
        console.log($('#check-agree').is('checked'))
        validateObj.agree= false;
    }else{
        validateObj.agree= true;
    }
    
    enabledSubmit();
})


/* ==========회원가입 버튼 활성화===========*/////////나중에 중복확인버튼 조건으로 변경
// 1. 아이디 유효성 검사 충족
// 2. 아이디 중복확인 버튼 체크
// 3. 닉네임 유효성 검사 충족
// 4. 닉네입 중복확인 버튼 체크
// 5. 비밀번호 유효성 검사 충족
// 6. 비밀번호확인 == 비밀번호
// 7. 이용약관 동의 체크


function enabledSubmit(){
    let enrollBtn = document.getElementById("enroll-btn");
    console.log(validateObj)

    // 다른거 제대로 입력했나 검사를함
    for( let key in validateObj){
        console.log(validateObj[key]);
        if(!validateObj[key]){
            console.log(validateObj[key])
            //비활성화
            enrollBtn.disabled = true;
            return;
        }
    }
    
    //활성화
    enrollBtn.disabled = false;
    //enrollBtn.setAttribute("disabled", true);
    //비활성화
}
////////////////////////////////////////////////////////////////////////








///============비밀번호 재설정 활성화 함수===============//
function newpwdEnable(){
    let btn = document.getElementById("newpwd-btn");
    console.log(newPwdObj)

    for(let key in newPwdObj){
        console.log(newPwdObj[key])
        if(!newPwdObj[key]){
            console.log(newPwdObj[key])

            btn.disabled = true;
            return;
        }
    }
    btn.disabled = false;
}





///============ 내정보변경 버튼 활성화 함수===============//

// if(닉네임 input박스에 값이 !="" || 비밀번호 변경 !=""){
    //정보수정 btn attr('disabled', false); 

//}else{
    //정보수정 btn attr('disabled', true); 
//}

/*
-비활성화 조건
닉네임, 비밀번호 변경란에 입력값이 생겼을 때
유효성 검사 조건에 만족하지 않을 때


-활성화 조건
닉네임, 비밀번호 변경란에 입력값이 없을 때
변경란에 값이 들어왔지망 => 유효성 검사 조건에 만족했을 떄

*/

// => 이아래거는 객체가 true인지 false인지 반복문 통해서 검열하는 코드
// 그러니까 위에서 조건에 맞게 false랑 true 넣어야 함
function cgeInfoEnable(){
    let btn = document.getElementById("cge-btn");
   // console.log(cgeInfoObj)

    for(let key in cgeInfoObj){
        //console.log(cgeInfoObj[key])
        if(!cgeInfoObj[key]){
           // console.log(cgeInfoObj[key])

            btn.disabled = true;
            return;
        }
    }
    btn.disabled = false;
}