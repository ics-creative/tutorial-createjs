# CreateJS でのトゥイーン実装方法まとめ

CreateJSのトゥイーンは便利で多くの機能を持っています。ここではリファレンスとしてトゥイーンの使い方をまとめました。必要に応じて参考ください。

## アニメーションを待機させる `wait()` メソッド

`wait()`メソッドを使うとアニメーションを待機させることができます。待機時間をミリ秒で指定することにより、その時間が経過するまで次のアニメーションが行われなくなります。下記の例では、`wait()`メソッドを使って各トゥイーンの間で待機するようにしています。

```js
createjs.Tween.get(circle) // ターゲットを指定
              .wait(2000) // 2.0 秒待機
              .to({x: 640}, 1000)
              .wait(1000)// 1.0 秒待機
              .to({x: 320}, 1000);
```

![](../imgs/tween_wait.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/tween_wait.html)
- [サンプルのソースコードを確認する](../samples/tween_wait.html)


## 特定のタイミングで関数を呼ぶ `call()` メソッド

`call()` メソッドを使うとトゥイーンの途中で関数を呼び出すことができます。トゥイーンが終わってから関数を実行させたいときに役立ちます。`call()`メソッドで関数を指定するときは関数名の後ろ側に括弧表記`()`をつけないように注意しましょう。

```js
createjs.Tween.get(circle) // ターゲットを指定
        .to({x: 640}, 2000)
        .call(step1) // 関数を呼び出す
        .to({x: 320}, 2000)
        .call(step2); // 関数を呼び出す

function step1(){
  // 円の色を変える
  circle.graphics.clear().beginFill("blue").drawCircle(0, 0, 50);
}
function step2(){
  alert("トゥイーンが終わりました");
}
```

![](../imgs/tween_call.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/tween_call.html)
- [サンプルのソースコードを確認する](../samples/tween_call.html)


## トゥイーンを繰り返す `loop` オプション

`get()`メソッドの第二引数にオプションとして`loop : true`を設定すると、トゥイーンを無限に繰り返すことができます。

```js
createjs.Tween.get(circle, {loop: true}) // ターゲットを指定
        .to({x: 640}, 1000)
        .to({x: 0}, 1000);
```

![](../imgs/tween_loop.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/tween_loop.html)
- [サンプルのソースコードを確認する](../samples/tween_loop.html)





[次の記事へ](mouse_xy.md)


<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2015-12-27</article-date-published>
<article-date-modified>2018-02-20</article-date-modified>
