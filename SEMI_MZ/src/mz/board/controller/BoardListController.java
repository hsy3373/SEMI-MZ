package mz.board.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.board.model.service.BoardService;
import mz.board.model.vo.Board;
import mz.member.model.vo.Member;
/**
 * Servlet implementation class BoardListController2
 */
@WebServlet("/selectBoardList")
public class BoardListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BoardListController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("application/json; charset=UTF-8");
		
		// 로그인 아이디
		String loginId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		// 방주인 아이디
		String receive = request.getParameter("receive");
		//System.out.println("누가 "+loginId+" 누구의 " + receive);
		ArrayList<Board> list = new BoardService().selectBoardList(loginId, receive);
		//System.out.println(list.size());
		Gson gson = new Gson();
			
		gson.toJson(list, response.getWriter());	
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
