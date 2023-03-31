package mz.board.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.board.model.dao.BoardDao;
import mz.board.model.service.BoardService;
import mz.board.model.vo.Board;

/**
 * Servlet implementation class SendBoardDetailController
 */
@WebServlet("/selectSendBoard")
public class SendBoardDetailController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendBoardDetailController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");
		
		int boardNo = Integer.parseInt(request.getParameter("boardNo"));
		
		Board b = new BoardService().selectSendBoard(boardNo);

		Gson gson = new Gson();
		
		gson.toJson(b, response.getWriter());
	}

}
