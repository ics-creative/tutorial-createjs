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
var header, footer;
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    console.log("href:" + href);
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
    var htmlHref = (href != null && href != "") ? " href=\"" + href + "\" " : "";
    var htmlTitle = (title != null && title != "") ? " title=\"" + title + "\" " : "";
    return "<a" + htmlHref + htmlTitle + ">" + text + "</a>";
};
renderer.image = function (href, title, text) {
    console.log("imgs:" + href);
    var absolutePass = href.indexOf("http") == 0;
    var sampledIndex = href.indexOf("../imgs/");
    if (!absolutePass && sampledIndex >= 0) {
        href = samplesUrl + href.slice(sampledIndex + "../".length);
    }
    var htmlHref = (href != null && href != "") ? " src=\"" + href + "\" " : "";
    var htmlTitle = (title != null && title != "") ? " title=\"" + title + "\" " : "";
    return "<img" + htmlHref + htmlTitle + ">" + text + "</a>";
};
marked.setOptions({
    highlight: function (code) {
        return require("highlight.js").highlightAuto(code).value;
    },
    renderer: renderer
});
var generateHTML = function (dirName, fileName, resolve) {
    fs.readFile("../" + dirName + fileName, "utf8", function (error, text) {
        if (error) {
            return;
        }
        var textValue = header + marked(text) + footer;
        fs.writeFile("../html/" + dirName + fileName.replace("md", "html"), textValue, function (error) {
            console.log(fileName + "- maked");
            if (error) {
                return;
            }
            resolve();
        });
    });
};
fs.readdir("../docs", function (err, files) {
    promises.push(new Promise(function (resolve) {
        mkdirp("../html/docs/", function (err) {
            if (err) {
                console.error("mkdir-error" + err);
            }
            else {
                resolve();
            }
        });
    }));
    promises.push(new Promise(function (resolve) {
        fs.readFile("template-header.html", "utf8", function (error, text) {
            header = text;
            resolve();
        });
    }));
    promises.push(new Promise(function (resolve) {
        fs.readFile("template-footer.html", "utf8", function (error, text) {
            footer = text;
            resolve();
        });
    }));
    promises.push(new Promise(function (resolve) {
        console.log("Readme.md");
        generateHTML("", "ReadMe.md", resolve);
    }));
    for (var i = 0; i < files.length; i++) {
        var filename = files[i];
        var childPromise = new Promise(function (resolve) {
            generateHTML("docs/", filename, resolve);
        });
        promises.push(childPromise);
    }
    Promise
        .all(promises)
        .then(function (results) {
        console.log("finish!!!");
    });
});
