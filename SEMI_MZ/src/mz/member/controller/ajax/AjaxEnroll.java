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
import mz.member.model.vo.loginAPI;

/**
 * 작성자 : 김혜린
 * 회원가입 : DB MEMBER테이블 insert 서블릿
 */
@WebServlet("/enroll.me")
public class AjaxEnroll extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxEnroll() {
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
		
		String userId = request.getParameter("userId");
		String nicName = request.getParameter("nicName");
		String userPwd = request.getParameter("userPwd");
		
		Member m = new Member(userId, userPwd, nicName);
		
		//System.out.println("멤버객체 m : " + m); // console용
		
		
		int resultM = new MemberService().insertMember(m);
		
		if(resultM > 0) {  // insert성공
			HttpSession session = request.getSession(); 
			session.setAttribute("loginUser", m); // 로그인유저 정보 세션에 담음
			
			System.out.println("세션로그인유저 정보 : " + session.getAttribute("loginUser"));// console용
			
			response.getWriter().print("1");
			//System.out.println("멤버테이블 insert 성공"); // console용
			//System.out.println("resultM : " + resultM); // console용
		}else { // insert 실패
			response.getWriter().print("0");
			//System.out.println("멤버테이블 insert 실패"); // console용
			//System.out.println("resultM : " + resultM); // console용
		}
	}

}
