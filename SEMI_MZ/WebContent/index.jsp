<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />

    <title>M-Zone</title>
    <link href="./resource/css/common.css" rel="stylesheet" type="text/css" />
    <style>
      .index-logo {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: center;
        margin-top: 10vh;
      }
    </style>
  </head>
  <body>
    <div class="index-logo">
      <img src="./resource/img/icon/logo.png" />
    </div>
    <script>
      sessionStorage.clear();

      window.onload = function (event) {
        window.open(
          "<%= request.getContextPath()%>/login.member",
          "windowName",
          "resizeable"
        );
      };
    </script>
  </body>
</html>
