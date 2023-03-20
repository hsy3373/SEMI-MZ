﻿CREATE TABLE "GAME" (
	"GAME_TITLE"	VARCHAR2(20)		NOT NULL,
	"PAYMENT_COIN"	NUMBER	DEFAULT 100	NOT NULL
);

COMMENT ON COLUMN "GAME"."GAME_TITLE" IS '게임명(pk)';

COMMENT ON COLUMN "GAME"."PAYMENT_COIN" IS '클리어시 지급 코인량';

CREATE TABLE "HEART" (
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"RECEIVE_ID"	VARCHAR2(20)		NOT NULL,
	"CREATE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "HEART"."USER_ID" IS '호감도를 준 사람(fk)';

COMMENT ON COLUMN "HEART"."RECEIVE_ID" IS '호감도를 받은 사람(fk)';

COMMENT ON COLUMN "HEART"."CREATE_DATE" IS '호감도 준 시간';

CREATE TABLE "FRIEND" (
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"FRIEND_ID"	VARCHAR2(20)		NOT NULL
);

COMMENT ON COLUMN "FRIEND"."USER_ID" IS '본인ID(pk)';

COMMENT ON COLUMN "FRIEND"."FRIEND_ID" IS '친구ID(pk)';

CREATE TABLE "GAME_RANK" (
	"GAME_TITLE"	VARCHAR2(20)		NOT NULL,
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"GAME_SCORE"	NUMBER		NOT NULL,
	"CREATE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "GAME_RANK"."GAME_TITLE" IS '게임이름(pk)';

COMMENT ON COLUMN "GAME_RANK"."USER_ID" IS '유저ID(pk)';

COMMENT ON COLUMN "GAME_RANK"."GAME_SCORE" IS '가장높은점수';

COMMENT ON COLUMN "GAME_RANK"."CREATE_DATE" IS '날짜';

CREATE TABLE "MEMBER" (
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"USER_PWD"	VARCHAR2		NOT NULL,
	"NICKNAME"	NVARCHAR2(8)	UNIQUE	NOT NULL,
	"SKIN_ID"	NUMBER		NOT NULL,
	"COIN"	NUMBER(4)	DEFAULT 500	NOT NULL,
	"GENDER"	VARCHAR2(1)	DEFAULT N	NOT NULL,
	"SELF_INFO"	VARCHAR2(300)		NULL,
	"ENROLL_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "MEMBER"."USER_ID" IS '유저ID(pk)';

COMMENT ON COLUMN "MEMBER"."USER_PWD" IS '암호화된 PW';

COMMENT ON COLUMN "MEMBER"."GENDER" IS 'CHECK(M,W,N)';

COMMENT ON COLUMN "MEMBER"."SELF_INFO" IS '유저 자기소개';

COMMENT ON COLUMN "MEMBER"."COIN" IS '유저가 가진 코인';

COMMENT ON COLUMN "MEMBER"."NICKNAME" IS '닉네임(UNIQUEKEY)';

COMMENT ON COLUMN "MEMBER"."ENROLL_DATE" IS '디폴트 현재시간';

COMMENT ON COLUMN "MEMBER"."SKIN_ID" IS '현재 적용중인 스킨 ID';

CREATE TABLE "CHARACTER_SKIN" (
	"SKIN_ID"	NUMBER		NOT NULL,
	"SAVE_ROOT"	VARCHAR2	UNIQUE	NOT NULL,
	"CHARACTER_PRICE"	NUMBER	DEFAULT 300	 NOT NULL
);

COMMENT ON COLUMN "CHARACTER_SKIN"."SKIN_ID" IS '시퀀스자동생성(pk)';

COMMENT ON COLUMN "CHARACTER_SKIN"."SAVE_ROOT" IS '폴더경로';

COMMENT ON COLUMN "CHARACTER_SKIN"."CHARACTER_PRICE" IS '캐릭터 가격 코인금액';

CREATE TABLE "CANCELLATION" (
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"CANCELLATION_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "CANCELLATION"."USER_ID" IS '유저ID(pk)';

COMMENT ON COLUMN "CANCELLATION"."CANCELLATION_DATE" IS '탈퇴 날짜';

CREATE TABLE "CHATTING" (
	"CHAT_NO"	NUMBER		NOT NULL,
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"RECEIVE_ID"	VARCHAR2(20)		NOT NULL,
	"CONTENT"	NVARCHAR2(30)		NOT NULL,
	"CREATE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "CHATTING"."CHAT_NO" IS '시퀀스자동생성(pk)';

COMMENT ON COLUMN "CHATTING"."CONTENT" IS '채팅내용';

COMMENT ON COLUMN "CHATTING"."CREATE_DATE" IS '채팅작성시간';

COMMENT ON COLUMN "CHATTING"."USER_ID" IS '보낸사람ID(fk)';

COMMENT ON COLUMN "CHATTING"."RECEIVE_ID" IS '받는사람ID(fk)';

CREATE TABLE "CHARACTER" (
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"SKIN_ID"	NUMBER		NOT NULL
);

COMMENT ON COLUMN "CHARACTER"."USER_ID" IS '유저ID(pk)';

COMMENT ON COLUMN "CHARACTER"."SKIN_ID" IS '캐릭터 스킨ID(pk)';

CREATE TABLE "NOTICE" (
	"NOTICE_NO"	NUMBER		NOT NULL,
	"NOTICE_TITLE"	VARCHAR2		NOT NULL,
	"NOTICE_CONTENT"	VARCHAR2		NOT NULL,
	"CREATE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "NOTICE"."NOTICE_NO" IS '시퀀스자동생성(pk)';

COMMENT ON COLUMN "NOTICE"."NOTICE_TITLE" IS '공지사항 제목';

COMMENT ON COLUMN "NOTICE"."NOTICE_CONTENT" IS '공지사항 내용';

COMMENT ON COLUMN "NOTICE"."CREATE_DATE" IS '등록 시간';

CREATE TABLE "BLOCK" (
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"BLOCK_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "BLOCK"."USER_ID" IS '유저ID(pk)';

COMMENT ON COLUMN "BLOCK"."BLOCK_DATE" IS '차단 날짜';

CREATE TABLE "BOARD" (
	"BOARD_NO"	NUMBER		NOT NULL,
	"USER_ID"	NUMBER		NOT NULL,
	"RECEIVE_ID"	NUMBER		NOT NULL,
	"BOARD_TITLE"	NVARCHAR2(15)		NOT NULL,
	"BOARD_CONTENT"	NVARCHAR2(500)		NOT NULL,
	"SECRET"	VARCHAR2(1)	DEFAULT N	NOT NULL,
	"CREATE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "BOARD"."BOARD_NO" IS '시퀀스자동생성(pk)';

COMMENT ON COLUMN "BOARD"."BOARD_TITLE" IS '방명록 제목';

COMMENT ON COLUMN "BOARD"."BOARD_CONTENT" IS '방명록 내용';

COMMENT ON COLUMN "BOARD"."CREATE_DATE" IS '작성 시간';

COMMENT ON COLUMN "BOARD"."SECRET" IS 'CHECK(N,Y)';

COMMENT ON COLUMN "BOARD"."USER_ID" IS '작성자ID(fk)';

COMMENT ON COLUMN "BOARD"."RECEIVE_ID" IS '받는사람ID(fk)';

CREATE TABLE "LOGIN_API" (
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"API_KIND"	VARCHAR2		NOT NULL,
	"API_KEY"	VARCHAR2		NOT NULL
);

COMMENT ON COLUMN "LOGIN_API"."USER_ID" IS '유저ID(pk)';

COMMENT ON COLUMN "LOGIN_API"."API_KIND" IS '구글/카카오';

COMMENT ON COLUMN "LOGIN_API"."API_KEY" IS '받아온키';

CREATE TABLE "REPORT" (
	"REPORT_NO"	NUMBER		NOT NULL,
	"USER_ID"	VARCHAR2(20)		NOT NULL,
	"RECEIVE_ID"	VARCHAR2(20)		NOT NULL,
	"REPORT_TITLE"	NVARCHAR2(20)		NOT NULL,
	"REPORT_CONTENT"	NVARCHAR2(300)		NOT NULL,
	"CREATE_DATE"	DATE	DEFAULT SYSDATE	NOT NULL
);

COMMENT ON COLUMN "REPORT"."REPORT_NO" IS '시퀀스자동생성(pk)';

COMMENT ON COLUMN "REPORT"."USER_ID" IS '신고자ID(fk)';

COMMENT ON COLUMN "REPORT"."RECEIVE_ID" IS '대상자ID(fk)';

COMMENT ON COLUMN "REPORT"."REPORT_TITLE" IS '신고 제목';

COMMENT ON COLUMN "REPORT"."REPORT_CONTENT" IS '신고 내용';

COMMENT ON COLUMN "REPORT"."CREATE_DATE" IS '신고 등록 시간';

ALTER TABLE "GAME" ADD CONSTRAINT "PK_GAME" PRIMARY KEY (
	"GAME_TITLE"
);

ALTER TABLE "FRIEND" ADD CONSTRAINT "PK_FRIEND" PRIMARY KEY (
	"USER_ID",
	"FRIEND_ID"
);

ALTER TABLE "GAME_RANK" ADD CONSTRAINT "PK_GAME_RANK" PRIMARY KEY (
	"GAME_TITLE",
	"USER_ID"
);

ALTER TABLE "MEMBER" ADD CONSTRAINT "PK_MEMBER" PRIMARY KEY (
	"USER_ID"
);

ALTER TABLE "CHARACTER_SKIN" ADD CONSTRAINT "PK_CHARACTER_SKIN" PRIMARY KEY (
	"SKIN_ID"
);

ALTER TABLE "CANCELLATION" ADD CONSTRAINT "PK_CANCELLATION" PRIMARY KEY (
	"USER_ID"
);

ALTER TABLE "CHATTING" ADD CONSTRAINT "PK_CHATTING" PRIMARY KEY (
	"CHAT_NO"
);

ALTER TABLE "CHARACTER" ADD CONSTRAINT "PK_CHARACTER" PRIMARY KEY (
	"USER_ID",
	"SKIN_ID"
);

ALTER TABLE "NOTICE" ADD CONSTRAINT "PK_NOTICE" PRIMARY KEY (
	"NOTICE_NO"
);

ALTER TABLE "BLOCK" ADD CONSTRAINT "PK_BLOCK" PRIMARY KEY (
	"USER_ID"
);

ALTER TABLE "BOARD" ADD CONSTRAINT "PK_BOARD" PRIMARY KEY (
	"BOARD_NO"
);

ALTER TABLE "LOGIN_API" ADD CONSTRAINT "PK_LOGIN_API" PRIMARY KEY (
	"USER_ID"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "PK_REPORT" PRIMARY KEY (
	"REPORT_NO"
);

ALTER TABLE "HEART" ADD CONSTRAINT "FK_MEMBER_TO_HEART_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "HEART" ADD CONSTRAINT "FK_MEMBER_TO_HEART_2" FOREIGN KEY (
	"RECEIVE_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "FRIEND" ADD CONSTRAINT "FK_MEMBER_TO_FRIEND_1" FOREIGN KEY (
	"FRIEND_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "FRIEND" ADD CONSTRAINT "FK_MEMBER_TO_FRIEND_2" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);


ALTER TABLE "GAME_RANK" ADD CONSTRAINT "FK_GAME_TO_GAME_RANK_1" FOREIGN KEY (
	"GAME_TITLE"
)
REFERENCES "GAME" (
	"GAME_TITLE"
);

ALTER TABLE "GAME_RANK" ADD CONSTRAINT "FK_MEMBER_TO_GAME_RANK_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "MEMBER" ADD CONSTRAINT "FK_CHARACTER_SKIN_TO_MEMBER_1" FOREIGN KEY (
	"SKIN_ID"
)
REFERENCES "CHARACTER_SKIN" (
	"SKIN_ID"
);

ALTER TABLE "CANCELLATION" ADD CONSTRAINT "FK_MEMBER_TO_CANCELLATION_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "CHATTING" ADD CONSTRAINT "FK_MEMBER_TO_CHATTING_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "CHATTING" ADD CONSTRAINT "FK_MEMBER_TO_CHATTING_2" FOREIGN KEY (
	"RECEIVE_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "CHARACTER" ADD CONSTRAINT "FK_MEMBER_TO_CHARACTER_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "CHARACTER" ADD CONSTRAINT "FK_CHARACTER_SKIN_TO_CHARACTER_1" FOREIGN KEY (
	"SKIN_ID"
)
REFERENCES "CHARACTER_SKIN" (
	"SKIN_ID"
);

ALTER TABLE "BLOCK" ADD CONSTRAINT "FK_MEMBER_TO_BLOCK_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "BOARD" ADD CONSTRAINT "FK_MEMBER_TO_BOARD_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "BOARD" ADD CONSTRAINT "FK_MEMBER_TO_BOARD_2" FOREIGN KEY (
	"RECEIVE_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "LOGIN_API" ADD CONSTRAINT "FK_MEMBER_TO_LOGIN_API_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "FK_MEMBER_TO_REPORT_1" FOREIGN KEY (
	"USER_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

ALTER TABLE "REPORT" ADD CONSTRAINT "FK_MEMBER_TO_REPORT_2" FOREIGN KEY (
	"RECEIVE_ID"
)
REFERENCES "MEMBER" (
	"USER_ID"
);

