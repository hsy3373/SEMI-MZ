package mz.minigame.websocket;

import java.io.IOException;
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




@ServerEndpoint(value="/FilpGame")
public class FlipGameSever {

	private static String User1 = new String(); //1p에 대한 정보 저장
	// private static Session player1Session;
    // private static Session player2Session; //세션으로 저장하는게 나을까? 
	
	Set<Session> clients = session.getOpenSessions();
	int numClients = clients.size();

	@OnOpen
	public void open(Session session, EndpointConfig config) {
		System.out.println("MINI 클라이언트 접속");


		if (numClients == 3) { //게임풀레이 3명부터 삭제
			session.getBasicRemote().sendText("5,gameFull");
			session.close();
		}
		if(!User1.isEmpty()) { //2p일 경우 1p정보 전송
			try {
				session.getBasicRemote().sendText(User1);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	@OnMessage
	public void message(Session session, String msg) {
	
		
		System.out.println(msg); 
		
		if(numClients == 1) { //내가 1p일 경우 저장
				User1 = msg+" 1p";
		//session.getBasicRemote().sendText(User1);
   		 }	
		
		String[] result = msg.split(" ");
			
		session.getUserProperties().put("msg", result);
		
		
		System.out.println(clients);
		
		for(Session s : clients) {
			System.out.println("여기 체크중");
			if(s != session) { //내가 아닌경우 메세지 전송
				System.out.println("메세지 전송");
				try {
					s.getBasicRemote().sendText(msg);
				} catch (IOException e) {
					e.printStackTrace();
				}
			
			}
			
		}
		
	}
	
	@OnClose
	public void onClose(Session session) throws IOException {
		//세션에 재요청 메세지 보내면 될듯
		for(Session s : clients) {
			s.getBasicRemote().sendText("4");
		}
	
    }

}
