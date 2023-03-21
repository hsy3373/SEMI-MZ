<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="mz.member.model.vo.Member"%>
<%
	String path = request.getContextPath();
	Member loginUser = (Member)session.getAttribute("loginUser");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<style>
	:root{
		--chat-btn-background:  rgb(45, 174, 254);
		--chat-background :  rgba(255, 255, 255, 0.107);
	}
	body{
		background-color: rgb(80, 80, 80);
	}
	.chat-container {
		display: flex;
		flex-direction: column;

		/* 영역 구분을 위해 선을 설정 */
		border: 1px solid #cbd5e0;
		height: 400px;
		width: 600px;

		
	}
	.left {
		/* 초기 크기를 절반으로 설정 */
		height: 50%;

		/* 중앙 정렬 */
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.resizer {
		background-color: #cbd5e0;
		cursor: ns-resize;
		height: 2px;
		width: 100%;
	}
	.right {
		/* left가 차지하고 남은 공간에 따라 유동적으로 변화 */
		flex: 1;

		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--chat-background);
	}

	.div-send{
		box-sizing: border-box;
		background-color: var(--chat-background);
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: fit-content;
		padding: 4px;
		
	}

	#text-send{
		width: 80%;
		height: 30px;
		background-color: var(--chat-background);
		border: 0px;
		margin-left: 8px;	
	}
	#text-send:focus{
		background-color: white;
	}

	#btn-send {
		background-color: var(--chat-btn-background);
		color: white;
		border: 1px solid black;
		border-radius: 4px;
		width: 10%;
		height: 90%;
		margin-right: 4%;
	}
	.chat-list{
		width: 100%;
		height: 30px;
		display: flex;
		flex-direction: row;
    	justify-content: flex-start;
	}

	.chat-list > div{
		background-color: var(--chat-btn-background);
		border: 1px solid black;
		border-radius: 4px 4px 0px 0px;
		
		width: 50px;
		height: 30px;
		color: white;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;

		text-align: center;
		padding: 4px;

	}
	.chat-area{
		width: 100%;
		height: calc(100%-30px);
		overflow: auto;

	}

</style>

</head>
<body>
	<%= loginUser %>

	<div class="chat-container">
		
		<div class="left"></div>
		<div class="resizer" id="dragMe"></div>
		<div class="right">
			<div class="chat-list">
				<div>전체</div>
				<div>친구닉네임</div>
			</div>
			<div class="chat-area">
				<p>[시간]닉네임 : 내용</p>
				<p>[시간]닉네임 : 내용</p>
			</div>
		</div>
		<div class="div-send">
			<input type="text" name="content" id="text-send"  maxlength="30"  placeholder="내용을 입력해 주세요(최대30자)" >
			<button id="btn-send">보내기</button>
		</div>
	</div>

	<script>
		$('html').click(function(e){
	if($(e.target).parents('.right').length < 1){
    	console.log('팝업 외 부분이 맞습니다')
        //실행 이벤트 부분
    }
});

				// 대상 Element 선택
		const resizer = document.getElementById('dragMe');
		const leftSide = resizer.previousElementSibling;
		const rightSide = resizer.nextElementSibling;

		// 마우스의 위치값 저장을 위해 선언
		let x = 0;
		let y = 0;

		// 크기 조절시 왼쪽 Element를 기준으로 삼기 위해 선언
		let leftHeight = 0;

		// resizer에 마우스 이벤트가 발생하면 실행하는 Handler
		const mouseDownHandler = function (e) {
			// 마우스 위치값을 가져와 x, y에 할당
			x = e.clientX;
			y = e.clientY;
			// left Element에 Viewport 상 height 값을 가져와 넣음
			leftHeight = leftSide.getBoundingClientRect().height;

			// 마우스 이동과 해제 이벤트를 등록
			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);
		};

		const mouseMoveHandler = function (e) {
			// 마우스가 움직이면 기존 초기 마우스 위치에서 현재 위치값과의 차이를 계산
			const dx = e.clientX - x;
			const dy = e.clientY - y;

			// 크기 조절 중 마우스 커서를 변경함
			// class="resizer"에 적용하면 위치가 변경되면서 커서가 해제되기 때문에 body에 적용
			document.body.style.cursor = 'col-resize';
			
			// 이동 중 양쪽 영역(왼쪽, 오른쪽)에서 마우스 이벤트와 텍스트 선택을 방지하기 위해 추가
			leftSide.style.userSelect = 'none';
			leftSide.style.pointerEvents = 'none';
			
			rightSide.style.userSelect = 'none';
			rightSide.style.pointerEvents = 'none';
			
			// 초기 width 값과 마우스 드래그 거리를 더한 뒤 상위요소(container)의 너비를 이용해 퍼센티지를 구함
			// 계산된 퍼센티지는 새롭게 left의 width로 적용
			const newLeftHeight = ((leftHeight + dy) * 100) / resizer.parentNode.getBoundingClientRect().height;
			leftSide.style.height = `${newLeftHeight}%`;
		};

		const mouseUpHandler = function () {
			// 모든 커서 관련 사항은 마우스 이동이 끝나면 제거됨
			resizer.style.removeProperty('cursor');
			document.body.style.removeProperty('cursor');

			leftSide.style.removeProperty('user-select');
			leftSide.style.removeProperty('pointer-events');

			rightSide.style.removeProperty('user-select');
			rightSide.style.removeProperty('pointer-events');

			// 등록한 마우스 이벤트를 제거
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		};

		// 마우스 down 이벤트를 등록
		resizer.addEventListener('mousedown', mouseDownHandler);



	</script>

	<script src="../resource/js/common.js"></script>
	<script src="../resource/js/chatting.js"></script>
</body>
</html>