///<reference path="typings/bundle.d.ts" />
var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");
var marked = require("marked");
var hilight = require("highlight");
var mkdirp = require("mkdirp");
var promises = [];
var githubUrl = "https://github.com/ics-creative/tutorial-createjs/";
var samplesUrl = "https://ics-creative.github.io/tutorial-createjs/";
var samplesHtmlUrl = "https://github.com/ics-creative/tutorial-createjs/blob/master/";
var templateHtml;
/**
 * テンプレート文字列を展開
 * http://webdesign-dackel.com/2015/07/17/javascript-template-string/
 * @param text:string テンプレート文字列
 * @param values:Object 展開する値
 * @return string
 */
var template = function (text, values) {
    if (!text) {
        console.log("template-error!");
        return "";
    }
    return text.replace(/\$\{(.*?)\}/g, function (all, key) {
        return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
    });
};
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    //console.log("href:" + href);
    var sampledIndex = href.indexOf("samples/");
    var absolutePass = href.indexOf("http") == 0;
    if (!absolutePass && sampledIndex >= 0) {
        href = samplesHtmlUrl + href.slice(sampledIndex);
    }
    else {
        if (!absolutePass && href.indexOf("md")) {
            href = href.replace("md", "html");
        }
    }
    var htmlHref = (href != null && href != "") ? " href=\"" + href + "\"" : "";
    var htmlTitle = (title != null && title != "") ? " title=" + title : "";
    return "<a" + htmlHref + htmlTitle + ">" + text + "</a>";
};
renderer.image = function (href, title, text) {
    //console.log("imgs:" + href);
    var absolutePass = href.indexOf("http") == 0;
    var sampledIndex = href.indexOf("../imgs/");
    if (!absolutePass && sampledIndex >= 0) {
        href = samplesUrl + href.slice(sampledIndex + "../".length);
    }
    var htmlHref = (href != null && href != "") ? " src=\"" + href + "\"" : "";
    var htmlTitle = (title != null && title != "") ? " title=" + title : "";
    return "<img" + htmlHref + htmlTitle + " />";
};
renderer.heading = function (text, level) {
    return "<h" + level + ">" + text + "</h" + level + ">";
};
marked.setOptions({
    highlight: function (code) {
        return require("highlight.js").highlightAuto(code).value;
    },
    renderer: renderer
});
var generateHTML = function (dirName, fileName, resolve) {
    fs.readFile("../docs/" + dirName + fileName, "utf8", function (error, text) {
        if (error) {
            return;
        }
        var articleMarkdown = marked(text);
        var headerMatch = articleMarkdown.match(/<h1>(.*?)<\/h1>/);
        var articleTitle = headerMatch ? headerMatch[1] : "";
        if (!headerMatch) {
            console.log("no header " + fileName);
        }
        else {
            //	最初のH1だけ削除するとき。
            articleMarkdown = articleMarkdown.replace(headerMatch[0], "");
        }
        articleMarkdown = articleMarkdown.replace(/\<code class\=\"lang-/g, "<code class=\"hljs ");
        var values = {
            "article-title": articleTitle,
            "article-markdwon": articleMarkdown
        };
        if (!templateHtml) {
            console.log(fileName + " generate error!");
            return;
        }
        var textValue = template(templateHtml, values);
        fs.writeFile("../html/" + dirName + fileName.replace("md", "html"), textValue, function (error) {
            //console.log(fileName + "- maked");
            if (error) {
                return;
            }
            resolve();
        });
    });
};
fs.readdir("../docs", function (err, files) {
    promises.push(new Promise(function (resolve) {
        mkdirp("../html/", function (err) {
            if (err) {
                console.error("mkdir-error" + err);
            }
            else {
                resolve();
            }
        });
    }));
    promises.push(new Promise(function (resolve) {
        fs.readFile("template-html.html", "utf8", function (error, text) {
            templateHtml = text;
            resolve();
        });
    }));
    for (var i = 0; i < files.length; i++) {
        var filename = files[i];
        var childPromise = new Promise(function (resolve) {
            generateHTML("", filename, resolve);
        });
        promises.push(childPromise);
    }
    Promise
        .all(promises)
        .then(function (results) {
        console.log("finish!!!");
    });
});
//# sourceMappingURL=index.js.map