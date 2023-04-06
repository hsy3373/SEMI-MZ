package mz.member.model.dao;

import static mz.common.JDBCTemplate.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
	//[han]
	public int userCount(Connection conn) {
		int result = 0;
		
		ResultSet rset = null;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("userCount");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				result = rset.getInt("COUNT");
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		return result;
		
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
	
	// [김혜린]
	public int insertCharacter(Connection conn, String userId) {
		
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertCharacter");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		return result;
	}
	
	
	// [김혜린]
	public int insertDltMember(Connection conn, String userId) {
		System.out.println("멤버DAO / DISABLED_MEMBER 테이블 행추가 실행??");//console
		
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertDltMember");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / DISABLED_MEMBER 테이블 행추가 결과 : " + result); //console
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
	public int updateStatus(Connection conn, String userId) {
		System.out.println("멤버DAO / updateStatus 실행??");//console
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateStatus");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / updateStatus 실행결과 : " + result);//console
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
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(pstmt);
		}
		System.out.println("멤버DAO / dltMemApi 실행결과 : " + result);//console
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}	
	
	

