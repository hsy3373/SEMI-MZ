package mz.member.controller.ajax;

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
		String key = request.getParameter("key");
		String kind = request.getParameter("kind");
		
		Member m = new MemberService().checkKey(key, kind);
		
		if(m == null) { // 키 DB에 없음 => 회원가입 가능
			response.getWriter().print("0");
		}else { // 키가 DB에 존재
			Gson gson = new Gson();
			gson.toJson(m, response.getWriter());
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
