
## トゥイーン効果

トゥイーンとは、始点と終点を設定してアニメーションさせるテクニックです。「間」を示すBetweenという単語から作られていれた用語です。TweenJSでは次の記述でトゥイーンを実装します。

▼書式

```js
createjs.Tween.get(対象)
     .to(パラメーター, ミリ秒, イージングの種類);
```

パラメーターには、Object型でトゥイーン終了時のパラメータを指定します。イージングの種類にはEaseクラスに定義されている各メソッドを利用することができます。具体的な例を見て理解を深めて行きましょう。

```js
cratejs.Tween.get(bmp)
     .to({ alpha : 1, x : centerX + i, y : centerY},
         1500, Ease.elasticOut);
```

TweenJSはメソッドチェーンで処理を書く仕様です。ここでは`createjs.Bitmap`インスタンスに対して、透明度とXY座標を1.5秒でトゥイーンするようにしています。

これにディレイを適用したい場合は、wait()メソッドを使います。

```js
createjs.Tween.get(bmp)
     .wait(1400)
     .to({ alpha : 1,
         x : centerX + i,
         y : centerY}, 1500, Ease.elasticOut);
```

他にも様々なメソッドが用意されているので、それを活用してみるとよいでしょう。

▼サンプル(4_1_CreateJS/3_TweenJS/index.html)

```html
<!DOCTYPE html>
<html>
<head>
	<title>TweenJS Sample</title>
	<script>var createjs = window;</script> <!-- 名前空間をグローバルに変更 -->
	<script src="http://code.createjs.com/easeljs-0.5.0.min.js"></script>
	<script src="http://code.createjs.com/tweenjs-0.3.0.min.js"></script>
	<script>
		function init() {
			canvas = document.getElementById("myCanvas");
			stage = new Stage(canvas);

			// 円のシェイプを作成
			var circle = new Shape();
			circle.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
			stage.addChild(circle);

			Ticker.setFPS(60);
			Ticker.addListener(stage);

			Tween.get(circle) // ターゲットを指定
					.to({alpha:0.5}) // 透明度の変化
					.wait(1000)// 1秒停止
					.to({x:500, y:200, alpha:0.1}, 2000, Ease.get(1))// x/y/alphaのトゥイーン, イーズアウトで
					.wait(1000)// 1秒停止
					.to({x:0}, 2000, Ease.get(-1))//  xのトゥイーン, イーズインで
					.wait(1000)// 1秒停止
					.to({x:0, y:0, alpha:1}, 600) // x/y/alphaのトゥイーン
		}

	</script>
</head>

<body onload="init();">
	<canvas id="myCanvas" width="960" height="540"></canvas>
</body>
</html>
```
