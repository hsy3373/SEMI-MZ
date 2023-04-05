package mz.notice.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.notice.model.service.NoticeService;
import mz.notice.model.vo.Notice;
import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Skin;

/**
 * Servlet implementation class NoticeListController
 */
@WebServlet("/list.notice")
public class NoticeListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public NoticeListController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		NoticeService service = new NoticeService(); 
		
		String p = request.getParameter("page");
		int page = p != null ? Integer.parseInt(p) : 1;
		
		int noticeCount = service.noticeCount();
		ArrayList<Notice> list = service.selectNoticesPart(page);
		
		request.setAttribute("noticeCount", noticeCount);
		request.setAttribute("page", page);
		request.setAttribute("list", list);
	
		request.getRequestDispatcher("views/admin/notice/noticeList.jsp").forward(request, response);
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//포스트 형식으로 들어오면 ajax로서 사용
		
		int page = Integer.parseInt(request.getParameter("page"));
		
		// 원하는 페이지에 속하는 스킨 리스트 반환해줌
		ArrayList<Notice> list = new NoticeService().selectNoticesPart(page);
		
		response.setContentType("application/json; charset=UTF-8");
		new Gson().toJson(list, response.getWriter());
		
	}

}
