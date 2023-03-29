package mz.board.model.dao;

import static mz.common.JDBCTemplate.close;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.InvalidPropertiesFormatException;
import java.util.Properties;

import mz.board.model.vo.Board;

public class BoardDao {

	Properties prop = new Properties();
	public BoardDao() {
		try {
			prop.loadFromXML(new FileInputStream(BoardDao.class.getResource("/sql/board/board-mapper.xml").getPath()));
		} catch (InvalidPropertiesFormatException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * @param conn
	 * @return ArrayList<Board>
	 * 방명록 리스트 조회
	 */
	public ArrayList<Board> selectBoardList(Connection conn, String loginId, String receive){
		
		ArrayList<Board> list = new ArrayList<>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectBoardList");
		
		// String형은 heap 영역에 주소값으로 저장되므로 == x
		if(loginId.equals(receive)) {
			sql = sql.replace("USER_ID = ? AND ", "");
		}
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			// 현재 로그인한 아이디가 받은 방명록들 조회
			if(loginId.equals(receive)) {
				pstmt.setString(1, loginId);
			} else {
				// 현재 로그인한 아이디와 방주인 아이디라면 자기가 쓴 글만 조회
				pstmt.setString(1, loginId);
				pstmt.setString(2, receive);
			}
			
			rset = pstmt.executeQuery();
			
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			while(rset.next()) {
				
				Board b = new Board(rset.getInt("BOARD_NO"),
						rset.getString("USER_ID"),
						rset.getString("RECEIVE_ID"),
						rset.getString("BOARD_TITLE"),
						df.format(rset.getDate("CREATE_DATE")));
				list.add(b);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return list;

	}
	
	/**
	 * @param conn
	 * @param boardNo
	 * @return Board
	 * 방명록 상세 조회
	 */
	public Board selectBoard(Connection conn, int boardNo) {
		
		Board b = null;
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectBoard");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, boardNo);
			
			rset = pstmt.executeQuery();
			
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			
            if(rset.next()) {            	
            	b = new Board(rset.getInt("BOARD_NO"),
            			rset.getString("USER_ID"),
            			rset.getString("RECEIVE_ID"),
            			rset.getString("BOARD_TITLE"),
            			rset.getString("BOARD_CONTENT"),
            			rset.getString("SECRET"),
            			df.format(rset.getDate("CREATE_DATE"))
            			);
            }
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return b;
		
	}
	
	/**
	 * @param conn
	 * @param userId
	 * @return ArrayList<Board>
	 * 친구네룸 - 내가 쓴 방명록 리스트 조회
	 */
	public ArrayList<Board> selectSendBoardList(Connection conn, String userId){
		ArrayList<Board> list = new ArrayList<>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectSendBoardList");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			
			rset = pstmt.executeQuery();
			
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			
			while(rset.next()) {
				Board b = new Board();
				b.setBoardNo(rset.getInt("BOARD_NO"));
				b.setBoardTitle(rset.getString("BOARD_TITLE"));
				b.setCreateDate(df.format(rset.getDate("CREATE_DATE")));
				
				list.add(b);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
	/**
	 * @param conn
	 * @param boardNo
	 * @return Board
	 * 친구네룸 - 내가 쓴 방명록 상세 조회
	 */
	public Board selectSendBoard(Connection conn, int boardNo) {
		Board b = new Board();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectSendBoard");
		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setInt(1, boardNo);
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				b.setBoardNo(rset.getInt("BOARD_NO"));
				b.setBoardTitle(rset.getString("BOARD_TITLE"));
				b.setBoardContent(rset.getString("BOARD_CONTENT"));
				b.setSecret(rset.getString("SECRET"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return b;
	}
}

















