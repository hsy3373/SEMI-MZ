package mz.notice.model.service;
import static mz.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.ArrayList;

import mz.notice.model.dao.NoticeDao;
import mz.notice.model.vo.Notice;

//[han]
public class NoticeService {
	
	
//---------------------------------------select 구역----------------------------------
	
	public int noticeCount() {
		
		Connection conn = getConnection();
		int result = new NoticeDao().noticeCount(conn);
		
		close(conn);
		
		return result;
	}
	
	public ArrayList<Notice> selectNoticesPart(int page){
		Connection conn = getConnection();
		
		ArrayList<Notice> list = new NoticeDao().selectNoticesPart(conn, page);
		
		close(conn);
		
		return list;
	}
	
	public Notice selectNotice(int noticeNo) {
		Connection conn = getConnection();
		
		Notice notice = new NoticeDao().selectNotice(conn, noticeNo);
		
		close(conn);
		
		return notice;
	}
	
	// 가영
	public ArrayList<Notice> selectNoticeList(){
		
		Connection conn = getConnection();
		
		ArrayList<Notice> list = new NoticeDao().selectNoticeList(conn);
		
		close(conn);
		
		return list;
		
	}
	
	
//---------------------------------------insert 구역----------------------------------
	
	public int insertNotice(String title, String content) {
		Connection conn = getConnection();
		int result = new NoticeDao().insertNotice(conn, title, content);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		
		close(conn);
		
		return result;
	}

//---------------------------------------update 구역----------------------------------
	
	public int updateNotice(int noticeNo, String title, String content) {
		Connection conn = getConnection();
		int result = new NoticeDao().updateNotice(conn, noticeNo, title, content);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	public int deleteNotice(int noticeNo) {
		Connection conn = getConnection();
		int result = new NoticeDao().deleteNotice(conn, noticeNo);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}


}
