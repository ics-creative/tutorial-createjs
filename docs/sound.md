# CreateJS でのサウンドの再生方法

CreateJSでは音声を再生する機能が含まれています。webで扱える音声ファイル形式としては、MP3形式もしくはOGG形式が知られています。今回はMP3ファイルを使って、ボタンをクリックしたときに音声を再生してみましょう。

## サウンド再生のシンプルなサンプル

![](../imgs/sound_basic.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/sound_basic.html)
- [サンプルのソースコードを確認する](../samples/sound_basic.html)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="css/base.css">
  <script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>
  <script>
    window.addEventListener("load", init);
    function init() {
      // 使用するサウンドは事前に登録します。
      // 音声ファイルのパス、任意のIDを指定します。
      createjs.Sound.registerSound("sounds/click.mp3", "click");
    }

    function playSound() {
      // IDを使って再生します。
      createjs.Sound.play("click");
    }
  </script>
</head>
<body>
  <!-- ボタンがクリックされたら、関数 playSound を実行します。 -->
  <button onclick="playSound()">音を再生する</button>
</body>
</html>
```

このサンプルではHTML側に`<button>`要素を配置しています。いつもはCreateJSの利用のために`<canvas>`要素を使っていましたが、今回は音声を再生するだけなので`<canvas>`要素を配置していません。音声再生は`<canvas>`要素や`createjs.Stage`クラスとは独立した機能として利用することができます。

## サウンド再生の手順

はじめに再生する予定のサウンドファイルを登録します。`registerSound()`メソッドを使って「音声ファイルのパス」と「任意のID」を登録することで音声再生のための準備が整います。任意のIDはわかりやすい名前であればどのような名前でも構いません。なお、この登録処理はページが読み込まれたタイミングがよいので、サンプルでは`load`イベント時に処理しています。

```js
createjs.Sound.registerSound("音声ファイルのパス", "任意のID");
```

音声を再生するタイミングでは、`createjs.Sound.play()`メソッドを使います。はじめに「任意のID」を登録しましたが、そのIDを指定することで音声が再生されます。

```js
createjs.Sound.play("任意のID");
```

いかがでしたか。音声再生といっても、あまりにも簡単であっけなかったのではないでしょうか。


<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2016-01-16</article-date-published>
<article-date-modified>2016-01-16</article-date-modified>
