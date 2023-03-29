package mz.member.model.service;

import java.sql.Connection;
import java.sql.SQLException;

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
	
	// [김혜린]
		// 로그인
		public Member loginMember(String userId, String userPwd) {
			Connection conn = getConnection();
			
			Member m = new MemberDao().loginMember(conn, userId, userPwd);
			
			try {
				close(conn);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return m;
		}

		
//------------------------------ insert 구간 -------------------------------
	
	// [김혜린]
	// 회원가입
	public int insertMember(Member m) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().insertMember(conn, m);
		
		if(result > 0) { // 회원가입 성공
			commit(conn);
		}else { // 회원가입 실패
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	

}

