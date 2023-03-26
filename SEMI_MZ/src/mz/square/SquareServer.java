package mz.square;

import java.util.Set;

import javax.websocket.EndpointConfig;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


import com.google.gson.Gson;
import mz.square.model.vo.UserData;



@ServerEndpoint(value="/multiAccess",
decoders= {JSONDecoder.class},
encoders= {JSONEncoder.class})

public class SquareServer {
	
	
	@OnOpen
	public void open(Session session, EndpointConfig config) {
		System.out.println("클라이언트 접속");
		System.out.println(session.getId());
		
	}
	
	@OnMessage
	public void message(Session session, UserData User) {
		
		System.out.println(User);
		
		session.getUserProperties().put("User",  User);
		
		//Session.getOpenSession()
		// -> 현재 웹소켓에서 접속해서 유지되고 있는(open)모든 session 값을 반환해줌
		Set<Session> clients = session.getOpenSessions();
		
	}
	
	

}
