package mz.report.controller.admin;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.report.model.service.ReportService;
import mz.report.model.vo.Report;

/**
 * Servlet implementation class ReportListController
 */
@WebServlet("/list.report")
public class ReportListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReportListController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String p = request.getParameter("page");
		int page = p != null ? Integer.parseInt(p) : 1;
		
		String search = request.getParameter("search");
		search = search != null ? search : "receiveId";
		
		String keyword = request.getParameter("keyword");
		keyword = keyword != null ? keyword : "";
		
		ReportService service = new ReportService();
		int reportCount = service.reportCount(search, keyword);
		ArrayList<Report> list = service.selectReportPart(page, search, keyword);
		
		request.setAttribute("reportCount", reportCount);
		request.setAttribute("page", page);
		request.setAttribute("search", search);
		request.setAttribute("keyword", keyword);
		request.setAttribute("list", list);
		
		request.getRequestDispatcher("views/admin/report/reportList.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String p = request.getParameter("page");
		int page = p != null ? Integer.parseInt(p) : 1;
		
		String search = request.getParameter("search");
		search = search != null ? search : "userId";
		
		String keyword = request.getParameter("keyword");
		keyword = keyword != null ? keyword : "";
		
		ReportService service = new ReportService();

		ArrayList<Report> list = service.selectReportPart(page, search, keyword);
		
		response.setContentType("application/json; charset=UTF-8");
		new Gson().toJson(list, response.getWriter());
	}

}
