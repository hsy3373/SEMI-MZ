package mz.member.controller.admin;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;
import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Skin;

/**
 * Servlet implementation class MemberUpdateController
 */
@WebServlet("/update.member")
public class MemberUpdateController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public MemberUpdateController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String userId = request.getParameter("userId");

		Member m = new MemberService().selectMemberAllInfo(userId);
		ArrayList<Skin> list = new SkinService().mySkinList(userId);

		request.setAttribute("member", m);
		request.setAttribute("skinList", list);

		request.getRequestDispatcher("views/admin/member/memberUpdate.jsp").forward(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

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
			// 차단 구역
			int result = new MemberService().blockMember(userId);

			if (result > 0) {
				responseData = "success";
			} else {
				responseData = "멤버 차단에 실패하였습니다";
			}
		} else {
			System.out.println("잘못된 오더");
		}
		
		// 응답 데이터에 한글이 있을 경우를 대비해서 인코딩 설정
		response.setContentType("text/html; charset=UTF-8");

		// JSP와의 통로를 열어두기 위해 PrintWriter 객체 생성
		response.getWriter().print(responseData);

	}

}
