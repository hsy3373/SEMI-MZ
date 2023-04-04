<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link rel="stylesheet" href="<%=path%>/resource/css/admin/admin-skin.css" />
  </head>
  <body>
    <div class="wrapper">
      <%@ include file="/views/admin/sideBar.jsp"%>

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

            <label for="reward">
              보상용(Y/N) :
              <input type="hidden" name="reward" value="N" />
              <input type="checkbox" name="reward" id="reward" value="Y" />
            </label>

            <button id="insert-btn">등록</button>
          </div>
          <hr />
          <div class="notice">※ 확장자가 'png'인 파일만 등록 가능합니다.(최대 10MB)</div>
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

	<script type="module" src="<%=path%>/resource/js/admin/skin/skinCommon.js"></script>
    <script type="module" src="<%=path%>/resource/js/admin/skin/skinEnroll.js"></script>
  </body>
</html>
