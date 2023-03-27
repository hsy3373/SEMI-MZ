package mz.chatting.model.vo;

import java.sql.Date;

//[han]
public class Chat {
	private int chatNo;				//	CHAT_NO
	private String userId;			//	USER_ID
	private String receiveId;		//	RECEIVE_ID
	private String content;			//	CONTENT
	private Date date;				//	CREATE_DATE
	
	
	public Chat() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Chat(int chatNo, String userId, String receiveId, String content, Date date) {
		super();
		this.chatNo = chatNo;
		this.userId = userId;
		this.receiveId = receiveId;
		this.content = content;
		this.date = date;
	}



	@Override
	public String toString() {
		return "Chat [chatNo=" + chatNo + ", userId=" + userId + ", receiveId=" + receiveId + ", content=" + content
				+ ", date=" + date + "]";
	}


	public int getChatNo() {
		return chatNo;
	}


	public void setChatNo(int chatNo) {
		this.chatNo = chatNo;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getReceiveId() {
		return receiveId;
	}


	public void setReceiveId(String receiveId) {
		this.receiveId = receiveId;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}

	
	
	
}
