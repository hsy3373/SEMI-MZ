package mz.member.model.dao;

import static mz.common.JDBCTemplate.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.InvalidPropertiesFormatException;
import java.util.Properties;

import mz.chatting.model.dao.ChatDao;
import mz.common.JDBCTemplate;
import mz.member.model.vo.Member;
import mz.member.model.vo.loginAPI;

public class MemberDao {
	private Properties prop = new Properties();
	
	public MemberDao() {
		String fileName = MemberDao.class.getResource("/sql/member/member-mapper.xml").getPath();
		
		try {
			prop.loadFromXML(new FileInputStream(fileName));
		} catch (InvalidPropertiesFormatException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

//------------------------------ select 구간 -------------------------------
	
	// [han]
	// 어드민 페이지 유저 수 불러오는 함수
	public int memberCount(Connection conn, String status, String api) {
		int result = 0;

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("memberCount");
		String str = "";

		// 경우에 따라 sql문 변경
		switch (status) {
			case "Y":
				str = " = 'Y' ";
				break;
			case "N":
				str = " = 'N' ";
				break;
			case "X":
				str = " = 'X' ";
				break;
			case "all":
				str = " IN('N', 'X') ";
				break;
		}

		switch (api) {
			case "kakao":
				str += " AND API_KIND = 'kakao' ";
				break;
			case "google":
				str += " AND API_KIND = 'google' ";
				break;
		}
		
		// 위에서 지정한대로 sql문에 변경사항 반영
		sql += str;
		
		try {
			pstmt = conn.prepareStatement(sql);

			rset = pstmt.executeQuery();

			if (rset.next()) {
				result = rset.getInt("COUNT");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return result;
	}

	// [han]
	// 어드민 페이지용 멤버 조회 함수
	public ArrayList<Member> selectMemberList(Connection conn, String status, String api, String sort, int page){
		ArrayList<Member> list = new ArrayList<>();
		
		if(sort.equals("userId")) {
			sort = "USER_ID";
		}else if(sort.equals("date")) {
			sort = "ENROLL_DATE";
		}else {
			sort = "CANCELLATION_DATE";
		}

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectMemberList");
		
		sql = sql.replace("##", sort);

		// 경우에 따라 sql문 변경
		switch (status) {
			case "Y":
				sql = sql.replace("M.STATUS IN", "M.STATUS = 'Y' ");
				break;
			case "N":
				sql = sql.replace("M.STATUS IN", "M.STATUS = 'N' ");
				break;
			case "X":
				sql = sql.replace("M.STATUS IN", "M.STATUS = 'X' ");
				break;
			case "all":
				sql = sql.replace("M.STATUS IN", "M.STATUS IN('N', 'X') ");
				break;
		}

		switch (api) {
			case "all":
				sql = sql.replace("AND API_KIND IN", "");
				break;
			case "kakao":
				sql = sql.replace("API_KIND IN", "API_KIND = 'kakao' ");
				break;
			case "google":
				sql = sql.replace("API_KIND IN", "API_KIND = 'google' ");
				break;
		}
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			// 페이지 별 멤버 조회용(한페이지에 20개)
			pstmt.setInt(1, (page-1)*20 +1);
			pstmt.setInt(2, page*20);
			
			rset= pstmt.executeQuery();
			
			//date 포맷용
			DateFormat df = new SimpleDateFormat("yy/MM/dd");  
			
			while(rset.next()) {
				
				Date cancel = rset.getDate("CANCELLATION_DATE");
				
				Member m = new Member(
						rset.getString("USER_ID"),
						rset.getString("NICKNAME"),
						rset.getString("STATUS"),
						rset.getInt("COIN"),
						df.format(rset.getDate("ENROLL_DATE")),
						rset.getString("API_KIND"),
						cancel != null ? df.format(cancel) : ""
						);
				
				list.add(m);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
	
	//[han]
	// 관리자 페이지 유저 검색기능
	public ArrayList<Member> searchMembers(Connection conn, String option, String keyword) {

		ArrayList<Member> list = new ArrayList<>();

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("searchMembers");

		if (option.equals("userId")) {
			sql = sql.replaceAll("##", "USER_ID");
		} else {
			sql = sql.replaceAll("##", "NICKNAME");
		}

		// like문에 들어갈 문자열 혹시 모를 _ 와 % escape 처리 
		String like = keyword.replaceAll("%", "\\%");
		like = like.replaceAll("_", "\\_");
		like = "%" + like + "%";

		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, keyword);
			pstmt.setString(2, like);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				Member m = new Member();
				m.setUserId(rset.getString("USER_ID"));
				m.setNicName(rset.getString("NICKNAME"));
				m.setStatus(rset.getString("STATUS"));

				list.add(m);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}

		return list;
	}

	//[han]
	// 관리자페이지 멤버 상세 조회용
	public Member selectMemberAllInfo(Connection conn, String userId) {
		Member m = null;

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectMemberAllInfo");
		
		
		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, userId);

			rset = pstmt.executeQuery();

			if (rset.next()) {
				//date 포맷용
				DateFormat df = new SimpleDateFormat("yy/MM/dd HH:mm");  
				//아래거는 null이 들어올수도 있어서 따로 빼서 처리해줌
				Timestamp ts = rset.getTimestamp("CANCELLATION_DATE");
				
				String info = rset.getString("SELF_INFO");
				
				m = new Member(
						rset.getString("USER_ID"),
						rset.getString("NICKNAME"),
						rset.getString("STATUS"),
						rset.getInt("SKIN_ID"),
						rset.getInt("COIN"),
						info != null ? info : "",
						rset.getString("GENDER"),
						df.format( rset.getTimestamp("ENROLL_DATE")),
						rset.getString("API_KIND"),
						ts != null ? df.format(ts) : ""
						);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}

		return m;
	}
	
	
	// [han] 관리자 페이지 신고창용 멤버 조회
	public Member selectMemberForReport(Connection conn, String userId) {
		Member m = null;
			
		ResultSet rset = null;
			
		PreparedStatement pstmt = null;
			
		String sql = prop.getProperty("selectMemberForReport");
			
		try {
			pstmt = conn.prepareStatement(sql);
				
			pstmt.setString(1, userId);
			pstmt.setString(2, userId);
			pstmt.setString(3, userId);
				
			rset = pstmt.executeQuery();
				
			if(rset.next()) {
				m = new Member(rset.getString("USER_ID"),
							   rset.getString("NICKNAME"),
							   rset.getString("STATUS"),
							   rset.getInt("USER_COUNT"),
							   rset.getInt("RECEIVE_COUNT"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return m;
	}
	
	//[han] 어드민 페이지용 탈퇴 계정 15일 지난 애들 조회용 
	public  ArrayList<Member> selectCancelMemberForAdmin(Connection conn){
		ArrayList<Member> list = new ArrayList<>();

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectCancelMemberForAdmin");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			rset= pstmt.executeQuery();
			
			//date 포맷용
			DateFormat df = new SimpleDateFormat("yy/MM/dd HH:mm");  
			
			while(rset.next()) {

				Member m = new Member();
				m.setUserId(rset.getString("USER_ID"));
				m.setNicName(rset.getString("NICKNAME"));
				m.setCancellationDate(df.format(rset.getTimestamp("CANCELLATION_DATE")));
				m.setUserReportCount(rset.getInt("USER_COUNT"));
				m.setReceiveReportCount(rset.getInt("RECEIVE_COUNT"));
				
				list.add(m);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
	//[가영] - 클릭한 유저 정보 불러오기
	public Member selectMember(Connection conn, String userId) {
			
		Member m = null;
			
		ResultSet rset = null;
			
		PreparedStatement pstmt = null;
			
		String sql = prop.getProperty("selectMember");
			
		try {
			pstmt = conn.prepareStatement(sql);
				
			pstmt.setString(1, userId);
				
			rset = pstmt.executeQuery();
				
			if(rset.next()) {
				m = new Member(rset.getString("USER_ID"),
							   rset.getString("NICKNAME"),
							   rset.getInt("SKIN_ID"),
							   rset.getString("SELF_INFO"),
							   rset.getString("GENDER"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return m;
	}
	
	// [가영] - 호감도 조회
	public int selectHeart(Connection conn, String loginUser, String receiveId) {
		
		int result = 0;
		
		ResultSet rset = null;
				
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("selectHeart");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, loginUser);
			pstmt.setString(2, receiveId);
			
			rset = pstmt.executeQuery();
			
			if (rset.next()) {
				result = rset.getInt("COUNT");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return result;
	}
	
	// [지의] - 유저별 호감도 총 개수
	public int countHeart(Connection conn, String receiveId) {
		int count = 0;
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("countHeart");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, receiveId);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				count = rset.getInt("COUNT");
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return count;
		
	}
		
	// [가영] - 친구 정보 조회
	public int selectFriend(Connection conn, String loginUser, String friendId) {
			
		int result = 0;
			
		ResultSet rset = null;
					
		PreparedStatement pstmt = null;
			
		String sql = prop.getProperty("selectFriend");
			
		try {
			pstmt = conn.prepareStatement(sql);
				
			pstmt.setString(1, loginUser);
			pstmt.setString(2, friendId);
				
			rset = pstmt.executeQuery();
				
			if (rset.next()) {
				result = rset.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return result;
	}
	
	// [가영] - 호감도 랭킹 조회
	public ArrayList<Member> selectRanking(Connection conn){
		
		ArrayList<Member> list = new ArrayList<>();
		
		PreparedStatement pstmt = null;
		
		ResultSet rset = null;
		
		String sql = prop.getProperty("selectRanking");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			rset = pstmt.executeQuery();
			
			while(rset.next()) {
				
				// DateFormat df = new SimpleDateFormat("yyyy/MM/dd");
				
				Member m = new Member(rset.getString("USER_ID"),
						              rset.getString("NICKNAME"),
						              rset.getInt("SKIN_ID"));
				// df.format(rset.getDate("CREATE_DATE"))
				list.add(m);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
	// [김혜린]
	public Member selectLoginUser(Connection conn, String userId) {

		Member m = null; 
		ResultSet rset = null;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("selectLoginUser");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				m = new Member(rset.getString("USER_ID"),
						       rset.getString("USER_PWD"),
						       rset.getString("NICKNAME"),
						       rset.getString("STATUS"),
						       rset.getInt("SKIN_ID"),
						       rset.getInt("COIN"),
						       rset.getString("SELF_INFO"),
						       rset.getString("GENDER"),
						       rset.getDate("ENROLL_DATE"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
				close(rset);
				close(pstmt);
			} 
		//System.out.println("dao m : " + m);
		return m;		
		
	}
	
	
	
	
	// [김혜린]
	public Member loginMember(Connection conn, String userId, String userPwd) {
		
		//System.out.println("dao 까지 옴?"+ userId + userPwd);
		
		Member m = null; 
		ResultSet rset = null;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("loginMember");
	
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setString(2, userPwd);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				m = new Member(rset.getString("USER_ID"),
						       rset.getString("USER_PWD"),
						       rset.getString("NICKNAME"),
						       rset.getString("STATUS"),
						       rset.getInt("SKIN_ID"),
						       rset.getInt("COIN"),
						       rset.getString("SELF_INFO"),
						       rset.getString("GENDER"),
						       rset.getDate("ENROLL_DATE"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
				close(rset);
				close(pstmt);
			} 
		//System.out.println("dao m : " + m);
		return m;		
	}
	
	// [김혜린]
	public Member checkKey(Connection conn, String apiKind, String apiKey) {
		
		Member m = null;
		ResultSet rset =null;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("checkKey");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, apiKind);
			pstmt.setString(2, apiKey);
			
			rset = pstmt.executeQuery();
			
			
			if(rset.next()) {
				
				m = new Member(rset.getString("USER_ID"),
					       	rset.getString("USER_PWD"),
					       rset.getString("NICKNAME"),
					       rset.getString("STATUS"),
					       rset.getInt("SKIN_ID"),
					       rset.getInt("COIN"),
					       rset.getString("SELF_INFO"),
					       rset.getString("GENDER"),
					       rset.getDate("ENROLL_DATE"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		//System.out.println("디에이오에 담겼니?" + m);
		return m;
	}
	
	// [김혜린]
	public int checkId(Connection conn, String userId) {
		
		int result = 0;
		PreparedStatement pstmt = null;
		ResultSet rset =null;
		
		String sql = prop.getProperty("checkId");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				result = rset.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		return result;		
	}
	
	// [김혜린]
		public int checkNick(Connection conn, String nicName) {
			
			int result = 0;
			PreparedStatement pstmt = null;
			ResultSet rset =null;
			
			String sql = prop.getProperty("checkNick");
			
			try {
				pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, nicName);
				
				rset = pstmt.executeQuery();
				
				if(rset.next()) {
					result = rset.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}finally {
				close(rset);
				close(pstmt);
			}
			return result;		
		}
	
//------------------------------ insert 구간 -------------------------------	
	// [김혜린]
	public int insertMember(Connection conn, Member m) {
		//System.out.println("insertMember");
		
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertMember");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, m.getUserId());
			pstmt.setString(2, m.getUserPwd());
			pstmt.setString(3, m.getNicName());
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// [김혜린]
	public int insertKey(Connection conn, loginAPI a) {
		//System.out.println("insertKey");
		
		//System.out.println("dao 까지 옴?"+ a); // 콘솔용
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertKey");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, a.getUserId());
			pstmt.setString(2, a.getApiKind());
			pstmt.setString(3, a.getApiKey());
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		//System.out.println("DAO result : " + result); // cosole용
		return result;
	}
	
	// [김혜린]
	public int insertCharacter(Connection conn, String userId) {
		System.out.println("디에이오 들어옴");
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertCharacter");
		System.out.println(sql);
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("Dao 캐릭터테이블 결과 : " + result);
		return result;
	}
	
	
	// [김혜린]
	public int insertDltMember(Connection conn, String userId,  String status) {
		System.out.println("멤버DAO / DISABLED_MEMBER 테이블 행추가 실행??");//console
		
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertDltMember");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setString(2, status);
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / DISABLED_MEMBER 테이블 행추가 결과 : " + result); //console
		return result;
	}
	
	// 친구 추가 - 가영
	public int insertFriend(Connection conn, String loginUser, String friendId) {
			
		int result = 0;
			
		PreparedStatement pstmt = null;
			
		String sql = prop.getProperty("insertFriend");
			
		try {
			pstmt = conn.prepareStatement(sql);
				
			pstmt.setString(1, loginUser);
			pstmt.setString(2, friendId);
				
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// [가영] - 호감도 추가 
	public int insertHeart(Connection conn, String loginUser, String receiveId) {
			
		int result = 0;
			
		PreparedStatement pstmt = null;
			
		String sql = prop.getProperty("insertHeart");
			
		try {
			pstmt = conn.prepareStatement(sql);
				
			pstmt.setString(1, loginUser);
			pstmt.setString(2, receiveId);
				
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	
	
//------------------------------ update 구간 -------------------------------		
	// [김혜린]
	public int updatePwd(Connection conn, String userPwd, String userId) {
		//System.out.println("DAO : updatePwd");
		//System.out.println(userPwd +", "+ userId);
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updatePwd");
		//System.out.println(sql);
		try {
			pstmt = conn.prepareStatement(sql);
			//System.out.println("sql들어왔음?");
			pstmt.setString(1, userPwd);
			pstmt.setString(2, userId);
			//System.out.println("result 담기 전");
			result = pstmt.executeUpdate();
			//System.out.println("Dao 담겼?: " + result);
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// [김혜린]
	public int updateStatus(Connection conn, String userId, String status) {
		System.out.println("멤버DAO / updateStatus 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateStatus");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, status);
			pstmt.setString(2, userId);
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / updateStatus 실행결과 : " + result);//console
		return result;
	}
	
	// [김혜린]
	public int updateMember(Connection conn, String nickName, String userPwd, String info, String gender, String userId) {
		System.out.println("DAO / updateMember 실행됨"); //console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateMember");
		
		System.out.println(nickName+","+ userPwd+","+ info+","+ gender+","+ userId);
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, nickName);
			pstmt.setString(2, userPwd);
			pstmt.setString(3, info);
			pstmt.setString(4, gender);
			pstmt.setString(5, userId);
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("DAO / updateMember 결과 : "+ result); //console
		return result;
	}
	
	//[han]
	//어드민페이지에서 코인과 자기소개 변경용 
	public int updateMemberInfo(Connection conn, String userId, int coin , String info) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateMemberInfo");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, coin);
			pstmt.setString(2, info);
			pstmt.setString(3, userId);
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		return result;
		
	}
	
	
//------------------------------ delete 구간 -------------------------------		
	// [김혜린]
	public int dltMemBoard(Connection conn, String userId) {
		System.out.println("멤버DAO / dltMemBoard 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("dltMemBoard");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setString(2, userId);
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / dltMemBoard 실행결과 : " + result);//console
		return result;
		
	}
	
	public int dltMemChatting(Connection conn, String userId) {
		System.out.println("멤버DAO / dltMemChatting 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("dltMemChatting");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setString(2, userId);
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / dltMemChatting 실행결과 : " + result);//console
		return result;
	}
	
	public int dltMemHeart(Connection conn, String userId) {
		System.out.println("멤버DAO / dltMemHeart 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("dltMemHeart");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setString(2, userId);
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / dltMemHeart 실행결과 : " + result);//console
		return result;
	}
	
	public int dltMemCharacter(Connection conn, String userId) {
		System.out.println("멤버DAO / dltMemCharacter 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("dltMemCharacter");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / dltMemCharacter 실행결과 : " + result);//console
		return result;
	}
	
	public int dltMemFriend(Connection conn, String userId) {
		System.out.println("멤버DAO / dltMemFriend 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("dltMemFriend");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setString(2, userId);
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / dltMemFriend 실행결과 : " + result);//console
		return result;
	}
	
	public int dltMemApi(Connection conn, String userId) {
		System.out.println("멤버DAO / dltMemApi 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("dltMemApi");
		
		return result;
	}
	
	
	// 채팅룸 삭제도 추가
	public int dltMemChattingRoom(Connection conn, String userId) {
		System.out.println("멤버DAO / dltMemChattingRoom 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("dltMemChattingRoom");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setString(2, userId);
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / dltMemChattingRoom 실행결과 : " + result);//console
		return result;
	}
	
	
	
	// [han]
	// 유저 삭제
	public int deleteMember(Connection conn, String userId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("deleteMember");
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	
	// [han]
	// 비활성화 테이블에서 비활성화 정보 삭제
	public int deleteDltMember(Connection conn, String userId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("deleteDltMember");
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// [han]
	//  어드민페이지용 15일 지난 탈퇴 유저 일괄 삭제
	public int deleteCancelMemberForAdmin(Connection conn) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("deleteCancelMemberForAdmin");
		try {
			pstmt = conn.prepareStatement(sql);
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// [가영] - 친구 삭제
	public int deleteFriend(Connection conn, String loginUser, String friendId) {
				
		int result = 0;
				
		PreparedStatement pstmt = null;
				
		String sql = prop.getProperty("deleteFriend");
				
		try {
			pstmt = conn.prepareStatement(sql);
					
			pstmt.setString(1, loginUser);
			pstmt.setString(2, friendId);
					
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// 호감도 삭제 - 가영
	public int deleteHeart(Connection conn, String loginUser, String receiveId) {
			
		int result = 0;
			
		PreparedStatement pstmt = null;
			
		String sql = prop.getProperty("deleteHeart");
			
		try {
			pstmt = conn.prepareStatement(sql);
				
			pstmt.setString(1, loginUser);
			pstmt.setString(2, receiveId);
				
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
}	
	
	

