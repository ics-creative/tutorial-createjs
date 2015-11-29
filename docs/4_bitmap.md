# EaselJSで画像を表示する

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

画像の基準点を調整したい場合は、`regX`と`regY`プロパティーを使うと便利です。

```js
var bmp = new createjs.Bitmap("sample.png");
stage.addChild(bmp);

// 基準点を調整する
bmp.regX = 100;
bmp.regY = 100;
```
