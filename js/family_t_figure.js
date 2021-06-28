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
        $(targetId).append(this._draw('祖父母世代', this._getNumberOfRelationship(['maternal_grandfather', 'maternal_grandmother', 'paternal_grandfather',  'paternal_grandmother'] ) ));

        // 親世代
        $(targetId).append(this._draw('親世代', this._getNumberOfRelationship(['paternal_uncle', 'paternal_aunt', 'father',  'maternal_uncle', 'maternal_aunt', 'mother'] ) ) );

        // 自分の世代
        $(targetId).append(this._draw('あなたの世代', this._getNumberOfRelationship(['brother', 'sister'] ) )) ;

        // 子ども世代
        $(targetId).append(this._draw('子ども世代', this._getNumberOfRelationship(['son', 'daughter'] )));

        // 孫世代
        $(targetId).append(this._draw('孫世代', this._getNumberOfRelationship([ 'grandson', 'granddaughter'] )));

        // 動的描画部分の翻訳
		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});

        // イベント
        // クリック
        $(targetId + " .cursor_pointer").unbind().on('click', function(){
            PersonalInformationUtil.openFamilyMemberHealthHistoryDialog( this );
        });

        // ツールチップ
        $(targetId + " .tooltipped").tooltip();
    }

    _getNumberOfRelationship( relationshipIds ){
        return this._getChildNodes(relationshipIds);
    }

    _draw(label, persons) {
        var ret = $('<div>');
        var label = this._generateLabel(label);
        ret.append(label);

        var icons = $('<div>').addClass('col s12');

        persons.forEach(function( person ){
            var fig = $('<i>').addClass('material-icons green-text tooltipped cursor_pointer').css('opacity', person.opacity ).text('person')
            .attr('data-position', 'bottom').attr('data-tooltip', person.name)
            .attr('relationship_id', person.relationship_id);
            icons.append(fig);
        });

        ret.append(icons);
        return ret;
    }

    _generateLabel(labelName){
        var labelSpan = $('<span>').addClass('translate').attr('data-i18n', this._getTranslate(labelName)).text(labelName);
        var labelDiv = $('<div>').addClass('col s12').append(labelSpan);
        return labelDiv;
    }

    _getTranslate(labelName){
        var ret = '';
        switch(labelName){
            case '祖父母世代':   ret = 'family-t_number_of_families_by_generation.grandparents'; break;
            case '親世代':       ret = 'family-t_number_of_families_by_generation.parents'; break;
            case 'あなたの世代': ret = 'family-t_number_of_families_by_generation.you'; break;
            case '子ども世代':   ret = 'family-t_number_of_families_by_generation.children'; break;
            case '孫世代':       ret = 'family-t_number_of_families_by_generation.grandchildren'; break;
        }
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
			children: [],
            relationship_id: ""
		};

		var pi = this.pi[relationship_id];
		node.name = pi.name;
		node.id = pi.id;
		node.hidden = false;
		node.opacity = this._getOpacity(pi);
        node.relationship_id = relationship_id;

		return node;
	};

    _getOpacity( pi ){
        return (new ColorIntensityCalculator( pi )).getOpacity();
    }

}