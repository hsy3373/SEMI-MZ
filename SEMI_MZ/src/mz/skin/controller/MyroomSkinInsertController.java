package mz.skin.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.vo.Member;
import mz.skin.model.service.SkinService;

/**
 * Servlet implementation class MyroomSkinInsertController
 */
// CHARACTER 테이블에 구입스킨 INSERT
@WebServlet("/insertMySkin.my")
public class MyroomSkinInsertController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MyroomSkinInsertController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 세션에 있는 로그인 유저 아이디값 가져오기
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		// 구입한 스킨 아이디
		int skinId = Integer.parseInt(request.getParameter("skinId"));
		
		int result = new SkinService().insertMySkin(userId, skinId);
		
		// 스킨 추가 성공
		if(result > 0) {
			// 상점 스킨 전체 조회
			
			// 로그인유저가 보유한 스킨 전체 조회
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
