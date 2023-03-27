package mz.member.model.service;

import static mz.common.JDBCTemplate.*;

import java.sql.Connection;
import java.sql.SQLException;

import mz.common.JDBCTemplate;
import mz.member.model.dao.MemberDao;
import mz.member.model.vo.Member;

public class MemberService {
	
	public Member selectMember(String userId) {
		
		Connection conn = getConnection();
		
		Notice n = new NoticeDao().selectNotice(conn, nno);
		
		// DML 문이 아니기때문에 트랜젝션 처리 x
		close(conn);
		
		return n;
	}
}
