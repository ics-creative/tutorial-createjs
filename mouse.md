# EaselJSでマウスインタラクションを実装する

EaselJSにはマウスイベントを管理する機能が備わっています。簡単なインタラクションの実装例を通して学習していきましょう。



## クリックの実装


## マウスオーバー/マウスアウトの実装

マウスイベントのマウスオーバーやマウスアウトを利用したい場合は、Stageオブジェクトの`stage.enableMouseOver()`メソッドを実行して有効にします。

利用する場合は、事前に stage.enableMouseOver() メソッドを使って、イベントを発生させる頻度を指定する必要があります。enableMouseOver() に指定する頻度は、Ticker の更新頻度とは別に扱えます。指定できる最大値は 50 です。頻度を 0 に設定すると、onMouseOut と onMouseOver が使えない （つまりデフォルトの） 状態になります。





サンプルを紹介します。画面に円を表示し、マウスオーバーで色が変わり、マウスアウトで元の色に戻るというインタラクションを設定しました。マウスクリックでアラート表示されるようになっています。

▼サンプル(1_basic/18_EaselJS/8_event.html)
```js
var canvas = document.getElementById("myCanvas");
stage = new Stage(canvas);

// オブジェクトの作成
shape = new Shape();
shape.x = 100;
shape.y = 100;
shape.graphics.beginFill(Graphics.getRGB(255, 0, 0));
shape.graphics.drawCircle(0, 0, 100);
stage.addChild(shape);

// マウスオーバーを有効にする
stage.enableMouseOver(10);

shape.onMouseOver = function (event) {
	shape.graphics.clear()
			.beginFill(Graphics.getRGB(0, 255, 0))
			.drawCircle(0, 0, 100);
};
shape.onMouseOut = function (event) {
	this.graphics.clear()
			.beginFill(Graphics.getRGB(255, 0, 0))
			.drawCircle(0, 0, 100);
};
shape.onClick = function (event) {
	alert("クリックされました");
};

Ticker.addListener(stage);
```


▲マウスカーソルが四角形の中に入ると緑色のサークルに色が変わります。マウスカーソルがま薄アウトすると元の赤色に戻ります。


## タッチデバイス対応
