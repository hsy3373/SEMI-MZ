package mz.member.controller.ajax;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import mz.member.model.service.MemberService;
import mz.member.model.vo.Member;
import mz.member.model.vo.loginAPI;
import mz.skin.model.service.SkinService;
import mz.skin.model.vo.Skin;

/**
 * 작성자 : 김혜린
 * 회원가입 : DB MEMBER테이블 insert 서블릿
 */
@WebServlet("/enroll.me")
public class AjaxEnroll extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxEnroll() {
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
		String nicName = request.getParameter("nicName");
		String userPwd = request.getParameter("userPwd");
		String apiKind = request.getParameter("apiKind");
		String apiKey = request.getParameter("apiKey");
	
		Member m = new Member(userId, userPwd, nicName);
		loginAPI a = new loginAPI(userId, apiKind, apiKey);
		//System.out.println("멤버객체 m : " + m); // console용
		
		
		int result = new MemberService().insertMember(m);
		
		if(result > 0) {  // insert성공
			HttpSession session = request.getSession(); 
			session.setAttribute("loginUser", m); // 로그인유저 정보 세션에 담음
			System.out.println("세션로그인유저 정보 : " + session.getAttribute("loginUser"));// console용
			
			
			// 만약 캐릭터 insert실패시 멤버 삭제 시키기 result = "0"으로 js로 넘기고 alert처리
			
			// API insert실행
			int resultA = new MemberService().insertKey(a);
			
			if(resultA > 0) { // API테이블 insert성공
				System.out.println("API테이블 insert 성공"); // console용
			}else { // API테이블 insert 실패
				System.out.println("API테이블 insert 실패"); // console용
				System.out.println("resultA : " + resultA); // console용
			}
			
			// character테이블 insert실행
			int resultC = new MemberService().insertCharacter(userId);
			
			if(resultC > 0) { //character테이블 insert성공
				System.out.println("character테이블 insert 성공"); // console용
			}else {//character테이블 insert실패
				System.out.println("character table insert 실패");// console용
				System.out.println("resultC : " + resultC); // console용
			}
			
			// 위 두개의 테이블 insert결과 내보내기
			if(resultA > 0 && resultC > 0) { // 캐릭터,api테이블 모두 insert 성공 시
				
				response.getWriter().print("1"); // 회원가입 성공 결과 내보내기
				checkRanking(userId);
			}else {
				
				int resultD = new MemberService().deleteMember(userId);
				request.getSession().invalidate(); //세션 데이터 삭제
				
				if(resultD > 0) {
					response.getWriter().print("0"); // 회원가입 실패 alert용 전달
					System.out.println("캐릭터,api테이블 모두 insert실패. 생성된 멤버 삭제처리함");
				}else {
					System.out.println("테이블 insert 실패 => 멤버 삭제 : 실패");
				}
				
				System.out.println("캐릭터 api 둘중 하나던 둘다던 insert 실패함~ㅎ");
			}
			
			
		}else { // 멤버테이블 insert 실패
			
			System.out.println("멤버테이블 insert 실패"); // console용
			System.out.println("result : " + result); // console용
		}
	}
	
	
	//[han] 월요일에 로그인 할때마다 보상용 스킨 줘야하는지 빼야하는지 체크해서 진행하는 용도 
		protected void checkRanking(String userId) {
			// 로그인 하면서 유저가 보상용 스킨 받아야 하는지 체크 용도
			
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


