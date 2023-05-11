# SEMI-MZ

> ## 팀원

- 한승은(조장)
- 김혜린
- 노지의
- 박가영
- 윤지영

---

> ## 프로젝트 소개

### 현실과 온라인의 연결공간 '메타버스' 사이트

미니게임을 통한 놀이공간  
MZONE만의 코인 시스템 체계  
실시간 채팅 , 방명록 '소통'을 통한 교류공간  
홀로접속 & 동시접속 모두 재미를 느낄 수 있도록 기획

- [[PPT] 링크](https://www.miricanvas.com/v/11ytu1c) / <a href="./SEMI_MZ/WebContent/resource/etc/MZONE_PPT.pdf" download="Mzone.pdf">[PPT] 다운로드</a>

- 회원
  <p align="center">
    <img src="./SEMI_MZ/WebContent/resource/etc/video/member.gif">
  </p>

- 광장
  <p align="center">
    <img src="./SEMI_MZ/WebContent/resource/etc/video/square.gif">
  </p>

- 마이룸
  <p align="center">
    <img src="./SEMI_MZ/WebContent/resource/etc/video/myroom.gif">
  </p>

- 미니게임
  <p align="center">
    <img src="./SEMI_MZ/WebContent/resource/etc/video/minigame.gif">
  </p>

- 관리자
  <p align="center">
    <img src="./SEMI_MZ/WebContent/resource/etc/video/admin.gif">
  </p>

<br>

---

> ## 주요 기능

- 회원

  - 로그인(API)
  - 회원가입
  - 회원정보 수정
  - 아이디/비밀번호 찾기
  - 로그아웃
  - 회원 탈퇴
  - 상점(캐릭터 스킨) 시스템

- 접속

  - 광장 시스템
  - 실시간 캐릭터 이동
  - 다중 접속
  - 공지사항 게시판
  - 랭킹(호감도, 게임) 기능
  - 미니게임

- 유저 상호 작용

  - 실시간 채팅
  - 유저 상세 정보 조회
  - 친구목록 조회
  - 친구추가/삭제
  - 호감도 추가/삭제
  - 방명록
  - 신고

- 관리자
  - 회원 관리
  - 신고 관리
  - 스킨 관리
  - 공지사항 관리
  - 기타 DB 데이터 관리

---

> ## 담당 기능

## 공통

- [common.js](./SEMI_MZ/WebContent/resource/js/common.js)
  - 위 파일 상 setip의 ip주소를 본인 환경에 맞게 변경하여 사용
- [common.css](./SEMI_MZ/WebContent/resource/css/common.css)
- [common java(하위 파일 전체)](./SEMI_MZ/src/mz/common) : 공용 java 파일들
- SQL
  - [MZONE.sql](./SEMI_MZ/sql파일/MZONE.sql) : 기본 테이블 세팅용 SQL
  - [MZ_INSERT.sql](./SEMI_MZ/sql파일/MZ_INSERT.sql) : 기본 데이터 세팅용 SQL
  - [testData.sql](./SEMI_MZ/sql파일/testData.sql) : 테스트 데이터 세팅용 SQL

---

## 김혜린 - [PPT] 11p 참조

- test

---

## 윤지영 - [PPT] 27p 참조

---

## 박가영 - [PPT] 49p 참조

- 유저 정보창

  - [userInfo.jsp](./SEMI_MZ/WebContent/views/userInfo.jsp) : 유저의 정보창
  - [userInfo.js](./SEMI_MZ/WebContent/resource/js/userInfo.js) : 유저 정보 관련 데이터 처리


---

## 노지의 - [PPT] 58p 참조

---

## 한승은 - [PPT] 72p 참조

- 채팅

  - [chatting.jsp](./SEMI_MZ/WebContent/views/chatting.jsp) : 채팅창 외관
  - [chatData.js](./SEMI_MZ/WebContent/resource/js/chat/chatData.js) : DB와 통신하는 등 채팅 데이터관련 처리
  - [chatFront.js](./SEMI_MZ/WebContent/resource/js/chat/chatFront.js) : 사용자 이용에 따른 채팅창 동작 관련 이벤트 처리
  - [AjaxChat.java](./SEMI_MZ/src/mz/chatting/controller/ajax/AjaxChat.java) : 채팅 관련 데이터 처리
  - [AjaxChatRoom.java](./SEMI_MZ/src/mz/chatting/controller/ajax/AjaxChatRoom.java) : 채팅방 관련 데이터 처리
  - [websocket(하위 파일 전체)](./SEMI_MZ/src/mz/chatting/websocket) : 채팅용 웹소켓 파일들

- 미니게임(스킨팡)

  - [skinPang.js](./SEMI_MZ/WebContent/resource/js/minigame/skinPang.js)
  - [skinPang.jsp](./SEMI_MZ/WebContent/views/minigame/skinPang.jsp)
  - [SkinPangController.java](./SEMI_MZ/src/mz/minigame/controller/SkinPangController.java)

- 관리자
  - [admin view(하위 파일 전체)](./SEMI_MZ/WebContent/views/admin)
  - [admin js(하위 파일 전체)](./SEMI_MZ/WebContent/resource/js/admin)
  - [AdminPageController.java](./SEMI_MZ/src/mz/admin/controller/AdminPageController.java) : 어드민 메뉴 관련
  - [MainController.java](./SEMI_MZ/src/mz/admin/controller/MainController.java) : 대시보드 메뉴 관련
  - [ChatLogDeleteController.java](./SEMI_MZ/src/mz/chatting/controller/ChatLogDeleteController.java) : 채팅 기록 삭제용
  - [member(하위 파일 전체)](./SEMI_MZ/src/mz/member/controller/admin) : 사용자 메뉴 관련
  - [notice(하위 파일 전체)](./SEMI_MZ/src/mz/notice/controller) : 공지 메뉴 관련
  - [report(하위 파일 전체)](./SEMI_MZ/src/mz/report/controller/admin) : 신고 메뉴 관련
  - 캐릭터 스킨 메뉴 관련
    - [SkinDeleteController.java](./SEMI_MZ/src/mz/skin/controller/SkinDeleteController.java)
    - [SkinEnrollController.java](./SEMI_MZ/src/mz/skin/controller/SkinEnrollController.java)
    - [SkinListController.java](./SEMI_MZ/src/mz/skin/controller/SkinListController.java)
    - [SkinUpdateController.java](./SEMI_MZ/src/mz/skin/controller/SkinUpdateController.java)

---

> ## 사용 기술 스택

### 협업 툴

- 미리캔버스

### 사용 언어

- FE(Front End)

  - JSP
  - CSS
  - Javascript
  - jQuery

- BE(Back-End)

  - Language: Java, Ajax
  - WAS(Web-Application-Server): Apache Tomcat 9.0
  - Database
    - RDBMS: Oracle 11g XE
  - Developer tool
    - Java: Eclipse
    - Oracle: SQL-Developer

- 사용 디자인 패턴: **MVC 패턴**

### 사용한 오픈 API

- BootStrap
- 카카오 Login API

---
