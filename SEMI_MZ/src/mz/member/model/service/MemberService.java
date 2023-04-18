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
	
	// [han] 관리자 페이지 신고창용 멤버 조회
	public Member selectMemberForReport(String userId) {
		Connection conn = getConnection();

		Member m = new MemberDao().selectMemberForReport(conn, userId);

		close(conn);

		return m;
	}
	
	//[han] 어드민 페이지용 탈퇴 계정 15일 지난 애들 조회용 
	public  ArrayList<Member> selectCancelMemberForAdmin(){
		Connection conn = getConnection();

		ArrayList<Member> list = new MemberDao().selectCancelMemberForAdmin(conn);

		close(conn);

		return list;
	}
	
	//[han] 어드민 페이지용 호감도 집계에 사용되지 애들 조회용 - 최근 월요일의 7일 전보다 더 오래된 호감도 기록들
	public  int selectHeartForDel(){
		Connection conn = getConnection();

		int result = new MemberDao().selectHeartForDel(conn);

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
	
	// [김혜린] - 유저 정보 조회
	public Member selectLoginUser(String userId) {
		Connection conn = getConnection();
		
		Member m = new MemberDao().selectLoginUser(conn, userId);
		
		close(conn);
		
		return m;
	}
	
	// [김혜린] - 기본 로그인
	public Member loginMember(String userId, String userPwd) {
		Connection conn = getConnection();
		
		Member m = new MemberDao().loginMember(conn, userId, userPwd);
		
		close(conn);
		
		return m;
	}

	// [김혜린] - api 키 존재유무 확인
	public Member checkKey(String apiKind, String apiKey) {
		Connection conn = getConnection();
		
		Member m = new MemberDao().checkKey(conn, apiKind, apiKey);
		
		close(conn);
		
		return m;
	}
		
	// [김혜린] - 아이디 중복확인
	public int checkId(String userId) {
		Connection conn = getConnection();
		
		int result = new MemberDao().checkId(conn, userId);
		
		close(conn);
		
		return result;
	}
	
	// [김혜린] - 닉네임 중복확인
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
	
	public ArrayList<Member> selectRanking(){
		
		Connection conn = getConnection();
		
		ArrayList<Member> list = new MemberDao().selectRanking(conn);
		
		close(conn);
		
		return list;
	}
	
		
		
	// [지의] - 유저별 호감도 총개수
	public int countHeart(String receiveId) {
		Connection conn = getConnection();
		int count = new MemberDao().countHeart(conn, receiveId);
		close(conn);
		return count;
	}
		
	//지영 - 차단유저 확인
		public String blockCheck(String userId) {
			
			Connection conn = getConnection();
			
			String result = new MemberDao().blockCheck(conn, userId);
			
			close(conn);
			
			return result;
			
		}
	
	// [지의] - 친구유저 닉네임 조회
	public String friendNickName(String receiveId) {
		Connection conn = getConnection();
		String nickName = new MemberDao().friendNickName(conn, receiveId);
		close(conn);
		return nickName;
	}

		
//------------------------------ insert 구간 -------------------------------
	
	// [김혜린] - Member 테이블 추가
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
	
	// [김혜린] - API 테이블 추가
	public int insertKey(loginAPI a) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().insertKey(conn, a);
		
		if(result > 0) { // API테이블에 추가 성공
			commit(conn);
		}else { // API테이블에 추가 실패
			rollback(conn);
		}
		close(conn);
		return result;
	}
	
	// [김혜린] - 캐릭터 테이블 추가
	public int insertCharacter(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().insertCharacter(conn, userId);
		
		if(result > 0) { // CHARACTER 테이블에 추가 성공
			commit(conn);
		}else { // CHARACTER 테이블에 추가 실패
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	// [김혜린] - 비활성멤버 테이블 추가
	public void insertDltMember(String userId, String status) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().insertDltMember(conn, userId, status);
		
		if(result > 0) { //DISABLED_MEMBER 테이블 insert 성공
			commit(conn);
		}else{ //DISABLED_MEMBER 테이블 insert 실패
			rollback(conn);
		}
		close(conn);
	}
	
		
		
		
//------------------------------ update 구간 -------------------------------
	// [김혜린] - 비밀번호 변경
	public Member updatePwd(String userPwd, String userId) {
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
		return m;
	}
	
	// [김혜린] - 유저 STATUS 값 변경
	public int updateStatus(String userId, String status) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().updateStatus(conn, userId, status);
		
		if(result > 0) { //Member테이블 status: update 성공
			commit(conn);
		}else { //Member테이블 status: update 실패
			rollback(conn);
		}
		close(conn); 
		return result;
	}
		
	// [김혜린] - MEMBER 내정보 변경
	public Member updateMember(String nickName, String chkPwd, String info, String gender, String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().updateMember(conn, nickName, chkPwd, info, gender, userId);
		
		Member m = null;
		
		if(result > 0) { //Member테이블 update 성공
			commit(conn);
			m = new MemberDao().selectLoginUser(conn, userId);
		}else { //Member테이블 update 실패
			rollback(conn);
		}
		close(conn);
		
		return m;
	}
		
	// [김혜린] - (패스워드 미포함) MEMBER 내정보 변경
	public Member updateNPwd(String nickName, String info, String gender, String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().updateNPwd(conn, nickName, info, gender, userId);
		
		Member m = null;
		
		if(result > 0) { //Member테이블 update 성공
			commit(conn);
			m = new MemberDao().selectLoginUser(conn, userId);
		}else { //Member테이블 update 실패
			rollback(conn);
		}
		close(conn);
		
		return m;
	}
	
	//[han]
	//어드민페이지에서 코인과 자기소개 변경용 
	public int updateMemberInfo(String userId, int coin , String info) {
		Connection conn = getConnection();
		
		int result = new MemberDao().updateMemberInfo(conn, userId, coin, info);
		
		if(result > 0) { 
			commit(conn);
		}else { 
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
		
		
//------------------------------ delete 구간 -------------------------------
	// [김혜린] - 회원탈퇴 시 보드 테이블 내 기록 삭제
	public void dltMemBoard(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().dltMemBoard(conn, userId);
		
		if(result > 0) { // 행 delete 성공
			commit(conn);
		}else { // 행 delete 실패
			rollback(conn);
		}
		close(conn);
	}
	
	// [김혜린] - 회원탈퇴 시 채팅 테이블 내 기록 삭제
	public void dltMemChatting(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().dltMemChatting(conn, userId);
		
		if(result > 0) { // 행 delete 성공
			commit(conn);
		}else { // 행 delete 실패
			rollback(conn);
		}
		close(conn);
	}
	
	// [김혜린] - 회원탈퇴 시 호감도 테이블 내 기록 삭제
	public void dltMemHeart(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().dltMemHeart(conn, userId);
		
		if(result > 0) { // 행 delete 성공
			commit(conn);
		}else { // 행 delete 실패
			rollback(conn);
		}
		close(conn);
	}
	
	// [김혜린] - 회원탈퇴 시 캐릭터 테이블 내 기록 삭제
	public void dltMemCharacter(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().dltMemCharacter(conn, userId);
		
		if(result > 0) { // 행 delete 성공
			commit(conn);
		}else { // 행 delete 실패
			rollback(conn);
		}
		close(conn);
	}
	
	// [김혜린] - 회원탈퇴 시 친구목록 테이블 내 기록 삭제
	public void dltMemFriend(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().dltMemFriend(conn, userId);
		
		if(result > 0) { // 행 delete 성공
			commit(conn);
		}else { // 행 delete 실패
			rollback(conn);
		}
		close(conn);
	}
	
	// [김혜린] - 회원 탈퇴 시 채팅룸 테이블  행 삭제
	public void dltMemChattingRoom(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().dltMemChattingRoom(conn, userId);
		
		if(result > 0) { // 행 delete 성공
			commit(conn);
		}else { // 행 delete 실패
			rollback(conn);
		}
		close(conn);
	}
	
	// [김혜린] - 회원 탈퇴 시 생성되었던 비활성계정 테이블 행 삭제(사용자 탈퇴 후 15일 이내 재로그인 시 사용됨)
	public void dltDisabledTable(String userId) {
		
		Connection conn = getConnection();
		
		int result = new MemberDao().dltDisabledTable(conn, userId);
		
		if(result > 0) { // 행 delete 성공
			commit(conn);
		}else { // 행 delete 실패
			rollback(conn);
		}
		close(conn);
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
	public int blockMember(String userId,  String status) {
		// 만약 상태가 탈퇴 상태인데 차단처리 하려는 것 로직도 필요
		Connection conn = getConnection();
		
		int result = new MemberDao().updateStatus(conn, userId, status);
		
		// 일단 비활성화 테이블에서 한번은 삭제(없으면 어차피 삭제 안되니까 괜춘)
		int result2 = new MemberDao().deleteDltMember(conn, userId);
		
		if(status.equals("X")) {
			//만약 차단상태로 변경된거다 하면 비활성화 테이블에 행 추가
			result2 = new MemberDao().insertDltMember(conn, userId, status);
		}
		
		if(result * result2 > 0 ) {
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

		// [han]
		//  어드민페이지용 15일 지난 탈퇴 유저 일괄 삭제
		public int deleteCancelMemberForAdmin() {
			Connection conn = getConnection();
			
			int result = new MemberDao().deleteCancelMemberForAdmin(conn);
			
			if(result >0 ) {
				commit(conn);
			}else {
				rollback(conn);
			}
			
			close(conn);
			
			return result;
		}

		// [han]
		//  어드민페이지용 호감도 집계에 사용되지 않는 지난 기록 일괄 삭제
		public int deleteHeartListForAdmin() {
			Connection conn = getConnection();
			
			int result = new MemberDao().deleteHeartListForAdmin(conn);
			
			if(result >0 ) {
				commit(conn);
			}else {
				rollback(conn);
			}
			
			close(conn);
			
			return result;
		}
}

