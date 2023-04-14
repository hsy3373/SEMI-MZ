/**
 * Member 정보 유효성검사 및 
 * 조건에 따른 버튼 활성화/비활성화처리 스크립트
 * 
 * 작성자 : 김혜린
 */

    import { getContextPath } from './common.js';
    import { homeOpenAlert } from "./homeAlert.js";
    let path = getContextPath();

////////////////////////// 정규식 /////////////////////////////
    let regGap = /\s/;
    let regKor = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;
    let regKor6 = /[ㄱ-ㅎㅏ-ㅣ]/;
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
    let regNic = /^[가-힣0-9\w]{2,8}$/;
    let regPwd = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;
    let regself = /{,100}/;

    /////////////////////회원가입버튼 활성화용 객체/////////////////////////////
   export let validateObj = {
        id : false,
        chkid : false,
        nick :false,
        chknick : false,
        chkpwd : false,
        pwd : false,
        agree : false
    }


//============아이디 input 하단 텍스트 조건문=============
    $('.enroll-id').keyup(function(){
        let id = this.value;
        validateObj.id = false;
        let txt = $('.idcheck-txt');
        let checkbtn = $('.check-id');
    
        if(regId.test(id) == 0){
            checkbtn.attr("disabled", true);
        }
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
            checkbtn.attr("disabled", false);
            validateObj.id = true;
        }
        enabledSubmit();
    });

//============닉네임 input 하단 텍스트 조건문=============
$('.enroll-nic').keyup(function(){
    let nic = this.value;
    validateObj.nick = false;
    let txt = $('.niccheck-txt');
    let checkbtn = $('.check-nic');

    if(regNic.test(nic) == 0){
        checkbtn.attr("disabled", true);
    }
    if(nic == ""){
        txt.css('color','red');
        txt.html("닉네임을 입력해 주세요.");
    }else if(regKor6.test(nic)){
        txt.css('color','red');
        txt.html("한글을 올바르게 입력해 주세요.");
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
        checkbtn.attr("disabled", false);
        validateObj.nick = true;
    }
    enabledSubmit();
});

//============비밀번호 하단 안내 텍스트 조건문=============
// 영문 숫자 특수기호 각 1개씩 필수로 입력해야하는 조건 추가
$('.enroll-pwd').keyup(function(){
    let pwd = this.value;
    let chkpwd = $('.enroll-chkpwd').val();
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
        txt.css('color','red');
        txt.html("영문, 숫자, 특수기호를 혼합하여 입력해 주세요.");
    }
    else{
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
        validateObj.pwd = true;
    }
    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
            validateObj.pwd = false;
        }else
        if(pwd == chkpwd)
        {
            txt.css('color','green');
            txt.html("일치");
            validateObj.pwd = true;
        }
    }
    enabledSubmit();
});
// 비밀번호 확인 키업
$('.enroll-chkpwd').keyup(function(){
    let chkpwd = this.value;
    let pwd = $('.enroll-pwd').val();
    validateObj.chkpwd = false;
    let txt = $('.pwd-txt');
    
    if(chkpwd == ""){
        txt.css('color','red');
        txt.html("비밀번호 확인란에 동일하게 입력해 주세요.");
        validateObj.chkpwd = false;
    }
    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd == chkpwd){
            txt.css('color','green');
            txt.html("일치");
            validateObj.chkpwd = true;
        }
        if(pwd != chkpwd)
        {
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
            validateObj.chkpwd = false;
        }
    }
    enabledSubmit();
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

/////////* 회원가입 아이디 중복확인 여부 기능*////////////
	$('.check-id').on("click", function(){
		validateObj.chkid= false;
		let enrollId = $('input[name=enrollId]').val();
		let txt = $('.idcheck-txt');

		$.ajax({
			url : path + "/idCheck.me",
			data : {enrollId: enrollId},
			success: (result) => {
				
				if(result == "N"){ // 사용불가(존재하는 아이디)
					//alert("이미 존재하는 아이디입니다. 다시 입력해주세요.");

                    /*alert*/
                    document.getElementById("home-alert-text").innerHTML = "이미 존재하는 닉네임입니다.<br> 다시 입력해주세요.";
                    /*alert 창 띄우기*/
                    homeOpenAlert();

                    $('input[name=enrollId]').val("");
                    $('input[name=enrollId]').focus();
                    txt.css('color', 'black');
                    txt.html("영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능");
					validateObj.chkid= false;
                    $('.check-id').attr("disabled", true);
				}
				if(result == "Y"){ // 사용가능
                    //alert("사용가능");
					let useId = confirm("사용가능한 아이디입니다. 사용하시겠습니까?");
                    console.log("confirm 결과값 : " + useId );
					if(useId == 0){ // 취소버튼(flase 반환)
                        $('input[name=enrollId]').val("");
                        $('input[name=enrollId]').focus();
                        txt.css('color', 'black');
                        txt.html("영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능");
                        validateObj.chkid= false;
                    }else{ // 확인버튼(true 반환)       
                        // readonly 속성 추가 (아이디 다시 못바꾸게)
                       $('input[name=enrollId]').prop('readonly', true);
                        $('input[name=enrollId]').css('color','rgb(107, 107, 107)');
                        txt.html("사용가능.");
                        validateObj.chkid= true;
                    }
                    $('.check-id').attr("disabled", true);
				}
                enabledSubmit();
			}
		})
	});

