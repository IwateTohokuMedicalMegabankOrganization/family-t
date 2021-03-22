class GenerationalFamilyMembers {

    // コンストラクタ
    constructor(pi) {
        // 初期化
        this.initialize();

        // PIの格納
        this.pi = pi;
    }

    // 初期化処理
    initialize() {
    }

    draw(targetId = '#graph', displayText = false) {
        $(targetId).empty();
        // 祖父母世代
        $(targetId).append(this._draw('祖父母世代', 4));

        // 親世代
        $(targetId).append(this._draw('親世代', this._getNumberOfParentsGenerations()));

        // 自分の世代
        $(targetId).append(this._draw('あなたの世代', this._getNumberOfSelfGenerations()));

        // 子ども世代
        $(targetId).append(this._draw('子ども世代', this._getNumberOfChildGenerations()));

        // 孫世代
        $(targetId).append(this._draw('孫世代', this._getNumberOfGrandchildGenerations()));
    }

    _getNumberOfParentsGenerations(){
        return this._getNumberOfRelationship(['paternal_uncle', 'paternal_aunt', 'father',  'maternal_uncle', 'maternal_aunt', 'mother'] ).length;
    }

    _getNumberOfSelfGenerations(){
        return this._getNumberOfRelationship(['brother', 'sister'] ).length;
    }

    _getNumberOfChildGenerations(){
        return this._getNumberOfRelationship(['son', 'daughter'] ).length;
    }
    _getNumberOfGrandchildGenerations(){
        return this._getNumberOfRelationship([ 'grandson', 'granddaughter'] ).length;
    }
    _getNumberOfRelationship( relationshipIds ){
        return this._getChildNodes(relationshipIds);
    }

    _draw(label, persons) {
        var ret = $('<div>');
        var label = $('<div>').addClass('col s12').text(label);
        ret.append(label);

        var icons = $('<div>').addClass('col s12');
        for (let index = 0; index < persons; index++) {
            var fig = $('<i>').addClass('material-icons green-text').text('person');
            icons.append(fig);
        }
        ret.append(icons);
        return ret;
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
	_getChildNode(relationship_id){
		var node = this._getNode( relationship_id );
		node.no_parent = false;
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

}