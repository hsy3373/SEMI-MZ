package mz.report.controller.admin;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;
import mz.report.model.service.ReportService;
import mz.report.model.vo.Report;

/**
 * Servlet implementation class ReportUpdateController
 */
@WebServlet("/update.report")
public class ReportUpdateController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ReportUpdateController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ReportService service = new ReportService();

		int reportNo = Integer.parseInt(request.getParameter("reportNo"));
		Report r = service.selectReport(reportNo);
		Member user = new MemberService().selectMemberForReport(r.getUserId());
		Member receiver = new MemberService().selectMemberForReport(r.getReceiveId());

		r.setUser(user);
		r.setReceiver(receiver);

		response.setContentType("application/json; charset=UTF-8");
		new Gson().toJson(r, response.getWriter());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String order = request.getParameter("order");
		int reportNo = Integer.parseInt(request.getParameter("reportNo"));
		int result = 0;

		if (order.equals("update")) {
			String title = request.getParameter("title");
			String content = request.getParameter("content");

			Report report = new Report();
			report.setReportNo(reportNo);
			report.setReportTitle(title);
			report.setReportContent(content);
			
			result = new ReportService().updateReport(report);
		}else if( order.equals("delete")) {
			result= new ReportService().deleteReport(reportNo);
		}
		
		response.getWriter().print(result);
	}

}
