package mz.board.model.service;

import static mz.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.ArrayList;

import mz.board.model.dao.BoardDao;
import mz.board.model.vo.Board;

public class BoardService {
	
	/**
	 * @return ArrayList<Board>
	 * 방명록 리스트 조회
	 */
	public ArrayList<Board> selectBoardList(String loginId, String receive){
		Connection conn = getConnection();
		
		ArrayList<Board> list = new BoardDao().selectBoardList(conn, loginId, receive);
		
		close(conn);
		
		return list;
	}
	
	/**
	 * @param boardNo
	 * @return Board
	 * 방명록 상세 조회
	 */
	public Board selectBoard(int boardNo) {
		Connection conn = getConnection();
		
		Board b = new BoardDao().selectBoard(conn, boardNo);
		
		close(conn);
		
		return b;
	}

	/**
	 * @param boardNo
	 * @return Board
	 * 친구네룸 - 내가 쓴 방명록 상세 조회
	 */
	public Board selectSendBoard(int boardNo) {
		Connection conn = getConnection();
		Board b = new BoardDao().selectSendBoard(conn, boardNo);
		close(conn);
		return b;
	}
	
	/**
	 * @param b
	 * @return Board
	 * 친구네룸 - 내가 쓴 방명록 수정
	 */
	public Board updateBoard(Board b) {
		Connection conn = getConnection();
		
		int result = new BoardDao().updateBoard(conn, b);
		
		Board updateBoard = null;
		
		if(result > 0) {
			commit(conn);
			
			updateBoard = new BoardDao().selectSendBoard(conn, b.getBoardNo());
		}else {
			rollback(conn);
		}
		close(conn);
		
		return updateBoard;
	}
	
	/**
	 * @param b
	 * @return int
	 * 방명록 작성
	 */
	public int insertBoard(Board b) {
		Connection conn = getConnection();
		
		int result = new BoardDao().insertBoard(conn, b);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		return result;
		
	}
	
	/**
	 * @param boardNo
	 * @return int
	 * 내가 쓴 방명록 삭제
	 */
	public int deleteBoard(int boardNo) {
		Connection conn = getConnection();
		int result = new BoardDao().deleteBoard(conn, boardNo);
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		return result;
	}
}





