/////////* 회원가입 닉네임 중복확인 여부 기능*////////////
$('.check-nic').on("click", function(){
    validateObj.chknick= false;

    let enrollNick = $('input[name=enrollNick]').val();
    let txt = $('.niccheck-txt');

    $.ajax({
        url : path + "/nickCheck.me",
        data : {enrollNick: enrollNick},
        success: (result) => {
            
            if(result == "N"){ // 사용불가(존재하는 닉네임)
                //alert("이미 존재하는 닉네임입니다. 다시 입력해주세요.");

                /*alert*/
                document.getElementById("home-alert-text").innerHTML = "이미 존재하는 닉네임입니다.<br> 다시 입력해주세요.";
                /*alert 창 띄우기*/
                homeOpenAlert();

                $('input[name=enrollNick]').val("");
                $('input[name=enrollNick]').focus();
                txt.css('color', 'black');
                txt.html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
                validateObj.chknick= false;
                $('.check-nic').attr("disabled", true);
            }
            if(result == "Y"){ // 사용가능
                // confirm 창 (확인/취소)
                let useNick = confirm("사용가능한 닉네임입니다. 사용하시겠습니까?");
                
                if(useNick == 0){ // 취소버튼(flase 반환)
                    $('input[name=enrollNick]').val("");
                    $('input[name=enrollNick]').focus();
                    txt.css('color', 'black');
                    txt.html("영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능");
                    validateObj.chknick= false;
                }else{ // 확인버튼(true 반환)       
                    // readonly 속성 추가 (닉네임 다시 못바꾸게)
                    $('input[name=enrollNick]').prop('readonly', true);
                    $('input[name=enrollNick]').css('color','rgb(107, 107, 107)');
                    txt.html("사용가능.");
                    validateObj.chknick= true;
                }
                $('.check-nic').attr("disabled", true);
            }
            enabledSubmit();
        }
    })
});

/* ==========회원가입 버튼 활성화===========*/
// 1. 아이디 유효성 검사 충족 0
// 2. 아이디 중복확인 버튼 체크 0
// 3. 닉네임 유효성 검사 충족 0
// 4. 닉네입 중복확인 버튼 체크 0
// 5. 비밀번호 유효성 검사 충족 0
// 6. 비밀번호확인 == 비밀번호 0
// 7. 이용약관 동의 체크 0
export function enabledSubmit(){
    let enrollBtn = document.getElementById("enroll-btn");
    console.log(validateObj)

    for( let key in validateObj){
        console.log(validateObj[key]);
        if(!validateObj[key]){
            // 비활성화
            enrollBtn.disabled = true;
            console.log(validateObj[key])
            return;
        }
    }
    // 활성화
    enrollBtn.disabled = false;
}
/////////////////////////////회원가입 유효성 활성화 끝//////////////////////////////////////


//=========== 새 비밀번호 설정 하단 txt ===============
export let newPwdObj = {
    pwd : false,
    chkpwd : false
}

$('.re-pwd').keyup(function(){
    let pwd = this.value;
    let chkpwd = $('.re-chkpwd').val();
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
        txt.css('color','red');
        txt.html("영문, 숫자, 특수기호를 혼합하여 입력해 주세요.");
    }
    else{
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
        newPwdObj.pwd = true;
    }
    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
            newPwdObj.pwd = false;
            if(pwd == chkpwd){
                txt.css('color','green');
                txt.html("일치");
                newPwdObj.pwd = true;
            }
        }
    }
    newpwdEnable();
});

$('.re-chkpwd').keyup(function(){
    let chkpwd = this.value;
    let pwd = $('.re-pwd').val();
    let txt = $('.repwd-txt');

    newPwdObj.chkpwd = false;

    if(chkpwd == ""){
        txt.css('color','red');
        txt.html("비밀번호 확인란에 동일하게 입력해 주세요.");
        newPwdObj.chkpwd = false;
    }
    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd == chkpwd){
            txt.css('color','green');
            txt.html("일치");
            newPwdObj.chkpwd = true;
        }
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
            newPwdObj.chkpwd = false;
        }
    }
    newpwdEnable();

});

