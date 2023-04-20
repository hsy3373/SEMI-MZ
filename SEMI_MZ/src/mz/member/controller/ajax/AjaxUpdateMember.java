package mz.member.controller.ajax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * 작성자 : 김혜린
 * 내정보변경 Update 서블릿
 */
@WebServlet("/update.me")
public class AjaxUpdateMember extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxUpdateMember() {
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
		
		String nickName = request.getParameter("nickName");
		String chkPwd = request.getParameter("chkPwd");
		String gender = request.getParameter("gender");
		String info = request.getParameter("info");
		
		String userId = ((Member) request.getSession().getAttribute("loginUser")).getUserId();
		
		//if문으로 pwd 유무에 따라 다른 메소드 실행 후 객체에 담기
		Member updateM = null;
		
		if(chkPwd.equals("")) {
			updateM = new MemberService().updateNPwd(nickName, info, gender, userId);
		}else {
			updateM = new MemberService().updateMember(nickName, chkPwd, info, gender, userId);
		}
		
		HttpSession session = request.getSession();
		response.setContentType("apllication/json; charset=UTF-8");
		
		if(updateM != null) { // update 성공
			
			session.setAttribute("loginUser", updateM);
			//System.out.println("update성공");
		}else { // 실패
			//System.out.println("update실패");
		}
		
		new Gson().toJson(updateM, response.getWriter());
		
		
		
		
		
		
		
		
		
		
	}

}
