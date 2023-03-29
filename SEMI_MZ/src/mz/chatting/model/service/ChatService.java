package mz.chatting.model.service;

import static mz.common.JDBCTemplate.close;
import static mz.common.JDBCTemplate.commit;
import static mz.common.JDBCTemplate.getConnection;
import static mz.common.JDBCTemplate.rollback;

import java.sql.Connection;
import java.util.ArrayList;

import mz.chatting.model.dao.ChatDao;
import mz.chatting.model.vo.Chat;

//[han]
public class ChatService {
	
//------------------------------ select 구간 -------------------------------
	public ArrayList<String> getChatRooms(String userId){
		Connection conn = getConnection();
		ArrayList<String> list = new ChatDao().getChatRooms(conn, userId);
		close(conn);
		
		return list;
	}
	
	public ArrayList<Chat> getChattings(String userId, String recevier, int minNo){
		Connection conn = getConnection();
		ArrayList<Chat> list = new ChatDao().getChattings(conn, userId, recevier, minNo);
		close(conn);
		
		return list;
	}

//---------------------------------insert 구간 -------------------------------------	
	
	public int insertChatRoom( String userId, String receiver) {
		Connection conn = getConnection();
		int result = new ChatDao().insertChatRoom(conn, userId, receiver);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		
		close(conn);
		
		return result;
	}
	
	public int insertChat(Chat chat) {
		Connection conn = getConnection();
		
		int result = new ChatDao().insertChat(conn, chat);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	
//---------------------------------delete 구간 -------------------------------------
		
	public int deleteChatRoom( String userId, String receiver) {
		Connection conn = getConnection();
		int result = new ChatDao().deleteChatRoom(conn, userId, receiver);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		
		close(conn);
		
		return result;
	}
	
	
}
