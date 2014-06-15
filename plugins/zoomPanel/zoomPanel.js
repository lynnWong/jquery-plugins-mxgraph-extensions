/**
 * zoomPanel 拓展<div/>:缩放面板
 *
 * @author LynnWong 2014-4-1
 *
 * @requires jquery.core-cmd.js
 *
 * @method zoomPanel 生成缩放面板
 * @augments option{} 1)scale String:当前缩放比例
 *                    2)zoomChange Function(String scale):缩放处理事件
 * @event zoomChange: function(Event evt,String scale) scale缩放比例
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';
	require("./resources/zoomPanel.css");
	(function($) {
		$.zoomPanel = $.zoomPanel || {};
		$.extend($.zoomPanel, {
			init : function($this, option) {
				this.options = option || {};
				this.loadTemplate();
				this.initHTML($this);
				this.initListener();
			},
			initHTML : function($this) {
				$this.addClass("zoomPanel-container").append(this.$temp);
				this.$this = $this;
				if(this.options.html){
					this.$this.find("div#bp_outline_graph").append(this.options.html);
				}
				this.$block = this.$this.find("#bp_outline_zoombar_block");
				this.$input = this.$this.find("#bp_outline_infor input");
				this.relocateZoombar(this.options.scale)
			},
			loadTemplate : function() {
				var temp='<div>'+
					'<span>全景浏览</span> <span id="bp_comp_assignee_sign" data-toggle="tooltip"'+
					'data-placement="bottom" title="钉住面板,使得点击空白处时面板不消失"><i'+
					'class="glyphicon  bp-glyphicon  glyphicon-pushpin"></i></span>'+
					'</div>'+
					'<div id="bp_outline_graph"></div>'+
					'<div id="bp_outline_infor">'+
					'缩放比例:&nbsp;&nbsp;<font><input type="text" class="form-control"'+
					'value="100%"></font>'+
					'<div class="btn-group-vertical btn-group-xs">'+
					'<button type="button" class="btn btn-default bp-outline-icon-up"></button>'+
					'<button type="button" class="btn btn-default bp-outline-icon-down"></button>'+
					'</div>'+
					'<button type="button" class="btn btn-default btn-xs">重置</button>'+
					'</div>'+
					'<div id="bp_outline_zoombar">'+
					'<div class="bp-outline-zoom-btn bp-outline-zoom-btn-out"></div>'+
					'<div id="bp_outline_zoombar_bar"></div>'+
					'<div class="bp-outline-zoom-btn bp-outline-zoom-btn-in"></div>'+
					'<div id="bp_outline_zoombar_block"></div>'+
					'</div>';

				this.$temp = $(temp);
			},
			initListener : function() {

				// 定义事件
				// 控制输入内容必须是数字且带有"%"
				function changeInputValue(evt) {
					var $input = $(this), defaultStart = this.selectionStart, value = $input
							.val().replace("%", "");
					// 开头不能输入0
					if (Number(value.substr(0, 1)) == 0) {
						value = value.substr(1, value.length);
						defaultStart = defaultStart - 1;
					}
					// 放大倍数不能超过999倍
					if (Number(value) > 999) {
						value = value.substr(0, defaultStart - 1)
								+ value.substr(defaultStart, value.length);//
						defaultStart = defaultStart - 1;
					}
					// 不能输入除了数字以外的字符,且结尾必须是%
					value = value.replace(/[^0-9]/g, "");
					$input.val(value + "%");
					this.selectionStart = defaultStart;
					this.selectionEnd = defaultStart;
					if (evt.data.scope.options.zoomChange) {
						if (Number(value) / 100 > 0) {
							// 缩放条位置变化
							evt.data.scope.relocateZoombar(Number(value) / 100);
							// 加载自定义的缩放方法
							evt.data.scope.options.zoomChange(Number(value)
									/ 100);
							// 触发zoomChange监听
							evt.data.scope.$this.trigger("zoomChange",
									[Number(value) / 100]);
						}
					}
					$input = null;
					defaultStart = null;
					value = null;
				}
				// 防止选中状态
				function preventFromSelectText() {
					window.getSelection ? window.getSelection()
							.removeAllRanges() : document.selection.empty();
				}
				// 重置缩放
				function resetZoom(evt) {
				var scope = evt.data?evt.data.scope:
					evt.data.scope.relocateZoombar(1);
					evt.data.scope.$input.val("100%");
					evt.data.scope.$input.trigger("input");
					$(this).blur();
					evt.data.scope.$input.blur();
				}
				// 根据缩放按钮缩放
				function zoomByClick(evt) {
					preventFromSelectText();
					var scale = evt.data.scope.scale;
					if (evt.data.isUp) {
						scale += 0.05;
					} else {
						scale -= 0.05;
					}
					scale = scale > 9.99 ? 9.99 : scale;
					scale = scale < 0.01 ? 0.01 : scale;
					evt.data.scope.relocateZoombar(scale);
					evt.data.scope.$input.val(parseInt(scale * 100) + "%");
					evt.data.scope.$input.trigger("input");
					$(this).blur();
					evt.data.scope.$input.blur();
					scale = null;
				}
				// 滑块的拖拽动作
				function blockDragHandler(blockEvt) {
					$(window).on("mousemove", function(evt) {
								preventFromSelectText();
								locateBlock(evt.clientX, blockEvt.data.scope);
							}).on("mouseup", function() {
								$(this).unbind("mousemove");
							});
				}
				// 滑块位移
				function locateBlock(moveX, scope) {
					moveX = moveX - 2;
					var minLeft = $(".bp-outline-zoom-btn-out").offset().left
							+ $(".bp-outline-zoom-btn-out").width(), maxLeft = $(".bp-outline-zoom-btn-in")
							.offset().left
							- $("#bp_outline_zoombar_block").width(), dLeft = moveX < minLeft
							? minLeft
							: moveX;

					dLeft = dLeft > maxLeft ? maxLeft : dLeft;
					scope.$block.offset({
								left : dLeft
							});
					getScaleByXMove(dLeft - minLeft, scope);
					minLeft = null;
					maxLeft = null;
					dLeft = null;
				}
				// 获取滑块移动的比例并进行缩放
				function getScaleByXMove(dx, scope) {
					var scale;
					if (dx < scope.barWidth / 2) {
						scale = dx / scope.barWidth * 2;
					} else if (dx == scope.barWidth / 2) {
						scale = 1;
					} else {
						scale = (dx - scope.barWidth / 2)
								/ (scope.barWidth / (2 * 899));
						scale = (scale + 100) / 100;
					}
					if (scale) {
						scale = scale > 9.99 ? 9.99 : scale;
						scale = scale < 0.01 ? 0.01 : scale;
						scope.$input.val(parseInt(scale * 100) + "%");
						scope.options.zoomChange(scale);
						scope.scale = scale;
						scope.$this.trigger("zoomChange", [scale]);
					}
					scale = null;
				}
				// 缩放输入
				this.$this.find("#bp_outline_infor input").on("input", {
							scope : this
						}, changeInputValue);
				// 缩放按钮
				this.$this
						.find("#bp_outline_infor .bp-outline-icon-up,#bp_outline_zoombar >.bp-outline-zoom-btn-in")
						.on("click", {
									scope : this,
									isUp : true
								}, zoomByClick).on("mousemove",
								preventFromSelectText);
				this.$this
						.find("#bp_outline_infor .bp-outline-icon-down,#bp_outline_zoombar>.bp-outline-zoom-btn-out")
						.on("click", {
									scope : this,
									isUp : false
								}, zoomByClick).on("mousemove",
								preventFromSelectText);
				// 重置按钮
				this.$this.find("#bp_outline_infor > button").on("click", {
							scope : this
						}, resetZoom);
				// 缩放条滑块拖拽
				this.$block.on("mousedown", {
							scope : this
						}, blockDragHandler);
				// 点击滑竿
				$("#bp_outline_zoombar_bar").click({
							scope : this
						}, function(evt) {
							locateBlock(evt.clientX, evt.data.scope);
						});
				// 钉住按钮
				$("#bp_outline>div:first-child span").click(function() {
							if ($(this).hasClass("pushpin-enable")) {
								$(this).removeClass("pushpin-enable");
								$(this).parents("#bp_outline").data("sticky",
										false);
							} else {
								$(this).addClass("pushpin-enable");
								$(this).parents("#bp_outline").data("sticky",
										true);
							}
						});
				if ($("body").tooltip) {
					$("#bp_outline>div:first-child span").tooltip();
				}
				$("#bp_outline").data("sticky", false);

			},
			relocateZoombar : function(scale) {
				this.barWidth = this.$this.find("#bp_outline_zoombar_bar")
						.width()
						- this.$this.find("#bp_outline_zoombar_block").width()
						+ 2;
				this.defaultBlockLeft = 16
						+ (this.barWidth) / 2;
				if (scale) {
					this.$input.val(scale * 100 + "%");
					if (scale > 1) {
						this.$block.css({
									left : this.defaultBlockLeft
											+ this.barWidth / 2 * scale / 10
								});
					} else {
						this.$block.css({
									left : this.defaultBlockLeft
											- this.barWidth
											* (0.5 - 0.5 * scale)
								});
					}
					this.scale = scale;
				} else {
					this.$block.css({
								left : this.defaultBlockLeft
							});
					this.scale = 1;
				}
			}
		});
		$.extend($.fn, {
					zoomPanel : function(option) {
						if (option && typeof option == "string") {
							var methodStr = option, method = $.zoomPanel[methodStr];
							if (method && $.isFunction(method)) {
								option = arguments[1];
								return method.call(this, option);
							}
						}
						$.zoomPanel.init($(this), option);
						return this;
					}
				});
	}(jQuery));
});