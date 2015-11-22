// gazo_fileがあるかないかの確認
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var render = "render.js";

// この辺が引数みたいな感じで渡したい
var gazo_name = "www.google.co.jp";
var gazo_file = gazo_name + ".png";
var width = "120";
var height = "80";

// あるかないかの確認
fs.exists(gazo_file, function (exists) {
    if (exists) {
        console.log(gazo_file, "is exists!");

        // gazo_fileがなかったらつくる
    } else {
        var url = "samples/0_quickstart.html";
        var options = [
            render,
            url,
            gazo_file,
            width,
            height
        ];

        // ここでrender.jsをphantomjsで呼び出して実行する
        childProcess.execFile(binPath, options, function (error, stdout, stderr) {
            console.log(stdout);
            console.error(stderr);
            if (error != null) {
                console.error('error: ' + error);
            }
        });
        console.log(gazo_file, "nothing. create this file!");
    }
});