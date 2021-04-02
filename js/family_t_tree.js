class FamilyTree {

	// コンストラクタ
	constructor(pi) {
		// 初期化
		this.initialize();

		// PIの格納
		this.pi = pi;
	}

	// 初期化
	initialize() {
		// TODO
	}

	_getSibling( src_relation_id , target_relation_id ){
		var ret = {
			source: {
				id: this.pi[src_relation_id].id,
				name: this.pi[src_relation_id].name
			},
			target: {
				id: this.pi[target_relation_id].id,
				name: this.pi[target_relation_id].name
			}
		};
		return ret;
	}

	getSiblings(){
		var siblings = [];

		// 父方祖父祖母
		siblings.push ( this._getSibling( 'paternal_grandfather', 'paternal_grandmother') );
		
		// 母方祖父祖母
		siblings.push ( this._getSibling( 'maternal_grandfather', 'maternal_grandmother') );

		// 父母
		siblings.push ( this._getSibling( 'father', 'mother') );
		return siblings;
	}

	/**
	 * pi to root node
	 */
	getRootNode() {
		var root = this._getRootNode();


		// 祖父
		root.children.push(this._getNode('paternal_grandfather'));

		// 父方
		var paternal_grand = this._getIntermediateNode('paternal_grand');
		// おじおば
		Array.prototype.push.apply( paternal_grand.children, this._getChildNodes([ 'paternal_uncle', 'paternal_aunt' ] ) );
		// 父
		Array.prototype.push.apply( paternal_grand.children, this._getChildNodes([ 'father' ] ) );
		root.children.push( paternal_grand );

		// 父方の祖母
		root.children.push(this._getNode('paternal_grandmother'));

		// 中央線
		var gen0m2 = this._getIntermediateNode('gen0m2');
		var gen0m1 = this._getIntermediateNode('gen0m1');
		// あなた
		gen0m1.children.push( this._getSelfNode());

		// 子ども
		// 孫

		// 兄弟姉妹
		Array.prototype.push.apply( gen0m1.children, this._getChildNodes([ 'brother', 'sister' ] ) );
		gen0m2.children.push( gen0m1 );
		root.children.push( gen0m2 );

		// 祖父
		root.children.push(this._getNode('maternal_grandfather'));

		// 母方
		var maternal_grand = this._getIntermediateNode('maternal_grand');
		// 母
		Array.prototype.push.apply( maternal_grand.children, this._getChildNodes([ 'mother' ] ) );
		// おじおば
		Array.prototype.push.apply( maternal_grand.children, this._getChildNodes([ 'maternal_uncle', 'maternal_aunt' ] ) );
		root.children.push( maternal_grand );	
		// 母方の祖母
		root.children.push(this._getNode('maternal_grandmother'));

		return root;
	}

	_getChildNodes(relations) {
		var ret = [];
		if (hasRelations(relations, this.pi)) {
			var relationshipIds = getRelationshipIds(relations, this.pi);
			relationshipIds.forEach(function (rid) {
				ret.push(this._getChildNode(rid));
			}, this);
		}
		return ret;
	}

	_getRootNode() {
		return {
			name: "",
			id: 1,
			hidden: true,
			no_parent: true,
			children: []
		};
	}

	_getIntermediateNode(relationship) {
		return {
			name: "",
			id: relationship,
			hidden: true,
			no_parent: true,
			children: []
		}
	}

	_getChildNode(relationship_id){
		var node = this._getNode( relationship_id );
		node.no_parent = false;
		return node;
	}

	_getSelfNode(){
		var node = {
			name: "",
			id: 1,
			hidden: true,
			no_parent: false,
			children: []
		};
		node.name = this.pi.name;
		node.id = this.pi.id;
		node.hidden = false;
		return node;
	}
	_getNode(relationship_id) {
		var node = {
			name: "",
			id: 1,
			hidden: true,
			no_parent: true,
			children: []
		};

		var pi = this.pi[relationship_id];
		node.name = pi.name;
		node.id = pi.id;
		node.hidden = false;

		return node;
	};

	draw( targetId = '#graph', displayText = false ) {
		$(targetId).empty();
		var margin = {
			top: 0,
			right: 5,
			bottom: 50,
			left: 5
		},
		width = $(targetId).width(),
		height = $(targetId).height();
		var kx = function (d) {
			return d.x - 5;
		};
		var ky = function (d) {
			return d.y - 5;
		};
		//thie place the text x axis adjust this to center align the text
		var tx = function (d) {
			return d.x - 20;
		};
		//thie place the text y axis adjust this to center align the text
		var ty = function (d) {
			return d.y + 5;
		};
		//make an SVG
		var svg = d3.select(targetId).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + (margin.top - 50 ) + ")");


		var root = this.getRootNode();
		var allNodes = flatten(root);
		//This maps the siblings together mapping uses the ID using the blue line
		var siblings = [];

		siblings = this.getSiblings();

		var tree = d3.layout.tree().size([width, height]),
			nodes = tree.nodes(root),
			links = tree.links(nodes);

		// Create the link lines.
		svg.selectAll(".link")
			.data(links)
			.enter().append("path")
			.attr("class", "link")
			.attr("d", elbow);

		var rectWidth = function (d){
			return d.name.length * 18;
		}

		var nodes = svg.selectAll(".node")
			.data(nodes)
			.enter();

		//First draw sibling line with blue line
		svg.selectAll(".sibling")
			.data(siblings)
			.enter().append("path")
			.attr("class", "sibling")
			.attr("d", sblingLine);

		// Create the node rectangles.
		nodes.append("rect")
			.attr("class", "node")
			.attr("height", 10)
			.attr("width", 10)
			// .attr("width", rectWidth)
			.attr("id", function (d) {
				return d.id;
			})
			.attr("display", function (d) {
				if (d.hidden) {
					return "none"
				} else {
					return ""
				};
			})
			.attr("x", kx)
			.attr("y", ky);

		if( displayText ){
			// nodes.append("rect")
			// .attr("width", rectWidth);
			// Create the node text label.
			// nodes.append("text")
			// 	.text(function (d) {
			// 		return d.name;
			// 	})
			// 	.attr("x", tx)
			// 	.attr("y", ty);
		}


		/**
		This defines teh line between siblings.
		**/
		function sblingLine(d, i) {
			//start point
			var start = allNodes.filter(function (v) {
				if (d.source.id == v.id) {
					return true;
				} else {
					return false;
				}
			});
			//end point
			var end = allNodes.filter(function (v) {
				if (d.target.id == v.id) {
					return true;
				} else {
					return false;
				}
			});
			//define teh start coordinate and end co-ordinate
			var linedata = [{
				x: start[0].x,
				y: start[0].y
			}, {
				x: end[0].x,
				y: end[0].y
			}];
			var fun = d3.svg.line().x(function (d) {
				return d.x;
			}).y(function (d) {
				return d.y;
			}).interpolate("linear");
			return fun(linedata);
		}

		/*To make the nodes in flat mode.
		This gets all teh nodes in same level*/
		function flatten(root) {
			var n = [],
				i = 0;

			function recurse(node) {
				if (node.children) node.children.forEach(recurse);
				if (!node.id) node.id = ++i;
				n.push(node);
			}
			recurse(root);
			return n;
		}
		/** 
		This draws the lines between nodes.
		**/
		function elbow(d, i) {
			if (d.target.no_parent) {
				return "M0,0L0,0";
			}
			var diff = d.source.y - d.target.y;
			//0.40 defines the point from where you need the line to break out change is as per your choice.
			var ny = d.target.y + diff * 0.40;

			var linedata = [{
				x: d.target.x,
				y: d.target.y
			}, {
				x: d.target.x,
				y: ny
			}, {
				x: d.source.x,
				y: d.source.y
			}]

			var fun = d3.svg.line().x(function (d) {
				return d.x;
			}).y(function (d) {
				return d.y;
			}).interpolate("step-after");
			return fun(linedata);
		}

	}
}


