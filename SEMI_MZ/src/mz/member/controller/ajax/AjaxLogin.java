package mz.member.controller.ajax;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AjaxLogin
 */
@WebServlet("/login.me")
public class AjaxLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxLogin() {
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
		
		System.out.println("loginMember");
		
		String userId = request.getParameter("userId");
		String userPwd = request.getParameter("userPwd");
		
		Member m = new MemberService().loginMember(userId, userPwd);
		
		//System.out.println("서블릿 m : " + m);
		
		if(m == null) { // 해당 id/pw의 유저 정보 없음
			
			response.getWriter().print("0"); //로그인 실패
			
		}else { // 해당 id/pw의 유저 존재
			if(m.getStatus().equals("Y")) { // 정상 회원
				if(m.getUserId().equals("admin")) { // 정상회원인데 관리자계정인 경우
					response.getWriter().print("7"); // 관리자 페이지로
				}else {
					HttpSession session = request.getSession();
					session.setAttribute("loginUser", m); // 세션에 로그인유저 정보 담기 					
					
					response.getWriter().print("1");  // 로그인 처리(성공)
				}
			}else { // status = N or X 인 경우
				response.getWriter().print("6");  // 탈퇴 혹은 차단 계정 알림
			}
		}	
			
			
			
	}

}
