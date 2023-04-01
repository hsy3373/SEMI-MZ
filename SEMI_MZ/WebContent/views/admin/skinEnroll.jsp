<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link rel="stylesheet" href="<%=path%>/resource/css/admin/admin-common.css" />
    <link
      rel="stylesheet"
      href="<%=path%>/resource/css/admin/admin-character.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
  </head>
  <body>
    <div class="wrapper">
      <div class="side-bar">
        <ul class="side-bar-ul">
          <a href="./main.jsp" class="logo-img">
            <img src="<%=path%>/resource/img/icon/logo.png" />
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
          action="<%= request.getContextPath()%>/insert.skin"
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
              <input type="checkbox" name="reward" id="reward" value="Y" />
            </label>

            <button id="insert-btn">등록</button>
          </div>
          <hr />
          <div class="notice">※ 확장자가 'png'인 파일만 등록 가능합니다</div>
          <div class="img-wrapper">
            <div>
              <p>앞(fs)</p>
              <img
                id="char-img1"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>앞(fd)</p>
              <img
                id="char-img2"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>뒤(bs)</p>
              <img
                id="char-img3"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>뒤(bd)</p>
              <img
                id="char-img4"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
          </div>
          <div class="img-wrapper">
            <div>
              <p>좌(ls)</p>
              <img
                id="char-img5"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>좌(ld)</p>
              <img
                id="char-img6"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>우(rs)</p>
              <img
                id="char-img7"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
            <div>
              <p>우(rd)</p>
              <img
                id="char-img8"
                class="char-img"
                src="<%=path%>/resource/img/icon/logo.png"
                onerror="this.src='<%=path%>/resource/img/icon/logo.png'"
              />
            </div>
          </div>
          <div id="file-area">
            <input type="file" id="file1" name="file1" />
            <input type="file" id="file2" name="file2" />
            <input type="file" id="file3" name="file3" />
            <input type="file" id="file4" name="file4" />
            <input type="file" id="file5" name="file5" />
            <input type="file" id="file6" name="file6" />
            <input type="file" id="file7" name="file7" />
            <input type="file" id="file8" name="file8" />
          </div>
        </form>
      </div>
    </div>
    <div id="toast">알림</div>

    <script src="<%=path%>/resource/js/admin/character.js"></script>
  </body>
</html>
