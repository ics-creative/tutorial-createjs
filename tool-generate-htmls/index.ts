///<reference path="typings/bundle.d.ts" />
"use strict";

import fs = require("fs");
import path = require("path");
import childProcess = require("child_process");
import marked = require("marked");
import mkdirp = require("mkdirp");

let promises:any = [];
let samplesUrl = "https://ics-creative.github.io/tutorial-createjs/";
let samplesHtmlUrl = "https://github.com/ics-creative/tutorial-createjs/blob/gh-pages/";
let templateHtml:string;

/**
 * テンプレート文字列を展開
 * http://webdesign-dackel.com/2015/07/17/javascript-template-string/
 * @param text:string テンプレート文字列
 * @param values:Object 展開する値
 * @return string
 */
let template = (text:string, values:any) => {
  if (!text) {
    console.log("template-error!");
    return "";
  }

  return text.replace(/\$\{(.*?)\}/g, function (all, key) {
    return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : "";
  });
};

const renderer = new marked.Renderer();

renderer.link = (href:string, title:string, text:string) => {
  //console.log("href:" + href);

  let sampledIndex = href.indexOf("samples/");
  let absolutePass = href.indexOf("http") == 0;
  if (!absolutePass && sampledIndex >= 0) {
    href = samplesHtmlUrl + href.slice(sampledIndex);
  } else {
    if (!absolutePass && href.indexOf("md")) {
      href = href.replace("md", "html");
    }
  }

  let htmlHref = (href != null && href != "") ? ` href="${href}"` : "";
  let htmlTitle = (title != null && title != "") ? ` title=${title}` : "";

  return `<a${htmlHref}${htmlTitle}>${text}</a>`;
};


renderer.image = (href:string, title:string, text:string) => {
  //console.log("imgs:" + href);

  let absolutePass:boolean = href.indexOf("http") == 0;
  let sampledIndex:number = href.indexOf("../imgs/");
  if (!absolutePass && sampledIndex >= 0) {
    href = samplesUrl + href.slice(sampledIndex + ("../").length);
  }

  let htmlHref = (href != null && href != "") ? ` src="${href}"` : "";
  let htmlTitle = (title != null && title != "") ? ` title=${title}` : "";

  return `<img${htmlHref}${htmlTitle} />`;
};

renderer.heading = function (text:string, level:string) {
  return `<h${level}>${text}</h${level}>`;
};

marked.setOptions({
  highlight: function (code:string) {
    return require("highlight.js").highlightAuto(code).value;
  },
  renderer: renderer
});


let generateHTML = (dirName:string, fileName:string, resolve:Function) => {
  fs.readFile("../docs/" + dirName + fileName, "utf8", (error:any, text:string) => {

    if (error) {
      return;
    }
    let articleMarkdown = marked(text);
    let headerMatch = articleMarkdown.match(/<h1>(.*?)<\/h1>/);
    let articleTitle = headerMatch ? headerMatch[1] : "";
    let fileRawName = fileName.split(".md").join("");

    if (!headerMatch) {
      console.error(`h1 Element is not written. : ${fileName}`);
    } else {
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

    fs.writeFile("../html/" + dirName + fileName.replace("md", "html"), textValue, (error:any) => {
      //console.log(fileName + "- maked");
      if (error) {
        return;
      }
      resolve();
    });
  });
};

fs.readdir("../docs", (err:NodeJS.ErrnoException, files:string[]):void => {

  promises.push(new Promise((resolve:Function) => {
    mkdirp("../html/", function (err:any) {
      if (err) {
        console.error("mkdir-error" + err);
      } else {
        resolve();
      }
    });
  }));


  promises.push(new Promise((resolve:Function) => {
    fs.readFile("template-html.html", "utf8", (error:any, text:string) => {
      templateHtml = text;
      resolve();
    });
  }));

  for (let i = 0; i < files.length; i++) {
    let filename:string = files[i];

    let childPromise = new Promise((resolve:Function) => {
      generateHTML("", filename, resolve);
    });

    promises.push(childPromise);
  }

  Promise
      .all(promises)
      .then((results:any) => {
        console.log("[Success] HTML files are generated.");
      });
});
