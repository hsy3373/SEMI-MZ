package mz.square;

/**
 * 작성자 : 윤지영 : sever Json encoder
 */

import javax.websocket.Encoder.Text;
import javax.websocket.EndpointConfig;

import com.google.gson.Gson;

import mz.square.model.vo.UserData;

public class JSONEncoder implements Text<UserData> {

	@Override
	public void destroy() {
		
	}

	@Override
	public void init(EndpointConfig arg0) {
		
	}

	@Override
	public String encode(UserData UserData) { 
		return new Gson().toJson(UserData);
	}
	
	
	
	

}
