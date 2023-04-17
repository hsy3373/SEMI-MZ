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
import mz.skin.model.vo.Skin;

/**
 * Servlet implementation class SkinUpdateController
 */
@WebServlet("/update.skin")
public class SkinUpdateController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SkinUpdateController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		int skinId = Integer.parseInt(request.getParameter("skinId"));

		Skin skin = new SkinService().selectSkin(skinId);

		request.setAttribute("skin", skin);

		request.getRequestDispatcher("views/admin/skin/skinUpdate.jsp").forward(request, response);

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

			// 먼저 MultipartRequest 객체를 생성해야만 전달된 기타 파라미터에 접근 가능하기 때문에 임시로 만든 폴더를 저장 루트로 삼음
			String savePath = request.getSession().getServletContext().getRealPath("/resource/img/user/temporaryFile");

			// 2. 혹시 파일명이 겹칠 경우를 대비해서 전달된 파일명 수정작업 후 실제 경로에 저장됨
			MultipartRequest multi = new MultipartRequest(request, savePath, maxSize, "UTF-8",
					(FileRenamePolicy) new MyFileRenamePolicy());

			int skinId = Integer.parseInt(multi.getParameter("skinId"));
			Skin originSkin = service.selectSkin(skinId);

			String p = multi.getParameter("price");
			// 체크박스 체크되었을 경우 Y , 안되었을경우 null로 값 들어옴
			String reward = multi.getParameter("reward");
			

			// price, reward 값이 null일 경우 기본값 삽입
			int price = p != null ? Integer.parseInt(p) : originSkin.getPrice();
			reward = reward != null ? reward : originSkin.getReward();

			int result = service.updateSkin(skinId, price, reward);


			// 저장할 폴더의 물리적 경로
			savePath = request.getSession().getServletContext().getRealPath("/resource/img/user/")
					+ originSkin.getSaveFolder();

			for (int i = 1; i <= 8; i++) {
				String key = "file" + i;

				// 만약 해당 파일명으로 들어온 파일이 있을때
				if (multi.getFile(key) != null) {

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

					if (file.exists()) {
						// 저장할 경로 안에 동일 이름의 파일이 이미 존재한다면 해당 파일 삭제
						file.delete();
					}

					// 실제로 저장되어있는 파일을 찾아서 바뀐 이름 + 바뀐경로로 다시 저장
					multi.getFile(key).renameTo(file);

				}
			}

			response.sendRedirect(request.getContextPath() + "/list.skin");

			// 에러 발생했을 때 대응 여기서 짜야함
		}

		// 아예 멀티 어쩌고로 통신이 오지 않았을 경우 어떻게 할건지 처리도 필요함
	}

}
