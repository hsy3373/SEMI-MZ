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
		int coin = Integer.parseInt(request.getParameter("coin"));
		String info = request.getParameter("info");
		
		int result = new MemberService().updateMemberInfo(userId, coin, info);
		
		response.sendRedirect(request.getContextPath() + "/update.member?userId="+userId);
	}

}
