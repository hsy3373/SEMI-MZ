package mz.member.controller.ajax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AjaxPwdUpdate
 */
@WebServlet("/updatePwd.me")
public class AjaxPwdUpdate extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxPwdUpdate() {
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
		
		String userPwd = request.getParameter("userPwd");
		String userId = ((Member) request.getSession().getAttribute("loginUser")).getUserId();
		
		System.out.println("세션에서 꺼낸 유저아이디 : "+userId);

		Member m = new MemberService().updatePwd(userPwd, userId);
		
//		UPDATE MEMBER
//		SET USER_PWD = 'userPwd'
//		WHERE USER_ID = 'userId';
		
		
		HttpSession session = request.getSession();
		
		if(m == null) { // 실패
			response.getWriter().print("0");
		}else { // update 성공
			session.setAttribute("loginUser", m);
			response.getWriter().print("1");
		}
		
		
		
		
		
		
		
		
	}

}
