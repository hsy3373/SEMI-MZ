
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
		VALUES( 't'||SEQ_TEST.CURRVAL , 'X', SYSDATE - 15);
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
		VALUES( 't'||SEQ_TEST.CURRVAL , 'riddl065', SYSDATE-7);
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
-- 지의
INSERT INTO MEMBER(USER_ID, USER_PWD, NICKNAME, STATUS)
VALUES( 'shwldml', 'n89v8zPkO0SSZ5NAcfe25NVixPU3C271IrO7+EYfdfELpBZJ7LiY6f/YdeM9oizh9DxQ6oWBVs0h4grY/6pJIw==', '지의', 'Y');

INSERT INTO LOGIN_API(USER_ID, API_KIND, API_KEY)
VALUES( 'shwldml', 'kakao', '가상의kakao키');

INSERT INTO CHARACTER(USER_ID, SKIN_ID)
VALUES( 't'||SEQ_TEST.CURRVAL , 0);

COMMIT;