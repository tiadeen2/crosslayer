/**
 * crosslayer library
 * http://okra.ark-web.jp/~takemura/public/js/crosslayer/index2.html
 * Copyright (c) Mitsuo TAKEMURA
 * Version: 1.0 (2012/08/17)
 * Licenses: MIT License
 * Requires: jQuery v1.7.2 or later
 *           ������m�F���ĂȂ������ł����ƒႭ�Ă������Ƃ�������B
 */

;(function($) {

var ver = 'CrossLayer-1.0';

var vars = {
	iNowLayerData     : 0,		// �\�����Ă�w�i�摜����JSON�f�[�^�̓Y��
	aDefaultLayerData : null,	// JSON�f�[�^�̔z��
	oLayerInfo        : null,	// �����C���[�̒��̉摜���C���[�̃f�[�^
	oOpts             : null	// ���[�U�[�w����܂�options
};


$.fn.crosslayer = function(options) {
	return this.each(function() {
		options = options || {};
		vars.oOpts = $.extend({}, $.fn.crosslayer.defaults, options || {});
		
		// JS�������Ȃ��q�g�����ɑS�v�f�\�����Ă����̂�܂肽����
		vars.oBaseElm = layerCrossing(this);
		
		// layerData.json ����ݒ�t�@�C��������Ă��āAinit�w��ŋN���I
		getLayerData(vars.oOpts.layerDataFile);
		
	});
};

function layerCrossing(ulElm) {
	// <ul id="crosslayer"><li>...</li></ul>��1�ڂ�li�ȍ~�͏����Ă�������
	$(ulElm).find('li:gt(0)').remove();
	return $(ulElm).find('li');
}

function getLayerData(sLayerDataFile) {
	if (! sLayerDataFile) {
		alert("layerDataFile������܂���ł����Boption��layerDataFile���w�肵�Ă��������B");
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
			alert("error: option�ɃZ�b�g����layerDataFile�Ɏ��t�@�C�������邩�ǂ������m�F���Ă��������B");
		}
	});
}

function setLayerData(aLayerData) {
	vars.aDefaultLayerData = new Array();
	
	for (var i = 0 ; i < aLayerData.length ; i++) {
		// �l���Ȃ���΃f�t�H���g���L��
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

// �w�i�摜�̐���
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
// �����̕����A�Ȃɂ�ϊ������̂��Y�ꂿ�����I

	// offsetX, offsetY�̕ϊ�
	var oNewLayerInfo = this._convertOffsetPosition(oBackImageElement, oLayerInfo);
*/

	// �����C���[�𐶐�����
	var oHoleLayerElm = _generateHoleLayer(oBackImageElm, oLayerInfo);

	// �����C���[�ɉ摜���C���[�𖄂ߍ���
	var oInnerLayerElm = _generateInnerLayer(oHoleLayerElm, oLayerInfo);

	// �����o�ϐ��֕ۑ�
	vars.oLayerInfo = oLayerInfo;

	// �C�x���g�n���h�����`
	oHoleLayerElm.bind('mouseover.crosslayer', startMousemove);
	oHoleLayerElm.bind('mousemove.crosslayer', mouseMove);
	oHoleLayerElm.bind('mouseout.crosslayer',  endMousemove);
	oInnerLayerElm.bind('click.crosslayer',    function() { clickInnerLayer(); return false; });
}

// �����C���[�̐���
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

// �����C���[���̉摜���C���[�̐���
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

//-- �C�x���g���� ----------------

function startMousemove(e) {
	$(".inner-layer").css('opacity', '1');
}

function endMousemove(e) {
	_initInnerLayer(vars.oLayerInfo);
}

function mouseMove(e) {
	var oHoleLayerOffset = $(".hole-layer").offset();
	// �����C���[���̂ǂ��Ƀ}�E�XX,Y�����邩
	// e.pageX �̓y�[�W�̍��ォ��̃s�N�Z�������A�����C���[�̍���̃I�t�Z�b�g�� 0 �ɂ��Ă��
	var iCursorX = e.pageX - oHoleLayerOffset.left;
	var iCursorY = e.pageY - oHoleLayerOffset.top;
	
	// �����C���[���̉摜���C���[�ɂāA�I�t�Z�b�g���ǂ̈ʒu�ɂ��邩�����߂�
	// iCursorX=1�ɂȂ������ɉ摜�̈�ԉE�c�ƍl����Ε�����ł���?
	// �ł���ԉE��"����"�ɂ��Ă��܂��ƃA���Ȃ̂Ō����C���[�̕��P�����������Ă���B-9�̓}�W�b�N�i���o�[�悤�킩���^^;offset�֐��̍���?!
	var oLayerInfo = vars.oLayerInfo;
	var iOffsetX = (oLayerInfo['imageWidth']  - oLayerInfo['holeWidth']  - 9) * (iCursorX / oLayerInfo['holeWidth'])  * -1;
	var iOffsetY = (oLayerInfo['imageHeight'] - oLayerInfo['holeHeight'] - 9) * (iCursorY / oLayerInfo['holeHeight']) * -1;
	// �����C���[���̉摜���C���[�̃I�t�Z�b�g���Z�b�g���邾��
	$(".inner-layer").css('left', iOffsetX+'px');
	$(".inner-layer").css('top',  iOffsetY+'px');
}

function clickInnerLayer(e) {
	// �����C���[�̃C�x���g�n���h�����폜
	$(".hole-layer").unbind('mouseover.crosslayer');
	$(".hole-layer").unbind('mousemove.crosslayer');
	$(".hole-layer").unbind('mouseout.crosslayer');
	$(".inner-layer").unbind('click.crosslayer');
	
	// �g�����W�V��������changeLayerData���Ă�
	$.fn.crosslayer.transitions.sizeUp(changeLayerData, vars.oLayerInfo, vars.oOpts.changeSpeed);
}

function changeLayerData() {
	vars.iNowLayerData++;
	if (vars.iNowLayerData < vars.aDefaultLayerData.length) {
		initialize();
	}
}

$.fn.crosslayer.transitions = {
	// �����C���[��w�i�摜�Ɠ������炢�܂ő傫���������B
	sizeUp: function(nextFunc, oLayerInfo, iSpeed) {
		// jquery.animate�ł����Ƃ����Ԃɂł����c�X�Q�[�I
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
