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



	public String getSaveRoot() {
		return saveRoot;
	}
	
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
