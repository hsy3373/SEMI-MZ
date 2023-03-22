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

/**
 * Servlet Filter implementation class LoginCheckFilter
 */
// 여러개 url에 필터 적용시키려면 {} 로 객체화 시켜서 넘겨주면 됨
// 나중에 겹치는 url이 생기면 {"/board/*", "/member/*"} 등등으로 설정도 가능하다
@WebFilter({"/예시"})
public class LoginCheckFilter implements Filter {

    /**
     * Default constructor. 
     */
    public LoginCheckFilter() {
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
		
		if(session == null || session.getAttribute("loginUser") == null) {
			// TODO! 추후 어디로 보낼건지 수정 필요
			request.getRequestDispatcher("views/test.jsp" ).forward(request, response);
		}else {
			chain.doFilter(request, response);
		}
		
		
		
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
