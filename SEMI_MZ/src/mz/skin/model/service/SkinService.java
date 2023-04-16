package mz.skin.model.service;

import static mz.common.JDBCTemplate.close;
import static mz.common.JDBCTemplate.commit;
import static mz.common.JDBCTemplate.getConnection;
import static mz.common.JDBCTemplate.rollback;

import java.io.File;
import java.sql.Connection;
import java.util.ArrayList;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;

import mz.member.model.vo.Member;
import mz.skin.model.dao.SkinDao;
import mz.skin.model.vo.Skin;
import mz.skin.model.vo.Character;

public class SkinService {

	// [han]
	// 폴더 경로 생성용
	public boolean createFolder(String path) {
		boolean result = false;
		File Folder = new File(path);

		// 해당 디렉토리가 없다면 디렉토리를 생성.
		if (!Folder.exists()) {
			try {
				result = Folder.mkdir(); // 폴더 생성합니다. ("새폴더"만 생성)
				System.out.println("폴더 생성 : " + result);
			} catch (Exception e) {
				e.getStackTrace();
			}
		} else {
			System.out.println("폴더가 이미 존재합니다..");
		}

		return result;
	}

	// [han]
	// 폴더 삭제용
	public boolean deleteFolder(String path) {
		boolean result = false;
		File folder = new File(path);
		try {
			while (folder.exists()) {
				File[] folder_list = folder.listFiles(); // 파일리스트 얻어오기

				// 해당 폴더 안에 파일이 있다면 폴더가 삭제되지 않으므로 각개별로 파일 삭제 필요
				for (int i = 0; i < folder_list.length; i++) {
					folder_list[i].delete(); // 파일 삭제
					System.out.println("파일이 삭제되었습니다.");
				}

				if (folder_list.length == 0 && folder.isDirectory()) {
					result = folder.delete(); // 대상폴더 삭제
					System.out.println("폴더 삭제 : " + result);
				}
			}
		} catch (Exception e) {
			e.getStackTrace();
		}

		return result;
	}
	

//-------------------------------------------SELECT 구역 -------------------------------------------------
	// [han]
	// 스킨 총 개수 확인용
	public int skinCount() {
		Connection conn = getConnection();

		int result = new SkinDao().skinCount(conn);

		close(conn);

		return result;
	}

	// [han]
	// 개별 스킨 조회용
	public Skin selectSkin(int id) {

		Connection conn = getConnection();

		Skin result = new SkinDao().selectSkin(conn, id);

		close(conn);

		return result;

	}

	// [han]
	// 페이지 별 일반 스킨 조회용(한페이지에 10개)
	public ArrayList<Skin> selectBasicSkins(int page) {

		Connection conn = getConnection();

		ArrayList<Skin> list = new SkinDao().selectBasicSkins(conn, page);

		close(conn);

		return list;

	}

	// [han]
	// 보상용 스킨 조회용
	public ArrayList<Skin> selectRewardSkins() {

		Connection conn = getConnection();

		ArrayList<Skin> list = new SkinDao().selectRewardSkins(conn);

		close(conn);

		return list;

	}
	
	
	// [han]
	// 멤버가 보유중인 리워드용 스킨 조회용
	public ArrayList<Integer> myRewardList(String userId){
		Connection conn = getConnection();
		ArrayList<Integer> list = new SkinDao().myRewardList(conn, userId);
		close(conn);
		return list;
	}
	
	
	
	// [지의]
	// 마이룸(상점) - 페이지 별 일반 스킨 조회용(한페이지에 12개)
	public ArrayList<Skin> selectSkinsList(String userId) {
		
		Connection conn = getConnection();
		
		ArrayList<Skin> list = new SkinDao().selectSkinsList(conn, userId);
		
		close(conn);
		
		return list;
	}
	
	// [지의]
	// 상점 총 스킨 개수 확인
	public int storeSkinCount(String userId) {
		Connection conn = getConnection();
		int result = new SkinDao().storeSkinCount(conn, userId);
		close(conn);
		return result;
	}
	
