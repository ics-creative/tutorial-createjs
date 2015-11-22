///<reference path="libs/node/node.d.ts" />
///<reference path="libs/phantom/phantom.d.ts" />

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

fs.readdir("../samples", (err: NodeJS.ErrnoException, files: string[]):void => {
	console.log(files);

	for (let i = 0; i<files.length; i++)
	{
		var outputFilePath = `../imgs/${files[i]}.png`;

		var url = `../samples/${files[i]}`;
		var options = [
			render,
			url,
			outputFilePath,
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
		console.log(outputFilePath, "nothing. create this file!");
	}

});
