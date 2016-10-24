# CreateJS の表示オブジェクトの親子構造

シェイプやテキスト、ビットマップなどの表示オブジェクトは、親子の入れ子関係をつくり、その**階層全体を「表示リスト」（ディスプレイ・リスト）としてまとめられます**。表示リストはアニメーションやインタラクションを扱うのに便利な仕組みで、多くのプログラム言語で採用されています。

親子関係を構築すると、親の位置、角度、スケール、カラー、ブレンドなどの設定が、子孫にも継承されるようになります。表示オブジェクトは親のプロパティーによって、子の表示も影響を受けるので、グループ化して表示の制御を行いたい場合に便利です。


## 使い方

`createjs.Container`クラスは次のようにして利用します。`createjs.Container`インスタンスの`addChild()`メソッドで、任意の表示オブジェクトを追加できます。


書式

```js
var コンテナ = new createjs.Container();
stage.addChild(コンテナ);
コンテナ.addChild(表示オブジェクト);
```

このクラスを使うことで表示リストを作れるのですが、上記のコードの場合、表示リストは次の構造になります。

```
□ stage
  └□ コンテナ
    └□ 表示オブジェクト
```

## サンプルで表示リストを理解しよう1 (シンプルな移動)

赤と青の2つの円を、右方向に移動させるサンプルを試してみましょう。同時に2つの円を動かしたい場合、赤と青のそれぞれの円の`x`座標を変更する必要がありました。しかし、`createjs.Container`を使うことで、親の座標を変更することで、同時に赤と青の2つの円を、右方向に移動させています。


![](../imgs/container_simple.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/container_simple.html)
- [サンプルのソースコードを確認する](../samples/container_simple.html)


このサンプルの場合、表示リストは次の構造になります。

```
□ stage
  └□ container
    ├□ shape1 (赤い円)
    └□ shape2 (青い円)
```


コードを読み解きながらサンプルを理解していきましょう。まずは、親となる入れ物(`container`インスタンス)を用意します。

```js
// Stageの作成
var stage = new createjs.Stage("myCanvas");

// コンテナー(グループの親)を作成
var container = new createjs.Container();
container.x = 0;
container.y = 0;
stage.addChild(container); // 画面に追加
```


そこに2個の`createjs.Shape`オブジェクトを上下に配置するように`addChild()`メソッドを使って追加しています。２つの円を直接`stage`インスタンスに追加するのではなく、`container`インスタンスに追加していることがポイントです。

```js
// 1つ目の円を作成
var circle1 = new createjs.Shape();
circle1.graphics.beginFill("DarkRed").drawCircle(0, 0, 50);
circle1.y = 100;

// 2つ目の円を作成
var circle2 = new createjs.Shape();
circle2.graphics.beginFill("Blue").drawCircle(0, 0, 50);
circle2.y = 300;

// 2つの円を親に追加
container.addChild(circle1);
container.addChild(circle2);
```

`tick()`関数では`container`インスタンスの`x`プロパティーのみ変化させます。そうすると、`container`インスタンス内に追加した`createjs.Shape`オブジェクトがまとめて右方向に移動することが確認できます。親となる`container`インスタンスだけしか制御していませんが、このように子供の表示オブジェクトも、まとめて移動制御ができるのです。

```js
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick() {
  // 親だけを移動
  container.x += 1;
  if (container.x > 960) { // 画面端まで移動したら、元に戻す
      container.x = 0;
  }
  stage.update();
}
```

## サンプルで表示リストを理解しよう2 (回転挙動)

`createjs.Container`でグループ化できるのは座標だけではありません。角度やスケールなど、表示に関するほとんどの属性を継承します。次のサンプルで角度に対して表示リストが適用されていることを確認していきたいと思います。複数のShapeオブジェクトが円周上を移動しています。

![](../imgs/container_nest.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/container_nest.html)
- [サンプルのソースコードを確認する](../samples/container_nest.html)

サンプルのコードを読み解きながらサンプルを理解していきましょう。まずは、親となる入れ物(`container`インスタンス)を用意します。画面の中央に配置されるように、`x`と`y`座標のみを設定します。

```js
// コンテナー(グループの親)を作成
var container = new createjs.Container();
container.x = 300;
container.y = 300;
stage.addChild(container); // 画面に追加
```

次に親となる入れ物(`container`インスタンス)に、10個の`createjs.Shape`オブジェクト（子供）を`addChild()`メソッドを使って追加しています。円周上に配置するように、`for`文を利用しつつ、子供の座標は三角関数を使って計算しています。

```js

// ループ分で10回
for (var i = 0; i < 10; i++) {
  // 円を作成し
  var ball = new createjs.Shape();
  ball.graphics
          .beginFill("DarkRed")
          .drawCircle(0, 0, 50);
  // 円周上に配置
  ball.x = 200 * Math.sin(i * 360 / 10 * Math.PI / 180);
  ball.y = 200 * Math.cos(i * 360 / 10 * Math.PI / 180);
  // グループに追加
  container.addChild(ball);
}
```

この処理によって、表示リストは次の構造になります。

```
□ stage
  └□ container
    ├□ ball (0個目)
    ├□ ball (1個目)
    ├□ ball (2個目)
    ├□ ball (3個目)
    ├□ ball (4個目)
    ├□ ball (5個目)
    ├□ ball (6個目)
    ├□ ball (7個目)
    ├□ ball (8個目)
    └□ ball (9個目)
```


`tick()`関数では`container`インスタンスの`rotation`プロパティーのみを変化させます。`rotation`プロパティーしか制御していないにも関わらず、`container`インスタンス内に追加した`createjs.Shape`オブジェクトがまとめて移動します。

```js
createjs.Ticker.addEventListener("tick", handleTick);
function handleTick() {
  // 親だけを回転
  container.rotation += 1;
  stage.update();
}
```

このように表示リストにまとめることで、まとめてオブジェクトの移動や回転、拡縮の制御が容易にすることができます。

## 補足

- `addChild()`メソッドで後に追加されたものほど上に表示されます。子オブジェクトはインデックスで管理され、インデックス `0` が最背面のオブジェクトになります。
- `createjs.Container`のインスタンスの中に、別の`createjs.Container`インスタンスを追加することもできるので、何重にもネストすることが可能です。
- `createjs.Container`（およびそのサブクラス）が子の表示オブジェクトを管理する仕組みを表示リスト（ディスプレイ・リスト）と呼ばれます。
- `createjs.Container`クラスの詳しい使い方は「[公式ドキュメント(英語)](http://createjs.com/docs/easeljs/classes/Container.html)」を確認ください。

[次の記事へ](displayobject_remove.md)

<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2015-11-22</article-date-published>
<article-date-modified>2016-10-24</article-date-modified>
