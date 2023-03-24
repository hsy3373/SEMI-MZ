package mz.chatting.websocket;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * Servlet implementation class ChattingServer
 */
@ServerEndpoint(value="/websocket", configurator=HttpSessionConfigurator.class )
public class ChattingServer {
	
	private Map<Session, EndpointConfig> configs = Collections.synchronizedMap(new HashMap<>());

	@OnOpen
	public void handleOpen(Session userSession, EndpointConfig config) {
		System.out.println("client is now connected...");
		if (!configs.containsKey(userSession)) {
			configs.put(userSession, config);
		}
		System.out.println( "소켓에서 불림  "+ ((HttpSession)userSession).getAttribute("loginUser"));
	}

//	@OnMessage
//	public String handleMessage(String message, Session userSession) {
//		if (configs.containsKey(userSession)) {
//			EndpointConfig config = configs.get(userSession);
//			HttpSession session = (HttpSession) config.getUserProperties().get(HttpSessionConfigurator.Session);
//		
//			return "Session - " + (String) session.getAttribute("loginUser");
//		}
//		return "error";
//	}
//
//	@OnClose
//	public void handleClose(Session userSession) {
//		System.out.println("client is now disconnected...");
//		if (configs.containsKey(userSession)) {
//			configs.remove(userSession);
//		}
//	}
//
//	@OnError
//	public void handleError(Throwable e, Session userSession) {
//		e.printStackTrace();
//	}
	

}
