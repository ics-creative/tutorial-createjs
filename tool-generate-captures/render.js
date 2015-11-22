var page = require('webpage').create();

// argsは、phantom.argsでアクセスできる。
var address = phantom.args[0];
var output = phantom.args[1];
var width = phantom.args[2];
var height = phantom.args[3];

console.log(address);
console.log(output);
console.log(width);
console.log(height);

page.viewportSize = {
    width: width,
    height: height,
    margin: '0px'
};

page.open(address,
    function (status) {
        console.log(status);
        if (status !== 'success') {
            console.log('error');
        } else {
            // 出力
            page.render(output);
            // 終了
            phantom.exit();
        }
    }
);