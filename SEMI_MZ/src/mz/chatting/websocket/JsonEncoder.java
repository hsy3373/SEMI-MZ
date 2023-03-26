package mz.chatting.websocket;

import javax.websocket.Encoder.Text;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

import mz.chatting.model.vo.Chat;

public class JsonEncoder implements Text<Chat> {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String encode(Chat msg) /* throws EncodeException */ {
		return new Gson().toJson(msg);
	}
}
