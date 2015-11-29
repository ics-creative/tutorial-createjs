# マウスインタラクション

CreateJSにはマウスイベントを管理する機能が備わっています。簡単なインタラクションの実装例を通して学習していきましょう。

## マウス座標

ステージ上のマウス座標は`stage.mouseX`と`stage.mouseY`プロパティーから取得することができます。

```js
// マウス座標を取得する
var mx = stage.mouseX;
var my = stage.mouseY;
```

マウスに追随してシェイプを移動させてみましょう。マウス座標ははリアルタイムで変動するので、`tick`イベント内で処理するといいでしょう。

```js
// ステージを作成
var stage = new createjs.Stage("myCanvas");

// オブジェクトの作成
var shape = new createjs.Shape();
shape.graphics.beginFill("red");
shape.graphics.drawCircle(0, 0, 40);
stage.addChild(shape);

// tick イベントを登録する
createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
	// マウス座標を取得する
	var mx = stage.mouseX;
	var my = stage.mouseY;
	// シェイプをマウスに追随させる
	shape.x = mx;
	shape.y = my;

	// 画面を更新する
	stage.update();
}
```

![](../imgs/mouse_xy.html.png)

[サンプルを開く](../samples/mouse_xy.html)

## クリック

表示オブジェクトをクリックしたときのイベントの処理を作るには、`click`イベントを監視します。

書式

```js
// イベントを登録
表示オブジェクト.addEventListener("click", handleClick);
// クリックしたとき
function handleClick(event){
	// 処理
}
```

サンプルとして異なる２つのシェイプに対して、クリックしたときの処理を作ってみましょう。異なる２つのシェイプそれぞれに`click`イベントを登録します。

```js
// 円の作成
var circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(100, 100, 80);
stage.addChild(circle);

// 四角形の作成
var rect = new createjs.Shape();
rect.graphics.beginFill("blue").drawRect(200, 20, 160, 160);
stage.addChild(rect);

// 各種マウスイベントを登録する
circle.addEventListener("click", handleCircleClick);
rect.addEventListener("click", handleRectClick);

// クリックしたとき
function handleCircleClick(event) {
	alert("円がクリックされました");
}

function handleRectClick(event) {
	alert("四角形がクリックされました");
}
```

![](../imgs/mouse_click.html.png)

[サンプルを開く](../samples/mouse_click.html)



## マウスオーバー/マウスアウト

マウスイベントのマウスオーバーやマウスアウトを利用したい場合は、Stageオブジェクトの`stage.enableMouseOver()`メソッドを実行して有効にします。

サンプルを紹介します。画面に円を表示し、マウスオーバーで色が変わり、マウスアウトで元の色に戻るというインタラクションを設定しました。マウスクリックでアラート表示されるようになっています。

書式

```js
// ステージを作成
var stage = new createjs.Stage("myCanvas");

// マウスオーバーを有効にする
stage.enableMouseOver();
```

```js
// 各種マウスイベントを登録する
表示オブジェクト.addEventListener("mouseover", handleMouseOver);
表示オブジェクト.addEventListener("mouseout", handleMouseOut);
表示オブジェクト.addEventListener("click", handleClick);

// マウスオーバーしたとき
function handleMouseOver(event) {
	// 処理
}

// マウスアウトしたとき
function handleMouseOut(event) {
	// 処理
}

// クリックしたとき
function handleClick(event) {
	// 処理
}
```

次のサンプルではマウスカーソルが四角形の中に入ると緑色のサークルに色が変わります。マウスカーソルがま薄アウトすると元の赤色に戻ります。

```js
// 各種マウスイベントを登録する
shape.addEventListener("mouseover", handleMouseOver);
shape.addEventListener("mouseout", handleMouseOut);

// マウスオーバーしたとき
function handleMouseOver(event) {
	// 緑で塗り直す
	shape.graphics
			.clear()
			.beginFill("green")
			.drawCircle(0, 0, 80);
}

// マウスアウトしたとき
function handleMouseOut(event) {
	// 赤で塗り直す
	shape.graphics
			.clear()
			.beginFill("red")
			.drawCircle(0, 0, 80);
}
```

![](../imgs/mouse_over.html.png)

[サンプルを開く](../samples/mouse_over.html)


## タッチデバイス対応

iOSやAndroid, Windows 10のようなタッチデバイスでタッチ操作を制御するには、`createjs.Touch`クラスを使ってタッチ操作を有効に設定します。`createjs.Touch`クラスによって自動的にタッチイベントがマウスイベントに変換されるため、特別な処理を実装する必要はありません。

```js
// ステージを作成
var stage = new createjs.Stage("myCanvas");

// タッチ操作をサポートしているブラウザーならば
if(createjs.Touch.isSupported() == true){
	// タッチ操作を有効にします。
	createjs.Touch.enable(stage)
}
```

![](../imgs/mouse_touch.html.png)

[サンプルを開く](../samples/mouse_touch.html)



[目次に戻る](../ReadMe.md)