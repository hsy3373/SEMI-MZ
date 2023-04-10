/**
 * 메인 계정인증 API 용 스크립트
 * 작성자 : 김혜린
 */

//console.log("api용 스크립트");
import { getContextPath } from './common.js';
import * as Common from "./common.js";
import * as vali from "./validation.js";

let path = getContextPath();


$('#main-kakaobtn').on("click", function(){kakaoLogin("main")});
$('#find-kakaobtn').on("click", function(){kakaoLogin("find")});




Kakao.init('40c06f11b1aaaee13dc511ec238457b5');
//console.log(Kakao.isInitialized()); // sdk초기화여부판단

//카카오로그인 
function kakaoLogin(page) {
    Kakao.Auth.login({
    success: function (response) {
        Kakao.API.request({
        url: '/v2/user/me',
        success: function (response) {

            //console.log(response.id);
            Common.setCookie("key", response.id);
            //console.log("카카오로그인함수 : " + Common.getCookie("key"));
            checkKakao(response.id, page);

        },
        fail: function (error) {
            console.log(error)
        },
        })
    },
    fail: function (error) {
        console.log(error)
    },
    });
}
////////////////////////////////////////////////////


//     function onSignIn(googleUser) {
//          var profile = googleUser.getBasicProfile();
//         console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//         console.log('Name: ' + profile.getName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        
//         var id_token = googleUser.getAuthResponse().id_token;
//         console.log("id token : " + id_token);
        
//         checkGoogle(id_token);
// }
    //     var access_token = googleUser.getAuthResponse().access_token
	// $.ajax({
    // 	// people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
	// 	url: 'https://people.googleapis.com/v1/people/me'
    //     // key에 자신의 API 키를 넣습니다.
	// 	, data: {personFields:'birthdays', key:'AIzaSyBY00rL7q5I6X5qvZLvgDFSCrupiHcFkzE', 'access_token': access_token}
	// 	, method:'GET'
	// })
	// .done(function(e){
    //     //프로필을 가져온다.
	// 	var profile = googleUser.getBasicProfile();
	// 	console.log(profile)
    //     checkGoogle(access_token);
    //     console.log("google토큰 : "+access_token);
	// })
	// .fail(function(e){
	// 	console.log(e);
	// })

   

  //  }
  

/*
let checkGoogle = function(key){

     // 회원가입 모달 나갔다가 다시 들어왔을 때 모달 안의 내용들 리셋
     let userId = $("[name=enrollId]").val("");
     let nicName = $("[name=enrollNick]").val("");
     let userPwd = $(".enroll-pwd").val("");
     let chkPwd = $(".enroll-chkpwd").val("");
     let chkbox = $('#check-agree').prop("checked", false);
     let idtxt = $('.idcheck-txt');
     let nicktxt = $('.niccheck-txt');
     let pwdtxt = $('.pwd-txt');
     let enrollBtn = document.getElementById("enroll-btn");
 
      

    $.ajax({
        url : path + "/KeyCheck.me",
        method : 'post',
        data: {kind : 'google', key : key},
        dataType: 'text',
        success: (result) => {  //1,hyerin
            //console.log("ajax 통신 후 결과 값 db에 존재함? : " + result); // console 확인
            
            let words = result.split(',');
            //console.log(words[0]);
            //console.log(words[1]);

            let one = words[0];
            //let findId = words[1];
            

            if(one == "1") { // 키값이 DB에 존재함
                    // main page =>  광장으로 이동시키기 (로그인유저 정보는 서블릿에서 세션에 담음)
                    location.replace(path+"/views/square.jsp");
                
                // if(page == "find"){
                //     // 비밀번호 재설정 모달 열기(세션정보 서블릿에서 저장)
                //     $('.modal3').css('display', 'block');
                //     findIdTxt.html(findId);
                    
                //     // 비밀번호 재설정 모달 닫고 다시 열었을 때 내용 리셋
                //     newpwd; newchkpwd;
                //     newpwdtxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
                //     newpwdtxt.css('color', 'black');
                //     vali.newPwdObj.pwd = false;
                //     vali.newpwdEnable();
                // }
            }

            if(result == "6") { // (status != Y)인 경우
                alert("탈퇴 혹은 차단 된 계정입니다. 서비스 이용이 불가능합니다.");
                location.href = path;
            }

            if(result == "0") { //키 DB에 없음
                //if(page == "main"){
                    // 쿠키에 키 저장 => 회원가입
                    Common.setCookie("key" , key);
                    Common.setCookie("kind", "google");

                   //console.log("회원가입 쿠키에 키 담김? //" + Common.getCookie("key"));
                   //console.log("회원가입 쿠키에 키 종류 담김? //" + Common.getCookie("kind"));

                   // console.log(key + kind);
                    // 회원가입 모달 창 띄워지게 (회원가입 창에서 쿠키저장된 키값 활용)
                    alert("본인인증 완료. 회원가입이 필요합니다.");
                    $('.modal2').css('display', 'block');

                    // 회원가입 모달 나갔다가 다시 들어왔을 때 모달 안의 내용들 리셋
                    userId; nicName; userPwd; chkPwd; chkbox;
                    idtxt.html("영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능");
                    idtxt.css('color', 'black');
                    nicktxt.html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
                    nicktxt.css('color', 'black');
                    pwdtxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
                    pwdtxt.css('color', 'black');
                    $('input[name=enrollId]').prop('readonly', false);
                    $('input[name=enrollNick]').prop('readonly', false);
                    enrollBtn.disabled = true;

                // }else if(page == "find"){
                //     alert("해당 계정으로 존재하는 아이디가 없습니다.");
                // }
            }
        }
    })

}

*/

