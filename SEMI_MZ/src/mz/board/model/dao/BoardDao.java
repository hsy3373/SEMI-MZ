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
	public ArrayList<Board> selectBoardList(Connection conn){
		
		ArrayList<Board> list = new ArrayList<>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectBoardList");
		try {
			pstmt = conn.prepareStatement(sql);
			
			rset = pstmt.executeQuery();
			
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");  
			
			while(rset.next()) {
				Board b = new Board(rset.getInt("BOARD_NO"),
									rset.getString("USER_ID"),
									rset.getString("BOARD_TITLE"),
									df.format(rset.getDate("CREATE_DATE")));
				list.add(b);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
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
}

















