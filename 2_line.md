
### 塗りと線の色

`beginFill()`メソッドで塗りの色を指定し、`setStrokeStyle()`メソッドで線の太さを、`beginStroke()``メソッドで線の色を設定することができます。


書式
```js
Graphicsオブジェクト.beginFill (塗りの色);
Graphicsオブジェクト.setStrokeStyle (線の太さ);
Graphicsオブジェクト.beginStroke(線の色);
```

サンプル
```js
var shape = new createjs.Shape();
shape.graphics.beginFill("green"); // 緑色で描画するように設定
shape.graphics.setStrokeStyle(4); // 4pxの線幅を設定
shape.graphics.beginStroke("blue"); // 青色の線を描画するように設定
shape.graphics.drawCircle(0, 0, 100); //半径100pxの円を描画
stage.addChild(shape); // 表示リストに追加
```
