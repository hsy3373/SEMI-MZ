package mz.member.controller.admin;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class MemberBlockingController
 */
@WebServlet("/blocking.member")
public class MemberBlockingController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MemberBlockingController() {
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
		String order = request.getParameter("order");

		String responseData = "";

		if (order.equals("delete")) {
			// 멤버 삭제 구역
			int result = new MemberService().deleteMember(userId);

			if (result > 0) {
				responseData = "success";
			} else {
				responseData = "멤버 삭제에 실패하였습니다";


			}
		} else if (order.equals("blocking")) {
			
			MemberService service = new MemberService();
			
			// 멤버 불러와서 만약 차단되어있다면 차단해제, 차단 안되어있으면 차단 처리
			Member m = service.selectMemberAllInfo(userId);
			int result = 0;
			
			if(m.getStatus().equals("X")) {
				// 차단 해제
				result = service.blockMember(userId ,"Y");
				
			}else { 
				// 차단
				result = service.blockMember(userId ,"X");
				
				if(result > 0) {
					// 차단 당한 유저의 활동 기록 삭제
					service.dltMemFriend(userId);
					service.dltMemBoard(userId);
					service.dltMemChattingRoom(userId);
					service.dltMemChatting(userId);
					service.dltMemHeart(userId);
				}
			}

			if (result > 0) {
				responseData = "success";
			} else {
				responseData = "멤버 차단에 실패하였습니다";
			}
		} else {
			responseData = "잘못된 명령입니다";
		}
		
		// 응답 데이터에 한글이 있을 경우를 대비해서 인코딩 설정
		response.setContentType("text/html; charset=UTF-8");

		// JSP와의 통로를 열어두기 위해 PrintWriter 객체 생성
		response.getWriter().print(responseData);
	}

}
