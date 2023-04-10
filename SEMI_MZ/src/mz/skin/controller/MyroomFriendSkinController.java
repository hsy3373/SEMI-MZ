package mz.skin.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.skin.model.service.SkinService;

/**
 * Servlet implementation class MyroomFriendSkinController
 */
@WebServlet("/friendSkin")
public class MyroomFriendSkinController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MyroomFriendSkinController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		// 방주인 아이디
		String roomMasterId = request.getParameter("roomMasterId");
		
		// 방주인의 스킨아이디값 얻어옴
		int id = new SkinService().selectfriendSkin(roomMasterId);
		
		response.setContentType("application/json; charset=UTF-8");
		
		new Gson().toJson(id, response.getWriter());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
