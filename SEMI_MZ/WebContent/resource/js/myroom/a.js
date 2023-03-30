/**
 * 
 */
//else if(BoardList[0].receiveId == 'friend')
$(function(){
/* ================================== 방명록 상세 조회 =================================== */

    /* 방명록 리스트 중 해당 게시글 클릭 -> 방명록 상세 */
    $(document).on("click", ".board-list tr" ,function(){
	    $(".board-list").hide();
	    $(".board-detail").show();
	    
		let path = getContextPath();
	
		// 방명록 번호
		let boardNo = $(this).children("#board-no").text();
		console.log(boardNo);
		
		/* 방명록 상세 조회 */
		$.ajax({
			url : path+"/selectBoard" ,
			data : { boardNo : boardNo } ,
			success : function(b){
				// 제목
				title = b.boardTitle;
				
				// 유저스킨
				skin = "";
				skin += "<img class='friend-skin' src=''>"
					  + "<div class='friend-id'>" + b.receiveId + "</div>";
				
				// 방명록 내용
				content = "";
				content += "<div class='detail-table-date'>" + b.createDate + "</div>"
						 + "<div class='detail-table-text'>" + b.boardContent + "</div>";
				
				// 해당 클래스에 내용 추가
				$(".board-detail-title").html(title);
				$(".board-detail-friend").html(skin);
				$(".board-detail-table").html(content);
				
			},
			error : function(){
				console.log("실패")
			}
		})

    });

    /* 방명록 상세:back-btn 클릭 -> 방명록 리스트 */
    $(".board-detail .back-btn").click(function(){
        $(".board-detail").hide();
        $(".board-list").show();
    });
/* ====================================================================================== */
	
/* ============================== 친구네룸 - 내가 쓴 방명록 상세 조회 ============================== */
	$(document).on('click', '.board-send-list .board-send-list-tr', function(){
        $(".board-send-detail").show();
        $(".board-send-list").hide();
		
	});	
		// ★★★★★★★★★★★★★★★ 방명록 리스트 처리되면 위에 코드 안으로 넣어줘야됨(코드 넣기전 테스트 완료) ★★★★★★★★★★★★★★★
		// 비밀글체크시 Y 또는 N값 넣어주기위한 이벤트
		$("#board-ck").change(function(){
			if(this.checked){
				$(this).attr("value", 'Y');
			}else{
				$(this).attr("value", 'N');
			}
		});
	
		
		let BoardNo = $(this).children("#board-no").text();
		let path = getContextPath();
		
		$.ajax({
			type : 'post',
			url : path+"/selectSendBoard",
			data : {boardNo : 17},
			success : function(b){
				
				// 제목, 내용
				title = $("#board-write-title").val(b.boardTitle);
				content = b.boardContent;
				
				$(".board-detail-title").html(title);
				$("#board-write-content").html(content);
				console.log("비밀글 조회시 체크상태 : " + b.secret);
				// 비밀글 체크상태
				if(b.secret == 'Y'){
					$("#board-ck").prop("checked", true);
				}else{
					$("#board-ck").prop("checked", false);
				}
			},
			error : function(e){
				console.log(e);
			}

		});
	
/* ====================================================================================== */
});