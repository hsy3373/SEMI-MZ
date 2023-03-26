package mz.chatting.websocket;

import javax.websocket.Decoder.Text;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

import mz.chatting.model.vo.Chat;

public class JsonDecoder implements Text<Chat> {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub
		
	}

	// 내가 원하는 형태로 데이터를 파싱해서 보내주는 역할을 하는 메소드
	// 아마 제일 많이 쓰일 것임
	@Override
	public Chat decode(String msg) /*throws DecodeException*/ {
		return new Gson().fromJson(msg, Chat.class);
	}

	@Override
	public boolean willDecode(String arg0) {
		// TODO Auto-generated method stub
		return true;
	}
	
	
}
