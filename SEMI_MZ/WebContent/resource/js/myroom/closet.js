/**
 * 작성자 : 노지의
 * 마이룸 - 옷장
 */
import { getContextPath } from '../common.js';
import {getSessionStorage,setSessionStorage} from './myroomCommon.js';
let path = getContextPath();

let closetSkinCount = getSessionStorage('closetSkinCount');
//console.log("총게시글갯수 : "+closetSkinCount);
/*
	상점 클릭시 모든 리스트가 출력됨
	옷장 클릭시 loginUser의 스킨목록이 있는 것만 출력됨
*/
// 페이지별 스킨리스트 가져오는 함수
// num값에 따라서 보여지는 화면이 달라짐
function selectSkin(num){
	$.ajax({
		url : path + "/skinList.me",
		data : {page : num},
		success : function(list){
			
			//console.log(list);

			let str = "";
			for(let i = 0; i < list.length; i++){
				str += "<div class='closet-item'>" 
						  +"<div class='closet-skin-id' id='skin"+(i+1)+"' style='display: none;'>" + list[i].skinId +"</div>"
						  + "<div class='closet-price'>" + list[i].price +"</div>"
						  + "<div class='closet-skin'>"
						 	+"<img src='."+ list[i].saveRoot +"/fs.png'>"
						  + "</div>"
					 + "</div>"
			}
			$(".closet-skins").html(str);
			
		},
		error : function(e){
			console.log("접속실패");
		}
	});
};
/*
	상점스킨 리스트 중 내가 보유한 스킨이라면 보유중
	- list에 담긴 skinId(1,2,3,4...) 값과 #skin i 값이 
*/
$(function(){
	$.ajax({
		url : path + "/mySkinList.me",
		success : function(list){
			// 내가 보유한 리스트
			for(let i=0; i<list.length; i++){
				//console.log(i.skinId); 0  3 5
				if(i.skinId == $("#skin"+(i+1)).text()){
					console.log("일치");
				}
			}
		}
	})
});

/* 로그인 유저가 보유한 스킨 */
function mySkin(){
	$.ajax({
		url : path + "/mySkinList.me",
		success : function(list){
			//console.log(list);

			let str = "";
			for(let i = 0; i < list.length; i++){
				str += `<div class='closet-item'>
						  <div class='closet-skin-id' id='skin"+i+"' style='display: none;'>${list[i].skinId}</div>
						  <div class='closet-skin'>
						  	<img src='${path + list[i].saveRoot}/fs.png'>
						  </div>
					 </div>`
			}
			$(".closet-skins").html(str);
		},
		error: function (jqXHR, textStatus, errorThrown) {
      		console.log("Error: " + errorThrown);
    	}
	});
};


/* 옷장 속 스킨 클릭시 왼쪽 대표 스킨에 이미지 적용 */
$(document).on('click', '.closet-skin img' ,function(){
	let imgSrc = $(this).attr('src');
	console.log(imgSrc);
	
	$(".view-skin img").attr('src', imgSrc);
		
})

function init(){
	document.querySelectorAll(".page-btn").forEach(function(item, index){
		//console.log(item);
		//console.log("인덱스 :"+index);
		item.addEventListener('click',function(){
			// 기존에 선택된 버튼이 있었다면 선택 해제
			if (document.querySelector(".selected-btn") != null) {
			  document.querySelector(".selected-btn").className = "page-btn";
			}
			// 승은님꺼
			//selectSkin(this.innerText);
			selectSkin(index+1);

      		this.className = "selected-btn page-btn";
			/* ★★★★★★★★★★★★★★★★★★★★★클래스명으로 css 부여해야됨!!!!!!!★★★★★★★★★★★★★★★★★★★★★★★★★ */
		});
	});
	// 첫페이지가 보이게
	//selectSkin(1);
	
};


$(function () {
	/*룸마스터 값이 있을 경우 옷장이벤트 x*/
	$(document).on('click','.icon-closet',function(){
		init();
		if(roomMasterId == ''){
	        $(".closet-wrap").show();
	        $(".closet-modal").show();
	        $.dressClick();
			mySkin();
		}else{
			$(".icon-closet").off('click');
		}
	})

    // 옷장 버튼 클릭
	$(document).on("click", ".dress-btn",function(){
        $.dressClick();
		mySkin();
	});
    // 상점 버튼 클릭
	$(document).on("click", ".store-btn",function(){
        $.storeClick();
		selectSkin(1);
	});

    
    // 옷장 버튼 클릭 함수 생성
    $.dressClick = function(){
        // 1. 상점 버튼 투명하게
        $(".store-btn").css("opacity", "0.7");
        $(".dress-btn").css("opacity", "1");
        
        // 2. 커서 포인터 없애기
        $(".dress-btn").css("cursor", "default");
        $(".store-btn").css("cursor", "pointer");
        
        // 3. 구입 버튼(class="closet-buy") -> display: "none";
        $(".closet-buy").hide();
        $(".closet-wear").show();
        
        // 4. 가격, 보유중 라벨(class="closet-price") -> display: "none";
        $(".closet-price").css("display", "none");
        
        // 5. 내가 보유중인 스킨만 표시(DB -> "CHARACTER"테이블 SELECT)

    }

	
    // 상점 버튼 클릭 함수 생성
    $.storeClick = function(){
        // 1. 옷장 버튼 투명하게
        $(".dress-btn").css("opacity", "0.7");
        $(".store-btn").css("opacity", "1");

        // 2. 커서 포인터 없애기
        $(".store-btn").css("cursor", "default");
        $(".dress-btn").css("cursor", "pointer");

        // 3. 착용 버튼(class="closet-wear") -> display: "none";
        $(".closet-wear").hide();
        $(".closet-buy").show();

        // 4. 가격, 보유중 라벨(class="closet-price") -> display: "block";
        $(".closet-price").css("display", "block");

        // 5. 내가 보유한 스킨이라면 (class="closet-price")


    }
})
window.onload = function(){
	init();
}
