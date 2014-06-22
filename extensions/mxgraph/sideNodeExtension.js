/*******************************************************************************
 * mxgraph边界节点绘制拓展 定义: 边界节点是指存在于目标节点边界上的节点,这种节点会跟随目标节点移动,且仅存在于目标节点的边界上. 支持:
 * 边界节点随目标节点移动,与目标节点有相同的父节点,目标节点缩放\收起\展开后均会随目标节点移动,且支持历史操作(即边界节点的操作可通过mxUndoManager访问到)
 * 使用方法: 设置要插入的节点的style中包含boundary=1 提供方法:
 * 
 * @method insertSideNode 插入边界节点
 * @param boundaryNode
 *            边界节点
 * @param targetNode
 *            目标节点 graph.insertSideNode(boundaryNode,targetNode);
 */
define(function(require, exports, module) {
	require("./../../lib/mxgraph/mxClient");
	mxVertexHandler.prototype.mouseUp = function(sender, me) {
		var pGeo, psLen;
		if (!me.isConsumed() && this.index != null && this.state != null) {
			var point = new mxPoint(me.getGraphX(), me.getGraphY());
			var scale = this.graph.getView().scale;

			var gridEnabled = this.graph.isGridEnabledEvent(me.getEvent());
			var dx = (point.x - this.startX) / scale;
			var dy = (point.y - this.startY) / scale;
			var scope = this;
			var beforeLeft = scope.state.x;
			var beforeRigth = scope.state.x + scope.state.width;
			var beforeTop = scope.state.y;
			var beforeBottom = scope.state.y + scope.state.height;

			var getAndMoveSideNodesCell = function() {
				var nodes = [];
				if (scope.state && scope.state.cell
						&& scope.state.cell.extension) {
					var sideLen = scope.state.cell.extension.sideNodes.length;
					while (sideLen--) {
						var node = sender
								.getModel()
								.getCell(scope.state.cell.extension.sideNodes[sideLen]);
						if (node) {
							if ((beforeLeft != scope.state.cell.getGeometry().x && node.extension.direction == "left")
									&& (beforeRigth != scope.state.cell
											.getGeometry().x
											+ scope.state.cell.getGeometry().width && node.extension.direction == "right")
									&& (beforeTop != scope.state.cell
											.getGeometry().y && node.extension.direction == "top")
									&& (beforeBottom != scope.state.cell
											.getGeometry().y
											+ scope.state.cell.getGeometry().height && node.extension.direction == "bottom")) {
								sender.moveCells([node], dx, dy, false,
										scope.state.cell.parent, me);
							} else {
								if (node.extension.direction == "top"
										|| node.extension.direction == "bottom") {
									dx = 0;
									if (scope.state.cell.getGeometry().x > node
											.getGeometry().x
											|| (scope.state.cell.getGeometry().x + scope.state.cell
													.getGeometry().width) < node
													.getGeometry().x) {
										dx = scope.state.cell.getGeometry().x
												+ scope.state.cell
														.getGeometry().width
												/ 2 - node.getGeometry().width
												/ 2 - node.getGeometry().x;
									}
									if (node.extension.direction == "top") {
										dy = scope.state.cell.getGeometry().y
												- node.getGeometry().height / 2
												- node.getGeometry().y;

									} else {
										dy = -node.getGeometry().y
												+ scope.state.cell
														.getGeometry().y
												+ scope.state.cell
														.getGeometry().height
												- node.getGeometry().height / 2;
									}
								} else {
									dy = 0;
									if (scope.state.cell.getGeometry().y > node
											.getGeometry().y
											|| (scope.state.cell.getGeometry().y + scope.state.cell
													.getGeometry().height) < node
													.getGeometry().y) {
										dy = scope.state.cell.getGeometry().y
												+ scope.state.cell
														.getGeometry().height
												/ 2 - node.getGeometry().height
												/ 2 - node.getGeometry().y;
									}
									if (node.extension.direction == "left") {
										dx = scope.state.cell.getGeometry().x
												- node.getGeometry().width / 2
												- node.getGeometry().x;
									} else {
										dx = scope.state.cell.getGeometry().x
												+ scope.state.cell
														.getGeometry().width
												- node.getGeometry().width / 2
												- node.getGeometry().x;
									}
								}
								sender.moveCells([node], dx, dy, false,
										scope.state.cell.parent, me);
							}
							nodes.push(node);
						}
					}
				}
				return nodes;
			}
			sender.getModel().beginUpdate();
			try {
				this.resizeCell(this.state.cell, dx, dy, this.index,
						gridEnabled);
				// 调整元素大小后处理边界节点的位置
				if (this.state.cell && this.state.cell.extension
						&& this.state.cell.extension.sideNodes) {
					if (typeof dx == "number" && typeof dy == "number") {
						var nodes = getAndMoveSideNodesCell();
						sender.orderCells(false, nodes);
					}
				}
				// 调整元素大小后处理子元素的位置
				if (this.state.cell && this.state.cell.children) {
					psLen = this.state.cell.children.length;
					while (psLen--) {
						pGeo = this.state.cell.getGeometry().clone();
						pGeo.height = ((this.state.cell.children[psLen]
								.getGeometry().y + this.state.cell.children[psLen]
								.getGeometry().height) > this.state.cell
								.getGeometry().height)
								? this.state.cell.children[psLen].getGeometry().y
										+ this.state.cell.children[psLen]
												.getGeometry().height
								: this.state.cell.getGeometry().height;
						pGeo.width = ((this.state.cell.children[psLen]
								.getGeometry().x + this.state.cell.children[psLen]
								.getGeometry().width) > this.state.cell
								.getGeometry().width)
								? this.state.cell.children[psLen].getGeometry().x
										+ this.state.cell.children[psLen]
												.getGeometry().width
								: this.state.cell.getGeometry().width;
						sender.getModel().setGeometry(this.state.cell, pGeo);
					}
				}
			} finally {
				sender.getModel().endUpdate();
				pGeo = null;
				psLen = null;
			}
			this.reset();
			me.consume();
		}
	};
	/** 修改元素的 vertexHandler 以支持边界节点的绘制* */
	mxGraphHandler.prototype.mouseUp = function(sender, me) {
		var hander = this;
		// 返回指定元素的边界节点集合
		function getSideNodesCell() {
			var nodes = [];
			if (hander.cell && hander.cell.extension) {
				var sideLen = hander.cell.extension.sideNodes.length;
				while (sideLen--) {
					var node = sender.getModel()
							.getCell(hander.cell.extension.sideNodes[sideLen]);
					if (node) {
						nodes.push(node);
					}
				}
			}
			return nodes;
		}
		function moveSideCells() {
			if (hander.cell
					&& hander.sideTarget
					&& !hander.target
					&& graph.isValidSideTarget(hander.cell, hander.sideTarget,
							me.getEvent())) {
				graph.insertSideNode(hander.cell, hander.sideTarget);
			}
			if (hander.cell && hander.cell.extension
					&& hander.cell.extension.sideNodes) {
				if (typeof dx == "number" && typeof dy == "number") {
					var nodes = getSideNodesCell();
					hander.moveCells(nodes, dx, dy, clone, hander.target
									|| hander.cell.parent);// , me.getEvent()
					graph.orderCells(false, nodes);
				}
			}

		}
		if (!me.isConsumed()) {
			var graph = this.graph;

			if (this.cell != null && this.first != null && this.shape != null
					&& this.currentDx != null && this.currentDy != null) {
				var scale = graph.getView().scale;
				var clone = graph.isCloneEvent(me.getEvent())
						&& graph.isCellsCloneable() && this.isCloneEnabled();
				var dx = this.currentDx / scale;
				var dy = this.currentDy / scale;

				var cell = me.getCell();

				if (this.connectOnDrop && this.target == null && cell != null
						&& graph.getModel().isVertex(cell)
						&& graph.isCellConnectable(cell)
						&& graph.isEdgeValid(null, this.cell, cell)) {
					graph.connectionHandler.connect(this.cell, cell, me
									.getEvent());
				} else {
					var target = this.target;

					if (graph.isSplitEnabled()
							&& graph.isSplitTarget(target, this.cells, me
											.getEvent())) {
						graph.splitEdge(target, this.cells, null, dx, dy);
					} else {
						var unMovable = this.cells.length == 1
								&& graph.isValidSideTarget(this.cells[0], {
											style : ""
										}, me.getEvent())
								&& this.sideTarget == null;

						if (!unMovable) {
							if (this.cells[0]) {
								var moveSideX = this.cells[0].getGeometry().x;
								var moveSideY = this.cells[0].getGeometry().y;
							}
							this.graph.getModel().beginUpdate();
							try {
								var beforeParent = this.cells[0]
										? this.cells[0].parent
										: null;
								hander.moveCells(this.cells, dx, dy, clone,
										this.target, me.getEvent());
								if (this.cells[0]
										&& this.cells[0].parent == beforeParent) {

									dx = this.cells[0].getGeometry().x
											- moveSideX;
									dy = this.cells[0].getGeometry().y
											- moveSideY;
								}
								if (this.cells && this.cells.length > 1) {
									this.graph
											.moveSideCells(this.cells, dx, dy);
								} else {
									moveSideCells();
								}
							} finally {
								this.graph.getModel().endUpdate();
							}
						}
					}
				}
			} else if (this.isSelectEnabled() && this.delayedSelection
					&& this.cell != null) {
				this.selectDelayed(me);
			}
		}

		if (this.cellWasClicked) {
			me.consume();
		}
		this.reset();
	};
	/** 插入边界节点* */
	mxGraph.prototype.insertSideNode = function(cell, target) {
		target.extension = target.extension || {};
		cell.extension = cell.extension || {};
		// 判断是否有此边界
		function getSideNodeIndex(sideNodes, cell) {
			var snLen = sideNodes.length;
			while (snLen--) {
				if (sideNodes[snLen] == cell) {
					return snLen;
				}
			}
			return -1;
		}
		var scope = this;
		// 删除原边界和目标的绑定
		function deleteSideRelation() {
			// 找到原边界节点所在的节点 并从该节点上删除当前的边界
			if (cell.extension.sideTarget) {
				var sideTargetCell = scope.getModel()
						.getCell(cell.extension.sideTarget);
				if (sideTargetCell && sideTargetCell.extension.sideNodes) {
					var deleteIndex = getSideNodeIndex(
							sideTargetCell.extension.sideNodes, cell.id);
					if (deleteIndex != -1) {
						sideTargetCell.extension.sideNodes.splice(deleteIndex,
								1);
					}
				}
			}

		}
		function moveToRealX() {
			if (cell.getGeometry().x + cell.getGeometry().width / 2 > target
					.getGeometry().x
					+ target.getGeometry().width) {
				cell.getGeometry().x = target.getGeometry().x
						- cell.getGeometry().width / 2
						+ target.getGeometry().width;
			}
		}
		function moveToRealY() {
			if (cell.getGeometry().y + cell.getGeometry().height / 2 > target
					.getGeometry().y
					+ target.getGeometry().height) {
				cell.getGeometry().y = target.getGeometry().y
						- cell.getGeometry().height / 2
						+ target.getGeometry().height;
			}
		}
		function getDirection() {
			var dx = cell.getGeometry().x, dy = cell.getGeometry().y;
			if (cell.parent != target) {
				dx = dx - target.getGeometry().x;
				dy = dy - target.getGeometry().y;
			}
			// 在元素外
			if (dy + cell.getGeometry().height / 2 < 0) {
				return "top";
			} else if (dy + cell.getGeometry().height / 2
					- target.getGeometry().height > 0) {
				return "bottom";
			} else if (dx + cell.getGeometry().width / 2 < 0) {
				return "left";
			} else if (dx + cell.getGeometry().width / 2
					- target.getGeometry().width > 0) {
				return "right";
			}
			// 在元素内
			if (dy < dx
					&& dy < target.getGeometry().width - dx
							- cell.getGeometry().width
					&& dy < target.getGeometry().height - dy
							- cell.getGeometry().height) {
				return "top";
			} else if (target.getGeometry().height - dy
					- cell.getGeometry().height < dx
					&& target.getGeometry().height - dy
							- cell.getGeometry().height < target.getGeometry().width
							- dx) {
				return "bottom";
			} else if (dx < target.getGeometry().width - dx
					- cell.getGeometry().width) {
				return "left";
			} else {
				return "right";
			}
		}
		if (target && cell) {
			target.extension.sideNodes = target.extension.sideNodes || [];
			deleteSideRelation();
			var hasNode = getSideNodeIndex(target.extension.sideNodes, cell.id) != -1;
			if (!hasNode && cell != target) {
				target.extension.sideNodes.push(cell.id);
				cell.extension.sideTarget = target.id;
				cell.extension.direction = getDirection();
				if (cell.extension.direction == "left") {
					cell.getGeometry().x = target.getGeometry().x
							- cell.getGeometry().width / 2;
					moveToRealY();
				} else if (cell.extension.direction == "right") {
					cell.getGeometry().x = target.getGeometry().x
							+ target.getGeometry().width
							- cell.getGeometry().width / 2;
					moveToRealY();
				} else if (cell.extension.direction == "top") {
					cell.getGeometry().y = target.getGeometry().y
							- cell.getGeometry().height / 2;
					moveToRealX();
				} else if (cell.extension.direction == "bottom") {
					cell.getGeometry().y = target.getGeometry().y
							- cell.getGeometry().height / 2
							+ target.getGeometry().height;
					moveToRealX();
				}
				this.orderCells(false, [cell]);
			}
		}
	}
	/** 删除节点的同时,删除该节点的边界节点* */
	mxGraphModel.prototype.remove = function(cell) {
		if (cell && cell.extension && cell.extension.sideNodes) {
			var nodesIds = cell.extension.sideNodes;
			var index = nodesIds.length;
			while (index--) {
				this.remove(this.getCell(nodesIds[index]));
			}
		}
		if (cell == this.root) {
			this.setRoot(null);
		} else if (this.getParent(cell) != null) {
			this.execute(new mxChildChange(this, null, cell));
		}

		return cell;
	};
	/** 收缩时重定位边界* */
	mxGraph.prototype.cellsFolded = function(cells, collapse, recurse,
			checkFoldable) {
		if (cells != null && cells.length > 0) {
			this.model.beginUpdate();
			try {
				for (var i = 0; i < cells.length; i++) {
					if ((!checkFoldable || this.isCellFoldable(cells[i],
							collapse))
							&& collapse != this.isCellCollapsed(cells[i])) {
						this.model.setCollapsed(cells[i], collapse);
						/** 记录边界节点在展开子流程时的相对位置* */
						if (cells[i] && cells[i].extension
								&& cells[i].extension.sideNodes) {
							var nodesIds = cells[i].extension.sideNodes;
							var index = nodesIds.length;
							while (index--) {
								var sideCell = this.getModel()
										.getCell(nodesIds[index]);
								if (collapse && sideCell) {
									var dx = cells[i].getGeometry().x
											- sideCell.getGeometry().x;
									var dy = cells[i].getGeometry().y
											- sideCell.getGeometry().y;
									sideCell.extension.distance = {
										x : dx,
										y : dy
									};
								}
							}
						}
						this.swapBounds(cells[i], collapse);

						if (this.isExtendParent(cells[i])) {
							this.extendParent(cells[i]);
						}

						if (recurse) {
							var children = this.model.getChildren(cells[i]);
							this.foldCells(children, collapse, recurse);
						}
					}
					/** 处理边界节点的位移* */
					if (cells[i] && cells[i].extension
							&& cells[i].extension.sideNodes) {
						var nodesIds = cells[i].extension.sideNodes;
						var index = nodesIds.length;
						var nodeLength = 0;// 用来记录边界个数以移动边界的位置
						while (index--) {
							var sideNode = this.getModel()
									.getCell(nodesIds[index]), dx, dy;
							if (sideNode) {
								dx = cells[i].getGeometry().x
										- sideNode.getGeometry().x
										+ sideNode.getGeometry().width
										* (nodeLength++);
								dy = cells[i].getGeometry().height
										- sideNode.getGeometry().height / 2
										+ cells[i].getGeometry().y
										- sideNode.getGeometry().y;
								if (collapse) {
									this.moveCells([sideNode], dx, dy, false,
											cells[i].parent);
								} else {
									dx = -sideNode.extension.distance.x
											+ cells[i].getGeometry().x
											- sideNode.getGeometry().x;
									dy = -sideNode.extension.distance.y
											+ cells[i].getGeometry().y
											- sideNode.getGeometry().y;
									this.moveCells([sideNode], dx, dy, false,
											cells[i].parent);
								}
							}

						}
					}
				}

				this.fireEvent(new mxEventObject(mxEvent.CELLS_FOLDED, 'cells',
						cells, 'collapse', collapse, 'recurse', recurse));
			} finally {
				this.model.endUpdate();
			}
		}
	};
	/** 合法边的颜色* */
	mxConstants.DROP_SIDE_TARGET_COLOR = "#5bc0de";
	/** 修改原始的graphHandler 以支持边界节点绘制* */
	mxGraphHandler.prototype.mouseMove = function(sender, me) {
		var graph = this.graph;
		if (!me.isConsumed() && graph.isMouseDown && this.cell != null
				&& this.first != null && this.bounds != null) {
			var point = mxUtils.convertPoint(graph.container, me.getX(), me
							.getY());
			var dx = point.x - this.first.x;
			var dy = point.y - this.first.y;
			var tol = graph.tolerance;

			if (this.shape != null || Math.abs(dx) > tol || Math.abs(dy) > tol) {
				if (this.highlight == null) {
					this.highlight = new mxCellHighlight(this.graph,
							mxConstants.DROP_TARGET_COLOR, 3);
				}

				if (this.shape == null) {
					this.shape = this.createPreviewShape(this.bounds);
				}

				var gridEnabled = graph.isGridEnabledEvent(me.getEvent());
				var hideGuide = true;

				if (this.guide != null && this.useGuidesForEvent(me)) {
					var delta = this.guide.move(this.bounds,
							new mxPoint(dx, dy), gridEnabled);
					hideGuide = false;
					dx = delta.x;
					dy = delta.y;
				} else if (gridEnabled) {
					var trx = graph.getView().translate;
					var scale = graph.getView().scale;

					var tx = this.bounds.x
							- (graph.snap(this.bounds.x / scale - trx.x) + trx.x)
							* scale;
					var ty = this.bounds.y
							- (graph.snap(this.bounds.y / scale - trx.y) + trx.y)
							* scale;
					var v = this.snap(new mxPoint(dx, dy));

					dx = v.x - tx;
					dy = v.y - ty;
				}

				if (this.guide != null && hideGuide) {
					this.guide.hide();
				}

				// Constrained movement if shift key is pressed
				if (graph.isConstrainedEvent(me.getEvent())) {
					if (Math.abs(dx) > Math.abs(dy)) {
						dy = 0;
					} else {
						dx = 0;
					}
				}

				this.currentDx = dx;
				this.currentDy = dy;
				this.updatePreviewShape();

				var target = null, sideTarget = null;
				var cell = me.getCell();
				var sideCell = me.getSideCell(this.cells, graph);
				if (graph.isDropEnabled() && this.highlightEnabled) {
					target = graph.getDropTarget(this.cells, me.getEvent(),
							cell);
				}
				if (sideCell
						&& graph.isValidSideTarget(this.cell, sideCell, me
										.getEvent())) {
					sideTarget = sideCell;
				}
				// Checks if parent is dropped into child
				var parent = sideTarget != null ? null : target;
				var model = graph.getModel();

				while (parent != null && parent != this.cells[0]) {
					parent = model.getParent(parent);
				}

				var clone = graph.isCloneEvent(me.getEvent())
						&& graph.isCellsCloneable() && this.isCloneEnabled();
				var state = graph.getView().getState(target);
				var highlight = false;
				if (sideTarget && !this.target) {
					if (this.sideTarget != sideTarget) {
						this.sideTarget = sideTarget;
					}
					state = graph.getView().getState(sideTarget);
					this.setHighlightColor(mxConstants.DROP_SIDE_TARGET_COLOR);
					parent = null;
					highlight = true;
				} else if (state != null
						&& parent == null
						&& (model.getParent(this.cell) != target || clone)
						&& (this.target != target || !sender.isValidSideTarget(
								this.cell, {
									style : "boundary"
								}, me.getEvent()))) {
					this.target = target;
					this.setHighlightColor(mxConstants.DROP_TARGET_COLOR);
					highlight = true;
				} else {
					this.target = null;
					this.sideTarget = null;
					if (this.connectOnDrop && cell != null
							&& this.cells.length == 1
							&& graph.getModel().isVertex(cell)
							&& graph.isCellConnectable(cell)) {
						state = graph.getView().getState(cell);

						if (state != null) {
							var error = graph.getEdgeValidationError(null,
									this.cell, cell);
							var color = (error == null)
									? mxConstants.VALID_COLOR
									: mxConstants.INVALID_CONNECT_TARGET_COLOR;
							this.setHighlightColor(color);
							highlight = true;
						}
					}
				}

				if (state != null && highlight) {
					this.highlight.highlight(state);
				} else {
					this.highlight.hide();
				}
			}

			me.consume();
			mxEvent.consume(me.getEvent());
		} else if ((this.isMoveEnabled() || this.isCloneEnabled())
				&& this.updateCursor && !me.isConsumed()
				&& me.getState() != null && !graph.isMouseDown) {
			var cursor = graph.getCursorForCell(me.getCell());

			if (cursor == null && graph.isEnabled()
					&& graph.isCellMovable(me.getCell())) {
				if (graph.getModel().isEdge(me.getCell())) {
					cursor = mxConstants.CURSOR_MOVABLE_EDGE;
				} else {
					cursor = mxConstants.CURSOR_MOVABLE_VERTEX;
				}
			}

			me.getState().setCursor(cursor);
			me.consume();
		}
	};
	/** 边界节点的支持* */
	mxGraph.prototype.isValidSideTarget = function(cell, target, evt) {
		return (!target || (target && (!target.style || target.style
				.indexOf("boundary=1") == -1)))
				&& cell && cell.style && cell.style.indexOf("boundary=1") != -1;
	};
	mxDragSource.prototype.getSideCell = function(cells, graph, evt) {
		return mxMouseEvent.prototype.getSideCell.apply(this, arguments);
	}
	/** 获取边界被触发的元素* */
	mxMouseEvent.prototype.getSideCell = function(cells, graph, evt) {
		if (evt) {
			this.graphX = evt.graphX;
			this.graphY = evt.graphY;
		}
		if (cells && cells.length == 1) {
			var w = cells[0].getGeometry().width, h = cells[0].getGeometry().height, nCell = graph
					.getCellAt(this.graphX - w / 2, this.graphY - h / 2), eCell = graph
					.getCellAt(this.graphX - w / 2, this.graphY + h / 2), sCell = graph
					.getCellAt(this.graphX + w / 2, this.graphY + h / 2), wCell = graph
					.getCellAt(this.graphX + w / 2, this.graphY - h / 2), sideCell;
			eCell = eCell && eCell != cells[0].parent ? eCell : null;
			wCell = wCell && wCell != cells[0].parent ? wCell : null;
			nCell = nCell && nCell != cells[0].parent ? nCell : null;
			sCell = sCell && sCell != cells[0].parent ? sCell : null;
			sideCell = nCell
					? nCell
					: (eCell ? eCell : (sCell ? sCell : wCell));
			if (sideCell && cells[0].parent == null) {
				var parent = null;
				sideCell = null;
				var dCells = [sCell, eCell, nCell, wCell];
				var cLen = dCells.length;
				while (cLen--) {
					if (dCells[cLen]
							&& (!parent || dCells[cLen].parent == sideCell)) {
						sideCell = dCells[cLen];
						parent = dCells[cLen].parent;
					}
				}
			}
			if (sideCell != cells[0]
					&& graph.isValidSideTarget(cells[0], sideCell, evt)
					&& sideCell.vertex
					&& (cells[0].parent == null || cells[0].parent == sideCell.parent)) {// &&
				return sideCell;
			} else {
				return null;
			}
		}
	}
	mxGraph.prototype.moveSideCells = function(cells, dx, dy) {
		var graph = this, cellsLen = cells ? cells.length : 0;
		var moveSideCell = function(cell, dx, dy) {
			if (cell && cell.extension && cell.extension.sideNodes) {
				if (typeof dx == "number" && typeof dy == "number") {
					var nodes = getSideNodesCell(cell);
					graph.moveCells(nodes, dx, dy, false, cell.parent);// ,
					graph.orderCells(false, nodes);
				}
			}

		}
		var getSideNodesCell = function(cell) {
			var nodes = [];
			if (cell && cell.extension) {
				var sideLen = cell.extension.sideNodes.length;
				while (sideLen--) {
					var node = graph.getModel()
							.getCell(cell.extension.sideNodes[sideLen]);
					if (node) {
						nodes.push(node);
					}
				}
			}
			return nodes;
		}
		while (cellsLen--) {
			moveSideCell(cells[cellsLen], dx, dy);
		}
		cellsLen = null;
	}
	mxGraph.prototype.moveCells = function(cells, dx, dy, clone, target, evt) {

		var realCells = [], sLen = cells ? cells.length : 0;
		if (sLen > 1) {
			while (sLen--) {
				if (!this.isValidSideTarget(cells[sLen], {
							style : ""
						})) {
					realCells.push(cells[sLen]);
				}
			}
			cells = realCells.length == 0 ? cells : realCells;
			realCells = null, sLen = null;
		}
		dx = (dx != null) ? dx : 0;
		dy = (dy != null) ? dy : 0;
		clone = (clone != null) ? clone : false;

		if (cells != null && (dx != 0 || dy != 0 || clone || target != null)) {
			this.model.beginUpdate();
			try {
				if (clone) {
					cells = this.cloneCells(cells, this.isCloneInvalidEdges());

					if (target == null) {
						target = this.getDefaultParent();
					}
				}

				var previous = this.isAllowNegativeCoordinates();

				if (target != null) {
					this.setAllowNegativeCoordinates(true);
				}

				this.cellsMoved(cells, dx, dy, !clone
								&& this.isDisconnectOnMove()
								&& this.isAllowDanglingEdges(), target == null);

				this.setAllowNegativeCoordinates(previous);

				if (target != null) {
					var index = this.model.getChildCount(target);
					this.cellsAdded(cells, target, index, null, null, true);
				}

				// Dispatches a move event
				this.fireEvent(new mxEventObject(mxEvent.MOVE_CELLS, 'cells',
						cells, 'dx', dx, 'dy', dy, 'clone', clone, 'target',
						target, 'event', evt));
			} finally {
				this.model.endUpdate();
			}
		}

		return cells;
	};
});