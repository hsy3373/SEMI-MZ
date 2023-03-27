/**
 * 유효성검사 스크립트
 * 작성자 : 김혜린
 */
// function enrollcheck(){
     let regId = /^\w{5,20}$/;
//     let regNickname = /^[ㄱ-ㅎㅏ-ㅣ가-힣\w]{2,8}$/;
//     let regPwd = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;

//     // 아이디


// }    
$('#enroll-id').blur(function(){

    let id = $('#enroll-id').val();
    let txt = $('#idcheck-txt');

    
    if(id.length < 5 || id.length > 20 ) {
        txt.html("5~20자 이내로 입력해 주세요.");
    }
});


// $('#enroll-id').keyup(function(){
//     if($('#enroll-id').val().length > 0 ||)
// });











/* 회원가입 */
// $(function(){
//     $('#enroll-id').blur(function(){
//         let userId = $(this).val();






//     });



// }) /* $function 전체괄호끝 */