package mz.skin.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
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
		
		System.out.println("userId : "+userId);
		System.out.println("구입한 skinId : "+skinId);
		
		//CHARACTER 테이블에 구입스킨 INSERT + MEMBER 테이블에 COIN UPDATE
		int result = new SkinService().insertMySkin(userId, skinId);
		System.out.println("result : "+result);
		// 실패 -1
		
		response.setContentType("application/json; charset=UTF-8");
		// 스킨 추가 성공
		if(result > 0) {
			Member CoinUpdate = new MemberService().selectMemberAllInfo(userId);
			// 세션로그인 유저에 코인 업데이트
			request.getSession().setAttribute("loginUser", CoinUpdate);
			//result에 로그인한 유저의 변경된 코인값 가져오기
			result = CoinUpdate.getCoin();
		}
		// 데이터 넘기기
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
