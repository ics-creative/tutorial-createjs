# キーボード操作

キーボードが押されたか調べるには、`keydown` イベントを使用します。登録した関数の引数からイベントオブジェクトが得られます。

```js
window.addEventListener("keydown", handleKeydown);

function handleKeydown(event){
  console.log("キーボードが押された");
}
```

どのキーが押されたかについてはイベントオブジェクトの情報からわかります。

```js
window.addEventListener("keydown", handleKeydown);

function handleKeydown(event){
  // キーコード
	var keyCode = event.keyCode;
	console.log("押されたキーのコード : " + key_code);
}
```

キーボードが離されたかを調べるには`keyup`イベントを使用します。
```js
window.addEventListener("keyup", handleKeyup);

function handleKeyup(event){
  console.log("キーボードが離された");
}
```


## キーコードの一覧表

キーが押された時を判定するには、キーコードの数値を使って判定します。

```js
window.addEventListener("keydown", handleKeydown);

function handleKeydown(event){
  // キーコード(どのキーが押されたか)を取得
  var keyCode = event.keyCode;
  // 条件文で船の位置を変更する
  if (keyCode == 39) {
    // 右
  }
  if (keyCode == 37) {
    // 左    
  }

  if (keyCode == 38) {
    // 上
  }
  if (keyCode == 40) {
    // 下
  }
}
```

イベントオブジェクトの keyCode プロパティから得られる、キーコードの一覧表は次のページを参考にするといいでしょう。

- [各ブラウザのキーコード表[JavaScript]](http://www.programming-magic.com/file/20080205232140/keycode_table.html)



[目次に戻る](../ReadMe.md)
　
