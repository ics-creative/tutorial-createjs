# 当たり判定

オブジェクトの当たり判定の方法を学んでいきましょう。


## 点と表示オブジェクトとで当たり判定を取る

`hitTest()`を使用すると、点（座標）とインスタンスとの当たり判定を簡単にとる事ができます。当たり判定の測定には表示オブジェクトのローカル座標を利用する必要があるため、マウス座標と表示オブジェクトの当たり判定を計算したい場合は、`globalToLocal()`メソッドを使ってグローバル座標のマウス座標をローカル座標に変換するといいでしょう。

```js
// ●から見たマウス座標のローカル座標を求める
var point = ●.globalToLocal(stage.mouseX, stage.mouseY);
// マウス座標と●があたっているかを調べる
var isHit = ●.hitTest(point.x, point.y);

if(isHit == true){
  // あたっている時の処理
}else{
  // 離れている時の処理
}
```

サンプル

![](../imgs/hittest_mouse.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/hittest_mouse.html)
- [サンプルのソースコードを確認する](../samples/hittest_mouse.html)

マウス座標と表示オブジェクトが重なっていれば `true` が、重なっていなければ `false` が返ってきます。



## 表示オブジェクトと表示オブジェクトとで当たり判定を取る

`hitTest()`を使用すると、点（座標）とインスタンスとの当たり判定を簡単にとる事ができます。表示オブジェクト通しの判定の場合は、表示オブジェクト間の相対座標を`localToLocal()`メソッドを使って計算するといいでしょう。

```js
// ●と△の相対座標を求める
var point = △.localToLocal(0, 0, ●);
// △と●があたっているかを調べる
var isHit = ●.hitTest(point.x, point.y);

if(isHit == true){
  // あたっている時の処理
}else{
  // 離れている時の処理
}
```

サンプル

![](../imgs/hittest_object.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/hittest_object.html)
- [サンプルのソースコードを確認する](../samples/hittest_object.html)

表示オブジェクトと表示オブジェクトが重なっていれば `true` が、重なっていなければ `false` が返ってきます。


[目次に戻る](../ReadMe.md)
