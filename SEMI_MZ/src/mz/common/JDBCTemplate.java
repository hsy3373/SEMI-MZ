package mz.common;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class JDBCTemplate {
	


	// 1. Connection 객체 생성 후 해당 Connection 반환하는 메소드
	public static Connection getConnection() {

		Properties prop = new Properties(); // Map계열 컬렉션(key-value)

		// 읽어들이고자 하는 driver.properties파일의 물리적인 경로
		String fileName = JDBCTemplate.class.getResource("/sql/driver/driver.properties").getPath();
		// JDBCTemplate.class는 컴파일된 class파일을 의미
		// getResourse함수의 첫번째 / 는 classes폴더를 의미함
		// getPath() 로 찾은 파일의 절대 경로 path를 가지고 옴
		// "F:\kh\kh-JSP\servlet2\JSP_Project\src\sql\driver"와 같은 절대경로와 비슷한 결과를 낸다
		// 위의 src 파일은 컴파일 되기 전 버전이라 접근 자체가 불가능함

		try {
			prop.load(new FileInputStream(fileName));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		Connection conn = null;

		// 1) jdbc 드라이버 등록
		try {
			Class.forName(prop.getProperty("driver"));
			// 2) DB와 접속후 Connection객체 생성
			conn = DriverManager.getConnection( prop.getProperty("url"), 
					prop.getProperty("username"),
					prop.getProperty("password")
					);
		
			// 3) 자동커밋 설정 해제
			conn.setAutoCommit(false);

		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		// Multi Catch문에 사용된 예외들은 예외의 상속관계에서 부모와 자식관계에 있으면 안된다
		// Multi Catch문에 사용된 예외들의 공통된 조상의 멤버(메소드)만 사용할 수 있다.

		return conn;
		
		
	}
	
	//2. 전달받은 Connection 객체를 가지고 commit 해주는 메소드 
	public static void commit(Connection conn) {
		
		try {
			if(conn != null && !conn.isClosed()) {
				conn.commit();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	
	//3. 전달받은 Connection 객체를 가지고 rollback해주는 메소드
	public static void rollback(Connection conn) {
		
		try {
			if(conn != null && !conn.isClosed()) {
				conn.rollback();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	
	//4. Connection 객체를 반납해주는 메소드
	public static void close(Connection conn) {
		try {
			if(conn != null && !conn.isClosed()) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	//5. Statement객체를 반답시켜주는 메소드
	public static void close(Statement stmt) {
		try {
			if(stmt != null && !stmt.isClosed()) {
				stmt.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	//6. ResultSet객체를 반납시켜주는 메소드
	public static void close(ResultSet rset) {
		try {
			if(rset != null && !rset.isClosed()) {
				rset.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	

	

}
