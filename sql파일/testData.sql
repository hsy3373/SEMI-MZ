
DROP sequence "SEQ_TEST";

CREATE SEQUENCE SEQ_TEST
			INCREMENT BY 1
			START WITH 1
			NOCYCLE;
            

-- 실험용 유저 비밀번호는 모두 'test' 암호화 시킨것으로 통일
BEGIN 
    FOR I IN 1..110
    LOOP 
    -- 실험용 유저 데이터 추가 
        INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME)
		VALUES( 't'||SEQ_TEST.NEXTVAL , '7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==', SEQ_TEST.CURRVAL||'NIC');
        
        INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'kakao', '가상의kakao키');
        
        INSERT INTO CHARACTER(USER_ID, SKIN_ID)
		VALUES( 't'||SEQ_TEST.CURRVAL , 0);
        
        INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME)
		VALUES( 't'||SEQ_TEST.NEXTVAL , '7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==', SEQ_TEST.CURRVAL||'NIC');
        
        INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'google', '가상의google키');
        
        INSERT INTO CHARACTER(USER_ID, SKIN_ID)
		VALUES( 't'||SEQ_TEST.CURRVAL , 0);
    END LOOP;
END;
/

-- 가영
INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME)
VALUES( 'riddl5076', 'Cix5A9mtSQHGA/l511EGmsfi1NlIMr88Vad50mhToxCBDNCFgyHwafm8t0hUgt/bH5H6iivuCllsUHX/5OJTPQ==', '칙촉');

INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
VALUES( 'riddl5076' , 'kakao', '가상의kakao키');

INSERT INTO CHARACTER(USER_ID, SKIN_ID)
VALUES( 'riddl5076' , 0);

-- 지의
INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME, SKIN_ID, COIN)
VALUES('shwldml', '1ynJ0bB1lOsiW1ghDEO1ITmezLscu1th/CqkCqsPthvO7dvOIZLB3Ss1ZSnw5UQ1jpS3NJ0d61XtJRNXnPfZ7w==', '지의', 3, 700);

INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
VALUES('shwldml', 'kakao', '가상의kakao키');

INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 0);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 2);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 3);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 4);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 5);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 8);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 9);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 10);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 12);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 13);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 15);
INSERT INTO CHARACTER(USER_ID, SKIN_ID) VALUES('shwldml' , 16);

BEGIN 
    FOR I IN 1..22
    LOOP 
    -- 실험용 유저 데이터 추가 
        INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME)
		VALUES( 't'||SEQ_TEST.NEXTVAL , '7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==', SEQ_TEST.CURRVAL||'NIC');
        
        INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'kakao', '가상의kakao키');
        
        INSERT INTO CHARACTER(USER_ID, SKIN_ID)
		VALUES( 't'||SEQ_TEST.CURRVAL , 0);
        
        
        INSERT INTO CHATTINGROOM(USER_ID, RECEIVE_ID)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'test');
        
        INSERT INTO CHATTINGROOM(RECEIVE_ID, USER_ID)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'test');

    END LOOP;
END;
/


BEGIN 
    FOR I IN 1..50
    LOOP 
    -- 실험용 유저 데이터 추가 
        INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME, STATUS)
		VALUES( 't'||SEQ_TEST.NEXTVAL , '7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==', SEQ_TEST.CURRVAL||'NIC', 'N');
        
        INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'kakao', '가상의kakao키');
        
        INSERT INTO CHARACTER(USER_ID, SKIN_ID)
		VALUES( 't'||SEQ_TEST.CURRVAL , 0);
        
        INSERT INTO DISABLED_MEMBER(USER_ID, STATUS, CANCELLATION_DATE)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'N', SYSDATE - 15);
        
        INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME, STATUS)
		VALUES( 't'||SEQ_TEST.NEXTVAL , '7iaw3Ur350mqGo7jwQrpkj9hiYB3Lkc/iBml1JQODbJ6wYX4oOHV+E+IvIh/1nsUNzLDBMxfqa2Ob1f1ACio/w==', SEQ_TEST.CURRVAL||'NIC', 'X');
        
        INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'google', '가상의google키');
        
        INSERT INTO CHARACTER(USER_ID, SKIN_ID)
		VALUES( 't'||SEQ_TEST.CURRVAL , 0);
        
        INSERT INTO DISABLED_MEMBER(USER_ID, STATUS, CANCELLATION_DATE)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'X', SYSDATE - 16);
    END LOOP;
END;
/


