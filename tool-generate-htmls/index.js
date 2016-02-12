///<reference path="typings/bundle.d.ts" />
"use strict";
var fs = require("fs");
var marked = require("marked");
var mkdirp = require("mkdirp");
let promises = [];
let samplesUrl = "https://ics-creative.github.io/tutorial-createjs/";
let samplesHtmlUrl = "https://github.com/ics-creative/tutorial-createjs/blob/gh-pages/";
let templateHtml;
/**
 * テンプレート文字列を展開
 * http://webdesign-dackel.com/2015/07/17/javascript-template-string/
 * @param text:string テンプレート文字列
 * @param values:Object 展開する値
 * @return string
 */
let template = (text, values) => {
    if (!text) {
        console.log("template-error!");
        return "";
    }
    return text.replace(/\$\{(.*?)\}/g, function (all, key) {
        return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
    });
};
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
    //console.log("href:" + href);
    let sampledIndex = href.indexOf("samples/");
    let absolutePass = href.indexOf("http") == 0;
    if (!absolutePass && sampledIndex >= 0) {
        href = samplesHtmlUrl + href.slice(sampledIndex);
    }
    else {
        if (!absolutePass && href.indexOf("md")) {
            href = href.replace("md", "html");
        }
    }
    let htmlHref = (href != null && href != "") ? ` href="${href}"` : "";
    let htmlTitle = (title != null && title != "") ? ` title=${title}` : "";
    return `<a${htmlHref}${htmlTitle}>${text}</a>`;
};
renderer.image = (href, title, text) => {
    //console.log("imgs:" + href);
    let absolutePass = href.indexOf("http") == 0;
    let sampledIndex = href.indexOf("../imgs/");
    if (!absolutePass && sampledIndex >= 0) {
        href = samplesUrl + href.slice(sampledIndex + ("../").length);
    }
    let htmlHref = (href != null && href != "") ? ` src="${href}"` : "";
    let htmlTitle = (title != null && title != "") ? ` title=${title}` : "";
    return `<img${htmlHref}${htmlTitle} />`;
};
renderer.heading = function (text, level) {
    return `<h${level}>${text}</h${level}>`;
};
marked.setOptions({
    highlight: function (code) {
        return require("highlight.js").highlightAuto(code).value;
    },
    renderer: renderer
});
let generateHTML = (dirName, fileName, resolve) => {
    fs.readFile("../docs/" + dirName + fileName, "utf8", (error, text) => {
        if (error) {
            return;
        }
        let articleMarkdown = marked(text);
        let headerMatch = articleMarkdown.match(/<h1>(.*?)<\/h1>/);
        let articleTitle = headerMatch ? headerMatch[1] : "";
        let fileRawName = fileName.split(".md").join("");
        if (!headerMatch) {
            console.error(`h1 Element is not written. : ${fileName}`);
        }
        else {
            //	最初のH1だけ削除するとき。
            articleMarkdown = articleMarkdown.replace(headerMatch[0], "");
        }
        articleMarkdown = articleMarkdown.replace(/\<code class\=\"lang-/g, "<code class=\"hljs ");
        let now = new Date();
        let articleDateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
        let url = `https://ics.media/tutorial-createjs/${fileRawName}.html`;
        let values = {
            "article-title": articleTitle,
            "article-markdown": articleMarkdown,
            "article-date": articleDateStr,
            "url": url
        };
        if (!templateHtml) {
            console.log(fileName + " generate error!");
            return;
        }
        let textValue = template(templateHtml, values);
        fs.writeFile("../html/" + dirName + fileName.replace("md", "html"), textValue, (error) => {
            //console.log(fileName + "- maked");
            if (error) {
                return;
            }
            resolve();
        });
    });
};
fs.readdir("../docs", (err, files) => {
    promises.push(new Promise((resolve) => {
        mkdirp("../html/", function (err) {
            if (err) {
                console.error("mkdir-error" + err);
            }
            else {
                resolve();
            }
        });
    }));
    promises.push(new Promise((resolve) => {
        fs.readFile("template-html.html", "utf8", (error, text) => {
            templateHtml = text;
            resolve();
        });
    }));
    for (let i = 0; i < files.length; i++) {
        let filename = files[i];
        let childPromise = new Promise((resolve) => {
            generateHTML("", filename, resolve);
        });
        promises.push(childPromise);
    }
    Promise
        .all(promises)
        .then((results) => {
        console.log("[Success] HTML files are generated.");
    });
});
