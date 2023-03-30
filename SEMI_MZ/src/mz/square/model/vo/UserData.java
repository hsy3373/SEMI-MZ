package mz.square.model.vo;

public class UserData {
	
	private String uesrX;
	private String uesrY;
	private String userSkin;
	private String userId;
	private String userName;
	private String keyboardCode;
	private String connecting;
	
	public UserData() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public UserData(String uesrX, String uesrY, String userSkin, String userId, String userName, String keyboardCode, String connecting) {
		super();
		this.uesrX = uesrX;
		this.uesrY = uesrY;
		this.userSkin = userSkin;
		this.userId = userId;
		this.userName = userName;
		this.keyboardCode = keyboardCode;
		this.connecting = connecting;
	}



	public String getUesrX() {
		return uesrX;
	}



	public void setUesrX(String uesrX) {
		this.uesrX = uesrX;
	}



	public String getUesrY() {
		return uesrY;
	}



	public void setUesrY(String uesrY) {
		this.uesrY = uesrY;
	}



	public String getUserSkin() {
		return userSkin;
	}



	public void setUserSkin(String userSkin) {
		this.userSkin = userSkin;
	}



	public String getUserId() {
		return userId;
	}



	public void setUserId(String userId) {
		this.userId = userId;
	}



	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



	public String getKeyboardCode() {
		return keyboardCode;
	}



	public void setKeyboardCode(String keyboardCode) {
		this.keyboardCode = keyboardCode;
	}



	public String getConnecting() {
		return connecting;
	}



	public void setConnecting(String connecting) {
		this.connecting = connecting;
	}



	@Override
	public String toString() {
		return "UserData [uesrX=" + uesrX + ", uesrY=" + uesrY + ", userSkin=" + userSkin + ", userId=" + userId
				+ ", userName=" + userName + ", keyboardCode=" + keyboardCode + ", connecting=" + connecting + "]";
	}



	
	
	
	
	 
}
