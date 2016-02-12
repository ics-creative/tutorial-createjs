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

    let fileRawName = fileName.split(".md").join("");

    // --------------------------------
    // h1 要素の選定
    // --------------------------------
    let headerMatch = articleMarkdown.match(/<h1>(.*?)<\/h1>/);
    let articleTitle = headerMatch ? headerMatch[1] : "";

    if (!headerMatch) {
      console.error(`h1 Element is not written. : ${fileName}`);
    } else {
      //	最初のH1だけ削除するとき。
      articleMarkdown = articleMarkdown.replace(headerMatch[0], "");
    }

    // --------------------------------
    // メタデータの選定
    // --------------------------------
    let articleAuthorArr = articleMarkdown.match(/<p><article-author>(.*?)<\/article-author><\/p>/);
    let articleAuthorStr = articleAuthorArr ? articleAuthorArr[1] : "";

    if (!articleAuthorArr) {
      console.error(`<article-author> Element is not written. : ${fileName}`);
    } else {
      // 要素を削除
      articleMarkdown = articleMarkdown.replace(articleAuthorArr[0], "");
    }

    // --------------------------------
    // メタデータの選定 (公開日)
    // --------------------------------

    let articleUpdatedArr = articleMarkdown.match(/<article-date-published>(.*?)<\/article-date-published>/);
    let articleUpdatedStr = articleUpdatedArr ? articleUpdatedArr[1] : "";
    let articleUpdatedDate = new Date(articleUpdatedStr);
    let articleUpdatedStrLocale = articleUpdatedArr ? toLocaleString(articleUpdatedDate) : "";

    if (!articleUpdatedArr) {
      console.error(`<article-date-modified> Element is not written. : ${fileName}`);
    } else {
      // 要素を削除
      articleMarkdown = articleMarkdown.replace(articleUpdatedArr[0], "");
    }

    // --------------------------------
    // メタデータの選定 (更新日)
    // --------------------------------

    let articleModifiedArr = articleMarkdown.match(/<article-date-modified>(.*?)<\/article-date-modified>/);
    let articleModifiedStr = articleModifiedArr ? articleModifiedArr[1] : "";
    let articleModifiedDate = new Date(articleModifiedStr);
    let articleModifiedStrLocale = articleUpdatedArr ? toLocaleString(articleModifiedDate) : "";

    if (!articleModifiedArr) {
      console.error(`<article-date-published> Element is not written. : ${fileName}`);
    } else {
      // 要素を削除
      articleMarkdown = articleMarkdown.replace(articleModifiedArr[0], "");
    }


    // --------------------------------
    // テンプレートへの適用
    // --------------------------------

    articleMarkdown = articleMarkdown.replace(/\<code class\=\"lang-/g, "<code class=\"hljs ");

    let url = `https://ics.media/tutorial-createjs/${fileRawName}.html`;

    let values = {
      "article-title": articleTitle,
      "article-markdown": articleMarkdown,
      "article-author": articleAuthorStr,
      "article-datePublished": articleUpdatedStr,
      "article-dateModified": articleModifiedStr,
      "article-datePublished-locale": articleUpdatedStrLocale,
      "article-dateModified-locale": articleModifiedStrLocale,
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

/**
 * 日付をフォーマットで変換します。
 * @param date Date オブジェクト
 * @returns {string} 「◯年◯月◯日」フォーマットの日付
 */
function toLocaleString(date:Date):string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}