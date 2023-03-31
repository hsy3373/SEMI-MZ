package mz.report.model.vo;

import java.sql.Date;

public class Report {

	private int reportNo; //	REPORT_NO
	private String userId; //	USER_ID
	private String receiveId; //	RECEIVE_ID
	private String reportTitle; //	REPORT_TITLE
	private String reportContent; //	REPORT_CONTENT
	private Date createDate;//	CREATE_DATE
	
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

	@Override
	public String toString() {
		return "Report [reportNo=" + reportNo + ", userId=" + userId + ", receiveId=" + receiveId + ", reportTitle="
				+ reportTitle + ", reportContent=" + reportContent + ", createDate=" + createDate + "]";
	}
	
}
