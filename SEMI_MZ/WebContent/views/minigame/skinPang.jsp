<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> 
<% String contextPath = request.getContextPath(); %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>M-Zone</title>
    <link rel="stylesheet" href="<%=contextPath %>/resource/css/game/skinPang.css" />
  </head>
  <body>
  
  <%@ include file="../chatting.jsp" %>
  
  
    <img class="back-btn" src="<%=contextPath %>/resource/img/icon/back2_btn" alt="" />
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
        <img src="<%=contextPath %>/resource/img/game/skinPang/skinPang-board.png" />
      </div>
      <div class="right-wrap">
        <div class="best-score">
          <div>내 최고 점수</div>
          <div>95</div>
          <img src="<%=contextPath %>/resource/img/login_img/구름4.png" alt="" />
        </div>
        <div class="ranking">
          <div>✨ 랭킹 ✨</div>
          <div class="rank-box">
            <div class="rank-item">
              1위
              <div class="rank-item-score">96점 [누구누구누구누구]</div>
            </div>
            <div class="rank-item">
              2위
              <div class="rank-item-score">96점 [누구누구누구누구]</div>
            </div>
            <div class="rank-item">
              3위
              <div class="rank-item-score">96점 [누구누구누구누구]</div>
            </div>
            <div class="rank-item">
              4위
              <div class="rank-item-score">96점 [누구누구누구누구]</div>
            </div>
            <div class="rank-item">
              5위
              <div class="rank-item-score">96점 [누구누구누구누구]</div>
            </div>
          </div>
          <img
            src="<%=contextPath %>/resource/img/game/skinPang/skinPang-board.png"
          />
        </div>
      </div>
    </div>
    

    
    <script type="module" src="<%=contextPath%>/resource/js/game/skinPang.js"></script>
  </body>
</html>
