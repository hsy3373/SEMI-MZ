package mz.character.model.service;

import java.io.File;
import static mz.common.JDBCTemplate.*;
import java.net.http.HttpRequest;
import java.sql.Connection;

import mz.character.model.dao.CharacterDao;

public class CharacterService {

	//[han]
	// 폴더 경로 생성용
	public boolean createFolder(String path) {
		boolean result = false;
		File Folder = new File(path);

		// 해당 디렉토리가 없다면 디렉토리를 생성.
		if (!Folder.exists()) {
			try {
				result = Folder.mkdir(); // 폴더 생성합니다. ("새폴더"만 생성)
				System.out.println("폴더 생성 : "+result);
			} catch (Exception e) {
				e.getStackTrace();
			}
		} else {
			System.out.println("폴더가 이미 존재합니다..");
		}

		return result;
	}

	//[han]
	// 폴더 삭제용
	public boolean deleteFolder(String path) {
		boolean result = false;
		File folder = new File(path);
		try {
			while (folder.exists()) {
				File[] folder_list = folder.listFiles(); // 파일리스트 얻어오기

				//해당 폴더 안에 파일이 있다면 폴더가 삭제되지 않으므로 각개별로 파일 삭제 필요
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
	
	
	
//-------------------------------------------INSERT 구역 -------------------------------------------------
	
	public int insertSkin() {
		
		Connection conn = getConnection();
		
		int result = new CharacterDao().insertSkin(conn);
		
		if(result > 0) {
			commit(conn);
			result = new CharacterDao().selectSkinCurval(conn);
		}else {
			rollback(conn);
		}
		
		
		return result;
	}
	
	
}
