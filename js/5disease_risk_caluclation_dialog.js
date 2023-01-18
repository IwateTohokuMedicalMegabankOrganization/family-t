/**
 * 5大疾患リスクの計算
 */
class FdrSupplementForm {
	constructor(pi) {
		// PIの格納
		this.pi = pi;

		// 初期化
		this.initialize();
	}

	// 初期化
	initialize() {
		this.refresh();
	}

	refresh() {
		// 本人
        var tbodyOwn = $("#5dr_compensational_block_own");
		tbodyOwn.empty();
        this._getOwnForm(this.pi, tbodyOwn);

        // 家族
        var tbody = $("#5dr_compensational_block");
		tbody.empty();
        this._getFamilyForm(this.pi, tbody);
	}

	_getOwnHHForm(table, pi) {
		table.append(this._getHealthHistoryForm(pi));
	}

    _getHealthHistoryForm(pi) {

		var row = $("<tr>");

		// フォームの生成
		// 疾患有無
		row.append(this._getHasDeseaseForm(pi));
		// 病歴
		var healthHistories = $("<td class='center' style='border-top: dashed 1px gray;'></td>");
		healthHistories.append(this._getOwnHealthHistoriesTable(pi));
		row.append(healthHistories);

        // 病歴のイベントハンドラ
		row.find(`input:radio[name="${this._getName(FdrSupplementForm.FDR_HAS_DESEASE_PREFIX, pi.id )}"]`).change( row, function(){
			// 疾患アリの場合、病歴登録フォームを表示する
			if( $(this).val() == 'with'){
				row.find('.health_histories' ).show();
				return;
			}
			// 疾患なしの場合、病歴登録フォームを非表示にする
			// 疾患不明の場合、病歴登録フォームを非表示にする
			row.find('.health_histories').hide();
		});
		// 値の設定
		row.find(`input:radio[name="${this._getName(FdrSupplementForm.FDR_HAS_DESEASE_PREFIX, pi.id )}"][value="${healthHistoryValue() }"]`).prop('checked',true).trigger('change');


		return row;

		function healthHistoryValue() {
			var healthHistory =	pi['Health History'];
			// Healthy
			if( healthHistory.length == 1 && healthHistory[0]['Disease Name'] == 'Healthy' ){
				return "without";
			}

			// Unknown
			if( healthHistory.length < 1 )
				return "unknown";

			// Unknown
			for (var i = 0; i < healthHistory.length; i++) {
				if( healthHistory[i]['Disease Name'] == 'Unknown' ){
					return "unknown";
				}
			}

			// Has desease
			return "with";
		}
	}

    _getRelationshipsForm(table, relations, pi) {
		var displayRelationshipIds = getRelationshipIds(relations, pi);
	
		displayRelationshipIds.forEach(function (tr) {
			table.append(this._getRelationshipForm(pi[tr]));
		}, this);
	}

	_getRelationshipForm(pi) {

		var row = $("<tr>");

		// フォームの生成
		// 	お名前
		row.append("<td style='border-top: dashed 1px gray;'>" + pi.name + "</td>");
		// 疾患有無
		row.append(this._getHasDeseaseForm(pi));
		// 病歴
		var healthHistories = $("<td class='center' style='border-top: dashed 1px gray;'></td>");
		healthHistories.append(this._getHealthHistoriesTable(pi));
		row.append(healthHistories);

        // 病歴のイベントハンドラ
		row.find(`input:radio[name="${this._getName(FdrSupplementForm.FDR_HAS_DESEASE_PREFIX, pi.id )}"]`).change( row, function(){
			// 疾患アリの場合、病歴登録フォームを表示する
			if( $(this).val() == 'with'){
				row.find('.health_histories' ).show();
				return;
			}
			// 疾患なしの場合、病歴登録フォームを非表示にする
			// 疾患不明の場合、病歴登録フォームを非表示にする
			row.find('.health_histories').hide();
		});
		// 値の設定
		row.find(`input:radio[name="${this._getName(FdrSupplementForm.FDR_HAS_DESEASE_PREFIX, pi.id )}"][value="${healthHistoryValue() }"]`).prop('checked',true).trigger('change');


		return row;

		function healthHistoryValue() {
			var healthHistory =	pi['Health History'];
			// Healthy
			if( healthHistory.length == 1 && healthHistory[0]['Disease Name'] == 'Healthy' ){
				return "without";
			}

			// Unknown
			if( healthHistory.length < 1 )
				return "unknown";

			// Unknown
			for (var i = 0; i < healthHistory.length; i++) {
				if( healthHistory[i]['Disease Name'] == 'Unknown' ){
					return "unknown";
				}
			}

			// Has desease
			return "with";
		}
	}

