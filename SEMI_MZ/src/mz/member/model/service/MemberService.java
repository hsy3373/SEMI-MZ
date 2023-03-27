package mz.member.model.service;

import static mz.common.JDBCTemplate.*;

import java.sql.Connection;
import java.sql.SQLException;

import mz.common.JDBCTemplate;
import mz.member.model.dao.MemberDao;
import mz.member.model.vo.Member;

public class MemberService {
	
	public Member selectMember(String userId, String nickName, int skinId, String gender, String info) {
		
		Connection conn = getConnection();
		
		Member m = new MemberDao().selectMember(conn, userId, nickName, skinId, gender, info);
		
		close(conn);
		
		return m;
	}
}
