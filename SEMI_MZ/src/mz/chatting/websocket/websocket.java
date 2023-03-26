package mz.chatting.websocket;


import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
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

	private Map<Session, EndpointConfig> configs = Collections.synchronizedMap(new HashMap<>());

	@OnOpen
	public void handleOpen(Session userSession, EndpointConfig config) {
		System.out.println("client is now connected...");
		HttpSession session = (HttpSession) config.getUserProperties().get(HttpSessionConfigurator.Session);
		System.out.println("소켓에서 불림 : "+  (String) session.getAttribute("testing"));
		if (!configs.containsKey(userSession)) {
			configs.put(userSession, config);
		}
	}

	@OnMessage
	public void message(Session userSession, Chat chat) {
		System.out.println(userSession.getId() + " :::::: " + chat);
		Set<Session> clients = userSession.getOpenSessions();
		
		//전체 채팅
		if(chat.getReceiveId().equals("") ) {						
			for( Session s  : clients) {
				try {
					s.getBasicRemote().sendObject(chat);
				} catch (IOException | EncodeException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}else {
			for(Session s : clients) {
				EndpointConfig config = configs.get(s);
				HttpSession session = (HttpSession) config.getUserProperties().get(HttpSessionConfigurator.Session);
				Member m = (Member) session.getAttribute("loginUser");
				if ( m != null && m.getUserId().equals(chat.getReceiveId()) ) {
					try {
						s.getBasicRemote().sendObject(chat);
					} catch (IOException | EncodeException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
//		if (configs.containsKey(userSession)) {
//			EndpointConfig config = configs.get(userSession);
//			HttpSession session = (HttpSession) config.getUserProperties().get(HttpSessionConfigurator.Session);
//			return "Session - " + (String) session.getAttribute("testing");
//		}
//		return "error";
	}

	@OnClose
	public void handleClose(Session userSession) {
		System.out.println("client is now disconnected...");
		if (configs.containsKey(userSession)) {
			configs.remove(userSession);
		}
	}

	@OnError
	public void handleError(Throwable e, Session userSession) {
		e.printStackTrace();
	}
}