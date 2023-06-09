package mz.member.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.google.gson.Gson;

import mz.chatting.model.service.ChatService;
import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class UserInfoController
 */
@WebServlet("/userInfo")
public class UserInfoController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserInfoController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String loginUser = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String receiveId = request.getParameter("receiveId");
		
		int result = new MemberService().selectHeart(loginUser, receiveId);
		
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
		
		String loginUser = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String userId = request.getParameter("userId");
		//System.out.println(userId+loginUser);
		
		Member m = new MemberService().selectMember(userId);
			
		response.setContentType("application/json; charset=UTF-8");
			
		new Gson().toJson(m, response.getWriter());
				
	};
		
	

}
