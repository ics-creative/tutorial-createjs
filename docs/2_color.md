# 色の指定方法

CreatJSでの色の指定方法を覚えましょう。CreateJSでは色を指定する方法がいくつかあります。


- 色の名前で指定 (例：green, red, blue)
- 16進数表記で指定 (例: #00ff00, #ff0000, #0000FF)
- RGB指定 (例: createjs.Graphics.getRGB(255, 0, 0))
- HSL指定 (例: createjs.Graphics.getHSL(255, 0, 0))

どの方法を選択するかはケースバイケースです。初心者の方は色の名前の指定だけ覚えておけばいいでしょう。色の名前だとバリエーションが限られるので、表現の自由度を広げたい場合はその他の方法を使えばいいでしょう。

## 色の名前で指定

```js
var shape = new createjs.Shape();
// 赤い円
shape.graphics.beginFill("red");
shape.graphics.drawCircle(100, 100, 50);
// 緑の円
shape.graphics.beginFill("green");
shape.graphics.drawCircle(200, 100, 50);
// 青い円
shape.graphics.beginFill("blue");
shape.graphics.drawCircle(300, 100, 50);
```
![](../imgs/2_color_name.html.png)

## 16進数表記で指定

```js
var shape = new createjs.Shape();
// 赤い円
shape.graphics.beginFill("#ff0000");
shape.graphics.drawCircle(100, 100, 50);
// 緑の円
shape.graphics.beginFill("#00ff00");
shape.graphics.drawCircle(200, 100, 50);
// 青い円
shape.graphics.beginFill("#0000ff");
shape.graphics.drawCircle(300, 100, 50);
```

![](../imgs/2_color_hex.html.png)


## HSLで指定

`createjs.Graphics.getHSL(h, s, l)`を使って色を指定することができます。引数は順番に
色相, 彩度, 明度を示し、それぞれは次の範囲のパラメーターを指定します。

- 色相 (0〜360)
- 彩度 (0〜100)
- 明度 (0〜100)

```js
var shape = new createjs.Shape();
// 赤い円
shape.graphics.beginFill(createjs.Graphics.getHSL(0, 100, 100));
shape.graphics.drawCircle(100, 100, 50);
// 緑の円
shape.graphics.beginFill(createjs.Graphics.getHSL(120, 100, 100));
shape.graphics.drawCircle(200, 100, 50);
// 青い円
shape.graphics.beginFill(createjs.Graphics.getHSL(240, 0, 255));
shape.graphics.drawCircle(300, 100, 50);
```

![](../imgs/2_color_hsl.html.png)

## RGBで指定

```js
var shape = new createjs.Shape();
// 赤い円
shape.graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0));
shape.graphics.drawCircle(100, 100, 50);
// 緑の円
shape.graphics.beginFill(createjs.Graphics.getRGB(0, 255, 0));
shape.graphics.drawCircle(200, 100, 50);
// 青い円
shape.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 255));
shape.graphics.drawCircle(300, 100, 50);
```

![](../imgs/2_color_rgb.html.png)
