package mz.minigame.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;
import mz.minigame.model.service.GameRankService;
import mz.minigame.model.vo.GameRank;

/**
 * Servlet implementation class SkinPangController
 */
@WebServlet("/skinPang.game")
public class SkinPangController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SkinPangController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String userId = ((Member) request.getSession().getAttribute("loginUser")).getUserId();
		String gameTitle = "SkinPang";

		ArrayList<GameRank> list = new GameRankService().selectRanking(gameTitle, 10);
		GameRank myRank = new GameRankService().selectScore(userId, gameTitle);

		request.setAttribute("list", list);
		request.setAttribute("myRank", myRank);

		request.getRequestDispatcher("views/minigame/skinPang.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int score = Integer.parseInt(request.getParameter("score"));
		String userId = ((Member) request.getSession().getAttribute("loginUser")).getUserId();
		String gameTitle = "SkinPang";

		int result = new MemberService().coinUpdate(userId, score);

		if (result > 0) {

			GameRankService service = new GameRankService();

			result = service.addScore(userId, gameTitle, score);

			if (result > 0) {
				// 스코어 등록에 잘 성공했다면 새로 랭킹 조회해서 보내주기

				Map<Integer, ArrayList<GameRank>> map = new HashMap<>();

				ArrayList<GameRank> rankList = service.selectRanking(gameTitle, 10);
				GameRank myRank = service.selectScore(userId, gameTitle);
				ArrayList<GameRank> myList = new ArrayList<>();
				myList.add(myRank);

				map.put(0, myList);
				map.put(1, rankList);

				response.setContentType("application/json; charset=UTF-8");

				new Gson().toJson(map, response.getWriter());

			}else {
				System.out.println("스킨팡 스코어 등록 실패");
				response.getWriter().print(-2);
			}

		} else {
			System.out.println("스킨팡 코인 등록 실패");
			response.getWriter().print(-1);
		}

	}

}
