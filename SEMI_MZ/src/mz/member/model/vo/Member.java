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
	
	
	
	
	
	
}
