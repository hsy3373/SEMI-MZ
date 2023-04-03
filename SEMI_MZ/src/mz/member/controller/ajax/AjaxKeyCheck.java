package mz.member.controller.ajax;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AjaxKeyCheck
 */
@WebServlet("/KeyCheck.me")
public class AjaxKeyCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxKeyCheck() {
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
		response.setContentType("text/html; charset=UTF-8");
		
		System.out.println("keycheck");
		
		String apiKind = request.getParameter("kind");
		String apiKey = request.getParameter("key");
		
		System.out.println("key: " + apiKey + ", kind : " + apiKind);
		
		Member m = new MemberService().checkKey(apiKind, apiKey);
		
//		HashMap<String, String> keyY = new HashMap<String, String>();
//		keyY.put("1", "1");
//		keyY.put("findId", m.getUserId());
		
		
		System.out.println("keycheck 서블릿 담겼?: " + m); //console용
		
		System.out.println("status값 : "+m.getStatus());
		
		if(m == null) { // 키 DB에 없음 => 회원가입 가능
			response.getWriter().print("0");
		}
		// 키가 DB에 존재
		if(m.getStatus().equals("X") || m.getStatus().equals("N")){
				response.getWriter().print("6");
		}
		if(m.getStatus().equals("Y")) {
				HttpSession session = request.getSession();
				session.setAttribute("loginUser", m); //세션에 유저정보 담기
				
				response.getWriter().print("1"); // 광장으로
				
		}
			
			
		
		
		
		
		
	}

}
