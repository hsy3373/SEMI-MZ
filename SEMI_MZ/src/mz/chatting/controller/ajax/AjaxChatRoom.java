package mz.chatting.controller.ajax;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.chatting.model.service.ChatService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AjaxChatRoom
 */
@WebServlet("/room.chat")
public class AjaxChatRoom extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxChatRoom() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// get방식으로 들어오면 룸 리스트 select

		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		
		// 전체 채팅 룸 리스트 반환해주기
		ArrayList<String> list = new ChatService().getChatRooms(userId);

		response.setContentType("application/json; charset=UTF-8");
		new Gson().toJson(list, response.getWriter());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// post방식으로 들어오면 룸 insert or delete
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String receiver = request.getParameter("receiver");
		String order = request.getParameter("order");
		int result = 0;
		
		if(order.equals("insert")) {
			result = new ChatService().insertChatRoom(userId, receiver);
			
		}else if(order.equals("delete")) {
			result = new ChatService().deleteChatRoom(userId, receiver);
		}else {
			System.out.println("order의 값이 이상합니다 : " + order);
		}
		
		if(result <= 0) {
			System.out.println("채팅룸 정보 업데이트 실패");
		}
	}

}
