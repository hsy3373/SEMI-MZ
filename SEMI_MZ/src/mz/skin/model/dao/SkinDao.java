package mz.skin.model.dao;

import static mz.common.JDBCTemplate.close;
import static mz.common.JDBCTemplate.getConnection;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.InvalidPropertiesFormatException;
import java.util.Properties;

import mz.chatting.model.dao.ChatDao;
import mz.skin.model.vo.Skin;

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
	
	
	
	// [han]
	// 개별 스킨 조회용
	public Skin selectSkin(Connection conn, int id) {
		
		Skin skin = null;

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectSkin");
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, id);
			
			rset = pstmt.executeQuery();

			if (rset.next()) {
				skin = new Skin( rset.getInt("SKIN_ID"), 
								rset.getString("SAVE_ROOT"), 
								rset.getInt("CHARACTER_PRICE"), 
								rset.getString("REWARD"));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}

		return skin;
		
	}
	
	
	// [han]
	// 페이지 별 일반 스킨 조회용(한페이지에 10개)
	public ArrayList<Skin> selectBasicSkins(Connection conn, int page) {
		
		ArrayList<Skin> list = new ArrayList<>();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectBasicSkins");
		try {
			pstmt = conn.prepareStatement(sql);
			
			// 이거보다 크거나 같고
			pstmt.setInt(1, (page-1)*10 +1);
			
			//이거보다 작거나 같은
			pstmt.setInt(2, page*10);
			
			rset = pstmt.executeQuery();

			while (rset.next()) {
				Skin skin = new Skin( rset.getInt("SKIN_ID"), 
								rset.getString("SAVE_ROOT"), 
								rset.getInt("CHARACTER_PRICE"), 
								rset.getString("REWARD"));
				
				list.add(skin);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}

		return list;
		
	}
	

	// [han]
	// 보상용 스킨 조회용
	public ArrayList<Skin> selectRewardSkins(Connection conn) {
		
		ArrayList<Skin> list = new ArrayList<>();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectRewardSkins");
		try {
			pstmt = conn.prepareStatement(sql);
			
			rset = pstmt.executeQuery();

			while (rset.next()) {
				Skin skin = new Skin( rset.getInt("SKIN_ID"), 
								rset.getString("SAVE_ROOT"), 
								rset.getInt("CHARACTER_PRICE"), 
								rset.getString("REWARD"));
				
				list.add(skin);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}

		return list;
		
	}


//-----------------------------------------insert 영역---------------------------------------------------

	// [han]
	// 캐릭터 스킨 저장용 함수
	public int insertSkin(Connection conn, int price, String reward) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertSkin");

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



//-----------------------------------------UPDATE 영역---------------------------------------------------
	
	// [han]
	// 캐릭터 스킨 수정용 함수
	public int updateSkin(Connection conn, int skinId, int price, String reward) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateSkin");

		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, price);
			pstmt.setString(2, reward);
			pstmt.setInt(3, skinId);

			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}

		return result;
	}
	
	// [han]
	// 캐릭터 스킨 삭제용 함수
	public int deleteSkin(Connection conn,int skinId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("deleteSkin");

		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, skinId);
			

			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}

		return result;
	}
	
}
