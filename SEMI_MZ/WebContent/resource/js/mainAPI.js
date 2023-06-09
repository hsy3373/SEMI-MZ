/**
 * 메인 계정인증 API 용 스크립트
 * 작성자 : 김혜린
 */

//console.log("api용 스크립트");
import { getContextPath } from './common.js';
import * as Common from "./common.js";
import * as vali from "./validation.js";
import { homeOpenAlert } from "./homeAlert.js";

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
            // page: main(계정로그인,회원가입) // page: find(아이디,패스워드 찾기)
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

// 카카오 계정으로 존재하는 회원인지 확인하는 함수
 let checkKakao = function(key, page){

    // 회원가입 모달 x버튼 클릭 후 다시 들어왔을 때 모달 안의 내용들 리셋 시 사용
    let userId = $("[name=enrollId]").val("");
	let nicName = $("[name=enrollNick]").val("");
    let userPwd = $(".enroll-pwd").val("");
    let chkPwd = $(".enroll-chkpwd").val("");
    let chkbox = $('#check-agree').prop("checked", false);
    let idtxt = $('.idcheck-txt');
    let nicktxt = $('.niccheck-txt');
    let pwdtxt = $('.pwd-txt');
    let enrollBtn = document.getElementById("enroll-btn");

    // 비밀번호 재설정 모달 닫고 다시 열었을 때 내용 리셋 시 사용
    let newpwd = $('.re-pwd').val("");
    let newchkpwd = $('.re-chkpwd').val("");
    let newpwdtxt = $('.repwd-txt');

    // 비밀번호 재설정에 보여지는 유저아이디
    let findIdTxt = $('.findId-txt');
    
    // 계정 인증 후 API키 DB에 존재하는 지 확인 후 처리
    $.ajax({
        url : path + "/KeyCheck.me",
        method : 'post',
        data: {kind : 'kakao', key : key},
        dataType: 'text',
        success: (result) => {  // ex) 1,hyerin(아이디)
            //console.log("ajax 통신 후 결과 값 db에 존재함? : " + result); // console 확인
            
            let words = result.split(',');
            //console.log(words[0]);
            //console.log(words[1]);

            let num = words[0]; // 숫자에 따라 다르게 처리
            let findId = words[1];  // 비밀번호 재설정에 띄울 유저아이디

            if(num == "1") { // 키값이 DB에 존재함 // 1: status(Y) 일반 유저
                if(page == "main"){
                    //메인 =>  광장으로 이동시키기 (로그인유저 정보는 백단 컨트롤러에서 세션에 담음)
                    location.href = path+"/forwarding.sq";
                }
                if(page == "find"){
                    // 비밀번호 재설정 모달 열기(세션정보 서블릿에서 저장)
                    $('.modal3').css('display', 'block');
                    findIdTxt.html(findId);
                    
                    // 비밀번호 재설정 모달 닫고 다시 열었을 때 내용 리셋
                    newpwd; newchkpwd;
                    newpwdtxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
                    newpwdtxt.css('color', 'black');
                    vali.newPwdObj.pwd = false; // 버튼 비활성화 조건 초기화
                    //console.log("비밀번호재설정 : " + vali.newPwdObj.pwd);
                    vali.newpwdEnable(); // 패스워드 변경 버튼 활성화 조건 함수
                }
            }
            if(num == "2"){ // 2 : status(N) 탈퇴계정 처리
                if(page == "main"){
                    /*alert*/
                    document.getElementById("home-alert-text").innerHTML = "회원탈퇴가 해제 되었습니다. ";
                    /*alert 창 띄우기*/
                    homeOpenAlert3(); // alert창 닫을 때 페이지 이동 있어서 별도로 함수 처리
                }
                if(page == "find"){
                    // 비밀번호 재설정 모달 열기(세션정보 서블릿에서 저장)
                    $('.modal3').css('display', 'block');
                    findIdTxt.html(findId);
                    
                    // 비밀번호 재설정 모달 닫고 다시 열었을 때 내용 리셋
                    newpwd; newchkpwd;
                    newpwdtxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
                    newpwdtxt.css('color', 'black');
                    vali.newPwdObj.pwd = false; // 버튼 비활성화 조건 초기화
                    //console.log("비밀번호재설정 : " + vali.newPwdObj.pwd);
                    vali.newpwdEnable(); // 패스워드 변경 버튼 활성화 조건 함수
                }
            }
            if(result == "6") { // 6: status(X) 차단계정 처리
                /*alert*/
                document.getElementById("home-alert-text").innerHTML = "탈퇴 된 계정입니다.<br> 서비스 이용이 불가능합니다.";
                /*alert 창 띄우기*/
                homeOpenAlert();

                location.href = path;
            }

            if(result == "0") { // 0: DB에 API키 존재하지 않음
                if(page == "main"){ 
                    // 쿠키에 키 저장 => 회원가입
                    Common.setCookie("key" , key);
                    Common.setCookie("kind", "kakao");

                    /*alert*/
                    document.getElementById("home-alert-text").innerHTML = "본인인증 완료.<br> 회원가입이 필요합니다.";
                    /*alert 창 띄우기*/
                    homeOpenAlert();

                    $('.modal2').css('display', 'block');

                    // 회원가입 모달 나갔다가 다시 들어왔을 때 모달 처음 상태로 리셋
                    userId; nicName; userPwd; chkPwd; chkbox;
                    idtxt.html("영문, 숫자, 특수기호(_) 사용하여 5~20자 공백없이 가능");
                    idtxt.css('color', 'black');
                    nicktxt.html("영문, 한글, 숫자, 특수기호(_) 사용하여 2~8자까지 공백없이 가능");
                    nicktxt.css('color', 'black');
                    pwdtxt.html("영문, 숫자, 특수기호 포함 8~16자 입력 가능");
                    pwdtxt.css('color', 'black');
                    $('input[name=enrollId]').prop('readonly', false);
                    $('input[name=enrollNick]').prop('readonly', false);

                    // 중복확인 버튼들 비활성화 처리 disabled = true 및 활성화버튼 조건 초기화
                    $('.ncheck-btn').attr('disabled', 'true');
                    vali.validateObj.id = false;
                    vali.validateObj.chkid = false;
                    vali.validateObj.nick = false;
                    vali.validateObj.chknick = false;
                    vali.validateObj.chkpwd = false;
                    vali.validateObj.pwd = false;
                    vali.validateObj.agree = false;
                    vali.enabledSubmit();
                    enrollBtn.disabled = true;

                }else if(page == "find"){
                    /*alert*/
                    document.getElementById("home-alert-text").innerHTML = "해당 계정으로 존재하는 아이디가 없습니다.";
                    /*alert 창 띄우기*/
                    homeOpenAlert();
                }
            }
        }
    })
};

function pathSquare(){  // alert확인 버튼 클릭 :  광장페이지로 이동 시 사용 
    location.href = path+"/forwarding.sq";
}

function homeOpenAlert3() {
    // alert과 오버레이 찾기
    let alert = document.querySelector(".home-alert");
    let alertOverlay = document.querySelector(".home-alert-overlay");
    // alert 및 오버레이 표시
    alert.style.display = "block";
    alertOverlay.style.display = "block";
  
    let okBtn = alert.querySelector(".home-alert-ok");
  
    okBtn.addEventListener("click",  pathSquare);
  }