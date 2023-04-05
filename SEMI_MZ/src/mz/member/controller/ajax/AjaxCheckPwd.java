package mz.member.controller.ajax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.vo.Member;

/**
 * 작성자 : 김혜린
 * 비밀번호 입력 요구 모달 : (로그인유저 pw == 입력한pw)확인 서블릿
 */
@WebServlet("/checkPwd.me")
public class AjaxCheckPwd extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxCheckPwd() {
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
		
		String inputPwd = request.getParameter("inputPwd");
		String userPwd = ((Member)request.getSession().getAttribute("loginUser")).getUserPwd();
		
		//System.out.println("inputPwd : " + inputPwd +", loginuserPwd : " + userPwd);
		
		if(inputPwd.equals(userPwd)) { // 패스워드 일치
			response.getWriter().print("O");
		}else { // 불일치
			response.getWriter().print("X");
		}
		
		
		
		
		
		
		
		
		
		
	}

}
