package mz.square.model.vo;

public class UserData {
	
	private String uesrX;
	private String uesrY;
	private String userSkin;
	private String userId;
	
	public UserData() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getUesrX() {
		return uesrX;
	}

	public void setUesrX(String uesrX) {
		this.uesrX = uesrX;
	}

	public String getUserY() {
		return uesrY;
	}

	public void setUserY(String userY) {
		this.uesrY = userY;
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

	@Override
	public String toString() {
		return "UserData [uesrX=" + uesrX + ", userY=" + uesrY + ", userSkin=" + userSkin + ", userId=" + userId + "]";
	}
	
	
	
	 
}
