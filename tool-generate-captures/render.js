const page = require('webpage').create();
const system = require('system');

// argsは、phantom.argsでアクセスできる。
const address = system.args[1];
const output = system.args[2];

page.viewportSize = {
  margin: '0px',
  padding: '0px'
};

page.open(address,
  function (status) {
    if (status === 'success') {
      setTimeout(function () {
        // 出力
        page.render(output);
        console.error('キャプチャーに成功しました');
        // 成功として終了
        phantom.exit(0);
      }, 50)

    } else {
      console.error('キャプチャーに失敗しました');
      // エラーとして終了
      phantom.exit(1);
    }
  }
);