///============비밀번호 재설정 활성화 함수===============//
export function newpwdEnable(){
    let btn = document.getElementById("newpwd-btn");
    //console.log(newPwdObj)

    for(let key in newPwdObj){
        //console.log(newPwdObj[key])
        if(!newPwdObj[key]){
            //console.log(newPwdObj[key])
            btn.disabled = true;
            return;
        }
    }
    btn.disabled = false;
}
///////////////////////////////////////////////////////////////////////////

//=========== 내 정보 변경 하단 txt ===============
export let cgeInfoObj = {
    nick : true,
    chknick : true,
    pwd : true,
    chkpwd : true,
    info : true
}

//===== 닉네임 변경 =====
$('.cge-nick').keyup(function(){
    let nic = this.value;
    let txt = $('.cgenick-txt');
    
    // if(regNic.test(nic) == 0){
    //     $('.rncheck-btn').attr("disabled", true);
    // }
    if(nic == ""){
        txt.css('color','black');
        txt.html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
        cgeInfoObj.chknick = true;
    }else if(regKor6.test(nic)){
            txt.css('color','red');
            txt.html("한글을 올바르게 입력해 주세요.");
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
    }
   
    if(nic != ""){ // 닉네임 인풋이 공백이 아니면
        cgeInfoObj.chknick = false; // 정보수정활성화 조건에 중복확인버튼 조건 false 
        $('.rncheck-btn').attr("disabled", true);
    }
    if(regNic.test(nic) == 1){
        cgeInfoObj.nick = true;
        $('.rncheck-btn').attr("disabled", false);
    }
    if(regNic.test(nic) == 0){
        cgeInfoObj.nick = false;
        $('.rncheck-btn').attr("disabled", true);
    }
    if(nic == ""){
        cgeInfoObj.nick = true;
        cgeInfoObj.chknick = true;
        $('.rncheck-btn').attr("disabled", true);
    }
    
    //console.log(regNic.test(nic));
    cgeInfoEnable();
    //console.log(cgeInfoObj)
});

//===== 자기소개 textarea =====
$('.rself-info').keyup(function(){
    let selfInfo = this.value;
    let txt = $('#self-txt');

    if(selfInfo.length > 100){
        txt.css('color','red');
        txt.html("100자 초과.");
        cgeInfoObj.info = false;
    }else if(selfInfo.length >= 0 && selfInfo.length <100){
        cgeInfoObj.info = true;
    }
    else if(txt.val() == ""){
        txt.css('color','black');
        txt.html("100자 이내로 작성해 주세요.");
        cgeInfoObj.info = true;
    }else{
        txt.html("");
        cgeInfoObj.info = true;
    }
    cgeInfoEnable();
});

//=====  내정보 pw 변경 =======
$('.cge-pwd').keyup(function(){
    let pwd = this.value;
    let chkpwd = $('.cge-chkpwd').val();
    let txt = $('.cgepwd-txt');
    
    if(pwd == ""){
        txt.css('color','black');
        txt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
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
        txt.css('color','red');
        txt.html("영문, 숫자, 특수기호를 혼합하여 입력해 주세요.");
    }else{
        txt.css('color','green');
        txt.html("사용가능. 비밀번호 확인란에 동일하게 입력해 주세요.");
    }
    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
        }
        if(pwd == chkpwd){
            txt.css('color','green');
            txt.html("일치");
        }
    }

    if(pwd != ""){
        cgeInfoObj.pwd = false;
        if(regPwd.test(pwd) == 1){
            cgeInfoObj.pwd = true;
            if(chkpwd == "" || regPwd.test(chkpwd) == 0){
                cgeInfoObj.chkpwd = false;
            }
        }
        if(regPwd.test(pwd) == 0){
            cgeInfoObj.pwd = false;
        }
    }
    if(pwd == ""){
        cgeInfoObj.pwd = true;
        if(chkpwd != ""){
            cgeInfoObj.pwd = false;
        }
    }
    
    if(regPwd.test(pwd)==1 && regPwd.test(chkpwd)==1){
        if(pwd != chkpwd){
            cgeInfoObj.pwd = false;
        }else{
            cgeInfoObj.pwd = true;
        }
    }

    if(pwd == "" && chkpwd == ""){
        cgeInfoObj.pwd = true;
        cgeInfoObj.chkpwd = true;
    }

    cgeInfoEnable();
});

