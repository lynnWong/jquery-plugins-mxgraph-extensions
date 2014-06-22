define(function(require, exports, module) {
	require("./../plugins/number/number");
	require("./../plugins/zoomPanel/zoomPanel");
	require("./../plugins/tableLoader/tableLoader");
	require("./../extensions/mxgraph/extensions");

	var UI = {};
	UI.run = function() {
		this.initListener();
		this.initPlugins();
	}
	UI.initListener = function() {
		var navNames = ['welcome', 'document', 'download'], containerNames = [
				"plugins", "extensions", "tools"];
		$("div.modal-btn").hover(function() {
			$("div#welecom_carousel>ol.carousel-indicators>li:eq("
					+ $(this).attr("for") + ")").click();
		}).on("click", function() {
			$("div.welcome").hide();
			$("div.container." + containerNames[$(this).attr("for")])
					.removeClass("hide").show();
		});
		$(".navbar-header a").on("click", function() {
					$("div.container+.container").hide();
					$("div.welcome").removeClass("hide").show();
					$("ul.navbar-nav li").removeClass("active");
					$("ul.navbar-nav li:first").addClass("active");
				});
		$("ul.navbar-nav a").on("click", function() {
					$(this).parents("div").nextAll("div.container").hide();
					$($(this).attr("href")).removeClass("hide").show();
					$("ul.navbar-nav li").removeClass("active");
					$(this).parent().addClass("active");
				});
	}
	UI.initPlugins = function() {
		new PluginUI({
					$container : $("div.container.plugins"),
					title : "数字输入插件",
					description : "用于输入数字的插件，能够校验数字的大小，给定数字最小值、最大值，增减幅度",
					code : "$(\"input[type='number']\").numberInput();",
					example : "<input type='number' min=2 max=10 step=2 />",
					doCode : function() {
						$("input[type='number']").css({
									width : "50%"
								}).addClass("form-control").numberInput();
					}
				});
		new PluginUI({
			$container : $("div.container.plugins"),
			title : "缩放预览工具",
			description : "用于显示缩放工具栏，在工具栏中可调节并显示缩放比例，可缩放预览图",
			code : '$("#zoom").zoomPanel({'
					+ "<br>"
					+ '	scale : 1,'
					+ "<br>"
					+ '	html:"显示图片的img节点",'
					+ "<br>"
					+ '	zoomChange : function(scale){'
					+ "<br>"
					+ '	    var $img = $("#example-zoomPanel img.example-show-img");'
					+ "<br>" + '	    var width = 180*scale;' + "<br>"
					+ '	    var height = 100*scale;' + "<br>"
					+ '	    $img.css({' + "<br>" + '			width:width,' + "<br>"
					+ '			height:height' + "<br>" + '		});' + "<br>" + '	}'
					+ "<br>" + '});',
			example : "<div id='example-zoomPanel'><div id='zoom'></div><div class='graph-outside'><img class='example-show-img' src='resources/extensions.png' style='width:180px;height:100px;'/></div></div>",
			doCode : function() {
				$("#zoom").zoomPanel({
					scale : 1,
					html : "<img src='resources/extensions.png' style='width:180px;height:100px;'/>",
					zoomChange : function(scale) {
						var $img = $("#example-zoomPanel img.example-show-img");
						var width = 180 * scale;
						var height = 100 * scale;
						$img.css({
									width : width,
									height : height
								});
					}
				});
			}
		});
		new PluginUI({
			$container : $("div.container.plugins"),
			title : "表格加载工具",
			description : "对前端数据进行的表格形式的加载，自动分页",
			code : '$("#example-tableLoader>table").tableLoader({' + "<br>"
					+ '		data : [{name:"西瓜",type:"水果",msg:"边看恐怖片边吃"},' + "<br>"
					+ '			{name:"德普",type:"帅哥",msg:"歪国著名奇葩"},' + "<br>"
					+ '			{name:"程序猿",type:"不明",msg:"只想呵呵了"},' + "<br>"
					+ '			{name:"程序猿",type:"吃货",msg:"对 他们是吃货"},' + "<br>"
					+ '			{name:"凑数的1",type:"吃货",msg:"凑数的能干什么呢"},' + "<br>"
					+ '			{name:"凑数的2",type:"吃货",msg:"凑数的能干什么呢"},' + "<br>"
					+ '			{name:"凑数的3",type:"吃货",msg:"凑数的能干什么呢"},' + "<br>"
					+ '			{name:"凑数的4",type:"吃货",msg:"凑数的能干什么呢"}],' + "<br>"
					+ '		paging : true,' + "<br>" + '		pageSize : 3,' + "<br>"
					+ '		columns : [{' + "<br>" + '			label : "名称",' + "<br>"
					+ '			name : "name",' + "<br>" + '			dataIndex : "name"'
					+ "<br>" + '		}, {' + "<br>" + '			label : "种族",' + "<br>"
					+ '			name : "type",' + "<br>" + '			dataIndex : "type"'
					+ "<br>" + '		}, {' + "<br>" + '			label : "信息",' + "<br>"
					+ '			name : "msg",' + "<br>" + '			dataIndex : "msg"'
					+ "<br>" + '		}]' + "<br>" + '	});',
			example : "<div id='example-tableLoader'><table class='table' style='width:50%;'></table></div>",
			doCode : function() {
				$("#example-tableLoader>table").tableLoader({
							data : [{
										name : "西瓜",
										type : "水果",
										msg : "边看恐怖片边吃"
									}, {
										name : "德普",
										type : "帅哥",
										msg : "歪国著名奇葩"
									}, {
										name : "程序猿",
										type : "不明",
										msg : "只想呵呵了"
									}, {
										name : "程序猿",
										type : "吃货",
										msg : "对 他们是吃货"
									}, {
										name : "凑数的1",
										type : "吃货",
										msg : "凑数的能干什么呢"
									}, {
										name : "凑数的2",
										type : "吃货",
										msg : "凑数的能干什么呢"
									}, {
										name : "凑数的3",
										type : "吃货",
										msg : "凑数的能干什么呢"
									}, {
										name : "凑数的4",
										type : "吃货",
										msg : "凑数的能干什么呢"
									}],
							paging : true,
							pageSize : 3,
							columns : [{
										label : "名称",
										name : "name",
										dataIndex : "name"
									}, {
										label : "种族",
										name : "type",
										dataIndex : "type"
									}, {
										label : "信息",
										name : "msg",
										dataIndex : "msg"
									}]
						});
			}
		});
		new PluginUI({
					$container : $("div.container.extensions"),
					title : "边界节点",
					description : "用于将节点放在其他节点的边上",
					code : "var graph = new mxGraph($(\"#graph-example\").get(0));"+"<br>"+
                        "var parent = graph.insertVertex(graph"+
                          ".getDefaultParent(), null,"+
                         "'父节点', 20, 20, 100, 60, 'boxstyle');"+"<br>"+
                        "var sideNode = graph.insertVertex(graph"+
                                 ".getDefaultParent(), null,"+
                                "'边节点', 70, 100, 40, 40, 'fillColor=pink;shape='+mxConstants.SHAPE_ELLIPSE);"+"<br>"+
                        "graph.insertSideNode(sideNode, parent);",
					example : "<div id='graph-example' style='height:200px;'/>",
					doCode : function() {
						var graph = new mxGraph($("#graph-example").get(0));
						var parent = graph.insertVertex(graph
										.getDefaultParent(), null,
								'父节点', 20, 20, 100, 60, 'boxstyle');
						var sideNode = graph.insertVertex(graph
										.getDefaultParent(), null,
								'边节点', 70, 100, 40, 40, 'fillColor=pink;shape='+mxConstants.SHAPE_ELLIPSE);
						graph.insertSideNode(sideNode, parent);
					}
				});
	}
	function PluginUI(option) {
		this.option = option || {};
		this.initUI();
		this.initListener();
	}
	PluginUI.prototype.initUI = function() {
		this.option.$container
				.append("<h3>" + this.option.title + "</h3>")
				.append("<p>" + this.option.description + "</p>")
				.append("<div class='highlight'><label>html</label><pre><code class='language-html ruby'></code></pre></div>")
				.find("code.language-html:last")
				.text(this.option.example)
				.end()
				.append("<div class='highlight'><label>javascript</label><pre><code class='language-js ruby'>"
						+ this.option.code + "</code></pre></div>")
				.append("<label>案例</lable>").append("<div class='bs-example'>"
						+ this.option.example + "</div>");
		if (typeof this.option.doCode == "function") {
			this.option.doCode();
		}
	}
	PluginUI.prototype.initListener = function() {

	}
	module.exports = UI;
});