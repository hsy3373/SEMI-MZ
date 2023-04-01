package mz.member.controller;

import static mz.common.JDBCTemplate.getConnection;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.dao.MemberDao;
import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;

@WebServlet("/heartDelete")
public class heartController3 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		rePro(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		rePro(request, response);
	}
	

	protected void rePro(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String loginUser = ((Member)request.getSession().getAttribute("loginUser")).getUserId();
		String userId = request.getParameter("userId");
		Connection conn = getConnection();
		System.out.println("--------->" + userId+loginUser);
		
		MemberDao dao = new MemberDao();
		dao.deleteHeart(conn, loginUser, userId);
		
		
	}

}
