package mz.member.model.dao;

import static mz.common.JDBCTemplate.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
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

		int result = 0;
		
		if(sort.equals("userId")) {
			sort = "USER_ID";
		}else {
			sort = "ENROLL_DATE";
		}

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectMemberList");
		
		sql = sql.replace("##", sort);

		// 경우에 따라 sql문 변경
		switch (status) {
			case "Y":
				sql = sql.replace("STATUS IN", "STATUS = 'Y' ");
				break;
			case "N":
				sql = sql.replace("STATUS IN", "STATUS = 'N' ");
				break;
			case "X":
				sql = sql.replace("STATUS IN", "STATUS = 'X' ");
				break;
			case "all":
				sql = sql.replace("STATUS IN", "STATUS IN('N', 'X') ");
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
				Member m = new Member(
						rset.getString("USER_ID"),
						rset.getString("NICKNAME"),
						rset.getString("STATUS"),
						rset.getInt("COIN"),
						df.format(rset.getDate("ENROLL_DATE")),
						rset.getString("API_KIND")
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

		System.out.println(sql);

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
				
				m = new Member(
						rset.getString("USER_ID"),
						rset.getString("NICKNAME"),
						rset.getString("STATUS"),
						rset.getInt("SKIN_ID"),
						rset.getInt("COIN"),
						rset.getString("SELF_INFO"),
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
	
	
	//[가영]
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
	
	// 신고 정보 db 저장 - 가영
	public int insertReport(Connection conn, String userId, String receiveId, String reportTitle, String reportContent) {
		
		int result = 0;
		
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("insertReport");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setString(2, receiveId);
			pstmt.setString(3, reportTitle);
			pstmt.setString(4, reportContent);
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// 호감도 추가 - 가영
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
	
	// 호감도 조회 - 가영
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
	
	// 친구 삭제 - 가영
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
		
	// 친구 정보 조회 - 가영
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
	// 유저 차단
	public int blockMember(Connection conn, String userId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("blockMember");
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
	
	
	
	
	
	
	
	
	
	
	
	
}	
	
	

