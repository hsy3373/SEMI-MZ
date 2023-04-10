package mz.skin.model.vo;

// [지의]
public class Character {

	private String userId;		//USER_ID	VARCHAR2(20 BYTE)
	private int skinId;			//SKIN_ID	NUMBER
	private String saveRoot;	//	SAVE_ROOT
	
	public Character() {
		super();
	}
	
	public Character(String userId, int skinId) {
		super();
		this.userId = userId;
		this.skinId = skinId;
	}
	
	public Character(int skinId, String saveRoot) {
		super();
		this.skinId = skinId;
		this.saveRoot = saveRoot;
	}

	public Character(String userId, int skinId, String saveRoot) {
		super();
		this.userId = userId;
		this.skinId = skinId;
		this.saveRoot = saveRoot;
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
	public String getSaveRoot() {
		return saveRoot;
	}
	public void setSaveRoot(String saveRoot) {
		this.saveRoot = saveRoot;
	}
	@Override
	public String toString() {
		return "Character [userId=" + userId + ", skinId=" + skinId + ", saveRoot=" + saveRoot + "]";
	}

	
	
	
}
