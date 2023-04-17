package mz.minigame.model.dao;

import static mz.common.JDBCTemplate.close;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.InvalidPropertiesFormatException;
import java.util.Properties;

import mz.minigame.model.vo.GameRank;
import mz.skin.model.vo.Skin;

public class GameRankDao {
	private Properties prop = new Properties();
	
	public GameRankDao() {
		String fileName = GameRankDao.class.getResource("/sql/minigame/minigame-mapper.xml").getPath();
		
		try {
			prop.loadFromXML(new FileInputStream(fileName));
		} catch (InvalidPropertiesFormatException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

//------------------------------ select 구간 -------------------------------
	
	//[han] 게임 랭킹 조회용
	public ArrayList<GameRank> selectRanking (Connection conn, String gameTitle, int range){
		ArrayList<GameRank> list = new ArrayList<>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectRanking");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, gameTitle);
			pstmt.setInt(2, range);

			rset = pstmt.executeQuery();
			
			while(rset.next()) {
				GameRank rank = new GameRank(rset.getString("USER_ID"),
												rset.getString("NICKNAME"),
												rset.getInt("GAME_SCORE"),
												rset.getInt("RANK")
											);
				list.add(rank);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
	//[han] 게임 본인 스코어 조회용
	public GameRank selectScore (Connection conn, String userId, String gameTitle){
		GameRank rank = null;
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectScore");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, gameTitle);
			pstmt.setString(2, userId);

			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				rank = new GameRank( rset.getInt("GAME_SCORE"),
									 rset.getInt("RANK")
									);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return rank;
	}
	
//------------------------------ insert 구간 -------------------------------
	
	//[han] 게임 스코어 등록용
	public int insertScore(Connection conn, String userId , String gameTitle, int score) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertScore");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setString(2, gameTitle);
			pstmt.setInt(3, score);

			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	
//------------------------------ update 구간 -------------------------------
	
	//[han] 게임 스코어 업데이트용
	public int updateScore(Connection conn, String userId , String gameTitle, int score) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateScore");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, score);
			pstmt.setString(2, userId);
			pstmt.setString(3, gameTitle);

			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	
}
