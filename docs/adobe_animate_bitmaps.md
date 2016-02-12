# Adobe Flash Professional CC と CreateJS の連携 (ビットマップ含む編)


Flash Professional CCからHTML5 Canvas素材として書き出し、CreateJSで利用する手順の解説、2弾目です。

Flash Professional CCで画像ファイルを含むコンテンツを作っていた場合に、先の解説と一部手順が異なります。


- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/createjs-toolkit-bitmaps/index.html)
- [サンプルのソースコードを確認する](../samples/createjs-toolkit-bitmaps/)


## Adobe Flash Professional CC (Flash Pro CC)を起動

今回はCreateJS用のグラフィックとモーションを用意したいので、起動したら[新規作成]の一覧から[HTML5 Canvas]を選択します。

![](../imgs/adobe_animate_startup.png)

作成したら作業用フォルダに`HeartAsset.fla`ファイルとして保存しましょう。

## 2. シンボルを作成する (ここでは「Star」という名前で作成)

ファイルの読み込みをして、画像を取り込みましょう。


## 3. Flash Pro CCで[プレビュー]するとHTML5素材が出力される

メニューバーから[制御]→[プレビュー]を選択しましょう。するとブラウザが立ち上がり、描いたグラフィックが表示されます。これはHTML5 Canvas (つまりCreateJS)で表示されています。

このとき`HeartAsset.fla`ファイルと同階層にいくつかファイルとフォルダが作られます。

- `HeartAsset.html` : HTML5 Canvasを再生するための再生用のHTMLファイル。
- `HeartAsset.js` : Flash Pro CCで作成したデータが保存されているファイル。
- `images` : 画像が格納されたフォルダ。

## 4. 別ファイルとしてHTMLファイルを作成

制御用のHTMLとして作業用フォルダに`index.html`ファイルを用意しましょう。`HeartAsset.fla`ファイルと__同階層に配置ください__。



## 5. CreateJSフレームワークを読み込みましょう

`index.html`ファイルにHTMLコードを書いていきましょう。必要な`body`タグや`canvas`タグは事前に記載しておいてください。

まずはCreateJSフレームワークを`head`タグの中で読み込みましょう。

```js
<!-- CreateJSを読み込む-->
<script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>
```


## 6. Flash Pro CCから出力したJSファイルも読み込む

`index.html`ファイルと同じ階層に、`HeartAsset.fla`ファイルから出力した`HeartAsset.js`ファイルが存在するはずです。このファイルを読み込むため`<script>`タグで取り込みましょう。

```js
<!-- Flash Professional CCのデータを読み込む -->
<script src="HeartAsset.js"></script>
```

## 7. CreateJS起動のためのコードを記載する


CreateJSを起動するためのコードを記載しましょう。コードが長くなりますが、モーション中に利用する画像ファイルを先読み(プリロード)する仕組みが入っています。

```js
window.addEventListener("load", init);

function init() {
  images = images||{};

  var loader = new createjs.LoadQueue(false);
  loader.addEventListener("fileload", handleFileLoad);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(lib.properties.manifest);
}

function handleFileLoad(evt) {
  if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete(evt) {
  var stage = new createjs.Stage("myCanvas");

  // ココに初期化コードをかく
}
```

## 8. Flash Pro CCのコンテンツを呼び出す

Flash Pro CCのシンボル名の先頭に「lib.」をつけるとクラスとして利用できます。ルートのタイムラインは「lib.ファイル名」として呼び出せます。

```js
var root = new lib.HeartAsset();
stage.addChild(root);
```

この「lib.HeartAsset」というのはFLAファイル名と一致します。

## 9. 表示オブジェクトとしてStageに追加して制御しよう


このあとは、`tick`イベント等を登録して画面更新をさせましょう。

```js
// 時間経過
createjs.Ticker.addEventListener("tick", onTick);
function onTick(){
  // 画面更新
  stage.update();
}
```

<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2015-12-04</article-date-published>
<article-date-modified>2016-02-12</article-date-modified>
