package mz.square;

import javax.websocket.Decoder.Text;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

import mz.square.model.vo.UserData;

public class JSONDecoder implements Text<UserData> {
	@Override
	public void destroy() {
		
	}
	
	@Override
	public void init(EndpointConfig arg0) {
		
	}
	
	@Override 
	public UserData decode(String UserData) {
		return new Gson().fromJson(UserData, UserData.class); 
	}
	
	@Override 
	public boolean willDecode(String arg0) {
		return true;
	}
}