/*
// 비밀번호 재설정 모달 닫고 다시 열었을 때 내용 리셋
      let newpwd = $('.re-pwd').val("");
      let newchkpwd = $('.re-chkpwd').val("");
      let newpwdtxt = $('.repwd-txt');
 
      // 비밀번호 재설정에 보여지는 유저아이디
     // let userIdtxt = $('.findId-txt');
     let findIdTxt = $('.findId-txt');
*/



/////////////////////////////////////////////////////
// // 카카오 계정으로 존재하는 회원인지 확인하는 함수
 let checkKakao = function(key, page){

    // 회원가입 모달 나갔다가 다시 들어왔을 때 모달 안의 내용들 리셋
    let userId = $("[name=enrollId]").val("");
	let nicName = $("[name=enrollNick]").val("");
    let userPwd = $(".enroll-pwd").val("");
    let chkPwd = $(".enroll-chkpwd").val("");
    let chkbox = $('#check-agree').prop("checked", false);
    let idtxt = $('.idcheck-txt');
    let nicktxt = $('.niccheck-txt');
    let pwdtxt = $('.pwd-txt');
    let enrollBtn = document.getElementById("enroll-btn");

     // 비밀번호 재설정 모달 닫고 다시 열었을 때 내용 리셋
     let newpwd = $('.re-pwd').val("");
     let newchkpwd = $('.re-chkpwd').val("");
     let newpwdtxt = $('.repwd-txt');

     // 비밀번호 재설정에 보여지는 유저아이디
    // let userIdtxt = $('.findId-txt');
    let findIdTxt = $('.findId-txt');
    
    $.ajax({
        url : path + "/KeyCheck.me",
        method : 'post',
        data: {kind : 'kakao', key : key},
        dataType: 'text',
        success: (result) => {  //1,hyerin
            //console.log("ajax 통신 후 결과 값 db에 존재함? : " + result); // console 확인
            
            let words = result.split(',');
            //console.log(words[0]);
            //console.log(words[1]);

            let one = words[0];
            let findId = words[1];
            

            if(one == "1") { // 키값이 DB에 존재함
                if(page == "main"){
                    // main page =>  광장으로 이동시키기 (로그인유저 정보는 서블릿에서 세션에 담음)
                    location.replace(path+"/views/square.jsp");
                }
                if(page == "find"){
                    // 비밀번호 재설정 모달 열기(세션정보 서블릿에서 저장)
                    $('.modal3').css('display', 'block');
                    findIdTxt.html(findId);
                    
                    // 비밀번호 재설정 모달 닫고 다시 열었을 때 내용 리셋
                    newpwd; newchkpwd;
                    newpwdtxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
                    newpwdtxt.css('color', 'black');
                    vali.newPwdObj.pwd = false;
                    vali.newpwdEnable();
                }
            }

            if(result == "6") { // (status != Y)인 경우
                alert("탈퇴 혹은 차단 된 계정입니다. 서비스 이용이 불가능합니다.");
                location.href = path;
            }

            if(result == "0") { //키 DB에 없음
                if(page == "main"){
                    // 쿠키에 키 저장 => 회원가입
                    Common.setCookie("key" , key);
                    Common.setCookie("kind", "kakao");

                   //console.log("회원가입 쿠키에 키 담김? //" + Common.getCookie("key"));
                   //console.log("회원가입 쿠키에 키 종류 담김? //" + Common.getCookie("kind"));

                   // console.log(key + kind);
                    // 회원가입 모달 창 띄워지게 (회원가입 창에서 쿠키저장된 키값 활용)
                    alert("본인인증 완료. 회원가입이 필요합니다.");
                    $('.modal2').css('display', 'block');

                    // 회원가입 모달 나갔다가 다시 들어왔을 때 모달 안의 내용들 리셋
                    userId; nicName; userPwd; chkPwd; chkbox;
                    idtxt.html("영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능");
                    idtxt.css('color', 'black');
                    nicktxt.html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
                    nicktxt.css('color', 'black');
                    pwdtxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
                    pwdtxt.css('color', 'black');
                    $('input[name=enrollId]').prop('readonly', false);
                    $('input[name=enrollNick]').prop('readonly', false);
                    enrollBtn.disabled = true;

                }else if(page == "find"){
                    alert("해당 계정으로 존재하는 아이디가 없습니다.");
                }
            }
        }
    })
};


