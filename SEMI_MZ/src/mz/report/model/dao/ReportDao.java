package mz.report.model.dao;

import static mz.common.JDBCTemplate.close;

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

import mz.member.model.dao.MemberDao;
import mz.report.model.vo.Report;

public class ReportDao {
	private Properties prop = new Properties();
	
	public ReportDao() {
		String fileName = MemberDao.class.getResource("/sql/report/report-mapper.xml").getPath();
		
		try {
			prop.loadFromXML(new FileInputStream(fileName));
		} catch (InvalidPropertiesFormatException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
//------------------------------ select 구간 -------------------------------
	
	
	//[han] 어드민페이지용
	public int reportCount(Connection conn, String search, String keyword) {
		
		int result = 0;

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("reportCount");

		if (search.equals("userId")) {
			sql = sql.replaceAll("##", "USER_ID");
		} else if(search.equals("receveId")) {
			sql = sql.replaceAll("##", "RECEIVE_ID");
		} else {
			sql = sql.replaceAll("##", "REPORT_TITLE");
		}
		
		// like문에 들어갈 문자열 혹시 모를 _ 와 % escape 처리 
		String like = keyword.replaceAll("%", "\\%");
		like = like.replaceAll("_", "\\_");
		like = "%" + like + "%";

		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, keyword);
			pstmt.setString(2, like);

			rset = pstmt.executeQuery();

			if (rset.next()) {
				result = rset.getInt("COUNT");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		
		return result;
	}
	
	//[han] 어드민페이지용
	public ArrayList<Report> selectReportPart(Connection conn, int page, String search, String keyword) {
		
		ArrayList<Report>  list = new ArrayList<>() ;

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectReportPart");

		if (search.equals("userId")) {
			sql = sql.replaceAll("##", "USER_ID");
		} else if(search.equals("receveId")) {
			sql = sql.replaceAll("##", "RECEIVE_ID");
		} else {
			sql = sql.replaceAll("##", "REPORT_TITLE");
		}
		
		// like문에 들어갈 문자열 혹시 모를 _ 와 % escape 처리 
		String like = keyword.replaceAll("%", "\\%");
		like = like.replaceAll("_", "\\_");
		like = "%" + like + "%";

		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, keyword);
			pstmt.setString(2, like);
			
			// 한페이지에 20개
			pstmt.setInt(3, (page-1)*20 +1);
			pstmt.setInt(4, page*20);

			rset = pstmt.executeQuery();
			
			//date 포맷용
			DateFormat df = new SimpleDateFormat("yy/MM/dd");  

			while (rset.next()) {
				Report r = new Report(
							rset.getInt("REPORT_NO"),
							rset.getString("USER_ID"),
							rset.getString("RECEIVE_ID"),
							rset.getString("REPORT_TITLE"),
							rset.getString("REPORT_CONTENT"),
							df.format(rset.getDate("CREATE_DATE"))
						);
				list.add(r);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		
		return list;
	}
	
	
	//[han] 어드민페이지용
	public Report selectReport(Connection conn, int reportNo) {
		Report r = null ;

		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectReport");


		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setInt(1, reportNo);

			rset = pstmt.executeQuery();
			
			//date 포맷용
			DateFormat df = new SimpleDateFormat("yy/MM/dd HH:dd");  

			if (rset.next()) {
				r = new Report(
							rset.getInt("REPORT_NO"),
							rset.getString("USER_ID"),
							rset.getString("RECEIVE_ID"),
							rset.getString("REPORT_TITLE"),
							rset.getString("REPORT_CONTENT"),
							df.format(rset.getTimestamp("CREATE_DATE"))
						);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		
		return r;
	}
	
	
	//[han] 어드민페이지용
	public int selectUserCount(Connection conn, String userId) {
		int result = 0;
		
		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectUserCount");


		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, userId);

			rset = pstmt.executeQuery();

			if (rset.next()) {
				result = rset.getInt("COUNT");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		
		return result;
	}
	
	//[han] 어드민페이지용
	public int selectReceiverCount(Connection conn, String receiveId) {
		int result = 0;
		
		ResultSet rset = null;
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("selectReceiverCount");

		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, receiveId);

			rset = pstmt.executeQuery();

			if (rset.next()) {
				result = rset.getInt("COUNT");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		
		return result;
	}
	
	
	
//------------------------------ update 구간 -------------------------------
	
	
	//[han] 어드민페이지용
	public int updateReport(Connection conn, Report report) {
		int result= 0;
		
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("updateReport");

		try {
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, report.getReportTitle());
			pstmt.setString(2, report.getReportContent());
			pstmt.setInt(3, report.getReportNo());

			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		
		return result;
	}
	
	//[han] 어드민페이지용
	public int deleteReport(Connection conn, int reportNo) {
		int result= 0;
		
		PreparedStatement pstmt = null;

		String sql = prop.getProperty("deleteReport");

		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, reportNo);

			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		
		return result;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
