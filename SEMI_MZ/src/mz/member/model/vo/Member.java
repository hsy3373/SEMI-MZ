package mz.member.model.vo;

import java.sql.Date;

public class Member {
	private String userId;		//	USER_ID	VARCHAR2(20 BYTE)
	private String userPwd;		//	USER_PWD	NVARCHAR2(300 CHAR)
	private String nicName;		//	NICKNAME	NVARCHAR2(8 CHAR)
	private String status;		//	STATUS	CHAR(1 BYTE)
	private int skinId;			//	SKIN_ID	NUMBER
	private int coin;			//	COIN	NUMBER(4,0)
	private String info;		//	SELF_INFO	VARCHAR2(300 BYTE)
	private String gender;		//	GENDER	CHAR(1 BYTE)
	private Date date;			//	ENROLL_DATE	DATE
	

	//[han] 시간까지 받아오는 용도의 데이트
	private String formatDate;
	//[han] api종류 받아오는 용도
	private String apiKind;
	//[han] 비활성화 된 시간 받아오는 용도
	private String cancellationDate;	// CANCELLATION_DATE
	//[han] 리포트 개수 받아오는 용도 두개
	//USER_COUNT, RECEIVE_COUNT
	private int userReportCount, receiveReportCount;
	
	public Member() {
	}

	public Member(String userId, String userPwd, String nicName) {
		super();
		this.userId = userId;
		this.userPwd = userPwd;
		this.nicName = nicName;
	}

	public Member(String userId, String userPwd, String nicName, String status, int skinId, int coin, String info,
			String gender, Date date) {
		super();
		this.userId = userId;
		this.userPwd = userPwd;
		this.nicName = nicName;
		this.status = status;
		this.skinId = skinId;
		this.coin = coin;
		this.info = info;
		this.gender = gender;
		this.date = date;
	}
	
	// userInfo - 가영
	public Member(String userId, String nicName, int skinId, String info, String gender) {
		super();
		this.userId = userId;
		this.nicName = nicName;
		this.skinId = skinId;
		this.info = info;
		this.gender = gender;
	}
	
	// 호감도 랭킹 - 가영
	//userList - 지영
	public Member(String userId, String nicName, int skinId) {
		super();
		this.userId = userId;
		this.nicName = nicName;
		this.skinId = skinId;
	}

	
	// [han] 어드민 멤버 페이지용
	public Member(String userId, String nicName, String status, int coin, String formatDate, String apiKind,  String cancellationDate ) {
		super();
		this.userId = userId;
		this.nicName = nicName;
		this.status = status;
		this.coin = coin;
		this.formatDate = formatDate;
		this.apiKind = apiKind;
		this.cancellationDate = cancellationDate;
	}
	
	

	// [han] 어드민 멤버 페이지용
	public Member(String userId, String nicName, String status, int skinId, int coin, String info, String gender,
			String formatDate, String apiKind, String cancellationDate) {
		super();
		this.userId = userId;
		this.nicName = nicName;
		this.status = status;
		this.skinId = skinId;
		this.coin = coin;
		this.info = info;
		this.gender = gender;
		this.formatDate = formatDate;
		this.apiKind = apiKind;
		this.cancellationDate = cancellationDate;
	}
	
	
	//[han] 어드민 신고창 페이지용
	public Member(String userId, String nicName, String status, int userReportCount, int receiveReportCount) {
		super();
		this.userId = userId;
		this.nicName = nicName;
		this.status = status;
		this.userReportCount = userReportCount;
		this.receiveReportCount = receiveReportCount;
	}
	

	@Override
	public String toString() {
		return "Member [userId=" + userId + ", userPwd=" + userPwd + ", nicName=" + nicName + ", status=" + status
				+ ", skinId=" + skinId + ", coin=" + coin + ", info=" + info + ", gender=" + gender + ", date=" + date
				+ "]";
	}



	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getUserPwd() {
		return userPwd;
	}


	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}


	public String getNicName() {
		return nicName;
	}


	public void setNicName(String nicName) {
		this.nicName = nicName;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public int getSkinId() {
		return skinId;
	}


	public void setSkinId(int skinId) {
		this.skinId = skinId;
	}


	public int getCoin() {
		return coin;
	}


	public void setCoin(int coin) {
		this.coin = coin;
	}


	public String getInfo() {
		return info;
	}


	public void setInfo(String info) {
		this.info = info;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public String getFormatDate() {
		return formatDate;
	}


	public void setFormatDate(String formatDate) {
		this.formatDate = formatDate;
	}

	public String getApiKind() {
		return apiKind;
	}

	public void setApiKind(String apiKind) {
		this.apiKind = apiKind;
	}

	public String getCancellationDate() {
		return cancellationDate;
	}

	public void setCancellationDate(String cancellationDate) {
		this.cancellationDate = cancellationDate;
	}

	public int getUserReportCount() {
		return userReportCount;
	}

	public void setUserReportCount(int userReportCount) {
		this.userReportCount = userReportCount;
	}

	public int getReceiveReportCount() {
		return receiveReportCount;
	}

	public void setReceiveReportCount(int receiveReportCount) {
		this.receiveReportCount = receiveReportCount;
	}
	
	
	
	
	
	
	
}
