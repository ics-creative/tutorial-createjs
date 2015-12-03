# CreateJS のマルチデバイス対応

![](../imgs/fullscreen.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/fullscreen.html)
- [サンプルのソースコードを確認する](../samples/fullscreen.html)


## スマートフォン向けにフルスクリーンに対応させる

対応のためには次のポイントを対応します。

- スマホブラウザではウェブページの拡大・縮小ができます。この挙動とHTML5 Canvasの制御との相性が悪いのでこの機能を向こうにします。
  - `<meta name="viewport" content="・・・">`タグをいれ、ウェブページが拡大・縮小されないようにします。
- `canvas`要素を画面全域に配置するようにします。
  - スタイルシート`style`タグを使って、全画面化するための準備をします。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <script src="https://code.createjs.com/createjs-2015.05.21.min.js"></script>
    <script>
        // 読み込みが終わってから初期化
        window.addEventListener("load", init);
        function init() {
            // ・・・
        }
    </script>
    <style>
        canvas#myCanvas {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <canvas id="myCanvas"
            style="background:lightgray;">
    </canvas>
</body>
</html>

```



## ステージのフィッティング

JavaScript側の制御にも設定が必要です。リサイズイベント`resize`を検知して、`canvas`要素のサイズを画面サイズにあわせます。

```js
// ステージを作成
var stage = new createjs.Stage("myCanvas");

// リサイズイベントを検知してリサイズ処理を実行
window.addEventListener("resize", handleResize);
handleResize(); // 起動時にもリサイズしておく

// リサイズ処理
function handleResize(event) {
   // 画面幅・高さを取得
   var w = window.innerWidth;
   var h = window.innerHeight;
   // Canvas要素の大きさを画面幅・高さに合わせる
   stage.canvas.width = w;
   stage.canvas.height = h;
   // 画面更新する
   stage.update();
}
```


## タッチデバイス対応

タッチ操作のために[タッチデバイス対応](docs/mouse_touch.md)にも対応させておきましょう。

```js
// ステージを作成
var stage = new createjs.Stage("myCanvas");

// タッチ操作をサポートしているブラウザーならば
if (createjs.Touch.isSupported() == true) {
   // タッチ操作を有効にします。
   createjs.Touch.enable(stage)
}
```


[目次に戻る](../ReadMe.md)
