package mz.report.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.vo.Member;
import mz.report.model.service.ReportService;

/**
 * Servlet implementation class ReportController
 */
@WebServlet("/report")
public class ReportController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ReportController() {
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

		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String receiveId = request.getParameter("receiveId");
		String reportTitle = request.getParameter("reportTitle");
		String reportContent = request.getParameter("reportContent");
		
		System.out.println(userId+receiveId+reportTitle+reportContent);
		int result = new ReportService().insertReport(userId, receiveId, reportTitle, reportContent);
		
		if (result > 0) {
			response.sendRedirect(request.getContextPath()+"/userInfo.me");
			
			response.setContentType("application/json; charset=UTF-8");
			
			new Gson().toJson(result, response.getWriter());
		} else {
			System.out.println("글러먹었어...");
		}
		 
	}

}
