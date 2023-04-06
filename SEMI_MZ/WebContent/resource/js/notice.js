/**
 * 작성자 : 박가영
 * 공지사항 js
 */

import { getContextPath, setSessionStorage, getSessionStorage } from './common.js';
import { modalstopfn } from './squareCanvas.js';

export let noticeModal = document.querySelector('.notice-modal');

/*공지사항 모달창*/

$("body").on("click", function(e) {
	console.log(e.target);
	if (e.target.id == 'notice-x-btn') {
		$(".notice-modal").css('display', 'none');
	} else if (e.target.className == 'list-post') {
		$(".notice-modal").css('display', 'none');
		$(".notice-detail-modal").css('display', 'block');
		selectNotice(num);
	} else if (e.target.id == 'notice-detail-x-btn') {
		$(".notice-detail-modal").css('display', 'none');
	}
});

/*공지사항 게시판 하단 공지사항 리스트(4개만 보이게)*/
$(document).ready(function(){
	getNoticeList();
});

function getNoticeList(){
	$.ajax({
		url : getContextPath()+"/selectNotice",
		success : function(data){
			console.log(data);
			let noticeCount = getSessionStorage("noticeCount");
			
			if(data.length > 4) {
				data.length = 4;
			} else {
				data.length = data.length;
			}
			
			let str = "";
			
			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					str +=  "<div class='notice-list'>"
					        +"<div class='list-post'>"
							+ "<div class='notice-title'>" + data[i].title + "</div>"
							+ "</div>"
							+ "</div>"
				}
			} else {
				for (let i = 0; i == data.length; i++) {
					str += "<div class='notice-list'>"
					        +"<div class='list-post'>"
							+ "<div class='notice-title'>" + data[i].title + "</div>"
							+ "</div>"
							+ "</div>"
				}
			}
			$(".notice-list").html(str);
		}, error : function(){
			console.log("실패");
		}
	});
}

function selectNotice(num){
	console.log('num : ', num);
	$.ajax({
		url : getContextPath()+"/detail.list",
		data : {page : num},
		success : function(data){
			console.log('공지사항 : ', data);
			
			let str = "";
			
			for (let i in data){
				str += `<div class="notice-no">${data[i].noticeNo}>
						${noticeCount - i - (num - 1) * 6} 
						<ul class='notice-detail-list'>
						<li class='detail-list'>${data[i].title}</li>
						</ul>
						</div>`
			}
			(".notice-list-item").html(str);
		}, error : function(){
			console.log("실패");
		}
	});
}

function init(){
	$(document.querySelector(".notice-list-item")).on("click", ".detail-list", function () {
    
    // 앞 공지사항 포스트잇에 notice-no 주기
    let str = this.querySelector(".notice-title");
    
    console.log(str);
    location.href = getContextPath() + "/update.notice?noticeNo=" + str;
  });

  document.querySelectorAll(".page-btn").forEach(function (el) {
    el.addEventListener("click", function () {
      // 기존에 선택되어있던 버튼이 있었다면 선택 해제
      if (document.querySelector(".selected-btn") != null) {
        document.querySelector(".selected-btn").className = "page-btn";
      }

      setSessionStorage("cPage", this.innerText);
      getNotice(this.innerText);

      this.className = "selected-btn page-btn";
    });
  });

  // 페이징바의 앞페이지 버튼 클릭시 동작
  document.getElementById("prev-btn").addEventListener("click", function () {
    let btns = document.querySelectorAll(".page-btn");
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) - 10;
      el.className = "page-btn";
    });

    //만약 가장 처음 버튼이 1번일 경우 앞페이지 버튼 비활성화
    if (btns[0].innerText == 1) {
      document.getElementById("prev-btn").className = "disable-btn";
    }

    // 앞페이지가 눌렸다는 것은 뒷페이지가 있다는 것이므로 뒷페이지 가기 버튼 활성화
    document.getElementById("next-btn").className = "able-btn";

    // 가장 마지막 버튼이 눌린 것으로 처리
    btns[btns.length - 1].click();
  });

  // 페이징바의 뒷페이지 버튼 클릭 시 동작
  document.getElementById("next-btn").addEventListener("click", function () {
    let count = Number(getSessionStorage("noticeCount"));
    //최대 페이지 수
    count = Math.ceil(count / 20);
    let btns = document.querySelectorAll(".page-btn");
    // 버튼들 텍스트 변경
    btns.forEach(function (el) {
      el.innerText = Number(el.innerText) + 10;

      if (Number(el.innerText) > count) {
        //만약 버튼의 숫자가 최대 페이지 수보다 크다면
        el.className = "disable-btn page-btn";
      } else {
        el.className = "page-btn";
      }
    });

    // 앞으로 가기 버튼 활성화
    document.getElementById("prev-btn").className = "able-btn";

    //만약 가장 마지막 버튼이 최대 페이지 수보다 크거나 같은 경우 뒷페이지 버튼 비활성화
    if (Number(btns[btns.length - 1].innerText) >= count) {
      document.getElementById("next-btn").className = "disable-btn";
    }

    //가장 첫 버튼 클릭
    btns[0].click();
  });
}

/*function NoticeDetailList(){
	$.ajax({
		url : getContextPath()+"/selectNotice",
		success : function(data){
			console.log(data);
			
			let str = "";
			
			if (data.length > 0) {
				for (let i = 0; i < data.length; i++) {
					str += "<li class='detail-list'>" + data[i].title + "</li>"
				}
			} else {
				for (let i = 0; i == data.length; i++) {
					str += "<li class='detail-list'>" + '공지사항이 없습니다.' + "</li>"
				}
			}
			$(".notice-detail-list").html(str);
		}, error : function(){
			console.log("실패");
		}
	});
}*/


function noticeDetail(){
	$.ajax({
		url : getContextPath()+"/selectNotice",
		type : 'get',
		success : function(data){
			console.log('상세보기 내용 : ', data);
				
			let date = data[i].date;
			$(".notice-date").html(date);
				
			let title = data[i].title;
			$(".notice-detail-title").html(title);
				
			let content = data[i].content;
			$(".notice-content").html(content);
				
				
		}, error : function(){
			console.log("실패");
		}
	});
	}

}