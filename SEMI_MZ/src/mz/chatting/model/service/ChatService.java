package mz.chatting.model.service;

import static mz.common.JDBCTemplate.close;
import static mz.common.JDBCTemplate.commit;
import static mz.common.JDBCTemplate.getConnection;
import static mz.common.JDBCTemplate.rollback;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;

import mz.chatting.model.dao.ChatDao;
import mz.chatting.model.vo.Chat;

//[han]
public class ChatService {
	
//------------------------------ select 구간 -------------------------------
	public HashMap<String , String>  getChatRooms(String userId){
		Connection conn = getConnection();
		HashMap<String , String>  list = new ChatDao().getChatRooms(conn, userId);
		close(conn);
		
		return list;
	}
	
	public ArrayList<Chat> getChattings(String userId, String recevier, int minNo){
		Connection conn = getConnection();
		ArrayList<Chat> list = new ChatDao().getChattings(conn, userId, recevier, minNo);
		close(conn);
		
		return list;
	}

	//7일 이상 된 채팅로그 개수 반환용
	public int selectChatCountForDelete() {
		Connection conn = getConnection();
		int result = new ChatDao().selectChatCountForDelete(conn);
		close(conn);
		
		return result;
	}
//---------------------------------insert 구간 -------------------------------------	
	
	public int insertChatRoom( String userId, String receiver) {
		Connection conn = getConnection();
		ChatDao dao = new ChatDao();
		int r2 = dao.getChatRoomCount(conn, receiver,  userId);
		int r = dao.getChatRoomCount(conn, userId, receiver);
		
		int result = 0;
		int result2 = 0;

		if (r2 == 0) {
			result2 = new ChatDao().insertChatRoom(conn, receiver, userId);

			if (result2 > 0) {
				commit(conn);
			} else {
				rollback(conn);
			}
		}
		
		if (r == 0) {
			result = dao.insertChatRoom(conn, userId, receiver);

			if (result > 0) {
				commit(conn);
			} else {
				rollback(conn);
			}
		}

		close(conn);
		
		return result+result2;
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
	
	
	public int deleteChatLogs() {
		Connection conn = getConnection();
		int result = new ChatDao().deleteChatLogs(conn);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		
		close(conn);
		
		return result;
	}
	
	
}
