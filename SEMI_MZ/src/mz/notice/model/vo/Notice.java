package mz.notice.model.vo;

import java.sql.Date;
import java.text.SimpleDateFormat;

//[han]
public class Notice {

	private int noticeNo; 	// NOTICE_NO
	private String title; 	// NOTICE_TITLE
	private String content; // NOTICE_CONTENT
	
	// 시간까지 받아와야 하므로 스트링 형태로 잡았음
	private String date; 		// CREATE_DATE

	public Notice() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Notice(int noticeNo, String title, String content, String date) {
		super();
		this.noticeNo = noticeNo;
		this.title = title;
		this.content = content;
		this.date = date;
	}

	@Override
	public String toString() {
		return "Notice [noticeNo=" + noticeNo + ", title=" + title + ", content=" + content + ", date=" + date + "]";
	}

	public int getNoticeNo() {
		return noticeNo;
	}

	public void setNoticeNo(int noticeNo) {
		this.noticeNo = noticeNo;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDate() {
		return date;
	}
	
	//[han]
	// 시간 제외 날짜만 표시하는 게터
	public String getDateExceptTime() {
		String str = date.split(" ")[0];
		return str;
	}

	public void setDate(String date) {
		this.date = date;
	}

}
