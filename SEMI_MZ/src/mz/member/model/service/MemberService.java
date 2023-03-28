package mz.member.model.service;

import static mz.common.JDBCTemplate.getConnection;

import java.sql.Connection;

import mz.member.model.dao.MemberDao;

public class MemberService {

//------------------------------ select 구간 -------------------------------
	//[han]
	public int userCount() {
		Connection conn = getConnection();
		
		int result = new MemberDao().userCount(conn);
		
		return result;
	}
}
