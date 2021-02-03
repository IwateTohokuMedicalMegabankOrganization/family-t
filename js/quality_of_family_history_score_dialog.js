
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
		var tbody = $("#qofList");
		tbody.empty();
		tbody.append(this._getForm(this.pi));
	}

	_getForm(pi) {
		var html;

		// あなた
		html = this._getSelfForm(pi);

		// 家族

		return html;
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


		// 病気病気詳細発症年齢
		var healthHistories = $("<td class='center nowrap'></td>");

		var table = $("<table>");
		table.append(build_hi_data_entry_row());

		
		var data_entry_row = table.find("#health_data_entry_row");

		if (pi['Health History'] != null) {
			current_health_history = pi['Health History'];
			for (var i=0; i<current_health_history.length;i++) {
				var new_row = create_disease_row(
						i,
						current_health_history[i]['Disease Name'],
						current_health_history[i]['Detailed Disease Name'],
						current_health_history[i]['Age At Diagnosis'],
						current_health_history[i]['Disease Code']);
				data_entry_row.before(new_row);
			}
		}
		healthHistories.append(table);
		// healthHistories.append(this._getHealthHistoriesForm(pi));
		row.append(healthHistories);
		return row;
	}

	_getTD(contents) {
		var td = $("<td class='center nowrap'>");
		td.append(contents);
		return td;
	}

	_getHealthHistoriesForm(pi) {
		var hi_data_entry_row = $("<div>");

		var disease_select = $("<select class='col s6' id='disease_choice_select' name='disease_choice_select'></select>");

		var detailed_disease_select = $("<select class='ddcs col s6' tabindex='18' id='detailed_disease_choice_select' name='detailed_disease_choice_select' style='margin: auto;'></select>");
		set_disease_choice_select(disease_select, detailed_disease_select);

		hi_data_entry_row.append(disease_select).append(detailed_disease_select);

		var age_at_diagnosis_select = $("<select class='col s12' name='age_at_diagnosis_select' id='age_at_diagnosis_select'></select>");
		set_age_at_diagnosis_pulldown($.t("fhh_js.age_at_diagnosis_select"), age_at_diagnosis_select);

		hi_data_entry_row.append(age_at_diagnosis_select);

		var add_new_disease_button = $("<button id='add_new_disease_button' name='Add' value='Add' class='btn-small waves-effect waves-light teal lighten-1'>" + $.t("fhh_js.add") + "</button>");
		add_new_disease_button.on('click', add_disease);

		hi_data_entry_row.append($("<td style='text-align:center;'></td>").append(add_new_disease_button));

		return hi_data_entry_row;
	}

}

function build_qof_family_history_data_table() {


	// Self 
	tbody.append(getQofListRow(personal_information, true));

	// Brother and sister
	if (hasRelations(['brother', 'sister'], personal_information)) {
		displayRelationshipsForQof(tbody, ['brother', 'sister'], personal_information);
	}

	// parents
	if (typeof personal_information.father != "undefined")
		displayRelationshipsForQof(tbody, ['father'], personal_information);

	if (typeof personal_information.mother != "undefined")
		displayRelationshipsForQof(tbody, ['mother'], personal_information);

	// children
	if (hasRelations(['son', 'daughter'], personal_information)) {
		displayRelationshipsForQof(tbody, ['son', 'daughter'], personal_information);
	}

	// おい（甥）・めい（姪）
	if (hasRelations(['niece', 'nephew'], personal_information)) {
		displayRelationshipsForQof(tbody, ['niece', 'nephew'], personal_information);
	}

	// 父方 おじ・おば
	if (hasRelations(['paternal_uncle', 'paternal_aunt'], personal_information)) {
		displayRelationshipsForQof(tbody, ['paternal_uncle', 'paternal_aunt'], personal_information);
	}

	// 母方 おじ・おば
	if (hasRelations(['maternal_uncle', 'maternal_aunt'], personal_information)) {
		displayRelationshipsForQof(tbody, ['maternal_uncle', 'maternal_aunt'], personal_information);
	}

	// 父方 祖父母
	if (hasRelations(['paternal_grandfather', 'paternal_grandmother'], personal_information)) {
		displayRelationshipsForQof(tbody, ['paternal_grandfather'], personal_information);
		displayRelationshipsForQof(tbody, ['paternal_grandmother'], personal_information);
	}

	// 母方 祖父母
	if (hasRelations(['maternal_grandfather', 'maternal_grandmother'], personal_information)) {
		displayRelationshipsForQof(tbody, ['maternal_grandfather'], personal_information);
		displayRelationshipsForQof(tbody, ['maternal_grandmother'], personal_information);
	}

	// 父方 いとこ
	if (hasRelations(['paternal_cousin', 'paternal_halfbrother', 'paternal_halfsister'], personal_information)) {
		displayRelationshipsForQof(tbody, ['paternal_cousin', 'paternal_halfbrother', 'paternal_halfsister'], personal_information);
	}

	// 母方 いとこ
	if (hasRelations(['maternal_cousin', 'maternal_halfbrother', 'maternal_halfsister'], personal_information)) {
		displayRelationshipsForQof(tbody, ['maternal_cousin', 'maternal_halfbrother', 'maternal_halfsister'], personal_information);
	}

	// 孫
	if (hasRelations(['grandson', 'granddaughter'], personal_information)) {
		displayRelationshipsForQof(tbody, ['grandson', 'granddaughter'], personal_information);
	}
}

