define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';
	require("./resources/tableLoader.css");
	(function($) {
		$.tableLoader = $.tableLoader || {};
		$.extend($.tableLoader, {
			init : function($this, option) {
				$this.removeData("pageNumber")
				this.data = option.data;
				if (this.data.length > 0) {
					this.columns = option.columns;
					if (option.paging) {
						this.pageSize = option.pageSize || 10;
					}
					this.initHTML($this);
					this.initListener();
				}
			},
			initHTML : function($this) {
				var len = this.columns.length, index, $tr = $("<tr/>")
						.appendTo($this), $content, currrentPageStart, currrentPageEnd;
				for (index = 0; index < len; index++) {
					$tr.append("<th>" + this.columns[index].label + "</th>");
				}
				this.$this = $this;
				// 处理分页的显示
				this.loadCurrentPage();
				if (this.pageSize) {
					this.$pageBtns = $("<ul class='pager'>"
							+ "<li><a href='#'>上一页</a></li>"
							+ "<li><a href='#'>下一页</a></li>" + "</ul>")
							.insertAfter(this.$this).css("width",this.$this.css("width"));
				}
			},
			initListener : function() {
				var scope = this;
				function loadPrePage() {
					var pageSize = parseInt((scope.data.length + scope.pageSize - 1)
							/ scope.pageSize)
							- 1;

					if (scope.$this.data("pageNumber")) {
						scope.$this.data("pageNumber", (scope.$this
										.data("pageNumber") - 1));
						scope.loadCurrentPage();
						if (scope.$this.data("pageNumber") == 0) {
							scope.$pageBtns.find("li:first>a")
									.addClass("bp-settings-paper-disabled");
						}
						if (scope.$this.data("pageNumber") != pageSize) {
							scope.$pageBtns.find("li:last>a")
									.removeClass("bp-settings-paper-disabled");
						};
					} else {
						return false;
					}
					scope.$this.trigger("changePage");
					return false;
				}
				function loadNextPage() {
					var pageSize = parseInt((scope.data.length + scope.pageSize - 1)
							/ scope.pageSize)
							- 1;
					if (!scope.$this.data("pageNumber")) {
						scope.$this.data("pageNumber", 0);
					}
					if (scope.$this.data("pageNumber") != pageSize) {
						scope.$this.data("pageNumber", (scope.$this
										.data("pageNumber") + 1));
						scope.loadCurrentPage();
						if (scope.$this.data("pageNumber") == pageSize) {
							scope.$pageBtns.find("li:last>a")
									.addClass("bp-settings-paper-disabled");
						}
						if (scope.$this.data("pageNumber") != 0) {
							scope.$pageBtns.find("li:first>a")
									.removeClass("bp-settings-paper-disabled");
						};
					} else {
						return false;
					}
					scope.$this.trigger("changePage");
					return false;
				}
				var pageSize = parseInt((scope.data.length + scope.pageSize - 1)
						/ scope.pageSize)
						- 1;
				var $lastPage = this.$pageBtns.find("li:first>a")
						.addClass("bp-settings-paper-disabled").on("click",
								loadPrePage).end().find("li:last>a").on(
								"click", loadNextPage);
				if (pageSize == 0) {
					$lastPage.addClass("bp-settings-paper-disabled");
				}
			},
			loadCurrentPage : function() {
				var len = this.columns.length, dataLen = this.data.length, index = 0, pIndex, $content, currrentPageStart, currrentPageEnd, label, cls, loadItem, tdId, $td;
				if (this.pageSize) {
					currrentPageStart = (this.$this.data("pageNumber") || 0)
							* this.pageSize;
					currrentPageEnd = currrentPageStart + this.pageSize;
					currrentPageEnd = currrentPageEnd < dataLen
							? currrentPageEnd
							: dataLen;
				} else {
					currrentPageStart = 0;
					currrentPageEnd = dataLen;
				}
				this.$this.find("tr").not(":first").remove();
				for (index = currrentPageStart; index < currrentPageEnd; index++) {
					if (!this.data[index].remove) {
						$content = $("<tr/>").appendTo(this.$this).data(
								"items", this.data[index]);
						for (pIndex = 0; pIndex < len; pIndex++) {
							loadItem = this.data[index][this.columns[pIndex].dataIndex]
									|| {};
							if (typeof loadItem == "string") {
								$td = $("<td name='"
										+ this.columns[pIndex].name + "' id='"
										+ "bp_setting_infor_table_td"+new Date().toString()
										+ "'>" + loadItem + "</td>")
										.appendTo($content)
							} else {

								label = loadItem.infor;
								data = loadItem.data;
								cls = this.columns[pIndex].cls;
								tdId = loadItem.id
										|| "bp_setting_infor_table_td"+ new Date().toString();
								$td = $("<td name='"
										+ this.columns[pIndex].name
										+ "' id='"
										+ tdId
										+ "'>"
										+ "<a "
										+ (label ? "data-content='" + label
												+ "'" : "")
										+ (cls ? "class='" + cls + "'" : "")
										+ ">"
										+ (this.data[index][this.columns[pIndex].dataIndex]
												? this.data[index][this.columns[pIndex].dataIndex].label
												: "") + "</a>" + "</td>")
										.appendTo($content).data("loadItem",
												loadItem);
								if (data) {
									$td.data("data", data);
								}
							}
						}
					}
				}
				this.$this.find("td>a").popover({
							html : true,
							trigger : "hover",
							placement : "right"
						}).on("shown.bs.popover", function() {
							$(this).next(".popover").css({
										maxWidth : "800px"
									})
						});
			},
			destroy : function() {
				return $(this).next("ul.pager").find("li>a").unbind().end()
						.remove().end().empty();
			}
		});
		$.extend($.fn, {
					tableLoader : function(option) {
						if (option && typeof option =="string") {
							var methodStr = option, method = $.tableLoader[methodStr];
							if (method && $.isFunction(method)) {
								option = arguments[1];
								return method.call(this, option);
							}
						}
						$.tableLoader.init($(this), option);
						return this;
					}
				});
	}(jQuery));
});