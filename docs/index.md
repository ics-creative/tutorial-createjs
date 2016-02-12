# CreateJS入門サイト

このサイトはHTML5 Canvasのフレームワーク「[CreateJS](http://www.createjs.com/easeljs)」の入門サイトです。初学者から学べるように基本的な**CreateJSの使い方**から解説しつつ、発展的な内容までまとめています。このサイトを通して、Webでのインタラクションデザインについて学んでいきましょう。

## 導入編

![CreateJSの導入編](../imgs/title_createjs.jpg)

Webのリッチコンテンツを作るためのフレームワーク「CreateJS」。どのような場面で利用されるのか、どういった表現が可能なのかという点を中心に、概要と導入方法を説明します。

- [CreateJS とは](basic.md)
- [CraeteJS の事例](basic_showcase.md)
- [簡単なサンプルを試そう](quickstart.md)
- [ブラウザの開発ツールの使い方を抑えよう](debug.md)

## CreateJS の基本的な使い方

![CreateJSの基本編](../imgs/title_shape.jpg)

### 描画の基本

グラフィックの描き方からテキストや画像の表示といったCreateJSの基本的な使い方を一つ一つ覚えていきましょう。表示オブジェクトというインタラクションデザインを作る上で必要不可欠な概念を解説します。

- [表示オブジェクトの基本](displayobject.md)
- シェイプの表示
  - [線と塗り](shape_fill_stroke.md)
  - [色の指定](shape_color.md)
  - [様々な図形の描画](shape_draw.md)
- [テキストの表示](text.md)
- [画像の表示](bitmap.md)
- 親子構造
  - [表示オブジェクトのグループ化](nest.md)
  - [表示オブジェクトの削除](displayobject_remove.md)

### モーションの実装

時間経過の処理を学びましょう。時間経過処理はモーション/アニメーションの制作の基本となります。CreateJSでは、`createjs.Ticker`クラスがその中心的な役割を担っています。

- [Ticker の使い方](ticker.md)

## 初級編

![CreateJSのサンプル](../imgs/title_clock.jpg)


### ユーザーインタラクションの実装

マウスやキーボードなど、パソコンでのユーザー入力の制御方法を学びましょう。UI(ユーザーインターフェース)の具体的な一例としてボタンの作成方法も解説します。

- マウス操作 (基本)
  - [マウス座標](mouse_xy.md)
  - [クリックイベント](mouse_click.md)
  - [マウスオーバー](mouse_over.md)
  - [ドラッグアンドドロップ](mouse_drag.md)
  - [タッチデバイス対応](mouse_touch.md)
- マウス操作 (応用)
  - [ボタンの作成](button.md)
- キーボード操作
  - [キーボードイベントの基本](keyboard_basic.md)
  - [キーボードで自機を操作](keyboard_ship.md)
- [当たり判定](hittest.md)

### サンプル (初級編)

ここまで学習した内容の理解を深めるべく、サンプル制作に挑戦ください。まずは自分でコードを書いていくといいでしょう。困ったら完成形のサンプルのコードを参照してください。

- [アナログ時計の作成](clock.md)
- [パズル](game_pazzle.md)

## 中級編

![CreateJS入門の中級編](../imgs/title_trigonometry.jpg)

### トゥイーンモーションの実装

トゥイーンを使えば、少ないコードで多彩なモーションを手軽に実装することができます。トゥイーンは特にUI(ユーザーインターフェース)の実装で役立ちます。

- [トゥイーンの作成方法](tween.md)
- [トゥイーン実装方法まとめ](tween_api.md)

### 数学の活用

高校数学で学ぶ三角関数。三角関数は将来、何の役に立つのかと思っていた方も多いのではないでしょうか。インタラクションデザインの世界では三角関数は頻繁に利用します。簡単なサンプルを通して、三角関数の活用方法を学んでいきましょう。

- 三角関数
  - [三角関数の活用](math_basic.md)
  - [三角関数をモーションに使う](math_trigonometry.md)
- 色の制御
  - [HSLカラー](color_hsl.md)

### マルチメディア

- [音声(サウンド)の再生](sound.md)

### サンプル (中級編)

中級編までで学習した内容の理解を深めるべく、サンプル制作に挑戦してみましょう。

- [物理演算](ball.md)
- [カルーセル(スライドショー)](slideshow.md)


## 応用編

![CreateJS入門の応用編](../imgs/title_particle.jpg)

### サンプル(応用編)

様々な応用サンプルに挑戦してみましょう。表現のリッチさに比例してコード量も増えますが、これまでに解説した内容を組み合わせた内容になっています。

- [フラクタル図形](fractal.md)
- [パーティクルシステム](particle.md)
- [シューティングゲーム](game_shooting.md)

## Flash Professional CCを使おう

![CreateJS入門 - Adobe Animate CCとの連携](../imgs/title_animatecc.jpg)

Adobe Flash Professional CCというアプリケーションを使えば、CreateJS用のグラフィックやモーションをコードを書かなくても作ることができます。コードが書くのは苦手という方はFlash Professional CCでCreateJSコンテンツを作ってみるといいでしょう。ここではFlash Professional CCで作ったCreateJSコンテンツを、プログラムで連携する方法を解説します。

- [Adobe Flash Pro CC と CreateJS の連携 (基本編)](adobe_animate.md)
- [Adobe Flash Pro CC と CreateJS の連携 (ビットマップ含む編)](adobe_animate_bitmaps.md)
- [Adobe Flash Pro CC と CreateJS の連携 (スプライトシート編)](adobe_animate_spritesheet.md)

## その他

- [スマホブラウザで全画面に表示する対応](fullscreen.md)


<article-author>[池田 泰延](https://twitter.com/clockmaker)</article-author>
<article-date-published>2015-11-22</article-date-published>
<article-date-modified>2016-02-12</article-date-modified>
