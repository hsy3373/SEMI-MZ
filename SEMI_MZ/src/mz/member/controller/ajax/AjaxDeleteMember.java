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
 * 작성자 : 김혜린
 * 회원탈퇴처리 서블릿
 */
@WebServlet("/delete.me")
public class AjaxDeleteMember extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxDeleteMember() {
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
		request.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		
		String inputPwd = request.getParameter("inputPwd");
		String userId = ((Member)session.getAttribute("loginUser")).getUserId();
		
		Member m = new MemberService().selectLoginUser(userId);
		
		String status = "N";
		
		int result = new MemberService().updateStatus(userId, status); // MEMBER : STATUS(N) : UPDATE
		
		
		if(inputPwd.equals(m.getUserPwd())) { // 패스워드 일치
			if(result > 0) { // MEMBER : STATUS(N) : UPDATE 성공
				// DISABLED_MEMBER : INSERT
				new MemberService().insertDltMember(userId, status);
				// delete처리
				new MemberService().dltMemBoard(userId); // BOARD : DELETE
				new MemberService().dltMemChatting(userId); // CHATTING : DELETE
				new MemberService().dltMemHeart(userId); // HEART : DELETE
				//new MemberService().dltMemCharacter(userId); // CHARACTER : DELETE => 탈퇴계정 살리면서 로직변경
				new MemberService().dltMemFriend(userId); // FRIEND : DELETE
				
				response.getWriter().print("1"); // 스크립트 : alert처리용
				
				// 세션로그인 정보 지우기
				session.removeAttribute("loginUser");
				
			}else {
				System.out.println("status 변경 실패(회원탈퇴 실패)");
			}
			
		}else { // 불일치
			//회원탈퇴 실패(비밀번호 불일치 alert알려주기)
			response.getWriter().print("0");
		}
		
		
		
		
		
	}

}
