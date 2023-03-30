<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link rel="stylesheet" href="../../resource/css/admin/admin-common.css" />
    <link
      rel="stylesheet"
      href="../../resource/css/admin/admin-character.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
  </head>
  <body>
    <div class="wrapper">
      <div class="side-bar">
        <ul class="side-bar-ul">
          <a href="./main.jsp" class="logo-img">
            <img src="../../resource/img/icon/logo.png" />
          </a>

          <hr />
          <li>
            <a href="./main.jsp"><i class="bi bi-speedometer2"></i>Dashboard</a>
          </li>

          <hr />

          <li>
            <a href="">
              <i class="bi bi-key-fill"></i>
              Admin</a
            >
          </li>

          <li>
            <a href="./character.jsp" class="selected">
              <i class="bi bi-file-person"></i>
              캐릭터</a
            >
          </li>

          <li>
            <a href="">
              <i class="bi bi-people-fill"></i>
              사용자</a
            >
          </li>

          <li>
            <a href=""> <i class="bi bi-clipboard-fill"></i> 공지사항</a>
          </li>
        </ul>
      </div>

      <div class="content">
        <div class="head-text">캐릭터 스킨 등록</div>

        <form
          action="<%= request.getContextPath%>/insert.char"
          id="enroll-form"
          method="post"
          enctype="multipart/form-data"
        >
          <div class="back">
            <i class="bi bi-arrow-left-square"></i>
          </div>
          <div class="info-wrapper">
            <div>
              가격(코인) :
              <input type="number" name="price" id="price" value="300" />
            </div>

            <label>
              보상용(Y/N) :
              <input type="checkbox" name="reward" id="reward" />
            </label>

            <button id="insert-btn">등록</button>
          </div>
          <hr />
          <div class="img-wrapper">
            <div>
              <p>앞(fs)</p>
              <img
                id="char-img1"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>앞(fd)</p>
              <img
                id="char-img2"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>뒤(bs)</p>
              <img
                id="char-img3"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>뒤(bd)</p>
              <img
                id="char-img4"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
          </div>
          <div class="img-wrapper">
            <div>
              <p>좌(ls)</p>
              <img
                id="char-img5"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>좌(ld)</p>
              <img
                id="char-img6"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>우(rs)</p>
              <img
                id="char-img7"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>우(rd)</p>
              <img
                id="char-img8"
                class="char-img"
                src="../../resource/img/icon/logo.png"
                onerror="this.src='../../resource/img/icon/logo.png'"
              />
            </div>
          </div>
          <div id="file-area">
            <input type="file" id="file1" name="file1" required />
            <input type="file" id="file2" name="file2" required />
            <input type="file" id="file3" name="file3" required />
            <input type="file" id="file4" name="file4" required />
            <input type="file" id="file5" name="file5" required />
            <input type="file" id="file6" name="file6" required />
            <input type="file" id="file7" name="file7" required />
            <input type="file" id="file8" name="file8" required />
          </div>
        </form>
      </div>
    </div>
    <!-- 
    <script>
      function loadImg(inputFile, num) {
        // inputFile : 현재 변화가 생긴 input type="file" 요소
        // num : 몇번째 요소인지 확인 후 해당 영역에 미리보기 해주기 위한 변수

        console.dir(inputFile);
        // 선택된 요소의 세부 내용을 전부 콘솔창에 보여줌
        // input -> files 배열 -> 0번째 인덱스에 객체 형식으로 name : "", type: "",... 등으로 들어가있음
        console.log(inputFile.files[0]);

        console.log(inputFile.files.length);
        /*
      	파일 선택시 length = 1 , 파일 선택 취소시 배열안의 내용이 비어있게 된다
      	따라서 해당 값을 가지고 파일의 존재유무를 알 수 있다

      	files속성은 업로드 된 파일의 정보들을 "배열"형식으로 여러개 묶어서 반환, length는 그 배열의 크기를 의미

      	여기서는 멀티 속성을 주지 않아서 하나씩만 하는데 이후 여러개도 다룰 수 있음 - 좀 복잡한듯
      */

        if (inputFile.files.length != 0) {
          // 선택된 파일이 존재할 경우에 선택된 파일들을 읽어들여서 그 영역에 맞는 곳에 미리보기 추가

          // 파일을 읽어들일 FileReader 객체 생성
          let reader = new FileReader();

          // 파일을 읽어들이는 메소드 -> 어느 파일을 읽을지 매개변수에 제시해줘야함
          // 0번째 인덱스에 담긴 파일 정보를 제시
          // -> 해당 파일을 읽어들이는 순간 해당 파일만의 고유한 url부여됨
          // -> 해당 url을 src 속성값으로 제시
          reader.readAsDataURL(inputFile.files[0]);

          // 파일 읽기가 완료되었을 때 실행할 함수 정의
          reader.onload = function (e) {
            // e.target.result 에 고유한 url부여됨
            // 각 영역에 맞춰서 이미지 미리보기 기능 제시
            let url = e.target.result;
            console.log('???   ', url);

            switch (num) {
              case 1:
                $('#titleImg').attr('src', url);
                break;
              case 2:
                $('#contentImg1').attr('src', url);
                break;
              case 3:
                $('#contentImg2').attr('src', url);
                break;
              case 4:
                $('#contentImg3').attr('src', url);
                break;
            }
          };
        } else {
          // 선택된 파일이 없을 경우 미리보기도 함께 사라지게끔 작업
          switch (num) {
            case 1:
              $('#titleImg').removeAttr('src');
              break;
            case 2:
              $('#contentImg1').removeAttr('src');
              break;
            case 3:
              $('#contentImg2').removeAttr('src');
              break;
            case 4:
              $('#contentImg3').removeAttr('src');
              break;
          }
        }
      }
    </script> -->

    <script src="../../resource/js/admin/character.js"></script>
  </body>
</html>
