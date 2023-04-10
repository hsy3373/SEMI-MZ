package mz.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

//public class PasswordEncryptWrapper extends HttpServletRequestWrapper{

//	public PasswordEncryptWrapper(HttpServletRequest request) {
//		super(request);
//	}
//	
	
	//String userPwd = request.getParameter("userPwd"); => 회원가입(/enroll.me)
	
	//String userPwd = request.getParameter("userPwd"); => 기본로그인(/login.me)
	
	//String inputPwd = request.getParameter("inputPwd"); => 내정보변경전 확인용(/checkPwd.me)
										
	//String userPwd = request.getParameter("userPwd"); => pw변경(/updatePwd.me)
	
	//String userPwd = request.getParameter("chkpwd"); => 내정보변경pw변경(/update.me")
	
	//String inputPwd = request.getParameter("inputPwd"); => 회원탈퇴(/delete.me)
	
	// getParameter() 오버라이딩
	// 매개변수로 넘어온 password값만 찾아서 암호화 시켜줄 예정
	
	
//		@Override
//		public String getParameter(String name) {
//			
//			String value = "";
//			
//			// 매개변수로 전달받은 name변수의 값이 userPwd일 때 암호화 작업 수행하기
//			if(name.equals("userPwd") || name.equals("updatePwd")) {
//				// 암호화 시켜주기
//				System.out.println("암호화 전 pwd : "+super.getParameter(name));
//				value = getSHA512(super.getParameter(name));
//				System.out.println("암호화 후 pwd : "+value);
//				
//			}else {
//				value = super.getParameter(name);
//			}
//			return value;
//		}
//		
//		public String getSHA512(String val) {
//			String encPwd = ""; //암호화된 패스워드
//			
//			// 암호화 처리 객체 선언
//			MessageDigest md = null; //자바에서 기본적으로 제공함
//			
//			//사용할 암호화 알고리즘을 선택해서 객체 생성하기
//			try {
//				md = MessageDigest.getInstance("SHA-512"); //알고리즘 선택
//			} catch (NoSuchAlgorithmException e) {
//				e.printStackTrace();
//			}
//			
//			// 암호화는 bit연산하고, bit연산한 결과를 byte[]에 담아서 보관.
//			byte[] bytes = val.getBytes(Charset.forName("UTF-8")); //바이트단위로 변환
//			md.update(bytes);
//			
//			//bit연산하고 그 결과값은 byte[]배열 이므로, String형태로 값을 변환
//			encPwd = Base64.getEncoder().encodeToString(md.digest());
//			
//			return encPwd;
//		}
//	
//}