DROP sequence "SEQ_TEST";

CREATE SEQUENCE SEQ_TEST
			INCREMENT BY 1
			START WITH 3
			NOCYCLE;

BEGIN 
    FOR I IN 1..10
    LOOP 
    -- 실험용 유저 데이터 추가 
        INSERT INTO HEART(USER_ID, RECEIVE_ID, CREATE_DATE)
		VALUES( 't'||SEQ_TEST.NEXTVAL , 'test', SYSDATE);
        
        INSERT INTO HEART(USER_ID, RECEIVE_ID, CREATE_DATE)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'test', SYSDATE-7);
        
        INSERT INTO HEART(USER_ID, RECEIVE_ID, CREATE_DATE)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'riddl5076', SYSDATE-7);
    END LOOP;
END;
/

BEGIN 
    FOR I IN 1..20
    LOOP 
    -- 실험용 유저 데이터 추가 
        INSERT INTO HEART(USER_ID, RECEIVE_ID, CREATE_DATE)
		VALUES( 't'||SEQ_TEST.NEXTVAL , 'friend', SYSDATE);
        
        INSERT INTO HEART(USER_ID, RECEIVE_ID, CREATE_DATE)
		VALUES( 't'||SEQ_TEST.CURRVAL , 'friend', SYSDATE-7);
    END LOOP;
END;
/



BEGIN 
    FOR I IN 1..20
    LOOP 
    -- 실험용 유저 데이터 추가 
        INSERT INTO GAME_RANK(USER_ID, GAME_TITLE, GAME_SCORE)
		VALUES( 't'||SEQ_TEST.NEXTVAL , 'SkinPang', SEQ_TEST.CURRVAL);

    END LOOP;
END;
/

