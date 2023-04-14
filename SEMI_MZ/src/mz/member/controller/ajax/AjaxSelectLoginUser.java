package mz.member.controller.ajax;

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
 * 작성자 : 김혜린
 * 내정보변경 모달 열릴 때 필요한 Member정보 select용 서블릿
 */
@WebServlet("/selectUser.me")
public class AjaxSelectLoginUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxSelectLoginUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		
		String userId = request.getParameter("userId");
		
		Member m = new MemberService().selectLoginUser(userId);
		
		new Gson().toJson(m, response.getWriter());

	}

}
