# CreateJS で HSL カラーを使いこなそう

[カラー](color.md)の項目で説明した色の設定方法ですが、色は数値で扱うことができます。

## ランダムな色の円を配置する

![](../imgs/color_hsl_dots.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/color_hsl_dots.html)
- [サンプルのソースコードを確認する](../samples/color_hsl_dots.html)

```js
for (var i = 0; i < 100; i++) {
  // シェイプを作成
  var shape = new createjs.Shape();
  stage.addChild(shape);

  // HSLカラーを算出
  var hue = 360 * Math.random();
  var color = "hsl(" + hue + ", 100%, 50%)";

  var x = stage.canvas.width * Math.random();
  var y = stage.canvas.height * Math.random();

  shape.graphics.clear()
          .beginFill(color)
          .drawCircle(x, y, 20);
}
```

## グラフィックの色を時間経過で変化させる

![](../imgs/color_hsl_motion.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/color_hsl_motion.html)
- [サンプルのソースコードを確認する](../samples/color_hsl_motion.html)

```js
// 色相
var hue = 0;

// 時間経過
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick() {
  // HSLカラーを算出
  var color = "hsl(" + hue + ", 100%, 50%)";

  shape.graphics.clear()
          .beginFill(color)
          .drawCircle(320, 100, 80);

  // 色相を変化
  hue += 1.0;

  stage.update(); // 画面更新
}
```


## 範囲を定めて色を時間経過で変化させる

![](../imgs/color_hsl_sin.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/color_hsl_sin.html)
- [サンプルのソースコードを確認する](../samples/color_hsl_sin.html)

```js
var angle = 0;
var centerHue = 180;
var radius = 80;
var speed = 0.01;

// 時間経過
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick() {
  // HSLカラーを算出
  var hue = centerHue + Math.cos(angle) * radius;
  var color = "hsl(" + hue + ", 100%, 50%)";

  shape.graphics.clear()
          .beginFill(color)
          .drawCircle(320, 100, 80);

  angle += speed;

  stage.update(); // 画面更新
}
```
