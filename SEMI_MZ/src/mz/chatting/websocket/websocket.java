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
		HttpSession session = (HttpSession) config.getUserProperties().get(HttpSessionConfigurator.Session);
		String loginUser = ((Member)session.getAttribute("loginUser")).getUserId();
		//세션에 유저 아이디값 저장
		userSession.getUserProperties().put("loginUser", loginUser );

	}

	@OnMessage
	public void message(Session userSession, Chat chat) {
		Set<Session> clients = userSession.getOpenSessions();
		

		//전체 채팅
		if(chat.getReceiveId().equals("chatLogAll") ) {			
			for( Session s  : clients) {
				try {
					s.getBasicRemote().sendObject(chat);
				} catch (IOException | EncodeException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}else {

			for (Session s : clients) {
				String loginUser = (String) s.getUserProperties().get("loginUser");

				if (loginUser != null && loginUser.equals(chat.getReceiveId())) {
					try {
						s.getBasicRemote().sendObject(chat);

						return;
					} catch (IOException | EncodeException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
	}

	@OnClose
	public void handleClose(Session userSession) {
//		if (configs.containsKey(userSession)) {
//			configs.remove(userSession);
//		}
	}

	@OnError
	public void handleError(Throwable e, Session userSession) {
		e.printStackTrace();
	}
}