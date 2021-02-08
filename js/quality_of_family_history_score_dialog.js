
// var personal_information = { "id": "cf3abeed-bdd8-4bfa-a", "name": "あなた", "gender": "MALE", "date_of_birth": "1952/03/01", "prefectures": "0002", "living_prefectures": "0003", "twin_status": "NO", "adopted": "false", "month_of_birth": "3", "year_of_birth": "1952", "birth_order": "1", "dietary_frequency_to_drink_in_week": "0-2_times_or_less", "flg_race_ethnic": "1", "Health History": [{ "Disease Name": "Cancer", "Detailed Disease Name": "食道がん", "Age At Diagnosis": "early_twenties", "Disease Code": "SNOMED_CT-363402007" }], "weight_unit": "kilogram", "waist_unit": "centimeters", "hip_unit": "centimeters", "father": { "id": "960b83f5-8b5c-4585-aeee-94a71c9887fd", "name": "あなたの父", "gender": "MALE", "relationship": "father" }, "mother": { "id": "8dc1fba5-267f-4bff-a387-936ca1c878d8", "name": "あなたの母", "gender": "FEMALE", "relationship": "mother" }, "paternal_grandfather": { "id": "cfb7d150-ad43-4953-b40b-c093c3020196", "name": "あなたの父方の祖父", "gender": "MALE", "relationship": "paternal_grandfather" }, "paternal_grandmother": { "id": "5d9b01a6-21f2-46c3-ba93-e0486e76fef9", "name": "あなたの父方の祖母", "gender": "FEMALE", "relationship": "paternal_grandmother" }, "maternal_grandfather": { "id": "ed2fd10b-4851-4c64-a94d-237bad7d8971", "name": "あなたの母方の祖父", "gender": "MALE", "relationship": "maternal_grandfather" }, "maternal_grandmother": { "id": "f6a721f3-4be1-4671-a619-d0a796688352", "name": "あなたの母方の祖母", "gender": "FEMALE", "relationship": "maternal_grandmother" }, "son_0": { "id": "29f00d95-6609-47a3-90fe-1949d4a3ab68", "name": "あなたの息子ようしハイ", "gender": "MALE", "prefectures": "0002", "adopted": "true", "birth_order": "1", "training_count_for_training_at_week": "", "training_time_for_training_at_week": "", "flg_race_ethnic": "1", "relationship": "son", "is_alive": "unknown", "parent_id": "" }, "son_1": { "id": "852e6efb-9834-4313-b731-bcc4d122c362", "name": "あなたの息子", "gender": "MALE", "birth_order": "2", "relationship": "son" }, "sister_0": { "id": "2680eeed-7f12-4822-b354-a60112962048", "name": "あなたの姉妹", "gender": "FEMALE", "birth_order": "3", "relationship": "sister" }, "sister_1": { "id": "328a78ac-4b4b-4827-b634-b84a6a26f4fb", "name": "あなたの姉妹", "gender": "FEMALE", "birth_order": "4", "relationship": "sister" }, "brother_0": { "id": "e42e0eeb-b0dc-4c46-b560-d61da84b7f51", "name": "あなたの兄弟", "gender": "MALE", "birth_order": "2", "flg_race_ethnic": "1", "relationship": "brother" }, "maternal_aunt_0": { "id": "f86162d2-bfac-4474-9903-de3ae0b1d114", "name": "あなたの母方のおば", "gender": "FEMALE", "relationship": "aunt" }, "maternal_aunt_1": { "id": "7c60883a-575c-4a5d-bb33-a5956d440a2b", "name": "あなたの母方のおば", "gender": "FEMALE", "relationship": "aunt" }, "maternal_uncle_0": { "id": "4563af0b-4e89-4a57-8e70-1b3c28fa37a8", "name": "あなたの母方のおじ", "gender": "MALE", "relationship": "uncle" }, "maternal_uncle_1": { "id": "0a85dfc3-0539-415a-8f56-67a41748afaa", "name": "あなたの母方のおじ", "gender": "MALE", "relationship": "uncle" }, "paternal_aunt_0": { "id": "64542476-5687-4426-b98e-2c18ec999b00", "name": "あなたの父方のおば", "gender": "FEMALE", "relationship": "aunt" }, "paternal_aunt_1": { "id": "c581bd43-45c4-4e13-b70d-cc611be5989b", "name": "あなたの父方のおば", "gender": "FEMALE", "relationship": "aunt" }, "paternal_aunt_2": { "id": "61e8b7e3-4584-4870-8652-5cb25e57ea9a", "name": "あなたの父方のおば", "gender": "FEMALE", "relationship": "aunt" }, "paternal_aunt_3": { "id": "28c4b45f-8a0d-4712-8b5d-ec59da102e14", "name": "あなたの父方のおば", "gender": "FEMALE", "relationship": "aunt" }, "paternal_uncle_0": { "id": "0105afe7-741d-4fec-9f3f-e54ffea16dd0", "name": "あなたの父方のおじ", "gender": "MALE", "relationship": "uncle" }, "paternal_uncle_1": { "id": "1579b627-d8f7-4189-bcf8-1daf4b6fb7b3", "name": "あなたの父方のおじ", "gender": "MALE", "relationship": "uncle" } };
class QoFSupplementForm {
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
		var tbody = $("#qof_compensational_block");
		tbody.empty();
		
