
crosslayer.js
=====================

image crossing layer - 画像のある部分をクリックすると他の画像にチェンジするjQuery用ライブラリ。

    @requires jQuery v1.7 or above
    
    Copyright (c) Mitsuo TAKEMURA
    Licensed under the MIT License
    http://www.opensource.org/licenses/mit-license.php
    
    Version: 1.0


-----------------------------
   Install
-----------------------------

    <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="js/crosslayer.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
    	$('#crosslayer').crosslayer({
    		layerDataFile : "jsonLayerData.txt"
    	});
    });
    </script>

-----------------------------
   Options
-----------------------------

- @option layerDataFile : string - no default
- @desc 表示するレイヤー情報をJSONで別途ファイルとして持っておく必要がある（※１：json形式は後述）

- @option holePosX, holePosY : num - default = 100, 100
- @desc 穴レイヤーの表示位置の指定。デフォルトは 100。レイヤー情報で上書き指定可能

- @option holeWidth, holeHeight : num - default = 64, 64
- @desc 穴レイヤーのサイズの指定。デフォルトは 64。レイヤー情報で上書き指定可能

- @option holeBorder : string - default = "solid 2px #aa0000"
- @desc 穴レイヤーのborderの指定。デフォルトは "solid 2px #aa0000",

- @option offsetX, offsetY : num - default = -100, -100
- @desc 穴レイヤー内の画像の表示位置の指定。デフォルトは -100。レイヤー情報で上書き指定可能

- @option messageElm : string - default = ".description"
- @desc 詳細文言を表示する場所の指定。デフォルトは".description"

-----------------------------
   ※１：json形式について
-----------------------------

    データサンプル：
    [
    	{
    		"imagePath"  : "samples/img01.jpg",
    		"imageWidth" : 320,
    		"imageHeight": 320,
    		"holePosX"   : 100,
    		"holePosY"   : 200,
    		"message"    : "ライトアップされたシャンパンタワー！"
    	},
    	：
    	{
    		"imagePath"  : "samples/img07.jpg",
    		"imageWidth" : 320,
    		"imageHeight": 320,
    		"holePosX"   : 100,
    		"holePosY"   : 200,
    		"message"    : "赤にもなるよ！
    全部シャンパンタワーでできてる！"
    	}
    ]

- imagePath(必須): 表示する画像のURLを指定
- imageWidth(必須): 表示する画像のサイズを指定
- imageHeight(必須): 表示する画像のサイズを指定
- holePosX(任意): 穴レイヤーの表示位置の指定。デフォルトはオプションで指定した値
- holePosY(任意): 穴レイヤーの表示位置の指定。デフォルトはオプションで指定した値
- message(任意): 画像の詳細に表示する文言。
- holeWidth(任意): 穴レイヤーのサイズの指定。デフォルトはオプションで指定した値
- holeHeight(任意): 穴レイヤーのサイズの指定。デフォルトはオプションで指定した値
- offsetX(任意): 穴レイヤー内の画像の表示位置の指定。デフォルトはオプションで指定した値
- offsetY(任意): 穴レイヤー内の画像の表示位置の指定。デフォルトはオプションで指定した値


-----------------------------
   Example
-----------------------------

    <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="js/crosslayer.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
    	$('#crosslayer').crosslayer({
    		layerDataFile : "jsonLayerData.txt"
    	});
    });
    </script>
    
    <ul id="crosslayer">
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img01.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>画像の詳細説明</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img02.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>画像の詳細説明</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img03.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>画像の詳細説明</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img04.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>画像の詳細説明</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img05.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>画像の詳細説明</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img06.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>画像の詳細説明</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img07.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>画像の詳細説明</h3>
    <div class="description">
    </li>
    </ul>

上記のサンプルは下記URLから動作確認ができます。

[動作サンプル](http://okra.ark-web.jp/~takemura/public/js/crosslayer/index2.html)
