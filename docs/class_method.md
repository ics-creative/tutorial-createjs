# CreateJSでES2015のclassを利用する(メソッド編)


この解説は[CreateJSでES2015のclassを利用する（継承）](class.md)からの続きです。クラスのメソッドを呼び出すベスト・プラクティスな例を学んでいきましょう。


## クラスのメソッドを利用する

時間経過でグループのアニメーションをさせたい場合の方法を紹介します。

![](../imgs/class_container_update.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/class_container_update.html)
- [サンプルのソースコードを確認する](../samples/class_container_update.html)


`createjs.Container`クラスのサブクラスとして定義しているものとします。この場合、このクラスは`tick`イベントを発生します。この`tick`イベントをうけて時間変化させたい関数を呼び出しましょう。次のように`addEventListener()`イベントで関数を登録します。クラスをつかうとスコープの管理が厳格になるため、`this`の参照がずれます。対処方法としてアロー関数`() => { /* コード */ }`を使います。

```js
class MyContainer extends createjs.Container {
  constructor() {
    super();

    // 任意のコード

    // 更新イベントを定義
    this.addEventListener('tick', () => {
      this.update();
    });
  }

  update() {
    // 任意のコード
  }
}
```

ただし、少し記述が冗長です。ECMAScript 2015のアロー関数を使うより、CreateJSの`on()`関数を使えばスコープを自動的に補正してくれます。クラスでイベントを使う場合は`addEventListener()`より`on()`のほうが便利でしょう。

```js
class MyContainer extends createjs.Container {
  constructor() {
    super();

    // 任意のコード

    // 更新イベントを定義
    this.on('tick', this.update, this);
  }

  update() {
    // 任意のコード
  }
}
```

クラスの中では作成した変数を別の関数で使いたいこともあるでしょう。その時は`this`キーワードを使ってメンバーフィールドに保存しましょう。

```js
constructor() {
  super();

  // インスタンスを作成
  var poly = new cratejs.Shape();

  // メンバーフィールドに保存
  this.poly = poly;
}
```

こうすればクラス内の他の関数でも、メンバーフィールドから呼び出すことができます。

```js
update() {
  this.poly.rotation += 1;
}
```

コードの全体像を確認してみましょう。

```js
class MyContainer extends createjs.Container {
  constructor() {
    super();

    // 円を作成します
    // (省略)

    // 多角形を作成します
    var poly = new createjs.Shape();
    poly.graphics.beginFill('DarkRed'); // 赤色で描画するように設定
    poly.graphics.drawPolyStar(0, 0, 150, 5, 0.6, -90); // 150pxの星を記述
    this.addChild(poly); // 表示リストに追加

    // メンバーフィールドに保存
    this.poly = poly;

    // 更新イベントを定義
    this.on('tick', this.update, this);
  }

  update() {
    this.poly.rotation += 1;
  }
}
```





<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2017-12-04</article-date-published>
<article-date-modified>2017-12-04</article-date-modified>
