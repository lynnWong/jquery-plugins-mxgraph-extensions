/**
 * numberInput 拓展<input> 解决firefox,ie等浏览器不支持type=number的问题 并且提供必要的校验和最大值,最小值的约束
 * 
 * @author LynnWong 2014-4-29
 * 
 * @requires jquery.core-cmd.js
 * 
 * @augments 需要<input>中设置以下属性:max最大值(默认值10000) min最小值(默认值-10000)
 *           step每次增加或减少的量(默认值1) value 默认值(默认值0)
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';
	require("./resources/number.css");
	(function($) {
		$.numberInput = $.numberInput || {};
		$.extend($.numberInput, {
			init : function($this) {
				var option = {};
				this.$this = $this;
				$this.css({
					minHeight:33,
					display:"inline-block"
				});
				if (!$this.attr("max")) {
					$this.attr("max", 10000);
				}
				if (!$this.attr("min")) {
					$this.attr("min", -10000);
				}
				if (!$this.attr("step")) {
					$this.attr("step", 1);
				}
				if (!$this.attr("value") && $this.val() == "") {
					$this.attr("value", $this.attr("min"));
				}
				this.option = option;
				this.initTemplate();
				this.initHTML();
			},
			initTemplate : function() {
				this.$btnsGroup = $("<div class=\"bp-number-btn-group btn-group-vertical btn-group-xs\">"
						+ "<button type=\"button\" class=\"btn btn-default bp-number-btn bp-number-icon-up\"></button>"
						+ "<button type=\"button\" class=\"btn btn-default bp-number-btn bp-number-icon-down\"></button>"
						+ "</div>").insertAfter(this.$this);
			},
			initHTML : function() {
				this.$this.data("value", this.$this.val());
				this.$btnsGroup.find("button").on("click", function() {
					var value = "", $input = $(this).parent().prev("input"), max = Number($input
							.attr("max")), min = Number($input.attr("min")), step = Number($input
							.attr("step"));
					if ($(this).hasClass("bp-number-icon-up")) {
						value = Number($input.val()) + step;
					} else {
						value = Number($input.val()) - step;
					}
					if (min <= value && max >= value) {
						$input.val(value).data("value", value);
					}
					$input.trigger("change");
					$(this).blur();
					value = null;
				});
				this.$this.on("input", function() {
					var $input = $(this), value = $input.val().replace(
							/[^\d+|\-]/g, ""), max = Number($input.attr("max")), min = Number($input
							.attr("min")), step = Number($input.attr("step"));
					value = value == "" ? $input.data("value") : Number(value);
					if (min <= value && max >= value) {
						$input.val(value).data("value", value);
					} else {
						$input.val($input.data("value"));
					}
					$input.trigger("change");
					value = null;
				});

			},
			// TODO 删掉相关的div
			destroy : function() {

			}
		});
		$.extend($.fn, {
					numberInput : function() {
						if ($(this).length == 1) {
							$.numberInput.init($(this));
						} else {
							$(this).numberInputs();

						}
						return this;
					},
					numberInputs : function() {
						$(this).each(function() {
									$(this).numberInput();
								});
						return this;
					}
				});
	}(jQuery));

});