	_getHasDeseaseForm(pi){
		var ret = this._getLeftTD("");
		var prefix_id = FdrSupplementForm._getId(FdrSupplementForm.FDR_HAS_DESEASE_PREFIX, pi.id );
		var name = this._getName(FdrSupplementForm.FDR_HAS_DESEASE_PREFIX, pi.id );

		var values = [ 'without', 'unknown', 'with'];
		var translations = { without: "family-t.without" , unknown: 'info_dialog.unknown', with: "family-t.with"};

		for( const v of values ){

			ret.append( 
					$("<div>").append(
						 $("<input type='radio'>")
								.attr('id', FdrSupplementForm._getId( prefix_id, v))
								.attr('name', name)
								.attr('value', v)
								.attr('pi_id', pi.id)
							)
						.append(
							$("<label>")
								.attr('for', FdrSupplementForm._getId( prefix_id, v) )
								.text( $.t(translations[ v ] ) )
							)
					);
		}

		return ret;
	}
	
	static _getId( prefix, id ){
		return prefix + '_id_' + id ;
	}
	_getName( prefix, id ){
		return prefix + '_name_' + id ;
	}

	static FDR_HAS_DESEASE_PREFIX = "has_desease_select"
	
	updatePersonalInformation( info ){
		var pi = PersonalInformationUtil.getRelationshipPiByPersonId( $(info).attr('pi_id') );

		// 疾患有無
		var checkedRadioButton = $(`input[name="${this._getName(FdrSupplementForm.FDR_HAS_DESEASE_PREFIX, pi.id )}"]:checked`);
		var has_disease = checkedRadioButton.val();
		if(has_disease=='without'){
			// 健康をpiに追加する
			var specific_health_issue = {
				"Age At Diagnosis":'blank',
				"Detailed Disease Name":'Healthy',
				"Disease Code":'FAMILY_T-HEALTHY',
				"Disease Name":'Healthy'
			};
			// 健康で更新するため、病歴の配列を空にしてから追加する。
			pi["Health History"].length = 0;
			pi["Health History"].push(specific_health_issue);
			
			// 表示の初期化
			this._refreshPersonalHealthHistory(checkedRadioButton, pi);
			checkedRadioButton.parent().parent().parent().find(".health_histories").hide();
		}
		if(has_disease=='unknown'){		
			// 病歴を初期化	
			pi["Health History"].length = 0;
			// 表示の初期化
			this._refreshPersonalHealthHistory(checkedRadioButton, pi);
			checkedRadioButton.parent().parent().parent().find(".health_histories").hide();
		}
		if(has_disease=='with'){
			checkedRadioButton.parent().parent().parent().find(".health_histories").show();
		}

		// 病歴
		// 病歴は、登録ボタンのイベントadd_diseaseで登録されているのでここでは実装しない。fhh.jsのfunction add_disease()

		// 差分表示

	}

	_refreshPersonalHealthHistory(checkedRadioButton, pi){
		var healthHistories = checkedRadioButton.parent().parent().parent().find(".health_data_entry_row");
		var parentsOfhealthHistories = healthHistories.parent().parent().empty();
		parentsOfhealthHistories.append(this._getHealthHistoriesTable(pi));
	}

	_getOwnForm(pi, tbody) {

		// Brother and sister
		this._getOwnHHForm(tbody, pi);
	}

