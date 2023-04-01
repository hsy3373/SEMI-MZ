package mz.skin.model.service;

import static mz.common.JDBCTemplate.close;
import static mz.common.JDBCTemplate.commit;
import static mz.common.JDBCTemplate.getConnection;
import static mz.common.JDBCTemplate.rollback;

import java.io.File;
import java.sql.Connection;

import mz.skin.model.dao.SkinDao;

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

	public int skinCount() {
		Connection conn = getConnection();

		int result = new SkinDao().skinCount(conn);

		close(conn);

		return result;
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

}
