package mz.minigame.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class FlipGameController
 */
@WebServlet("/FlipScore")
public class FlipGameController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FlipGameController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int score = Integer.parseInt(request.getParameter("score")); //10점 20점비김 50점 이김
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId(); //로그인 유저 아이디
		
		System.out.println("userId"+userId);
		System.out.println("score"+score);
		
		int result = new MemberService().coinUpdate(userId,score);

		if(result>0) {
			new Gson().toJson("ok", response.getWriter());
		}else {
			System.out.println("업데이트 실패");
			
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
