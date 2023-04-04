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
	

}
