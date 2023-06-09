<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import="mz.member.model.vo.Member"%> 
<% 
	String path = request.getContextPath(); 
	String loginUser2 = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
	String loginUserNick = ((Member)request.getSession().getAttribute("loginUser")).getNicName();
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>

    <link
      href="<%=path%>/resource/css/chatting.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="<%=path%>/resource/css/common.css"
      rel="stylesheet"
      type="text/css"
    />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
<!--          <div>
      <button type="button" id="insert-room">룸 추가 friend</button>
    </div> -->
    <div class="chat-container">
      <div class="chat-content-container">
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

        <div class="loadingAni-container">
          <div class="loadingAni">
            <div class="loader10"></div>
          </div>
        </div>

        <div class="resizer" id="dragMe"></div>

        <div class="chat-item-area">
          <!-- 로딩 바 -->
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
    <script
      type="module"
      src="<%=path%>/resource/js/chat/chatFront.js"
    ></script>
    
    <script type="text/javascript">
    
    	let loginUser = '<%= loginUser2%>';
    	let loginUserNick = '<%= loginUserNick%>';
    	//console.log(loginUser, loginUserNick);
    	sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
    	sessionStorage.setItem("loginUserNick", JSON.stringify(loginUserNick));
    </script>
  </body>
</html>
