package mz.member.controller.ajax;

import java.io.IOException;
import java.util.HashMap;

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
 * DB에 API키 존재 유무 확인 서블릿
 * => 유무에 따라 자동로그인/회원가입 처리
 */
@WebServlet("/KeyCheck.me")
public class AjaxKeyCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AjaxKeyCheck() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");

		//System.out.println("keycheck");

		String apiKind = request.getParameter("kind");
		String apiKey = request.getParameter("key");

		//System.out.println("key: " + apiKey + ", kind : " + apiKind);

		Member m = new MemberService().checkKey(apiKind, apiKey);

		//System.out.println("keycheck 서블릿 담겼?: " + m); // console용

		if (m == null) { // 키 DB에 없음 => 회원가입 가능
			response.getWriter().print("0");
		}

		// 키가 DB에 존재
		else if (m.getStatus().equals("X") || m.getStatus().equals("N")) {
			response.getWriter().print("6");

		}
		else if (m.getStatus().equals("Y")) {
			HttpSession session = request.getSession();
			session.setAttribute("loginUser", m); // 세션에 유저정보 담기

			String result = "1," + m.getUserId();

			response.getWriter().print(result); // 광장으로

		}

	}

}
