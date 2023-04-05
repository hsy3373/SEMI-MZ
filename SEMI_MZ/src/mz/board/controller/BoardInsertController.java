package mz.board.controller;

import java.io.IOException;

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
 * Servlet implementation class BoardInsertController
 */
@WebServlet("/insertBoard")
public class BoardInsertController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BoardInsertController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String receiveId = request.getParameter("receiveId");
		String boardTitle = request.getParameter("title");
		String boardContent = request.getParameter("content");
		String secret = request.getParameter("secret");

		Board b = new Board();
		b.setUserId(userId);
		b.setReceiveId(receiveId);
		b.setBoardTitle(boardTitle);
		b.setBoardContent(boardContent);
		b.setSecret(secret);

		int result = new BoardService().insertBoard(b);
		
		response.setContentType("application/json; charset=UTF-8");
		response.getWriter().print(result);
		

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
