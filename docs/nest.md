# CreateJS の表示オブジェクトの親子構造

シェイプやテキスト、ビットマップなどの表示オブジェクトは、親子構造を使うことでまとめて管理することができます。

親子関係を構築すると、親の位置、角度、スケール、カラー、ブレンドなどの設定が、子孫にも継承されるようになります。表示オブジェクトは親のプロパティーによって、子の表示も影響を受けるので、グループ化して表示の制御を行いたい場合に便利です。

`createjs.Container`クラスを使うことで表示オブジェクトの親子構造を作ることができます。`createjs.Container`のインスタンスの中に、別の`createjs.Container`インスタンスを追加することもできるので、何重にもネストすることが可能です。

`createjs.Container`（およびそのサブクラス）が子の表示オブジェクトを管理する仕組みをディスプレイリストと呼ばれます。


書式
```js
var container = new createjs.Container();
container.addChild(表示オブジェクト);
stage.addChild(container);
```

サンプルでは、親となる入れ物(`container`インスタンス)を用意して、そこに10個の`createjs.Shape`オブジェクトを円周上に配置するように`addChild()`メソッドを使って追加しています。`tick()`関数では`container`インスタンスしか`rotation`プロパティーを変化させていませんが、`container`インスタンス内に追加した`createjs.Shape`オブジェクトがまとめて移動しています。このように表示オブジェクトをネストさせることで、まとめてオブジェクトの移動や回転、拡縮の制御が容易にすることができます。


![](../imgs/container_nest.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/container_nest.html)
- [サンプルのソースコードを確認する](../samples/container_nest.html)


複数のShapeオブジェクトが円周上を移動している


※`createjs.Container`クラスの詳しい使い方は「[公式ドキュメント(英語)](http://createjs.com/docs/easeljs/classes/Container.html)」を確認ください。

[次の記事へ](displayobject_remove.md)
