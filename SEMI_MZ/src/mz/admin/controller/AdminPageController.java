package mz.admin.controller;

import java.io.IOException;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mz.chatting.model.service.ChatService;
import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

/**
 * Servlet implementation class AdminPageController
 */
@WebServlet("/admin.admin")
public class AdminPageController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdminPageController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		ArrayList<Member> list = new MemberService().selectCancelMemberForAdmin();
		int chatLogCount = new ChatService().selectChatCountForDelete();
		int heartCount = new MemberService().selectHeartForDel();

		request.setAttribute("list", list);
		request.setAttribute("chatLogCount", chatLogCount);
		request.setAttribute("heartCount", heartCount);

		request.getRequestDispatcher("views/admin/admin.jsp").forward(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int result = 0;

		String originPwd = request.getParameter("originPwd");
		
		originPwd = getSHA512(originPwd);
		
		Member m = new MemberService().loginMember("admin", originPwd);
		if (m != null) {
			String newPwd = request.getParameter("newPwd");
			newPwd = getSHA512(newPwd);
			
			Member m2 = new MemberService().updatePwd(newPwd, "admin");
			if (m2 != null) {
				result = 1;
			}
		}

		response.getWriter().print(result);
	}
	
	public String getSHA512(String val) {
		String encPwd = ""; //암호화된 패스워드
		
		// 암호화 처리 객체 선언
		MessageDigest md = null; //자바에서 기본적으로 제공함
		
		//사용할 암호화 알고리즘을 선택해서 객체 생성하기
		try {
			md = MessageDigest.getInstance("SHA-512"); //알고리즘 선택
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		// 암호화는 bit연산하고, bit연산한 결과를 byte[]에 담아서 보관.
		byte[] bytes = val.getBytes(Charset.forName("UTF-8")); //바이트단위로 변환
		md.update(bytes);
		
		//bit연산하고 그 결과값은 byte[]배열 이므로, String형태로 값을 변환
		encPwd = Base64.getEncoder().encodeToString(md.digest());
		
		return encPwd; 
	}

}
