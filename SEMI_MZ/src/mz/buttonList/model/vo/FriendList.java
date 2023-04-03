package mz.buttonList.model.vo;

public class FriendList {

	private String userId; //USER_ID
	private String friendId; //FRIEND_ID
	

	
	public FriendList() {
		super();
		// TODO Auto-generated constructor stub
	}



	public FriendList(String userId, String friendId) {
		super();
		this.userId = userId;
		this.friendId = friendId;
	}


	public String getUserId() {
		return userId;
	}



	public void setUserId(String userId) {
		this.userId = userId;
	}



	public String getFriendId() {
		return friendId;
	}



	public void setFriendId(String friendId) {
		this.friendId = friendId;
	}



	@Override
	public String toString() {
		return "FriendList [userId=" + userId + ", friendId=" + friendId + "]";
	}
	
	
	
}
