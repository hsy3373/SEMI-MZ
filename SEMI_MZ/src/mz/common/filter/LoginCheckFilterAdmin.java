package mz.common.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import mz.member.model.vo.Member;

/**
 * Servlet Filter implementation class LoginCheckFilter
 */

//[han] 어드민 로그인 체크용 필터

// 여러개 url에 필터 적용시키려면 {} 로 객체화 시켜서 넘겨주면 됨
// 나중에 겹치는 url이 생기면 {"/board/*", "/member/*"} 등등으로 설정도 가능하다
@WebFilter({ "/main.admin", "/admin.admin", "/activelist.member", "/cancelList.member", "/blocking.member",
		"/search.member", "/update.member", "/delete.member", "/delete.notice", "/insert.notice", "/list.notice",
		"/update.notice", "/list.report", "/update.report", "/list.skin", "/insert.skin", "/update.skin" })
public class LoginCheckFilterAdmin implements Filter {

    /**
     * Default constructor. 
     */
    public LoginCheckFilterAdmin() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// 다른 서블릿은 HttpServletRequest형태로 request를 받아서 세션을 불러올 수 있었던 것임
		// 이곳에서는 ServletRequest를 사용중이라 형변환 필요
		HttpSession session = ((HttpServletRequest) request).getSession();
		
		
		// 만약 로그인 유저 값이 없거나, admin이 아니면 index페이지로 다시 보내야함
		if(session == null || session.getAttribute("loginUser") == null) {
			request.getRequestDispatcher("index.jsp" ).forward(request, response);
		}else {
			if(!((Member)session.getAttribute("loginUser")).getUserId().equals("admin")) {
				request.getRequestDispatcher("index.jsp" ).forward(request, response);
			}else {
				
				chain.doFilter(request, response);
			}
		}
		
		
		
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
