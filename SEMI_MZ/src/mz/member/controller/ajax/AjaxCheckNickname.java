package mz.member.controller.ajax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.service.MemberService;

/**
 * 작성자 : 김혜린
 * 회원가입 : 닉네임 중복확인 서블릿
 */
@WebServlet("/nickCheck.me")
public class AjaxCheckNickname extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxCheckNickname() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String nicName = request.getParameter("enrollNick");
		
		int checkNick = new MemberService().checkNick(nicName);
		
		if(checkNick > 0) { // 닉네임 DB에 존재. 사용불가
			response.getWriter().print("N");
		}else { // 사용가능
			response.getWriter().print("Y");
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
