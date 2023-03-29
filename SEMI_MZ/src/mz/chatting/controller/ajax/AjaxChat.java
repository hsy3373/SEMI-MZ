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
import mz.chatting.model.vo.Chat;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AjaxChat
 */
@WebServlet("/chat.chat")
public class AjaxChat extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxChat() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// get 방식으로 요청오면 select
		// 해당 상대와의 채팅 내역 가져오기(chatNo가 minNo보다 작은 것들로 0한번에 오십개)
		
		String recevier = request.getParameter("recevier");
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		int minNo = Integer.parseInt(request.getParameter("minNo"));
		
		System.out.println(minNo + recevier + userId);
		
		ArrayList<Chat> list = new ChatService().getChattings(userId, recevier, minNo);
		
		System.out.println(list.size());
		
		response.setContentType("application/json; charset=UTF-8");
		new Gson().toJson(list, response.getWriter());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// post 방식으로 요청오면 채팅 insert
		String recevier = request.getParameter("recevier");
		String content = request.getParameter("content");
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		
		Chat c = new Chat(userId, recevier, content);
		System.out.println(c);
		
		int result = new ChatService().insertChat(c);
		if(result <= 0) {
			System.out.println("채팅 등록 실패");
		}
	}

}
