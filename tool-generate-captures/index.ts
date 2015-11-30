///<reference path="libs/node/node.d.ts" />
///<reference path="libs/phantom/phantom.d.ts" />
///<reference path="libs/es6-promise/es6-promise.d.ts" />

// gazo_fileがあるかないかの確認
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var render = "render.js";

// この辺が引数みたいな感じで渡したい
var width = "120";
var height = "80";

fs.readdir("../samples", (err:NodeJS.ErrnoException, files:string[]):void => {

	var promises = [];

	for (let i = 0; i < files.length; i++) {
		var outputFilePath = `../imgs/${files[i]}.png`;

		var url = `../samples/${files[i]}`;
		var options = [
			render,
			url,
			outputFilePath,
			width,
			height
		];

		var childPromise = new Promise((resolve:Function)=> {
				console.log(`${i} : ${outputFilePath}`);
				// ここでrender.jsをphantomjsで呼び出して実行する
				childProcess.execFile(binPath, options, (error, stdout, stderr) => {
					console.log(stdout);
					if (error != null) {
						console.error(stderr);
						console.error('error: ' + error);
					}
					resolve();
				});
			});

		promises.push(childPromise);
	}

	Promise
		.all(promises)
		.then((results)=> {
			console.log("finish!!!");
		});
});
