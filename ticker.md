
## EaselJSで動きを作成する

EaselJSはインタラクティブコンテンツを実装するためのアニメーション機構を備えています。Tickerクラスがアニメーションに必要なエンターフレームを管理するクラスとなります。TickerクラスはaddListener()メソッドでオブジェクトを登録することで、同スコープ内のtick()関数を一定間隔で実行します。

```js
createjs.Ticker.addListener(window);

function tick(){
    console.log( new Date() );
}
```

次にwindowオブジェクトを引数に与えると、グローバルに定義したtick()関数が常に呼ばれるようになります。tick()関数内で、update()メソッドを呼び出しておきましょう。

```js
createjs.Ticker.addListener(window);

function tick(){
    // 自分で実装したい処理
    stage.update();
}
```

例えば、tick()関数の中で動きを付けたい場合は次のように記述します。

▼サンプル
```html
<script>
	var stage;
	var shape;
	function init() {
		var canvas = document.getElementById("testCanvas");
		stage = new Stage(canvas);

		// 円を作成します
		shape = new Shape();
		shape.graphics.beginFill(0xFF0000); // 赤色で描画するように設定
		shape.graphics.drawCircle(0, 0, 100); //半径100pxの円を描画
		shape.y = 300; // Y座標300の位置に配置
		stage.addChild(shape); // 表示リストに追加

		Ticker.addListener(window);
	}
	function tick(){
		// アニメーション
		shape.x += 2;

		// Stageの描画を更新
		stage.update();
	}
</script>
```

↓



ヒント：TickerのaddListener()メソッドにStageオブジェクトを引数として与えると、update()メソッドを呼びださなくてもStageは常に描画更新されるようになります。

Ticker.addListener(stage);
