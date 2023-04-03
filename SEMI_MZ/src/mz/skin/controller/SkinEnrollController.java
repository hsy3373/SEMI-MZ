package mz.skin.controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.FileRenamePolicy;

import mz.common.MyFileRenamePolicy;
import mz.skin.model.service.SkinService;

/**
 * Servlet implementation class CharacterController
 */

//[han]
@WebServlet("/insert.skin")
public class SkinEnrollController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SkinEnrollController() {
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
		request.getRequestDispatcher("views/admin/skin/skinEnroll.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// isMultipartContent : HTTP 요청이 multipart/form-data 인코딩 타입을 가지는지 확인하는 메서드
		if (ServletFileUpload.isMultipartContent(request)) {

			SkinService service = new SkinService();

			// 전송 용량 제한 - 여기선 10mb
			int maxSize = 10 * 1024 * 1024;
			
			//먼저 MultipartRequest 객체를 생성해야만 전달된 기타 파라미터에 접근 가능하기 때문에 임시로 만든 폴더를 저장 루트로 삼음
			String savePath = request.getSession().getServletContext().getRealPath("/resource/img/user/temporaryFile");

			// 2. 혹시 파일명이 겹칠 경우를 대비해서 전달된 파일명 수정작업 후 실제 경로에 저장됨
			MultipartRequest multi = new MultipartRequest(request, savePath, maxSize, "UTF-8",
					(FileRenamePolicy) new MyFileRenamePolicy());

			
			String p = multi.getParameter("price");
			// 체크박스 체크되었을 경우 Y , 안되었을경우 null로 값 들어옴
			String reward = multi.getParameter("reward");
			System.out.println("리워드 들어옴 : " + reward);

			// price, reward 값이 null일 경우 기본값 삽입
			int price = p != null ? Integer.parseInt(p) : 300;
			reward = reward != null ? reward : "N";

			// 스킨을 먼저 저장시키고 해당 스킨 currval 값 가져옴
			int path = service.insertSkin(price, reward);


			// insert정상적으로 되고 시퀀스 currval 값도 잘 가져와졌을 경우
			if (path > 0) {

				// 저장할 폴더의 물리적 경로
				// todo! 나중에 path 앞에 skin 붙일지 말지 결정해야함 ( 수정되면 sql문도 수정해줘야함 )
				savePath = request.getSession().getServletContext().getRealPath("/resource/img/user/skin") + path;

				// savePath 경로로 폴더 생성하면서 생성이 되면 true값 반환받음
				if (service.createFolder(savePath)) {

					for (int i = 1; i <= 8; i++) {
						String key = "file" + i;

						// 파일별로 다시 바꿔서 저장할 파일 명 설정
						String newName = "";

						switch (i) {
						case 1:
							newName = "fs.png";
							break;
						case 2:
							newName = "fd.png";
							break;
						case 3:
							newName = "bs.png";
							break;
						case 4:
							newName = "bd.png";
							break;
						case 5:
							newName = "ls.png";
							break;
						case 6:
							newName = "ld.png";
							break;
						case 7:
							newName = "rs.png";
							break;
						case 8:
							newName = "rd.png";
							break;

						}

						// 저장할 저장경로와 파일명을 미리 설정해서 파일 객체 생성
						File file = new File(savePath, newName);
						// 실제로 저장되어있는 파일을 찾아서 바뀐 이름으로 다시 저장
						multi.getFile(key).renameTo(file);
					}

					response.sendRedirect(request.getContextPath() + "/skin.admin");
				} else {
					System.out.println("파일경로에 폴더 생성 실패");
				}

			} else {
				System.out.println("insert 실패");
			}

			// todo! 폴더를 못만들었든 insert를 실패했든 이곳으로 오게 됨
			// 에러 발생했을 때 대응 여기서 짜야함
		}

		// 아예 멀티 어쩌고로 통신이 오지 않았을 경우 어떻게 할건지 처리도 필요함
	}

}
