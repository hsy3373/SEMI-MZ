package mz.member.model.service;

import java.sql.Connection;

import static mz.common.JDBCTemplate.*;
import mz.member.model.dao.MemberDao;
import mz.member.model.vo.Member;


public class MemberService {

		
//------------------------------ select 구간 -------------------------------
	//[han]
	public int userCount() {
		Connection conn = getConnection();
		
		int result = new MemberDao().userCount(conn);

		close(conn);
		
		return result;
	}


		
//------------------------------ insert 구간 -------------------------------
	
	// 김혜린
	// 회원가입
	public int insertMember(Member m) {
		
		Connection conn = JDBCTemplate.getConnection();
		
		int result = new MemberDao().insertMember(conn, m);
		
		if(result > 0) { // 회원가입 성공
			JDBCTemplate.commit(conn);
		}else { // 회원가입 실패
			JDBCTemplate.rollback(conn);
		}
		JDBCTemplate.close(conn);
		
		return result;
	}
	

}

