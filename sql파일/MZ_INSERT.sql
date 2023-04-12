



-- CHARACTER_SKIN
INSERT INTO CHARACTER_SKIN(SKIN_ID,
                            SAVE_ROOT,
                            CHARACTER_PRICE)
        VALUES( 0, '/resource/img/user/skin0', 0);

-- 아래 pl/sql 구문으로 한번에 33개 생성 가능
BEGIN 
    FOR I IN 1..5
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL);
    END LOOP;
END;
/
BEGIN 
    FOR I IN 6..10
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 400);
    END LOOP;
END;
/
BEGIN 
    FOR I IN 11..15
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 500);
    END LOOP;
END;
/
BEGIN 
    FOR I IN 16..20
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 600);
    END LOOP;
END;
/
BEGIN 
    FOR I IN 21..25
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 800);
    END LOOP;
END;
/

BEGIN 
    FOR I IN 26..30
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 1000);
    END LOOP;
END;
/

BEGIN 
    FOR I IN 31..33
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 1200);
    END LOOP;
END;
/


-- 현재 스킨 폴더 34~39번은 특별한 스킨으로 별도로 price 넣어 구문 반복해줘야함
BEGIN 
    FOR I IN 34..39
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 3000 );
    END LOOP;
END;
/


-- 현재 스킨 폴더 40, 41번은 보상용 스킨으로 별도로 구문 반복해줘야함
BEGIN 
    FOR I IN 40..41
    LOOP 
        INSERT INTO CHARACTER_SKIN(SKIN_ID, SAVE_ROOT, CHARACTER_PRICE, REWARD)
		VALUES( SEQ_SKIN.NEXTVAL , '/resource/img/user/skin'||SEQ_SKIN.CURRVAL, 3000, 'Y' );
    END LOOP;
END;
/

    COMMIT;


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
                'x61Ey612Kl2gpFL56FT9weDnpSo4AV8j8+qx2AuTHdRyY036xxzTTrw10Wq3+4qQyB+XURPWx1ONxp3Y3pB37A==',
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


