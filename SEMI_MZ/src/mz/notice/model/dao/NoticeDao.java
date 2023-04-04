package mz.notice.model.dao;

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

import mz.notice.model.vo.Notice;
import mz.skin.model.vo.Skin;

import static mz.common.JDBCTemplate.*;

//[han]
public class NoticeDao {
	
	private Properties prop = new Properties();
	
	public NoticeDao() {
		String fileName = NoticeDao.class.getResource("/sql/notice/notice-mapper.xml").getPath();

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
	
//---------------------------------------select 구역----------------------------------
	
	//[han]
	// 공지 총 개수 가져오는 함수
	public int noticeCount(Connection conn) {
		int result = 0;
		
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("noticeCount");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			rset = pstmt.executeQuery();

			if (rset.next()) {
				result = rset.getInt("COUNT");
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		

		return result;
	}

	// [han]
	// 페이지 별 공지 조회용(한페이지에 20개)
	public ArrayList<Notice> selectNoticesPart(Connection conn, int page) {
		ArrayList<Notice> list = new ArrayList<>();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectNoticesPart");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			// 이거보다 크거나 같고
			pstmt.setInt(1, (page-1)*20 +1);
			
			//이거보다 작거나 같은
			pstmt.setInt(2, page*20);
			
			rset = pstmt.executeQuery();
			
			while (rset.next()) {
				
				DateFormat df = new SimpleDateFormat("yy/MM/dd HH:mm");  
				
				Notice n = new Notice( rset.getInt("NOTICE_NO"), 
								rset.getString("NOTICE_TITLE"), 
								rset.getString("NOTICE_CONTENT"),
								// sql.Date 는 날짜까지만 저장되고 시간은 불러와지지 않음
								//따라서 시간불러오려면 Timestamp써줘야 함
								df.format(rset.getTimestamp("CREATE_DATE"))
								);
				
				list.add(n);
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		

		return list;
	}

	// [han]
	// 개별 공지 조회용
	public Notice selectNotice(Connection conn, int noticeNo) {
		Notice notice = null;;

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectNotice");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, noticeNo);
			
			rset = pstmt.executeQuery();
			
			if (rset.next()) {
				
				DateFormat df = new SimpleDateFormat("yy/MM/dd HH:mm");  
				
				notice = new Notice( rset.getInt("NOTICE_NO"), 
								rset.getString("NOTICE_TITLE"), 
								rset.getString("NOTICE_CONTENT"),
								// sql.Date 는 날짜까지만 저장되고 시간은 불러와지지 않음
								//따라서 시간불러오려면 Timestamp써줘야 함
								df.format(rset.getTimestamp("CREATE_DATE"))
								);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}

		return notice;
	}
	
}
