package mz.skin.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.vo.Member;
import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Character;

/**
 * Servlet implementation class MyroomMySkinController
 */
// 로그인유저가 보유한 스킨 전체 조회
@WebServlet("/mySkinList.my")
public class MyroomMySkinController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MyroomMySkinController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int page = Integer.parseInt(request.getParameter("page"));
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		System.out.println("페이지 넘버 : "+page);
		response.setContentType("application/json; charset=UTF-8");

		ArrayList<Character> list = new SkinService().mySkinList(userId, page);
		System.out.println("게시글"+list);
		System.out.println("리스트 사이즈 : "+list.size());
		new Gson().toJson(list, response.getWriter());
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}
