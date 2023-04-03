package mz.member.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class ReportController
 */
@WebServlet("/heart")
public class HeartController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	/**
     * @see HttpServlet#HttpServlet()
     */
	public HeartController() {
        super();
        // TODO Auto-generated constructor stub
    }
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String loginUser = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String receiveId = request.getParameter("receiveId");
		
		int result = new MemberService().deleteHeart(loginUser, receiveId);
		
		if (result > 0) {
			
			response.setContentType("application/json; charset=UTF-8");
			
			new Gson().toJson(result, response.getWriter());
		} else {
			System.out.println("삭제 실패");
			
			response.setContentType("application/json; charset=UTF-8");
			
			new Gson().toJson(result, response.getWriter());
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String loginUser = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String receiveId = request.getParameter("receiveId");
		
		int result = new MemberService().insertHeart(loginUser, receiveId);
		System.out.println("하트 받는 사람"+receiveId+"하트 주는 사람"+loginUser+"결과"+result);
		
		if (result > 0) {
			
			response.setContentType("application/json; charset=UTF-8");
			
			new Gson().toJson(result, response.getWriter());
		} else {
			System.out.println("하트 클릭 실패");
			response.setContentType("application/json; charset=UTF-8");
			
			new Gson().toJson(result, response.getWriter());
		}
	}
	

//	protected void rePro(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		
//		String loginUser = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
//		String userId = request.getParameter("userId");
//		Connection conn = getConnection();
//		System.out.println("--------->" + userId+loginUser);
//		
//		MemberDao dao = new MemberDao();
//		dao.headerInsert(conn, loginUser, userId);
//		int heartResult = dao.getHeartInfo(conn, loginUser, userId);
//		System.out.println(heartResult);
//		
//	}

}
