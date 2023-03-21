<!-- 지의 마이룸 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="${ contextPath }/resource/css/myroom.css" rel="stylesheet" type="text/css">
<title>My Room</title>
</head>
</head>
<body>
    <div class="myroom">
        <div class="icon_closet">
            <!-- 옷장 클릭시 페이지 이동 -->
            <a href="closet.jsp">
                <img id="closet" src="${ contextPath }/resource/img/icon/옷장.png">
                <img id="closet-hover" src="${ contextPath }/resource/img/icon/옷장_hover.png">
            </a>
        </div>
        <div class="icon_tree">
            <img id="tree" src="${ contextPath }/resource/img/icon/tree.png">
            <img id="tree-hover" src="${ contextPath }/resource/img/icon/tree_hover.png">
        </div>
        <div class="user">
            <input type="checkbox" name="heart-ck" id="heart"><label for="heart">12</label>

            <img id="user-skin" src="${ contextPath }/resource/img/user/skin01/fs.png">
        </div>
    </div>
</body>
</html>