		// あなた
		// var selfForm = this._getSelfForm(this.pi);
		// tbody.append( selfForm );

		// 家族
		var familyForm = this._getFamilyForm(this.pi, tbody);

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
		row.append("<td class='center nowrap'>" + pi.name + "</td>");
		// 存命
		row.append(this._getIsAliveForm(pi));
		// 死亡年齢
		row.append(this._getEstimatedDeathAge(pi));
		// 死因
		row.append(this._getCauseOfDeathForm(pi));
		// 疾患有無
		row.append(this._getHasDeseaseForm(pi));
		// 病歴
		var healthHistories = $("<td class='center'></td>");
		healthHistories.append(this._getHealthHistoriesTable(pi));
		row.append(healthHistories);

		// イベントハンドラの設定
		row.find(`input:radio[name="${this._getName(QoFSupplementForm.QOF_IS_ALIVE_PREFIX, pi.id )}"]`).change( row, function(){
			// 死亡の場合、死亡年齢、死因を表示する
			if( $(this).val() == 'dead' ){
				row.find('#' + QoFSupplementForm._getId(QoFSupplementForm.QOF_ESTIMATED_DEATH_AGE_PREFIX, pi.id ) ).show();
				row.find('#' + QoFSupplementForm._getId(QoFSupplementForm.QOF_CAUSE_OF_DEATH_PREFIX, pi.id ) ).show();
				row.find('#' + QoFSupplementForm._getId(QoFSupplementForm.QOF_DETAILED_CAUSE_OF_DEATH_PREFIX, pi.id ) ).show();
				return;
			}
			row.find('#' + QoFSupplementForm._getId(QoFSupplementForm.QOF_ESTIMATED_DEATH_AGE_PREFIX, pi.id ) ).val('not_picked').hide();
			row.find('#' + QoFSupplementForm._getId(QoFSupplementForm.QOF_CAUSE_OF_DEATH_PREFIX, pi.id ) ).val('not_picked').hide();
			row.find('#' + QoFSupplementForm._getId(QoFSupplementForm.QOF_DETAILED_CAUSE_OF_DEATH_PREFIX, pi.id ) ).val('not_picked').hide();
		});
		// 値の設定
		row.find(`input:radio[name="${this._getName(QoFSupplementForm.QOF_IS_ALIVE_PREFIX, pi.id )}"][value="${( typeof pi.is_alive == 'undefined' )? 'unknown' : pi.is_alive }"]`).prop('checked',true).trigger('change');

