# CreateJS の画像の表示方法

画像を表示するには`createjs.Bitmap`クラスを利用します。コンストラクターの引数には画像のURLを設定します。

▼書式
```js
new createjs.Bitmap(画像のURL);
```

▼サンプル
```js
var bmp = new createjs.Bitmap("sample.png");
stage.addChild(bmp);
```

![](../imgs/bitmap.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/bitmap.html)
- [サンプルのソースコードを確認する](../samples/bitmap.html)

※このサンプルでは、`createjs.Ticker`クラスを利用していますが、このクラスの使い方は後述します。

※`createjs.Bitmap`クラスの詳しい使い方は「 [公式ドキュメント(日本語訳)](http://createjs.sub.jp/ja/EaselJS/reference/classes/Bitmap.html)」を確認ください。

## 基準点の設定方法

画像の基準点を調整したい場合は、`regX`と`regY`プロパティーを使うと便利です。

```js
var bmp = new createjs.Bitmap("sample.png");
stage.addChild(bmp);

// 基準点を調整する
bmp.regX = 100;
bmp.regY = 100;
```

※`regX`プロパティーの詳しい使い方は「 [公式ドキュメント(日本語訳)](http://createjs.sub.jp/ja/EaselJS/reference/classes/Bitmap.html#property_regX)」を確認ください。
