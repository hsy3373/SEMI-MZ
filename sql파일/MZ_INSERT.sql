



-- CHARACTER_SKIN
INSERT INTO CHARACTER_SKIN(SKIN_ID,
                            SAVE_ROOT,
                            CHARACTER_PRICE)
        VALUES( 0, '/resource/img/user/0_default', 0);


-- todo!!!! 현재 스킨 폴더가 skin33 까지 있으므로 SEQ_SKIN이 33이 될때까지 아래 insert 구문 반복해줘야함
--INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT)
--		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL );


-- MEMBER
INSERT INTO MEMBER( USER_ID,
                    USER_PWD,
                    NICKNAME )
        VALUES ( 'test',
                'test',
                'NIC_test');
INSERT INTO MEMBER( USER_ID,
                    USER_PWD,
                    NICKNAME )
        VALUES ( 'friend',
                'friend',
                'NIC_fri');
INSERT INTO MEMBER( USER_ID,
                    USER_PWD,
                    NICKNAME )
        VALUES ( 'admin',
                'admin',
                '관리자');
      
-- BOARD

INSERT INTO BOARD( BOARD_NO,
                    USER_ID,
                    RECEIVE_ID,
                    BOARD_TITLE,
                    BOARD_CONTENT) 
        VALUES( SEQ_BOARD.NEXTVAL, 
                'test', 
                'friend', 
                'BOARD_TITLE', 
                '내용내용내용');

INSERT INTO BOARD( BOARD_NO,
                    USER_ID,
                    RECEIVE_ID,
                    BOARD_TITLE,
                    BOARD_CONTENT) 
        VALUES( SEQ_BOARD.NEXTVAL, 
                'test', 
                'friend', 
                'BOARD_TITLE2', 
                '내용내용내용2');
                
INSERT INTO BOARD( BOARD_NO,
                    USER_ID,
                    RECEIVE_ID,
                    BOARD_TITLE,
                    BOARD_CONTENT) 
        VALUES( SEQ_BOARD.NEXTVAL,
                'friend', 
                'test', 
                'TITLE33', 
                '내용내용내용33');
                
                
                
-- CHARACTER

INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('test', 0);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('friend', 0);

-- LOGIN_API

INSERT INTO LOGIN_API VALUES('test', '카카오', '가상의 키');
INSERT INTO LOGIN_API VALUES('friend', '구글', '가상의 키');
INSERT INTO LOGIN_API VALUES('admin', '관리자', '관리자');


-- CHATTINGROOM

INSERT INTO CHATTINGROOM VALUES( 'test' , 'friend' );
INSERT INTO CHATTINGROOM VALUES( 'test' , 'admin' );
INSERT INTO CHATTINGROOM VALUES( 'admin' , 'test' );
INSERT INTO CHATTINGROOM VALUES( 'friend' , 'test' );

-- CHATTING

INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'friend' , '안녕', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'friend' , 'test' , '그래안녕', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'friend' , '채팅 보내기테스트중', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'friend' , 'test' , '테스트 잘되니', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'friend' , '일단 해봐야지', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'friend' , 'test' , '이거 보여?', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'friend' , 'ㅇㅇ 보임', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'friend' , 'test' , '엔터도 쳐볼게<br>보여?', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'friend' , 'ㅇㅇㅇ 엔터도 다 보여', SYSDATE);

INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'admin' , '1111', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'admin' , '1111222', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'admin' , '1111333', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'admin' , '1111444', SYSDATE);
INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'test' , 'admin' , '11115555', SYSDATE);

INSERT INTO CHATTING VALUES(SEQ_CHAT.NEXTVAL, 'friend' , 'test' , 'f11115555', SYSDATE);

COMMIT;


