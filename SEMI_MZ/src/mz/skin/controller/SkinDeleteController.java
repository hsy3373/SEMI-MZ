package mz.skin.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Skin;

/**
 * Servlet implementation class SkinDeleteController
 */
@WebServlet("/delete.skin")
public class SkinDeleteController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SkinDeleteController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		SkinService service = new SkinService();
		int skinId = Integer.parseInt(request.getParameter("skinId"));
		
		Skin skin = service.selectSkin(skinId);
		
		int result = service.deleteSkin(skinId);
		
		if(result >0) {
			String path = request.getSession().getServletContext().getRealPath(skin.getSaveRoot());
			boolean del = service.deleteFolder(path);
			System.out.println("폴더 삭제 여부 : "+del);
		}
		
		response.sendRedirect(request.getContextPath() + "/list.skin");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
