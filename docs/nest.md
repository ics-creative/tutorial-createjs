# 表示オブジェクトのネスト

表示オブジェクトは親のプロパティーによって、子の表示も影響を受けるので、グループ化して表示の制御を行いたい場合にネスト（親子構造）を利用すると便利です。Containerクラスを使うことで表示オブジェクトのネストを作ることができます。Containerのインスタンスの中に、別のContainerインスタンスを追加することもできるので、何重にもネストすることが可能です。

▼書式
```js
var container = new createjs.Container();
container.addChild(表示オブジェクト);
stage.addChild(container);
```

サンプルでは、親となる入れ物(containerインスタンス)を用意して、そこに10個のShapeオブジェクトを円周上に配置するようにaddChild()メソッドを使って追加しています。tick()関数ではcontainerインスタンスしかrotationプロパティーを変化させていませんが、containerインスタンス内に追加したShapeオブジェクトがまとめて移動しています。このように表示オブジェクトをネストさせることで、まとめてオブジェクトの移動や回転、拡縮の制御が容易にすることができます。


![](../imgs/container_nest.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/container_nest.html)
- [サンプルのソースコードを確認する](../samples/container_nest.html)


複数のShapeオブジェクトが円周上を移動している


[目次に戻る](index.md)