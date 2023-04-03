package mz.member.model.service;

import java.sql.Connection;

import static mz.common.JDBCTemplate.*;

import mz.common.JDBCTemplate;
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

	// 유저 정보 불러오기 - 가영
	public Member selectMember(String userId) {
		
		Connection conn = getConnection();
		
		Member m = new MemberDao().selectMember(conn, userId);
		
		close(conn);
		
		return m;
	}
	
	// 가영 - 호감도 상태 불러오기
	public int selectHeart(String loginUser, String receiveId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().selectHeart(conn, loginUser, receiveId);
		
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
	
	// 가영 - 신고 정보 db 저장
	public int insertReport(String userId, String receiveId, String reportTitle, String reportContent) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().insertReport(conn, userId, receiveId, reportTitle, reportContent);
		
		if (result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	// 가영 - 호감도 db 저장
	public int insertHeart(String loginUser, String receiveId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().insertHeart(conn, loginUser, receiveId);
		
		if (result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	// 가영 - 친구 추가
	public int insertFriend(String loginUser, String friendId) {
			
		Connection conn = getConnection();
			
		int result = new MemberDao().insertFriend(conn, loginUser, friendId);
			
		if (result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}
		close(conn);
			
		return result;
	}
	
	
//------------------------------ delete 구간 -------------------------------
	
	// 가영 - 호감도 db 삭제
	public int deleteHeart(String loginUser, String receiveId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().deleteHeart(conn, loginUser, receiveId);
		
		close(conn);
		
		return result;
	}
	
	
	

}

