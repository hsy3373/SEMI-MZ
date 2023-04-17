package mz.minigame.model.service;


import static mz.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.ArrayList;

import mz.minigame.model.dao.GameRankDao;
import mz.minigame.model.vo.GameRank;

public class GameRankService {
	
//------------------------------ select 구간 -------------------------------
	
	//[han] 게임 랭킹 조회용
	public ArrayList<GameRank> selectRanking (String gameTitle, int range){
		
		Connection conn = getConnection();
		ArrayList<GameRank> list = new GameRankDao().selectRanking(conn, gameTitle, range);
		
		close(conn);
		
		return list;
	}

	//[han] 게임 본인 스코어 조회용
	public GameRank selectScore ( String userId, String gameTitle){
		Connection conn = getConnection();
		
		GameRank myScore = new GameRankDao().selectScore(conn, userId, gameTitle);
		
		close(conn);
		
		return myScore;
	}
	
//------------------------------ insert 구간 -------------------------------
	
	//[han] 게임 스코어 등록용
	public int addScore( String userId , String gameTitle, int score) {
		int result = 0;
		Connection conn = getConnection();
		GameRank myScore =  new GameRankDao().selectScore(conn, userId, gameTitle);
		
		//만약 본인 스코어가 조회되지 않았다면 == 스코어가 등록된 적이 없음
		if(myScore == null) {
			// 새로 스코어를 insert
			result = new GameRankDao().insertScore(conn, userId, gameTitle, score);
			if(result>0) {
				commit(conn);
			}else {
				rollback(conn);
			}
		}else {
			// 이전에 등록된 스코어가 있다면 
			// 이전 스코어보다 현재 스코어가 높을경우 내용 갈아껴줌 == 업데이트
			
			// 스코어가 낮아서 갈아껴지지 않아도 일단 성공으로 처리하기 위해 result값 세팅
			result = 1;
			
			if(myScore.getGameScore() < score) {
				result = new GameRankDao().updateScore(conn, userId, gameTitle, score);
				if(result > 0) {
					commit(conn);
				}else {
					rollback(conn);
				}
			}
		}
		
		close(conn);
		
		return result;
	}
	
	
}








