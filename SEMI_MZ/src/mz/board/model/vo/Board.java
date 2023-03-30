package mz.board.model.vo;

public class Board {
	private int boardNo;			//	BOARD_NO			NUMBER
	private String userId;			//	USER_ID 			VARCHAR2(20 BYTE)
	private String receiveId;		//	RECEIVE_ID 			VARCHAR2(20 BYTE)
	private String boardTitle;		//	BOARD_TITLE 		NVARCHAR2(15 CHAR)
	private String boardContent;	//	BOARD_CONTENT 		NVARCHAR2(500 CHAR)
	private String secret;			//	SECRET 				CHAR(1 BYTE)
	private String createDate;		//	CREATE_DATE 		DATE
	
	public Board() {
		super();
	}

	public Board(int boardNo, String userId, String receiveId, String boardTitle, String boardContent, String secret,
			String createDate) {
		super();
		this.boardNo = boardNo;
		this.userId = userId;
		this.receiveId = receiveId;
		this.boardTitle = boardTitle;
		this.boardContent = boardContent;
		this.secret = secret;
		this.createDate = createDate;
	}
	
	

	public Board(int boardNo, String userId, String receiveId, String boardTitle, String createDate) {
		super();
		this.boardNo = boardNo;
		this.userId = userId;
		this.receiveId = receiveId;
		this.boardTitle = boardTitle;
		this.createDate = createDate;
	}
	
	

	public Board(int boardNo, String boardTitle, String boardContent, String secret) {
		super();
		this.boardNo = boardNo;
		this.boardTitle = boardTitle;
		this.boardContent = boardContent;
		this.secret = secret;
	}
	
	

	public Board(String boardTitle, String boardContent, String secret) {
		super();
		this.boardTitle = boardTitle;
		this.boardContent = boardContent;
		this.secret = secret;
	}


	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
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

	public String getBoardTitle() {
		return boardTitle;
	}

	public void setBoardTitle(String boardTitle) {
		this.boardTitle = boardTitle;
	}

	public String getBoardContent() {
		return boardContent;
	}

	public void setBoardContent(String boardContent) {
		this.boardContent = boardContent;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	@Override
	public String toString() {
		return "Board [boardNo=" + boardNo + ", userId=" + userId + ", receiveId=" + receiveId + ", boardTitle="
				+ boardTitle + ", boardContent=" + boardContent + ", secret=" + secret + ", createDate=" + createDate
				+ "]";
	}


	
}
