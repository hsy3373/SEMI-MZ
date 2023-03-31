package mz.square;

import java.io.IOException;
import java.util.Set;

import javax.websocket.EncodeException;
import javax.websocket.EndpointConfig;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


import com.google.gson.Gson;
import mz.square.model.vo.UserData;

/**
 * @author 윤지영
 * 광장 서버 : 소켓 연결 
 */

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
		
		//System.out.println(User);
		
		session.getUserProperties().put("User",  User);
		
		//Session.getOpenSession()
		// -> 현재 웹소켓에서 접속해서 유지되고 있는(open)모든 session 값을 반환해줌
		Set<Session> clients = session.getOpenSessions();
		
		//System.out.print(clients);
		
		for(Session s : clients) {
			
			//나중에 나를 제외해서 뿌려주기 
			UserData u = (UserData)s.getUserProperties().get("User");
			
			try {
				s.getBasicRemote().sendObject(User);
			} catch (IOException | EncodeException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		}
		
	}
	
	

}
