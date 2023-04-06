 package mz.report.model.vo;

import java.sql.Date;

import mz.member.model.vo.Member;

public class Report {

	private int reportNo; //	REPORT_NO
	private String userId; //	USER_ID
	private String receiveId; //	RECEIVE_ID
	private String reportTitle; //	REPORT_TITLE
	private String reportContent; //	REPORT_CONTENT
	private Date createDate;//	CREATE_DATE
	
	//[han] 관리자페이지용 포맷된 데이트값
	private String formatDate;
	//[han] 관리자페이지 신고용 
	private Member user, receiver;
	
	public Report() {
		super();
	}

	public Report(int reportNo, String userId, String receiveId, String reportTitle, String reportContent,
			Date createDate) {
		super();
		this.reportNo = reportNo;
		this.userId = userId;
		this.receiveId = receiveId;
		this.reportTitle = reportTitle;
		this.reportContent = reportContent;
		this.createDate = createDate;
	}
	
	
	

	public Report(int reportNo, String userId, String receiveId, String reportTitle, String reportContent,
			String formatDate) {
		super();
		this.reportNo = reportNo;
		this.userId = userId;
		this.receiveId = receiveId;
		this.reportTitle = reportTitle;
		this.reportContent = reportContent;
		this.formatDate = formatDate;
	}

	public int getReportNo() {
		return reportNo;
	}

	public void setReportNo(int reportNo) {
		this.reportNo = reportNo;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getReceiveId() {
		return receiveId;
	}

	public void setReceiveId(String receiveId) {
		this.receiveId = receiveId;
	}

	public String getReportTitle() {
		return reportTitle;
	}

	public void setReportTitle(String reportTitle) {
		this.reportTitle = reportTitle;
	}

	public String getReportContent() {
		return reportContent;
	}

	public void setReportContent(String reportContent) {
		this.reportContent = reportContent;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	

	public String getFormatDate() {
		return formatDate;
	}

	public void setFormatDate(String formatDate) {
		this.formatDate = formatDate;
	}
	
	

	public Member getUser() {
		return user;
	}

	public void setUser(Member user) {
		this.user = user;
	}

	public Member getReceiver() {
		return receiver;
	}

	public void setReceiver(Member receiver) {
		this.receiver = receiver;
	}

	@Override
	public String toString() {
		return "Report [reportNo=" + reportNo + ", userId=" + userId + ", receiveId=" + receiveId + ", reportTitle="
				+ reportTitle + ", reportContent=" + reportContent + ", createDate=" + createDate + "]";
	}
	
}