function displayRelationshipsForQof(table, relations, pi) {
	// get relation id
	var displayRelationshipIds = getRelationshipIds(relations, pi);

	// display
	displayRelationshipIds.forEach(function (tr) {
		add_new_qof_row(table, pi[tr]);
	});
}

function add_new_qof_row(table, family_member) {
	table.append(getQofListRow(family_member, false));
}
function getQofList_is_alive(id, is_alive) {

	var radio_id = 'qof_radio_id_' + id;
	var radio_name = 'qof_radio_name_' + id;

	var ret = "<span>";
	ret += '<input id="' + radio_id + '_alive" ' + 'name="' + radio_name + '" value="alive" type="radio" />';
	ret += '<label for="' + radio_id + '_alive"' + ">" + $.t("info_dialog.yes") + "</label>";
	ret += "</span>";

	ret += '<span>'
	ret += '<input id="' + radio_id + '_dead" ' + 'name="' + radio_name + '" value="dead" type="radio" />';
	ret += '<label for="' + radio_id + '_dead"' + ">" + $.t("info_dialog.no") + "</label>";
	ret += '</label>'
	ret += "</span>";

	ret += '<span>'
	ret += '<input id="' + radio_id + '_unknown" ' + 'name="' + radio_name + '" value="unknown" type="radio" />';
	ret += '<label for="' + radio_id + '_unknown"' + ">" + $.t("info_dialog.unknown") + "</label>";
	ret += '</label>'
	ret += "</span>";

	return ret;
}

function getQofListRow(pi, is_self) {

	console.log(is_self);
	var row = $("<tr>");

	// 	お名前
	row.append("<td class='center nowrap'>" + pi.name + "</td>");

	if (is_self) {
		// 存命
		row.append("<td class='center nowrap'>-</td>");
		// 死亡年齢
		row.append("<td class='center nowrap'>-</td>");
		// 死因
		row.append("<td class='center nowrap'>-</td>");
	} else {
		// 存命
		row.append("<td class='center nowrap'>" + getQofList_is_alive(pi.id, pi.is_alive) + "</td>");
		// 死亡年齢
		row.append("<td class='center nowrap'>" + getDisplayAge(pi) + "</td>");
		// 死因
		row.append("<td class='center nowrap'>-</td>");
	}
	// 疾患有無
	row.append("<td class='center nowrap'>-</td>");
	// 病気
	row.append("<td class='center nowrap'>" + getHealthHistoriesCol(pi["Health History"], pi) + "</td>");

	// 病気詳細
	row.append("<td class='center nowrap'>-</td>");

	// 発症年齢
	row.append("<td class='center nowrap'>-</td>");

	return row;
}