    _getFamilyForm(pi, tbody) {

		// Brother and sister
		if (hasRelations(['brother', 'sister'], pi)) {
			this._getRelationshipsForm(tbody, ['brother', 'sister'], pi);
		}

		// parents
		if (typeof personal_information.father != "undefined")
			this._getRelationshipsForm(tbody, ['father'], pi);

		if (typeof personal_information.mother != "undefined")
			this._getRelationshipsForm(tbody, ['mother'], pi);

		// children
		if (hasRelations(['son', 'daughter'], pi)) {
			this._getRelationshipsForm(tbody, ['son', 'daughter'], pi);
		}

		// おい（甥）・めい（姪）
		if (hasRelations(['niece', 'nephew'], pi)) {
			this._getRelationshipsForm(tbody, ['niece', 'nephew'], pi);
		}

		// 父方 おじ・おば
		if (hasRelations(['paternal_uncle', 'paternal_aunt'], pi)) {
			this._getRelationshipsForm(tbody, ['paternal_uncle', 'paternal_aunt'], pi);
		}

		// 母方 おじ・おば
		if (hasRelations(['maternal_uncle', 'maternal_aunt'], pi)) {
			this._getRelationshipsForm(tbody, ['maternal_uncle', 'maternal_aunt'], pi);
		}

		// 父方 祖父母
		if (hasRelations(['paternal_grandfather', 'paternal_grandmother'], pi)) {
			this._getRelationshipsForm(tbody, ['paternal_grandfather'], pi);
			this._getRelationshipsForm(tbody, ['paternal_grandmother'], pi);
		}

		// 母方 祖父母
		if (hasRelations(['maternal_grandfather', 'maternal_grandmother'], pi)) {
			this._getRelationshipsForm(tbody, ['maternal_grandfather'], pi);
			this._getRelationshipsForm(tbody, ['maternal_grandmother'], pi);
		}

		// 父方 いとこ
		if (hasRelations(['paternal_cousin', 'paternal_halfbrother', 'paternal_halfsister'], pi)) {
			this._getRelationshipsForm(tbody, ['paternal_cousin', 'paternal_halfbrother', 'paternal_halfsister'], pi);
		}

		// 母方 いとこ
		if (hasRelations(['maternal_cousin', 'maternal_halfbrother', 'maternal_halfsister'], pi)) {
			this._getRelationshipsForm(tbody, ['maternal_cousin', 'maternal_halfbrother', 'maternal_halfsister'], pi);
		}

		// 孫
		if (hasRelations(['grandson', 'granddaughter'], pi)) {
			this._getRelationshipsForm(tbody, ['grandson', 'granddaughter'], pi);
		}
	}

	_getOwnHealthHistoriesTable(pi) {
		var table = $("<table class='health_histories'>");
		table.append(build_hi_data_entry_row());
		var data_entry_row = table.find(".health_data_entry_row").first();
		// 元に含まれる病歴
		if (pi['Health History'] != null) {
			current_health_history = pi['Health History'];
			for (var i = 0; i < current_health_history.length; i++) {
				var new_row = create_disease_row(
					i,
					current_health_history[i]['Disease Name'],
					current_health_history[i]['Detailed Disease Name'],
					current_health_history[i]['Age At Diagnosis'],
					current_health_history[i]['Disease Code']);
				data_entry_row.before(new_row);
			}
			if(current_health_history.length != 0 && current_health_history[0]["Disease Name"]=='Healthy'){
				table.find(".health_data_entry_row").last().hide();
			}
		}	
		return table;
	}

    _getHealthHistoriesTable(pi) {
		var table = $("<table class='health_histories'>");
		table.append(build_hi_data_entry_row());
		var data_entry_row = table.find(".health_data_entry_row").first();
		// 元に含まれる病歴
		if (pi['Health History'] != null) {
			current_health_history = pi['Health History'];
			for (var i = 0; i < current_health_history.length; i++) {
				var new_row = create_disease_row(
					i,
					current_health_history[i]['Disease Name'],
					current_health_history[i]['Detailed Disease Name'],
					current_health_history[i]['Age At Diagnosis'],
					current_health_history[i]['Disease Code']);
				data_entry_row.before(new_row);
			}
			if(current_health_history.length != 0 && current_health_history[0]["Disease Name"]=='Healthy'){
				table.find(".health_data_entry_row").last().hide();
			}
		}	
		return table;
	}

	_getTD(contents) {
		var td = $("<td style='border-top: dashed 1px gray;'>");
		td.append(contents);
		return td;
	}

	_getLeftTD(contents) {
		var td = $("<td style='border-top: dashed 1px gray;'>");
		td.append(contents);
		return td;
	}
}