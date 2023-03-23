package mz.chatting.model.service;

import static mz.common.JDBCTemplate.close;
import static mz.common.JDBCTemplate.getConnection;

import java.sql.Connection;
import java.util.ArrayList;

import mz.chatting.model.dao.ChatDao;
import mz.chatting.model.vo.Chat;

//[han]
public class ChatService {
	
	public ArrayList<String> getChatRooms(String userId){
		Connection conn = getConnection();
		ArrayList<String> list = new ChatDao().getChatRooms(conn, userId);
		close(conn);
		
		return list;
	}
	
	public ArrayList<Chat> getChattings(String userId, String recevier){
		Connection conn = getConnection();
		ArrayList<Chat> list = new ChatDao().getChattings(conn, userId, recevier);
		close(conn);
		
		return list;
	}

	
	
}
