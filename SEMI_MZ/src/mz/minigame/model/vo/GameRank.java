package mz.minigame.model.vo;

import java.sql.Date;

public class GameRank {
	
	private String gameTitle;		//	GAME_TITLE
	private String userId;			//	USER_ID
	private int gameScore;			//	GAME_SCORE
	private Date createDate;		//	CREATE_DATE
	
	//날짜 포맷용
	private String formatDate;
	//[han] 랭킹 확인용
	private int rank;
	// [han] 랭킹리스트의 유저들 닉네임 표시용
	private String nicName;

	public GameRank(String gameTitle, String userId, int gameScore, Date createDate) {
		super();
		this.gameTitle = gameTitle;
		this.userId = userId;
		this.gameScore = gameScore;
		this.createDate = createDate;
	}

	
	public GameRank(String userId, String nicName, int gameScore, int rank) {
		super();
		this.userId = userId;
		this.nicName = nicName;
		this.gameScore = gameScore;
		this.rank = rank;
	}

	
	//[han] 게임 랭킹 확인용
	public GameRank(int gameScore, int rank) {
		super();
		this.gameScore = gameScore;
		this.rank = rank;
	}

	@Override
	public String toString() {
		return "GameRank [gameTitle=" + gameTitle + ", userId=" + userId + ", gameScore=" + gameScore + ", createDate="
				+ createDate + ", formatDate=" + formatDate + "]";
	}

	public String getGameTitle() {
		return gameTitle;
	}

	public void setGameTitle(String gameTitle) {
		this.gameTitle = gameTitle;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getGameScore() {
		return gameScore;
	}

	public void setGameScore(int gameScore) {
		this.gameScore = gameScore;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getFormatDate() {
		return formatDate;
	}

	public void setFormatDate(String formatDate) {
		this.formatDate = formatDate;
	}


	public int getRank() {
		return rank;
	}


	public void setRank(int rank) {
		this.rank = rank;
	}


	public String getNicName() {
		return nicName;
	}


	public void setNicName(String nicName) {
		this.nicName = nicName;
	}
	
	
	
	
	
	
}
