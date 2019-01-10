# CreateJSのタッチデバイスの対応方法

iOSやAndroid, Windows 10のようなタッチデバイスでタッチ操作を制御するには、`createjs.Touch`クラスを使ってタッチ操作を有効に設定します。`createjs.Touch`クラスによって自動的にタッチイベントがマウスイベントに変換されるため、特別な処理を実装する必要はありません。

```js
// ステージを作成
var stage = new createjs.Stage("myCanvas");

// タッチ操作をサポートしているブラウザーならば
if(createjs.Touch.isSupported() == true){
  // タッチ操作を有効にします。
  createjs.Touch.enable(stage)
}
```


![](../imgs/mouse_touch.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/mouse_touch.html)
- [サンプルのソースコードを確認する](../samples/mouse_touch.html)

※`enable()`メソッドの詳しい使い方は「[公式ドキュメント(英語)](https://createjs.com/docs/easeljs/classes/Touch.html#method_enable)」を確認ください。

[次の記事へ](keyboard_basic.md)



<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2015-11-30</article-date-published>
<article-date-modified>2019-01-10</article-date-modified>
