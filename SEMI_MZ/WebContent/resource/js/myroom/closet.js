/**
 * 작성자 : 노지의
 * 마이룸 - 옷장
 */
import { getContextPath } from "../common.js";
import { getSessionStorage, setSessionStorage } from "./myroomCommon.js";
let path = getContextPath();

let closetSkinCount = getSessionStorage('closetSkinCount');
//console.log("총게시글갯수 : "+closetSkinCount);
/* 상점 클릭시 모든 리스트가 출력됨
   옷장 클릭시 loginUser의 스킨목록이 있는 것만 출력됨 */
/*페이지별 스킨리스트 가져오는 함수 num값에 따라서 보여지는 화면이 달라짐)*/
function selectSkin(num){
	$.ajax({
		url : path + "/skinList.my",
		data : {page : num},
		success : function(list){
			//console.log(list);
			let str = "";
			for(let i = 0; i < list.length; i++){
				str += "<div class='closet-item'>" 
						  +"<div class='closet-skin-id' id='skin"+i+"' style='display: none;'>" + list[i].skinId +"</div>"
						  + "<div class='closet-price'>" + list[i].price +"</div>"
						  + "<div class='closet-skin'>"
						 	+"<img src='."+ list[i].saveRoot +"/fs.png' id='"+list[i].skinId+"'>"
						  + "</div>"
					 + "</div>"
			}
			$(".store-skins").html(str);
		},
		error : function(e){
			console.log("접속실패");
		}
	});
};
/*페이징 설정*/
function init() {
  document.querySelectorAll(".page-btn").forEach(function (item, index) {
    //console.log(item);
    //console.log("인덱스 :"+index);
    item.addEventListener("click", function () {
      // 기존에 선택된 버튼이 있었다면 선택 해제
      if (document.querySelector(".selected-btn") != null) {
        document.querySelector(".selected-btn").className = "page-btn";
      }
      // 승은님꺼
      //selectSkin(this.innerText);
      selectSkin(index + 1);

      this.className = "selected-btn page-btn";
      /* ★★★★★★★★★★★★★★★★★★★★★클래스명으로 css 부여해야됨!!!!!!!★★★★★★★★★★★★★★★★★★★★★★★★★ */
	
    });
  });
}
/* 해결 못함 */
$(function(){
	$(document).on("click",".store-btn",function(){
		$.ajax({
			url : path + "/mySkinList.my",
			success : function(list){
				// 내가 보유한 리스트를 조회
				// 전체 리스트인 closet-skin-id 의 text()와, 조회한 리스트의 skinId 값과 일치한다면
				// $(".closet-price").text("보유중");
				
				//console.log(list);
				for(let i = 0; i < list.length; i++){
					//console.log(list[i].skinId);
					if(list[i].skinId == $(".store-skins #skin"+(i+1)).text()){
						//console.log("??");
						$(".store-skins .closet-price").text("보유중");
					}
				}
				/*for(let i=0; i<closetSkinCount; i++){
					console.log(list[i].skinId); //0 3 5
					console.log($("#skin"+(i+1)).text());
					if(i.skinId == $(".closet-skin-id").text()){
						console.log("일치");
					}
				}*/
			}
		})
	})

})
/* 로그인 유저가 보유한 스킨 */
function mySkin(){
	$.ajax({
		url : path + "/mySkinList.my",
		success : function(list){
			//console.log(list);

			let str = "";
			for(let i = 0; i < list.length; i++){
				str += "<div class='closet-item'>" 
						  +"<div class='closet-skin-id' id='myskin"+i+"' style='display: none;'>" + list[i].skinId +"</div>"
						  + "<div class='closet-skin'>"
						 	+"<img src='."+ list[i].saveRoot +"/fs.png'>"
						  + "</div>"
					 + "</div>";
			}
			$(".closet-skins").html(str);
		},
		error: function (jqXHR, textStatus, errorThrown) {
      		console.log("Error: " + errorThrown);
    	}
	});
};

/* 옷장 -> 스킨박스 스킨 클릭시 왼쪽 대표 스킨에 이미지 적용 + 착용버튼 활성화 */
$(document).on('click', '.closet-skins img' ,function(){
	/*클릭한 스킨박스의 스킨 src값*/
	let changeSkin = $(this).attr('src');
	/*왼쪽 대표스킨 src값에 클릭한 스킨 src값으로 넣어주기*/
	$(".view-skin img").attr('src', changeSkin);
	/*loginUserSkinId : 현재 로그인유저의 스킨ID값 (myroom.jsp에서 가져옴)*/
	let userSkin = "./resource/img/user/skin"+loginUserSkinId+"/fs.png" 
	//console.log(changeSkin);
	//console.log(userSkin);
	if(changeSkin != userSkin){
		$(".closet-wear").attr("disabled", false);
		$(".closet-wear").css("cursor", "pointer");
	}else{
		wearDisabled();
	}

});

