/**
 * 锚点形状注册
 */
mxLoadResources = false;// mxClient需要引入的全局变量
mxBasePath = "../jquery-plugins-mxgraph-extensions/lib/mxgraph/";
define(function(require, exports, module) {
	require("./sideNodeExtension");
	// Cube Shape, supports size style
	function CubeShape() {
	};
	CubeShape.prototype = new mxCylinder();
	CubeShape.prototype.constructor = CubeShape;
	CubeShape.prototype.size = 20;
	CubeShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		var s = Math.min(w, Math.min(h, mxUtils.getValue(this.style, 'size',
								this.size)
								* this.scale));

		if (isForeground) {
			path.moveTo(s, h);
			path.lineTo(s, s);
			path.lineTo(0, 0);
			path.moveTo(s, s);
			path.lineTo(w, s);
			path.end();
		} else {
			path.moveTo(0, 0);
			path.lineTo(w - s, 0);
			path.lineTo(w, s);
			path.lineTo(w, h);
			path.lineTo(s, h);
			path.lineTo(0, h - s);
			path.lineTo(0, 0);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.prototype.defaultShapes['cube'] = CubeShape;

	// Note Shape, supports size style
	function NoteShape() {
	};
	NoteShape.prototype = new mxCylinder();
	NoteShape.prototype.constructor = NoteShape;
	NoteShape.prototype.size = 30;
	NoteShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		var s = Math.min(w, Math.min(h, mxUtils.getValue(this.style, 'size',
								this.size)
								* this.scale));

		if (isForeground) {
			path.moveTo(w - s, 0);
			path.lineTo(w - s, s);
			path.lineTo(w, s);
			path.end();
		} else {
			path.moveTo(0, 0);
			path.lineTo(w - s, 0);
			path.lineTo(w, s);
			path.lineTo(w, h);
			path.lineTo(0, h);
			path.lineTo(0, 0);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.prototype.defaultShapes['note'] = NoteShape;

	// Folder Shape, supports tabWidth, tabHeight styles
	function FolderShape() {
	};
	FolderShape.prototype = new mxCylinder();
	FolderShape.prototype.constructor = FolderShape;
	FolderShape.prototype.tabWidth = 60;
	FolderShape.prototype.tabHeight = 20;
	FolderShape.prototype.tabPosition = 'right';
	FolderShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		var tw = mxUtils.getValue(this.style, 'tabWidth', this.tabWidth);
		var th = mxUtils.getValue(this.style, 'tabHeight', this.tabHeight);
		var tp = mxUtils.getValue(this.style, 'tabPosition', this.tabPosition);
		var dx = Math.min(w, tw * this.scale);
		var dy = Math.min(h, th * this.scale);

		if (isForeground) {
			if (tp == 'left') {
				path.moveTo(0, dy);
				path.lineTo(dx, dy);
			}
			// Right is default
			else {
				path.moveTo(w - dx, dy);
				path.lineTo(w, dy);
			}

			path.end();
		} else {
			if (tp == 'left') {
				path.moveTo(0, 0);
				path.lineTo(dx, 0);
				path.lineTo(dx, dy);
				path.lineTo(w, dy);
			}
			// Right is default
			else {
				path.moveTo(0, dy);
				path.lineTo(w - dx, dy);
				path.lineTo(w - dx, 0);
				path.lineTo(w, 0);
			}

			path.lineTo(w, h);
			path.lineTo(0, h);
			path.lineTo(0, dy);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.prototype.defaultShapes['folder'] = FolderShape;

	// Card Shape, supports size style
	function CardShape() {
	};
	CardShape.prototype = new mxCylinder();
	CardShape.prototype.constructor = CardShape;
	CardShape.prototype.size = 30;
	CardShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		var s = Math.min(w, Math.min(h, mxUtils.getValue(this.style, 'size',
								this.size)
								* this.scale));

		if (!isForeground) {
			path.moveTo(s, 0);
			path.lineTo(w, 0);
			path.lineTo(w, h);
			path.lineTo(0, h);
			path.lineTo(0, s);
			path.lineTo(s, 0);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.prototype.defaultShapes['card'] = CardShape;

	// Tape Shape, supports size style
	function TapeShape() {
	};
	TapeShape.prototype = new mxCylinder();
	TapeShape.prototype.constructor = TapeShape;
	TapeShape.prototype.size = 0.4;
	TapeShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		var s = mxUtils.getValue(this.style, 'size', this.size);
		var dy = h * s;
		var fy = 1.4;

		if (!isForeground) {
			path.moveTo(0, dy / 2);
			path.quadTo(w / 4, dy * fy, w / 2, dy / 2);
			path.quadTo(w * 3 / 4, dy * (1 - fy), w, dy / 2);
			path.lineTo(w, h - dy / 2);
			path.quadTo(w * 3 / 4, h - dy * fy, w / 2, h - dy / 2);
			path.quadTo(w / 4, h - dy * (1 - fy), 0, h - dy / 2);
			path.lineTo(0, dy / 2);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.prototype.defaultShapes['tape'] = TapeShape;

	// Tape Shape, supports size style
	function StepShape() {
	};
	StepShape.prototype = new mxCylinder();
	StepShape.prototype.constructor = StepShape;
	StepShape.prototype.size = 0.2;
	StepShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		var s = w * mxUtils.getValue(this.style, 'size', this.size);

		if (!isForeground) {
			path.moveTo(0, 0);
			path.lineTo(w - s, 0);
			path.lineTo(w, h / 2);
			path.lineTo(w - s, h);
			path.lineTo(0, h);
			path.lineTo(s, h / 2);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.prototype.defaultShapes['step'] = StepShape;

	// Tape Shape, supports size style
	function PlusShape() {
	};
	PlusShape.prototype = new mxCylinder();
	PlusShape.prototype.constructor = PlusShape;
	PlusShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		var border = Math.min(w / 5, h / 5) + 1;

		if (isForeground) {
			path.moveTo(w / 2, border);
			path.lineTo(w / 2, h - border);
			path.moveTo(border, h / 2);
			path.lineTo(w - border, h / 2);
			path.end();
		} else {
			path.moveTo(0, 0);
			path.lineTo(w, 0);
			path.lineTo(w, h);
			path.lineTo(0, h);
			path.close();
		}
	};

	mxCellRenderer.prototype.defaultShapes['plus'] = PlusShape;

	// Tape Shape, supports size style
	function MessageShape() {
	};
	MessageShape.prototype = new mxCylinder();
	MessageShape.prototype.constructor = MessageShape;
	MessageShape.prototype.redrawPath = function(path, x, y, w, h, isForeground) {
		if (isForeground) {
			path.moveTo(0, 0);
			path.lineTo(w / 2, h / 2);
			path.lineTo(w, 0);
			path.end();
		} else {
			path.moveTo(0, 0);
			path.lineTo(w, 0);
			path.lineTo(w, h);
			path.lineTo(0, h);
			path.close();
		}
	};

	mxCellRenderer.prototype.defaultShapes['message'] = MessageShape;

	// New Actor Shape
	function UmlActorShape() {
	};
	UmlActorShape.prototype = new mxCylinder();
	UmlActorShape.prototype.constructor = UmlActorShape;
	UmlActorShape.prototype.addPipe = true;
	UmlActorShape.prototype.redrawPath = function(path, x, y, w, h,
			isForeground) {
		var width = w / 3;
		var height = h / 4;

		if (!isForeground) {
			path.moveTo(w / 2, height);
			path.curveTo(w / 2 - width, height, w / 2 - width, 0, w / 2, 0);
			path
					.curveTo(w / 2 + width, 0, w / 2 + width, height, w / 2,
							height);
			path.close();

			path.moveTo(w / 2, height);
			path.lineTo(w / 2, 2 * h / 3);

			// Arms
			path.moveTo(w / 2, h / 3);
			path.lineTo(0, h / 3);
			path.moveTo(w / 2, h / 3);
			path.lineTo(w, h / 3);

			// Legs
			path.moveTo(w / 2, 2 * h / 3);
			path.lineTo(0, h);
			path.moveTo(w / 2, 2 * h / 3);
			path.lineTo(w, h);
			path.end();
		}
	};

	// Replaces existing actor shape
	mxCellRenderer.prototype.defaultShapes['umlActor'] = UmlActorShape;

	// New Actor Shape
	function LollipopShape() {
	};
	LollipopShape.prototype = new mxCylinder();
	LollipopShape.prototype.constructor = LollipopShape;
	LollipopShape.prototype.size = 10;
	LollipopShape.prototype.addPipe = true;
	LollipopShape.prototype.redrawPath = function(path, x, y, w, h,
			isForeground) {
		var ss = this.scale * mxUtils.getValue(this.style, 'size', this.size);
		var width = ss * 2 / 3;
		var height = ss;

		if (!isForeground) {
			path.moveTo(w / 2, height);
			path.curveTo(w / 2 - width, height, w / 2 - width, 0, w / 2, 0);
			path
					.curveTo(w / 2 + width, 0, w / 2 + width, height, w / 2,
							height);
			path.close();

			path.moveTo(w / 2, height);
			path.lineTo(w / 2, h);
			path.end();
		}
	};

	// Replaces existing actor shape
	mxCellRenderer.prototype.defaultShapes['lollipop'] = LollipopShape;

	// Folder Shape, supports tabWidth, tabHeight styles
	function ComponentShape() {
	};
	ComponentShape.prototype = new mxCylinder();
	ComponentShape.prototype.constructor = ComponentShape;
	ComponentShape.prototype.jettyWidth = 32;
	ComponentShape.prototype.jettyHeight = 12;
	ComponentShape.prototype.redrawPath = function(path, x, y, w, h,
			isForeground) {
		var jw = mxUtils.getValue(this.style, 'jettyWidth', this.jettyWidth);
		var jh = mxUtils.getValue(this.style, 'jettyHeight', this.jettyHeight);
		var dx = jw * this.scale;
		var dy = jh * this.scale;
		var x0 = dx / 2;
		var x1 = x0 + dx / 2;
		var y0 = 0.3 * h - dy / 2;
		var y1 = 0.7 * h - dy / 2;

		if (isForeground) {
			path.moveTo(x0, y0);
			path.lineTo(x1, y0);
			path.lineTo(x1, y0 + dy);
			path.lineTo(x0, y0 + dy);
			path.moveTo(x0, y1);
			path.lineTo(x1, y1);
			path.lineTo(x1, y1 + dy);
			path.lineTo(x0, y1 + dy);
			path.end();
		} else {
			path.moveTo(x0, 0);
			path.lineTo(w, 0);
			path.lineTo(w, h);
			path.lineTo(x0, h);
			path.lineTo(x0, y1 + dy);
			path.lineTo(0, y1 + dy);
			path.lineTo(0, y1);
			path.lineTo(x0, y1);
			path.lineTo(x0, y0 + dy);
			path.lineTo(0, y0 + dy);
			path.lineTo(0, y0);
			path.lineTo(x0, y0);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.prototype.defaultShapes['component'] = ComponentShape;

	// State Shapes derives from double ellipse
	function StateShape() {
	};
	StateShape.prototype = new mxDoubleEllipse();
	StateShape.prototype.constructor = StateShape;
	StateShape.prototype.outerStroke = true;
	StateShape.prototype.createSvg = function() {
		var g = mxDoubleEllipse.prototype.createSvg.apply(this, arguments);
		this.foreground.setAttribute('fill', this.innerNode
						.getAttribute('fill'));
		this.foreground.setAttribute('stroke', this.stroke);
		this.innerNode.setAttribute('fill', 'none');
		this.innerNode.setAttribute('stroke', (this.outerStroke)
						? this.stroke
						: 'none');

		return g;
	};
	StateShape.prototype.redrawSvg = function() {
		mxDoubleEllipse.prototype.redrawSvg.apply(this, arguments);

		// Workaround for visible background
		this.innerNode.setAttribute('fill', 'none');

		if (this.shadowNode != null) {
			this.shadowNode.setAttribute('cx', this.foreground
							.getAttribute('cx'));
			this.shadowNode.setAttribute('cy', this.foreground
							.getAttribute('cy'));
			this.shadowNode.setAttribute('rx', this.foreground
							.getAttribute('rx'));
			this.shadowNode.setAttribute('ry', this.foreground
							.getAttribute('ry'));
		}
	};
	StateShape.prototype.createVml = function() {
		var result = mxDoubleEllipse.prototype.createVml.apply(this, arguments);

		if (this.fillNode != null) {
			this.foreground.appendChild(this.fillNode);
			this.foreground.filled = 'true';
		}

		this.background.filled = 'false';
		this.background.stroked = (this.outerStroke) ? 'true' : 'false';

		if (this.shadowNode != null) {
			this.foreground.appendChild(this.shadowNode);
		}

		return result;
	};
	StateShape.prototype.reconfigure = function() {
		mxShape.prototype.reconfigure.apply(this, arguments);

		if (this.dialect == mxConstants.DIALECT_SVG) {
			this.innerNode.setAttribute('fill', 'none');
		} else if (mxUtils.isVml(this.node)) {
			this.background.filled = 'false';
		}
	};

	mxCellRenderer.prototype.defaultShapes['endState'] = StateShape;

	function StartStateShape() {
	};
	StartStateShape.prototype = new StateShape();
	StartStateShape.prototype.constructor = StartStateShape;
	StartStateShape.prototype.outerStroke = false;

	mxCellRenderer.prototype.defaultShapes['startState'] = StartStateShape;

	// Image export for state shapes
	var imageExportInitShapes = mxImageExport.prototype.initShapes;
	mxImageExport.prototype.initShapes = function() {
		imageExportInitShapes.apply(this, arguments);

		function createStateShape(outerStroke) {
			return {
				drawShape : function(canvas, state, bounds, background) {
					var x = bounds.x;
					var y = bounds.y;
					var w = bounds.width;
					var h = bounds.height;

					if (background) {
						var inset = Math.min(4, Math.min(w / 5, h / 5));
						x += inset;
						y += inset;
						w -= 2 * inset;
						h -= 2 * inset;

						if (w > 0 && h > 0) {
							canvas.ellipse(x, y, w, h);
						}

						return true;
					} else {
						canvas.fillAndStroke();

						if (outerStroke) {
							canvas.ellipse(x, y, w, h);
							canvas.stroke();
						}
					}
				}
			};
		};

		this.shapes['endState'] = createStateShape(true);
		this.shapes['startState'] = createStateShape(false);
	};

	// Custom edge shape
	function LinkShape() {
	};
	LinkShape.prototype = new mxArrow();
	LinkShape.prototype.constructor = LinkShape;
	LinkShape.prototype.enableFill = false;
	LinkShape.prototype.addPipe = true;

	LinkShape.prototype.augmentBoundingBox = function(bbox) {
		bbox.grow(10 * this.scale);

		mxShape.prototype.augmentBoundingBox.apply(this, arguments);
	};

	LinkShape.prototype.redrawPath = function(path, x, y, w, h) {
		// All points are offset
		path.translate.x -= x;
		path.translate.y -= y;

		// Geometry of arrow
		var width = 10 * this.scale;

		// Base vector (between end points)
		var p0 = this.points[0];
		var pe = this.points[this.points.length - 1];

		var dx = pe.x - p0.x;
		var dy = pe.y - p0.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		var length = dist;

		// Computes the norm and the inverse norm
		var nx = dx / dist;
		var ny = dy / dist;
		var basex = length * nx;
		var basey = length * ny;
		var floorx = width * ny / 3;
		var floory = -width * nx / 3;

		// Computes points
		var p0x = p0.x - floorx / 2;
		var p0y = p0.y - floory / 2;
		var p1x = p0x + floorx;
		var p1y = p0y + floory;
		var p2x = p1x + basex;
		var p2y = p1y + basey;
		var p3x = p2x + floorx;
		var p3y = p2y + floory;
		// p4 not needed
		var p5x = p3x - 3 * floorx;
		var p5y = p3y - 3 * floory;

		// LATER: Add support for n points
		path.moveTo(p1x, p1y);
		path.lineTo(p2x, p2y);
		path.moveTo(p5x + floorx, p5y + floory);
		path.lineTo(p0x, p0y);
		path.end();
	};

	mxCellRenderer.prototype.defaultShapes['link'] = LinkShape;

	// Defines custom marker
	mxMarker.markers['dash'] = function a(a, node, type, pe, nx, ny,
			strokewidth, size, scale, isVml) {
		nx = nx * (size + strokewidth);
		ny = ny * (size + strokewidth);

		if (isVml) {
			node.node.setAttribute('path', 'm'
							+ Math.floor(pe.x - nx / 2 - ny / 2) + ' '
							+ Math.floor(pe.y - ny / 2 + nx / 2) + ' l '
							+ Math.floor(pe.x + ny / 2 - 3 * nx / 2) + ' '
							+ Math.floor(pe.y - 3 * ny / 2 - nx / 2) + ' e');
		} else {
			node.node.setAttribute('d', 'M ' + (pe.x - nx / 2 - ny / 2) + ' '
							+ (pe.y - ny / 2 + nx / 2) + ' L '
							+ (pe.x + ny / 2 - 3 * nx / 2) + ' '
							+ (pe.y - 3 * ny / 2 - nx / 2) + ' z');
		}

		// Returns the offset for the edge
		return function() {
			nx = nx * (size + 0.5);
			ny = ny * (size + 0.5);

			a.begin();
			a.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
			a.lineTo(pe.x + ny / 2 - 3 * nx / 2, pe.y - 3 * ny / 2 - nx / 2);
			a.stroke();

			// Returns the offset for the edge
			return new mxPoint(0, 0);
		};
	};

	// Registers the marker in mxImageExport
	var mxImageExportInitMarkers = mxImageExport.prototype.initMarkers;
	mxImageExport.prototype.initMarkers = function() {
		mxImageExportInitMarkers.apply(this, arguments);

		this.markers['dash'] = function(canvas, state, type, pe, unitX, unitY,
				size, source, sw) {
			nx = unitX * (size + sw);
			ny = unitY * (size + sw);

			canvas.begin();
			canvas.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
			canvas.lineTo(pe.x + ny / 2 - 3 * nx / 2, pe.y - 3 * ny / 2 - nx
							/ 2);
			canvas.stroke();

			// Returns the offset for the edge
			return new mxPoint(0, 0);
		};
	};
	mxConstants.ARROW_DASH = "dash";
	// Enables crisp rendering in SVG except for connectors, actors, cylinder,
	// ellipses must be enabled after rendering the sidebar items
	mxShape.prototype.crisp = true;
	mxShape.prototype.roundedCrispSvg = false;
	mxActor.prototype.crisp = false;
	mxCylinder.prototype.crisp = false;
	mxEllipse.prototype.crisp = false;
	mxDoubleEllipse.prototype.crisp = false;
	mxConnector.prototype.crisp = false;
	FolderShape.prototype.crisp = true;
	ComponentShape.prototype.crisp = true;

	// Implements custom handlers
	var SPECIAL_HANDLE_INDEX = -99;

	// Handlers are only added if mxVertexHandler is defined (ie. not in
	// embedded graph)
	if (typeof(mxVertexHandler) != 'undefined') {
		// Swimlane handler
		function mxSwimlaneHandler(state) {
			mxVertexHandler.call(this, state);
		};

		mxUtils.extend(mxSwimlaneHandler, mxVertexHandler);

		mxSwimlaneHandler.prototype.useGridForSpecialHandle = false;

		mxSwimlaneHandler.prototype.init = function() {
			this.horizontal = mxUtils.getValue(this.state.style,
					mxConstants.STYLE_HORIZONTAL, true);
			var graph = this.state.view.graph;

			if (this.handleImage != null) {
				var bounds = new mxRectangle(0, 0, this.handleImage.width,
						this.handleImage.height);
				this.specialHandle = new mxImageShape(bounds,
						this.handleImage.src);
			} else {
				var size = 10;
				var bounds = new mxRectangle(0, 0, size, size);
				this.specialHandle = new mxRhombus(bounds,
						mxConstants.HANDLE_FILLCOLOR,
						mxConstants.HANDLE_STROKECOLOR);
				this.specialHandle.crisp = this.crisp;
			}

			this.specialHandle.dialect = (graph.dialect != mxConstants.DIALECT_SVG)
					? mxConstants.DIALECT_VML
					: mxConstants.DIALECT_SVG;
			this.specialHandle.init(graph.getView().getOverlayPane());
			this.specialHandle.node.style.cursor = this
					.getSpecialHandleCursor();

			mxEvent.redirectMouseEvents(this.specialHandle.node, graph,
					this.state);
			mxVertexHandler.prototype.init.apply(this, arguments);
		};

		mxSwimlaneHandler.prototype.getSpecialHandleCursor = function() {
			return (this.horizontal) ? 'n-resize' : 'w-resize';
		};

		mxSwimlaneHandler.prototype.redraw = function() {
			mxVertexHandler.prototype.redraw.apply(this, arguments);

			var size = this.specialHandle.bounds.width;
			this.specialHandle.bounds = this.getSpecialHandleBounds(size);
			this.specialHandle.redraw();
		};

		mxSwimlaneHandler.prototype.getSpecialHandleBounds = function(size) {
			var scale = this.graph.getView().scale;
			var start = this.state.view.graph.getStartSize(this.state.cell);

			if (this.horizontal) {
				return new mxRectangle(this.state.x + (this.state.width - size)
								/ 2, this.state.y + start.height * scale - size
								/ 2, size, size);
			} else {
				return new mxRectangle(this.state.x + start.width * scale
								- size / 2, this.state.y
								+ (this.state.height - size) / 2, size, size);
			}
		};

		mxSwimlaneHandler.prototype.destroy = function() {
			mxVertexHandler.prototype.destroy.apply(this, arguments);

			if (this.specialHandle != null) {
				this.specialHandle.destroy();
				this.specialHandle = null;
			}
		};

		mxSwimlaneHandler.prototype.getHandleForEvent = function(me) {
			if (me.isSource(this.specialHandle)) {
				return SPECIAL_HANDLE_INDEX;
			}

			return mxVertexHandler.prototype.getHandleForEvent.apply(this,
					arguments);
		};

		mxSwimlaneHandler.prototype.constrainPoint = function(point) {
			point.x = Math.max(this.state.x, Math.min(this.state.x
									+ this.state.width, point.x));
			point.y = Math.max(this.state.y, Math.min(this.state.y
									+ this.state.height, point.y));
		};

		mxSwimlaneHandler.prototype.mouseMove = function(sender, me) {
			if (!me.isConsumed() && this.index == SPECIAL_HANDLE_INDEX) {
				var point = new mxPoint(me.getGraphX(), me.getGraphY());
				this.constrainPoint(point);
				var gridEnabled = this.graph.isGridEnabledEvent(me.getEvent());
				var scale = this.graph.getView().scale;

				if (gridEnabled && this.useGridForSpecialHandle) {
					point.x = this.graph.snap(point.x / scale) * scale;
					point.y = this.graph.snap(point.y / scale) * scale;
				}

				this.updateStyle(point);
				this.moveSizerTo(this.specialHandle, point.x, point.y);
				this.state.view.graph.cellRenderer.redraw(this.state, true);
				me.consume();
			} else {
				mxVertexHandler.prototype.mouseMove.apply(this, arguments);
			}
		};

		mxSwimlaneHandler.prototype.updateStyle = function(point) {
			var startSize = 0;

			if (this.horizontal) {
				point.x = this.state.x + this.state.width / 2;
				startSize = point.y - this.state.y;
			} else {
				point.y = this.state.y + this.state.height / 2;
				startSize = point.x - this.state.x;
			}

			var scale = this.graph.getView().scale;
			this.state.style['startSize'] = Math.round(Math.max(1, startSize)
					/ scale);
		};

		mxSwimlaneHandler.prototype.mouseUp = function(sender, me) {
			if (!me.isConsumed() && this.index == SPECIAL_HANDLE_INDEX) {
				this.applyStyle();
				this.reset();
				me.consume();
			} else {
				mxVertexHandler.prototype.mouseUp.apply(this, arguments);
			}
		};

		mxSwimlaneHandler.prototype.applyStyle = function() {
			this.state.view.graph.setCellStyles('startSize',
					this.state.style['startSize'], [this.state.cell]);
		};

		// Folder Handler
		function mxFolderHandler(state) {
			mxSwimlaneHandler.call(this, state);
		};

		mxUtils.extend(mxFolderHandler, mxSwimlaneHandler);

		mxFolderHandler.prototype.getSpecialHandleCursor = function() {
			return 'default';
		};

		mxFolderHandler.prototype.getSpecialHandleBounds = function(size) {
			var rotation = Number(this.state.style[mxConstants.STYLE_ROTATION]
					|| '0');
			var direction = mxUtils.getValue(this.state.style, 'direction',
					'east');

			if (direction != null) {
				if (direction == 'north') {
					rotation += 270;
				} else if (direction == 'west') {
					rotation += 180;
				} else if (direction == 'south') {
					rotation += 90;
				}
			}

			var alpha = mxUtils.toRadians(rotation);
			var cos = Math.cos(alpha);
			var sin = Math.sin(alpha);

			var bounds = new mxRectangle(this.state.x, this.state.y,
					this.state.width, this.state.height);

			if (direction == 'south' || direction == 'north') {
				bounds.x += (bounds.width - bounds.height) / 2;
				bounds.y += (bounds.height - bounds.width) / 2;
				var tmp = bounds.width;
				bounds.width = bounds.height;
				bounds.height = tmp;
			}

			var pt = this.getSpecialHandlePoint(bounds);
			pt = mxUtils.getRotatedPoint(pt, cos, sin, new mxPoint(this.state
									.getCenterX(), this.state.getCenterY()));

			return new mxRectangle(pt.x - size / 2, pt.y - size / 2, size, size);
		};

		mxFolderHandler.prototype.getSpecialHandlePoint = function(bounds) {
			var scale = this.graph.getView().scale;
			var tw = Math.min(bounds.width, mxUtils.getValue(this.state.style,
							'tabWidth', 60)
							* scale);
			var th = Math.min(bounds.height, mxUtils.getValue(this.state.style,
							'tabHeight', 20)
							* scale);

			var tp = mxUtils.getValue(this.state.style, 'tabPosition', 'right');
			var x = (tp == 'left') ? bounds.x + tw : bounds.x + bounds.width
					- tw;

			return new mxPoint(x, bounds.y + th);
		};

		mxFolderHandler.prototype.updateStyle = function(point) {
			var direction = mxUtils.getValue(this.state.style, 'direction',
					'east');
			var rotation = Number(this.state.style[mxConstants.STYLE_ROTATION]
					|| '0');

			if (direction != null) {
				if (direction == 'north') {
					rotation += 270;
				} else if (direction == 'west') {
					rotation += 180;
				} else if (direction == 'south') {
					rotation += 90;
				}
			}

			var alpha = mxUtils.toRadians(rotation);
			var cos = Math.cos(-alpha);
			var sin = Math.sin(-alpha);

			var bounds = new mxRectangle(this.state.x, this.state.y,
					this.state.width, this.state.height);

			if (direction == 'south' || direction == 'north') {
				bounds.x += (bounds.width - bounds.height) / 2;
				bounds.y += (bounds.height - bounds.width) / 2;
				var tmp = bounds.width;
				bounds.width = bounds.height;
				bounds.height = tmp;
			}

			var pt = new mxPoint(point.x, point.y);
			pt = mxUtils.getRotatedPoint(pt, cos, sin, new mxPoint(this.state
									.getCenterX(), this.state.getCenterY()));

			var result = this.updateStyleUnrotated(pt, bounds);

			// Modifies point to use rotated coordinates of return value
			if (result != null) {
				cos = Math.cos(alpha);
				sin = Math.sin(alpha);
				result = mxUtils.getRotatedPoint(result, cos, sin, new mxPoint(
								this.state.getCenterX(), this.state
										.getCenterY()));
				point.x = result.x;
				point.y = result.y;
			}
		};

		mxFolderHandler.prototype.updateStyleUnrotated = function(pt, bounds) {
			var tp = mxUtils.getValue(this.state.style, 'tabPosition', 'right');
			var tw = (tp == 'left') ? pt.x - bounds.x : bounds.x + bounds.width
					- pt.x;
			var th = pt.y - bounds.y;

			var scale = this.graph.getView().scale;
			this.state.style.tabWidth = Math.round(Math.max(1, tw) / scale);
			this.state.style.tabHeight = Math.round(Math.max(1, th) / scale);
		};

		mxFolderHandler.prototype.applyStyle = function() {
			var model = this.graph.getModel();
			model.beginUpdate();
			try {
				this.state.view.graph.setCellStyles('tabWidth',
						this.state.style.tabWidth, [this.state.cell]);
				this.state.view.graph.setCellStyles('tabHeight',
						this.state.style.tabHeight, [this.state.cell]);
			} finally {
				model.endUpdate();
			}
		};

		// Cube Handler
		function mxCubeHandler(state) {
			mxFolderHandler.call(this, state);
		};

		mxUtils.extend(mxCubeHandler, mxFolderHandler);

		mxCubeHandler.prototype.defaultValue = 20;

		mxCubeHandler.prototype.scaleFactor = 1;

		mxCubeHandler.prototype.getSpecialHandlePoint = function(bounds) {
			var scale = this.graph.getView().scale;
			var sz = Math.min(bounds.width, Math.min(bounds.height, mxUtils
									.getValue(this.state.style, 'size',
											this.defaultValue)
									* scale / this.scaleFactor));

			return new mxPoint(bounds.x + sz, bounds.y + sz);
		};

		mxCubeHandler.prototype.updateStyleUnrotated = function(pt, bounds) {
			var size = Math.min(Math.min(bounds.width / this.scaleFactor, pt.x
									- bounds.x), Math.min(bounds.height
									/ this.scaleFactor, pt.y - bounds.y));
			var scale = this.graph.getView().scale;
			this.state.style['size'] = Math.round(Math.max(1, size) / scale)
					* this.scaleFactor;

			// Stays on the diagonal
			return new mxPoint(bounds.x + size, bounds.y + size);
		};

		mxCubeHandler.prototype.applyStyle = function() {
			this.state.view.graph.setCellStyles('size',
					this.state.style['size'], [this.state.cell]);
		};

		// Card Handler
		function mxCardHandler(state) {
			mxCubeHandler.call(this, state);
		};

		mxUtils.extend(mxCardHandler, mxCubeHandler);

		mxCardHandler.prototype.defaultValue = 30;

		mxCardHandler.prototype.scaleFactor = 2;

		// Note Handler
		function mxNoteHandler(state) {
			mxCubeHandler.call(this, state);
		};

		mxUtils.extend(mxNoteHandler, mxCubeHandler);

		mxNoteHandler.prototype.defaultValue = 30;

		mxNoteHandler.prototype.scaleFactor = 1;

		mxNoteHandler.prototype.getSpecialHandlePoint = function(bounds) {
			var scale = this.graph.getView().scale;
			var sz = Math.min(bounds.width, Math.min(bounds.height, mxUtils
									.getValue(this.state.style, 'size',
											this.defaultValue)
									* scale / this.scaleFactor));

			return new mxPoint(bounds.x + bounds.width - sz, bounds.y + sz);
		};

		mxNoteHandler.prototype.updateStyleUnrotated = function(pt, bounds) {
			var size = Math.min(Math.min(bounds.width / this.scaleFactor, pt.x
									- bounds.x + bounds.width), Math.min(
							bounds.height / this.scaleFactor, pt.y - bounds.y));
			var scale = this.graph.getView().scale;
			this.state.style['size'] = Math.round(Math.max(1, size) / scale)
					* this.scaleFactor;

			// Stays on the diagonal
			return new mxPoint(bounds.x + bounds.width - size, bounds.y + size);
		};

		// Step Handler
		function mxStepHandler(state) {
			mxCubeHandler.call(this, state);
		};

		mxUtils.extend(mxStepHandler, mxCubeHandler);

		mxStepHandler.prototype.defaultValue = 0.2;

		mxStepHandler.prototype.scaleFactor = 1;

		mxStepHandler.prototype.getSpecialHandlePoint = function(bounds) {
			var sz = mxUtils.getValue(this.state.style, 'size',
					this.defaultValue);

			return new mxPoint(bounds.x + bounds.width * sz, bounds.y
							+ bounds.height / 2);
		};

		mxStepHandler.prototype.updateStyleUnrotated = function(pt, bounds) {
			var size = Math.min(1, (pt.x - bounds.x) / bounds.width);
			this.state.style['size'] = size;

			return new mxPoint(bounds.x + size * bounds.width, bounds.y
							+ bounds.height / 2);
		};

		// Tape Handler
		function mxTapeHandler(state) {
			mxCubeHandler.call(this, state);
		};

		mxUtils.extend(mxTapeHandler, mxCubeHandler);

		mxTapeHandler.prototype.defaultValue = 0.4;

		mxTapeHandler.prototype.scaleFactor = 1;

		mxTapeHandler.prototype.getSpecialHandlePoint = function(bounds) {
			var sz = mxUtils.getValue(this.state.style, 'size',
					this.defaultValue);

			return new mxPoint(bounds.x + bounds.width / 2, bounds.y + sz
							* bounds.height / 2);
		};

		mxTapeHandler.prototype.updateStyleUnrotated = function(pt, bounds) {
			var size = Math.min(1, ((pt.y - bounds.y) / bounds.height) * 2);
			this.state.style['size'] = size;

			return new mxPoint(bounds.x + bounds.width / 2, bounds.y + size
							* bounds.height / 2);
		};

		var handlers = {
			'swimlane' : mxSwimlaneHandler,
			'folder' : mxFolderHandler,
			'cube' : mxCubeHandler,
			'card' : mxCardHandler,
			'note' : mxNoteHandler,
			'step' : mxStepHandler,
			'tape' : mxTapeHandler
		};

		var mxGraphCreateHandler = mxGraph.prototype.createHandler;
		mxGraph.prototype.createHandler = function(state) {
			if (state != null) {
				var ctor = handlers[state.style['shape']];

				if (ctor != null) {
					return new ctor(state);
				}
			}

			return mxGraphCreateHandler.apply(this, arguments);
		};
	}
	//
	function mxStencilShape(stencil) {
		this.stencil = stencil;
	};

	/**
	 * Extends mxShape.
	 */
	mxStencilShape.prototype = new mxShape();
	mxStencilShape.prototype.constructor = mxStencilShape;

	/**
	 * Variable: mixedModeHtml
	 * 
	 * Always prefers VML in mixed mode for stencil shapes. Default is false.
	 */
	mxStencilShape.prototype.mixedModeHtml = false;

	/**
	 * Variable: preferModeHtml
	 * 
	 * Always prefers VML in prefer HTML mode for stencil shapes. Default is
	 * false.
	 */
	mxStencilShape.prototype.preferModeHtml = false;

	/**
	 * Variable: stencil
	 * 
	 * Holds the <mxStencil> that defines the shape.
	 */
	mxStencilShape.prototype.stencil = null;

	/**
	 * Variable: state
	 * 
	 * Holds the <mxCellState> associated with this shape.
	 */
	mxStencilShape.prototype.state = null;

	/**
	 * Variable: vmlScale
	 * 
	 * Renders VML with a scale of 4.
	 */
	mxStencilShape.prototype.vmlScale = 4;

	/**
	 * Function: apply
	 * 
	 * Extends <mxShape> apply to keep a reference to the <mxCellState>.
	 * 
	 * Parameters:
	 * 
	 * state - <mxCellState> of the corresponding cell.
	 */
	mxStencilShape.prototype.apply = function(state) {
		this.state = state;
		mxShape.prototype.apply.apply(this, arguments);
	};

	/**
	 * Function: createSvg
	 * 
	 * Creates and returns the SVG node(s) to represent this shape.
	 */
	mxStencilShape.prototype.createSvg = function() {
		var node = document.createElementNS(mxConstants.NS_SVG, 'g');
		this.configureSvgShape(node);

		return node;
	};

	/**
	 * Function: configureHtmlShape
	 * 
	 * Overrides method to set the overflow style to visible.
	 */
	mxStencilShape.prototype.configureHtmlShape = function(node) {
		mxShape.prototype.configureHtmlShape.apply(this, arguments);

		if (!mxUtils.isVml(node)) {
			node.style.overflow = 'visible';
		}
	};

	/**
	 * Function: createVml
	 * 
	 * Creates and returns the VML node to represent this shape.
	 */
	mxStencilShape.prototype.createVml = function() {
		var name = (document.documentMode == 8) ? 'div' : 'v:group';
		var node = document.createElement(name);
		this.configureTransparentBackground(node);
		node.style.position = 'absolute';

		return node;
	};

	/**
	 * Function: configureVmlShape
	 * 
	 * Configures the specified VML node by applying the current color, bounds,
	 * shadow, opacity etc.
	 */
	mxStencilShape.prototype.configureVmlShape = function(node) {
		// do nothing
	};

	/**
	 * Function: redraw
	 * 
	 * Creates and returns the SVG node(s) to represent this shape.
	 */
	mxStencilShape.prototype.redraw = function() {
		this.updateBoundingBox();

		if (this.dialect == mxConstants.DIALECT_SVG) {
			this.redrawShape();
		} else {
			this.node.style.visibility = 'hidden';
			this.redrawShape();
			this.node.style.visibility = 'visible';
		}
	};
	// Constraints
	mxGraph.prototype.getAllConnectionConstraints = function(terminal, source) {
		if (terminal != null && terminal.shape != null) {
			if (terminal.shape instanceof mxStencilShape) {
				if (terminal.shape.stencil != null) {
					return terminal.shape.stencil.constraints;
				}
			} else if (terminal.shape.constraints != null) {
				return terminal.shape.constraints;
			}
		}

		return null;
	};

	mxRectangleShape.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.25, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.75, 0), true),
			new mxConnectionConstraint(new mxPoint(0, 0.25), true),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(0, 0.75), true),
			new mxConnectionConstraint(new mxPoint(1, 0.25), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.75), true),
			new mxConnectionConstraint(new mxPoint(0.25, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
	mxLabel.prototype.constraints = mxRectangleShape.prototype.constraints;
	mxImageShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	mxSwimlane.prototype.constraints = mxRectangleShape.prototype.constraints;
	PlusShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	NoteShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	CardShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	CubeShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	FolderShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	mxCylinder.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.15, 0.05), false),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.85, 0.05), false),
			new mxConnectionConstraint(new mxPoint(0, 0.3), true),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(0, 0.7), true),
			new mxConnectionConstraint(new mxPoint(1, 0.3), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.7), true),
			new mxConnectionConstraint(new mxPoint(0.15, 0.95), false),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.85, 0.95), false)];
	UmlActorShape.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.25, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.75, 0), true),
			new mxConnectionConstraint(new mxPoint(0, 0.25), true),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(0, 0.75), true),
			new mxConnectionConstraint(new mxPoint(1, 0.25), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.75), true),
			new mxConnectionConstraint(new mxPoint(0.25, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
	ComponentShape.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.25, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.75, 0), true),
			new mxConnectionConstraint(new mxPoint(0, 0.3), true),
			new mxConnectionConstraint(new mxPoint(0, 0.7), true),
			new mxConnectionConstraint(new mxPoint(1, 0.25), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.75), true),
			new mxConnectionConstraint(new mxPoint(0.25, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
	mxActor.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.25, 0.2), false),
			new mxConnectionConstraint(new mxPoint(0.1, 0.5), false),
			new mxConnectionConstraint(new mxPoint(0, 0.75), true),
			new mxConnectionConstraint(new mxPoint(0.75, 0.25), false),
			new mxConnectionConstraint(new mxPoint(0.9, 0.5), false),
			new mxConnectionConstraint(new mxPoint(1, 0.75), true),
			new mxConnectionConstraint(new mxPoint(0.25, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
	TapeShape.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0, 0.35), false),
			new mxConnectionConstraint(new mxPoint(0, 0.5), false),
			new mxConnectionConstraint(new mxPoint(0, 0.65), false),
			new mxConnectionConstraint(new mxPoint(1, 0.35), false),
			new mxConnectionConstraint(new mxPoint(1, 0.5), false),
			new mxConnectionConstraint(new mxPoint(1, 0.65), false),
			new mxConnectionConstraint(new mxPoint(0.25, 1), false),
			new mxConnectionConstraint(new mxPoint(0.75, 0), false)];
	// TODO: Relative ports
	StepShape.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.25, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.75, 0), true),
			new mxConnectionConstraint(new mxPoint(0.25, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.75, 1), true),
			new mxConnectionConstraint(new mxPoint(0.1, 0.25), false),
			new mxConnectionConstraint(new mxPoint(0.2, 0.5), false),
			new mxConnectionConstraint(new mxPoint(0.1, 0.75), false),
			new mxConnectionConstraint(new mxPoint(0.9, 0.25), false),
			new mxConnectionConstraint(new mxPoint(1, 0.5), false),
			new mxConnectionConstraint(new mxPoint(0.9, 0.75), false)];
	mxLine.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0, 0.5), false),
			new mxConnectionConstraint(new mxPoint(0.25, 0.5), false),
			new mxConnectionConstraint(new mxPoint(0.75, 0.5), false),
			new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
	LollipopShape.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.5, 0), false),
			new mxConnectionConstraint(new mxPoint(0.5, 1), false)];
	mxEllipse.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0, 0), true),
			new mxConnectionConstraint(new mxPoint(1, 0), true),
			new mxConnectionConstraint(new mxPoint(0, 1), true),
			new mxConnectionConstraint(new mxPoint(1, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5))];
	mxDoubleEllipse.prototype.constraints = mxEllipse.prototype.constraints;
	mxRhombus.prototype.constraints = mxEllipse.prototype.constraints;
	mxTriangle.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0, 0.25), true),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(0, 0.75), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true)];
	mxHexagon.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.375, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.625, 0), true),
			new mxConnectionConstraint(new mxPoint(0.125, 0.25), false),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(0.125, 0.75), false),
			new mxConnectionConstraint(new mxPoint(0.875, 0.25), false),
			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			new mxConnectionConstraint(new mxPoint(0.875, 0.75), false),
			new mxConnectionConstraint(new mxPoint(0.375, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.625, 1), true)];
	mxCloud.prototype.constraints = [
			new mxConnectionConstraint(new mxPoint(0.25, 0.25), false),
			new mxConnectionConstraint(new mxPoint(0.4, 0.1), false),
			new mxConnectionConstraint(new mxPoint(0.16, 0.55), false),
			new mxConnectionConstraint(new mxPoint(0.07, 0.4), false),
			new mxConnectionConstraint(new mxPoint(0.31, 0.8), false),
			new mxConnectionConstraint(new mxPoint(0.13, 0.77), false),
			new mxConnectionConstraint(new mxPoint(0.8, 0.8), false),
			new mxConnectionConstraint(new mxPoint(0.55, 0.95), false),
			new mxConnectionConstraint(new mxPoint(0.875, 0.5), false),
			new mxConnectionConstraint(new mxPoint(0.96, 0.7), false),
			new mxConnectionConstraint(new mxPoint(0.625, 0.2), false),
			new mxConnectionConstraint(new mxPoint(0.88, 0.25), false)];
	mxArrow.prototype.constraints = null;

	mxVertexHandler.prototype.init = function() {
		this.graph = this.state.view.graph;
		this.selectionBounds = this.getSelectionBounds(this.state);
		this.bounds = new mxRectangle(this.selectionBounds.x,
				this.selectionBounds.y, this.selectionBounds.width,
				this.selectionBounds.height);
		this.selectionBorder = this.createSelectionShape(this.bounds);
		this.selectionBorder.dialect = this.graph.dialect != mxConstants.DIALECT_SVG
				? mxConstants.DIALECT_VML
				: mxConstants.DIALECT_SVG;
		this.selectionBorder.pointerEvents = !1;
		this.selectionBorder.init(this.graph.getView().getOverlayPane());
		mxEvent.redirectMouseEvents(this.selectionBorder.node, this.graph,
				this.state);
		this.graph.isCellMovable(this.state.cell)
				&& (this.selectionBorder.node.style.cursor = mxConstants.CURSOR_MOVABLE_VERTEX);
		if (0 >= mxGraphHandler.prototype.maxCells
				|| this.graph.getSelectionCount() < mxGraphHandler.prototype.maxCells) {
			var a = this.graph.isCellResizable(this.state.cell);
			this.sizers = [];
			if (a || this.graph.isLabelMovable(this.state.cell)
					&& 2 <= this.state.width && 2 <= this.state.height) {
				var b = 0, i = 0;
				a
						&& (this.singleSizer
								|| (this.sizers.push(this.createSizer(
										'nw-resize', i++, 10, true,
										mxClient.basePath
												+ "/images/ns_border.png")), this.sizers
										.push(this.createSizer("n-resize", b++)), this.sizers
										.push(this
												.createSizer("ne-resize", b++)), this.sizers
										.push(this.createSizer("w-resize", b++)), this.sizers
										.push(this.createSizer("e-resize", b++)), this.sizers
										.push(this
												.createSizer("sw-resize", b++)), this.sizers
										.push(this.createSizer("s-resize", b++))), this.sizers
								.push(this.createSizer('se-resize', i++, 10,
										true, mxClient.basePath
												+ "/images/ew_border.png")));
				a = this.graph.model.getGeometry(this.state.cell);
				null != a
						&& (!a.relative
								&& !this.graph.isSwimlane(this.state.cell) && this.graph
								.isLabelMovable(this.state.cell))
						&& (this.labelShape = this.createSizer(
								mxConstants.CURSOR_LABEL_HANDLE,
								mxEvent.LABEL_HANDLE,
								mxConstants.LABEL_HANDLE_SIZE,
								mxConstants.LABEL_HANDLE_FILLCOLOR), this.sizers
								.push(this.labelShape))
			} else
				this.graph.isCellMovable(this.state.cell)
						&& (!this.graph.isCellResizable(this.state.cell)
								&& 2 > this.state.width && 2 > this.state.height)
						&& (this.labelShape = this.createSizer(
								mxConstants.CURSOR_MOVABLE_VERTEX, null, null,
								mxConstants.LABEL_HANDLE_FILLCOLOR), this.sizers
								.push(this.labelShape))
		}
		if (this.rotationEnabled
				&& this.graph.isCellRotatable(this.state.cell)
				&& (0 >= mxGraphHandler.prototype.maxCells || this.graph
						.getSelectionCount() < mxGraphHandler.prototype.maxCells)
				&& 2 < this.state.width && 2 < this.state.height)
			this.rotationShape = this.createSizer("pointer",
					mxEvent.ROTATION_HANDLE, mxConstants.HANDLE_SIZE + 3,
					mxConstants.HANDLE_FILLCOLOR), this.sizers
					.push(this.rotationShape);
		this.redraw();
		this.constrainGroupByChildren && this.updateMinBounds();
	};
	mxVertexHandler.prototype.redraw = function() {
		this.selectionBounds = this.getSelectionBounds(this.state);
		this.bounds = new mxRectangle(this.state.x - 4, this.state.y - 4,
				this.state.width + 8, this.state.height + 8);
		this.redrawHandles();
		this.drawPreview();
		// this.graph.clearCellOverlays();
	};

	mxVertexHandler.prototype.createSizer = function(cursor, index, size,
			allowedShow, imgUrl) {
		size = size || mxConstants.HANDLE_SIZE;
		var bounds = new mxRectangle(20, 20, size, size);
		var sizer = new mxImageShape(bounds, imgUrl);
		if (this.state.text != null
				&& this.state.text.node.parentNode == this.graph.container) {
			sizer.bounds.height -= 1;
			sizer.bounds.width -= 1;
			sizer.dialect = mxConstants.DIALECT_STRICTHTML;
			sizer.init(this.graph.container);
		} else {
			sizer.dialect = (this.graph.dialect != mxConstants.DIALECT_SVG)
					? mxConstants.DIALECT_VML
					: mxConstants.DIALECT_SVG;
			sizer.init(this.graph.getView().getOverlayPane());
		}
		sizer.node.style.cursor = cursor;
		mxEvent.redirectMouseEvents(sizer.node, this.graph, this.state);
		if (!allowedShow) {
			sizer.node.style.visibility = 'hidden';
		}
		return sizer;
	};
	mxVertexHandler.prototype.reset = function() {
		null != this.sizers
				&& (null != this.index && null != this.sizers[this.index] && "none" == this.sizers[this.index].node.style.display)
				&& (this.sizers[this.index].node.style.display = "");
		this.index = this.inTolerance = this.currentAlpha = null;
		null != this.preview && (this.preview.destroy(), this.preview = null);
		null != this.selectionBorder
				&& (this.selectionBorder.node.style.display = "inline", this.selectionBounds = this
						.getSelectionBounds(this.state), this.bounds = new mxRectangle(
						this.selectionBounds.x - 4, this.selectionBounds.y - 4,
						this.selectionBounds.width + 8,
						this.selectionBounds.height + 8), this.drawPreview());
		if (this.livePreview && null != this.sizers)
			for (var a = 0; a < this.sizers.length; a++)
				null != this.sizers[a]
						&& (this.sizers[a].node.style.display = "");
		this.redrawHandles();
		this.edgeHandlers = null
	};
	/***************************************************************************
	 * 判断元素的正确底部位置,为底部元素留白
	 */
	mxGraph.prototype.sizeDidChange = function() {
		var a = this.getGraphBounds();
		if (null != this.container) {
			var b = this.getBorder(), c = Math
					.max(0, a.x + a.width + 1 + b + 6), b = Math.max(0, a.y
							+ a.height + 1 + b + 6);
			null != this.minimumContainerSize
					&& (c = Math.max(c, this.minimumContainerSize.width), b = Math
							.max(b, this.minimumContainerSize.height));
			this.resizeContainer && this.doResizeContainer(c, b);
			if (this.preferPageSize || !mxClient.IS_IE && this.pageVisible) {
				var d = this.getPreferredPageSize(a, c, b);
				null != d && (c = d.width, b = d.height)
			}
			null != this.minimumGraphSize
					&& (c = Math.max(c, this.minimumGraphSize.width
									* this.view.scale), b = Math.max(b,
							this.minimumGraphSize.height * this.view.scale));
			c = Math.ceil(c - 1);
			b = Math.ceil(b - 1);
			this.dialect == mxConstants.DIALECT_SVG
					? (d = this.view.getDrawPane().ownerSVGElement, d.style.minWidth = Math
							.max(1, c)
							+ "px", d.style.minHeight = Math.max(1, b) + "px", d.style.width = "100%", d.style.height = "100%")
					: mxClient.IS_QUIRKS
							? this.view.updateHtmlCanvasSize(Math.max(1, c),
									Math.max(1, b))
							: (this.view.canvas.style.minWidth = Math.max(1, c)
									+ "px", this.view.canvas.style.minHeight = Math
									.max(1, b)
									+ "px");
			this.updatePageBreaks(this.pageBreaksVisible, c - 1, b - 1)
		}
		this.fireEvent(new mxEventObject(mxEvent.SIZE, "bounds", a))
	};
	function mxCellConnectHighlight(graph, highlightColor, strokeWidth) {
		mxCellHighlight.apply(this, arguments);
	};
	mxCellConnectHighlight.prototype = new mxCellHighlight();
	mxCellConnectHighlight.prototype.constructor = mxCellHighlight;
	mxCellConnectHighlight.prototype.spacing = 6;
	mxCellConnectHighlight.prototype.createShape = function() {
		var a = null, a = this.graph.model.isEdge(this.state.cell)
				? new mxPolyline(this.state.absolutePoints,
						this.highlightColor, this.strokeWidth)
				: new mxRectangleShape(new mxRectangle(this.state.x,
								this.state.y, this.state.width,
								this.state.height), null, "transparent", 0);
		a.dialect = this.graph.dialect != mxConstants.DIALECT_SVG
				? mxConstants.DIALECT_VML
				: mxConstants.DIALECT_SVG;
		a.init(this.graph.getView().getOverlayPane());
		mxEvent.redirectMouseEvents(a.node, this.graph, this.state);
		a.pointerEvents = !1;
		a.isDashed = this.dashed;
		this.graph.clearCellOverlays();
		this.createSides();
		return a
	};
	mxCellConnectHighlight.prototype.createSideNode = function(url) {
		var bounds = new mxRectangle(20, 20, 20, 20);
		var side = new mxImageShape(bounds, url);
		side.dialect = mxConstants.DIALECT_STRICTHTML;
		side.init(this.graph.container);
		return side;
	}
	mxCellConnectHighlight.prototype.createSides = function(url) {
		var errorUrl = '', i;
		if (!this.isValidConnection) {
			errorUrl = 'error_'
		}
		var nw = this.createSideNode(mxClient.basePath + "/images/" + errorUrl
				+ "nw_side.png");
		var ne = this.createSideNode(mxClient.basePath + "/images/" + errorUrl
				+ "ne_side.png");
		var sw = this.createSideNode(mxClient.basePath + "/images/" + errorUrl
				+ "sw_side.png");
		var se = this.createSideNode(mxClient.basePath + "/images/" + errorUrl
				+ "se_side.png");
		this.sides = {
			nw : nw,
			ne : ne,
			sw : sw,
			se : se
		};

		for (i in this.sides) {
			mxEvent.redirectMouseEvents(this.sides[i].node, this.graph,
					this.state);
		}
	}
	mxCellConnectHighlight.prototype.redrawSides = function() {
		var s = this.state;
		var r = s.x + s.width;
		var b = s.y + s.height;
		this.relocationSide(this.sides['nw'], s.x - this.spacing
						- $(this.graph.container).children().scrollLeft(), s.y
						- this.spacing
						- $(this.graph.container).children().scrollTop());
		this.relocationSide(this.sides['ne'], r + this.spacing
						- this.sides['ne'].bounds.width
						- $(this.graph.container).children().scrollLeft(), s.y
						- this.spacing
						- $(this.graph.container).children().scrollTop());
		this.relocationSide(this.sides['sw'], s.x - this.spacing
						- $(this.graph.container).children().scrollLeft(), b
						+ this.spacing - this.sides['sw'].bounds.height
						- $(this.graph.container).children().scrollTop());
		this.relocationSide(this.sides['se'], r + this.spacing
						- this.sides['se'].bounds.width
						- $(this.graph.container).children().scrollLeft(), b
						+ this.spacing - this.sides['se'].bounds.height
						- $(this.graph.container).children().scrollTop());
	};
	mxCellConnectHighlight.prototype.relocationSide = function(sideShape, x, y) {
		sideShape.bounds.x = x;
		sideShape.bounds.y = y;
		sideShape.redraw();
		sideShape.redrawHtmlShape()
	}
	mxCellConnectHighlight.prototype.repaint = function() {
		null != this.state
				&& null != this.shape
				&& (this.graph.model.isEdge(this.state.cell)
						? this.shape.points = this.state.absolutePoints
						: (this.shape.bounds = new mxRectangle(this.state.x
										- this.spacing, this.state.y
										- this.spacing, this.state.width + 2
										* this.spacing, this.state.height + 2
										* this.spacing), this.shape.rotation = Number(this.state.style[mxConstants.STYLE_ROTATION]
								|| "0")), null != this.state.shape
						&& this.shape.setCursor(this.state.shape.getCursor()), this
						.redrawSides(), this.shape.redraw())
	};
	/**
	 * 重写高亮方法
	 */
	mxCellConnectHighlight.prototype.highlight = function(a) {
		var i;
		if (this.state != a) {
			if (this.shape != null) {
				this.shape.destroy();
				this.shape = null
			}
			if (this.sides != null) {
				for (i in this.sides) {
					if (this.sides[i] != null) {
						this.sides[i].destroy();
						this.sides[i] = null
					}
				}
			}
			this.state = a;
			this.state != null && this.drawHighlight()
		}
	};
	mxCellConnectHighlight.prototype.isValidConnection = true;
	/***************************************************************************
	 * 继承mxCellMarker 用于标记当前连接的cell
	 */
	function mxCellConnectMarker(graph, validColor, invalidColor, hotspot) {
		if (graph != null) {
			this.graph = graph;
			this.validColor = (validColor != null)
					? validColor
					: mxConstants.DEFAULT_VALID_COLOR;
			this.invalidColor = (validColor != null)
					? invalidColor
					: mxConstants.DEFAULT_INVALID_COLOR;
			this.hotspot = (hotspot != null)
					? hotspot
					: mxConstants.DEFAULT_HOTSPOT;
			this.highlight = new mxCellConnectHighlight(graph);
		}
	};
	mxCellConnectMarker.prototype = new mxCellMarker();
	mxCellConnectMarker.prototype.constructor = mxCellMarker;
	mxCellMarker.prototype.mark = function() {
		this.highlight.isValidConnection = this.isValidConnection;
		this.highlight.setHighlightColor(this.currentColor);
		this.highlight.highlight(this.markedState);
		this.fireEvent(new mxEventObject(mxEvent.MARK, 'state',
				this.markedState));
	};
	mxCellMarker.prototype.isValidConnection = true;
	/**
	 * 重写connect方法,用 mxCellConnectMarker代替mxCellMarker
	 */
	mxConnectionHandler.prototype.createMarker = function() {
		var marker = new mxCellConnectMarker(this.graph);
		marker.hotspotEnabled = true;
		marker.getCell = mxUtils.bind(this, function(evt, cell) {
					var cell = mxCellConnectMarker.prototype.getCell.apply(
							marker, arguments);
					this.error = null;
					if (!this.isConnectableCell(cell)) {
						return null;
					}
					if (cell != null) {
						if (this.isConnecting()) {
							if (this.previous != null) {
								this.error = this.validateConnection(
										this.previous.cell, cell);
								if (this.error != null
										&& this.error.length == 0) {
									cell = null;
									if (this.isCreateTarget()) {
										this.error = null;
									}
								}
							}
						} else if (!this.isValidSource(cell)) {
							cell = null;
						}
					} else if (this.isConnecting() && !this.isCreateTarget()
							&& !this.graph.allowDanglingEdges) {
						this.error = '';
					}
					return cell;
				});
		marker.isValidState = mxUtils.bind(this, function(state) {
					if (this.isConnecting()) {
						return this.error == null;
					} else {
						return mxCellConnectMarker.prototype.isValidState
								.apply(marker, arguments);
					}
				});
		marker.getMarkerColor = mxUtils.bind(this,
				function(evt, state, isValid) {
					marker.isValidConnection = isValid;
					return (this.connectImage == null || this.isConnecting())
							? mxCellConnectMarker.prototype.getMarkerColor
									.apply(marker, arguments)
							: null;
				});
		marker.intersects = mxUtils.bind(this, function(state, evt) {
					if (this.connectImage != null || this.isConnecting()) {
						return true;
					}
					return mxCellConnectMarker.prototype.intersects.apply(
							marker, arguments);
				});
		return marker;
	};
	/***************************************************************************
	 * 注册overlays的mousemove监听
	 */
	mxCellRenderer.prototype.installCellOverlayListeners = function(a, b, c) {
		var d = a.view.graph;
		mxEvent.addListener(c.node, mxEvent.CLICK, function(c) {
					d.isEditing()
							&& d.stopEditing(!d.isInvokesStopCellEditing());
					b.fireEvent(new mxEventObject(mxEvent.CLICK, "event", c,
							"cell", a.cell))
				});
		var e = mxClient.IS_TOUCH ? "touchmove" : "mousemove", mousedown = mxClient.IS_TOUCH
				? "touchstart"
				: "mousedown", mouseenter = 'mouseenter', mouseleave = 'mouseleave', mouseout = 'mouseout';
		mxEvent.addListener(c.node, mousedown, function(a) {
					b.fireEvent(new mxEventObject(mousedown, "event", a,
							"cell", a.cell))
				});
		mxEvent.addListener(c.node, mouseenter, function(a) {
					b.fireEvent(new mxEventObject(mouseenter, "event", a,
							"cell", a.cell))
				});
		mxEvent.addListener(c.node, mouseleave, function(a) {
					b.fireEvent(new mxEventObject(mouseleave, "event", a,
							"cell", a.cell))
				});
		mxEvent.addListener(c.node, mouseout, function(a) {
					b.fireEvent(new mxEventObject(mouseout, "event", a, "cell",
							a.cell))
				});
		mxEvent.addListener(c.node, e, function(c) {
					b
							.fireEvent(new mxEventObject(e, "event", c, "cell",
									a.cell))
				});
		mxClient.IS_TOUCH
				&& mxEvent.addListener(c.node, "touchend", function(c) {
							b.fireEvent(new mxEventObject(mxEvent.CLICK,
									"event", c, "cell", a.cell))
						});
	};
	/**
	 * 处理缩放图的样式,使其可以通过style的collapseImage和expandedImage配置
	 * 
	 */
	mxGraph.prototype.getFoldingImage = function(a) {
		if (a.style.collapseImage) {
			if (a != null && this.foldingEnabled
					&& !this.getModel().isEdge(a.cell)) {
				var b = this.isCellCollapsed(a.cell);
				if (this.isCellFoldable(a.cell, !b))
					return b
							? new mxImage(a.style.collapseImage, 16, 16)
							: new mxImage(a.style.expandedImage, 16, 16)
			}
		} else {
			if (a != null && this.foldingEnabled
					&& !this.getModel().isEdge(a.cell)) {
				var b = this.isCellCollapsed(a.cell);
				if (this.isCellFoldable(a.cell, !b))
					return b ? this.collapsedImage : this.expandedImage
			}
		}
		return null
	};
	mxCellRenderer.prototype.getControlBounds = function(state) {
		if (state.control != null) {
			var oldScale = state.control.scale;
			var w = state.control.bounds.width / oldScale;
			var h = state.control.bounds.height / oldScale;
			var s = state.view.scale;
			if (state.style.collapseAlign == "center") {
				return (state.view.graph.getModel().isEdge(state.cell))
						? new mxRectangle(
								state.x + state.width / 2 - w / 2 * s, state.y
										+ state.height / 2 - h / 2 * s, w * s,
								h * s)
						: new mxRectangle(state.x + state.width / 2 * s - w / 2
										* s, state.y + state.height * s - h * s
										* 1.5, w * s, h * s);
			} else {
				return (state.view.graph.getModel().isEdge(state.cell))
						? new mxRectangle(
								state.x + state.width / 2 - w / 2 * s, state.y
										+ state.height / 2 - h / 2 * s, w * s,
								h * s)
						: new mxRectangle(state.x + w * s, state.y + h * s, w
										* s, h * s);
			}
		}
		return null;
	};

	/***************************************************************************
	 * 重写mxUrlConverter用于解析直接是base64编码的图片字符串
	 **************************************************************************/
	mxUrlConverter = function(root) {
		/**
		 * Variable: enabled
		 * 
		 * Specifies if the converter is enabled. Default is true.
		 */
		var enabled = true;

		/**
		 * Variable: baseUrl
		 * 
		 * Specifies the base URL to be used as a prefix for relative URLs.
		 */
		var baseUrl = null;

		/**
		 * Variable: baseDomain
		 * 
		 * Specifies the base domain to be used as a prefix for absolute URLs.
		 */
		var baseDomain = null;

		var updateBaseUrl = function() {
			baseDomain = location.protocol + '//' + location.host;
			baseUrl = baseDomain + location.pathname;
			var tmp = baseUrl.lastIndexOf('/');

			// Strips filename etc
			if (tmp > 0) {
				baseUrl = baseUrl.substring(0, tmp + 1);
			}
		};

		// Returns public interface
		return {

			/**
			 * Function: isEnabled
			 * 
			 * Returns <enabled>.
			 */
			isEnabled : function() {
				return enabled;
			},

			/**
			 * Function: setEnabled
			 * 
			 * Sets <enabled>.
			 */
			setEnabled : function(value) {
				enabled = value;
			},

			/**
			 * Function: getBaseUrl
			 * 
			 * Returns <baseUrl>.
			 */
			getBaseUrl : function() {
				return baseUrl;
			},

			/**
			 * Function: setBaseUrl
			 * 
			 * Sets <baseUrl>.
			 */
			setBaseUrl : function(value) {
				baseUrl = value;
			},

			/**
			 * Function: getBaseDomain
			 * 
			 * Returns <baseDomain>.
			 */
			getBaseDomain : function() {
				return baseUrl;
			},

			/**
			 * Function: setBaseDomain
			 * 
			 * Sets <baseDomain>.
			 */
			setBaseDomain : function(value) {
				baseUrl = value;
			},

			/**
			 * Function: convert
			 * 
			 * Converts the given URL to an absolute URL with protol and domain.
			 * Relative URLs are first converted to absolute URLs.
			 */
			convert : function(url) {
				if (!url.match(/http:\/\/|https:\/\/|.png|.gif|.jepg|.jpg/)) {
					return "data:image/png;base64," + url;
				} else if (enabled && url.indexOf('http://') != 0
						&& url.indexOf('https://') != 0
						&& url.indexOf('data:image') != 0) {
					if (baseUrl == null) {
						updateBaseUrl();
					}

					if (url.charAt(0) == '/') {
						url = baseDomain + url;
					} else {
						url = baseUrl + url;
					}
				}

				return url;
			}

		};

	};
	mxGraph.prototype.alignCells = function(align, cells, param, distance) {
		var distance = distance || 10, defalutLocation, roots = [], sLen = 0, defalutGeo, maxSize = 0, visitedCellsId = [], parent, pGeo;
		var graph = this;
		var resetCellLocation = function(geo, isSameLayer, ishorizontal) {
			if (isSameLayer) {
				if (ishorizontal) {
					if (defalutLocation) {

						geo.y = defalutLocation;
					}
					geo.x = defalutGeo.width + defalutGeo.x + distance;
				} else {
					if (defalutLocation) {

						geo.x = defalutLocation;
					}
					geo.y = defalutGeo.height + defalutGeo.y + distance;
				}

			} else {
				if (ishorizontal) {
					if (defalutLocation) {
						geo.y = distance + defalutLocation + defalutGeo.height;
					}
					defalutLocation = geo.y;
				} else {
					if (defalutLocation) {

						geo.x = distance + defalutLocation + defalutGeo.width;
					}
					defalutLocation = geo.x;
				}
			}
		}
		var locateCell = function(cell, isSameLayer) {
			var geo = graph.getCellGeometry(cell);

			if (geo != null && !graph.model.isEdge(cell)) {
				geo = geo.clone();

				if (align == mxConstants.ALIGN_CENTER) {
					if (!isSameLayer) {
						geo.x = param - geo.width / 2;
					}
					resetCellLocation(geo, isSameLayer, true);
				} else if (align == mxConstants.ALIGN_RIGHT) {
					if (!isSameLayer) {
						geo.x = param - geo.width;
					}
					resetCellLocation(geo, isSameLayer, true);
				} else if (align == mxConstants.ALIGN_TOP) {
					if (!isSameLayer) {
						geo.y = param;
					}
					resetCellLocation(geo, isSameLayer, false);
				} else if (align == mxConstants.ALIGN_MIDDLE) {
					if (!isSameLayer) {
						geo.y = param - geo.height / 2;
					}
					resetCellLocation(geo, isSameLayer, false);
				} else if (align == mxConstants.ALIGN_BOTTOM) {
					if (!isSameLayer) {
						geo.y = param - geo.height;
					}
					resetCellLocation(geo, isSameLayer, false);
				} else {
					if (!isSameLayer) {
						geo.x = param;
					}
					resetCellLocation(geo, isSameLayer, true);
				}
				defalutGeo = geo;
				graph.moveSideCells([cell], geo.x
								- graph.getCellGeometry(cell).x, geo.y
								- graph.getCellGeometry(cell).y);
				graph.model.setGeometry(cell, geo);
				parent = cell.parent;
				while (parent != graph.getDefaultParent()) {
					graph.moveCells(parent.children, (geo.x > 0 ? 0 : -geo.x),
							(geo.y > 0 ? 0 : -geo.y), false, parent);
					pGeo = graph.getCellGeometry(parent);
					pGeo = pGeo.clone();
					pGeo.width = (geo.x + geo.width) > pGeo.width
							? (geo.x + geo.width)
							: pGeo.width;
					pGeo.height = (geo.y + geo.height) > pGeo.height
							? (geo.y + geo.height)
							: pGeo.height;
					graph.model.setGeometry(parent, pGeo);
					parent = parent.parent;
				}
			}

		}
		var isTarget = function(cell) {
			var cellLen;
			if (!cell.edges || cell.edges == null || cell.edges.length == 0) {
				cellLen = null;
				return true;
			} else {
				cellLen = cell.edges.length;
				while (cellLen--) {
					if (cell.edges[cellLen].target == cell
							&& graph.isCellSelected(cell.edges[cellLen].source)) {
						cellLen = null;
						return false;
					}
				}
			}
			cellLen = null;
			return true;

		}
		var locateCells = function(targets) {
			maxSize++;
			var tLen = targets.length, subTargets = [], efLen;
			while (tLen--) {
				subTargets = [];
				if (graph.isCellSelected(targets[tLen])
						&& !(graph.isValidSideTarget({
									style : ""
								}, targets[tLen]) === false)) {
					if (tLen == (targets.length - 1) || targets == roots) {
						locateCell(targets[tLen]);
					} else {
						locateCell(targets[tLen], true);
					}
					// visitedCellsId.push(targets[tLen].id);
				}
				if (targets[tLen].edges && targets[tLen].edges.length != 0) {
					visitedCellsId.push(targets[tLen].id);
					efLen = targets[tLen].edges.length;
					while (efLen--) {
						if (targets[tLen].edges[efLen].target != targets[tLen]
								&& $.inArray(
										targets[tLen].edges[efLen].target.id,
										visitedCellsId) == -1) {
							subTargets.push(targets[tLen].edges[efLen].target);
						}
					}
				}
				if (subTargets.length > 0 && maxSize < 10000) {
					locateCells(subTargets);
				}
			}
			tLen = null;
		}
		if (cells == null) {
			cells = this.getSelectionCells();
		}

		if (cells != null && cells.length > 1) {
			// Finds the required coordinate for the alignment
			sLen = cells.length;
			while (sLen--) {
				if (cells[sLen].isVertex() && isTarget(cells[sLen])) {
					roots.push(cells[sLen]);
				}
			}
			if (param == null) {
				for (var i = 0; i < cells.length; i++) {
					var geo = this.getCellGeometry(cells[i]);

					if (geo != null && !this.model.isEdge(cells[i])) {
						if (param == null) {
							if (align == mxConstants.ALIGN_CENTER) {
								param = geo.x + geo.width / 2;
								break;
							} else if (align == mxConstants.ALIGN_RIGHT) {
								param = geo.x + geo.width;
							} else if (align == mxConstants.ALIGN_TOP) {
								param = geo.y;
							} else if (align == mxConstants.ALIGN_MIDDLE) {
								param = geo.y + geo.height / 2;
								break;
							} else if (align == mxConstants.ALIGN_BOTTOM) {
								param = geo.y + geo.height;
							} else {
								param = geo.x;
							}
						} else {
							if (align == mxConstants.ALIGN_RIGHT) {
								param = Math.max(param, geo.x + geo.width);
							} else if (align == mxConstants.ALIGN_TOP) {
								param = Math.min(param, geo.y);
							} else if (align == mxConstants.ALIGN_BOTTOM) {
								param = Math.max(param, geo.y + geo.height);
							} else {
								param = Math.min(param, geo.x);
							}
						}
					}
				}
			}

			// Aligns the cells to the coordinate
			if (param != null) {
				this.model.beginUpdate();
				try {
					locateCells(roots);
					this.fireEvent(new mxEventObject(mxEvent.ALIGN_CELLS,
							'align', align, 'cells', cells));
				} finally {
					this.model.endUpdate();
				}
			}
		}
		distance = null, defalutLocation = null, locationCells = null, sLen = null, roots = null, defalutGeo = null, resetCellLocation = null, locateCell = null, isTarget = null, locateCells = null, visitedCellsId = null, maxSize = null, pGeo = null;
		return cells;
	};
	/***************************************************************************
	 * 自动排序功能
	 */
	mxGraph.prototype.autoAlignCells = function(cells, distance) {
		var cLen, alignedIds = [], lCells = [];
		cells = cells || this.getSelectionCells();
		cells = cells.length == 0 ? this.getChildCells() : cells;
		cLen = cells.length;
		distance = distance || 50;
		var sLen, i, j;
		while (cLen--) {
			lCells = this
					.getCellsBeyond(cells[cLen].getGeometry().x, cells[cLen]
									.getGeometry().y, cells[cLen].parent, true,
							true);
			if (lCells.length > 1) {
				if ((lCells[1].getGeometry().x - (cells[cLen].getGeometry().x + cells[cLen]
						.getGeometry().width)) > (lCells[1].getGeometry().y - (cells[cLen]
						.getGeometry().y + cells[cLen].getGeometry().height))) {
					if (lCells[1].getGeometry().x
							- (cells[cLen].getGeometry().x + cells[cLen]
									.getGeometry().width) < distance * 2
							&& $.inArray(cells[cLen].id, alignedIds) == -1) {
						var geo = cells[cLen].getGeometry().clone();
						geo.y = lCells[1].getGeometry().y - geo.height
								- lCells[1].getGeometry().height;
						geo.x = lCells[1].getGeometry().x - distance
								- geo.width;
						this.model.setGeometry(cells[cLen], geo);
						alignedIds.push(cells[cLen].id);
					}
				} else {

					if (lCells[1].getGeometry().y
							- (cells[cLen].getGeometry().y + cells[cLen]
									.getGeometry().height) < distance * 2
							&& $.inArray(cells[cLen].id, alignedIds) == -1) {
						this.alignCells(mxConstants.ALIGN_CENTER, [lCells[1],
										cells[cLen]], null, distance);
						alignedIds.push(cells[cLen].id);
					}
				}
			}
		}
	}
});
