package mz.square.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mz.member.model.vo.Member;
import mz.skin.model.service.SkinService;

/**
 * Servlet implementation class squareGoHome
 * 작성자 : 윤지영  광장에서 마이룸으로 이동하는 servlet
 * [지의]
 * /home 으로 서블릿 하나로 합쳤음
 * (친구정보 조회시에도 myroom.jsp로 포워딩 해야하기 때문에)
 * 오류없으면 이 서블릿은 삭제해도 됨
 * 
 */
@WebServlet("/gohome")
public class squareGoHome extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public squareGoHome() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

	

		HttpSession session = request.getSession();
		
		String userId = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		//System.out.println("gohome에서 "+userId);
		//로그인 값 있음
		if(session.getAttribute("loginUser") == null) {
			System.out.print("값없음");
			//response.sendRedirect(request.getContextPath());
			
		}else {// 값있음
			// 지의추가 - 마이룸에 스킨 카운트 포워딩 
			int storeSkinCount = new SkinService().storeSkinCount(userId);
			int dressSkinCount = new SkinService().dressSkinCount(userId);
			request.setAttribute("storeSkinCount", storeSkinCount);
			request.setAttribute("dressSkinCount", dressSkinCount);
			
			response.sendRedirect(request.getContextPath()+"/home");
			//request.getRequestDispatcher("views/myroom.jsp").forward(request, response);
			
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
