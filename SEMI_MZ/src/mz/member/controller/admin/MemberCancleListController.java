package mz.member.controller.admin;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class MemberCancleListController
 */
@WebServlet("/cancelList.member")
public class MemberCancleListController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public MemberCancleListController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		MemberService service = new MemberService();

		String p = request.getParameter("page");
		int page = p != null ? Integer.parseInt(p) : 1;

		String api = request.getParameter("api");
		api = api != null ? api : "all";

		String sort = request.getParameter("sort");
		sort = sort != null ? sort : "userId";

		String status = request.getParameter("status");
		status = status != null ? status : "all";

		int memberCount = service.memberCount(status, api);
		ArrayList<Member> list = service.selectMemberList(status, api, sort, page);

		request.setAttribute("memberCount", memberCount);
		request.setAttribute("page", page);
		request.setAttribute("api", api);
		request.setAttribute("sort", sort);
		request.setAttribute("status", status);
		request.setAttribute("list", list);

		request.getRequestDispatcher("views/admin/member/cancelMemberList.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String p = request.getParameter("page");
		int page = p != null ? Integer.parseInt(p) : 1;

		String api = request.getParameter("api");
		api = api != null ? api : "all";

		String sort = request.getParameter("sort");
		sort = sort != null ? sort : "userId";
		
		String status = request.getParameter("status");
		status = status != null ? status : "all";

		ArrayList<Member> list = new MemberService().selectMemberList(status, api, sort, page);

		response.setContentType("application/json; charset=UTF-8");
		new Gson().toJson(list, response.getWriter());

	}

}
