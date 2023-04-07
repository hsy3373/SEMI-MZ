package mz.member.model.service;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

import static mz.common.JDBCTemplate.*;

import mz.common.JDBCTemplate;
import mz.member.model.dao.MemberDao;
import mz.member.model.vo.Member;
import mz.member.model.vo.loginAPI;


public class MemberService {

	
		
//------------------------------ select 구간 -------------------------------
	//[han]
	public int memberCount( String status, String api) {
		Connection conn = getConnection();
		
		int result = new MemberDao().memberCount(conn, status, api);
		
		close(conn);
		
		return result;
	}
	
	// [han]
	public ArrayList<Member> selectMemberList(String status, String api, String sort, int page) {
		Connection conn = getConnection();

		ArrayList<Member> list = new MemberDao().selectMemberList(conn, status, api, sort, page);

		close(conn);

		return list;
	}
	
	//[han]
	public ArrayList<Member> searchMembers(String option, String keyword){
		
		Connection conn = getConnection();

		ArrayList<Member> list = new MemberDao().searchMembers(conn, option, keyword);

		close(conn);

		return list;
		
	}
	
	//[han]
	public Member selectMemberAllInfo(String userId) {
		Connection conn = getConnection();

		Member m = new MemberDao().selectMemberAllInfo(conn, userId);

		close(conn);

		return m;
	}

	// 유저 정보 불러오기 - 가영
	public Member selectMember(String userId) {
		
		Connection conn = getConnection();
		
		Member m = new MemberDao().selectMember(conn, userId);
		
		close(conn);
		
		return m;
	}
	
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
		//System.out.println("서비스에 담겼니?" + m); // console용
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
	
	// 가영 - 호감도 상태 불러오기
	public int selectHeart(String loginUser, String receiveId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().selectHeart(conn, loginUser, receiveId);
		
		close(conn);
		
		return result;
	}
	
	// 가영 - 친구 정보
		public int selectFriend(String loginUser, String friendId) {
			
			Connection conn = getConnection();
			
			int result = new MemberDao().selectFriend(conn, loginUser, friendId);
			
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
			//System.out.println("서비스 result : " + result); // cosole용
			return result;
		}
		
