/*
 *	작성자 : 노지의
 *	마이룸  JS
 */
$(function(){
    /* 방명록 모달창 띄우기 */
    $(".icon-tree").click(function(e){
        $(".board-wrap").show();
        $(".board-modal").show();
        $(".board-list").show();
        $(".board-detail").hide();
    })
    
    /* 방명록 상세페이지 모달창 띄우기 */
    $(".board-content tr").click(function(){
        $(".board-list").hide();
        $(".board-detail").show();
        
        /* 공지사항 번호가져오기 */
        let bno = $(this).children().eq(0).text();
        
        // location.href = "${ contextPath }/datail.bo?bno="+bno;
    })
    
    /* x버튼 or 바깥 클릭시 모달창 사라짐 */
    $("body").on("click", function(e) { 
        if(e.target.className == 'x-btn' || e.target.className == 'board-wrap'){
            $(".board-wrap").hide();
        }
    })

    /* back버튼 클릭시 방명록리스트 모달창 보여짐 */
    $(".back-btn").click(function(e){
        $(".board-list").show();
        $(".board-detail").hide();
        
    })
    
    /* 방명록 삭제 버튼 */
    $("#alert-ok").click(function(){
		/*location.href = "${ contextPath }/delete.bo?bno=<%= b.getBoardNo() %>";*/
    })


});