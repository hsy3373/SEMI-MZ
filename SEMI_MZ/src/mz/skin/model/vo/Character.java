package mz.skin.model.vo;

// [지의]
public class Character {

	private String userId;	//USER_ID	VARCHAR2(20 BYTE)
	private int skinId;		//SKIN_ID	NUMBER
	
	public Character() {
		super();
	}
	public Character(String userId, int skinId) {
		super();
		this.userId = userId;
		this.skinId = skinId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getSkinId() {
		return skinId;
	}
	public void setSkinId(int skinId) {
		this.skinId = skinId;
	}
	@Override
	public String toString() {
		return "Character [userId=" + userId + ", skinId=" + skinId + "]";
	}
	
	
}
