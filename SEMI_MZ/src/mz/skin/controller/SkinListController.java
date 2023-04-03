package mz.skin.controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Skin;

/**
 * Servlet implementation class SkinListController
 */
@WebServlet("/skin.admin")
public class SkinListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SkinListController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		
//		String p = request.getParameter("page");
//		int page = p != null ? Integer.parseInt(p) : 1;
		
		SkinService service = new SkinService(); 
		String defaultRoot = service.selectSkin(0).getSaveRoot();
		int skinCount = service.skinCount();
		ArrayList<Skin> rewardList = service.selectRewardSkins();
		ArrayList<Skin> basicList = service.selectBasicSkins(1);
		
		request.setAttribute("defaultRoot", defaultRoot);
		request.setAttribute("skinCount", skinCount);
		request.setAttribute("rewardList", rewardList);
		request.setAttribute("basicList", basicList);
		
		request.getRequestDispatcher("views/admin/skin/skinList.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
