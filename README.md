
crosslayer.js
=====================

image crossing layer - �摜�̂��镔�����N���b�N����Ƒ��̉摜�Ƀ`�F���W����jQuery�p���C�u�����B

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
- @desc �\�����郌�C���[����JSON�ŕʓr�t�@�C���Ƃ��Ď����Ă����K�v������i���P�Fjson�`���͌�q�j

- @option holePosX, holePosY : num - default = 100, 100
- @desc �����C���[�̕\���ʒu�̎w��B�f�t�H���g�� 100�B���C���[���ŏ㏑���w��\

- @option holeWidth, holeHeight : num - default = 64, 64
- @desc �����C���[�̃T�C�Y�̎w��B�f�t�H���g�� 64�B���C���[���ŏ㏑���w��\

- @option holeBorder : string - default = "solid 2px #aa0000"
- @desc �����C���[��border�̎w��B�f�t�H���g�� "solid 2px #aa0000",

- @option offsetX, offsetY : num - default = -100, -100
- @desc �����C���[���̉摜�̕\���ʒu�̎w��B�f�t�H���g�� -100�B���C���[���ŏ㏑���w��\

- @option messageElm : string - default = ".description"
- @desc �ڍו�����\������ꏊ�̎w��B�f�t�H���g��".description"

-----------------------------
   ���P�Fjson�`���ɂ���
-----------------------------

    �f�[�^�T���v���F
    [
    	{
    		"imagePath"  : "samples/img01.jpg",
    		"imageWidth" : 320,
    		"imageHeight": 320,
    		"holePosX"   : 100,
    		"holePosY"   : 200,
    		"message"    : "���C�g�A�b�v���ꂽ�V�����p���^���[�I"
    	},
    	�F
    	{
    		"imagePath"  : "samples/img07.jpg",
    		"imageWidth" : 320,
    		"imageHeight": 320,
    		"holePosX"   : 100,
    		"holePosY"   : 200,
    		"message"    : "�Ԃɂ��Ȃ��I
    �S���V�����p���^���[�łł��Ă�I"
    	}
    ]

- imagePath(�K�{): �\������摜��URL���w��
- imageWidth(�K�{): �\������摜�̃T�C�Y���w��
- imageHeight(�K�{): �\������摜�̃T�C�Y���w��
- holePosX(�C��): �����C���[�̕\���ʒu�̎w��B�f�t�H���g�̓I�v�V�����Ŏw�肵���l
- holePosY(�C��): �����C���[�̕\���ʒu�̎w��B�f�t�H���g�̓I�v�V�����Ŏw�肵���l
- message(�C��): �摜�̏ڍׂɕ\�����镶���B
- holeWidth(�C��): �����C���[�̃T�C�Y�̎w��B�f�t�H���g�̓I�v�V�����Ŏw�肵���l
- holeHeight(�C��): �����C���[�̃T�C�Y�̎w��B�f�t�H���g�̓I�v�V�����Ŏw�肵���l
- offsetX(�C��): �����C���[���̉摜�̕\���ʒu�̎w��B�f�t�H���g�̓I�v�V�����Ŏw�肵���l
- offsetY(�C��): �����C���[���̉摜�̕\���ʒu�̎w��B�f�t�H���g�̓I�v�V�����Ŏw�肵���l


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
    
    <h3>�摜�̏ڍא���</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img02.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>�摜�̏ڍא���</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img03.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>�摜�̏ڍא���</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img04.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>�摜�̏ڍא���</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img05.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>�摜�̏ڍא���</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img06.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>�摜�̏ڍא���</h3>
    <div class="description">
    </li>
    <li>
    <div style="position: relative; width: 320px; height: 320px;" class="back-image">
    <img src="samples/img07.jpg" height="320" width="320">
    <!-- #back-image --></div>
    
    <h3>�摜�̏ڍא���</h3>
    <div class="description">
    </li>
    </ul>

��L�̃T���v���͉��LURL���瓮��m�F���ł��܂��B

[����T���v��](http://okra.ark-web.jp/~takemura/public/js/crosslayer/index2.html)