		row.find(`input:radio[name="${this._getName(QoFSupplementForm.QOF_HAS_DESEASE_PREFIX, pi.id )}"]`).change( row, function(){
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
		row.find(`input:radio[name="${this._getName(QoFSupplementForm.QOF_HAS_DESEASE_PREFIX, pi.id )}"][value="${( typeof pi.has_desease == 'undefined' )? 'unknown' : pi.has_desease }"]`).prop('checked',true).trigger('change');


		return row;
	}

	_getHasDeseaseForm(pi){
		var ret = this._getLeftTD("");
		var prefix_id = QoFSupplementForm._getId(QoFSupplementForm.QOF_HAS_DESEASE_PREFIX, pi.id );
		var name = this._getName(QoFSupplementForm.QOF_HAS_DESEASE_PREFIX, pi.id );

		var values = [ 'with', 'without', 'unknown'];

		for( const v of values ){

			ret.append( 
					$("<span>").append(
						 $("<input type='radio'>")
								.attr('id', QoFSupplementForm._getId( prefix_id, v))
								.attr('name', name)
								.attr('value', v)
								.attr('pi_id', pi.id)
							)
						.append(
							$("<label>")
								.attr('for', QoFSupplementForm._getId( prefix_id, v) )
								.text( $.t('family-t.' + v ) )
							)
					);
		}

		return ret;
	}
	_getEstimatedDeathAge(pi){
		var ret = this._getTD("");
		var id = QoFSupplementForm._getId(QoFSupplementForm.QOF_ESTIMATED_DEATH_AGE_PREFIX, pi.id );
		var name = this._getName(QoFSupplementForm.QOF_ESTIMATED_DEATH_AGE_PREFIX, pi.id );
		
		var estimated_death_age_select = $("<select>")
											.attr('id', id)
											.attr('name', name)
											.attr('pi_id', pi.id);
		
		set_age_at_diagnosis_pulldown( $.t("fhh_js.select_age_death"), estimated_death_age_select);

		estimated_death_age_select.val( ( typeof pi.estimated_death_age == 'undefined' )? 'unknown' : pi.estimated_death_age  );

		return ret.append(estimated_death_age_select);
	}

	_getCauseOfDeathForm(pi){
		var ret = this._getTD("");
		var disease_select = $("<select>")
								.attr('id', QoFSupplementForm._getId(QoFSupplementForm.QOF_CAUSE_OF_DEATH_PREFIX, pi.id ))
								.attr('name', this._getName(QoFSupplementForm.QOF_CAUSE_OF_DEATH_PREFIX, pi.id ))
								.attr('pi_id', pi.id);

		var detailed_disease_select = $("<select>")
								.attr('id', QoFSupplementForm._getId(QoFSupplementForm.QOF_DETAILED_CAUSE_OF_DEATH_PREFIX, pi.id ))
								.attr('name', this._getName(QoFSupplementForm.QOF_DETAILED_CAUSE_OF_DEATH_PREFIX, pi.id ))
								.attr('pi_id', pi.id);
		
		var ds = set_disease_choice_select(disease_select, detailed_disease_select, "cod");
		disease_select.val( pi.cause_of_death);
		disease_select.trigger('change');
		detailed_disease_select.val( pi.cause_of_death_code);

		var table = $('<table>').append(
						$('<tbody>').append(
								$('<tr>')
									.append(this._getLeftTD(ds))
									.append(this._getLeftTD(detailed_disease_select)
							)
						)
					);

		// ret.append(detailed_disease_select);
		ret.append( table );
		return ret ;
	}

	static _getId( prefix, id ){
		return prefix + '_id_' + id ;
	}
	_getName( prefix, id ){
		return prefix + '_name_' + id ;
	}

	static QOF_HAS_DESEASE_PREFIX = "has_desease_select"
	static QOF_DETAILED_CAUSE_OF_DEATH_PREFIX = "detailed_cause_of_death_select";
	static QOF_CAUSE_OF_DEATH_PREFIX = "cause_of_death_select";
	static QOF_ESTIMATED_DEATH_AGE_PREFIX = "estimated_death_age_select";
	static QOF_IS_ALIVE_PREFIX = "qof_is_alive_select";

	_getIsAliveForm(pi){
		var ret = this._getLeftTD("");
		var prefix_id = QoFSupplementForm._getId(QoFSupplementForm.QOF_IS_ALIVE_PREFIX, pi.id );
		var name = this._getName(QoFSupplementForm.QOF_IS_ALIVE_PREFIX, pi.id );

		var values = [ 'alive', 'dead', 'unknown'];
		var translations = { alive: "info_dialog.yes", dead: "info_dialog.no" , unknown: 'info_dialog.unknown'};

		for( const v of values ){

			ret.append( 
					$("<span>").append(
						 $("<input type='radio'>")
								.attr('id', QoFSupplementForm._getId( prefix_id, v))
								.attr('name', name)
								.attr('value', v)
								.attr('pi_id', pi.id)
							)
						.append(
							$("<label>")
								.attr('for', QoFSupplementForm._getId( prefix_id, v) )
								.text( $.t(translations[ v ] ) )
							)
					);
		}


		return ret;
	}

	updatePersonalInformation( info ){
		var pi = PersonalInformationUtil.getRelationshipPiByPersonId( $(info).attr('pi_id') );

		// 存命
		pi.is_alive = $(`input[name="${this._getName(QoFSupplementForm.QOF_IS_ALIVE_PREFIX, pi.id )}"]:checked`).val();

		// 死亡年齢
		pi.estimated_death_age = $(`select[name="${this._getName(QoFSupplementForm.QOF_ESTIMATED_DEATH_AGE_PREFIX, pi.id )}"]`).val();

		// 死因
		pi.cause_of_death = $(`select[name="${this._getName(QoFSupplementForm.QOF_CAUSE_OF_DEATH_PREFIX, pi.id )}"]`).val();
		pi.cause_of_death_code = $(`select[name="${this._getName(QoFSupplementForm.QOF_DETAILED_CAUSE_OF_DEATH_PREFIX, pi.id )}"]`).val();
		pi.detailed_cause_of_death_code = $(`select[name="${this._getName(QoFSupplementForm.QOF_DETAILED_CAUSE_OF_DEATH_PREFIX, pi.id )}"]`).text();

		// 疾患有無
		pi.has_desease = $(`input[name="${this._getName(QoFSupplementForm.QOF_HAS_DESEASE_PREFIX, pi.id )}"]:checked`).val();
		
		// TODO 病歴

		// 差分表示

		

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


	_getSelfForm(pi) {
		var row = $("<tr>");
		// 	お名前
		row.append("<td class='center nowrap'>" + pi.name + "</td>");
		// 存命
		row.append("<td class='center nowrap'>-</td>");
		// 死亡年齢
		row.append("<td class='center nowrap'>-</td>");
		// 死因
		row.append("<td class='center nowrap'>-</td>");
		// TODO: 疾患有無
		row.append("<td class='center nowrap'>-</td>");

		// 病歴
		var healthHistories = $("<td class='center nowrap'></td>");
		healthHistories.append(this._getHealthHistoriesTable(pi));
		row.append(healthHistories);
		return row;
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
		}
		return table;
	}

	_getTD(contents) {
		var td = $("<td class='center '>");
		td.append(contents);
		return td;
	}

	_getLeftTD(contents) {
		var td = $("<td class='left '>");
		td.append(contents);
		return td;
	}
}
