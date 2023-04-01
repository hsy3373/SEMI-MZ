package mz.skin.model.dao;

import static mz.common.JDBCTemplate.close;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.InvalidPropertiesFormatException;
import java.util.Properties;

import mz.chatting.model.dao.ChatDao;

public class SkinDao {

	private Properties prop = new Properties();

	public SkinDao() {
		String fileName = ChatDao.class.getResource("/sql/skin/skin-mapper.xml").getPath();

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

//-----------------------------------------select 영역---------------------------------------------------
	// [han]
	// insert된 스킨 no값 바로 가져오는 용도
	public int selectSkinCurval(Connection conn) {
		int result = 0;

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectSkinCurval");

		try {
			pstmt = conn.prepareStatement(sql);

			rset = pstmt.executeQuery();

			if (rset.next()) {
				result = rset.getInt("CURRVAL");
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}

		return result;
	}
	
	//[han]
	// 캐릭터 스킨 총 개수 가져오는 함수
	public int skinCount(Connection conn) {
		int result = 0;

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("skinCount");
		try {
			pstmt = conn.prepareStatement(sql);

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

//-----------------------------------------insert 영역---------------------------------------------------

	// [han]
	// 캐릭터 스킨 저장용 함수
	public int insertSkin(Connection conn, int price, String reward) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertSkin");
		System.out.println(price + " : 다오 안에서 불림");

		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, price);
			pstmt.setString(2, reward);

			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}

		return result;
	}

}
