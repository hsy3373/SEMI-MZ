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
import mz.board.model.vo.PageInfo;

/**
 * Servlet implementation class BoardListController
 */
@WebServlet("/list.bo")
public class BoardListController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public BoardListController() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

//		// 페이징처리
//		int listCount;		// 현재 게시판의 총 게시글 갯수
//		int currentPage = 1;	// 현재 페이지(사용자가 요청한 페이지)
//		int pageLimit;		// 페이지 하단에 보여질 페이징바의 페이지 최대 갯수
//		int boardLimit; 	// 한 페이지에 보여질 게시글의 최대 갯수
//		
//		int maxPage; 		// 가장 마지막 페이지가 몇번 페이지인지(총 페이지 수)
//		int startPage; 		// 페이지 하단에 보여질 페이징바의 시작 수
//		int endPage; 		// 페이지 하단에 보여질 페이징바의 끝 수
//		
//		// * listCount : 총 게시글 갯수 --> Board 테이블 안에 저장되어있는 행의 갯수
//		listCount = new BoardService().selectListCount();
//
//		// * pageLimit : 페이지 하단에 보여질 페이징바의 페이지 최대 갯수(패이지 목록들 몇개단위로 출력할건지)
//		pageLimit = 10;
//		
//		// * boardLimit : 한 페이지에 보여질 게시글의 최대 갯수(게시글 몇개 단위씩)
//		boardLimit = 7;
//		
//		// * maxPage : 가장 마지막 페이지가 몇번 페이지인지(총 페이지 수)
//		maxPage = (int)Math.ceil((double)listCount / boardLimit);
//		
//		// * startPage : 페이지 하단에 보여질 페이징바의 시작 수
//		startPage = (currentPage -1) / pageLimit * pageLimit +1;
//		
//		// * endPage : 페이지 하단에 보여질 페이징바의 끝 수
//		endPage = startPage + pageLimit - 1;
//		// startPage가 11이여서 endPage가 20으로 고정이 되는데 실제로는 17페이지밖에 존재 안하는 경우 ?
//		// endpage를 17(maxPage)로 변경해줘야함.
//		if(endPage > maxPage) {
//			endPage = maxPage;
//		}
//		
//		// 페이지 정보들을 하나의 공간에 담아서 보내기
//		// 페이지 정보를 담을 vo클래스를 사용
//		
//		// 1. 페이징바 만들때 필요한 객체
//		PageInfo pi = new PageInfo(listCount, currentPage, pageLimit, boardLimit, maxPage, startPage, endPage);
//	
//		request.setAttribute("pi", pi);
//		
//		request.getRequestDispatcher("views/myroom.jsp").forward(request, response);
		
		
		ArrayList<Board> list = new BoardService().selectBoardList();
		
		response.setContentType("application/json; charset=UTF-8");
		
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
