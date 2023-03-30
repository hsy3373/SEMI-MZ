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

import mz.member.model.vo.Member;



public class MemberDao {
	private Properties prop = new Properties();
	
	
	
	
	
	public MemberDao() {
		String fileName = MemberDao.class.getResource("/sql/member/member-mapper.xml").getPath();
		
		try {
			prop.loadFromXML(new FileInputStream(fileName));
		} catch (InvalidPropertiesFormatException e) {
			// TODO Auto-generated catch block
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
		
		System.out.println(userId + userPwd);
		
		
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
		return m;		
	}
	
	// [김혜린]
	public int checkKey(Connection conn, String apiKey) {
		
		int result = 0;
		
		PreparedStatement pstmt = null;
		
		ResultSet rset =null;
		
		String sql = prop.getProperty("checkKey");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, apiKey);
			
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
		
		int result = 0;
		
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("insertMember");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, m.getUserId());
			pstmt.setString(2, m.getUserPwd());
			pstmt.setString(3, m.getNicName());
			pstmt.setString(4, m.getStatus());
			pstmt.setInt(5, m.getSkinId());
			pstmt.setInt(6, m.getCoin());
			pstmt.setString(7, m.getInfo());
			pstmt.setString(8, m.getGender());
			pstmt.setDate(9, m.getDate());
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}	
	
	