BEGIN 
    FOR I IN 1..6
    LOOP 
    -- 실험용 유저 데이터 추가
    INSERT INTO NOTICE( NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT)
        VALUES ( SEQ_NOTICE.NEXTVAL,'첫번째 공지사항 입니다.',
                '안녕하세요, MZONE 이용자 여러분.
                
                매주 월요일은 MZONE 정기점검입니다.
                
                ▣ 점검시간과 작업영향
                
                - 4월 24일(월) 오전 9시 ~ 오후 1시
                
                : 홈페이지 접속이 원활하지 않습니다.
                : 게임코인 서비스 이용이 원활하지 않습니다.
                
                안내 드리는 내용 참고하셔서 이용에 불편 없으시길 바랍니다.
                
                감사합니다.');
    
    INSERT INTO NOTICE( NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT)
        VALUES ( SEQ_NOTICE.NEXTVAL,'게임 업데이트 사항',
                '스킨팡이 새롭게 오픈했습니다.
                많은 이용 부탁드립니다!');
                
    INSERT INTO NOTICE( NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT)
        VALUES ( SEQ_NOTICE.NEXTVAL,'게임 업데이트 사항',
                '카드 뒤집기가 새롭게 오픈했습니다.
                친구와 함께 즐겨주세요!');
                
    INSERT INTO NOTICE( NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT)
        VALUES ( SEQ_NOTICE.NEXTVAL,'네번째 공지사항 입니다.',
                '안녕하세요, MZONE 이용자 여러분.
                
                매주 월요일은 MZONE 정기점검입니다.
                
                ▣ 점검시간과 작업영향
                
                - 4월 17일(월) 오전 9시 ~ 오후 1시
                
                : 홈페이지 접속이 원활하지 않습니다.
                : 게임코인 서비스 이용이 원활하지 않습니다.
                
                안내 드리는 내용 참고하셔서 이용에 불편 없으시길 바랍니다.
                
                감사합니다.');
                
    INSERT INTO NOTICE( NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT)
        VALUES ( SEQ_NOTICE.NEXTVAL,'다섯번째 공지사항 입니다.',
                '안녕하세요, MZONE 이용자 여러분.
                
                매주 월요일은 MZONE 정기점검입니다.
                
                ▣ 점검시간과 작업영향
                
                - 4월 10일(월) 오전 9시 ~ 오후 1시
                
                : 홈페이지 접속이 원활하지 않습니다.
                : 게임코인 서비스 이용이 원활하지 않습니다.
                
                안내 드리는 내용 참고하셔서 이용에 불편 없으시길 바랍니다.
                
                감사합니다.');
                
    INSERT INTO NOTICE( NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT)
        VALUES ( SEQ_NOTICE.NEXTVAL,'여섯번째 공지사항 입니다.',
                '안녕하세요, MZONE 이용자 여러분.
                
                매주 월요일은 MZONE 정기점검입니다.
                
                ▣ 점검시간과 작업영향
                
                - 4월 3일(월) 오전 9시 ~ 오후 1시
                
                : 홈페이지 접속이 원활하지 않습니다.
                : 게임코인 서비스 이용이 원활하지 않습니다.
                
                안내 드리는 내용 참고하셔서 이용에 불편 없으시길 바랍니다.
                
                감사합니다.');
                
    INSERT INTO NOTICE( NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT)
        VALUES ( SEQ_NOTICE.NEXTVAL,'일곱번째 공지사항 입니다.',
                '안녕하세요, MZONE 이용자 여러분.
                
                매주 월요일은 MZONE 정기점검입니다.
                
                ▣ 점검시간과 작업영향
                
                - 3월 27일(월) 오전 9시 ~ 오후 1시
                
                : 홈페이지 접속이 원활하지 않습니다.
                : 게임코인 서비스 이용이 원활하지 않습니다.
                
                안내 드리는 내용 참고하셔서 이용에 불편 없으시길 바랍니다.
                
                감사합니다.');
    END LOOP;
END;
/

-- BOARD(RECEIVE_ID:지의)
INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL, 'test', 'shwldml', '여보세요', '안녕하세요. 처음뵙겠습니다.', 'N');
     
INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL, 'friend', 'shwldml', '안녕~!~~~~!!!!', '안녕! 나는 NIC_fri이야! 만나서 반가워!', 'N');
            
INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL, 't1', 'shwldml', '부바바바바','구하지 같이 트고, 광야에서 인간이 불어 교향악이다. 창공에 우리는 맺어, 희망의 봄바람을 목숨이 타오르고 천고에 것은 교향악이다. 못하다 구하지 때에, 커다란 석가는 능히 인간이 착목한는 풀이 칼이다. 목숨을 봄바람을 방지하는 있는 이상 모래뿐일 과실이 사라지지 철환하였는가? 곳이 천고에 군영과 뜨거운지라, 할지니, 미묘한 스며들어 있는가? 하는 새 트고, 사람은 피가 웅대한 뿐이다. 따뜻한 밝은 예가 말이다.
원질이 이상 꽃이 찬미를 간에 청춘의 되려니와, 이것을 작고 운다. 옷을 길지 몸이 것이다. 이상, 심장은 날카로우나 간에 듣기만 물방아 힘있다. 그들의 역사를 이상을 아니다. 얼마나 할지니, 바이며, 않는 피다. 사라지지 가슴에 얼마나 어디 청춘은 가슴이 힘차게 칼이다.', 'Y');

INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL, 't4', 'shwldml', 'HI!!!!!!!!!!!!', '끝까지 아니한 끝에 인간이 발휘하기 것이다. 원질이 인생에 것은 목숨이 가는 지혜는 위하여서, 말이다. 찾아 우는 가슴에 뼈 보라. 끓는 되려니와, 역사를 대고, 봄바람이다. 인생에 얼음과 우리는 곳으로 그리하였는가? 장식하는 얼마나 위하여 보이는 보내는 것이다. 열락의 아름답고 보이는 든 아니다. 새가 것은 뼈 그들은 용감하고 사막이다. 용기가 이 생생하며, 아니한 방지하는 영원히 못할 같은 있으랴? 밝은 위하여서, 행복스럽고 거선의 인간에 것이다.', 'N');
            
INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL, 'riddl5076', 'shwldml', '칙촉이 씀', '안녕! 반가워!', 'N');

INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL,'riddl5076', 'shwldml', '지의야 안녕 이건 비밀글이야', '지의야 안녕! 이건 비밀글로 작성된 방명록이야!ㅎㅎ', 'Y');
     
INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL,'t7', 'shwldml', '알파펫 하나둘셋', 'abcdefghi~~~~!!!~~~~~~~~~!!!!!!!!!!!!', 'Y');
     
-- BOARD(RECEIVE_ID:riddl5076)     
INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL,'friend', 'riddl5076', '가영아 안녕', '가영아 안녕! 이건 비밀글로 작성된 방명록이야!ㅎㅎ', 'Y');
     
INSERT INTO BOARD( BOARD_NO, USER_ID, RECEIVE_ID, BOARD_TITLE, BOARD_CONTENT, SECRET) 
     VALUES(SEQ_BOARD.NEXTVAL,'t4', 'riddl5076', '저는 누굴까요??????', '가영님 오늘 밥 뭐드세요?', 'N');
     
COMMIT;