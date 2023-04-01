<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import="mz.member.model.vo.Member"%> 
<%
	String path = request.getContextPath();

%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>

    <link
      href="../resource/css/chatting.css"
      rel="stylesheet"
      type="text/css"
    />
    <link href="<%=path%>/resource/css/common.css" rel="stylesheet" type="text/css" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <style>
      body {
        background-image: url("<%=path%>/resource/img/background/background_main.png");
      }
    </style>
  </head>
  <body>
    <div>
      <button type="button" id="insert-room">룸 추가 test</button>
    </div>
    <div class="chat-container">
      <div class="left"></div>
      <div class="resizer" id="dragMe"></div>
      <div class="right">
        <div class="chat-room-container">
          <div class="selected-chat chat-all-user" id="chat-all-user">전체</div>
          <div class="chat-room-list">
            <div class="chat-room-item">
              <div class="room-name">일이삼사오육칠팔</div>
              <div class="delete-room">X</div>
            </div>
            <div class="chat-room-item">
              <div class="room-name"></div>
              <div class="delete-room">X</div>
            </div>
            <div class="chat-room-item">
              <div class="room-name"></div>
              <div class="delete-room">X</div>
            </div>
            <div class="chat-room-item">
              <div class="room-name"></div>
              <div class="delete-room">X</div>
            </div>
            <div class="chat-room-item">
              <div class="room-name"></div>
              <div class="delete-room">X</div>
            </div>
          </div>
          <div class="chat-arrow">
            <button id="chat-prev"><</button>
            <button id="chat-next">></button>
          </div>
        </div>
        <div class="chat-item-area">
          <!-- 로딩 바 -->
          <div class="loadingAni">
            <div class="loader10"></div>
          </div>
        </div>
      </div>
      <div class="div-send">
        <textarea
          type="text"
          name="content"
          id="text-send"
          rows="1"
          maxlength="50"
          placeholder="내용을 입력해 주세요(최대50자)"
        ></textarea>
        <button id="btn-send">보내기</button>
      </div>
    </div>


    <script type="module" src="<%=path%>/resource/js/common.js"></script>
    <script type="module" src="<%=path%>/resource/js/chat/chatData.js"></script>
    <script type="module" src="<%=path%>/resource/js/chat/chatFront.js"></script>
  </body>
</html>
