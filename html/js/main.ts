///<reference path="jquery/jquery.d.ts" />

namespace project {

  $ = jQuery;
  $(document).ready(()=> {
    init();
  });

  function init():void {
    $("article a").removeAttr("target");
    $("article a[href^=http]").attr("target", "_blank");
    //$("a[href^=http://]").not($("a[href^=https://ics.media]")).attr("target", "_blank");

    console.log(location.href);
    console.log(location.href.indexOf("index.html"));
    if (location.href.indexOf("index.html") > -1) {
      $("div.link-index").hide();
    }

    $("a.share-twitter").attr("href", `https://twitter.com/share?text=${encodeURI($.trim($("h1").text()) + " - ICS MEDIA")}&lang=ja&url=${location.href}`).attr("target", "_blank");
    $("a.share-facebook").attr("href", `https://www.facebook.com/sharer/sharer.php?u=${location.href}`).attr("target", "_blank");

  }
}
