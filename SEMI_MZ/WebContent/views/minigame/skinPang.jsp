<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" import = "java.util.ArrayList, mz.minigame.model.vo.GameRank"%> 
<% 
	String contextPath = request.getContextPath(); 
	ArrayList<GameRank> list = (ArrayList<GameRank>) request.getAttribute("list");
	GameRank myRank = (GameRank) request.getAttribute("myRank");
	

%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>M-Zone</title>
    <link rel="stylesheet" href="<%=contextPath %>/resource/css/minigame/skinPang.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
  
  <%@ include file="../chatting.jsp" %>
  
  
    <img class="back-btn" src="<%=contextPath %>/resource/img/icon/back2_btn.png" alt="" />
    <div class="Tetris_wrap">
      <div class="score-box">
        <img src="<%=contextPath %>/resource/img/login_img/구름2.png" alt="" />

        <div>현재 점수</div>
        <div class="score">0</div>
      </div>
      <div class="tetris_board">
        <div class="game-title-wrap">
          <div>스킨 팡!</div>
        </div>
        <div class="gameEnd">
          <div class="end_inner">
            <h2>Game Over</h2>
            <h3 class="end-score"></h3>
            <button class="restartBtn">다시하기</button>
          </div>
        </div>
        <div class="gameStart">
          <div class="start_inner">
            <button href="#" class="startBtn"></button>
            <div class="b1"><span>시</span></div>
            <div class="b2"><span>작</span></div>
            <div class="b3"><span>하</span></div>
            <div class="b4"><span>기</span></div>
          </div>
        </div>
        <ul></ul>
        <img src="<%=contextPath %>/resource/img/minigame/skinPang/skinPang-board.png" />
      </div>
      <div class="right-wrap">
        <div class="best-score">
          <div>내 최고 점수</div>
          <div>
	          <%if (myRank != null){ %>
	          	<%= myRank.getRank()%>위 <%= myRank.getGameScore() %>점
	          <% } %>
          </div>
          <img src="<%=contextPath %>/resource/img/login_img/구름4.png" alt="" />
        </div>
        <div class="ranking">
          <div>✨ 랭킹 ✨</div>
          <div class="rank-box">
	          <%if (list != null){ %>
	          	<% for(int i=0; i<list.size(); i++) { %>
		            <div class="rank-item">
		              <%= list.get(i).getRank() %>위
		              <div class="rank-item-score"><%=list.get(i).getGameScore() %>점 [ <%=list.get(i).getNicName() %> ]</div>
		            </div>
	          	<% } %>
	          <% } %>
        </div>
        <img
            src="<%=contextPath %>/resource/img/minigame/skinPang/skinPang-board.png"
          />
      </div>
    </div>

    
    <script type="module" src="<%=contextPath%>/resource/js/minigame/skinPang.js"></script>
  </body>
</html>
