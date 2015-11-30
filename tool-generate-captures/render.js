var page = require('webpage').create();

// argsは、phantom.argsでアクセスできる。
var address = phantom.args[0];
var output = phantom.args[1];
var width = phantom.args[2];
var height = phantom.args[3];

console.log(address + " : " + output);

page.viewportSize = {
	width: width,
	height: height,
	margin: "0px",
	padding: "0px"
};

page.open(address,
	function (status) {
		console.log("status : " + status);
		if (status == 'success') {
			setTimeout(function () {
				// 出力
				page.render(output);
				// 終了
				phantom.exit();
			}, 500);
		} else {
			console.log('error');
		}
	}
);