	// [김혜린]	
		public int insertCharacter(String userId) {
			
			Connection conn = getConnection();
			
			int result = new MemberDao().insertCharacter(conn, userId);
			System.out.println("서비스에서 디에이오에 보낸 결과 담겼?" + result + userId);
			if(result > 0) { // CHARACTER 테이블에 추가 성공
				commit(conn);
			}else { // CHARACTER 테이블에 추가 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("서비스 캐릭터테이블 결과 : " + result);
			return result;
		}
		
	// [김혜린]
		public void insertDltMember(String userId, String status) {
			System.out.println("멤버서비스 / DISABLED_MEMBER 테이블 행추가 실행??");//console
			Connection conn = getConnection();
			
			int result = new MemberDao().insertDltMember(conn, userId, status);
			
			if(result > 0) { //DISABLED_MEMBER 테이블 insert 성공
				commit(conn);
			}else{ //DISABLED_MEMBER 테이블 insert 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 DISABLED_MEMBER 테이블 행추가 결과:" + result); //console확인
		}
		
		
		
		
		
//------------------------------ update 구간 -------------------------------
	// [김혜린]
		public Member updatePwd(String userPwd, String userId) {
			//System.out.println("멤버서비스 updatePwd 실행");
			Connection conn = getConnection();
			
			int result = new MemberDao().updatePwd(conn, userPwd, userId);
			
			Member m = null;
			
			if(result > 0) { // update성공
				commit(conn);
				m = new MemberDao().loginMember(conn, userId, userPwd);
			}else { // update실패
				rollback(conn);
			}
			close(conn);
			//System.out.println("서비스 updatePwd result : " + result);
			return m;
		}
	// [김혜린]
		public int updateStatus(String userId, String status) {
			System.out.println("멤버서비스 / updateStatus 실행??"); //console
			Connection conn = getConnection();
			
			int result = new MemberDao().updateStatus(conn, userId, status);
			
			if(result > 0) { //Member테이블 status: update 성공
				commit(conn);
			}else { //Member테이블 status: update 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 / updateStatus 실행결과 : " + result); //console
			return result;
		}
	// [김혜린]	
		public Member updateMember(String nickName, String userPwd, String info, String gender, String userId) {
			System.out.println("멤버서비스 / updateMember 실행"); //console
			Connection conn = getConnection();
			
			int result = new MemberDao().updateMember(conn, nickName, userPwd, info, gender, userId);
			
			Member m = null;
			
			if(result > 0) { //Member테이블 update 성공
				commit(conn);
				m = new MemberDao().selectLoginUser(conn, userId);
			}else { //Member테이블 update 실패
				rollback(conn);
			}
			close(conn);
			
			System.out.println("멤버서비스 / updateMember 실행결과 : " + result);//console
			System.out.println("멤버서비스 / updateMember m 객체: " + m); //console
			return m;
		}
		
//------------------------------ delete 구간 -------------------------------
	// [김혜린]	
		public void dltMemBoard(String userId) {
			System.out.println("멤버서비스 / dltMemBoard 실행??"); //console
			
			Connection conn = getConnection();
			
			int result = new MemberDao().dltMemBoard(conn, userId);
			
			if(result > 0) { // 행 delete 성공
				commit(conn);
			}else { // 행 delete 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 / dltMemBoard 실행 결과 : "+ result); //console			
		}
		
		public void dltMemChatting(String userId) {
			System.out.println("멤버서비스 / dltMemChatting 실행??"); //console
			
			Connection conn = getConnection();
			
			int result = new MemberDao().dltMemChatting(conn, userId);
			
			if(result > 0) { // 행 delete 성공
				commit(conn);
			}else { // 행 delete 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 / dltMemChatting 실행 결과 : "+ result); //console			
		}
		
		public void dltMemHeart(String userId) {
			System.out.println("멤버서비스 / dltMemHeart 실행??"); //console
			
			Connection conn = getConnection();
			
			int result = new MemberDao().dltMemHeart(conn, userId);
			
			if(result > 0) { // 행 delete 성공
				commit(conn);
			}else { // 행 delete 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 / dltMemHeart 실행 결과 : "+ result); //console
		}
		
		public void dltMemCharacter(String userId) {
			System.out.println("멤버서비스 / dltMemCharacter 실행??"); //console
			
			Connection conn = getConnection();
			
			int result = new MemberDao().dltMemCharacter(conn, userId);
			
			if(result > 0) { // 행 delete 성공
				commit(conn);
			}else { // 행 delete 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 / dltMemCharacter 실행 결과 : "+ result); //console
		}
		
		public void dltMemFriend(String userId) {
			System.out.println("멤버서비스 / dltMemFriend 실행??"); //console
			
			Connection conn = getConnection();
			
			int result = new MemberDao().dltMemFriend(conn, userId);
			
			if(result > 0) { // 행 delete 성공
				commit(conn);
			}else { // 행 delete 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 / dltMemFriend 실행 결과 : "+ result); //console
		}
		
		public void dltMemApi(String userId) {
			System.out.println("멤버서비스 / dltMemApi 실행??"); //console
			
			Connection conn = getConnection();
			
			int result = new MemberDao().dltMemApi(conn, userId);
			
			if(result > 0) { // 행 delete 성공
				commit(conn);
			}else { // 행 delete 실패
				rollback(conn);
			}
			close(conn);
			System.out.println("멤버서비스 / dltMemApi 실행 결과 : "+ result); //console
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
	
	// [han]
	// 유저 차단
	public int blockMember(String userId) {
		Connection conn = getConnection();
		
		int result = new MemberDao().blockMember(conn, userId);
		
		if(result >0 ) {
			commit(conn);
		}else {
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
	
	// 가영 - 친구 삭제
		public int deleteFriend(String loginUser, String friendId) {
			
			Connection conn = getConnection();
			
			int result = new MemberDao().deleteFriend(conn, loginUser, friendId);
			
			close(conn);
			
			return result;
		}

		// [han]
		// 유저 삭제
		public int deleteMember(String userId) {
			Connection conn = getConnection();
			
			int result = new MemberDao().deleteMember(conn, userId);
			
			if(result >0 ) {
				commit(conn);
			}else {
				rollback(conn);
			}
			
			close(conn);
			
			return result;
		}

}

