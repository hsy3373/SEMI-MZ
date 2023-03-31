package mz.report.model.service;

import static mz.common.JDBCTemplate.*;

import java.sql.Connection;

import mz.report.model.dao.ReportDao;

public class ReportService {

	public int insertReport(String userId, String receiveId, String reportTitle, String reportContent) {
		
		Connection conn = getConnection();
		
		int result = new ReportDao().insertReport(conn, userId, receiveId, reportTitle, reportContent);
		
		if (result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
}
