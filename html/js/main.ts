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
  }
}
