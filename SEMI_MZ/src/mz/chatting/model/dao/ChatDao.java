package mz.chatting.model.dao;

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

import mz.chatting.model.vo.Chat;

import static mz.common.JDBCTemplate.*;

//[han]
public class ChatDao {
	
	private Properties prop = new Properties();
	
	public ChatDao() {
		String fileName = ChatDao.class.getResource("/sql/chat/chat-mapper.xml").getPath();

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
	
	
	public ArrayList<String> getChatRooms(Connection conn , String userId){
		ArrayList<String> list = new ArrayList<>();
		
		ResultSet rset = null;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("getChatRooms");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			
			rset = pstmt.executeQuery();
			
			while(rset.next()) {
				list.add(rset.getString("RECEIVE_ID"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
	public ArrayList<Chat> getChattings(Connection conn, String userId, String recevier){
		ArrayList<Chat> list = new ArrayList<>();
		
		
		ResultSet rset = null;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("getChattings");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setString(2, recevier);
			pstmt.setString(3, recevier);
			pstmt.setString(4, userId);
			
			rset = pstmt.executeQuery();
			
			while(rset.next()) {
				Chat c = new Chat(
							rset.getInt("CHAT_NO"),
							rset.getString("USER_ID"),
							rset.getString("RECEIVE_ID"),
							rset.getString("CONTENT"),
							rset.getDate("CREATE_DATE")
						);
				list.add(c);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}

}
