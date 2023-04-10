package mz.skin.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;
import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Skin;

/**
 * Servlet implementation class MyrroomSkinChangeController
 */
// 현재 내 스킨 변경
@WebServlet("/updateMySkin.my")
public class MyroomSkinUpdateController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MyroomSkinUpdateController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json; charset=UTF-8");
		
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		int skinId = Integer.parseInt(request.getParameter("skinId"));
		//System.out.println(skinId);
		//System.out.println(userId);
		// 스킨아이디 업데이트 결과 받음
		int result = new SkinService().updateMySkin(userId, skinId);
		if(result > 0) {
			// 업데이트가 성공했다면 로그인유저 정보 업데이트
			Member skinUpdate = new MemberService().selectMemberAllInfo(userId);
			request.getSession().setAttribute("loginUser", skinUpdate);
		}
		new Gson().toJson(result, response.getWriter());
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
