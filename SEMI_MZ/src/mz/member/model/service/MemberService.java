package mz.member.model.service;

import java.sql.Connection;
import java.sql.SQLException;

import static mz.common.JDBCTemplate.*;

import mz.common.JDBCTemplate;
import mz.member.model.dao.MemberDao;
import mz.member.model.vo.Member;
import mz.member.model.vo.loginAPI;


public class MemberService {

	
		
//------------------------------ select 구간 -------------------------------
	//[han]
	public int userCount() {
		Connection conn = getConnection();
		
		int result = new MemberDao().userCount(conn);
		
		close(conn);
		
		return result;
	}

	// 유저 정보 불러오기 - 가영
	public Member selectMember(String userId) {
		
		Connection conn = getConnection();
		
		Member m = new MemberDao().selectMember(conn, userId);
		
		close(conn);
		
		return m;
	}
		
//------------------------------ insert 구간 -------------------------------
	
	// [김혜린]
	public Member loginMember(String userId, String userPwd) {
		Connection conn = getConnection();
		
		Member m = new MemberDao().loginMember(conn, userId, userPwd);
		
		close(conn);
		//System.out.println("서비스 m : " + m);
		return m;
	}

	// [김혜린]
	public Member checkKey(String apiKind, String apiKey) {
		Connection conn = getConnection();
		
		Member m = new MemberDao().checkKey(conn, apiKind, apiKey);
		
		close(conn);
		System.out.println("서비스에 담겼니?" + m); // console용
		return m;
	}
		
	// [김혜린]
	public int checkId(String userId) {
		Connection conn = getConnection();
		
		int result = new MemberDao().checkId(conn, userId);
		
		close(conn);
		
		return result;
	}
	
	// [김혜린]
	public int checkNick(String nicName) {
		Connection conn = getConnection();
		
		int result = new MemberDao().checkNick(conn, nicName);
		
		close(conn);
		
		return result;
	}
		
		
		
		
//------------------------------ insert 구간 -------------------------------
	
	// [김혜린]
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
	
	// [김혜린]
		public int insertKey(loginAPI a) {
			
			Connection conn = getConnection();
			
			int result = new MemberDao().insertKey(conn, a);
			
			if(result > 0) { // API테이블에 추가 성공
				commit(conn);
			}else { // API테이블에 추가 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("서비스 result : " + result); // cosole용
			return result;
		}
	
	
	
	
	
	

}

