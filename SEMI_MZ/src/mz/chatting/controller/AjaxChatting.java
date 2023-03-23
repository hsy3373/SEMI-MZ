package mz.chatting.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.chatting.model.service.ChatService;
import mz.chatting.model.vo.Chat;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AjaxChatting
 */
//[han]
@WebServlet("/chatting")
public class AjaxChatting extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxChatting() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");
		
		String recevier = request.getParameter("recevier");
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		
		System.out.println(recevier + "  " + userId);
		
		
		if(recevier != null) {
			// 특정 상대의 아이디 값을 포함해서 요청이 들어왔을 경우
			// 해당 상대와의 채팅 내역 가져오기(한번에.. 오십개쯤?)

			ArrayList<Chat> list = new ChatService().getChattings(userId, recevier);
			new Gson().toJson(list, response.getWriter());
			
		}else {
			// 상대 아이디 값이 없이 요청이 들어왔을 경우
			// 전체 채팅 룸 리스트 반환해주기
			ArrayList<String> list = new ChatService().getChatRooms(userId);
			new Gson().toJson(list, response.getWriter());
		}
		
	}

}
