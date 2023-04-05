package mz.skin.model.vo;

//[han]
public class Skin {
	
	private int skinId;		//	SKIN_ID
	private String saveRoot;	//	SAVE_ROOT
	private int price;		//	CHARACTER_PRICE
	private String reward;	//	REWARD

	
	
	public Skin() {
		super();
		// TODO Auto-generated constructor stub
	}


	

	public Skin(String saveRoot, int price, String reward) {
		super();
		this.saveRoot = saveRoot;
		this.price = price;
		this.reward = reward;
	}




	public Skin(int skinId, String saveRoot, int price, String reward) {
		super();
		this.skinId = skinId;
		this.saveRoot = saveRoot;
		this.price = price;
		this.reward = reward;
	}



	public Skin(int skinId, String saveRoot) {
		super();
		this.skinId = skinId;
		this.saveRoot = saveRoot;
	}




	@Override
	public String toString() {
		return "Skin [skinId=" + skinId + ", saveRoot=" + saveRoot + ", price=" + price + ", reward=" + reward + "]";
	}



	public int getSkinId() {
		return skinId;
	}



	public void setSkinId(int skinId) {
		this.skinId = skinId;
	}


	// 전체 저장 경로 다 반환
	public String getSaveRoot() {
		return saveRoot;
	}
	
	// 저장된 폴더명만 반환하도록 추가로 만든 게터
 	public String getSaveFolder() {
 		return saveRoot.substring(saveRoot.lastIndexOf("/") + 1);
 	};



	public void setSaveRoot(String saveRoot) {
		this.saveRoot = saveRoot;
	}



	public int getPrice() {
		return price;
	}



	public void setPrice(int price) {
		this.price = price;
	}



	public String getReward() {
		return reward;
	}



	public void setReward(String reward) {
		this.reward = reward;
	}
	
	
	

}
