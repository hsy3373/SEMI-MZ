package mz.member.model.dao;

import static mz.common.JDBCTemplate.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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
		System.out.println("dao m : " + m);
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
		System.out.println("디에이오에 담겼니?" + m);
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
		System.out.println("insertMember");
		
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
		System.out.println("insertKey");
		
		System.out.println("dao 까지 옴?"+ a); // 콘솔용
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
		System.out.println("DAO result : " + result); // cosole용
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}	
	
	

