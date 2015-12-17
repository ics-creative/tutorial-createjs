///<reference path="jquery/jquery.d.ts" />
var project;
(function (project) {
    $ = jQuery;
    $(document).ready(function () {
        init();
    });
    function init() {
        $("article a").removeAttr("target");
        $("article a[href^=http]").attr("target", "_blank");
        //$("a[href^=http://]").not($("a[href^=https://ics.media]")).attr("target", "_blank");
        console.log(location.href);
        console.log(location.href.indexOf("index.html"));
        if (location.href.indexOf("index.html") > -1) {
            $("div.link-index").hide();
        }
        $("a.share-twitter").attr("href", "https://twitter.com/share?text=" + encodeURI($.trim($("h1").text()) + " - ICS MEDIA " + location.href) + "&lang=ja&url=" + location.href);
        $("a.share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + location.href);
    }
})(project || (project = {}));
//# sourceMappingURL=main.js.map