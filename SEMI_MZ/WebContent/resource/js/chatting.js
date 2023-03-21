/**[han]
 * 채팅관련 영역
 */

let ip = ["192.168.30.180"]

const socket= new WebSocket(`ws://${ip[0]}/mzone/chatting.do`);
socket.onopen = function(e){
	console.log("접속성공");
	console.log(e);
}


// 2. 웹 소켓 서버에서 sendText, sendObject메소드를 실행하면 실행되는 함수
socket.onmessage = function(e){
	console.log("메세지 수신");
	// 수신된 데이터를 받으려면 이벤트 객체(e)의 data속성을 이용
	console.log(e);
	console.log(e.data);
	
	//Object형태의 String데이터를 객체로 변환해주기 (JSONObject)
	console.log(JSON.parse(e.data));
	
	
	let msg = JSON.parse(e.data);
	if(msg["sender"] == $("#sender").val()){
		$("#msgContainer").append($("<p>").text("<"+msg["sender"]+">"+msg["msg"]).css("text-align","right"));
	}else{
		$("#msgContainer").append($("<p>").text("<"+msg["sender"]+">"+msg["msg"]).css("text-align","left"));
	}
	
			
// 			let msg = e.data.split(",");
// 				console.log(msg);
// 			if(msg[0] == $("#sender").val()){
// 				$("#msgContainer").append($("<p>").text("<"+msg[0]+">"+msg[2]).css("text-align","right"));
// 			}else{
// 				$("#msgContainer").append($("<p>").text("<"+msg[0]+">"+msg[2]).css("text-align","left"));
// 			}
	}
		
		
// 3. 웹 소켓 서버세어 메세지를 전송하는 함수
const sendMsg = ()=>{
	// 전송할 메세지 전처리
	// 전처리한 메세지를 전송하는 방법 : socket.send(데이터); -> 데이터가 서버로 전송됨
	// 발송자, 수신자, 메세지 내용
	// socket.send($("#sender").val()+","+$("#receiver").val()+","+$("#msg").val());
//  			let msg = {
// 					sender : $("#sender").val(),
// 					receiver : $("#receiver").val(),
// 					msg : $("#msg").val(),
// 					};  
			
	let msg = new Message($("#sender").val(), $("#receiver").val(), $("#msg").val());
	
	socket.send(JSON.stringify(msg));
};


function Message(sender, receiver, msg){
	// this = {}  <- 눈에 보이진 않지만 묵시적으로 추가되어있음
	this.sender = sender;
	this.receiver = receiver;
	this.msg = msg;
	// return this; <- 눈에 보이진 않지만 묵시적으로 추가되어있음
}
		
		
		
// ----------------- 채팅 영역 높이 변경 이벤트 --------------------
		
let resizeChat = function(){
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

}

// ----------- init 구역 ---------------------

window.onload = function(){
	resizeChat();
}

		
		