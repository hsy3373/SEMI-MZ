package mz.square;

import java.io.IOException;
import java.net.http.WebSocket;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.websocket.EncodeException;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
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
	
	//관리해줄 로그인 유저정보
	private static HashMap<String, UserData> loginUsers = new HashMap<>();
	
	@OnOpen
	public void open(Session session, EndpointConfig config) {
		System.out.println("클라이언트 접속");
		System.out.println(session.getId());
		
		//최초접속시 : 다른캐릭터들 위치 정보 받아오기
		//클라이언트가 접속했을떄 현재 로그인중인 유저정보들을 알려줌 
		for (UserData key : loginUsers.values()) {
			try {
				session.getBasicRemote().sendObject(key);
			} catch (IOException | EncodeException e) {
				e.printStackTrace();
			}
		}
		
	}
	
	@OnMessage
	public void message(Session session, UserData User) {
		
		
		//처음방문시 중복체크
		if(User.getConnecting().equals("F")) {
		
			loginUsers.forEach((key, value) -> {
				if((User.getUserId().equals(value.getUserId()))) {
					User.setConnecting("X");
					System.out.print(User.getConnecting());
				};
			});
			
		};
		
		session.getUserProperties().put("User",  User);
		
		//바뀐 유저정보를 loginUsers에 map으로 저장
		loginUsers.put(session.getId(), User);
		
		
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
				e.printStackTrace();
			}
			
			
		}
		//user가 나갔을 경우 관리중인 user를 삭제처리 
		if(User.getConnecting().equals("N")) {
			loginUsers.remove(session.getId());
			//System.out.println(loginUsers);
		};

		}
	
	
	//웹소켓이 종료되어었을때 유저관리정보 삭제
	@OnClose
	public void onClose(Session session) throws IOException {
		loginUsers.remove(session.getId());
    }
	
		
		
}
	
	


