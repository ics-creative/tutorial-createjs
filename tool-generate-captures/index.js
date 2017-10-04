// 定数宣言 (必要に応じて書き換えてください)
const TARGET_FOLDER = '../samples'; // キャプチャーしたいHTMLのフォルダー
const OUTPUT_FOLDER = '../imgs'; // 保存先のフォルダー
const IGNORE_LIST = ['.DS_Store', 'Thumbs.db', '.idea']; // 無視リスト
const PHANTOM_JS_FILE = 'render.js'; // PhantomJSのパス

// 具体的な処理
const fs = require('fs');
const childProcess = require('child_process');
const phantomjs = require('phantomjs');
const binPath = phantomjs.path;
const render = 'render.js';

fs.readdir(TARGET_FOLDER, (err, files) => {
  const promises = [];
  files.map(file => {
    if (IGNORE_LIST.includes(file) === false) {
      const targetFilePath = `${TARGET_FOLDER}/${file}`;
      const outputFilePath = `${OUTPUT_FOLDER}/${file}.png`;
      const options = [
        PHANTOM_JS_FILE,
        targetFilePath,
        outputFilePath,
      ];
      const childPromise = new Promise((resolve) => {
        // ここでrender.jsをphantomjsで呼び出して実行する
        childProcess.execFile(binPath, options, (error, stdout, stderr) => {
          // プロセスの対象を出力
          console.log(`${file} をPhantomJSで変換を試みました`);
          // PhantomJS側のconsole情報を出力
          console.log(stdout);
          if (error) {
            // 書き出し失敗の詳細情報を出力
            console.error(error);
          } else {
            // 書き出し成功
          }
          resolve();
        });
      });
      promises.push(childPromise);
    }
  });

  console.log(`${TARGET_FOLDER} フォルダーのキャプチャーを始めます。ちょっとまってね！`);

  Promise
    .all(promises)
    .then((results) => {
      console.log(`${TARGET_FOLDER} のキャプチャーが終わったので ${OUTPUT_FOLDER} に入れておきました!!`);
    });
});