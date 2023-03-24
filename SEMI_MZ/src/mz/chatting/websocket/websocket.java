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

@ServerEndpoint(value = "/websocket", configurator = HttpSessionConfigurator.class)
public class websocket {

	private Map<Session, EndpointConfig> configs = Collections.synchronizedMap(new HashMap<>());

	@OnOpen
	public void handleOpen(Session userSession, EndpointConfig config) {
		System.out.println("client is now connected...");
		if (!configs.containsKey(userSession)) {
			configs.put(userSession, config);
			System.out.println("configs에 config 값 넣음");
		}else {
			EndpointConfig config1 = configs.get(userSession);
			HttpSession session = (HttpSession) config1.getUserProperties().get(HttpSessionConfigurator.Session);
			System.out.println( "Session - " + (String) session.getAttribute("loginUser"));
		
		}
	}

	@OnMessage
	public String handleMessage(String message, Session userSession) {
		if (configs.containsKey(userSession)) {
			EndpointConfig config = configs.get(userSession);
			HttpSession session = (HttpSession) config.getUserProperties().get(HttpSessionConfigurator.Session);
			return "Session - " + (String) session.getAttribute("TestSession");
		}
		return "error";
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