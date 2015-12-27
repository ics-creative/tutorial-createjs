///<reference path="libs/node/node.d.ts" />
///<reference path="libs/phantom/phantom.d.ts" />
"use strict";
// gazo_fileがあるかないかの確認
var fs = require('fs');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
let binPath = phantomjs.path;
let render = "render.js";
// この辺が引数みたいな感じで渡したい
const width = "180";
const height = "80";
const IGNORE_LIST = [".idea", ".DS_Store", "imgs", "css"];
fs.readdir("../samples", (err, files) => {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
        if (IGNORE_LIST.indexOf(files[i]) > -1) {
            continue;
        }
        if (i > 10)
            continue;
        let outputFilePath = `../imgs/${files[i]}.png`;
        let url = `../samples/${files[i]}`;
        let options = ["render.js", url, outputFilePath, width, height];
        let childPromise = new Promise((resolve) => {
            console.log(`${i} : ${outputFilePath}`);
            // ここでrender.jsをphantomjsで呼び出して実行する
            childProcess.execFile(binPath, options, (error, stdout, stderr) => {
                if (error != null) {
                    console.error(stderr);
                }
                else {
                    console.log(stdout);
                }
                resolve();
            });
        });
        promises.push(childPromise);
    }
    Promise
        .all(promises)
        .then((results) => {
        console.log("finish!!!");
    });
    console.log("step - 2");
});
console.log("step - 1");