//=========내정보변경 pw확인 =============
$('.cge-chkpwd').keyup(function(){
    let chkpwd = this.value;
    let pwd = $('.cge-pwd').val();
    //cgeInfoObj.chkpwd = false;
    let txt = $('.cgepwd-txt');

    if(chkpwd == ""){
        txt.css('color','red');
        txt.html("비밀번호 확인란에 동일하게 입력해 주세요.");
    }
    if(regPwd.test(pwd) && regPwd.test(chkpwd)){
        if(pwd == chkpwd){
            txt.css('color','green');
            txt.html("일치");
        }
        if(pwd != chkpwd){
            txt.css('color','red');
            txt.html("입력한 비밀번호가 일치하지 않습니다.");
        }
    }

    if(chkpwd != ""){
        cgeInfoObj.chkpwd = false;
        if(regPwd.test(chkpwd) == 1){
            cgeInfoObj.chkpwd = true;
        }
        if(regPwd.test(chkpwd) == 0){
            cgeInfoObj.chkpwd = false;
        }
    }
    if(chkpwd == ""){
        cgeInfoObj.chkpwd = true;
        if(pwd != ""){
            cgeInfoObj.chkpwd = false;
        }
    }

    if(regPwd.test(pwd)==1 && regPwd.test(chkpwd)==1){
        if(pwd != chkpwd){
            cgeInfoObj.chkpwd = false;
        }
    }

    if(pwd == "" && chkpwd == ""){
        cgeInfoObj.pwd = true;
        cgeInfoObj.chkpwd = true;
    }

    cgeInfoEnable();
});

/////////* 내정보변경 닉네임 중복확인 여부 기능*////////////
$('.rncheck-btn').on("click", function(){
		
    let infoNick = $('input[name=cge-nick]').val();
    
    $.ajax({
        url : path + "/nickCheck.me",
        data : {enrollNick: infoNick},
        success: (result) => {
            
            if(result == "N"){ // 사용불가(존재하는 닉네임)
               // alert("이미 존재하는 닉네임입니다. 다시 입력해주세요.");

                 /*alert*/
                 document.getElementById("home-alert-text").innerHTML = "이미 존재하는 닉네임입니다.<br> 다시 입력해주세요.";
                 /*alert 창 띄우기*/
                 homeOpenAlert();


                $('.cge-nick').val(orgName);
                //$('input[name=cge-nick]').val("");
                $('input[name=cge-nick]').focus();
                $('.cgenick-txt').css('color', 'black');
                $('.cgenick-txt').html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
                cgeInfoObj.chknick = true;
                $('.rncheck-btn').attr("disabled", true); // 중복확인 버튼은 disabled
            }
            if(result == "Y"){ // 사용가능
                // confirm 창 (확인/취소)
                let useNick = confirm("사용가능한 닉네임입니다. 사용하시겠습니까?");
                
                if(useNick == 0){ // 취소버튼(flase 반환)
                    $('input[name=cge-nick]').val("");
                    $('input[name=cge-nick]').focus();
                    $('.cgenick-txt').css('color', 'black');
                    $('.cgenick-txt').html("영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능");
                }else{ // 확인버튼(true 반환)       
                    // readonly 속성 추가 (닉네임 다시 못바꾸게)
                    $('input[name=cge-nick]').prop('readonly', true);
                    $('input[name=cge-nick]').css('color','rgb(107, 107, 107)');
                    $('.cgenick-txt').html("사용가능.");
                }
                cgeInfoObj.chknick = true;
                $('.rncheck-btn').attr("disabled", true);
            }
            cgeInfoEnable();
        }
    })
});
///============ 내정보변경 정보수정버튼 활성화 함수===============//

// -활성화 조건
// 닉네임변경란에 입력값이 없을 때
// 비밀번호 변경란에 입력값이 없을 때
// 변경란에 값이 들어왔지망 => 유효성 검사 조건에 만족했을 때(닉네임)
// 변경란에 값이 들어왔지망 => 유효성 검사 조건에 만족했을 때(패스워드)
// 비밀번호확인 == 비밀번호 일치
// 닉네입 중복확인 버튼 체크 후(중복확인 버튼은 비활성화 처리)

// -비활성화 조건
// 닉네임, 비밀번호 변경란에 입력값이 생겼을 때(keyup순간에 정보수정버튼 비활성화)
// 유효성 검사 조건에 만족하지 않을 때

// => 이아래거는 객체가 true인지 false인지 반복문 통해서 검열하는 코드
// 그러니까 위에서 조건에 맞게 false랑 true 넣어야 함

// 정보수정버튼 활성화 함수
export function cgeInfoEnable(){
    let btn = document.getElementById("cge-btn");
    console.log(cgeInfoObj)

    for(let key in cgeInfoObj){
        console.log(cgeInfoObj[key])
        if(!cgeInfoObj[key]){
           console.log(cgeInfoObj[key])

            btn.disabled = true;
            return;
        }
    }
    btn.disabled = false;
}