<!-- 지의 마이룸 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<c:set var="contextPath" value="<%= request.getContextPath() %>"/>
<link href="${ contextPath }/resource/css/myroom.css" rel="stylesheet" type="text/css">
<link href="${ contextPath }/resource/css/common.css" rel="stylesheet" type="text/css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>


<title>My Room</title>
</head>
</head>
<body>
	<!-- 마이룸 -->
    <div class="myroom">
        <div class="icon-closet">
            <!-- 옷장 클릭시 페이지 이동 -->
            <a href="closet.jsp">
                <img id="closet" src="${ contextPath }/resource/img/icon/옷장.png">
                <img id="closet-hover" src="${ contextPath }/resource/img/icon/옷장_hover.png">
            </a>
        </div>
        <div class="icon-tree">
        	<!-- 나무 클릭시 모달창 -->
        	<img id="tree" src="${ contextPath }/resource/img/icon/tree.png">
            <img id="tree-hover" src="${ contextPath }/resource/img/icon/tree_hover.png">
        </div>
        <div class="user">
            <input type="checkbox" name="heart-ck" id="heart">
            <label class="font" for="heart">12</label>

            <img id="user-skin" src="${ contextPath }/resource/img/user/skin01/fs.png">
        </div>
        
	</div>
	
	<!-- 모달창 -->
    <div class="board-modal">
    	<div class="board">
		    <div class="x-btn"><img class="x-btn" src="${ contextPath }/resource/img/icon/엑스 버튼.png"></div>
		    <div class="board-content"></div>
	    </div>
    </div>
    
    
    <script>
    $(function(){
    	/* 모달창 띄우기 */
    	$(".icon-tree").click(function(e){
    		$(".board-modal").show();
    	})
    	
    	/* x버튼 or 바깥 클릭시 모달창 사라짐 */
   	    $("body").on("click", function(e) { 
	        if(e.target.className == 'x-btn' || e.target.className == 'board-modal'){
	            $(".board-modal").hide();
	        }
	   	 })
      
    	
    })
    
    </script>
</body>
</html>