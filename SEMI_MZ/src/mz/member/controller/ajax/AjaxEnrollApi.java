package mz.member.controller.ajax;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.member.model.service.MemberService;
import mz.member.model.vo.loginAPI;

/**
 * 작성자 : 김혜린
 * 회원가입 : DB LOGIN_API테이블 insert 서블릿
 */
@WebServlet("/enroll.api")
public class AjaxEnrollApi extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxEnrollApi() {
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
		String apiKind = request.getParameter("apiKind");
		String apiKey = request.getParameter("apiKey");
		
		//System.out.println("api종류값 있나? :" + apiKind); // console용
		//System.out.println("api키값 있나? :" + apiKey);  // console용
		
		loginAPI a = new loginAPI(userId, apiKind, apiKey);
		
		//System.out.println("api객체 a : " + a); // console용
		
		int resultA = new MemberService().insertKey(a);
		
		if(resultA > 0) { // API테이블 insert성공
			response.getWriter().print("11"); 
			//System.out.println("API테이블 insert 성공"); // console용
			//System.out.println("resultA : " + resultA); // console용
		}else { // API테이블 insert 실패
			response.getWriter().print("00"); 
			//System.out.println("API테이블 insert 실패"); // console용
			//System.out.println("resultA : " + resultA); // console용
		}
		
		
	}

}
