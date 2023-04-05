package mz.common;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;


import com.oreilly.servlet.multipart.FileRenamePolicy;

//[han]
//혹시나 파일 이름이 겹쳐서 덮어쓰기 되는 일을 방지하기 위해 모든 업로드 되는 파일 리네임 필요
public class MyFileRenamePolicy implements FileRenamePolicy {
	@Override
	public File rename(File originFile) {
		// 원본 파일명 ("aaa.jpg")
		String originName = originFile.getName();

		// 수정 파일명 : 파일 업로드시간(분초) + 5자리 랜덤값(10000~99999) =>최대한 이름이 겹치지 않게
		// 확장자 : 원본파일명에서 그대로 얻어올 예정

		// 1. 파일 업로드된 시간(분초) => String currentTime;
		String currentTime = new SimpleDateFormat("mmss").format(new Date());

		// 2. 5자리 랜덤값 => int ranNum
		int ranNum = (int) (Math.random() * 90000 + 10000);// 10000 <= random < 100000

		// 3. 원본파일 확장자 => String ext
		/*
		 * 파일명 중간에 .이 들어가는 경우가 있기 때문에 원본파일명에서 가장 마지막 . 의 인덱스를 기준으로 파일명과 확장자를 나눔
		 */
		String ext = originName.substring(originName.lastIndexOf("."));// .jpg, .png ...
		String changeName = currentTime + ranNum + ext; // 2023022011265012345.jpg

		return new File(originFile.getParent(), changeName); // 원본파일을 수정된 파일명으로 적용시켜서 객체 리턴
	}

}
