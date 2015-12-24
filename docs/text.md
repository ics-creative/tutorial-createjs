# CreateJS でテキストの表示方法

文字を表示するには`createjs.Text`クラスを利用します。

第1引数に、表示したい文字を、第2引数にフォントの種類とサイズを、第3引数に色を指定します。

書式
```js
new createjs.Text(テキスト, フォント, 色);
```

サンプル(
```js
var t = new createjs.Text("Hello World!", "24px serif", "DarkRed");
stage.addChild(t);
```



![](../imgs/text.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/text.html)
- [サンプルのソースコードを確認する](../samples/text.html)


※`createjs.Text`クラスの詳しい使い方は「[公式ドキュメント(英語)](http://createjs.com/docs/easeljs/classes/Text.html)」を確認ください。



### 水平方向の揃え方

テキストの水平方向の揃え方ですが、`textAlign`プロパティーを使うことで設定ができます。

```js
var t = new Text("Hello World!", "24px serif", "DarkRed");
t.textAlign = "center";
stage.addChild(t);
```



![](../imgs/textAlign.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/textAlign.html)
- [サンプルのソースコードを確認する](../samples/textAlign.html)


左上から順に、`start`, `end`,
`left`, `right`,
 `center` の結果となります。赤色線は基準点。

テキストの整列については、[WHATWGのcanvasの仕様](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#text-0)と同じになっていますので、詳しい情報はこちらを参考ください。



※`textAlign`プロパティーの詳しい使い方は「[公式ドキュメント(英語)](http://createjs.com/docs/easeljs/classes/Text.html#property_textAlign)」を確認ください。



### 垂直方向の揃え方

テキストは`textBaseline`プロパティーを使うことで、垂直方向の基準点をどこに合わせるかを指定できます。

サンプル

```js
var t = new createjs.Text("Hello World!", "24px serif", "#000000");
t.textBaseline = “top”;
stage.addChild(t);
```


![](../imgs/textBaseline.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/textBaseline.html)
- [サンプルのソースコードを確認する](../samples/textBaseline.html)

左上から順に、`top`, `hanging`, `middle`,
`alphabetic`, `ideographic`, `bottom` の結果となります。赤色線は基準点。

※`textBaseline`プロパティーの詳しい使い方は「[公式ドキュメント(英語)](http://createjs.com/docs/easeljs/classes/Text.html#property_textBaseline)」を確認ください。



## フォントの種類

### 明朝体を表示する
```js
var t = new createjs.Text("Hello World!", "24px serif", "DarkRed");
stage.addChild(t);
```

### ゴシック体を表示する
```js
var t = new createjs.Text("Hello World!", "24px sans-serif", "DarkRed");
stage.addChild(t);
```

## テキストの文言を変更する

`createjs.Text`オブジェクトの文言を更新(変更)する場合は、`text`プロパティーを使って新しい文言を設定します。

```js
var t = new createjs.Text("", "24px sans-serif", "DarkRed");
t.text = "test";
stage.addChild(t);
```


※`text`プロパティーの詳しい使い方は「[公式ドキュメント(英語)](http://createjs.com/docs/easeljs/classes/Text.html#property_text)」を確認ください。


[次の記事へ](bitmap.md)
