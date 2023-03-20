



-- CHARACTER_SKIN
INSERT INTO CHARACTER_SKIN(SKIN_ID,
                            SAVE_ROOT,
                            CHARACTER_PRICE)
        VALUES( 0, '/root', 0);

INSERT INTO CHARACTER_SKIN(SKIN_ID,
                            SAVE_ROOT)
        VALUES( SEQ_SKIN.NEXTVAL , '/root');

INSERT INTO CHARACTER_SKIN(SKIN_ID,
                            SAVE_ROOT)
        VALUES( SEQ_SKIN.NEXTVAL , '/root');


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
                'admin');
      
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







