package mz.member.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class FriendInfoController
 */
@WebServlet("/friendInfo")
public class FriendInfoController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FriendInfoController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String loginUser = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String friendId = request.getParameter("friendId");
		
		int result = new MemberService().selectFriend(loginUser, friendId);
		
		if (result > 0) {
			
			response.setContentType("application/json; charset=UTF-8");
			
			new Gson().toJson(result, response.getWriter());
		} else {
			
			response.setContentType("application/json; charset=UTF-8");
			
			new Gson().toJson(result, response.getWriter());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
