package mz.member.controller.ajax;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
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
import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Skin;

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

		String userId = m.getUserId(); // 랭킹체크용
		
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

			checkRanking(userId);
		}

	}
	
	
	//[han] 월요일에 로그인 할때마다 보상용 스킨 줘야하는지 빼야하는지 체크해서 진행하는 용도 
			protected void checkRanking(String userId) {
				// 로그인 하면서 유저가 보상용 스킨 받아야 하는지 체크 용도
				// 서울기준 현재 날짜 구하기
				LocalDate SeoulNow = LocalDate.now(ZoneId.of("Asia/Seoul"));
				// 값이 1이면 월요일
				int dayOfWeekValue = SeoulNow.getDayOfWeek().getValue();
				boolean check = true;

				
					ArrayList<Member> ranking = new MemberService().selectRanking();
					SkinService service = new SkinService();
					ArrayList<Skin> rewardSkins = service.selectRewardSkins();
					ArrayList<Integer> memberRewardSkins = service.myRewardList(userId);

					for (Member rank : ranking) {
						if (rank.getUserId().equals(userId)) {
							// 유저가 랭킹 유저 리스트 안에 있으므로 체크 값 변경
							check = false;
							// 만약 유저가 보상용 스킨을 가지고 있지 않으면 추가 시킴
							for (int i = 0; i < rewardSkins.size(); i++) {
								int skinId = rewardSkins.get(i).getSkinId();
								if (!memberRewardSkins.contains(skinId)) {
									service.insertRewardSkin(userId, skinId);
								}
							}
							break;
						}
					}

					// 만약 현재 로그인한 유저가 랭킹 유저 리스트 안에 없다면 실행됨
					if (check) {
						for (int i = 0; i < rewardSkins.size(); i++) {
							int skinId = rewardSkins.get(i).getSkinId();
							// 만약 유저가 보상용 스킨 가지고 있으면 삭제
							if (memberRewardSkins.contains(skinId)) {
								service.deleteMySkin(userId, skinId);
							}
						}
					}

				
			}

}
