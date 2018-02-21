import * as $ from "jquery";

$(document).ready(() => {
  init();
});

// 初期化関数
function init() {
  $("article a").removeAttr("target");
  $("article a[href^=http]")
    .attr("target", "_blank")
    .attr("rel", "noopener");
  //$("a[href^=http://]").not($("a[href^=https://ics.media]")).attr("target", "_blank");

  if (location.href.indexOf("index.html") > -1) {
    $("div.link-index").hide();
  }

  if(Math.random() > 0.5){
    $("body").removeClass("theme-dark").addClass("theme-light");
  }else{
    $("body").removeClass("theme-light").addClass("theme-dark");
  }


  // 共有ボタン
  $("a.share-twitter")
    .attr(
      "href",
      `https://twitter.com/share?text=${encodeURI(
        $.trim($("h1").text()) + " - ICS MEDIA"
      )}&lang=ja&url=${location.href}`
    )
    .attr("target", "_blank");
  $("a.share-facebook")
    .attr(
      "href",
      `https://www.facebook.com/sharer/sharer.php?u=${location.href}`
    )
    .attr("target", "_blank");
}

// ----------------------------------
// Google Analytics の初期化コード
// ---------------------------------

var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-34243464-2"]);
_gaq.push(["_trackPageview"]);
(function() {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src =
    ("https:" == document.location.protocol ? "https://ssl" : "http://www") +
    ".google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();
