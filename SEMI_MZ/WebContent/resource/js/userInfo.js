/**
 * 작성자: 박가영
 * 유저 정보창 js
 */

import { getContextPath } from './common.js';

$(function(){
	$(".user1").click(function(){
		$.ajax({
			url : "${getContextPath()}/userInfo.me",
			type: "get",
			
		})
	});
});

function test4() {
			$.ajax({
				url : "<%= contextPath %>/jqAjax4.do",
				success : function(result) {
					let str = "";
					
					for (let i = 0; i < result.length; i++) {
						str += "<tr>"
						    + "<td>" + result[i].userNo + "</td>"
						    + "<td>" + result[i].userName + "</td>"
						    + "<td>" + result[i]['userId'] + "</td>"
						    + "<td>" + result[i]['address'] + "</td>"
						str + "</tr>";
					}
					$("#output4 tbody").html(str);
				}
			});
		}

$(function(){
				
			$("#btn1").click(function(){
				// 기존의 동기식 방식
				// location.href = "/ajax/url.do?input="+input.value;
				
				// 비동기식 통신 : 페이지 전환이 되지 않는다.
				$.ajax({
					url : '<%= contextPath %>/jqAjax1.do',
					type: 'get',
					data: {input : $("#input1").val()},
					success : function(result){ // 매개 변수에는 서블릿으로부터 전달받은 응답 데이터가 담겨있다.
						console.log(result);
						$("#output1").text(result);
					},
					error : function() {
						console.log("ajax 통신 실패");
					},
					complete : function(){
						console.log("ajax 통신 여부와 상관없이 항상 실행됨");
					}
				})
			});
		});

let open = document.querySelector(".user1");
let close = document.querySelector(".x-btn");
let modal = document.querySelector(".user-info");

function init() {
	open.addEventListener("click", function() {
		modal.classList.remove("hidden");
	});
	close.addEventListener("click", function() {
		modal.classList.add("hidden");
	});
}

init();
