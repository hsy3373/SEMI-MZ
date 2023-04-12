package mz.minigame.websocket;

import java.io.IOException;

import javax.websocket.EncodeException;
import javax.websocket.EndpointConfig;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


@ServerEndpoint(value="/FilpGame")
public class FlipGameSever {
	
	@OnOpen
	public void open(Session session, EndpointConfig config) {
		System.out.println("MINI 클라이언트 접속");
		System.out.println(session.getId());
		
	}
	@OnMessage
	public void message(Session session, String msg) {
		System.out.print(msg);
		
	}

}
