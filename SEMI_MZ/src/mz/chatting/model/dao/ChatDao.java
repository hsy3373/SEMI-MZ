package mz.chatting.model.dao;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
	
	
//	------------------------------ select 구간 -------------------------------
	
	public int getChatRoom(Connection conn , String userId, String receiver){
		int result = 0;
		
		ResultSet rset = null;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("getChatRoom");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setString(2, receiver);
			
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
	
	public ArrayList<Chat> getChattings(Connection conn, String userId, String recevier, int minNo){
		ArrayList<Chat> list = new ArrayList<>();
		
		ResultSet rset = null;
		PreparedStatement pstmt = null;
		String entry = "getChattings";
		
		if(minNo <= 0) {
			entry = "getChattingsNew";
		}
		
		String sql = prop.getProperty(entry);
		System.out.println(entry);
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setString(2, recevier);
			pstmt.setString(3, recevier);
			pstmt.setString(4, userId);
			
			if(minNo > 0) {
				pstmt.setInt(5, minNo);
			}
			
			rset = pstmt.executeQuery();
			
			while(rset.next()) {
				
				DateFormat df = new SimpleDateFormat("MM/dd HH:mm");  
				
				
				Chat c = new Chat(
							rset.getInt("CHAT_NO"),
							rset.getString("USER_ID"),
							rset.getString("RECEIVE_ID"),
							rset.getString("CONTENT"),
							// sql.Date 는 날짜까지만 저장되고 시간은 불러와지지 않음
							//따라서 시간불러오려면 Timestamp써줘야 함
							df.format(rset.getTimestamp("CREATE_DATE"))
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

//---------------------------------insert 구간 -------------------------------------	
	
	public int insertChatRoom(Connection conn, String userId, String receiver) {
		int result = 0;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("insertChatRoom");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setString(2, receiver);
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
	
	public int insertChat(Connection conn, Chat chat) {
		
		int result = 0;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("insertChat");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, chat.getUserId());
			pstmt.setString(2, chat.getReceiveId());
			pstmt.setString(3, chat.getContent());
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	
//---------------------------------delete 구간 -------------------------------------
	
	
	public int deleteChatRoom(Connection conn, String userId, String receiver) {
		int result = 0;
		PreparedStatement pstmt = null;
		
		String sql = prop.getProperty("deleteChatRoom");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setString(2, receiver);

			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
