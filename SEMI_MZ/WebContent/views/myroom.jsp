<!-- 마이룸 html -지의 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- css -->
    <link rel="stylesheet" href="/src/resource/css/myroom.css">

    <!-- js -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <script src="/src/resource/js/jquery-3.6.3.js"></script>
    <script src="/src/resource/js/closet.js"></script>
    <title>My room</title>
</head>
<body>
    <div class="myroom">
        <div class="icon_closet">
            <!-- 옷장 클릭시 페이지 이동 -->
            <a href="closet.html">
                <img id="closet" src="/src/resource/img/icon/옷장.png" alt="옷장">
                <img id="closet-hover" src="/src/resource/img/icon/옷장_hover.png" alt="옷장호버">
            </a>
        </div>
        <div class="icon_tree">
            <img id="tree" src="/src/resource/img/icon/tree.png" alt="방명록나무">
            <img id="tree-hover" src="/src/resource/img/icon/tree_hover.png" alt="방명록나무호버">
        </div>
        <div class="user">
            <input type="checkbox" name="heart-ck" id="heart"><label for="heart">12</label>

            <img id="user-skin" src="/src/resource/img/user/skin01/fs.png" alt="유저캐릭터">
        </div>
    </div>
</body>
</html>