/* 착용버튼 클릭시 로그인유저 스킨아이디 적용 */
$(document).on("click",".closet-wear", function(){
	updateMySkin();
});
function updateMySkin(){
	/*바뀐 스킨값 스킨아이디값 빼냄*/
	let skinId;
	if($(".view-skin .user-skin").attr('src').length == 32){
		skinId = $(".view-skin .user-skin").attr('src').substr(24,1);
	}else if($(".view-skin .user-skin").attr('src').length == 33){
		skinId = $(".view-skin .user-skin").attr('src').substr(24,2);
	}
	//console.log(skinId);
	$.ajax({
		url : path  +"/updateMySkin.my",
		data : {skinId : skinId},
		success : function(result){
			if(result > 0){
				/*옷장 왼쪽 스킨, 마이룸 가운데 스킨 이미지 변경*/
				/* loginUserSkinId : myroom.jsp에서 가져온 skinId값 -> 변경된 skinId로 */
				loginUserSkinId = skinId;
				/*바꾸고자하는 스킨 경로*/
				let changeSkin = $(".view-skin .user-skin").attr('src');
				console.log(changeSkin);
				/*기존 스킨경로 바꾸고자하는 스킨 경로로 변경*/
				$(".user-skin").attr('src', changeSkin);
				if(loginUserSkinId == skinId){
					wearDisabled();
				}
			}
			
		},
		error : function(e){console.log("ㅎ접속 실패");}
	});
};

/*착용버튼 비활성화*/
function wearDisabled(){
	$(".closet-wear").attr("disabled", true);
	$(".closet-wear").css("cursor", "default");
}

/*
	구입버튼 클릭
	1. CHARACTER 테이블에 구입스킨 INSERT
	2. MEMBER 	 테이블에 COIN  UPDATE -> loginUser 정보 변경
*/
/* 상점 -> 스킨박스 스킨 클릭시 왼쪽 대표 스킨에 이미지 적용 + 착용버튼 활성화 */
$(document).on('click', '.store-skins img', function(){
	/*클릭한 스킨박스의 스킨 src값*/
	let changeSkin = $(this).attr('src');
	/*왼쪽 대표스킨 src값에 클릭한 스킨 src값으로 넣어주기*/
	$(".view-skin img").attr('src', changeSkin);
	
	let Id = $(this).attr("id");
	console.log(Id);
	$(".view-skin .user-skin").attr("id", Id);
	/*let skinId = $(".view-skin .user-skin").attr("id");
	console.log("넘길 스킨 아이디 : "+skinId);*/
})

/*구입 클릭 이벤트*/
$(document).on('click', '.closet-buy', function(){
	// 스킨 아이디값 얻어와야됨
	//let skinId = $(".view-skin .user-skin").attr("id");
	//console.log("넘길 스킨 아이디 : "+skinId)


	$(".view-skin .user-skin").attr("id", Id);
	let skinId = $(".view-skin .user-skin").attr("id");
	console.log("넘길 스킨 아이디 : "+skinId);
	
	
	
	
	/*$.ajax({
		url : path + "/insertMySkin.my",
		data : {skinId : skinId},
		success : function(){
			console.log("접속성고오옹");
		},
		error : function(e){console.log("접속 실패애애애애");}
	})*/
});


$(function () {
	/* 마이룸에서 옷장 아이콘 클릭*/
	$(document).on('click','.icon-closet',function(){
		init();
		if(roomMasterId == ''){
	        $(".closet-wrap").show();
	        $(".closet-modal").show();
	        $.dressClick();
			// 미리보기 이미지 현재 로그인유저 이미지로 설정
			$(".view-skin .user-skin").attr('src',"./resource/img/user/skin"+loginUserSkinId+"/fs.png");
			mySkin();
		}else{
			/*룸마스터 값이 있을 경우 옷장이벤트 x*/
			$(".icon-closet").off('click');
		}
	})

    /*옷장 버튼 클릭*/
	$(document).on("click", ".dress-btn",function(){
        $.dressClick();
		mySkin();
	});
    /*상점 버튼 클릭*/
	$(document).on("click", ".store-btn",function(){
        $.storeClick();
		selectSkin(1);
	});

    /*옷장 버튼 클릭 함수 생성*/
    $.dressClick = function(){
		// 0. 옷장 박스 보이기
		$(".closet-skins").show();
		$(".store-skins").hide();
	
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
        
        // 미리보기 이미지 현재 로그인유저 이미지로 설정, 착용버튼 비활성화
		$(".view-skin .user-skin").attr('src',"./resource/img/user/skin"+loginUserSkinId+"/fs.png");
		wearDisabled();

    }
  

	/*상점 버튼 클릭 함수 생성*/
    $.storeClick = function(){
		// 0. 상점 박스 보이기
		$(".store-skins").show();
		$(".closet-skins").hide();
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

        // 미리보기 이미지 현재 로그인유저 이미지로 설정
		$(".view-skin .user-skin").attr('src',"./resource/img/user/skin"+loginUserSkinId+"/fs.png");


    }
});
