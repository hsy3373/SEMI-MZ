package mz.board.model.vo;

public class Board {
	private int boardNo;			//	BOARD_NO			NUMBER
	private String userId;			//	USER_ID 			VARCHAR2(20 BYTE)
	private String receiveId;		//	RECEIVE_ID 			VARCHAR2(20 BYTE)
	private String boardTitle;		//	BOARD_TITLE 		NVARCHAR2(15 CHAR)
	private String boardContent;	//	BOARD_CONTENT 		NVARCHAR2(500 CHAR)
	private String secret;			//	SECRET 				CHAR(1 BYTE)
	private String createDate;		//	CREATE_DATE 		DATE
	private int skinId;				//  SKIN_ID	-> 상세조회에서 작성자 스킨이미지 필요함
	private String nickName;		//	NICKNAME -> 조회시 닉네임이 보여짐
	
	public Board() {
		super();
	}
	

	// 전체 방명록 조회 - selectBoardList
	public Board(int boardNo, String userId, String receiveId, String boardTitle, String secret, String createDate,
			String nickName) {
		super();
		this.boardNo = boardNo;
		this.userId = userId;
		this.receiveId = receiveId;
		this.boardTitle = boardTitle;
		this.secret = secret;
		this.createDate = createDate;
		this.nickName = nickName;
	}
	
	
	// 내마이룸 - 방명록 상세 조회 - selectBoard
	public Board(int boardNo, String userId, String receiveId, String boardTitle, String boardContent, String secret,
			String createDate, int skinId, String nickName) {
		super();
		this.boardNo = boardNo;
		this.userId = userId;
		this.receiveId = receiveId;
		this.boardTitle = boardTitle;
		this.boardContent = boardContent;
		this.secret = secret;
		this.createDate = createDate;
		this.skinId = skinId;
		this.nickName = nickName;
	}
	
	// 방명록 수정
	public Board(int boardNo, String boardTitle, String boardContent, String secret) {
		super();
		this.boardNo = boardNo;
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

	public int getSkinId() {
		return skinId;
	}

	public void setSkinId(int skinId) {
		this.skinId = skinId;
	}
	
	
	

	public String getNickName() {
		return nickName;
	}



	public void setNickName(String nickName) {
		this.nickName = nickName;
	}



	@Override
	public String toString() {
		return "Board [boardNo=" + boardNo + ", userId=" + userId + ", receiveId=" + receiveId + ", boardTitle="
				+ boardTitle + ", boardContent=" + boardContent + ", secret=" + secret + ", createDate=" + createDate
				+ ", skinId=" + skinId + ", nickName=" + nickName + "]";
	}







	
}
