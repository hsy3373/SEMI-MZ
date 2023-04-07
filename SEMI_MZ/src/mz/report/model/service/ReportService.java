package mz.report.model.service;

import java.sql.Connection;
import java.util.ArrayList;

import mz.report.model.dao.ReportDao;
import mz.report.model.vo.Report;

import static mz.common.JDBCTemplate.*;

public class ReportService {
	
//------------------------------ select 구간 -------------------------------
	
	
	//[han] 어드민페이지용
	public int reportCount(String search, String keyword) {
		Connection conn = getConnection();
		
		int result = new ReportDao().reportCount(conn, search, keyword);
		
		close(conn);
		
		return result;
	}
	
	//[han] 어드민페이지용
	public ArrayList<Report> selectReportPart(int page, String search, String keyword) {
		Connection conn = getConnection();
		
		ArrayList<Report> list = new ReportDao().selectReportPart(conn, page, search, keyword);
		
		close(conn);
		
		return list;
	}
	
	//[han] 어드민페이지용
	public Report selectReport(int reportNo) {
		Connection conn = getConnection();
		
		Report r = new ReportDao().selectReport(conn, reportNo);
		
		close(conn);
		
		return r ;
	}
	
	
	
	//[han] 어드민페이지용
	public int selectUserCount( String userId) {
		Connection conn = getConnection();
		
		int result = new ReportDao().selectUserCount(conn, userId);
		
		close(conn);
		
		return result;
	}
	
	
	//[han] 어드민페이지용
	public int selectReceiverCount( String receiveId) {
		Connection conn = getConnection();
		
		int result = new ReportDao().selectReceiverCount(conn, receiveId);
		
		close(conn);
		
		return result;
	}
	
//------------------------------ update 구간 -------------------------------
	
	
	
	//[han] 어드민페이지용
	public int updateReport(Report report) {
		Connection conn = getConnection();
		
		int result = new ReportDao().updateReport(conn, report);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	//[han] 어드민페이지용
	public int deleteReport( int reportNo) {
		Connection conn = getConnection();
		
		int result = new ReportDao().deleteReport(conn, reportNo);
		
		if(result > 0) {
			commit(conn);
		}else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	
	
	
	
	
	

}
