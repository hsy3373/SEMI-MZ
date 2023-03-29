import * as Common from "./common.js";

Common.delAllCookies();

document.cookie = "loginUser=" + encodeURIComponent("test") + "; path=/mzone";
