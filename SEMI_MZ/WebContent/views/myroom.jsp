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
<title>My Room</title>
</head>
</head>
<body>
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
        
        
	<!-- 모달창 -->

    <button type="button" id="btn-modal">모달 창 열기 버튼</button>

    <div id="modal" class="modal-overlay">
        <div class="modal-window">
            <div class="x-btn"><img src="${ contextPath }/resource/img/icon/엑스 버튼.png"></div>
            <div class="board-content">

            </div>
        </div>
    </div>
    <script>
    	/* 모달창 띄우기 */
	    const modal = document.getElementById("modal");
	    const btnModal = document.getElementById("btn-modal");
	    btnModal.addEventListener("click", () => {
	        modal.style.display = "flex";
	    })
	    
	    /* 엑스버튼 */
/* 	    const closeBtn = modal.querySelector(".close-area");
		closeBtn.addEventListener("click", e => {
		    modal.style.display = "none"
		}) */
    </script>
    </div>
</body>
</html>