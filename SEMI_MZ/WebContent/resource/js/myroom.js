/*
 *	작성자 : 노지의
 *	마이룸  JS
 */
$(function(){
	/* ==================================== 방명록 ==================================== */
    /* 방명록 모달창 */
    $.boardModal = function(){
        $(".board-wrap").show();
        $(".board-modal").show();
        $(".board-detail").hide();
        $(".board-send-list").hide();
        $(".board-send-detail").hide();
        $(".board-write").hide();
    };

    /* x버튼 or 바깥 클릭시 모달창 사라짐 */
    $("body").on("click", function(e) {
        //c onsole.log(e.target);
        if(e.target.className == 'x-btn' || e.target.className == 'board-wrap'){
            $(".board-wrap").hide(); // 방명록 모달 닫힘 
            $(".closet-wrap").hide(); // 옷장 모달 닫힘
        }
    });


    /* 나무아이콘 클릭 -> 방명록 리스트 */
    $(".icon-tree").click(function(e){
        $.boardModal();
        /* -------- 내 마이룸에서 보게될 화면 -------- */
        $(".board-list").show();
        
        /* -------- 친구네 집에서 보게될 화면 -------- */
/*        $(".board-send-list").show();*/
    });
    
    /* ------------------ 내 마이룸 ------------------ */
    /* 방명록 리스트 중 해당 게시글 클릭 -> 방명록 상세 */
    $(".board-list tr").click(function(){
        $(".board-list").hide();
        $(".board-detail").show();
        
        /* 공지사항 번호가져오기 */
        // let bno = $(this).children().eq(0).text();
        
        // location.href = "${ contextPath }/datail.bo?bno="+bno;
    });
    /* 방명록 상세:back-btn 클릭 -> 방명록 리스트 */
    $(".board-detail .back-btn").click(function(){
        $(".board-detail").hide();
        $(".board-list").show();
    });


    /*  */
    /* ------------------ 친구네 집 ------------------ */
    /* 친구한테 쓴 방명록 리스트 중 해당 게시글 클릭 -> 친구한테 쓴 방명록 상세 */
    $(".board-send-list-tr").click(function(){
        $(".board-send-detail").show();
        $(".board-send-list").hide();
    });
    
    /* 친구한테 쓴 방명록 상세:back-btn 클릭 -> 친구한테 쓴 방명록 리스트 */
    $(".board-send-detail .back-btn").click(function(){
        $(".board-send-detail").hide();
        $(".board-send-list").show();
    });
    
    
    /* 글쓰기 버튼 클릭 -> 방명록 작성 */
    $("#board-write").click(function(){
        $(".board-detail").hide();
        $(".board-send-list").hide();
        $(".board-send-detail").hide();
        $(".board-write").show();
    });
    
    /* 글작성:back-btn 클릭 -> 친구한테 쓴 방명록 리스트 */
    $(".board-write .back-btn").click(function(){
        $(".board-write").hide();
        $(".board-send-list").show();

    });
    
    

    



    
    /* 방명록 삭제 버튼 */

    /* 방명록 작성 이벤트 */

    // 친구한테 쓴 방명록 리스트 -> 내용클릭시


	/* ==================================== 옷방 ==================================== */
	/* 옷방 모달창 띄우기 */
    $(".icon-closet").click(function(e){
        $(".closet-wrap").show();
        // $(".closet-modal").show();
        $.dressClick();
    });
    
    // 옷장 버튼 클릭
    $(".dress-btn").click(function(){
        $.dressClick();
    });

    // 상점 버튼 클릭
    $(".store-btn").click(function(){
        $.storeClick();
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
        $(".closet-price").hide();
        
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
        $(".closet-price").show();

        // 5. 내가 보유한 스킨이라면 (class="closet-price")


    }
});