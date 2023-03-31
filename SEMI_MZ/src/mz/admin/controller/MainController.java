package mz.admin.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.service.MemberService;

/**
 * Servlet implementation class MainController
 */
//[han]
@WebServlet("/main.admin")
public class MainController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	
    public MainController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		int userCount = new MemberService().userCount();
//		int noticeCount = new NoticeService().noticeCount();
//		int characterCount = new CharacterService().characterCount();
		
		request.setAttribute("userCount", userCount);
//		request.setAttribute("noticeCount", noticeCount);
//		request.setAttribute("characterCount", characterCount);
//		
		request.getRequestDispatcher("views/admin/main.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