	// [지의]
	// 마이룸(옷장) - 페이지 별 로그인 유저가 보유한 스킨 조회용(한페이지에 12개)
	public ArrayList<Skin> mySkinList(String userId){
		Connection conn = getConnection();
		ArrayList<Skin> list = new SkinDao().mySkinList(conn, userId);
		close(conn);
		return list;
	}
	
	// [지의]
	// 로그인유저가 보유한 총 스킨 개수 확인
	public int dressSkinCount(String userId) {
		Connection conn = getConnection();
		int result = new SkinDao().dressSkinCount(conn, userId);
		close(conn);
		return result;
	}
	
	// [지의]
	// roomMasterId 값으로 친구 스킨 조회
	public int selectfriendSkin(String roomMasterId) {
		Connection conn = getConnection();
		int id = new SkinDao().selectfriendSkin(conn, roomMasterId);
		close(conn);
		return id;
	}

//-------------------------------------------INSERT 구역 -------------------------------------------------

	// [han]
	// CHARACTER_SKIN 테이블에 줄을 하나 추가먼저 시키고 해당 줄의 SKIN_ID(==시퀀스 값)을 반환
	public int insertSkin(int price, String reward) {

		Connection conn = getConnection();

		int result = new SkinDao().insertSkin(conn, price, reward);

		if (result > 0) {
			System.out.println("스킨 저장은 잘됨");
			// 아직 커밋 전인 요소를 가져올 수 있을까??
			result = new SkinDao().selectSkinCurval(conn);
			System.out.println("커밋전에 currval 가져오는거 가능? : " + result);
			commit(conn);
		} else {
			rollback(conn);
		}

		close(conn);

		return result;
	}
	
	// [han]
	// 보상용 스킨 추가용도 == 코인 차감 없이 바로 스킨 부여
	public int insertRewardSkin(String userId, int skinId) {
		Connection conn = getConnection();
		
		int result = new SkinDao().insertMySkin(conn, userId, skinId);

		if(result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}
		return result;
	}
	
	// [지의]
	// CHARACTER 테이블에 구입한 스킨 INSERT + MEMBER 테이블에 COIN  UPDATE
	public int insertMySkin(String userId, int skinId) {
		Connection conn = getConnection();
		int result1 = new SkinDao().updateCoin(conn,userId, skinId);
		int result2 = 0;
		if(result1 > 0) {
			result2 = new SkinDao().insertMySkin(conn, userId, skinId);
			if(result2 > 0) {
				commit(conn);
			}else {
				rollback(conn);
			}
		} else {
			rollback(conn);
		}
		if(result1*result2 == 0) {
			return -1;
		}
		return result1 * result2;
	}


//-------------------------------------------UPDATE 구역 -------------------------------------------------

	public int updateSkin(int skinId, int price, String reward) {
		Connection conn = getConnection();

		int result = new SkinDao().updateSkin(conn, skinId, price, reward);

		if (result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}

		close(conn);

		return result;
	}
	
	

	public int deleteSkin(int skinId) {
		Connection conn = getConnection();

		int result = new SkinDao().deleteSkin(conn, skinId);

		if (result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}

		close(conn);

		return result;
	}
	
	
	// [han]
	// 유저가 가진 스킨 삭제용
	public int deleteMySkin( String userId, int skinId) {
		Connection conn = getConnection();
		int result = new SkinDao().updateMySkin(conn, userId, skinId);
		
		if(result > 0) {
			commit(conn);
			
		}else {
			rollback(conn);
		}
		return result;
	}
	
	// [지의]
	// 로그인유저 스킨 변경
	public int updateMySkin(String userId, int skinId) {
		Connection conn = getConnection();
		int result = new SkinDao().updateMySkin(conn, userId, skinId);
		
		if(result > 0) {
			commit(conn);
			
		}else {
			rollback(conn);
		}
		return result;
	}
	
	

}
