package mz.board.model.service;

import static mz.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.ArrayList;

import mz.board.model.dao.BoardDao;
import mz.board.model.vo.Board;

public class BoardService {
	
	public ArrayList<Board> selectBoardList(){
		Connection conn = getConnection();
		
		ArrayList<Board> list = new BoardDao().selectBoardList(conn);
		
		close(conn);
		
		return list;
	}
	
	public Board boardDetail() {
		Connection conn = getConnection();
		
		Board b = new BoardDao().
	}
}





















