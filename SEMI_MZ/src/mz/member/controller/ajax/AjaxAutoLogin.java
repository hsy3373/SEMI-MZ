package mz.member.controller.ajax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * 작성자 : 김혜린
 * 자동 로그인 서블릿
 */
@WebServlet("/autoLogin.me")
public class AjaxAutoLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxAutoLogin() {
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
		
		String userId = request.getParameter("userId");
		
		Member m = new MemberService().selectLoginUser(userId);
		
		if(m != null) {
			request.getSession().setAttribute("loginUser", m);
			response.getWriter().print("1");
		}else {
			response.getWriter().print("0");
		}
		
		
	}

}
