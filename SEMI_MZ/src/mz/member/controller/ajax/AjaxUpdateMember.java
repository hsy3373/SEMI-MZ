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
		
		System.out.println("userPwd에 어떤 값 담김 ? : " + chkPwd);
		// 그리고 js에서 원래패스워드 담지 말고 input값 그래도 넘겨받게 수정하기
		//그리고 여기 콘솔에 어떤 값 null인지? 빈문자열인지 체크하고 뒤에 코드 수정하기
		String userId = ((Member) request.getSession().getAttribute("loginUser")).getUserId();
		
		//Member updateM = new MemberService().updateMember(nickName, chkPwd, info, gender, userId);
		
		//Member updateNP = new MemberService().updateNPwd(nickName, info, gender, userId);
		
		//여기서 if문으로 userPwd 값에 따라 다른 멤버 객체 리턴시키기
		Member updateM = null;
		
		if(chkPwd.equals("")) {
			updateM = new MemberService().updateNPwd(nickName, info, gender, userId);
		}else {
			updateM = new MemberService().updateMember(nickName, chkPwd, info, gender, userId);
		}
		
		System.out.println("updateM 객체 : "+updateM);
		//String udtName = updateM.getNicName();
		//String udtInfo = updateM.getInfo();
		
		HttpSession session = request.getSession();
		response.setContentType("apllication/json; charset=UTF-8");
		
		if(updateM != null) { // update 성공
			
			session.setAttribute("loginUser", updateM);
			System.out.println("update성공");
		}else { // 실패
			System.out.println("update실패");
		}
		
		
		
		new Gson().toJson(updateM, response.getWriter());
		
		
		
		
		
		
		
		
		
		
	}

}
