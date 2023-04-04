package mz.skin.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.skin.model.service.SkinService;
import mz.skin.model.vo.PageInfo;
import mz.skin.model.vo.Skin;

/**
 * Servlet implementation class MyroomSkinListController
 */
@WebServlet("/skin.me")
public class MyroomSkinListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MyroomSkinListController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		// 페이징 처리
//		// 각각의 변수에 데이터를 모두 집어넣은 후 PageInfo 객체로 만들것임
//		int listCount;		// 현재 스킨의 총 스킨 갯수
//		int currentPage; 	// 현재 페이지(사용자가 요청한 페이지)
//		int pageLimit;		// 페이지 하단에 보여질 페이징바의 페이지 최대 갯수
//		int boardLimit;		// 한 페이지에 보여질 게시글 최대 갯수
//		int maxPage;		// 가장 마지막 페이지가 몇번 페이지 인지(총페이지수)
//		int startPage;		// 페이지 하단에 보여질 페이징바의 시작 수
//		int endPage;		// 페이지 하단에 보여질 페이징바의 끝 수
//		
//		// * listCount : 현재 스킨의 총 갯수 -> Skin테이블 안에 저장되어있는 행의 갯수 --30개
//		listCount = new SkinService().skinCount();
//		// * currentPage : 현재 페이지(사용자가 요청한 페이지)
//		currentPage = 1;
//		// * pageLimit : 페이지 하단에 보여질 페이징바의 페이지 최대 갯수(페이지 목록들 몇개단위로 출력할건지)
//		pageLimit = 5;
//		// * boardLimit : 한 페이지에 보여질 게시글의 최대 갯수(게시글 몇개 단위씩)
//		boardLimit = 12;
//		// * maxPage : 가장 마지막 페이지가 몇번 페이지인지(총 페이지 수)
//		maxPage = (int)Math.ceil((double)listCount/boardLimit);
//		// * startPage : 페이지 하단에 보여질 페이징바의 시작 수
//		startPage = (currentPage -1) / pageLimit * pageLimit +1;
//		// * endPage : 페이지 하단에 보여질 페이징바의 끝 수
//		endPage = startPage + pageLimit - 1;
//		if(endPage > maxPage) {
//			endPage = maxPage;
//		} 
//		PageInfo pi = new PageInfo(listCount, currentPage, pageLimit, boardLimit, maxPage, startPage, endPage);
		int page = Integer.parseInt(request.getParameter("page"));
		System.out.println("페이지 넘버"+page);
		
		response.setContentType("application/json; charset=UTF-8");
		ArrayList<Skin> list = new SkinService().selectSkinsList(page);
		System.out.println(list);
		System.out.println("리스트 사이즈 : "+list.size());
		new Gson().toJson(list, response.getWriter());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
