package mz.buttonList.model.service;

import static mz.common.JDBCTemplate.close;
import static mz.common.JDBCTemplate.getConnection;

import java.sql.Connection;
import java.util.ArrayList;

import mz.buttonList.model.dao.bottonLisetDao;
import mz.buttonList.model.vo.FriendList;
import mz.member.model.vo.Member;


public class bottonListSevice {

	
	/**
	 * @return ArrayList<Member>
	 * 친구리스트 조회
	 */
	public ArrayList<Member> selectFriendList(String userId) {
		
		Connection conn = getConnection();
	
		ArrayList<Member> list =  new bottonLisetDao().selectFriendList(conn, userId);
		
		close(conn);
		
		return list;
		
	}

}
