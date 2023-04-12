package mz.buttonList.model.dao;

import static mz.common.JDBCTemplate.close;

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

import mz.member.model.vo.Member;

public class bottonLisetDao {
	
	
	/**
	 * sql문 연결
	 */
	
	Properties prop = new Properties();
	
	public bottonLisetDao() {
		
		try {
			prop.loadFromXML(new FileInputStream(bottonLisetDao.class.getResource("/sql/buttonList/buttonList-mapper.xml").getPath()));
		} catch (InvalidPropertiesFormatException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	/**
	 * 
	 * @param conn
	 * @param userId
	 * @return Member list 
	 * 작성자 : 윤지영 : 친구유저정보 검색 
	 */
	public ArrayList<Member> selectFriendList(Connection conn, String userId) {

		 ArrayList<Member> list = new ArrayList<>();
		 PreparedStatement pstmt = null;
		 ResultSet rset = null;
		 String sql = prop.getProperty("selectFriendList");
		 
		 //System.out.println(sql); 연결 됐음
		 System.out.println(userId); 
		 
		 try {
			 //System.out.println("여기까지옴11");		 
			 
			 pstmt = conn.prepareStatement(sql);
			 
			 pstmt.setString(1, userId);
			 rset = pstmt.executeQuery();
			 
		
			 while(rset.next()) {
				 Member	 m = new Member(
						   rset.getString("USER_ID"),
						   rset.getString("NICKNAME"),
						   rset.getInt("SKIN_ID"));
				 list.add(m);
			 }
				
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				close(rset);
				close(pstmt);
			}
		
		 //System.out.print("dao list :"+list);

		return list;
	}

	
}
