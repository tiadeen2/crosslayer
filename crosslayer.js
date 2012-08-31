/**
 * crosslayer library
 * http://okra.ark-web.jp/~takemura/public/js/crosslayer/index2.html
 * Copyright (c) Mitsuo TAKEMURA
 * Version: 1.0 (2012/08/17)
 * Licenses: MIT License
 * Requires: jQuery v1.7.2 or later
 *           ↑動作確認してないだけでもっと低くても動くとおもうよ。
 */

;(function($) {

var ver = 'CrossLayer-1.0';

var vars = {
	iNowLayerData     : 0,		// 表示してる背景画像側のJSONデータの添字
	aDefaultLayerData : null,	// JSONデータの配列
	oLayerInfo        : null,	// 穴レイヤーの中の画像レイヤーのデータ
	oOpts             : null	// ユーザー指定を含むoptions
};


$.fn.crosslayer = function(options) {
	return this.each(function() {
		options = options || {};
		vars.oOpts = $.extend({}, $.fn.crosslayer.defaults, options || {});
		
		// JSが効かないヒト向けに全要素表示していたのを折りたたむ
		vars.oBaseElm = layerCrossing(this);
		
		// layerData.json から設定ファイルを取ってきて、init指定で起動！
		getLayerData(vars.oOpts.layerDataFile);
		
	});
};

function layerCrossing(ulElm) {
	// <ul id="crosslayer"><li>...</li></ul>の1つ目のli以降は消えてください
	$(ulElm).find('li:gt(0)').remove();
	return $(ulElm).find('li');
}

function getLayerData(sLayerDataFile) {
	if (! sLayerDataFile) {
		alert("layerDataFileがありませんでした。optionにlayerDataFileを指定してください。");
		return;
	}
	
	$.ajax({
		type     : "GET",
		url      : sLayerDataFile,
		dataType : "json",
		success  : function(json) {
			setLayerData(json);
			initialize();
		},
		error    : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error: optionにセットしたlayerDataFileに実ファイルがあるかどうかを確認してください。");
		}
	});
}

function setLayerData(aLayerData) {
	vars.aDefaultLayerData = new Array();
	
	for (var i = 0 ; i < aLayerData.length ; i++) {
		// 値がなければデフォルトが有効
		aLayerData[i].holePosX   = aLayerData[i].holePosX   || vars.oOpts.holePosX;
		aLayerData[i].holePosY   = aLayerData[i].holePosY   || vars.oOpts.holePosY;
		aLayerData[i].holeWidth  = aLayerData[i].holeWidth  || vars.oOpts.holeWidth;
		aLayerData[i].holeHeight = aLayerData[i].holeHeight || vars.oOpts.holeHeight;
		aLayerData[i].offsetX    = aLayerData[i].offsetX    || vars.oOpts.offsetX;
		aLayerData[i].offsetY    = aLayerData[i].offsetY    || vars.oOpts.offsetY;
		
		vars.aDefaultLayerData[i] = aLayerData[i];
	}
}

function initialize() {
	if (! vars.aDefaultLayerData) return false;
	
	var iNowLayerData = vars.iNowLayerData;
	var oLayerData    = vars.aDefaultLayerData;
	
	var oBackImageLayerInfo  = oLayerData[iNowLayerData];
	var oInnerImageLayerInfo = oLayerData[iNowLayerData + 1];
	
	var oBackImageElm = makeBackImage(oBackImageLayerInfo);
	if (oInnerImageLayerInfo) {
		makeLayer(oBackImageElm, oInnerImageLayerInfo);
	}
}

// 背景画像の生成
function makeBackImage(oLayerInfo) {
	$('.back-image').css('position',  'relative');
	$('.back-image').css('width',     oLayerInfo['imageWidth']  +'px');
	$('.back-image').css('height',    oLayerInfo['imageHeight'] +'px');
	
	$('.back-image').html('<img src="'+ oLayerInfo['imagePath'] +'" width="'+ oLayerInfo['imageWidth'] +'" height="'+ oLayerInfo['imageHeight'] +'" />');
	if (vars.oOpts.messageElm) {
		$(vars.oOpts.messageElm).html(oLayerInfo['message']);
	}
	return $('.back-image');
}

function makeLayer(oBackImageElm, oLayerInfo) {
/*
// ↓この部分、なにを変換したのか忘れちった！

	// offsetX, offsetYの変換
	var oNewLayerInfo = this._convertOffsetPosition(oBackImageElement, oLayerInfo);
*/

	// 穴レイヤーを生成する
	var oHoleLayerElm = _generateHoleLayer(oBackImageElm, oLayerInfo);

	// 穴レイヤーに画像レイヤーを埋め込む
	var oInnerLayerElm = _generateInnerLayer(oHoleLayerElm, oLayerInfo);

	// メンバ変数へ保存
	vars.oLayerInfo = oLayerInfo;

	// イベントハンドラを定義
	oHoleLayerElm.bind('mouseover.crosslayer', startMousemove);
	oHoleLayerElm.bind('mousemove.crosslayer', mouseMove);
	oHoleLayerElm.bind('mouseout.crosslayer',  endMousemove);
	oInnerLayerElm.bind('click.crosslayer',    function() { clickInnerLayer(); return false; });
}

// 穴レイヤーの生成
function _generateHoleLayer(oParentElm, oLayerInfo) {
	oParentElm.append('<div class="hole-layer">&nbsp;</div>');
	$(".hole-layer").css('position',  'absolute');
	$(".hole-layer").css('overflow',  'hidden');
	$(".hole-layer").css('border',    vars.oOpts.holeBorder);
	$(".hole-layer").css('width',  oLayerInfo['holeWidth']+'px');
	$(".hole-layer").css('height', oLayerInfo['holeHeight']+'px');
	$(".hole-layer").css('left',   oLayerInfo['holePosX']+'px');
	$(".hole-layer").css('top',    oLayerInfo['holePosY']+'px');
	
	return $(".hole-layer");
}

// 穴レイヤー内の画像レイヤーの生成
function _generateInnerLayer(oParentElm, oLayerInfo) {
	oParentElm.append('<div class="inner-layer"><a href="#"><img src="'+ oLayerInfo['imagePath'] +'" border="0" /></a></div>');
	$(".inner-layer").css('position', 'absolute');
	$(".inner-layer img").css('width',  oLayerInfo['imageWidth']+'px');
	$(".inner-layer img").css('height', oLayerInfo['imageHeight']+'px');
	$(".inner-layer img").attr('alt',   oLayerInfo['message']);
	$(".inner-layer img").attr('title', oLayerInfo['message']);
	
	_initInnerLayer(oLayerInfo);
	
	return $(".inner-layer");
}
function _initInnerLayer(oLayerInfo) {
	if (! $(".inner-layer")) return ;
	
	$(".inner-layer").css('opacity',  '0.6');
	$(".inner-layer").css('left', oLayerInfo['offsetX']+'px');
	$(".inner-layer").css('top',  oLayerInfo['offsetY']+'px');
}

//-- イベント処理 ----------------

function startMousemove(e) {
	$(".inner-layer").css('opacity', '1');
}

function endMousemove(e) {
	_initInnerLayer(vars.oLayerInfo);
}

function mouseMove(e) {
	var oHoleLayerOffset = $(".hole-layer").offset();
	// 穴レイヤー内のどこにマウスX,Yがあるか
	// e.pageX はページの左上からのピクセルだが、穴レイヤーの左上のオフセットを 0 にしてやる
	var iCursorX = e.pageX - oHoleLayerOffset.left;
	var iCursorY = e.pageY - oHoleLayerOffset.top;
	
	// 穴レイヤー内の画像レイヤーにて、オフセットをどの位置にするかを決める
	// iCursorX=1になった時に画像の一番右…と考えれば分かるでしょ?
	// でも一番右を"左上"にしてしまうとアレなので穴レイヤーの幅１個分だけ引いている。-9はマジックナンバーようわからん^^;offset関数の差異?!
	var oLayerInfo = vars.oLayerInfo;
	var iOffsetX = (oLayerInfo['imageWidth']  - oLayerInfo['holeWidth']  - 9) * (iCursorX / oLayerInfo['holeWidth'])  * -1;
	var iOffsetY = (oLayerInfo['imageHeight'] - oLayerInfo['holeHeight'] - 9) * (iCursorY / oLayerInfo['holeHeight']) * -1;
	// 穴レイヤー内の画像レイヤーのオフセットをセットするだけ
	$(".inner-layer").css('left', iOffsetX+'px');
	$(".inner-layer").css('top',  iOffsetY+'px');
}

function clickInnerLayer(e) {
	// 穴レイヤーのイベントハンドラを削除
	$(".hole-layer").unbind('mouseover.crosslayer');
	$(".hole-layer").unbind('mousemove.crosslayer');
	$(".hole-layer").unbind('mouseout.crosslayer');
	$(".inner-layer").unbind('click.crosslayer');
	
	// トランジションしてchangeLayerDataを呼ぶ
	$.fn.crosslayer.transitions.sizeUp(changeLayerData, vars.oLayerInfo, vars.oOpts.changeSpeed);
}

function changeLayerData() {
	vars.iNowLayerData++;
	if (vars.iNowLayerData < vars.aDefaultLayerData.length) {
		initialize();
	}
}

$.fn.crosslayer.transitions = {
	// 穴レイヤーを背景画像と同じくらいまで大きくしたい。
	sizeUp: function(nextFunc, oLayerInfo, iSpeed) {
		// jquery.animateであっという間にできた…スゲー！
		$(".hole-layer").animate(
			{
				width:  oLayerInfo['imageWidth'],
				height: oLayerInfo['imageHeight'],
				left: '0px',
				top:  '0px'
			},
			{
				duration: iSpeed,
				easing: 'swing'
			}
		);
		$(".inner-layer").animate(
			{
				left: '0px',
				top:  '0px',
				opacity: 1
			},
			{
				duration: iSpeed,
				easing: 'swing'
			}
		);
		setTimeout(nextFunc, iSpeed);
	}
};

$.fn.crosslayer.defaults = {
	layerDataFile: null,
	
	holePosX:      100,
	holePosY:      100,
	holeWidth:      64,
	holeHeight:     64,
	offsetX:      -100,
	offsetY:      -100,
	
	holeBorder:   "solid 2px #aa0000",
	changeSpeed:  700, // ms
	messageElm:   ".description"
};

$.fn.crosslayer.ver = function() {
	return ver;
};

})(jQuery);
