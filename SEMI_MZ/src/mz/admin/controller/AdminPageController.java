package mz.admin.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.chatting.model.service.ChatService;
import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AdminPageController
 */
@WebServlet("/admin.admin")
public class AdminPageController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdminPageController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		ArrayList<Member> list = new MemberService().selectCancelMemberForAdmin();
		int chatLogCount = new ChatService().selectChatCountForDelete();

		request.setAttribute("list", list);
		request.setAttribute("chatLogCount", chatLogCount);

		request.getRequestDispatcher("views/admin/admin.jsp").forward(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int result = 0;

		String originPwd = request.getParameter("originPwd");
		Member m = new MemberService().loginMember("admin", originPwd);
		if (m != null) {
			String newPwd = request.getParameter("newPwd");
			Member m2 = new MemberService().updatePwd(newPwd, "admin");
			if (m2 != null) {
				result = 1;
			}
		}

		response.getWriter().print(result);
	}

}
