package mz.myroom;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mz.skin.model.service.SkinService;

/**
 * Servlet implementation class Myroom
 */
@WebServlet("/home")
public class home extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public home() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String roomMaster = request.getParameter("roomMaster");
		System.out.println("roomMaster : "+roomMaster);
		
		int closetSkinCount = new SkinService().closetSkinCount();
		request.setAttribute("closetSkinCount", closetSkinCount);
		request.setAttribute("roomMaster", roomMaster);
		
		request.getRequestDispatcher("views/myroom.jsp").forward(request, response);
		  //if(roomMaster != null) { 
			  // 가영님이 상대 유저 ID값 넣어서 집 입장시킨거
		  //}
		  //else { 
			  //지영님이 값 없이 집 입장시킨거 //로그인 값 있음 
		  //}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
