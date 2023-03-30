/**
 * 메인 계정인증 API 용 스크립트
 * 작성자 : 김혜린
 */


/* 참고용 코드.. ㅎ ㅎ ㅎ
// 카카오로그인 스크립트
        
            Kakao.init('2cbf161eadf2b860fc5c71113e38ec12'); //발급받은 키 중 javascript키를 사용해준다.
            console.log(Kakao.isInitialized()); // sdk초기화여부판단
            //카카오로그인
            function kakaoLogin() {
                Kakao.Auth.login({
                success: function (response) {
                    Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (response) {
                        console.log(response)
                    },
                    fail: function (error) {
                        console.log(error)
                    },
                    })
                },
                fail: function (error) {
                    console.log(error)
                },
                })
            }
        

   // 네이버 스크립트 
        <script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>

       

            var naverLogin = new naver.LoginWithNaverId(
                    {
                        clientId: "AoXLANkB0ykozQKaSUNj", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
                        callbackUrl: "http://localhost:8085/growing/views/member/mainPage.jsp", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
                        isPopup: false,
                        callbackHandle: true
                    }
                );   

            naverLogin.init();

            window.addEventListener('load', function () {
                naverLogin.getLoginStatus(function (status) {
                    if (status) {
                        var email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.
                        // 이부분 수정해야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        
                        console.log(naverLogin.user); 
                        
                        if( email == undefined || email == null) {
                            alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
                            naverLogin.reprompt();
                            return;
                        }
                    } else {
                        console.log("callback 처리에 실패하였습니다.");
                    }
                });
            });


            var testPopUp;
            function openPopUp() {
                testPopUp= window.open("https://nid.naver.com/nidlogin.logout", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1");
            }
            function closePopUp(){
                testPopUp.close();
            }

        

            //처음 실행하는 함수
            function init() {
                gapi.load('auth2', function() {
                    gapi.auth2.init();
                    options = new gapi.auth2.SigninOptionsBuilder();
                    options.setPrompt('select_account');
                    // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
                    options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
                    // 인스턴스의 함수 호출 - element에 로그인 기능 추가
                    // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
                    gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
                })
            }
            
            function onSignIn(googleUser) {
                var access_token = googleUser.getAuthResponse().access_token
                $.ajax({
                    // people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
                    url: 'https://people.googleapis.com/v1/people/me'
                    // key에 자신의 API 키를 넣습니다.
                    , data: {personFields:'birthdays', key:'AIzaSyDDEQvcspx5BuggZOJ0k6XaYWEVyg2Oh3k', 'access_token': access_token}
                    , method:'GET'
                })
                .done(function(e){
                    //프로필을 가져온다.
                    var profile = googleUser.getBasicProfile();
                    console.log(profile)
                })
                .fail(function(e){
                    console.log(e);
                })
            }
            function onSignInFailure(t){      
                console.log(t);
            }
           
           //구글 api 사용을 위한 스크립트 
            <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>

*/
   