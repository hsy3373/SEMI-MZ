/**
 * 작성자 : 노지의
 * 마이룸 - 옷장
 */
import { getContextPath } from "../common.js";
let path = getContextPath();

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
						  + "<div class='closet-price' id='"+list[i].price+"'>" + list[i].price +"</div>"
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

/* 로그인 유저가 보유한 스킨 */
function mySkin(num){
	$.ajax({
		url : path + "/mySkinList.my",
		data : {page : num},
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


/*페이징 설정*/
function init() {
	document.querySelectorAll(".page-btn").forEach(function (el) {
		el.addEventListener("click", function () {
		// 기존에 선택된 버튼이 있었다면 선택 해제
		if(document.querySelector(".selected-btn") != null) {
			document.querySelector(".selected-btn").className = "page-btn";
		}
		//		상점	 	   /		옷장
		// $(".store-btn") / $(".dress-btn")
		if($(".store-btn").css("opacity") == 1){
			selectSkin(this.innerText);
		}else if($(".dress-btn").css("opacity") == 1){
			mySkin(this.innerText);
		}
		
		this.className = "selected-btn page-btn";
		});
	});

}

/* 옷장 -> 스킨박스 스킨 클릭시 왼쪽 대표 스킨에 이미지 적용 + 착용버튼 활성화 */
$(document).on('click', '.closet-skins img' ,function(){
	/*클릭한 스킨박스의 스킨 src값*/
	let changeSkin = $(this).attr('src');
	/*왼쪽 대표스킨 src값에 클릭한 스킨 src값으로 넣어주기*/
	$(".view-skin img").attr('src', changeSkin);
	/*loginUserSkinId : 현재 로그인유저의 스킨ID값 (myroom.jsp에서 가져옴)*/
	let userSkin = path+"resource/img/user/skin"+loginUserSkinId+"/fs.png" 
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

/*현재 스킨 교체 함수 -> 위의 클릭이벤트에 적용*/
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
				//console.log(changeSkin);
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

/* 구입버튼 클릭
	1. CHARACTER 테이블에 구입스킨 INSERT
	2. MEMBER 	 테이블에 COIN  UPDATE -> loginUser 정보 변경 */

/* 상점 -> 스킨박스 스킨 클릭시 왼쪽 대표 스킨에 이미지 적용 + 구입버튼 활성화 */
$(document).on('click', '.store-skins img', function(){
	/*클릭한 스킨박스의 스킨 src값*/
	let changeSkin = $(this).attr('src');
	/*왼쪽 대표스킨 src값에 클릭한 스킨 src값으로 넣어주기*/
	$(".view-skin img").attr('src', changeSkin);
	
	/* 구입 클릭시 해당 스킨아이디값 필요하기 때문에
	   이미지 태그의 id에 각 스킨 아이디값 부여해줌 -> 왼쪽 미리보기 스킨에 id값 추가 */
	let id = $(this).attr("id");
	$(".view-skin .user-skin").attr("id", id);
		
	// 구입버튼 활성화 + 커서 포인터
	if(loginUserSkinId != id && loginUserCoin != 0){
		$(".closet-buy").attr("disabled", false);
		$(".closet-buy").css("cursor", "pointer");
	}else{
		$(".closet-buy").attr("disabled", true);
		$(".closet-buy").css("cursor", "default");
	}
})

/*구입 클릭 이벤트*/
$(document).on('click', '.closet-buy', function(){
	
	if(confirm("구입하시겠습니까? 현재 스킨이 바로 변경됩니다!")){
		buySkin();
	}else{
		return false;
	}
});
/*CHARACTER 테이블에 구입스킨 INSERT + MEMBER 테이블에 COIN UPDATE*/
function buySkin(){
	// 스킨 아이디값 얻어와야됨
	let skinId = $(".view-skin .user-skin").attr("id");
	//console.log("넘길 스킨 아이디 : "+skinId)
	$.ajax({
		url : path + "/insertMySkin.my",
		data : {skinId : skinId},
		success : function(result){
			// 성공시 result에 로그인유저 코인값 담겨있음
			// 실패시 result == -1
			if(result > -1){
				// 현재 스킨 교체 함수 실행
				updateMySkin();
				// 구입버튼 비활성화
				$(".closet-buy").attr("disabled", true);
				$(".closet-buy").css("cursor", "default");
				
				// myroom.jsp에 보이는 가격 변경
				$('.coin').html(result);
				
				// 상점리스트 첫페이지로 적용
				selectSkin(1);
				// 첫번째 버튼 클릭
				document.querySelectorAll(".paging-store .page-btn")[0].click();
			}else{
				// 실패할때처리
				alert("코인이 부족합니다!");

				// 구입버튼 비활성화
				$(".closet-buy").attr("disabled", true);
				$(".closet-buy").css("cursor", "default");
			}
		},
		error : function(e){console.log("접속 실패애애애애");}
	})
}

$(function () {
	/* 마이룸에서 옷장 아이콘 클릭*/
	$(document).on('click','.icon-closet',function(){
		if(roomMasterId == ''){
	        $(".closet-wrap").show();
	        $(".closet-modal").show();
	        $.dressClick();
			// 미리보기 이미지 현재 로그인유저 이미지로 설정
			$(".view-skin .user-skin").attr('src',path+"/resource/img/user/skin"+loginUserSkinId+"/fs.png");
			mySkin(1);
			init();
		}else{
			/*룸마스터 값이 있을 경우 옷장이벤트 x*/
			$(".icon-closet").off('click');
		}
		
	})

    /*옷장 버튼 클릭*/
	$(document).on("click", ".dress-btn",function(){
        $.dressClick();
		mySkin(1);
		init();
		//가장 첫 버튼 클릭
		document.querySelectorAll(".paging-dress .page-btn")[0].click();
	});
    /*상점 버튼 클릭*/
	$(document).on("click", ".store-btn",function(){
        $.storeClick();
		selectSkin(1);
		init();
		//가장 첫 버튼 클릭
		document.querySelectorAll(".paging-store .page-btn")[0].click();
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
		
		// 페이징바 설정
		$(".paging-store").css("display", "none");
		$(".paging-dress").css("display", "block");
		
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

		// 구입버튼 비활성화
		$(".closet-buy").attr("disabled", true);
		
		// 페이징바 보이게
		$(".paging-store").css("display", "block");
		$(".paging-dress").css("display", "none");
		


    }
});

$(function(){
	/*방주인 스킨이미지 적용하기*/
	$.ajax({
		url : path + "/friendSkin",
		//method: 'post',
		data : {roomMasterId : roomMasterId},
		success : function(id){
			// id : 방주인의 스킨아이디 -> img 태그에 src 경로 추가
			$(".friend-skin").attr("src", path+"/resource/img/user/skin"+id+"/fs.png")
		},
		error : function(e){
			console.log(e);
		}
	});
})
