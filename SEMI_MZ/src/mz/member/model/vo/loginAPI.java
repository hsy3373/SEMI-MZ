package mz.member.model.vo;

//[김혜린]
public class loginAPI {
	private String userId;		//USER_ID	VARCHAR2(20 BYTE)
	private String apiKind;		//API_KIND	NVARCHAR2(5 CHAR)
	private String apiKey;//API_KEY	NVARCHAR2(300 CHAR)
	
	public loginAPI() {
		super();
	}

	public loginAPI(String userId, String apiKind, String apiKey) {
		super();
		this.userId = userId;
		this.apiKind = apiKind;
		this.apiKey = apiKey;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getApiKind() {
		return apiKind;
	}

	public void setApiKind(String apiKind) {
		this.apiKind = apiKind;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	@Override
	public String toString() {
		return "loginAPI [userId=" + userId + ", apiKind=" + apiKind + ", apiKey=" + apiKey + "]";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
