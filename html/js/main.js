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
    }
})(project || (project = {}));
//# sourceMappingURL=main.js.map