# EaselJSで画像を表示する

画像を表示するには`createjs.Bitmap`クラスを利用します。`createjs.Bitmap`クラスのインスタンスはステージに追加可能な表示オブジェクトです。

▼書式
```js
new createjs.Bitmap(画像のURLもしくはImageオブジェクト);
```

▼サンプル
```js
var bmp = new Bitmap("sample.png");
stage.addChild(bmp);
```

もしくは第1引数にImageオブジェクトをセットすることも可能です。引数にImageオブジェクトを使った場合は即座に画像を表示することができるので、制作するコンテンツによってはこちらのほうが良いこともあるでしょう。

▼サンプル
```html
```
