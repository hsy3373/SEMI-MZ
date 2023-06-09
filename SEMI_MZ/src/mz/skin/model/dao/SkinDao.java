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
import mz.member.model.vo.Member;
import mz.skin.model.vo.Skin;
import mz.skin.model.vo.Character;

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
	
	// [han]
	// 멤버가 보유중인 리워드용 스킨 조회용
	public ArrayList<Integer> myRewardList(Connection conn, String userId){
		ArrayList<Integer> list = new ArrayList<>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("myRewardList");
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			
			rset = pstmt.executeQuery();
			
			while(rset.next()) {
				list.add( rset.getInt("SKIN_ID"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return list;
	}
	
	// [지의]
	// 마이룸 상점 스킨 조회
	// 페이지 별 일반 스킨 조회용(한페이지에 12개)
	public ArrayList<Skin> selectSkinsList(Connection conn, String userId) {
		
		ArrayList<Skin> list = new ArrayList<>();
		
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectSkinsList");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			
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
	
	// [지의]
	// 상점 총 스킨 개수 확인
	public int storeSkinCount(Connection conn, String userId) {
		int result = 0;
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("storeSkinCount");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
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
	
	// [지의]
	// 마이룸(옷장) - 페이지 별 로그인 유저가 보유한 스킨 조회용(한페이지에 12개)
	public ArrayList<Skin> mySkinList(Connection conn, String userId){
		ArrayList<Skin> list = new ArrayList<>();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("mySkinList");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);

			rset = pstmt.executeQuery();
			
			while(rset.next()) {
				Skin skin = new Skin(rset.getInt("SKIN_ID"),
											rset.getString("SAVE_ROOT"));
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
	
	// [지의]
	// 상점 총 스킨 개수 확인
	public int dressSkinCount(Connection conn, String userId) {
		int result = 0;
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("dressSkinCount");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
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
	
	public int selectfriendSkin(Connection conn, String roomMasterId) {
		int id = 0;
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		String sql = prop.getProperty("selectfriendSkin");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, roomMasterId);
			
			rset = pstmt.executeQuery();
			
			if(rset.next()) {
				id =  rset.getInt("SKIN_ID");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(rset);
			close(pstmt);
		}
		return id;
		
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
	
	// [지의]
	// CHARACTER 테이블에 구입한 스킨 INSERT
	public int insertMySkin(Connection conn, String userId, int skinId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertMySkin");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, userId);
			pstmt.setInt(2, skinId);
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// [지의]
	// MEMBER 테이블에 COIN  UPDATE
	public int updateCoin(Connection conn, String userId, int skinId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateCoin");
		
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, skinId);
			pstmt.setString(2, userId);
			pstmt.setInt(3, skinId);
			
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
	
	
	// [han]
	// 유저가 가진 스킨 삭제용
	public int deleteMySkin(Connection conn, String userId, int skinId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("deleteMySkin");

		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userId);
			pstmt.setInt(2, skinId);
			
			result = pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}

		return result;
	}
	
	// [지의]
	// 로그인유저 스킨 변경
	public int updateMySkin(Connection conn, String userId, int skinId) {
		int result = 0;
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("updateMySkin");
		try {
			pstmt = conn.prepareStatement(sql);
			
			pstmt.setInt(1, skinId);
			pstmt.setString(2, userId);
			
			result = pstmt.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		return result;
	}
	
	// [지의]

}
