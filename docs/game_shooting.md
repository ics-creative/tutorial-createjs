# CreateJS でシューティングゲーム開発に挑戦しよう

シューティングゲームのサンプルを通して当たり判定の具体的な使い方の手順を紹介します。シューティングゲームは画面端から出現する敵に発射弾をぶつけてハイスコアを目指す内容になっています。自機はマウスに追随するようになっておりクリックすることで弾を発射することができます。

![](../imgs/game_shooting.html.png)

- [サンプルを再生する](https://ics-creative.github.io/tutorial-createjs/samples/game_shooting.html)
- [サンプルのソースコードを確認する](../samples/game_shooting.html)


シューティングゲームの基本的な実装として、自機の移動、敵の出現、発射弾と敵との当たり判定を紹介します。ここではスクリプトを抜粋して紹介しているので、サンプルで全てのスクリプトを確認ください。


## ゲームの登場人物

自機はシェイプとして作成しましょう。

```js
// 自機を作成
var player = new createjs.Shape();
player.graphics.beginFill("white").moveTo(5, 0).lineTo(-10, +5).lineTo(-10, -5).closePath();
stage.addChild(player);
```


##  自機の移動


`tick`イベントの処理で自機の座標をマウス座標に減速して追随するようにしましょう。

```js
function handleTick() {
	// 自機をマウス座標まで移動させる(減速で移動)
	player.x += (stage.mouseX - player.x) * 0.1; ★2ここから
	player.y += (stage.mouseY - player.y) * 0.1; ★2ここまで
	(省略)
}
```

## 発射弾の生成

発射弾はマウスクリックで発生するようにします。マウスでステージがクリックしたら、自機の座標から弾を生成します。ちなみに発射弾はシェイプとして作成します。

```js
// クリックした時の処理
function handleClick(event) {
  var bullet = new createjs.Shape();
  bullet.graphics.beginFill("white").drawCircle(0, 0, 2);
  bullet.x = player.x;
  bullet.y = player.y
  stage.addChild(bullet); // 画面に表示
  bulletList.push(bullet); // 配列に保存
}
```

発射弾は移動処理や当たり判定で用いるため配列に保存しておきましょう。


## 敵の生成

敵の生成は60フレームに一度だけ自動的に生成されるようにしたい。`handleTick`関数の中で`count`変数を更新し、`count`変数を60で割ったときの余りの値が0のときだけ処理するという条件文で、60回に一度だけ処理されるようにします。

```js
// フレーム番号を更新(インクリメント)
count = count + 1;
// 60フレームに1回、敵を生成
if (count % 60 == 0) {
  // 敵の生成
}
```

敵はシェイプとして作成します。敵は画面の右端でY座標はランダムの位置に配置します。

```js
// フレーム番号を更新(インクリメント)
count = count + 1;
// 60フレームに1回、敵を生成
if (count % 60 == 0) {
  var enemy = new createjs.Shape();
  enemy.graphics.beginFill("red").moveTo(-5, 0).lineTo(+10, +5).lineTo(+10, -5).closePath();
  enemy.x = STAGE_W;
  enemy.y = STAGE_H * Math.random();
  stage.addChild(enemy); // 画面に表示
  enemyList.push(enemy); // 配列に保存
}
```



## 発射弾と敵の移動処理

発射弾も敵も配列に保存しているので、配列を`for`文で回し各要素の`x`座標を変更するように処理します。画面端に到達したときには、発射弾の場合は画面や配列から削除する処理を記述し、敵の場合はゲームオーバーに切り替わる処理を記述します。

```js
// 発射弾の移動処理
for (var i = 0; i < bulletList.length; i++) {
  bulletList[i].x += 10;
  // 画面端まで移動したら
  if (bulletList[i].x > STAGE_W) {
    stage.removeChild(bulletList[i]); // 画面から削除
    bulletList.splice(i, 1); // 配列から削除
  }
}

// 敵の移動処理
for (var i = 0; i < enemyList.length; i++) {
  enemyList[i].x -= 2;
  // 画面端まで移動したら
  if (enemyList[i].x < 0) {
    showGameOver(); // ゲームオーバー処理へ
  }
}
```


## 当たり判定

発射弾が敵に衝突しているかどうかは、一つ一つの発射弾が敵全てと重なっているかどうかを調べます。発射弾と敵はそれぞれ配列に保存していますが、二重の`for`文を使うことで全要素をチェックすることができます。

発射弾が敵と重なっているかどうかは`hitTest()`関数を使う。`hitTest()`関数は特定の点が表示オブジェクトと重なっているかどうかしかチェックできないので、発射弾の中心点が敵の表示領域に含まれるかどうかをチェックします。`hitTest()`関数はローカル座標を必要とするので、敵から見た発射弾のローカル座標を`localToLocal()`関数で計算します。

当たり判定が取れている場合は発射弾と敵をそれぞれ削除したうえで、スコアの数値と画面表示を更新しましょう。

```js
// 発射弾と敵の当たり判定
for (var j = 0; j < enemyList.length; j++) {
  for (var i = 0; i < bulletList.length; i++) {
    var bullet = bulletList[i];
    var enemy = enemyList[j];
    // 敵から見た発射弾のローカル座標を取得
    var pt = bullet.localToLocal(0, 0, enemy);

    // 当たり判定を行う
    if (enemy.hitTest(pt.x, pt.y) == true) {
      // 発射弾の削除
      stage.removeChild(bullet);
      bulletList.splice(i, 1);

      // 敵の削除
      stage.removeChild(enemyList[j]);
      enemyList.splice(j, 1);

      // スコアの更新
      scoreNum += 100;
      score.text = String(scoreNum);

      break;
    }
  }
}
```

<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2015-12-17</article-date-published>
<article-date-modified>2015-12-17</article-date-modified>
