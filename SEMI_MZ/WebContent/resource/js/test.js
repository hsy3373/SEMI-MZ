	console.log("테스트 js");	

const webSocket1 = new WebSocket("ws://test.do:8082/mzone/websocket");

		webSocket1.onopen = function(message) {
			console.log("소켓오픈");
			console.log(message);

		}; 
		
		const webSocket2 = new WebSocket("ws://localhost:8082/mzone/websocket");

		webSocket2.onopen = function(message) {
			console.log("소켓오픈");
			console.log(message);

		}; 