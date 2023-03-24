package mz.chatting.websocket;


import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
import javax.websocket.server.ServerEndpointConfig.Configurator;

public class HttpSessionConfigurator extends Configurator {

	public static final String Session = "Session";
	public static final String Context = "Context";

	@Override
	public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request, HandshakeResponse response) {
		System.out.println("Configurator request  : "+request);
		HttpSession session = (HttpSession) request.getHttpSession();
		System.out.println("Configurator에서 session  : "+session);
		if(session != null) {
			System.out.println("Configurator에서 session 2  : "+session);
			ServletContext context = session.getServletContext();
			config.getUserProperties().put(HttpSessionConfigurator.Session, session);
			config.getUserProperties().put(HttpSessionConfigurator.Context, context);
		}
			
	}
}