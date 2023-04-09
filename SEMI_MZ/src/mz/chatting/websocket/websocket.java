package mz.chatting.websocket;


import java.io.IOException;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.websocket.EncodeException;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import mz.chatting.model.vo.Chat;
import mz.member.model.vo.Member;

@ServerEndpoint(value = "/websocket", 
				configurator = HttpSessionConfigurator.class , 
				decoders = { JsonDecoder.class } , 
				encoders = { JsonEncoder.class } )
public class websocket {

//	private Map<String, EndpointConfig> configs = Collections.synchronizedMap(new HashMap<>());

	@OnOpen
	public void handleOpen(Session userSession, EndpointConfig config) {
		System.out.println("client is now connected...");
		HttpSession session = (HttpSession) config.getUserProperties().get(HttpSessionConfigurator.Session);
		String loginUser = ((Member)session.getAttribute("loginUser")).getUserId();
		//세션에 유저 아이디값 저장
		userSession.getUserProperties().put("loginUser", loginUser );

	}

	@OnMessage
	public void message(Session userSession, Chat chat) {
		System.out.println(userSession.getId() + " :::::: " + chat);
		Set<Session> clients = userSession.getOpenSessions();
		
		System.out.println(clients.size() + "  현재 연결되어있는 세션 개수");

		//전체 채팅
		if(chat.getReceiveId().equals("chatLogAll") ) {			
			System.out.println("전체채팅임");
			for( Session s  : clients) {
				try {
					s.getBasicRemote().sendObject(chat);
				} catch (IOException | EncodeException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}else {
			System.out.println("------전체채팅 아님 : to > " + chat.getReceiveId());

			for (Session s : clients) {
				System.out.println("--------------------------");
				System.out.println("지금 유저세션 아이디" + s.getId());
				String loginUser = (String) s.getUserProperties().get("loginUser");
				System.out.println(" 지금 세션 유저 아이디 : " + loginUser);

				if (loginUser != null && loginUser.equals(chat.getReceiveId())) {
					System.out.println("id값이 수신자와 같음");
					try {
						s.getBasicRemote().sendObject(chat);

						return;
					} catch (IOException | EncodeException e) {
						e.printStackTrace();
					}
				}
			}
			System.out.println("수신자와 같은 아이디 값이 없음");
		}
		
	}

	@OnClose
	public void handleClose(Session userSession) {
		System.out.println("client is now disconnected...");
//		if (configs.containsKey(userSession)) {
//			configs.remove(userSession);
//		}
	}

	@OnError
	public void handleError(Throwable e, Session userSession) {
		e.printStackTrace();
	}
}