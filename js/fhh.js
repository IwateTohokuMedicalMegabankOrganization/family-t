var personal_information = null;
var created_datetime = null;
var current_health_history = [];
var current_relationship = "Self";

var diseases;
var isiPad = navigator.userAgent.match(/iPad/i) != null;
class TemporarilyHoldCareTaker {
	mementos = {};
    add(key, memento) {
		this.mementos[key] = $.extend( true, {}, memento);
    }
 
    get(key) {
        return this.mementos[key];
	}  

	paste(key) {
		return  $.extend( true, {} , this.mementos[key]); 
    }
}
var temporarilyHoldCareTaker = new TemporarilyHoldCareTaker();

const default_diseases_list = [
		"not_picked",
		"Cancer",
		"Clotting Disorder",
		"Dementia/Alzheimers",
		"Diabetes",
		"Gastrointestinal Disorder",
		"Heart Disease",
		"High Cholesterol",
		"Hypertension",
		"Kidney Disease",
		"Lung Disease",
		"Osteoporosis",
		"Psychological Disorder",
		"Septicemia",
		"Stroke/Brain Attack",
		"Sudden Infant Death Syndrome",
		"Unknown Disease"
];

// birth order and relationship
const birthOrderRelations = {
		 "self" : [ "brother", "sister", "self"]
		 , "paternal" : [ "paternal_uncle", "paternal_aunt", "father" ]
		 , "maternal" : [ "maternal_uncle", "maternal_aunt", "mother" ]
		 , "children" : [ "son", "daughter" ]
		 };


const relationToGroup  = [
	{
		"group" : "self"
		,"relation" : "self"
	},
	{
		"group" : "self"
		,"relation" : "brother"
	},
	{
		"group" : "self"
		,"relation" : "sister"
	},
	{
		"group" : "paternal"
		,"relation" : "paternal_uncle"
	},
	{
		"group" : "paternal"
		,"relation" : "paternal_aunt"
	},
	{
		"group" : "paternal"
		,"relation" : "father"
	},
	{
		"group" : "maternal"
		,"relation" : "maternal_uncle"
	},
	{
		"group" : "maternal"
		,"relation" : "maternal_aunt"
	},
	{
		"group" : "maternal"
		,"relation" : "mother"
	},
	{
		"group" : "children"
		,"relation" : "son"
	},
	{
		"group" : "children"
		,"relation" : "daughter"
	},
];

function limitMaxLength( value, maxLength ){

	if(value.length > maxLength )
		value=value.slice(0,maxLength);

	return value;
}


class BirthOrderUtil {


	static _getRelationGroup( relation ){

		var ret = "";
		relationToGroup.forEach( function( v ){
			if( relation.startsWith( v.relation ) ){
				ret = v.group;
			}
		});

		return ret;
	}

	// targetRelation self, paternal,
	// currentTarget self, or sister,
	static ResortBirthOrder( personal_information, currentTarget, isUp ){

		// pi から関係のある人のrelationship名を取得する
		var relationships = [];

		var targetRelation = BirthOrderUtil._getRelationGroup( currentTarget );
		if( targetRelation == "" ) return;

		if( targetRelation == "self") relationships.push( "self" );

		Object.keys( personal_information ).forEach(function( r ) {
			birthOrderRelations[ targetRelation ].forEach( function( tr ) {
				if( r.startsWith( tr ) )
					relationships.push( r );
			});
		});


		// relationship名から現在のbirthOrderを取得する
		// birth_order が設定されていない人は一番後ろに足す
		var kv = [];
		relationships.forEach(function(value) {

			var pi = {};
			// あなた
			if( value == "self" ){
				pi = personal_information;
			}else{
				pi = personal_information[value];
			}

			if( !BirthOrderUtil._hasBirthOrder( pi ) )
			{
				kv.push ({
					"relation" : value,
					"org_birth_order" : BirthOrderUtil._maxOrgBirthOrder(kv) + 1
				});

			}else{
				kv.push ({
					"relation" : value,
					"org_birth_order" : pi.birth_order
				});
			}
		});

		// 出生順のユニークリストを作成する
		var uniqList = Array.from( new Set( kv.map( x => x.org_birth_order ) ) );

		// 重複していたら 重複リスト + 1 を 2nd order にする
		uniqList.forEach( function(dv){
			var i = 1;
			kv.forEach( function( targetKv ){
				if( targetKv.org_birth_order == dv ){
					targetKv.new_birth_order = i;
					i++;
				}
				// currentTargetを最優先する。
				if( targetKv.relation == currentTarget )
					targetKv.new_birth_order = (isUp) ? 99:0;
			});
		});


		// 並べ替える
		// 第1ソートキー org_birth_order
		// 第2ソートキー new_birth_order
		kv.sort(function(a,b){
		    if(a.org_birth_order < b.org_birth_order) return -1;
		    if(a.org_birth_order > b.org_birth_order) return 1;

		    if(a.new_birth_order < b.new_birth_order) return -1;
		    if(a.new_birth_order > b.new_birth_order) return 1;

		    return 0;
		})

		// birth_order決定

		var i = 1;
		kv.forEach( function( targetKv ){
			targetKv.birth_order = i;
			i++;
		});

		console.log( kv );

		// personal_information に反映
		kv.forEach( function( targetKv ){
			if( targetKv.relation == "self" ){
				personal_information.birth_order = targetKv.birth_order;
			}else{
				personal_information[ targetKv.relation ].birth_order = targetKv.birth_order;
			}
		});
	}

	static _hasBirthOrder( pi ){
		if(typeof pi.birth_order == "undefined")
			return false;

		if( isNaN(pi.birth_order) )
			return false;

		return true;
	}

	static _maxOrgBirthOrder( kv ){

		return Math.max.apply(null, kv .map(function(o){return o.org_birth_order;}))
	}

	static _minOrgBirthOrder( kv ){
		return Math.min.apply(null, kv .map(function(o){return o.org_birth_order;}))
	}
}

class PersonalInformationUtil {

	static getRelationshipIdByPersonId( id ){
		var ret = "";
		
		
		Object.keys( personal_information ).forEach(function( r ) {
				if( personal_information[r] != null ) 
					if( personal_information[r].hasOwnProperty('id') )
						if( personal_information[r].id == id )
							ret = r;
			});
		return ret ;
	}

	static getRelationshipPiByPersonId( id ){
		return personal_information[PersonalInformationUtil.getRelationshipIdByPersonId(id)];
	}

	static getCurrentDate(){
		var d = new Date();
		return this._formatDate(d);
	}

	static getUpdateDate( d ){
		if( !Boolean(d) ) return "";
		return this._formatDate( new Date( d ) );
	}

	static _formatDate( d ){
		if( !Boolean(d) ) return "";
		if( isNaN(d)) return "";
		return `${d.getFullYear()}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');
	}

	static getCurrentDateBadge(){
		return this.getUpdateDateBadge(this.getCurrentDate());
	}

	static getUpdateDateBadge( update_date ){
		if( !Boolean( update_date ) ) return "";
		return `<span class="badge new" data-badge-caption="">${this.getUpdateDate(update_date)}</span>`;
	}

	static _getRelationCodeMaps(){
		return {
			father               : "NFTH",
			mother               : "NMTH",
			maternal_grandmother : "MGRMTH",
			maternal_grandfather : "MGRFTH",
			paternal_grandmother : "PGRMTH",
			paternal_grandfather : "PGRFTH"
		};
	};

	static _getRelationCodeMaps( multiple ){
		return {
			son                  : "SON",
			daughter             : "DAU",
			nephew               : "NEPHEW",
			niece                : "NIECE",
			sister               : "NSIS",
			brother              : "NBRO",
			grandson             : "GRNSON",
			granddaughter        : "GRNDAU",
			maternal_aunt        : "MAUNT",
			maternal_cousin      : "MCOUSN",
			maternal_halfbrother : "MHBRO",
			maternal_halfsister  : "MHSIS",
			maternal_uncle       : "MUNCLE",
			paternal_aunt        : "PAUNT",
			paternal_cousin      : "PCOUSN",
			paternal_halfbrother : "PHBRO",
			paternal_halfsister  : "PHSIS",
			paternal_uncle       : "PUNCLE"
		};
	}
	
	static getLastUpdateDate( pi ){
		
		var last_update_date = "";

		if( Boolean( pi.update_date ) ) last_update_date = pi.update_date;

		// 家族情報
		for (var key in this._getRelationCodeMaps()) {
			if( Boolean( pi[key] ) ){
				if( Boolean( pi[key].update_date ) ){
					last_update_date = this._getNewerDateString(last_update_date, pi[key].update_date);
				}
			}
		}
	
		Object.keys( pi ).forEach(function( r ) {
			Object.keys( PersonalInformationUtil._getRelationCodeMaps(true) ).forEach( function( tr ) {
				if( r.startsWith( tr ) ){
					if( Boolean( pi[r] ) ){
						if( Boolean( pi[r].update_date ) ){
							last_update_date = PersonalInformationUtil._getNewerDateString(last_update_date, pi[r].update_date);
						}
					}
				}
			});
		});

		return last_update_date;
	}

	static _getNewerDateString( d1, d2 ){
		var date1 = new Date( d1 );
		var date2 = new Date( d2 );

		if( isNaN( date1 ) && !isNaN( date2 ) ) return d2;
		if( !isNaN( date1 ) && isNaN( date2 ) ) return d1;
		if( isNaN( date1 ) && isNaN( date2 ) ) return "";

		if( date1 < date2 ) return d2;

		return d1;
	}
}

function getLang(){

	if( 'en' == getParameterByName('setLng') ) return 'en';
	if( 'ja' == getParameterByName('setLng') ) return 'ja';

	if( 'en' == window.i18n.lng() ) return 'en';
	if( 'en-US' == window.i18n.lng() ) return 'en';

	return 'ja';
}

$(document).ready(function() {

	// Check to see whether this browser has the FileAPI
	/* Removing to test IE8
	var FileApiSupported = window.File && window.FileReader && window.FileList && window.Blob;
	if (!FileApiSupported) {
//		if ($("body").attr("page") != "unsupported_browser") window.location.replace("./unsupported_browser.html");
	}
	*/

	// test if iPad //
	// if iPad - remove copy for family member nav item and save history button //
	if (isiPad) {
		$("#navCopyFamily").remove();
	};

	$("#view_diagram_and_table_button").on('click', function () {
		$(this).css('cursor', 'pointer');
	});



	if (typeof i18n != "undefined") {
		var option = {
			resGetPath: '../locales/__ns__-__lng__.json',
			ns: {
		    namespaces: ['translation', 'diseases'],
		    defaultNs: 'translation'
		  }
		};

		i18n.init(option, function () {
			$(".translate").i18n();
			$.getJSON("../data/diseases.json", function (data) {
				diseases = data;
				start();
			});
		});
	};

	// get language //
	var lng = window.i18n.lng();

	// get value of dropdown and set setLng param in URL //
	$( ".language" ).change(function() {
	  location.href="?setLng=" + $(".language").val();
	});

	// get value of dropdown and set setLng param in URL on fhh page //
	$( ".language_fhh" ).change(function() {
	  location.href="?action=create&setLng=" + $(".language_fhh").val();
	});

	// get current language and set dropdown value //
	if (lng=='en-US') {
		$(".language").val("en");
		$(".language_fhh").val("en");
	}else if( lng == 'ja-JP')  {
	    $(".language").val("ja");
        $(".language_fhh").val("ja");
	} else {
		$(".language").val(lng);
		$(".language_fhh").val(lng);
	}
});

function start()
{

	$("#why_ask_ashkenazi_dialog").load ("why_ask_ashkenazi.html", function () {
		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
	});

	$("#why_ask_ashkenazi_dialog").dialog({
		title:$.t("fhh_js.ashkenazi"),
		position:['middle',0],
		autoOpen: false,
		height:250,
		width:350
	});


	$("#dropbox_save").click(function() {
		$("#dropbox_save").attr("href", "data:application/xml," + JSON.stringify(personal_information, null, 2));
	});

	// personal_information_dialog
	$("#add_personal_information_dialog").load ("add_personal_information_dialog.html", function () {
		build_personal_health_information_section();
		build_race_ethnicity_section($("#personal_race_ethnicity"), true);
		bind_personal_submit_button_action();
		bind_personal_cancel_button_action();
		bind_personal_help_button_action();
		// clear_and_set_personal_health_history_dialog();
		// $("#help_dialog").load ("update-help.html");


		$("#personal_race_ethnicity").find("#selectedRaces-2").on("change", function () {
			if ($(this).prop("checked") == true) $("#add_personal_information_dialog").find("#asian_checkboxes").show();
			else {
				$("#add_personal_information_dialog").find("#asian_checkboxes").hide();
				$("#selectedRaces-11").prop('checked',false);
				$("#selectedRaces-12").prop('checked',false);
				$("#selectedRaces-13").prop('checked',false);
				$("#selectedRaces-14").prop('checked',false);
				$("#selectedRaces-15").prop('checked',false);
				$("#selectedRaces-16").prop('checked',false);
				$("#selectedRaces-17").prop('checked',false);
				$("#selectedRaces-18").prop('checked',false);
			}
		});
		$("#personal_race_ethnicity").find("#selectedRaces-4").on("change", function () {
			if ($(this).prop("checked") == true) $("#add_personal_information_dialog").find("#south_pacific_checkboxes").show();
			else {
				$("#add_personal_information_dialog").find("#south_pacific_checkboxes").hide();
				$("#selectedRaces-21").prop('checked',false);
				$("#selectedRaces-22").prop('checked',false);
				$("#selectedRaces-23").prop('checked',false);
				$("#selectedRaces-24").prop('checked',false);
				$("#selectedRaces-25").prop('checked',false);
			}
		});
		$("#personal_race_ethnicity").find("#selectedEthnicities-1").on("change", function () {
			if ($(this).prop("checked") == true) $("#add_personal_information_dialog").find("#hispanic_checkboxes").show();
			else {
				$("#add_personal_information_dialog").find("#hispanic_checkboxes").hide();
				$("#selectedEthnicities-11").prop('checked',false);
				$("#selectedEthnicities-12").prop('checked',false);
				$("#selectedEthnicities-13").prop('checked',false);
				$("#selectedEthnicities-14").prop('checked',false);
				$("#selectedEthnicities-15").prop('checked',false);
				$("#selectedEthnicities-16").prop('checked',false);
				$("#selectedEthnicities-17").prop('checked',false);
			}
		});

//		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
//		i18n.init(option, function () {
//			$(".translate").i18n();
//		});

		// 日本人アジアにチェックが入っている場合は警告を表示する
		if( $("#personal_race_ethnicity").find('#selectedRaces-2').prop('checked') ) $("#warn_japanese").show(); else $("#warn_japanese").hide();

		});

	$("#add_personal_information_dialog").dialog({
		title:$.t("fhh_js.pi"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:['98%'],
		resizable: false,
		closeOnEscape: false //,
		// close : cancel_before_create_family_members
		//close: cancel_add_personal_information
	});
	

	// family_member_information_dialog
	$("#update_family_member_health_history_dialog").load ("update_family_member_health_history_dialog_ja.html", function () {
		build_family_health_information_section();
		build_race_ethnicity_section($("#family_race_ethnicity"), false);
		bind_family_member_submit_button_action();
		bind_family_member_cancel_button_action();
		bind_family_member_help_button_action();
		$("#family_race_ethnicity").find("#selectedFamilyRaces-2").on("change", function () {
			if ($(this).prop("checked") == true) $("#update_family_member_health_history_dialog").find("#asian_Familycheckboxes").show();
			else {
				$("#update_family_member_health_history_dialog").find("#asian_Familycheckboxes").hide();
				$("#selectedFamilyRaces-11").prop('checked',false);
				$("#selectedFamilyRaces-12").prop('checked',false);
				$("#selectedFamilyRaces-13").prop('checked',false);
				$("#selectedFamilyRaces-14").prop('checked',false);
				$("#selectedFamilyRaces-15").prop('checked',false);
				$("#selectedFamilyRaces-16").prop('checked',false);
				$("#selectedFamilyRaces-17").prop('checked',false);
				$("#selectedFamilyRaces-18").prop('checked',false);
			}
		});

		$("#family_race_ethnicity").find("#selectedFamilyRaces-4").on("change", function () {
			if ($(this).prop("checked") == true) $("#update_family_member_health_history_dialog").find("#south_pacific_checkboxes").show();
			else {
				$("#update_family_member_health_history_dialog").find("#south_pacific_checkboxes").hide();
				$("#selectedFamilyRaces-21").prop('checked',false);
				$("#selectedFamilyRaces-22").prop('checked',false);
				$("#selectedFamilyRaces-23").prop('checked',false);
				$("#selectedFamilyRaces-24").prop('checked',false);
				$("#selectedFamilyRaces-25").prop('checked',false);
			}
		});

		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-1").on("change", function () {
			if ($(this).prop("checked") == true) $("#update_family_member_health_history_dialog").find("#hispanic_checkboxes").show();
			else {
				$("#update_family_member_health_history_dialog").find("#hispanic_checkboxes").hide();
				$("#selectedFamilyEthnicities-11").prop('checked',false);
				$("#selectedFamilyEthnicities-12").prop('checked',false);
				$("#selectedFamilyEthnicities-13").prop('checked',false);
				$("#selectedFamilyEthnicities-14").prop('checked',false);
				$("#selectedFamilyEthnicities-15").prop('checked',false);
				$("#selectedFamilyEthnicities-16").prop('checked',false);
				$("#selectedFamilyEthnicities-17").prop('checked',false);
			}
		});

		// 一括何もわからないボタン
		$("#ikkatsuUnknownButton").on("click", function () {
			$('input[name="smoker_family"]').val(["11"]);
			$('input[name="training_family"]').val(["-1"]);
			$('input[name="additional_information.frequency_to_walk_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_exercise_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.fast_walker_family"]').val(["unknown"]);
			$('input[name="training_family"]').val(["-1"]);
			$('input[name="additional_information.frequency_to_walk_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_exercise_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.fast_walker_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_fruits_in_day_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_vegetables_in_day_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_nuts_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_whole_grains_in_day_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_fishes_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_dairy_products_in_day_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_processed_meat_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_unprocessed_meat_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_drink_suger_drin_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.usual_meal_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_miso_soup_in_day_family"]').val(["unknown"]);
			$('input[name="additional_information.seasoning_of_meals_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_eat_breakfast_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.eating_speed_family"]').val(["unknown"]);
			$('input[name="additional_information.frequency_to_drink_in_week_family"]').val(["unknown"]);
			$('input[name="additional_information.amount_to_drink_family"]').val(["unknown"]);
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('checked',false);
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('disabled',true);
        	document.getElementById("training_strength_family").value = "";
        	document.getElementById("count_for_training_at_week_family").value = "";
        	document.getElementById("time_for_training_at_week_family").value = "";
    		$('select[name="training_status1"]').prop('disabled',true);
    		$('input[name="training_status2"]').prop('disabled',true);
    		$('input[name="training_status3"]').prop('disabled',true);
		});

		$("#person_is_alive").hide();
		$("#person_is_not_alive").hide();
		$("#age_determination_text").hide();
		$("#estimated_age_select").hide();

		set_age_at_diagnosis_pulldown( $.t("fhh_js.select_age"), $("#estimated_age_select"));
		set_age_at_diagnosis_pulldown( $.t("fhh_js.select_age_death"), $("#estimated_death_age_select"));

		set_disease_choice_select($("#cause_of_death_select"), $("#detailed_cause_of_death_select"), "cod");



		$('input[name="age_determination"]').on("change", function () {
			var value = $(this).val();
			if (value == 'date_of_birth') {
				$("#age_determination").val('date_of_birth');
				$("#age_determination_date_of_birth").show();
				$("#age_determination_date_of_birth_text").hide();
				$("#age_determination_date_of_birth_estimate").hide();
				$("#age_determination_text").hide();
				$("#estimated_age_select").hide();
			} else if (value == 'age') {
				$("#age_determination").val('age');
				$("#age_determination_date_of_birth").hide();
				$("#age_determination_date_of_birth_text").show();
				$("#age_determination_date_of_birth_estimate").hide();
				$("#age_determination_text").show();
				$("#estimated_age_select").hide();
			} else if (value == 'estimated_age') {
				$("#age_determination").val('estimated_age');
				$("#age_determination_date_of_birth").hide();
				$("#age_determination_date_of_birth_text").hide();
				$("#age_determination_date_of_birth_estimate").show();
				$("#age_determination_text").hide();
				$("#estimated_age_select").show();
			}
		});

		$("#is_person_alive").on("change", function () {
			if ($("#is_person_alive").val() == 'alive') {
				$("#person_is_alive").show();
				$("#person_is_not_alive").hide();

			} else if ($("#is_person_alive").val() == 'dead') {
				$("#person_is_alive").hide();
				$("#person_is_not_alive").show();
			} else if ($("#is_person_alive").val() == 'unknown') {
				$("#person_is_alive").hide();
				$("#person_is_not_alive").hide();
			}
		});

		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});

		// Asian / Japanese default.
		$("#selectedRaces-2").prop("checked", "true");
		// Open Asian checkbox
		$("#add_personal_information_dialog").find("#asian_checkboxes").show();
		// Japanese checked
		$("#selectedRaces-14").prop("checked", "true");
		// フラグを立て、2回目以降の表示ではデフォルト設定をしないようにする
		personal_information['flg_race_ethnic'] = 1;

		// キャンセルボタン
		$('#closeUpdateFamilyMemberHelthHistoryDialogButton').on('click',cancel_update_family_member);
	});

	$("#update_family_member_health_history_dialog").dialog({
		title:$.t("fhh_js.family_health_history_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:['95%'],
		resizable: false,
		closeOnEscape: false,
		close: cancel_update_family_member
	});

// Dead Code
//	$("#view_diagram_and_table_dialog").dialog({
//		title:$.t("view_diagram_title"),
//		position:['middle',0],
//		autoOpen: false,
//		height:1000,
//		width:['95%']
//	});

//    $("#family_pedigree").dialog({
//        title:"Family Pedigree",
//        position:['middle',0],
//        autoOpen: false,
//        height:2000,
//        width:['95%'],
//        backgroundColor: 'white'
//    });

	// This page lets you load in a previously saved history

	// remove //
	var lng = window.i18n.lng();
	var history_dialog = "load_personal_history_dialog.html";

	$("#load_personal_history_dialog").load (history_dialog, function () {
		bind_load_personal_history_button();
		bind_load_xml();
		bind_load_help_button_action();

		// remove load option from computer //
		// removes instructions for opening from computer //
		if (isiPad) {
			$(".loadPersonalInfoFromFile").remove();
		};

		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
	});

	$("#load_personal_history_dialog").dialog({
		title:$.t("fhh_js.load_dialog_title"),
		position:['middle',0],
		closeOnEscape: true,
		autoOpen: false,
		resizable: false,
		height:'auto',
		width:"100%",
		open : function( event , ui ){
			$("#main_contents").hide();
		},
		close : function( event , ui ){
			$("#main_contents").show();
		}
	});

	// This page lets you save a history
	$("#save_personal_history_dialog").load ("save_personal_history_dialog.html", function () {

		bind_save_personal_history_button();
		bind_save_xml();

		if (isiPad) {
			$(".savePersonalInfoFromFile").remove();
		};

		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
		
		// 閉じるボタン
		$('.closeSavePersonalHistoryDialogButton').on('click', function(){
			$("#save_personal_history_dialog").dialog('close');
		});
		
		$('#saved_leave_this_site').on('click', function(){
			window.open('about:blank','_self').close();
		});

	});

	$("#save_personal_history_dialog").dialog({
		title:$.t("fhh_js.save_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:800,
		open : function( event , ui ){
			$( "#saved_leave_this_site").hide();
		},
		close : function( event , ui ){
			$( "#saved_leave_this_site").hide();
		}
	});

	// This is the second page when you are initially creating a personal history, it asks how many of each type of member
	$("#add_all_family_members_dialog").load ("add_all_family_members_dialog.html", function () {
		bind_add_all_family_members_submit_button_action();
		bind_add_all_family_members_cancel_button_action();
		bind_immediate_help_button_action();
		bind_number_only_fields();
		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
	});



	$("#add_all_family_members_dialog").dialog({
		title:$.t("fhh_js.add_family_members_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:650
	});

	// リスク計算ダイアログ
	$("#disease_risk_calculator_dialog").load ("disease_risk_calculator_dialog.html", function () {

		if (isiPad) {
			$(".savePersonalInfoFromFile").remove();
		};
		preparate_compensation_dialog();
		bind_compensate_information_submit_button_action();

		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
		
		// 閉じるボタン
		$('.closeRiskScoreButton').on('click', function(){
			$("#disease_risk_calculator_dialog").dialog('close');
		});
	});

	// Disease Risk Calculator
	$("#disease_risk_calculator_dialog").dialog({
		title:$.t("fhh_js.risk_calculator_dialog_title"),
		position:['top',0],
		resizable: false,
		autoOpen: false,
		height:'auto',
		width:['95%'],
		open: function(){
			temporarilyHoldCareTaker.add( 'personal_informaiton', personal_information);
		},
		beforeClose: function(){
			personal_information = temporarilyHoldCareTaker.paste( 'personal_informaiton');
		}
	});

	$("#navRiskCalculator").on("click", function() {
		// ダイアログを開く前に、リスク計算に最低限必要な情報が登録されているかチェック
		var checkResult = checkNecessaryItems();

		// 不足していれば(=false)、その項目の入力フォームを表示
		if(checkResult) {
			$("#compensational_block").hide();
		} else {
			$("#compensational_block").show();
		}

		$("#disease_risk_calculator_dialog").dialog('open').position("center top");
		load_risk_links();

	});

	$("#showRiskScoreDetail").on("click", function() {
		// ダイアログを開く前に、リスク計算に最低限必要な情報が登録されているかチェック
		var checkResult = checkNecessaryItems();

		// 不足していれば(=false)、その項目の入力フォームを表示
		if(checkResult) {
			$("#compensational_block").hide();
		} else {
			$("#compensational_block").show();
		}

		$("#disease_risk_calculator_dialog").dialog('open').position("center top");
		load_risk_links();
	});

	// 家族歴の質ダイアログ
	$("#quality_of_family_history_score_dialog").load("quality_of_family_history_score_dialog.html",function(){
		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
		
		// 閉じるボタン
		$('.closeQofhScoreButton').on('click', function(){
			$("#quality_of_family_history_score_dialog").dialog('close');
		});
	});

	// 家族歴の質
	$("#quality_of_family_history_score_dialog").dialog({
		title:$.t("family-t_qof_history_score.title"),
		position:['top',0],
		resizable: false,
		autoOpen: false,
		height:'auto',
		width:['95%'],
		open: function(){
			temporarilyHoldCareTaker.add( 'personal_informaiton', personal_information);
		},
		beforeClose: function(){
			personal_information = temporarilyHoldCareTaker.paste( 'personal_informaiton');
		}
	});

	$("#showQofhScoreDetail").on("click", function() {
		preparate_qof_score_dialog();
		$("#quality_of_family_history_score_dialog").dialog('open').position("center top");
		QualityOfFamilyHistoryScoreController.refresh()
	});

	// 家族歴の質ヘルプダイアログ
	$("#family-t_qof_history_score_help_dialog").load("quality_of_family_history_score_help_dialog.html",function(){
		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
		
		// 閉じるボタン
		$('.closeQofhScoreHelpButton').on('click', function(){
			$("#family-t_qof_history_score_help_dialog").dialog('close');
		});
	});

	// 家族歴の質
	$("#family-t_qof_history_score_help_dialog").dialog({
		title:$.t("family-t_qof_history_score.title"),
		position:['top',0],
		resizable: false,
		autoOpen: false,
		height:'auto',
		width:['95%']
	});

	$("#family-t_qof_history_score_help").on("click", function() {
		$("#family-t_qof_history_score_help_dialog").dialog("open");
	});

		
	// ライフスタイルスコア計算ダイアログ
	$("#lifestyle_score_calculator_dialog").load("lifestyle_score_calculator_dialog.html",function(){
		preparate_lifestyle_score_dialog();
		// bind_lifestyle_score_submit_button_action();
		LifeStyleScoreDetailDialogController.refresh();
		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
		
		// 閉じるボタン
		$('.closeLifestyleScoreButton').on('click', function(){
			$("#lifestyle_score_calculator_dialog").dialog('close');
		});
	});

	// Life Style Score Calculator
	$("#lifestyle_score_calculator_dialog").dialog({
		title:$.t("fhh_js.lifestyle_score_calculator_dialog_title"),
		position:['top',0],
		resizable: false,
		autoOpen: false,
		height:'auto',
		width:['95%'],
		open: function(){
			temporarilyHoldCareTaker.add( 'personal_informaiton', personal_information);
		},
		beforeClose: function(){
			personal_information = temporarilyHoldCareTaker.paste('personal_informaiton');
		}
	});

	$("#navLifeStyleScoreCalculator").on("click", function() {
		// ダイアログを開く前に、リスク計算に最低限必要な情報が登録されているかチェック
		var checkResult = checkNecessaryItemsForLifestyleScore();

		LifeStyleScoreDetailDialogController.refresh();
		// 不足していれば(=false)、その項目の入力フォームを表示
		if(checkResult) {
			$("#lifestylescore_compensation_block").hide();
		} else {
			$("#lifestylescore_compensation_block").show();
		}

		$("#lifestyle_score_calculator_dialog").dialog('open').position("center top");
	});

	$("#showLifeStyleScoreDetail").on("click", function() {
		// ダイアログを開く前に、リスク計算に最低限必要な情報が登録されているかチェック
		var checkResult = checkNecessaryItemsForLifestyleScore();

		// 不足していれば(=false)、その項目の入力フォームを表示
		if(checkResult) {
			$("#lifestylescore_compensation_block").hide();
		} else {
			$("#lifestylescore_compensation_block").show();
		}

		$("#lifestyle_score_calculator_dialog").dialog('open').position("center top");
	});

	// リスク計算不足要素入力ダイアログ
	// $("#compensate_information_dialog").load ("compensate_information_dialog.html", function () {
	// 	preparate_compensation_dialog();
	// 	bind_compensate_information_submit_button_action();
	// 	var option = { resGetPath: '../locales/__ns__-__lng__.json'};
	// 	i18n.init(option, function () {
	// 		$(".translate").i18n();
	// 	});
	// });

	// 家系図印刷
	$("#familyTable").dialog({
		title: "家系図と表",
		position: ['top',0],
		autoOpen: false,
		resizable: false,
		height: 'auto',
		width: ['96%']
	});

	// 家系図印刷
	$("#familyTable").load ("show_family_table.html", function () {

		var option = { resGetPath: '../locales/__ns__-__lng__.json'};
		i18n.init(option, function () {
			$(".translate").i18n();
		});
	});

	$("#showFamilyTable").on("click", function() {

		$("#familyTable").dialog("open");
		load_risk_links();

	});

	// compensation dialog
	// $("#compensate_information_dialog").dialog({
	// 	title: "リスク計算不足項目入力",
	// 	position: ['top',0],
	// 	autoOpen: false,
	// 	resizable: false,
	// 	height: 'auto',
	// 	width: ['96%']
	// });

//	 Dead Code
//     family pedigree diagram dialog
//    $("#family_pedigree").load ("family_pedigree.html", function () {});

	$("#navViewDiagram").on("click", function() {
		//xmlload();
	});

	$("#navCopyFamily").on("click", function() {
     $("#copy_for_family_member").dialog("open");
     build_copy_for_family_member_dialog();
  });

//	$("#download_csv").on("click", function() {
//		//alert ("trigger");
//		make_csv();
//	});

	$("#copy_for_family_member").dialog({
		title:$.t("fhh_js.family_member_copy_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:600
	});

	// $("#help_dialog").load ("update-help.html", function () {});
	$("#help_dialog").dialog({
		title:$.t("fhh_js.help_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:600
	});

	$("#update_help_dialog").load ("update-help.html", function () {});
	$("#update_help_dialog").dialog({
		title:$.t("fhh_js.update_help_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:600
	});

	$("#personal_help_dialog").load ("personal-help.html", function () {});
	$("#personal_help_dialog").dialog({
		title:$.t("fhh_js.add_help_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:600
	});


	if (lng=='it'||lng=='pt'||lng=='es') {
		$("#load_help_dialog").load ("load-help_backup.html", function () {});
	}else if(lng=='ja'){
		$("#load_help_dialog").load ("load-help_ja.html", function () {});
	}
	else {
		$("#load_help_dialog").load ("load-help.html", function () {});
	}
	$("#load_help_dialog").dialog({
		title:$.t("fhh_js.load_help_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:600
	});

	$("#immediate_help_dialog").load ("immediate-help.html", function () {});
	$("#immediate_help_dialog").dialog({
		title:$.t("fhh_js.immediate_help_dialog_title"),
		position:['middle',0],
		autoOpen: false,
		height:'auto',
		width:600
	});

// Dead Code?
//	if (personal_information != null) {
//	    if (confirm($.t("fhh_js.confirm_delete")) == true) {
//	    	personal_information = new Object();
//	    	build_family_history_data_table();
//	    } else {
//	        return false;
//	    }
//	}

	// Below function is temporary to allow debuging of the pedigree
	$("#nav_help").on("click", function() {
		$("#help_dialog").dialog("open");

		// test if iPad //
		// remove help items related to computer //
		if (isiPad) {
			$(".computerOnly").remove();
		};

		// 閉じるボタン
		$('#closeHelpDialogButton').on('click', function(){
			$("#help_dialog").dialog('close');
		});

	});

	$(".banner_right").on("click", function() {
//		$("#help_dialog").append(JSON.stringify(personal_information, null, 2));
//		$("#help_dialog").dialog("open");
		if (DEBUG) {
			alert ("Personal Information:" + JSON.stringify(personal_information, null, 2) );
		}
	});

	// Hide or show the right initial buttons
	$("#create_new_personal_history_button").show().on("click", bind_create_new_personal_history_button_action);
//	$("#save_personal_history_button").show().on("click", bind_save_personal_history_button_action);
	$("#save_personal_history_button1").click(function(){
		bind_save_personal_history_button_action();
	});
//	$("#add_another_family_member_button").show().on("click", bind_add_another_family_member_button_action);
	$("#add_another_family_member_button1").click(function(){
		bind_add_another_family_member_button_action();
	});
	$("#add_another_family_member_button2").click(function(){
		bind_add_another_family_member_button_action();
	});
	$("#save_family_history_button").hide();
//	$("#view_diagram_and_table_button").show().on("click", bind_view_diagram_and_table_button_action);
//    $("#view_diagram_and_table_button").show().on("click",  readtable());
  $("#your_health_risk_assessment_button").hide();

// Check to see if there are any specific actions
	if (getParameterByName("action") == 'load') {

		reset_personal_information();

		if( location.hostname == "localhost" ){
			// personal_information = {"name":"あなた","twin_status":"NO","prefectures":null,"Health History":[],"flg_race_ethnic":1,"id":"a8b86875-9e48-4048-acd9-33b68400de59","gender":"MALE","date_of_birth":"1962/04/01","adopted":false,"height":180,"height_unit":"centimeters","weight":"70","weight_unit":"kilogram","month_of_birth":"4","year_of_birth":"1962","birth_order":1,"living_prefectures":"0000","waist":"66","waist_unit":"centimeters","hip":"","hip_unit":"centimeters","training_strength":"中程度","training_count_for_training_at_week":"1","training_time_for_training_at_week":"10","systolic_blood_pressure":"under_119","diastolic_blood_pressure":"79_or_less","fasting_blood_glucose_lebel":"99_or_less","occasionally_blood_glucose_lebel":"139_or_less","ogtt_blood_glucose_lebel":"139_or_less","hba1c":"under65","hdl_cholesterol":"less_than_40","ldl_cholesterol":"less_than_100","last_diagnosis_year":null,"last_diagnosis_month":null,"race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},"ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},"father":{"gender":"MALE","id":"da79a12a-84ea-4e5b-8e04-e3c4abd881ca","Health History":[],"name":"あなたの父","relationship":"father"},"mother":{"gender":"FEMALE","id":"b65ed6b8-0ce4-4dc5-ac05-aadb472bb14d","Health History":[],"name":"あなたの母","relationship":"mother","birth_order":1},"maternal_grandfather":{"gender":"MALE","id":"321b373f-7cfb-4cfc-869f-89d0ce436d14","Health History":[],"name":"あなたの母方の祖父","relationship":"maternal_grandfather"},"maternal_grandmother":{"gender":"FEMALE","id":"1abfa341-73a2-4445-ab84-a05b7b062f9d","Health History":[],"name":"あなたの母方の祖母","relationship":"maternal_grandmother"},"paternal_grandfather":{"gender":"MALE","id":"30ed578d-ebee-4643-9b82-78e15e5c902e","Health History":[],"name":"あなたの父方の祖父","relationship":"paternal_grandfather"},"paternal_grandmother":{"gender":"FEMALE","id":"e7c4a26c-92b3-4732-83eb-11645d886b32","Health History":[],"name":"あなたの父方の祖母","relationship":"paternal_grandmother"},"created_date":"2020/04/28 21:27:19","smoker":"1","training_family":"1","take_antihypertensive":"false","take_hypoglycemic":"false","maternal_aunt_0":{"gender":"FEMALE","name":"あなたの母方のおば","relationship":"aunt","flg_race_ethnic":1,"id":"be5ea431-4bb4-4f2e-bf0b-805be86a6dea","parent_id":"","adopted":false,"prefectures":"0001","living_prefectures":null,"birth_order":2,"is_alive":"unknown","training_strength":null,"training_count_for_training_at_week":"","training_time_for_training_at_week":"","Health History":[],"race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},"ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false}}};
			// personal_information = {"id":"cf3abeed-bdd8-4bfa-a","name":"あなた","gender":"MALE","date_of_birth":"1952/03/01","prefectures":"0002","living_prefectures":"0003","twin_status":"NO","adopted":"false","month_of_birth":"3","year_of_birth":"1952","birth_order":"1","dietary_frequency_to_drink_in_week":"0-2_times_or_less","flg_race_ethnic":"1","Health History":[{"Disease Name":"Cancer","Detailed Disease Name":"食道がん","Age At Diagnosis":"early_twenties","Disease Code":"SNOMED_CT-363402007"}],"weight_unit":"kilogram","waist_unit":"centimeters","hip_unit":"centimeters","father":{"id":"960b83f5-8b5c-4585-aeee-94a71c9887fd","name":"あなたの父","gender":"MALE","relationship":"father"},"mother":{"id":"8dc1fba5-267f-4bff-a387-936ca1c878d8","name":"あなたの母","gender":"FEMALE","relationship":"mother"},"paternal_grandfather":{"id":"cfb7d150-ad43-4953-b40b-c093c3020196","name":"あなたの父方の祖父","gender":"MALE","relationship":"paternal_grandfather"},"paternal_grandmother":{"id":"5d9b01a6-21f2-46c3-ba93-e0486e76fef9","name":"あなたの父方の祖母","gender":"FEMALE","relationship":"paternal_grandmother"},"maternal_grandfather":{"id":"ed2fd10b-4851-4c64-a94d-237bad7d8971","name":"あなたの母方の祖父","gender":"MALE","relationship":"maternal_grandfather"},"maternal_grandmother":{"id":"f6a721f3-4be1-4671-a619-d0a796688352","name":"あなたの母方の祖母","gender":"FEMALE","relationship":"maternal_grandmother"},"son_0":{"id":"29f00d95-6609-47a3-90fe-1949d4a3ab68","name":"あなたの息子ようしハイ","gender":"MALE","prefectures":"0002","adopted":"true","birth_order":"1","training_count_for_training_at_week":"","training_time_for_training_at_week":"","flg_race_ethnic":"1","relationship":"son","is_alive":"unknown","parent_id":""},"son_1":{"id":"852e6efb-9834-4313-b731-bcc4d122c362","name":"あなたの息子","gender":"MALE","birth_order":"2","relationship":"son"},"sister_0":{"id":"2680eeed-7f12-4822-b354-a60112962048","name":"あなたの姉妹","gender":"FEMALE","birth_order":"3","relationship":"sister"},"sister_1":{"id":"328a78ac-4b4b-4827-b634-b84a6a26f4fb","name":"あなたの姉妹","gender":"FEMALE","birth_order":"4","relationship":"sister"},"brother_0":{"id":"e42e0eeb-b0dc-4c46-b560-d61da84b7f51","name":"あなたの兄弟","gender":"MALE","birth_order":"2","flg_race_ethnic":"1","relationship":"brother"},"maternal_aunt_0":{"id":"f86162d2-bfac-4474-9903-de3ae0b1d114","name":"あなたの母方のおば","gender":"FEMALE","relationship":"aunt"},"maternal_aunt_1":{"id":"7c60883a-575c-4a5d-bb33-a5956d440a2b","name":"あなたの母方のおば","gender":"FEMALE","relationship":"aunt"},"maternal_uncle_0":{"id":"4563af0b-4e89-4a57-8e70-1b3c28fa37a8","name":"あなたの母方のおじ","gender":"MALE","relationship":"uncle"},"maternal_uncle_1":{"id":"0a85dfc3-0539-415a-8f56-67a41748afaa","name":"あなたの母方のおじ","gender":"MALE","relationship":"uncle"},"paternal_aunt_0":{"id":"64542476-5687-4426-b98e-2c18ec999b00","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_1":{"id":"c581bd43-45c4-4e13-b70d-cc611be5989b","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_2":{"id":"61e8b7e3-4584-4870-8652-5cb25e57ea9a","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_3":{"id":"28c4b45f-8a0d-4712-8b5d-ec59da102e14","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_uncle_0":{"id":"0105afe7-741d-4fec-9f3f-e54ffea16dd0","name":"あなたの父方のおじ","gender":"MALE","relationship":"uncle"},"paternal_uncle_1":{"id":"1579b627-d8f7-4189-bcf8-1daf4b6fb7b3","name":"あなたの父方のおじ","gender":"MALE","relationship":"uncle"}};
			// personal_information = {"id":"cf3abeed-bdd8-4bfa-a","name":"あなた","gender":"MALE","date_of_birth":"1952/03/01","prefectures":"0002","living_prefectures":"0003","twin_status":"NO","adopted":"false","month_of_birth":"3","year_of_birth":"1952","birth_order":"1","dietary_frequency_to_drink_in_week":"0-2_times_or_less","flg_race_ethnic":"1","Health History":[{"Disease Name":"Cancer","Detailed Disease Name":"食道がん","Age At Diagnosis":"early_twenties","Disease Code":"SNOMED_CT-363402007"}],"weight_unit":"kilogram","waist_unit":"centimeters","hip_unit":"centimeters","father":{"id":"960b83f5-8b5c-4585-aeee-94a71c9887fd","name":"あなたの父","gender":"MALE","relationship":"father"},"mother":{"id":"8dc1fba5-267f-4bff-a387-936ca1c878d8","name":"あなたの母","gender":"FEMALE","relationship":"mother"},"paternal_grandfather":{"id":"cfb7d150-ad43-4953-b40b-c093c3020196","name":"あなたの父方の祖父","gender":"MALE","relationship":"paternal_grandfather"},"paternal_grandmother":{"id":"5d9b01a6-21f2-46c3-ba93-e0486e76fef9","name":"あなたの父方の祖母","gender":"FEMALE","relationship":"paternal_grandmother"},"maternal_grandfather":{"id":"ed2fd10b-4851-4c64-a94d-237bad7d8971","name":"あなたの母方の祖父","gender":"MALE","relationship":"maternal_grandfather"},"maternal_grandmother":{"id":"f6a721f3-4be1-4671-a619-d0a796688352","name":"あなたの母方の祖母","gender":"FEMALE","relationship":"maternal_grandmother"},"son_0":{"id":"29f00d95-6609-47a3-90fe-1949d4a3ab68","name":"あなたの息子ようしハイ","gender":"MALE","prefectures":"0002","adopted":"true","birth_order":"1","training_count_for_training_at_week":"","training_time_for_training_at_week":"","flg_race_ethnic":"1","relationship":"son","is_alive":"unknown","parent_id":""},"son_1":{"id":"852e6efb-9834-4313-b731-bcc4d122c362","name":"あなたの息子","gender":"MALE","birth_order":"2","relationship":"son"},"sister_0":{"id":"2680eeed-7f12-4822-b354-a60112962048","name":"あなたの姉妹","gender":"FEMALE","birth_order":"3","relationship":"sister"},"sister_1":{"id":"328a78ac-4b4b-4827-b634-b84a6a26f4fb","name":"あなたの姉妹","gender":"FEMALE","birth_order":"4","relationship":"sister"},"brother_0":{"id":"e42e0eeb-b0dc-4c46-b560-d61da84b7f51","name":"あなたの兄弟","gender":"MALE","birth_order":"2","flg_race_ethnic":"1","relationship":"brother"},"maternal_aunt_0":{"id":"f86162d2-bfac-4474-9903-de3ae0b1d114","name":"あなたの母方のおば","gender":"FEMALE","relationship":"aunt"},"maternal_aunt_1":{"id":"7c60883a-575c-4a5d-bb33-a5956d440a2b","name":"あなたの母方のおば","gender":"FEMALE","relationship":"aunt"},"maternal_uncle_0":{"id":"4563af0b-4e89-4a57-8e70-1b3c28fa37a8","name":"あなたの母方のおじ","gender":"MALE","relationship":"uncle"},"maternal_uncle_1":{"id":"0a85dfc3-0539-415a-8f56-67a41748afaa","name":"あなたの母方のおじ","gender":"MALE","relationship":"uncle"},"paternal_aunt_0":{"id":"64542476-5687-4426-b98e-2c18ec999b00","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_1":{"id":"c581bd43-45c4-4e13-b70d-cc611be5989b","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_2":{"id":"61e8b7e3-4584-4870-8652-5cb25e57ea9a","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_3":{"id":"28c4b45f-8a0d-4712-8b5d-ec59da102e14","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_uncle_0":{"id":"0105afe7-741d-4fec-9f3f-e54ffea16dd0","name":"あなたの父方のおじ","gender":"MALE","relationship":"uncle"},"paternal_uncle_1":{"id":"1579b627-d8f7-4189-bcf8-1daf4b6fb7b3","name":"あなたの父方のおじ","gender":"MALE","relationship":"uncle"}};
			personal_information = {"id":"cf3abeed-bdd8-4bfa-a","name":"あなた","gender":"MALE","date_of_birth":"1952/03/01","prefectures":"0002","living_prefectures":"0003","twin_status":"NO","adopted":"false","month_of_birth":"3","year_of_birth":"1952","birth_order":1,"dietary_frequency_to_drink_in_week":"0-2_times_or_less","flg_race_ethnic":1,"Health History":[{"Disease Name":"Cancer","Detailed Disease Name":"食道がん","Age At Diagnosis":"early_twenties","Disease Code":"SNOMED_CT-363402007"}],"weight_unit":"kilogram","waist_unit":"centimeters","hip_unit":"centimeters","father":{"id":"960b83f5-8b5c-4585-aeee-94a71c9887fd","name":"あなたの父","gender":"MALE","relationship":"father"},"mother":{"id":"8dc1fba5-267f-4bff-a387-936ca1c878d8","name":"あなたの母","gender":"FEMALE","relationship":"mother"},"paternal_grandfather":{"id":"cfb7d150-ad43-4953-b40b-c093c3020196","name":"あなたの父方の祖父","gender":"MALE","relationship":"paternal_grandfather"},"paternal_grandmother":{"id":"5d9b01a6-21f2-46c3-ba93-e0486e76fef9","name":"あなたの父方の祖母","gender":"FEMALE","relationship":"paternal_grandmother"},"maternal_grandfather":{"id":"ed2fd10b-4851-4c64-a94d-237bad7d8971","name":"あなたの母方の祖父","gender":"MALE","relationship":"maternal_grandfather"},"maternal_grandmother":{"id":"f6a721f3-4be1-4671-a619-d0a796688352","name":"あなたの母方の祖母","gender":"FEMALE","relationship":"maternal_grandmother"},"son_0":{"id":"29f00d95-6609-47a3-90fe-1949d4a3ab68","name":"あなたの息子ようしハイ","gender":"MALE","prefectures":"0002","adopted":"true","birth_order":"1","training_count_for_training_at_week":"","training_time_for_training_at_week":"","flg_race_ethnic":"1","relationship":"son","is_alive":"unknown","parent_id":""},"son_1":{"id":"852e6efb-9834-4313-b731-bcc4d122c362","name":"あなたの息子","gender":"MALE","birth_order":"2","relationship":"son"},"sister_0":{"id":"2680eeed-7f12-4822-b354-a60112962048","name":"あなたの姉妹","gender":"FEMALE","birth_order":3,"relationship":"sister","flg_race_ethnic":1,"parent_id":"","adopted":false,"prefectures":null,"living_prefectures":null,"is_alive":"dead","cause_of_death":"High Cholesterol","detailed_cause_of_death":"高コレステロール","estimated_death_age":"early_twenties","cause_of_death_code":"SNOMED_CT-55822004","training_strength":null,"training_count_for_training_at_week":"","training_time_for_training_at_week":"","Health History":[],"race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},"ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false}},"sister_1":{"id":"328a78ac-4b4b-4827-b634-b84a6a26f4fb","name":"あなたの姉妹","gender":"FEMALE","birth_order":4,"relationship":"sister"},"brother_0":{"id":"e42e0eeb-b0dc-4c46-b560-d61da84b7f51","name":"あなたの兄弟","gender":"MALE","birth_order":2,"flg_race_ethnic":"1","relationship":"brother","parent_id":"","adopted":false,"prefectures":null,"living_prefectures":null,"is_alive":"alive","age":12,"training_strength":null,"training_count_for_training_at_week":"","training_time_for_training_at_week":"","Health History":[],"race":{"American Indian or Alaska Native":false,"Asian":false,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":false,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},"ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false}},"maternal_aunt_0":{"id":"f86162d2-bfac-4474-9903-de3ae0b1d114","name":"あなたの母方のおば","gender":"FEMALE","relationship":"aunt"},"maternal_aunt_1":{"id":"7c60883a-575c-4a5d-bb33-a5956d440a2b","name":"あなたの母方のおば","gender":"FEMALE","relationship":"aunt"},"maternal_uncle_0":{"id":"4563af0b-4e89-4a57-8e70-1b3c28fa37a8","name":"あなたの母方のおじ","gender":"MALE","relationship":"uncle"},"maternal_uncle_1":{"id":"0a85dfc3-0539-415a-8f56-67a41748afaa","name":"あなたの母方のおじ","gender":"MALE","relationship":"uncle"},"paternal_aunt_0":{"id":"64542476-5687-4426-b98e-2c18ec999b00","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_1":{"id":"c581bd43-45c4-4e13-b70d-cc611be5989b","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_2":{"id":"61e8b7e3-4584-4870-8652-5cb25e57ea9a","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_aunt_3":{"id":"28c4b45f-8a0d-4712-8b5d-ec59da102e14","name":"あなたの父方のおば","gender":"FEMALE","relationship":"aunt"},"paternal_uncle_0":{"id":"0105afe7-741d-4fec-9f3f-e54ffea16dd0","name":"あなたの父方のおじ","gender":"MALE","relationship":"uncle"},"paternal_uncle_1":{"id":"1579b627-d8f7-4189-bcf8-1daf4b6fb7b3","name":"あなたの父方のおじ","gender":"MALE","relationship":"uncle"}};
		}
	
		build_family_history_data_table();
		if( location.hostname != "localhost" ){
			$("#load_personal_history_dialog").dialog("open");
		}
	
	}	else if (getParameterByName("action") == 'create') {
		reset_personal_information();
			build_family_history_data_table();
			$("#add_personal_information_dialog").dialog("open");
	} else if (getParameterByName("action") == 'save') {
			$("#save_personal_history_dialog").dialog("open");
	}


	// create disease calculator dropdown for nav //
	var calculatorDropdown = "";
	var lng = window.i18n.lng();
	if (lng=='en-US') {
		lng = 'en';
	};
	if (lng=='ja-JP') {
		lng = 'ja';
	};

	$.getJSON("../risk/risks.json", function (data) {
		$.each(data, function(index) {
			if (data[index].status == 'active') {
				$("#calculatorDropdown").append('<option value="' + data[index].link + '">' + data[index]['name.'+lng] + '</option>')
			};
		});
	});

	// loads selected calculator from nav //
	$( "#calculateButton" ).click(function() {
		$("#disease_risk_calculator").dialog("open");
		$( "#risk_section" ).load( "../risk/" + $("#calculatorDropdown").val(), function(data) {
		});

	});

	// logout
	$('#logout').on('click', function(){
		location.href='../../logout';
	});

	$('#leave_this_site').on('click', function(){
		$( "#save_personal_history_dialog" ).dialog( "open" );
		$( "#saved_leave_this_site").show();
	});
	// questionnaire
	// $('#lead_to_questionaire').on('click', function(){
	// 	$('#url_to_questionaire').load( "../../operation/gettoken" , function(data){
	// 		window.open('https://27.133.130.34/questionnaire/index.php/641312?newtest=Y&lang=ja&token=' + data , '_blank');
	// 	});
	// });

	// Hide dialog close button
	$(".ui-dialog-titlebar-close").hide();

	// $("#family_t_tree_dialog").dialog({
	// 	title:$.t("fhh_js.family_t_tree_dialog"),
	// 	position:['middle',0],
	// 	autoOpen: false,
	// 	height: 'auto',
	// 	width: ['96%'],
	// 	open: function(){
	// 		// 高さ
	// 		$('#family_t_tree_dialog').css('height', $(window).outerHeight() * 0.93  );
	// 		$('#enlargedView').css('height', $('#family_t_tree_dialog').height() - 280 );
	// 		// 描画
	// 		( new FamilyTree( personal_information ) ).draw( '#enlargedView' , true );
	// 	},
	// 	close: function(){
	// 		$('#enlargedView').empty();
	// 	}
	// });

	// $('.closeFamilyTreeDialogButton').on('click', function(){
	// 	$('#family_t_tree_dialog').dialog('close');
	// });

	// $('#graph').on('click', function(){
	// 	$("#family_t_tree_dialog").dialog('open');
	// });
}

// ライフスタイルスコア計算の不足項目があるかチェックする関数
function checkNecessaryItemsForLifestyleScore(){
	var cond = true;

	// 身長
	if(typeof(personal_information.height) == "undefined" || personal_information.height == "" || personal_information.height == 0){
		$("#lifestylescore__height").show();
		cond = false;
	} else {
		$("#lifestylescore__height").hide();
	}

	// 体重
	if(typeof(personal_information.weight) == "undefined" || personal_information.weight == ""){
		$("#lifestylescore__weight").show();
		cond = false;
	} else {
		$("#lifestylescore__weight").hide();
	}

	// 喫煙
	if(typeof personal_information.smoker == "undefined" ||
			(personal_information.smoker == "5" && typeof personal_information.number_of_cigarettes_per_day == "undefined") ){
		$("#lifestylescore__smoker").show();
		cond = false;
	} else {
		$("#lifestylescore__smoker").hide();
	}

	// 運動
	if(typeof personal_information.training_family == "undefined" ||
			(personal_information.training_family == "1" && (personal_information.training_strength == null ||
															personal_information.training_count_for_training_at_week == "" ||
															personal_information.training_time_for_training_at_week == "")
			) ) {
		$("#compensate_training").show();
		cond = false;
	} else {
		$("#compensate_training").hide();
	}

	return cond;
}

// リスク計算の不足項目があるかチェックする関数
function checkNecessaryItems() {
	var cond = true;

	// 性別
	if(typeof(personal_information.gender) == "undefined" || personal_information.gender == ""){
		$("#compensate_gender").show();
		cond = false;
	} else {
		$("#compensate_gender").hide();
	}

	// 生年月日
	if(typeof(personal_information.year_of_birth) == "undefined" || typeof(personal_information.month_of_birth) == "undefined") {
		$("#compensate_birth").show();
		cond = false;
	} else {
		$("#compensate_birth").hide();
	}

	// 身長
	if(typeof(personal_information.height) == "undefined" || personal_information.height == "" || personal_information.height == 0){
		$("#compensate_height").show();
		cond = false;
	} else {
		$("#compensate_height").hide();
	}

	// 体重
	if(typeof(personal_information.weight) == "undefined" || personal_information.weight == ""){
		$("#compensate_weight").show();
		cond = false;
	} else {
		$("#compensate_weight").hide();
	}

	// 腹囲
	if(typeof(personal_information.waist) == "undefined" || personal_information.waist == ""){
		$("#compensate_waist").show();
		cond = false;
	} else {
		$("#compensate_waist").hide();
	}

	// 喫煙
	if(typeof personal_information.smoker == "undefined" ||
			(personal_information.smoker == "5" && typeof personal_information.number_of_cigarettes_per_day == "undefined") ){
		$("#compensate_smoker").show();
		cond = false;
	} else {
		$("#compensate_smoker").hide();
	}

	// 運動
	if(typeof personal_information.training_family == "undefined" ||
			(personal_information.training_family == "1" && (personal_information.training_strength == null ||
															personal_information.training_count_for_training_at_week == "" ||
															personal_information.training_time_for_training_at_week == "")
			) ) {
		$("#compensate_training").show();
		cond = false;
	} else {
		$("#compensate_training").hide();
	}

	// 降圧剤
	if(typeof personal_information.take_antihypertensive == "undefined"){
		$("#compensate_antihypertensive").show();
		cond = false;
	} else {
		$("#compensate_antihypertensive").hide();
	}

	// 最高血圧
	if(typeof(personal_information.systolic_blood_pressure) == "undefined" || personal_information.systolic_blood_pressure == null || personal_information.systolic_blood_pressure == ""){
		$("#compensate_bpmax").show();
		cond = false;
	} else {
		$("#compensate_bpmax").hide();
	}

	// 最低血圧
	if(typeof(personal_information.diastolic_blood_pressure) == "undefined" || personal_information.diastolic_blood_pressure == null || personal_information.diastolic_blood_pressure == ""){
		$("#compensate_bpmin").show();
		cond = false;
	} else {
		$("#compensate_bpmin").hide();
	}

	// HDLコレステロール
	if(typeof(personal_information.hdl_cholesterol) == "undefined" ||
			personal_information.hdl_cholesterol == null ||
			personal_information.hdl_cholesterol == "unknown" ||
			personal_information.hdl_cholesterol == "not_inspected" ||
			personal_information.hdl_cholesterol == ""){
		$("#compensate_hdl").show();
		cond = false;
	} else {
		$("#compensate_hdl").hide();
	}

	// LDLコレステロール
	if(typeof(personal_information.ldl_cholesterol) == "undefined" ||
			personal_information.ldl_cholesterol == null ||
			personal_information.ldl_cholesterol == "unknown" ||
			personal_information.ldl_cholesterol == "not_inspected" ||
			personal_information.ldl_cholesterol == ""){
		$("#compensate_ldl").show();
		cond = false;
	} else {
		$("#compensate_ldl").hide();
	}

	// 血糖値項目
	// 血糖降下薬を服用しておらず、他の血糖値項目の結果が不明な場合
	if ( !testDiabates() ) {
		$("#compensate_bloodglucose").show();
		cond = false;
	} else {
		$("#compensate_bloodglucose").hide();
	}

	return cond;
}

// 血糖値項目関数外出し
function testDiabates(){

	// 服薬している場合は糖尿病と判定できる
	if( personal_information.take_hypoglycemic == "true" ) return true;
	if( personal_information.take_hypoglycemic == true ) return true;

	// 空腹時血糖値のうち、「わからない」「検査していない」以外が選択されている場合は判定できる
	if(
		// 選択されていない
		( typeof personal_information.fasting_blood_glucose_lebel != "undefined" )
		// わからない
		&& ( personal_information.fasting_blood_glucose_lebel != "unknown" )
		// 検査していない
		&& ( personal_information.fasting_blood_glucose_lebel != "not_inspected" )
		// 検査していない
		&& ( personal_information.fasting_blood_glucose_lebel != "" )
		// 選択されていない（disabled）
		&& ( personal_information.fasting_blood_glucose_lebel != null )
	) return true;


	// 随時血糖値のうち、「わからない」「検査していない」以外が選択されている場合は判定できる
	if(
		// 選択されていない
		( typeof personal_information.occasionally_blood_glucose_lebel != "undefined" )
		// わからない
		&& ( personal_information.occasionally_blood_glucose_lebel != "unknown" )
		// 検査していない
		&& ( personal_information.occasionally_blood_glucose_lebel != "not_inspected" )
		// 検査していない
		&& ( personal_information.occasionally_blood_glucose_lebel != "" )
		// 選択されていない（disabled）
		&& ( personal_information.occasionally_blood_glucose_lebel != null )
	) return true;

	// OGTTのうち、「わからない」「検査していない」以外が選択されている場合は判定できる
	if(
		// 選択されていない
		( typeof personal_information.ogtt_blood_glucose_lebel != "undefined" )
		// わからない
		&& ( personal_information.ogtt_blood_glucose_lebel != "unknown" )
		// 検査していない
		&& ( personal_information.ogtt_blood_glucose_lebel != "not_inspected" )
		// 検査していない
		&& ( personal_information.ogtt_blood_glucose_lebel != "" )
		// 選択されていない（disabled）
		&& ( personal_information.ogtt_blood_glucose_lebel != null )
	) return true;

	// HbA1cのうち、「わからない」「検査していない」以外が選択されている場合は判定できる
	if(
		// 選択されていない
		( typeof personal_information.hba1c != "undefined" )
		// わからない
		&& ( personal_information.hba1c != "unknown" )
		// 検査していない
		&& ( personal_information.hba1c != "not_inspected" )
		// 検査していない
		&& ( personal_information.hba1c != "" )
		// 選択されていない（disabled）
		&& ( personal_information.hba1c != null )
	) return true;

	return false;
}

// 不足項目入力ダイアログで計算ボタン押下時の保存、ダイアログ消去、リスク計算＋画面表示処理
function bind_compensate_information_submit_button_action(){
	$("#compensateAndStartRiskCalc").on("click", function() {
		$("#compensate_information_dialog").dialog("close");

		$("#disease_risk_calculator_dialog").dialog("open");
		load_risk_links();
	});
}

//不足項目入力フォームのchangeイベント、ボタンclickイベント準備
function preparate_qof_score_dialog(){
	var qoFSupplementForm = new QoFSupplementForm( personal_information );

	// 再計算ボタン
	$("#reCalculateQofScore").on("click", function() {
		QualityOfFamilyHistoryScoreController.refresh();
		temporarilyHoldCareTaker.add( 'personal_informaiton', personal_information);
		build_family_history_data_table();
		QualityOfFamilyHistoryScoreController.hideDifferenceScore();
	});

	$('#qof_compensational_block input').change(function(){
		qoFSupplementForm.updatePersonalInformation( this );
		QualityOfFamilyHistoryScoreController.showDifferenceScore ( personal_information );
	});
	$('#qof_compensational_block select').change(function(){
		qoFSupplementForm.updatePersonalInformation( this );
		QualityOfFamilyHistoryScoreController.showDifferenceScore ( personal_information );
	});

	QualityOfFamilyHistoryScoreController.hideDifferenceScore();
}
//不足項目入力フォームのchangeイベント、ボタンclickイベント準備
function preparate_lifestyle_score_dialog(){

	// 再計算ボタン
	$("#reCalculateLifestyleScore").on("click", function() {
		calcLifestyleScoreAndShow();
		// 値を反映
		temporarilyHoldCareTaker.add( 'personal_informaiton', personal_information);
		ScoreCardController.refresh();
	});
	// シミュレーションボタン
	$("#simurateCalculateLifestyleScore").on("click", function() {
		LifeStyleScoreDetailDialogController.simurate();
	});

	setChangeEvent('compensation');
	setChangeEvent('simuration');

	function setChangeEvent(key) {
		$(`#lifestylescore_${key}_block input`).change(function () {

			// 喫煙状況
			if ($(`input[name="lifestylescore_${key}_smoker"]:checked`).val() != "5") {
				$(`input[name="lifestylescore_${key}_number_of_cigarettes_per_day"]`).prop('checked', false);
				$(`input[name="lifestylescore_${key}_number_of_cigarettes_per_day"]`).prop('disabled', true);
			} else {
				$(`input[name="lifestylescore_${key}_number_of_cigarettes_per_day"]`).prop('disabled', false);
			}

			// 運動状況
			if ($(`input[name="lifestylescore_${key}_training"]:checked`).val() == 1) {
				$(`select[name="lifestylescore_${key}_training_status1"]`).prop('disabled', false);
				$(`input[name="lifestylescore_${key}_training_status2"]`).prop('disabled', false);
				$(`input[name="lifestylescore_${key}_training_status3"]`).prop('disabled', false);
				$(`.lifestylescore_${key}_training_status_yes`).show();
			} else {
				document.getElementById(`lifestylescore_${key}_training_strength`).value = "";
				document.getElementById(`lifestylescore_${key}_count_for_training_at_week`).value = "";
				document.getElementById(`lifestylescore_${key}_time_for_training_at_week`).value = "";
				$(`select[name="lifestylescore_${key}_training_status1"]`).prop('disabled', true);
				$(`input[name="lifestylescore_${key}_training_status2"]`).prop('disabled', true);
				$(`input[name="lifestylescore_${key}_training_status3"]`).prop('disabled', true);
				$(`.lifestylescore_${key}_training_status_yes`).hide('slow');
			}

			// 値の更新
			// 身長
			if (!isNaN(parseInt($(`#lifestylescore_${key}_height_centimeters`).val()))) {
				personal_information['height'] = parseInt($(`#lifestylescore_${key}_height_centimeters`).val());
				personal_information['height_unit'] = "centimeters";
			}

			// 体重
			if (!isNaN(parseInt($(`#lifestylescore_${key}_weight`).val()))) {
				personal_information['weight'] = $(`#lifestylescore_${key}_weight`).val();
			};

			// 喫煙
			personal_information['smoker'] = $(`input[name="lifestylescore_${key}_smoker"]:checked`).val();
			personal_information['number_of_cigarettes_per_day'] = $(`input[name="lifestylescore_${key}_number_of_cigarettes_per_day"]:checked`).val();

			// 運動
			personal_information['training_family'] = $(`input[name="lifestylescore_${key}_training"]:checked`).val();
			personal_information['training_strength'] = $(`#lifestylescore_${key}_training_strength`).val();
			personal_information['training_count_for_training_at_week'] = $(`#lifestylescore_${key}_count_for_training_at_week`).val();
			personal_information['training_time_for_training_at_week'] = $(`#lifestylescore_${key}_time_for_training_at_week`).val();
		});
	}
}

// 不足項目入力フォームのchangeイベント、ボタンclickイベント準備
function preparate_compensation_dialog(){
	// 喫煙状況
	$('input[name="compensation_smoker"]').change(function() {
    	if ($('input[name="compensation_smoker"]:checked').val() != "5") {
    		$('input[name="compensation_number_of_cigarettes_per_day"]').prop('checked',false);
    		$('input[name="compensation_number_of_cigarettes_per_day"]').prop('disabled',true);
        } else {
        	$('input[name="compensation_number_of_cigarettes_per_day"]').prop('disabled',false);
        }
    });

	// 運動状況
	$('input[name="compensation_training"]').change(function() {
		if ($('input[name="compensation_training"]:checked').val() == 1) {
    		$('select[name="compensation_training_status1"]').prop('disabled',false);
    		$('input[name="compensation_training_status2"]').prop('disabled',false);
    		$('input[name="compensation_training_status3"]').prop('disabled',false);
        } else {
        	document.getElementById("compensation_training_strength").value = "";
        	document.getElementById("compensation_count_for_training_at_week").value = "";
        	document.getElementById("compensation_time_for_training_at_week").value = "";
        	$('select[name="compensation_training_status1"]').prop('disabled',true);
        	$('input[name="compensation_training_status2"]').prop('disabled',true);
        	$('input[name="compensation_training_status3"]').prop('disabled',true);
        }
    });

	// 再計算ボタン
	$("#reCalculate").on("click", function() {
		riskCalcAndShow();
		temporarilyHoldCareTaker.add( 'personal_informaiton', personal_information);
		ScoreCardController.refresh();
    });

	// 性別
	$("#compensate_gender").change(function() {
		personal_information['gender'] = $('input[name="compensation_gender"]:checked').val();
    });

	// 生年月
	$('#compensation_year_of_birth, #compensation_month_of_birth').change(function(){
		personal_information['year_of_birth'] = $('#compensation_year_of_birth').val();
		personal_information['month_of_birth'] = $('#compensation_month_of_birth').val();
		personal_information['date_of_birth'] = $('#compensation_year_of_birth').val() + "/" + ("00" + $('#compensation_month_of_birth').val()).slice(-2) + "/01";
	});

	// 身長
	$("#compensate_height").change(function() {
		var hgt = parseInt( $('#compensation_height_centimeters').val() );
		if (isNaN(hgt)) hgt = 0;

		personal_information['height'] = hgt;
		personal_information['height_unit'] = "centimeters";
    });

	// 体重
	$("#compensate_weight").change(function() {
		personal_information['weight'] = $('#compensation_weight').val();
    });

	// 腹囲
	$("#compensate_waist").change(function() {
		personal_information['waist'] = $('#compensation_waist').val();
    });

	// 喫煙
	$("#compensate_smoker").change(function() {
		personal_information['smoker'] = $('input[name="compensation_smoker"]:checked').val();
		personal_information['number_of_cigarettes_per_day'] = $('input[name="compensation_number_of_cigarettes_per_day"]:checked').val();
    });

	// 運動
	$("#compensate_training").change(function() {
		personal_information['training_family'] = $('input[name="compensation_training"]:checked').val();
		personal_information['training_strength'] = $('#compensation_training_strength').val();
		personal_information['training_count_for_training_at_week'] = $('#compensation_count_for_training_at_week').val();
		personal_information['training_time_for_training_at_week'] = $('#compensation_time_for_training_at_week').val();
    });

	// 降圧
	$("#compensate_antihypertensive").change(function() {
		personal_information['take_antihypertensive'] = $('input[name="compensation_take_antihypertensive"]:checked').val();
    });

	// 最高血圧
	$("#compensate_bpmax").change(function() {
		personal_information['systolic_blood_pressure'] = $('#compensation_systolic_blood_pressure').val();
    });

	// 最低血圧
	$("#compensate_bpmin").change(function() {
		personal_information['diastolic_blood_pressure'] = $('#compensation_diastolic_blood_pressure').val();
    });

	// HDLコレステロール
	$("#compensate_hdl").change(function() {
		personal_information['hdl_cholesterol'] = $('#compensation_hdl_cholesterol').val();
    });

	// LDLコレステロール
	$("#compensate_ldl").change(function() {
		personal_information['ldl_cholesterol'] = $('#compensation_ldl_cholesterol').val();
    });

	// 血糖降下薬、空腹時血糖、ogtt、hba1c
	$("#compensate_bloodglucose").change(function() {
		personal_information['take_hypoglycemic'] = $('input[name="compensation_take_hypoglycemic"]:checked').val();
		personal_information['fasting_blood_glucose_lebel'] = $('#compensation_fasting_blood_glucose_lebel').val();
		personal_information['occasionally_blood_glucose_lebel'] = $('#compensation_occasionally_blood_glucose_lebel').val();
		personal_information['ogtt_blood_glucose_lebel'] = $('#compensation_ogtt_blood_glucose_lebel').val();
		personal_information['hba1c'] = $('#compensation_hba1c').val();
    });

}

function bind_load_personal_history_button() {

}

function bind_save_personal_history_button() {
	$("#file_download_button").on("click", function () {
		alert($.t("fhh_js.file_save"));
		$("#save_personal_history_dialog").dialog("close");

		return false;
	});
}

function bind_create_new_personal_history_button_action () {
	if ($("#add_personal_information_dialog").dialog( "isOpen" ) == false &&
			$("#update_family_member_health_history_dialog").dialog( "isOpen" ) == false) {
		if (personal_information != null) {
		    if (confirm($.t("fhh_js.confirm_delete")) == true) {
		    	reset_personal_information();
		    	build_family_history_data_table();
		    } else {
		        return false;
		    }
		}
		current_health_history = [];
		clear_and_set_personal_health_history_dialog();

		// delete other diseases and reset dropdowns //
		delete diseases.OTHER;
		$("#personal_health_information #disease_choice_select option[class='other_disease']").remove();
		$("#family_health_information #disease_choice_select option[class='other_disease']").remove();
		$("#update_family_member_health_history_dialog #cause_of_death_select option[class='other_disease']").remove();

		$( "#add_personal_information_dialog" ).dialog( "open" );
	}
}

function bind_view_diagram_and_table_button_action () {
	$("#view_diagram_and_table_dialog").dialog("open");

	$("#view_diagram_and_table_dialog").append("");
}

function bind_save_personal_history_button_action () {
	$("#firstVari").text("");
	$("#firstVari").css("visibility","hidden");
	$("#firstVari").removeClass("label_alert");
	$("tt1").removeClass("red-text");
	$("tt1").addClass("green-text");
	$("#save_personal_history_button").css("background-color","#337AB7");
	$( "#save_personal_history_dialog" ).dialog( "open" );
}

function bind_add_another_family_member_button_action() {
	if ($("#add_personal_information_dialog").dialog( "isOpen" ) == false &&
			$("#update_family_member_health_history_dialog").dialog( "isOpen" ) == false) {

		var new_family_member_dialog;
		if ($("#new_family_member_dialog").length == 0) {
			new_family_member_dialog = $("<div id='new_family_member_dialog'>");
			new_family_member_dialog.dialog({
				position:['middle',0],
				title:$.t("fhh_js.define_family_relationship_dialog_title"),
				height:'auto',
				width:500
			});
		} else {
			new_family_member_dialog = $("#new_family_member_dialog");
			new_family_member_dialog.empty().dialog("open");
		}

		var closeButton = "<button id='closeNewFamilyMemberDialogButton' class='btn-large waves-effect waves-light teal lighten-1 translate' data-i18n='fhh_family_pedigree.close' style='text-align:right;font-size:110% !important'>"
		+ $.t("fhh_family_pedigree.close")
		+ "</button>";
		new_family_member_dialog.append($("<div class='row'></div>").append(
			$("<div class='col s12 text-right'></div>").append(
				closeButton
			)
		));
		new_family_member_dialog.find('#closeNewFamilyMemberDialogButton').on("click",function(){
			$("#new_family_member_dialog").dialog('close');
		} );

		new_family_member_dialog.append("<div class='popup_title'> " + $.t("fhh_js.add_relative_title") + " </div>");

		new_family_member_dialog.append("<P class='instructions'>" + $.t("fhh_js.add_relative_para") + "</P>");
		new_family_member_dialog.append("<label for='new_family_member_relationship'> " + $.t("fhh_js.relationship_to_me") + " </label>");
		new_family_member_select =
		$("<SELECT id='new_family_member_relationship' name='new_family_member_relationship'>")
			.append("<OPTION value=''> " + $.t("fhh_js.select_relationship") + " </OPTION>")
			.append("<OPTION value='aunt'> " + $.t("fhh_js.aunt") + " </OPTION>")
			.append("<OPTION value='uncle'> " + $.t("fhh_js.uncle") + " </OPTION>")
			.append("<OPTION value='daughter'> " + $.t("fhh_js.daughter") + " </OPTION>")
			.append("<OPTION value='son'> " + $.t("fhh_js.son") + " </OPTION>")
			.append("<OPTION value='brother'> " + $.t("fhh_js.brother") + " </OPTION>")
			.append("<OPTION value='sister'> " + $.t("fhh_js.sister") + " </OPTION>")
			.append("<OPTION value='halfsister'> " + $.t("fhh_js.half_sister") + " </OPTION>")
			.append("<OPTION value='halfbrother'> " + $.t("fhh_js.half_brother") + " </OPTION>");

		if (any_relatives(personal_information, 'maternal_aunt') || any_relatives(personal_information, 'maternal_uncle')
				|| any_relatives(personal_information, 'paternal_aunt') || any_relatives(personal_information,'paternal_uncle')) {
			new_family_member_select.append("<OPTION value='cousin'> " + $.t("fhh_js.cousin") + " </OPTION>");
		}

		if (personal_information.brother_0 != null || personal_information.sister_0 != null ||
			personal_information.maternal_halfbrother_0 != null || personal_information.maternal_halfsister_0 != null ||
			personal_information.paternal_halfbrother_0 != null || personal_information.paternal_halfsister_0 != null
		) {
			new_family_member_select
				.append("<OPTION value='niece'> " + $.t("fhh_js.niece") + " </OPTION>")
				.append("<OPTION value='nephew'> " + $.t("fhh_js.nephew") + " </OPTION>");
		}

		if (personal_information.son_0 != null || personal_information.daughter_0 != null) {
			new_family_member_select
				.append("<OPTION value='granddaughter'> " + $.t("fhh_js.granddaughter") + " </OPTION>")
				.append("<OPTION value='grandson'> " + $.t("fhh_js.grandson") + " </OPTION>")
		}

		new_family_member_select.on("change", new_family_member_relationship_selection_change_action);
		new_family_member_dialog.append(new_family_member_select);
	}
}

function new_family_member_relationship_selection_change_action() {

	// For some of the selects, we need to ask additional information
	relationship = $(this).val();
	var new_family_member_dialog = $("#new_family_member_dialog");

	// Must remove current exact relationship if there is one.
	$("#new_family_member_exact_relationship").remove();
	$("#exact_relationship_label").remove();

	switch (relationship) {
		case 'aunt':

			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> "
				+ $.t("fhh_js.aunt_relationship_q") + " </B> </span>");
			new_family_member_dialog.append($("<SELECT id='new_family_member_exact_relationship'>")
				.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>")
				.append("<OPTION value='maternal_aunt'> " + $.t("fhh_js.mother") + " </OPTION>")
				.append("<OPTION value='paternal_aunt'> " + $.t("fhh_js.father") + " </OPTION>")
				.on("change", exact_family_member_relationship_selection_change_action)
			);
			break;
		case 'uncle':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> "
				+ $.t("fhh_js.uncle_relationship_q") + " </B> </span>");
			new_family_member_dialog.append($("<SELECT id='new_family_member_exact_relationship'>")
				.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>")
				.append("<OPTION value='maternal_uncle'> " + $.t("fhh_js.mother") + " </OPTION>")
				.append("<OPTION value='paternal_uncle'> " + $.t("fhh_js.father") + " </OPTION>")
				.on("change", exact_family_member_relationship_selection_change_action)
			);
			break;
		case 'daughter':
			new_family_member_dialog.append("<INPUT id='new_family_member_exact_relationship' type='hidden' value='daughter'>");
			exact_family_member_relationship_selection_change_action();
			break;
		case 'son':
			new_family_member_dialog.append("<INPUT id='new_family_member_exact_relationship' type='hidden' value='son'>");
			exact_family_member_relationship_selection_change_action();
			break;
		case 'brother':
			new_family_member_dialog.append("<INPUT id='new_family_member_exact_relationship' type='hidden' value='brother'>");
			exact_family_member_relationship_selection_change_action();
			break;
		case 'sister':
			new_family_member_dialog.append("<INPUT id='new_family_member_exact_relationship' type='hidden' value='sister'>");
			exact_family_member_relationship_selection_change_action();
			break;
		case 'cousin':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/><B>" + $.t("fhh_js.cousin_parent_q") + " </B> </span>");
			new_family_member_select = $("<SELECT id='new_family_member_exact_relationship'>");
			new_family_member_dialog.append(new_family_member_select);
			add_cousin_select(new_family_member_select);
			break;
		case 'niece':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> " + $.t("fhh_js.niece_parent_q") + " </B> </span>");
			new_family_member_select = $("<SELECT id='new_family_member_exact_relationship'>");
			new_family_member_dialog.append(new_family_member_select);
			add_niece_select(new_family_member_select);
			break;
		case 'nephew':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> " + $.t("fhh_js.nephew_parent_q") + " </B> </span>");
			new_family_member_select = $("<SELECT id='new_family_member_exact_relationship'>");
			new_family_member_dialog.append(new_family_member_select);
			add_nephew_select(new_family_member_select);
			break;
		case 'granddaughter':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> " + $.t("fhh_js.granddaughter_parent_q") + " </B> </span>");
			new_family_member_select = $("<SELECT id='new_family_member_exact_relationship'>");
			new_family_member_dialog.append(new_family_member_select);
			add_granddaughter_select(new_family_member_select);
			break;
		case 'grandson':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> " + $.t("fhh_js.grandson_parent_q") + " </B> </span>");
			new_family_member_select = $("<SELECT id='new_family_member_exact_relationship'>");
			new_family_member_dialog.append(new_family_member_select);
			add_grandson_select(new_family_member_select);
			break;
		case 'halfbrother':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> " + $.t("fhh_js.halfbrother_parent_q") + " </B> </span>");
			new_family_member_dialog.append($("<SELECT id='new_family_member_exact_relationship'>")
				.append("<OPTION value=''>" + $.t("fhh_js.please_specify") + "</OPTION>")
				.append("<OPTION value='maternal_halfbrother'> " + $.t("fhh_js.mother") + " </OPTION>")
				.append("<OPTION value='paternal_halfbrother'> " + $.t("fhh_js.father") + " </OPTION>")
				.on("change", exact_family_member_relationship_selection_change_action)
			);
			break;
		case 'halfsister':
			new_family_member_dialog.append("<span id='exact_relationship_label'> <br/> <B> " + $.t("fhh_js.halfsister_parent_q") + " </B> </span>");
			new_family_member_dialog.append($("<SELECT id='new_family_member_exact_relationship'>")
				.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>")
				.append("<OPTION value='maternal_halfsister'> " + $.t("fhh_js.mother") + " </OPTION>")
				.append("<OPTION value='paternal_halfsister'> " + $.t("fhh_js.father") + " </OPTION>")
				.on("change", exact_family_member_relationship_selection_change_action)
			);
			break;
	}
}

function add_dynamic_relative_to_dropdown(select_dropdown, current_relationship, parent_relationship) {
	var i = 0;
	for (var i=0;i<30;i++) {
		if (personal_information[parent_relationship + '_' + i] == null) continue;
		var parent = personal_information[parent_relationship + '_' + i];
		var parent_name = parent.name;
		if (parent_name == null || parent_name.length == 0) {
			parent_name = $.t("fhh_js." + parent_relationship) + " #" + (i+1);
		}
		select_dropdown.append("<OPTION value='" + current_relationship + ":" + parent.id + "'> " + parent_name + " </OPTION>");

	}
//	while (personal_information[parent_relationship + '_' + i] != null) {
//		i++;
//	}

}

function add_cousin_select(select_dropdown) {
	select_dropdown.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>");
	add_dynamic_relative_to_dropdown(select_dropdown, "maternal_cousin", "maternal_aunt");
	add_dynamic_relative_to_dropdown(select_dropdown, "paternal_cousin", "paternal_aunt");
	add_dynamic_relative_to_dropdown(select_dropdown, "maternal_cousin", "maternal_uncle");
	add_dynamic_relative_to_dropdown(select_dropdown, "paternal_cousin", "paternal_uncle");

	select_dropdown.on("change", exact_family_member_relationship_selection_change_action);
}
function add_niece_select(select_dropdown) {
	select_dropdown.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>");
	add_dynamic_relative_to_dropdown(select_dropdown, "niece", "sister");
	add_dynamic_relative_to_dropdown(select_dropdown, "niece", "brother");
	add_dynamic_relative_to_dropdown(select_dropdown, "niece", "maternal_halfsister");
	add_dynamic_relative_to_dropdown(select_dropdown, "niece", "maternal_halfbrother");
	add_dynamic_relative_to_dropdown(select_dropdown, "niece", "paternal_halfsister");
	add_dynamic_relative_to_dropdown(select_dropdown, "niece", "paternal_halfbrother");

	select_dropdown.on("change", exact_family_member_relationship_selection_change_action);
}

function add_nephew_select(select_dropdown) {
	select_dropdown.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>");
	add_dynamic_relative_to_dropdown(select_dropdown, "nephew", "sister");
	add_dynamic_relative_to_dropdown(select_dropdown, "nephew", "brother");
	add_dynamic_relative_to_dropdown(select_dropdown, "nephew", "maternal_halfsister");
	add_dynamic_relative_to_dropdown(select_dropdown, "nephew", "maternal_halfbrother");
	add_dynamic_relative_to_dropdown(select_dropdown, "nephew", "paternal_halfsister");
	add_dynamic_relative_to_dropdown(select_dropdown, "nephew", "paternal_halfbrother");

	select_dropdown.on("change", exact_family_member_relationship_selection_change_action);
}

function add_grandson_select(select_dropdown) {
	select_dropdown.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>");
	add_dynamic_relative_to_dropdown(select_dropdown, "grandson", "daughter");
	add_dynamic_relative_to_dropdown(select_dropdown, "grandson", "son");

	select_dropdown.on("change", exact_family_member_relationship_selection_change_action);
}

function add_granddaughter_select(select_dropdown) {
	select_dropdown.append("<OPTION value=''> " + $.t("fhh_js.please_specify") + " </OPTION>");
	add_dynamic_relative_to_dropdown(select_dropdown, "granddaughter", "daughter");
	add_dynamic_relative_to_dropdown(select_dropdown, "granddaughter", "son");

	select_dropdown.on("change", exact_family_member_relationship_selection_change_action);
}

function exact_family_member_relationship_selection_change_action() {
	if ($("#add_personal_information_dialog").dialog( "isOpen" ) == false &&
			$("#update_family_member_health_history_dialog").dialog( "isOpen" ) == false) {
		relationship = $("#new_family_member_exact_relationship").val();
		// Overloaded the value with relationship:parent_id
		parent_id = relationship.split(":")[1];
		relationship = relationship.split(":")[0];

	//	alert (relationship);
		// for dynamic relationships, they all have _#, we need to find the first empty one to use

		if (personal_information == null) {
			alert("No Personal Information Set yet");
			return
		}

		var i=0;
		while (personal_information[relationship + "_" + i] != null) i++;

		current_relationship = relationship + "_" + i;
	//	alert ("Exact Relationship ID: " + current_relationship);
		create_new_family_member(current_relationship, relationship, parent_id, i );
		family_member_information.relationship = relationship;

		clear_and_set_current_family_member_health_history_dialog(family_member_information);

		$("#new_family_member_dialog").dialog("close");
		$( "#update_family_member_health_history_dialog").dialog( "open" );
	}
}

function create_new_family_member(current_relationship, relationship, parent_id, i ) {
	family_member_information = new Object();
	current_health_history = [];

	if (parent_id != null && parent_id.length > 0) {
//		alert ("Adding Parent: " + parent_id);
		family_member_information.relationship = relationship;
		family_member_information.parent_id = parent_id;
	}
	family_member_information.gender = get_gender(relationship);
	family_member_information.name = get_defaultname(relationship) + " " + i;
	console.log( family_member_information.name );
	personal_information[current_relationship] = family_member_information;

	var table = $("#history_summary_table");
//	add_new_family_history_row(table, "", $.t("fhh_js." + relationship), current_relationship, false, true);
	add_new_family_history_row(table, personal_information[current_relationship], $.t("fhh_js." + relationship), current_relationship, false, true);

}

function get_gender(relationship) {
	switch(relationship) {
			case 'maternal_grandfather':
			case 'paternal_grandfather':
			case 'father':
			case 'brother':
			case 'son':
			case 'maternal_uncle':
			case 'paternal_uncle':
			case 'nephew':
			case 'grandson':
			case 'maternal_halfbrother':
			case 'paternal_halfbrother':
		return "MALE";
			case 'maternal_grandmother':
			case 'paternal_grandmother':
			case 'mother':
			case 'sister':
			case 'daughter':
			case 'maternal_aunt':
			case 'paternal_aunt':
			case 'niece':
			case 'granddaughter':
			case 'maternal_halfsister':
			case 'paternal_halfsister':
		return "FEMALE";
			case 'cousin':
			default:
		return "";
	}
}
function bind_personal_submit_button_action () {

	$("#addPersonInformationSubmitButton").on("click", function() {
		$("#invalid_name_warning").remove();
		$("#invalid_date_of_birth_warning").remove();
		$("#invalid_gender_warning").remove();

		var errors = false;
		if (!check_name_exists($('#personal_info_form_name').val())) {
			if (!$("#invalid_name_warning").length) {
			$('#personal_info_form_name').after(
				$("<span id='invalid_name_warning'> " + $.t("fhh_js.invalid_name") + " </span>").css("color","red"));
			$('input[name="person.name"]').addClass("form_error");
			}
			errors = true;
		}

		if (!check_date_of_birth_in_correct_format($('#personal_info_form_date_of_birth').val())) {
			if (!$("#invalid_date_of_birth_warning").length) {
			$('#personal_info_form_date_of_birth').after(
				$("<span id='invalid_date_of_birth_warning'> " + $.t("fhh_js.invalid_data_of_birth") + " </span>").css("color","red"));
			}
			errors = true;
		}

		if ($("#personal_info_form_gender_male").prop('checked') == false &&
				$("#personal_info_form_gender_female").prop('checked') == false) {
			if (!$("#invalid_gender_warning").length) {
				$('#personal_info_form_gender_female').next().after(
				$("<span id='invalid_gender_warning'> " + $.t("fhh_js.invalid_gender") + " </span>").css("color","red"));
			}
			errors = true;
		}
		
		if (!enteredHealthHistory($('.require_health_history'))) errors = true;

		if (errors) {
			alert ($.t("fhh_js.invalid_data_alert"));
			return false;
		}

		// Check to ensure the user has not entered anything in the disease section that they have not saved.
		var disease_name = $("#add_personal_information_dialog").find("#disease_choice_select").val();
		var disease_code = $("#add_personal_information_dialog").find("#detailed_disease_choice_select").val();
		var age_at_diagnosis = $("#add_personal_information_dialog").find("#age_at_diagnosis_select").val();

		var half_way_through_adding_disease = false;
		if (disease_name && disease_name != 'not_picked') half_way_through_adding_disease = true;
		if (disease_code && disease_code != 'not_picked') half_way_through_adding_disease = true;
		if (age_at_diagnosis && age_at_diagnosis != 'not_picked') half_way_through_adding_disease = true;

		if (half_way_through_adding_disease) {
			alert ($.t("fhh_js.halfway_through_adding_disease"));
			return false;
		}

		// Determine the values from the form
		if (personal_information == null) reset_personal_information();
		if (personal_information.id == null) personal_information['id'] = guid();
		personal_information['name'] = $("#personal_info_form_name").val();
		personal_information['gender'] = $('input[name="person.gender"]:checked').val();
		personal_information['date_of_birth'] = $('#personal_info_form_date_of_birth').val();
		personal_information['twin_status'] = $('input[name="person.twin_status"]:checked').val();
		personal_information['adopted'] = $('input[name="person.adopted"]').prop('checked');

		var height_inches = parseInt($('#personal_height_inches').val());
		var height_feet = parseInt($('#personal_height_feet').val());
		var height_centimeters = parseInt($('#personal_height_centimeters').val());
		if (height_feet > 0 || height_inches > 0 ) {
			if (isNaN(height_feet)) height_feet = 0;
			if (isNaN(height_inches)) height_inches = 0;
			personal_information['height'] = height_feet * 12 + height_inches;
			personal_information['height_unit'] = 'inches';
		} else if (height_centimeters > 0) {
			if (isNaN(height_centimeters)) height_centimeters = 0;
			personal_information['height'] = height_centimeters;
			personal_information['height_unit'] = 'centimeters';
		} else {
			personal_information['height'] = "";
			personal_information['height_unit'] = "";
		}

		// personal_information にフォームの値を格納
		personal_information['prefectures'] = $('#personal_info_form_place_of_birth').val();
		personal_information['weight'] = $('#personal_weight').val();
		personal_information['weight_unit'] = $('#personal_weight_unit').val();

		// 生年、月
		personal_information['month_of_birth'] = $('#personal_info_form_month_of_birth').val();
		personal_information['year_of_birth'] = $('#personal_info_form_year_of_birth').val();

		// 生まれ順
		var isUp = false;
		if ( $('#birth_order').val() == null || $('#birth_order').val() == "") {
			personal_information['birth_order'] = 1;
		} else {
			var nextBirthOrder = parseInt($('#birth_order').val(), 10);
			isUp = ( nextBirthOrder > personal_information['birth_order'] );
			personal_information['birth_order'] = nextBirthOrder;
		}


		// 居住地、腹囲、臀囲
		personal_information['living_prefectures'] = $('#personal_info_form_current_place').val();
		personal_information['waist'] = $('#additional_information_waist').val();
		personal_information['waist_unit'] = 'centimeters';
		personal_information['hip'] = $('#additional_information_hip').val();
		personal_information['hip_unit'] = 'centimeters';

		// 双子、養子、喫煙状況、運動状況、食習慣の情報保存
		personal_information['smoker'] = $('input[name="smoker"]:checked').val();
		personal_information['number_of_cigarettes_per_day'] = $('input[name="additional_information_number_of_cigarettes_per_day"]:checked').val();

		personal_information['training_family'] = $('input[name="training"]:checked').val();
		personal_information['training_strength'] = $('#training_strength').val();
		personal_information['training_count_for_training_at_week'] = $('#count_for_training_at_week').val();
		personal_information['training_time_for_training_at_week'] = $('#time_for_training_at_week').val();

		personal_information['training_frequency_to_walk_in_week'] = $('input[name="additional_information.frequency_to_walk_in_week"]:checked').val();
		personal_information['training_frequency_to_exercise_in_week'] = $('input[name="additional_information.frequency_to_exercise_in_week"]:checked').val();
		personal_information['training_fast_walker'] = $('input[name="additional_information.fast_walker"]:checked').val();

		personal_information['dietary_frequency_to_eat_fruits_in_day'] = $('input[name="additional_information.frequency_to_eat_fruits_in_day"]:checked').val();
		personal_information['dietary_frequency_to_eat_vegetables_in_day'] = $('input[name="additional_information.frequency_to_eat_vegetables_in_day"]:checked').val();
		personal_information['dietary_frequency_to_eat_nuts_in_week'] = $('input[name="additional_information.frequency_to_eat_nuts_in_week"]:checked').val();
		personal_information['dietary_frequency_to_eat_whole_grains_in_day'] = $('input[name="additional_information.frequency_to_eat_whole_grains_in_day"]:checked').val();
		personal_information['dietary_frequency_to_eat_fishes_in_week'] = $('input[name="additional_information.frequency_to_eat_fishes_in_week"]:checked').val();
		personal_information['dietary_frequency_to_eat_dairy_products_in_day'] = $('input[name="additional_information.frequency_to_eat_dairy_products_in_day"]:checked').val();
		personal_information['dietary_frequency_to_eat_processed_meat_in_week'] = $('input[name="additional_information.frequency_to_eat_processed_meat_in_week"]:checked').val();
		personal_information['dietary_frequency_to_eat_unprocessed_meat_in_week'] = $('input[name="additional_information.frequency_to_eat_unprocessed_meat_in_week"]:checked').val();
		personal_information['dietary_frequency_to_drink_suger_drin_in_week'] = $('input[name="additional_information.frequency_to_drink_suger_drin_in_week"]:checked').val();
		personal_information['dietary_usual_meal'] = $('input[name="additional_information.usual_meal"]:checked').val();
		personal_information['dietary_frequency_to_eat_miso_soup_in_day'] = $('input[name="additional_information.frequency_to_eat_miso_soup_in_day"]:checked').val();
		personal_information['dietary_seasoning_of_meals'] = $('input[name="additional_information.seasoning_of_meals"]:checked').val();
		personal_information['dietary_frequency_to_eat_breakfast_in_week'] = $('input[name="additional_information.frequency_to_eat_breakfast_in_week"]:checked').val();
		personal_information['dietary_eating_speed'] = $('input[name="additional_information.eating_speed"]:checked').val();
		personal_information['dietary_frequency_to_drink_in_week'] = $('input[name="additional_information.frequency_to_drink_in_week"]:checked').val();
		personal_information['dietary_amount_to_drink'] = $('input[name="additional_information.amount_to_drink"]:checked').val();

		// 血圧、血糖値、コレステロールの情報保存
		personal_information['take_antihypertensive'] = $('input[name="additional_information.take_antihypertensive"]:checked').val();
		personal_information['systolic_blood_pressure'] = $('#additional_information_systolic_blood_pressure').val();
		personal_information['diastolic_blood_pressure'] = $('#additional_information_diastolic_blood_pressure').val();

		personal_information['take_hypoglycemic'] = $('input[name="additional_information.take_hypoglycemic"]:checked').val();
		personal_information['fasting_blood_glucose_lebel'] = $('#additional_information_fasting_blood_glucose_lebel').val();
		personal_information['occasionally_blood_glucose_lebel'] = $('#additional_information_occasionally_blood_glucose_lebel').val();
		personal_information['ogtt_blood_glucose_lebel'] = $('#additional_information_ogtt_blood_glucose_lebel').val();
		personal_information['hba1c'] = $('#additional_information_hba1c').val();

		personal_information['hdl_cholesterol'] = $('#additional_information_hdl_cholesterol').val();
		personal_information['ldl_cholesterol'] = $('#additional_information_ldl_cholesterol').val();

		// 最終診断年月の情報保存
		personal_information['last_diagnosis_year'] = $('#last_diagnosis_year').val();
		personal_information['last_diagnosis_month'] = $('#last_diagnosis_month').val();

		personal_information['Health History'] = current_health_history;

		personal_information['consanguinity'] = $("#personal_race_ethnicity").find('input[name="person.consanguinity"]:checked').val();

		// Use #personal_race_ethnicity
		personal_information['race'] = new Object();
		personal_information['race']['American Indian or Alaska Native'] = $("#personal_race_ethnicity").find("#selectedRaces-1").is(':checked');
		personal_information['race']['Asian'] = $("#personal_race_ethnicity").find("#selectedRaces-2").is(':checked');
		personal_information['race']['Black or African-American'] = $("#personal_race_ethnicity").find("#selectedRaces-3").is(':checked');
		personal_information['race']['Native Hawaiian or Other Pacific Islander'] = $("#personal_race_ethnicity").find("#selectedRaces-4").is(':checked');
		personal_information['race']['White'] = $("#personal_race_ethnicity").find("#selectedRaces-5").is(':checked');

		personal_information['race']['Asian Indian'] = $("#personal_race_ethnicity").find("#selectedRaces-11").is(':checked');
		personal_information['race']['Chinese'] = $("#personal_race_ethnicity").find("#selectedRaces-12").is(':checked');
		personal_information['race']['Filipino'] = $("#personal_race_ethnicity").find("#selectedRaces-13").is(':checked');
		personal_information['race']['Japanese'] = $("#personal_race_ethnicity").find("#selectedRaces-14").is(':checked');
		personal_information['race']['Korean'] = $("#personal_race_ethnicity").find("#selectedRaces-15").is(':checked');
		personal_information['race']['Vietnamese'] = $("#personal_race_ethnicity").find("#selectedRaces-16").is(':checked');
		personal_information['race']['Other Asian'] = $("#personal_race_ethnicity").find("#selectedRaces-17").is(':checked');
		personal_information['race']['Unknown Asian'] = $("#personal_race_ethnicity").find("#selectedRaces-18").is(':checked');

		personal_information['race']['Chamorro'] = $("#personal_race_ethnicity").find("#selectedRaces-21").is(':checked');
		personal_information['race']['Guamanian'] = $("#personal_race_ethnicity").find("#selectedRaces-22").is(':checked');
		personal_information['race']['Native Hawaiian'] = $("#personal_race_ethnicity").find("#selectedRaces-23").is(':checked');
		personal_information['race']['Samoan'] = $("#personal_race_ethnicity").find("#selectedRaces-24").is(':checked');
		personal_information['race']['Unknown South Pacific Islander'] = $("#personal_race_ethnicity").find("#selectedRaces-25").is(':checked');


		personal_information['ethnicity'] = new Object();
		personal_information['ethnicity']['Hispanic or Latino'] = $("#personal_race_ethnicity").find("#selectedEthnicities-1").is(':checked');
		personal_information['ethnicity']['Ashkenazi Jewish'] = $("#personal_race_ethnicity").find("#selectedEthnicities-2").is(':checked');
		personal_information['ethnicity']['Not Hispanic or Latino'] = $("#personal_race_ethnicity").find("#selectedEthnicities-3").is(':checked');

		personal_information['ethnicity']['Central American'] = $("#personal_race_ethnicity").find("#selectedEthnicities-11").is(':checked');
		personal_information['ethnicity']['Cuban'] = $("#personal_race_ethnicity").find("#selectedEthnicities-12").is(':checked');
		personal_information['ethnicity']['Dominican'] = $("#personal_race_ethnicity").find("#selectedEthnicities-13").is(':checked');
		personal_information['ethnicity']['Mexican'] = $("#personal_race_ethnicity").find("#selectedEthnicities-14").is(':checked');
		personal_information['ethnicity']['Other Hispanic'] = $("#personal_race_ethnicity").find("#selectedEthnicities-15").is(':checked');
		personal_information['ethnicity']['Puerto Rican'] = $("#personal_race_ethnicity").find("#selectedEthnicities-16").is(':checked');
		personal_information['ethnicity']['South American'] = $("#personal_race_ethnicity").find("#selectedEthnicities-17").is(':checked');

		bind_smoker_value(personal_information);

		personal_information['update_date']	= PersonalInformationUtil.getCurrentDate();


//		build_family_history_data_table();
			current_health_history = [];
		$("#add_personal_information_dialog").dialog("close");


		//  If there already is a father object, then this is an update, do not try and recreate relatives
		if (personal_information['father'] == null) {
			$("#add_all_family_members_dialog").dialog("open");
		} else {

			// Resort Birth order
			BirthOrderUtil.ResortBirthOrder( personal_information, "self" ,isUp);

			build_family_history_data_table()
			// update_personal_history_row();
			// update_birth_order_col();

			ScoreCardController.refresh();
		}
		
		cancel_before_create_family_members();
	});
}

function bind_smoker_value ( target ) {
	if( $('input[name="smoker"]:checked').val() != undefined )
		target['smoker'] =  $('input[name="smoker"]:checked').val();
}

function check_name_exists(name) {
	if (name == null || name.length == 0) return false;
	else return true;
}

function check_date_of_birth_in_correct_format (date_of_birth) {
	if (date_of_birth == null || date_of_birth.length == 0) return false;

 	re = /^\d{4}\/\d{2}\/\d{2}$/;
 	if(!date_of_birth.match(re)) {
 		return false;
 	}
// 	date_info = date_of_birth.split(re);
  date_info = date_of_birth.split(/[.,\/ -]/);

  if (date_info[1] > 12) return false
  if (date_info[1] == 1 && date_info[2] > 31) return false;
  if (date_info[1] == 2 && date_info[2] > 29) return false;
  if (date_info[1] == 3 && date_info[2] > 31) return false;
  if (date_info[1] == 4 && date_info[2] > 30) return false;
  if (date_info[1] == 5 && date_info[2] > 31) return false;
  if (date_info[1] == 6 && date_info[2] > 30) return false;
  if (date_info[1] == 7 && date_info[2] > 31) return false;
  if (date_info[1] == 8 && date_info[2] > 31) return false;
  if (date_info[1] == 9 && date_info[2] > 30) return false;
  if (date_info[1] == 10 && date_info[2] > 31) return false;
  if (date_info[1] == 11 && date_info[2] > 30) return false;
  if (date_info[1] == 12 && date_info[2] > 31) return false;

  var today = new Date();
  var this_year = today.getFullYear();
  var this_month =  today.getMonth()+1;
  var this_day = today.getDate();

  if (date_info[0] < 1890 || date_info[0] > this_year) return false;
  if (date_info[0] == this_year && date_info[1] > this_month) return false;
  if (date_info[0] == this_year && date_info[1] == this_month && date_info[1] > this_day) return false;

  if (date_info[0] % 4 != 0 && date_info[1] == 2 && date_info[1] == 29) return false;

	return true;
}

function bind_personal_cancel_button_action () {
	$("#addPersonInformationCancelButton").on("click", cancel_add_personal_information)
}

function cancel_add_personal_information() {
	$("#invalid_name_warning").remove();
	$("#invalid_date_of_birth_warning").remove();
	$("#invalid_gender_warning").remove();
	$("input[name='person.name']").removeClass("form_error");

	var errors = false;
	if (!check_name_exists($('#personal_info_form_name').val())) {
		if (!$("#invalid_name_warning").length) {
		$('#personal_info_form_name').after(
			$("<span id='invalid_name_warning'> " + $.t("fhh_js.invalid_name") + " </span>").css("color","red"));
		$('input[name="person.name"]').addClass("form_error");
		}
		errors = true;
	}

	if (!check_date_of_birth_in_correct_format($('#personal_info_form_date_of_birth').val())) {
		if (!$("#invalid_date_of_birth_warning").length) {
		$('#personal_info_form_date_of_birth').after(
			$("<span id='invalid_date_of_birth_warning'> " + $.t("fhh_js.invalid_data_of_birth") + " </span>").css("color","red"));
		}
		errors = true;
	}

	if ($("#personal_info_form_gender_male").prop('checked') == false &&
			$("#personal_info_form_gender_female").prop('checked') == false) {
		if (!$("#invalid_gender_warning").length) {
			$('#personal_info_form_gender_female').next().after(
			$("<span id='invalid_gender_warning'> " + $.t("fhh_js.invalid_gender") + " </span>").css("color","red"));
		}
		errors = true;
	}

	if (errors) {
		alert ($.t("fhh_js.invalid_data_alert"));
		return false;
	}

	personal_information['name'] = $("#personal_info_form_name").val();
	personal_information['gender'] = $('input[name="person.gender"]:checked').val();
	personal_information['date_of_birth'] = $('#personal_info_form_date_of_birth').val();

	$("#alert_age_at_diagnosis").hide();

//	alert (typeof personal_information);
	current_health_history = [];

	cancel_before_create_family_members();
	$("#add_personal_information_dialog").dialog("close");
}

function bind_personal_help_button_action () {
	$("#add-help").on("click", function() {
		$("#personal_help_dialog").dialog("open");
		
		// 閉じるボタン
		$('#closePersonalHelpDialogButton').on('click', function(){
			$("#personal_help_dialog").dialog('close');
		});
	});
}

function bind_family_member_help_button_action () {
	$("#update-help").on("click", function() {
		$("#update_help_dialog").dialog("open");
	});
}

function bind_load_help_button_action() {
	$("#load-help").on("click", function() {
		$("#load_help_dialog").dialog("open");
	});
}

function bind_immediate_help_button_action() {
	$("#immediate-help").on("click", function() {
		$("#immediate_help_dialog").dialog("open");

		// 閉じるボタン
		$('#closeImmediateHelpDialogButton').on('click', function(){
			$("#immediate_help_dialog").dialog('close');
		});
	});
}


function bind_family_member_submit_button_action () {
	// Validation age determination

	$("#addFamilyMemberSubmitButton").on("click", function() {

		// Cause of Death or Age/Estimated-Age variables
		var alive_flag = $("#is_person_alive").val();
		var age_determination_flag = $('#age_determination').val();
		var age_determination_date_of_birth = $('#family_info_form_date_of_birth').val();
		var age_determination_text = $('#age_determination_text').val();
		var estimated_age = $('#estimated_age_select').val();
		var cause_of_death = $('#cause_of_death_select').val();

	$("#family_invalid_gender_warning").remove();
	$("#invalid_date_of_birth_warning").remove();


		var errors = false;
//		 alert("AF:["+alive_flag+"]ADF:["+(age_determination_flag=='date_of_birth')+"]ADT:["+age_determination_text+"]");
		if (alive_flag == 'alive') {
			if (age_determination_flag == !check_date_of_birth_in_correct_format(age_determination_date_of_birth)) {
				errors = true;
				$('#age_determination_date_of_birth').after(
					$("<span id='invalid_date_of_birth_warning'> " + $.t("fhh_js.invalid_data_of_birth") + " </span>").css("color","red"));
			} else if (age_determination_flag == 'age'
					&& !(parseInt(age_determination_text) > 0
					&&  parseInt(age_determination_text) < 150)) {
				errors = true;
				$('#age_determination_text').after(
					$("<span id='invalid_date_of_birth_warning'> " + $.t("fhh_js.invalid_age") + " </span>").css("color","red"));
			}
		}

		if (!enteredHealthHistory($('.require_health_history'))) errors = true;

		// All Family members must have a gender, most already do, but cousins may be an issue.
		if ($("#family_member_info_form_gender_male").prop('checked') == false &&
				$("#family_member_info_form_gender_female").prop('checked') == false) {
			if (!$("#family_invalid_gender_warning").length) {
				$('#family_member_info_form_gender_female').next().after(
				$("<span id='family_invalid_gender_warning'> " + $.t("fhh_js.invalid_gender") + " </span>").css("color","red"));
			}
			errors = true;
		}

		if (errors) {
			alert ($.t("fhh_js.invalid_data_alert"));
			return false;
		}

		// check if cause of death is blank throw error message. check if age at death is blank, throw error //
		if ($("#is_person_alive").val()=='dead') {
			// if ($("#estimated_death_age_select").val()==null || $("#estimated_death_age_select").val()=='not_picked') {
			// 	alert ($.t("fhh_js.age_at_diagnosis_select"));
			// 	return false;
			// }
			// else {
			// 	if ($("#cause_of_death_select").val()=='other' && $("#new_disease_name_cod").val()=='') {
			// 		alert ($.t("fhh_js.invalid_cause_of_death"));
			// 		return false;
			// 	}
			// 	else {
			// 		if ($("#cause_of_death_select").val()==null || $("#cause_of_death_select").val()=='not_picked') {
			// 			alert ($.t("fhh_js.invalid_cause_of_death"));
			// 			return false;
			// 		}
			// 		if ($("#detailed_cause_of_death_select").val()=='not_picked') {
			// 			alert($.t("fhh_js.disease_subtype_select"));
			// 			return false;
			// 		}
			// 	}
			// }
			if ($("#cause_of_death_select").val()=='other' && $("#new_disease_name_cod").val()=='') {
				alert ($.t("fhh_js.disease_name_enter"));
				return false;
			}
			else if ($("#cause_of_death_select").val()==null || $("#cause_of_death_select").val()=='not_picked') {
					alert ($.t("fhh_js.invalid_cause_of_death"));
					return false;
			}
			else if ($("#detailed_cause_of_death_select").val()=='not_picked') {
					alert($.t("fhh_js.disease_subtype_select"));
					return false;
			}
			else if ($("#estimated_death_age_select").val()==null || $("#estimated_death_age_select").val()=='not_picked') {
				alert ($.t("fhh_js.age_at_diagnosis_select"));
				return false;
			}
		}


		// Check to ensure the user has not entered anything in the disease section that they have not saved.
		var disease_name = $("#update_family_member_health_history_dialog").find("#disease_choice_select").val();
		var disease_code = $("#update_family_member_health_history_dialog").find("#detailed_disease_choice_select").val();
		var age_at_diagnosis = $("#update_family_member_health_history_dialog").find("#age_at_diagnosis_select").val();

		var half_way_through_adding_disease = false;
		if (disease_name && disease_name != 'not_picked') half_way_through_adding_disease = true;
		if (disease_code && disease_code != 'not_picked') half_way_through_adding_disease = true;
		if (age_at_diagnosis && age_at_diagnosis != 'not_picked') half_way_through_adding_disease = true;

		if (half_way_through_adding_disease) {
			alert ($.t("fhh_js.halfway_through_adding_disease"));
			return false;
		}


		var relationship = "";
		if (current_relationship == 'father' || current_relationship == 'mother'
		 || current_relationship == 'paternal_grandfather' || current_relationship == 'paternal_grandmother'
		 || current_relationship == 'maternal_grandfather' || current_relationship == 'maternal_grandmother') {
		 	relationship = current_relationship;
		} else {
			relationship = current_relationship.substring(0, current_relationship.lastIndexOf('_'));
		}

		var family_member_information;
		if (personal_information[current_relationship] != null) family_member_information = personal_information[current_relationship];
		else family_member_information = new Object();


		family_member_information['relationship'] = relationship;
		if (family_member_information['id'] == null ) family_member_information['id'] = guid();
		family_member_information['parent_id'] = $("#family_member_parent_id").val();
		family_member_information['name'] = $("#family_member_info_form_name").val();
		family_member_information['gender'] = $('input[name="family.member.gender"]:checked').val();
		family_member_information['twin_status'] = $('input[name="family.member.twin_status"]:checked').val();
		family_member_information['adopted'] = $('input[name="family.member.adopted"]').prop("checked");
		family_member_information['prefectures'] = $('#family_member_info_form_place_of_birth').val();
		family_member_information['living_prefectures'] = $('#family_member_info_form_living_place').val();

		// 生まれ順
		var isUp = false;
		if ( $('#family_member_birth_order').val() == null || $('#family_member_birth_order').val() == "") {
			family_member_information['birth_order'] = 1;
			isUp = true;
		} else {
			var nextBirthOrder =  parseInt($('#family_member_birth_order').val(), 10);
			isUp = ( nextBirthOrder > family_member_information['birth_order'] );
			family_member_information['birth_order'] = nextBirthOrder;
		}

		if (alive_flag == 'alive') {
			family_member_information['is_alive'] = 'alive';
			if (age_determination_flag == 'date_of_birth') {
				if (family_member_information['cause_of_death']) delete family_member_information['cause_of_death'];
				if (family_member_information['detailed_cause_of_death']) delete family_member_information['detailed_cause_of_death'];
				if (family_member_information['estimated_death_age']) delete family_member_information['estimated_death_age'];
				if (family_member_information['cause_of_death_code']) delete family_member_information['cause_of_death_code'];

				family_member_information['date_of_birth'] = age_determination_date_of_birth;
				family_member_information['year_of_birth'] = $('#family_info_form_year_of_birth').val();
				family_member_information['month_of_birth'] = $('#family_info_form_month_of_birth').val();
				if (family_member_information['estimated_age'] != null) delete family_member_information['estimated_age'];
				if (family_member_information['age'] != null) delete family_member_information['age'];

			} else if (age_determination_flag == 'age') {
				family_member_information['age'] = parseInt(age_determination_text);
				if (family_member_information['date_of_birth'] != null) delete family_member_information['date_of_birth'];
				if (family_member_information['year_of_birth'] != null) delete family_member_information['year_of_birth'];
				if (family_member_information['month_of_birth'] != null) delete family_member_information['month_of_birth'];
				if (family_member_information['estimated_age'] != null) delete family_member_information['estimated_age'];

			} else if (age_determination_flag == 'estimated_age') {
				family_member_information['estimated_age'] = estimated_age;
				if (family_member_information['date_of_birth'] != null) delete family_member_information['date_of_birth'];
				if (family_member_information['year_of_birth'] != null) delete family_member_information['year_of_birth'];
				if (family_member_information['month_of_birth'] != null) delete family_member_information['month_of_birth'];
				if (family_member_information['age'] != null) delete family_member_information['age'];
			}
		} else if (alive_flag == 'dead') {

			var cod_disease;

			if ($("#new_disease_name_cod").val() != "" && $("#new_disease_name_cod").val() != undefined) {
				cod_disease = does_disease_exist($("#new_disease_name_cod").val())[1];
			}

			var other_new_disease = false;
			family_member_information['is_alive'] = 'dead';

			var cause_of_death_code = $('#detailed_cause_of_death_select').val();
			var do_not_translate = false;
			var other_disease_label = $("#cause_of_death_select :selected").attr('class');

			if (cause_of_death_code != null && cause_of_death_code != "") {
				detailed_cause_of_death = $.t($('#detailed_cause_of_death_select').val());
			} else {
				other_new_disease = true;

				if ($("#cause_of_death_select").val() == 'other') {
					cause_of_death_code = cod_disease;

					if ($("#new_disease_name_cod").val() != "") {
						detailed_cause_of_death = cod_disease;
					} else {
						detailed_cause_of_death = cause_of_death;
					}

	 			} else {
	 				do_not_translate = true;
	 				cause_of_death_code = $("#cause_of_death_select").val();
	 				detailed_cause_of_death = cause_of_death_code;
	 			}

			}

			var estimated_death_age = $('#estimated_death_age_select').val();

			if (estimated_death_age == null || estimated_death_age == 'not_picked' || estimated_death_age == '') {
				estimated_death_age = 'unknown';
			}

			if (cause_of_death=='other') {
				family_member_information['cause_of_death'] = "other"; //cause_of_death_code;
			} else {
				family_member_information['cause_of_death'] = cause_of_death;
			}

			var re = /SNOMED_CT/;

			if ($('#cause_of_death_select option:selected').text() == $('#detailed_cause_of_death_select option:selected').text()) {
				var cause_of_death_code_is_snomed = null;
			} else {
				var cause_of_death_code_is_snomed = re.exec(cause_of_death_code);
			}

			if (cause_of_death == 'other') {
				family_member_information['detailed_cause_of_death'] = cod_disease;
			} else {

				if (do_not_translate) {
					family_member_information['detailed_cause_of_death'] = cause_of_death_code;
				} else {
					// if this is really a newly added disease this will be null
					family_member_information['detailed_cause_of_death'] = $.t("diseases:" + cause_of_death_code);
				}

			}

			family_member_information['estimated_death_age'] = estimated_death_age;
			family_member_information['cause_of_death_code'] = cause_of_death_code;

			// Check to see if the cause of death code is already in history.

			var new_disease = true;

			for (var i=0; i< current_health_history.length; i++) {

				if (current_health_history[i]['Disease Code']=='other' || current_health_history[i]['Disease Code']=='other-undefined') {

					if (family_member_information['cause_of_death_code'] == current_health_history[i]['Disease Name']) {
						new_disease = false;
					}

				}

				if (family_member_information['cause_of_death_code'] == current_health_history[i]['Disease Code']) {
					new_disease = false;
				}

			}

			if (new_disease && cause_of_death != null && cause_of_death_code != null && cause_of_death_code != 'not_picked') {

				if (cause_of_death=='other') {
					cod_temp = cause_of_death_code;
					code_temp = 'other-undefined';
				} else {
					cod_temp = cause_of_death_code;
					code_temp = cause_of_death_code;
				}

				if (other_disease_label=='other_disease') {
					code_temp = 'other'
				}

				specific_health_issue = {"Disease Name": cod_temp,
				                          "Detailed Disease Name": family_member_information['detailed_cause_of_death'],
				                          "Age At Diagnosis": estimated_death_age,
				                          "Disease Code": code_temp};
//				current_health_history.push(specific_health_issue);
			} //changed Unknown to estimated_death_age Bug 103

			if (other_new_disease) {
//				add_other_disease(family_member_information['detailed_cause_of_death'])
			}

		} else if (alive_flag == 'unknown') {
			family_member_information['is_alive'] = 'unknown';
		}

		// 双子、養子、喫煙状況、運動状況、食習慣の情報保存
		family_member_information['smoker_family'] = $('input[name="smoker_family"]:checked').val();
		family_member_information['family_number_of_cigarettes_per_day'] = $('input[name="additional_information_number_of_cigarettes_per_day_family"]:checked').val();

		family_member_information['training_family'] = $('input[name="training_family"]:checked').val();
		family_member_information['training_strength'] = $('#training_strength_family').val();
		family_member_information['training_count_for_training_at_week'] = $('#count_for_training_at_week_family').val();
		family_member_information['training_time_for_training_at_week'] = $('#time_for_training_at_week_family').val();

		family_member_information['training_frequency_to_walk_in_week'] = $('input[name="additional_information.frequency_to_walk_in_week_family"]:checked').val();
		family_member_information['training_frequency_to_exercise_in_week'] = $('input[name="additional_information.frequency_to_exercise_in_week_family"]:checked').val();
		family_member_information['training_fast_walker'] = $('input[name="additional_information.fast_walker_family"]:checked').val();

		family_member_information['dietary_frequency_to_eat_fruits_in_day'] = $('input[name="additional_information.frequency_to_eat_fruits_in_day_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_vegetables_in_day'] = $('input[name="additional_information.frequency_to_eat_vegetables_in_day_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_nuts_in_week'] = $('input[name="additional_information.frequency_to_eat_nuts_in_week_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_whole_grains_in_day'] = $('input[name="additional_information.frequency_to_eat_whole_grains_in_day_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_fishes_in_week'] = $('input[name="additional_information.frequency_to_eat_fishes_in_week_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_dairy_products_in_day'] = $('input[name="additional_information.frequency_to_eat_dairy_products_in_day_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_processed_meat_in_week'] = $('input[name="additional_information.frequency_to_eat_processed_meat_in_week_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_unprocessed_meat_in_week'] = $('input[name="additional_information.frequency_to_eat_unprocessed_meat_in_week_family"]:checked').val();
		family_member_information['dietary_frequency_to_drink_suger_drin_in_week'] = $('input[name="additional_information.frequency_to_drink_suger_drin_in_week_family"]:checked').val();
		family_member_information['dietary_usual_meal'] = $('input[name="additional_information.usual_meal_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_miso_soup_in_day'] = $('input[name="additional_information.frequency_to_eat_miso_soup_in_day_family"]:checked').val();
		family_member_information['dietary_seasoning_of_meals'] = $('input[name="additional_information.seasoning_of_meals_family"]:checked').val();
		family_member_information['dietary_frequency_to_eat_breakfast_in_week'] = $('input[name="additional_information.frequency_to_eat_breakfast_in_week_family"]:checked').val();
		family_member_information['dietary_eating_speed'] = $('input[name="additional_information.eating_speed_family"]:checked').val();
		family_member_information['dietary_frequency_to_drink_in_week'] = $('input[name="additional_information.frequency_to_drink_in_week_family"]:checked').val();
		family_member_information['dietary_amount_to_drink'] = $('input[name="additional_information.amount_to_drink_family"]:checked').val();

		if ($('#age_determinion').val() == 'Age') family_member_information['age'] = $('#age_determinion_text').val();
		var date_of_birth = $('#age_determinion_text').val();

		family_member_information['Health History'] = current_health_history;

		family_member_information['race'] = new Object();
		family_member_information['race']['American Indian or Alaska Native'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-1").is(':checked');
		family_member_information['race']['Asian'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-2").is(':checked');
		family_member_information['race']['Black or African-American'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-3").is(':checked');
		family_member_information['race']['Native Hawaiian or Other Pacific Islander'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-4").is(':checked');
		family_member_information['race']['White'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-5").is(':checked');

		family_member_information['race']['Asian Indian'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-11").is(':checked');
		family_member_information['race']['Chinese'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-12").is(':checked');
		family_member_information['race']['Filipino'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-13").is(':checked');
		family_member_information['race']['Japanese'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-14").is(':checked');
		family_member_information['race']['Korean'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-15").is(':checked');
		family_member_information['race']['Vietnamese'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-16").is(':checked');
		family_member_information['race']['Other Asian'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-17").is(':checked');
		family_member_information['race']['Unknown Asian'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-18").is(':checked');

		family_member_information['race']['Chamorro'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-21").is(':checked');
		family_member_information['race']['Guamanian'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-22").is(':checked');
		family_member_information['race']['Native Hawaiian'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-23").is(':checked');
		family_member_information['race']['Samoan'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-24").is(':checked');
		family_member_information['race']['Unknown South Pacific Islander'] = $("#family_race_ethnicity").find("#selectedFamilyRaces-25").is(':checked');

		family_member_information['ethnicity'] = new Object();
		family_member_information['ethnicity']['Hispanic or Latino'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-1").is(':checked');
		family_member_information['ethnicity']['Ashkenazi Jewish'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-2").is(':checked');
		family_member_information['ethnicity']['Not Hispanic or Latino'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-3").is(':checked');

		family_member_information['ethnicity']['Central American'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-11").is(':checked');
		family_member_information['ethnicity']['Cuban'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-12").is(':checked');
		family_member_information['ethnicity']['Dominican'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-13").is(':checked');
		family_member_information['ethnicity']['Mexican'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-14").is(':checked');
		family_member_information['ethnicity']['Other Hispanic'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-15").is(':checked');
		family_member_information['ethnicity']['Puerto Rican'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-16").is(':checked');
		family_member_information['ethnicity']['South American'] = $("#family_race_ethnicity").find("#selectedFamilyEthnicities-17").is(':checked');

		family_member_information['update_date'] = PersonalInformationUtil.getCurrentDate();

		personal_information[current_relationship] = family_member_information;


		// Resort Birth order
		BirthOrderUtil.ResortBirthOrder( personal_information, current_relationship, isUp );

		build_family_history_data_table();
		// update_family_history_row(current_relationship, family_member_information);
		// update_birth_order_col();

		ScoreCardController.refresh();

		current_health_history = [];
		$("#update_family_member_health_history_dialog").dialog("close");

	});
}

function enteredHealthHistory(errorMessageObj) {

	if (current_health_history.length == 0) {
		$(errorMessageObj).show();
		return false;
	}

	$(errorMessageObj).hide();
	return true;
}

function bind_family_member_cancel_button_action () {
	$("#addFamilyMemberCancelButton").on("click", cancel_update_family_member);
}

function cancel_update_family_member() {
//		alert ("Cancelling Family Member Information: " + current_relationship);

	if (personal_information[current_relationship] == null || personal_information[current_relationship].id == null
		&& current_relationship != 'self'
		&& current_relationship != 'mother' && current_relationship != 'father'
		&& current_relationship != 'paternal_grandmother' && current_relationship != 'paternal_grandfather'
		&& current_relationship != 'maternal_grandmother' && current_relationship != 'maternal_grandfather'
	) {
		remove_family_member(current_relationship, false);
	}

	current_health_history = [];

	$("#update_family_member_health_history_dialog").dialog("close");
}

function bind_add_all_family_members_submit_button_action() {

	$("#create_immediate_family_submit").on("click",create_immediate_family_submit);
}

function cancel_before_create_family_members(){

	if( typeof personal_information['father'] != 'undefined') return;

	build_default_personal_information();
	build_family_history_data_table();

}

function create_immediate_family_submit(){
	
	build_default_personal_information();

	build_family_history_data_table();

	$("#add_another_family_member_button").show();

	// $("#firstVari").text("You have unsaved data!");
	$("#firstVari").text("未保存のデータがあります！");
	$("#firstVari").css("visibility","visible");
	$("#firstVari").addClass("label_alert");
	$("tt1").removeClass("green-text");
	$("tt1").addClass("red-text");
	$("#save_personal_history_button").css("background-color","red");

	$("#add_all_family_members_dialog").dialog("close");

	// Created Date
	personal_information['created_date'] = getCreatedDate();
}

function build_default_personal_information() {
	var number_brothers = parseInt($("#family_brothers").val()) || 0;
	var number_sisters = parseInt($("#family_sisters").val()) || 0;
	var number_sons = parseInt($("#family_sons").val()) || 0;
	var number_daughters = parseInt($("#family_daughters").val()) || 0;
	var number_maternal_uncles = parseInt($("#family_maternal_uncles").val()) || 0;
	var number_maternal_aunts = parseInt($("#family_maternal_aunts").val()) || 0;
	var number_paternal_uncles = parseInt($("#family_paternal_uncles").val()) || 0;
	var number_paternal_aunts = parseInt($("#family_paternal_aunts").val()) || 0;

	personal_information['father'] = { 'gender': 'MALE' };
	personal_information['father'].id = guid();
	personal_information['father']['Health History'] = [];
	personal_information['father'].name = get_defaultname('father');

	personal_information['mother'] = { 'gender': 'FEMALE' };
	personal_information['mother'].id = guid();
	personal_information['mother']['Health History'] = [];
	personal_information['mother'].name = get_defaultname('mother');

	personal_information['maternal_grandfather'] = { 'gender': 'MALE' };
	personal_information['maternal_grandfather'].id = guid();
	personal_information['maternal_grandfather']['Health History'] = [];
	personal_information['maternal_grandfather'].name = get_defaultname('maternal_grandfather');

	personal_information['maternal_grandmother'] = { 'gender': 'FEMALE' };
	personal_information['maternal_grandmother'].id = guid();
	personal_information['maternal_grandmother']['Health History'] = [];
	personal_information['maternal_grandmother'].name = get_defaultname('maternal_grandmother');

	personal_information['paternal_grandfather'] = { 'gender': 'MALE' };
	personal_information['paternal_grandfather'].id = guid();
	personal_information['paternal_grandfather']['Health History'] = [];
	personal_information['paternal_grandfather'].name = get_defaultname('paternal_grandfather');

	personal_information['paternal_grandmother'] = { 'gender': 'FEMALE' };
	personal_information['paternal_grandmother'].id = guid();
	personal_information['paternal_grandmother']['Health History'] = [];
	personal_information['paternal_grandmother'].name = get_defaultname('paternal_grandmother');

	for (var i = 0; i < number_brothers; i++) {
		personal_information['brother_' + i] = { 'gender': 'MALE' };
		personal_information['brother_' + i].id = guid();
		personal_information['brother_' + i]['Health History'] = [];
		personal_information['brother_' + i].name = get_defaultname('brother', i);
	}
	for (var i = 0; i < number_sisters; i++) {
		personal_information['sister_' + i] = { 'gender': 'FEMALE' };
		personal_information['sister_' + i].id = guid();
		personal_information['sister_' + i]['Health History'] = [];
		personal_information['sister_' + i].name = get_defaultname('sister', i);
	}
	for (var i = 0; i < number_sons; i++) {
		personal_information['son_' + i] = { 'gender': 'MALE' };
		personal_information['son_' + i].id = guid();
		personal_information['son_' + i]['Health History'] = [];
		personal_information['son_' + i].name = get_defaultname('son', i);
	}
	for (var i = 0; i < number_daughters; i++) {
		personal_information['daughter_' + i] = { 'gender': 'FEMALE' };
		personal_information['daughter_' + i].id = guid();
		personal_information['daughter_' + i]['Health History'] = [];
		personal_information['daughter_' + i].name = get_defaultname('daughter', i);
	}
	for (var i = 0; i < number_maternal_uncles; i++) {
		personal_information['maternal_uncle_' + i] = { 'gender': 'MALE' };
		personal_information['maternal_uncle_' + i].id = guid();
		personal_information['maternal_uncle_' + i]['Health History'] = [];
		personal_information['maternal_uncle_' + i].name = get_defaultname('maternal_uncle', i);
	}
	for (var i = 0; i < number_maternal_aunts; i++) {
		personal_information['maternal_aunt_' + i] = { 'gender': 'FEMALE' };
		personal_information['maternal_aunt_' + i].id = guid();
		personal_information['maternal_aunt_' + i]['Health History'] = [];
		personal_information['maternal_aunt_' + i].name = get_defaultname('maternal_aunt', i);
	}
	for (var i = 0; i < number_paternal_uncles; i++) {
		personal_information['paternal_uncle_' + i] = { 'gender': 'MALE' };
		personal_information['paternal_uncle_' + i].id = guid();
		personal_information['paternal_uncle_' + i]['Health History'] = [];
		personal_information['paternal_uncle_' + i].name = get_defaultname('paternal_uncle', i);
	}
	for (var i = 0; i < number_paternal_aunts; i++) {
		personal_information['paternal_aunt_' + i] = { 'gender': 'FEMALE' };
		personal_information['paternal_aunt_' + i].id = guid();
		personal_information['paternal_aunt_' + i]['Health History'] = [];
		personal_information['paternal_aunt_' + i].name = get_defaultname('paternal_aunt', i);
	}
}

// 作成日時を取得する
function getCreatedDate(){

	var today = new Date();
	var yyyy = today.getFullYear().toString().padStart(4, '0');
	var mm = (today.getMonth() + 1).toString().padStart(2, '0');
	var dd = (today.getDate()).toString().padStart(2, '0');
	var hh = (today.getHours()).toString().padStart(2, '0');
	var mi = (today.getMinutes()).toString().padStart(2, '0');
	var ss = (today.getSeconds()).toString().padStart(2, '0');

	return yyyy + "/" + mm + "/" + dd + " " + hh + ":" + mi + ":" + ss;
}

function bind_add_all_family_members_cancel_button_action() {
	$("#create_immediate_family_cancel").on("click", function() {
//		alert ("Cancelling Adding of Family Members");
		$("#add_all_family_members_dialog").dialog("close");
	});
}

var printWindow = null;
var printWindowTitle = "";
function load_risk_links() {
	// get lng and set to variable. used to open correct pdf //
	var lng = window.i18n.lng();
	if (lng=='en-US') {
		lng = 'en';
	};

	$.getJSON( "../risk/risks.json", function( data ) {
		$("#risk_section").empty();
        $.each(data, function(index) {
        	if (data[index].status == 'active') {
            var risk_calculator = $("#risk_section").append($("<div class='assessmentContainer risk_calculator' href='" + data[index].link + "'>")
            	.append($("<h3></h3>").append(data[index]['name.'+lng]))
            	.append($("<P>").append(data[index]['description.'+lng])));

            $("#risk_section").append(risk_calculator).append("<br>");
          }
        });

        $(".risk_calculator").on("click", function() {
        	$( "#risk_section" ).load( "../risk/" + $(this).attr("href"), function(data) {
        		$(data).find("[pullfrom]").each(function (i, field) {
        			var pullfrom = $(field).attr("pullfrom");
        			var v = personal_information[pullfrom];

        			// Do not know why using field directly doesn't work but this does
        			$("#" + $(field).attr("id")).val(v);
            	});
							var option = { resGetPath: '../locales/__ns__-__lng__.json'};
							i18n.init(option, function () {
								$(".translate").i18n();
							});

        	});
        });

        $(".risk_calculator").hover( function() {
        	$(this).css('cursor','pointer');
        });
	});

	// リスク計算結果印刷
	$("#risk_printer").on("click", function() {
		printWindowTitle = $.t("fhh_js.risk_calculator_dialog_title");
		printWindow = window.open('disease_risk_calculator_dialog_for_print.html', 'disease_risk_calculator_dialog_for_print');
	});

	// リスク計算および結果・範囲・表示画像制御
	riskCalcAndShow();

	$("#disp_toggle_diabetes").hide();
	$("#disp_toggle_chd").hide();
	$("#disp_toggle_stroke").hide();
	$("#disp_toggle_scoreDetail").hide();

	if(typeof toggleflg == "undefined" || toggleflg != 1) {
		var speed = 1000;
		var effect_type = "blind";

		$("#btn_toggle_diabetes").on("click", function() {
			$("#disp_toggle_diabetes").toggle(effect_type, speed);
		});

		$("#btn_toggle_chd").on("click", function() {
			$("#disp_toggle_chd").toggle(effect_type, speed);
		});

		$("#btn_toggle_stroke").on("click", function() {
			$("#disp_toggle_stroke").toggle(effect_type, speed);
		});

		$("#btn_toggle_scoreDetail").on("click", function() {
			$("#disp_toggle_scoreDetail").toggle(effect_type, speed);
		});

		toggleflg = 1;
	}
}

class LifeStyleScoreDetailDialogController{

	// 再計算
	static refresh(){

		$('.simuratedScore').hide();

		this.calculator = new LifeStyleScoreCalculator( personal_information );

		// 項目チェック
		if( !LifeStyleScoreDetailDialogController._validateEntiries() ) return;

		// ライフスタイルスコア
		LifeStyleScoreDetailDialogController._showScore();

		// 内訳
		LifeStyleScoreDetailDialogController._showDetail();
		LifeStyleScoreDetailDialogController.hideCompensationalBlock();
	}

	static simurate(){

		this.calculator = new LifeStyleScoreCalculator( personal_information );
		// ライフスタイルスコア
		LifeStyleScoreDetailDialogController._updateSimurateScore();

		// 内訳
		LifeStyleScoreDetailDialogController._updateSimurateDetail();

		$('.simuratedScore').hide().show('slow');
	}

	static _validateEntiries(){

		if( this.calculator.canBeDetermineScore()){
			$('#lifestylescore_calc_ng').hide('slow');
			$('#lifestylescore_ok_mode').show('slow');
			return true;
		}

		// 登録されていませんを表示
		$('#lifestylescore_ok_mode').hide();
		$('#lifestylescore_calc_ng').show();

		LifeStyleScoreDetailDialogController._showCompensationalBlock();
		return false;
	}

	static _showScore(key=''){
		$(`#${key}risk_parcentile_lifestylescore`).text(this.calculator.totalScore);
	}

	static _showDetail(key=''){
		$(`#${key}lifestyle_score_isSmoker`).text(this.calculator.score.smoker);
		$(`#${key}lifestyle_score_bmi`).text(this.calculator.score.bmi);
		$(`#${key}lifestyle_score_training`).text(this.calculator.score.trainingFamily);
		$(`#${key}lifestyle_score_diabetes`).text(this.calculator.score.dietary);
		$(`#${key}lifestyle_score_total`).text(this.calculator.totalScore);
	}

	static _updateSimurateScore(){
		return LifeStyleScoreDetailDialogController._showScore('simurated_');
	}

	static _updateSimurateDetail(){
		return LifeStyleScoreDetailDialogController._showDetail('simurated_');
	}

	static hideCompensationalBlock(){
		$('#lifestylescore_compensation_block').hide();
		$('#lifestylescore_simuration_block').show();
	}

	static _showCompensationalBlock(){
		$('#lifestylescore_compensation_block').show();
		$('#lifestylescore_simuration_block').hide();
	}
}


class QualityOfFamilyHistoryScoreController{

	// 再計算
	static refresh(){

		this.calculator = new QualityOfFamilyHistoryCalculator( personal_information );

		// サマリ
		QualityOfFamilyHistoryScoreController._showScore();

		// ダイアログ
		QualityOfFamilyHistoryScoreController._showDetail();
	}

	static _showScore(){
		ScoreCardController._qualityOfFamilyHistoryScore();
	}

	static _showDetail(){
		
		var calculator = new QualityOfFamilyHistoryCalculator( personal_information );

		$('#DialogRateOfHelthHistory').text( calculator.qualityOfFamilyHistoryScore.rateOfHelthHistory );
		$('#DialogRateOfAgeAtDeath').text( calculator.qualityOfFamilyHistoryScore.rateOfAgeAtDeath );
		$('#DialogRateOfCauseOfDeath').text( calculator.qualityOfFamilyHistoryScore.rateOfCauseOfDeath );
		$('#DialogRateOfAgeAtDisease').text( calculator.qualityOfFamilyHistoryScore.rateOfAgeAtDisease );
	}

	static hideDifferenceScore(pi){
		$('.DisplayDiffereOfQof').hide();
	}
	static showDifferenceScore(pi){

		var calculator = new QualityOfFamilyHistoryCalculator( pi );
		$('#UpdateRateOfHelthHistory').text( calculator.qualityOfFamilyHistoryScore.rateOfHelthHistory );
		$('#UpdateRateOfAgeAtDeath').text( calculator.qualityOfFamilyHistoryScore.rateOfAgeAtDeath );
		$('#UpdateRateOfCauseOfDeath').text( calculator.qualityOfFamilyHistoryScore.rateOfCauseOfDeath );
		$('#UpdateRateOfAgeAtDisease').text( calculator.qualityOfFamilyHistoryScore.rateOfAgeAtDisease );
		$('.DisplayDiffereOfQof').show('slow');
	}

	static hideCompensationalBlock(){
		$('.compensational_block').hide();
	}

}
class ScoreCardController{

	static refresh(){

		// 家族歴の質
		ScoreCardController._qualityOfFamilyHistoryScore();

		// ライフスタイルスコア
		ScoreCardController._lifeStyleScore();

		// 糖尿病	
		ScoreCardController._diababatesRiskScore();

		// 冠動脈疾患（10年間）
		ScoreCardController._athroscleroticRiskScore();

		// 脳卒中（10年間）
		ScoreCardController._strokeRiskScore();

		(new GenerationalFamilyMembers( personal_information ) ).draw();
	}

	static _qualityOfFamilyHistoryScore(){
		var calculator = new QualityOfFamilyHistoryCalculator( personal_information );

		$('#DisplayRateOfHelthHistory').text( calculator.qualityOfFamilyHistoryScore.rateOfHelthHistory );
		$('#DisplayRateOfAgeAtDeath').text( calculator.qualityOfFamilyHistoryScore.rateOfAgeAtDeath );
		$('#DisplayRateOfCauseOfDeath').text( calculator.qualityOfFamilyHistoryScore.rateOfCauseOfDeath );
		$('#DisplayRateOfAgeAtDisease').text( calculator.qualityOfFamilyHistoryScore.rateOfAgeAtDisease );

	}

	static _lifeStyleScore(){
		var calculator = new LifeStyleScoreCalculator( personal_information );

		if( calculator.canBeDetermineLifeStyleScore() ){
			$('#cannotDisplayLifeStyleScoreTotal').hide();
			$('#DisplayLifeStyleScoreTotal').text( calculator.totalScore );
			$('#canDisplayLifeStyleScoreTotal').show();
		}
	}

	static _diababatesRiskScore(){

		var pi = personal_information;
		load_diabetes_status(pi.take_hypglycemic, pi.fasting_blood_glucose_lebel, pi.occasionally_blood_glucose_lebel, pi.ogtt_blood_glucose_lebel, pi.hba1c);
		if(!checkDiabetesRisk(clientValue.hypo, clientValue.fasting, clientValue.occasional, clientValue.ogtt, clientValue.hba1c, clientValue.diabetes) )return ;
	
		// 計算
		calcHisayamaScore();
		// 表示
		$('#DisplayDiabateScoreTotal').text(showDiabetesRisk(drc_score.total));
		$('.canDisplayDiabateScoreTotal').show();
	}

	static _athroscleroticRiskScore(){

		// 冠動脈疾患
		calcSuitaScore();
		if(!checkCHDRisk(clientValue.hypo, clientValue.fasting, clientValue.occasional, clientValue.ogtt, clientValue.hba1c) ) return;

		// 表示
		$('#DisplayAtheroscleroticScoreTotal').text(showCHDRisk(clientValue.age, personal_information.gender, chd_score.total));
		$('#canDisplayAtheroscleroticScoreTotal').show();
	}

	static _strokeRiskScore(){

		// 脳卒中
		var stroke_score_class = showStrokeRisk();
		
	}

}

function cannot_calculate( baseId, lower , upper ){
	// lower歳未満、upper歳以上の場合は計算しない
	var age = getDisplayAge(personal_information);
	if( age < lower || upper <= age ) {
		$("#compensational_block").hide();
		$(".result_block").hide();
		$(".calculatable").hide();
		$( baseId + ' ' + '.cannot_calculate_under40').hide();
		$('.cannot_calculate_over70').hide();

		if( age <= 40 )	$('.cannot_calculate_under40').show();

		if( 70 <= age )	$('.cannot_calculate_over70').show();

		return true;
	}
	return false;
}

function riskCalcAndShow() {

	// 糖尿病型の判定
	var pi = personal_information;
	load_diabetes_status(pi.take_hypoglycemic, pi.fasting_blood_glucose_lebel, pi.occasionally_blood_glucose_lebel, pi.ogtt_blood_glucose_lebel, pi.hba1c);
	if(checkDiabetesRisk(clientValue.hypo, clientValue.fasting, clientValue.occasional, clientValue.ogtt, clientValue.hba1c, clientValue.diabetes) ){
		calcHisayamaScore();
		showDiabetesRisk(drc_score.total);
	}

	// 冠動脈疾患
	calcSuitaScore();
	if(checkCHDRisk(clientValue.hypo, clientValue.fasting, clientValue.occasional, clientValue.ogtt, clientValue.hba1c) ){
		showCHDRisk(clientValue.age, personal_information.gender, chd_score.total);
	}

	// 脳卒中リスクスコア
	var stroke_score_class = showStrokeRisk();
	showScoreDetail(stroke_score_class);
}

function calcLifestyleScoreAndShow() {
	LifeStyleScoreDetailDialogController.refresh();
}

// リスク計算内訳反映
function showScoreDetail(stroke_score_class) {

	// リスク計算内訳表示

	// 糖尿病
	$("#drc_score_age").text(drc_score.age);
	$("#drc_score_gender").text(drc_score.gender);
	$("#drc_score_family").text(drc_score.family);
	$("#drc_score_obese").text(drc_score.obese);
	$("#drc_score_bmi").text(drc_score.bmi);
	$("#drc_score_bp").text(drc_score.bp);
	$("#drc_score_smoke").text(drc_score.smoke);
	$("#drc_score_activity").text(drc_score.activity);
	$("#drc_score_total").text(drc_score.total);

	// 冠動脈疾患
	$("#chd_score_age").text(chd_score.age);
	$("#chd_score_gender").text(chd_score.gender);
	$("#chd_score_isSmoker").text(chd_score.isSmoker);
	$("#chd_score_bloodPressure").text(chd_score.bloodPressure);
	$("#chd_score_suger").text(chd_score.suger);
	$("#chd_score_chd").text(chd_score.chd);
	$("#chd_score_hdlValue").text(chd_score.hdlValue);
	$("#chd_score_ldlValue").text(chd_score.ldlValue);
	$("#chd_score_total").text(chd_score.total);

	// 脳卒中
	var stroke_score = stroke_score_class.score;
	$("#stroke_score_age").text(stroke_score.age);
	$("#stroke_score_gender").text(stroke_score.gender);
	$("#stroke_score_isSmoker").text(stroke_score.isSmoker);
	$("#stroke_score_bmi").text(stroke_score.bmi);
	$("#stroke_score_blood_pressure").text(stroke_score.blood_pressure);
	$("#stroke_score_diabetes").text(stroke_score.diabetes);
	$("#stroke_score_total").text(stroke_score_class.totalScore);

}

//  Need to do a deep copy of the PI data to support IE10 dropping data when window closes
function set_pi_information(data) {
	personal_information = JSON.parse(JSON.stringify(data));
}

function getNumberOfRelations( relationshipName,  pi ){
	return Object.keys( pi ).filter( key => key.startsWith( relationshipName ) , pi ).length;
}

function hasRelation( relationshipName,  pi ){
	return getNumberOfRelations( relationshipName,  pi ) > 0;
}

function hasRelations( relationshipNames , pi ){

	var retval = false;

	relationshipNames.forEach( function( relationshipName ){

		if( retval ) return;

		retval = hasRelation( relationshipName , pi );
	});

	return retval;
}

function getRelationshipIds( relations, pi ) {

	var relationships = [];

	Object.keys( pi ).forEach(function( r ) {
		relations.forEach( function( tr ) {
			if( r.startsWith( tr ) )
				relationships.push( r );
		});
	});

	return relationships;
}
function displayRelationships(table, relations, pi ){
	displayRelationships(table, relations, pi, false );
}

function displayRelationships(table, relations, pi, is_sortable ){
	displayRelationships(table, relations, pi, false, false );
}

function displayRelationships(table, relations, pi, is_sortable, is_sort_only ){
	// get relation id
	var displayRelationshipIds = getRelationshipIds( relations, pi );
	// display
	displayRelationshipIds.forEach( function( tr ) {
		add_new_family_history_row(table, pi[tr], $.t("fhh_js." + pi[tr].relationship), tr, true, is_sortable, is_sort_only);
	});
}

function getSortableTbody(){
	var tbody = $('<tbody>');
	$(tbody).sortable({update: function(ev, ui){
			var tobeArray = ui.item.closest('.ui-sortable').sortable("toArray");
			var updateArray = ui.item.closest('.ui-sortable').sortable("toArray");

			for( let i = 0; i < tobeArray.length; i++ ){
				var target = tobeArray[i];
				var targetItem = ui.item.closest('.ui-sortable').find('#' + target);
				var birthOrder = targetItem.find('.birthOrder');

				if( target == "self" ){
					personal_information[ "birth_order" ] = i + 1;
					updateArray[i] = "self";
					birthOrder.empty();
					birthOrder.append(getBirthOrderElement(personal_information, true));
					continue;
				}
				personal_information[ target ].birth_order = i + 1;
				updateArray[i] = target;
				birthOrder.empty();
				birthOrder.append(getBirthOrderElement(personal_information[target], true));
			}
			build_family_history_data_table();
		}
	});

	$(tbody).disableSelection();
	return tbody;
}

function sortTbody(tbody){
		// 並べ替え
	// シリアライズ
	var currentArray = $(tbody).sortable("toArray")
	var updated = {};
	console.log( currentArray );

	for( let i = 0; i < currentArray.length; i ++ ){
		var target = currentArray[i];
		var order = ( target == "self" )?
			personal_information.birth_order
			: personal_information[ currentArray[i] ].birth_order;
		updated[order] = target;
	}
	// ソート
	for(key of Object.keys(updated).sort()) {
		
		console.log(`${key} : ${updated[key]}`);
		var prevKey = Number(key)-1;
		var nextKey = Number(key)+1;
		$(tbody).find('#' + updated[key] ).after(
			tbody.find('#' + updated[nextKey] )
	   );
		$(tbody).find('#' + updated[key] ).before(
			 tbody.find('#' + updated[prevKey] )
		);
	}
	return tbody;
}

function update_date(){
	$('#current_date').empty().append(PersonalInformationUtil.getCurrentDate());
	$('#last_update_date').empty().append(PersonalInformationUtil.getLastUpdateDate( personal_information ));
}

function build_family_history_data_table () {


	update_date();

	var table = $("#history_summary_table");

	table.empty();

	// Table Header
	add_family_history_header_row(table);

	// Self title
	var tbody = $('<tbody>');
	add_new_family_history_row_title(tbody, $.t("family-t.self") + " <span class='small'>* " + $.t("family-t.your_siblings") + "</span>");
	add_personal_history_row(tbody, false);
	table.append(tbody);

	// Brother and sister
	if( hasRelations( [ 'brother', 'sister' ], personal_information ) ){
		var tbody = $('<tbody>');
		add_new_family_history_row_title(tbody, $.t("family-t.sibling") + " <span class='small'>* " + $.t("family-t.bo_you") + "</span>");
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'brother', 'sister' ], personal_information, true );
		add_personal_history_row(tbody, true);
		table.append(sortTbody(tbody));
	}

	// parents
	var tbody = $('<tbody>');
	add_new_family_history_row_title(tbody, $.t("family-t.parents") + " <span class='small'>* " + $.t("family-t.bo_parent_brother") + "</span>");

	if( typeof personal_information.father != "undefined")
		add_new_family_history_row(tbody, personal_information.father, $.t("fhh_js.father"), "father", false);

	if( typeof personal_information.mother != "undefined")
		add_new_family_history_row(tbody, personal_information.mother, $.t("fhh_js.mother"), "mother", false);

	table.append(tbody);

	// children
	if( hasRelations( [ 'son', 'daughter' ], personal_information ) ){
		var tbody = getSortableTbody();
		add_new_family_history_row_title(tbody, $.t("family-t.child"));
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'son', 'daughter' ], personal_information, true );
		table.append(sortTbody(tbody));
	}

	// おい（甥）・めい（姪）
	if( hasRelations( [ 'niece', 'nephew' ], personal_information ) ){
		var tbody = getSortableTbody();
		add_new_family_history_row_title(tbody, "おい（甥）・めい（姪） <span class='small'>* 親（あなたの兄弟姉妹）の出生順も書いてください。</span>");
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'niece', 'nephew' ], personal_information, true );
		table.append(sortTbody(tbody));
	}

	// 父方 おじ・おば
	if( hasRelations( [ 'paternal_uncle', 'paternal_aunt' ], personal_information ) ){
		var tbody = getSortableTbody();
		add_new_family_history_row_title(tbody, $.t("family-t.paternal_uncle_and_aunt") + " <span class='small'>* " + $.t("family-t.bo_father") + "</span>");
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'paternal_uncle', 'paternal_aunt' ], personal_information, true );
		displayRelationships(tbody, [ 'father' ], personal_information, true, true );
		table.append(sortTbody(tbody));
	}

	// 母方 おじ・おば
	if( hasRelations( [ 'maternal_uncle', 'maternal_aunt' ], personal_information ) ){
		var tbody = getSortableTbody();
		add_new_family_history_row_title(tbody, $.t("family-t.maternal_uncle_and_aunt") + " <span class='small'>* " + $.t("family-t.bo_mother") + "</span>");
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'maternal_uncle', 'maternal_aunt' ], personal_information, true );
		displayRelationships(tbody, [ 'mother' ], personal_information, true, true );
		table.append(sortTbody(tbody));
	}

	// 父方 祖父母
	if( hasRelations( [ 'paternal_grandfather', 'paternal_grandmother' ], personal_information ) ){
		var tbody = $('<tbody>');
		add_new_family_history_row_title(tbody, $.t("family-t.paternal_grandparents"));
		add_new_family_history_row(tbody, personal_information.paternal_grandfather, $.t("fhh_js.paternal_grandfather"), "paternal_grandfather", false);
		add_new_family_history_row(tbody, personal_information.paternal_grandmother, $.t("fhh_js.paternal_grandmother"), "paternal_grandmother", false);
		table.append(tbody);
	}

	// 母方 祖父母
	if( hasRelations( [ 'maternal_grandfather', 'maternal_grandmother' ], personal_information ) ){
		var tbody = $('<tbody>');
		add_new_family_history_row_title(tbody, $.t("family-t.maternal_grandparents"));
		add_new_family_history_row(tbody, personal_information.maternal_grandfather, $.t("fhh_js.maternal_grandfather"), "maternal_grandfather", false);
		add_new_family_history_row(tbody, personal_information.maternal_grandmother, $.t("fhh_js.maternal_grandmother"), "maternal_grandmother", false);
		table.append(tbody);
	}

	// 父方 いとこ
	if( hasRelations( [ 'paternal_cousin', 'paternal_halfbrother', 'paternal_halfsister' ], personal_information ) ){
		var tbody = getSortableTbody();
		add_new_family_history_row_title(tbody, $.t("family-t.maternal_uncle_and_aunt"));
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'paternal_cousin', 'paternal_halfbrother', 'paternal_halfsister' ], personal_information, true );
		table.append(sortTbody(tbody));
	}

	// 母方 いとこ
	if( hasRelations( [ 'maternal_cousin', 'maternal_halfbrother', 'maternal_halfsister' ], personal_information ) ){
		var tbody = getSortableTbody();
		add_new_family_history_row_title(tbody, $.t("family-t.maternal_uncle_and_aunt"));
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'maternal_cousin', 'maternal_halfbrother', 'maternal_halfsister' ], personal_information, true );
		table.append(sortTbody(tbody));
	}

	// 孫
	if( hasRelations( [ 'grandson', 'granddaughter' ], personal_information ) ){
		var tbody = getSortableTbody();
		add_new_family_history_row_title(tbody, "孫");
		table.append(tbody);
		var tbody = getSortableTbody();
		displayRelationships(tbody, [ 'grandson', 'granddaughter' ], personal_information, true );
		table.append(sortTbody(tbody));
	}
	// 書ききれなかった方
	var tbody = $('<tbody>');
	add_new_family_history_row_title(tbody, $.t("fhh_js.recently_added"));
	table.append(tbody);

	// $("#history_summary_table").find('tbody').addClass('list-group ui-sortable')
	// $("#history_summary_table").find('tbody').attr( 'id', 'list01');
	// $('#list01').sortable();

	// $( "#list01" ).disableSelection();
	ScoreCardController.refresh();
}

function add_family_history_header_row(table) {
	var header_row = $("<tr>");
	var head = $('<thead>');

	header_row.append("<th class='center nowrap'>" + $.t("family-t.bo") + "</th>");
	header_row.append("<th class='center nowrap'>" + $.t("family-t.name") + "</th>");
	header_row.append("<th class='center nowrap'>" + $.t("family-t.gender") + "</th>");
	header_row.append("<th abbr='Living' class='center nowrap'>" + $.t("family-t.still_living") + "</th>");
	header_row.append("<th abbr='Age' class='center nowrap'>" + $.t("family-t.age") + "</th>");
	header_row.append("<th class='nowrap'>" + $.t("family-t.health_information") + "</th>");
	header_row.append("<th abbr='Update' class='center nowrap'>" + $.t("fhh_js.update_history") + "</th>");
	header_row.append("<th abbr='Remove' class='center nowrap'>" + $.t("fhh_js.remove_relative") + "</th>");
	header_row.append("<th abbr='UpdateDate' class='center nowrap'>" + $.t("family-t.update_date") + "</th>");
	header_row.append("");

	head.append( header_row );

	table.empty().append(head);
}

function getBirthOrderElement(pi){
	return getBirthOrderElement(pi, false );
}
function getBirthOrderElement(pi, sortable){
	var retval = $("<td class='inforamtion center birthOrder'>");
	retval.text(getDisplayBirthOrder(pi));
	if( sortable ){
		$(retval).append(getSortableIcon());
	}
	return retval ;
}

function getSortableIcon(){
	var retval = $("<span class='material-icons small-size green-text cursor_pointer '>");
	retval.text('sort');
	return retval;
}

function getDisplayBirthOrder( pi ){

	if( typeof pi == "undefined") return '';

	if( typeof pi.birth_order == "undefined")
		return '';

	return pi.birth_order + $.t("family-t.birth_order_annotation");
}

function getTdElement(name, className){

	var cName = ( typeof className == "undefined" ) ? '':className;
	var td = $("<td class='inforamtion center " + cName  +  "'>");
	td.append( name );
	return td;
}

function getHealthHistoriesCol( histories, member_information ){
	var td = $("<td class='inforamtion healthHistory'>");


	if(typeof histories == "undefined" )
		return td;

	td.append(getHealthHistories(histories));
	return td;

}

function getHealthHistories( histories ){
	var rows = $('<div>');

	histories.forEach( function( h ){
		var row = $('<div>');

		var text = $.t("diseases:" + h["Disease Code"]);
		if( text.length == 0 ) text = h["Detailed Disease Name"];
		
		if( h["Age At Diagnosis"] != "blank")
			text += "(" + $.t("fhh_js." + h["Age At Diagnosis"] ) + ")" ;

		row.text(text);
		rows.append( row );
	});
	return rows;
}

function getDisplayAge(pi){

	if( typeof pi.relationship == 'undefined'){
		return get_member_age(pi);
	}

	// 存命
	if( pi.is_alive == "alive"){
		// 推定年齢
		if(typeof pi.estimated_age != "undefined" && pi.estimated_age != ""){
			return getEstimatedAgeLabel( pi.estimated_age );
		}
		// 年齢
		var age = 0;
		if(typeof pi.age != "undefined" && pi.age != "" )
			age = pi.age;

		if( age > 0 ) return age;

		// 生年月
		age =  get_member_age(pi);
		if( age > 0 ) return age;

	}

	if( pi.is_alive == "dead")
		if( typeof pi.estimated_death_age != "undefined" )
			if( pi.estimated_death_age != "")
				if( $.t( "fhh_js." + pi.estimated_death_age ).length > 0 )
					return $.t( "fhh_js." + pi.estimated_death_age ) ;

	return "";
}

function add_personal_history_row(table) {
	add_personal_history_row(table, false);
}

function add_personal_history_row(table, is_sort_only) {

	// Html requires that all blank fields have at least 1 char or it will not show border
	name = 'Self';
	var new_row = $("<tr class='center information' id='self'></tr>");
	new_row.addClass("proband");

	new_row.append(getBirthOrderElement(personal_information, is_sort_only));

	var nameColumn_td = $("<td class='center information' id='relatives_name'></td>")

	var nameColumn_text = (is_sort_only) 
						? escape_html(personal_information.name) 
						: $("<a style='cursor:pointer;' name=''>" + escape_html(personal_information.name) + "</a>");

	nameColumn_td.append(nameColumn_text);
	new_row.append(nameColumn_td);

	new_row.append(getTdElement( $.t("fhh_js." + ( ( typeof personal_information.gender == 'undefined' )? "Unknown" : personal_information.gender )) , 'gender') );

//	new_row.append("<td class='summary_td information'>" + $.t("fhh_js.self") + "</td>");

//	new_row.append("<td class='information' id='still_living_main'>Yes</td>");
	new_row.append("<td class='information center' id='still_living_main'>"+ $.t("fhh_family_pedigree.alive") +"</td>");

	// 年齢
	new_row.append(getTdElement(getDisplayAge(personal_information), 'age'));

	// 病歴
	new_row.append(getHealthHistoriesCol(personal_information["Health History"]));

	var update_history_td = $("<td class='information center'>");

	if(!is_sort_only) {
	//	var update_history = $("<A class='action update_history'><img style='border:0' src='../images/icon_edit.gif' alt='Update History' title='Update History'></A>");
		var update_history = $("<A class='action update_history'><div class='material-icons center green-text icon_shadow2'>edit</div></A>");
		update_history_td.append(update_history);

		update_history.on("click", function() {
			updateHistoryDialog('self');
		});

		nameColumn_text.on("click", function() {
			updateHistoryDialog('self');
		});
	}

	new_row.append(update_history_td);

	new_row.append("<td class='action remove_history'>&nbsp;</td>");

	// Update Date
	new_row.append("<td class='action center'>" + PersonalInformationUtil.getUpdateDateBadge( personal_information["update_date"] ) + "&nbsp;</td>");

	table.append(new_row);
}

function add_new_family_history_row_title(table, name) {

	var new_row = $("<tr style='height: 70px; overflow:auto;'>");
	new_row.append("<td colspan='8' class='subsection'>" + name + "</td>");
	table.append(new_row);

}

function add_new_family_history_row(table, family_member, relationship, relationship_id, is_removeable) {
	add_new_family_history_row(table, family_member, relationship, relationship_id, is_removeable, false);
}

function add_new_family_history_row(table, family_member, relationship, relationship_id, is_removeable, is_sortable) {
	add_new_family_history_row(table, family_member, relationship, relationship_id, is_removeable, false, false);
}

function add_new_family_history_row(table, family_member, relationship, relationship_id, is_removeable, is_sortable, is_sort_only) {
	
	// Html requires that all blank fields have at least 1 char or it will not show border

	var name;
	if (family_member == null || family_member.name == null ||
		  family_member.name == "" || $.isEmptyObject(family_member) ) name = get_defaultname(relationship_id);
	else name = family_member.name;

	var is_already_defined = (family_member != null && !($.isEmptyObject(family_member)));
	if (relationship == "") relationship = "&nbsp;";

	var new_row = $("<tr class='' id='" + relationship_id + "'></tr>");
	new_row.addClass("proband");
	var nameColumn_td = $("<td class='center information' id='relatives_name'></td>");
	// var nameColumn_text = $("<a style='cursor:pointer;' name=''>" + name + "</a>");
	var nameColumn_text = (is_sort_only) 
						? $("<span>" + escape_html(name) + "</span>")
						: $("<a style='cursor:pointer;' name=''>" + escape_html(name) + "</a>");

	nameColumn_td.append(nameColumn_text);
	nameColumn_text.attr("relationship_id", relationship_id);


	new_row.append(getBirthOrderElement(family_member, is_sortable));

	new_row.append(nameColumn_td);

	new_row.append(getTdElement( $.t("fhh_js." + family_member.gender) , 'gender' ));

	nameColumn_text.on("click", function() {
		current_relationship = $(this).attr('relationship_id');
		updateHistoryDialog(current_relationship,family_member);
	});

//	new_row.append("<td class='center information' >" + relationship + "</td>");

	if (family_member!=undefined) {

		var status = "";

		if (family_member.is_alive=="unknown") {
			status = "Unknown";
		}
		if (family_member.is_alive=="dead") {
			status = "No";
		}
		if (family_member.is_alive=="alive") {
			status = "Yes";
		}
		status = $.t("fhh_family_pedigree." + family_member.is_alive);

	}

	new_row.append("<td class='center information' id='still_living_main'>" + status + "</td>");

	// 年齢
	new_row.append(getTdElement(getDisplayAge(family_member) , "age"));

	// 病歴
	new_row.append(getHealthHistoriesCol(family_member["Health History"], family_member));

	if(is_sort_only) {
		new_row.append("<td class='center action update_history'>&nbsp;</td>");
		new_row.append("<td class='action center remove_history'>&nbsp;</td>")
		new_row.append("<td class='action center'>" + PersonalInformationUtil.getUpdateDateBadge( family_member['update_date'] ) + "&nbsp;</td>");
		table.append(new_row);
		return;
	}

	if (is_already_defined) {

		var update_history_td = $("<td class='center'>");

//		var update_history = $("<A class='action update_history'><img style='border:0px'  src='../images/icon_edit.gif' alt='Update History' title='Update History'></A>");
		var update_history = $("<A class='action update_history'><div class='material-icons center green-text icon_shadow2'>edit</div></A>");
		update_history_td.append(update_history);

		update_history.attr("relationship_id", relationship_id);

		// match _number to get relationships that are ex: brother_1 //
		var reg = /([a-z]*)(_[0-9])/;
		var reg2 = /(_)([0-9])/;
		var match = reg.exec(relationship_id);
		if (match) {
			family_member.relationship = match[1];

		}
		else {
			family_member.relationship = relationship_id;
		}

		update_history.on("click", function() {
			current_relationship = $(this).attr('relationship_id');
			updateHistoryDialog(current_relationship, family_member);
		});

		new_row.append(update_history_td);


	} else {
		var add_history = $("<td class='summary_td action add_history'><img src='../images/icon_add.gif' alt='Add History' title='Add History'></td>")

		add_history.on("click", function() {
//			alert("Updating history for: " + relationship)
			$("#accordian_title_relationship").html(" <h2> Your " + relationship_id + "'s Health Information</h2>");

			current_relationship = relationship_id;
			clear_family_member_health_history_dialog();
			$( "#update_family_member_health_history_dialog" ).dialog( "open" );
		});


		new_row.append("<td class='center action update_history'>&nbsp;</td>");
	}
	if (is_removeable) {
		var remove_history_td = $("<td class='action center'>");

//		var remove_history = $("<A href='#' class='action remove_history'><img style='border:0px' src='../images/icon_trash.gif' alt='Remove History' title='Remove History'></A>")
		var remove_history = $("<A href='#' class='action remove_history'><div class='material-icons center green-text icon_shadow2'>delete</div></A>")
		remove_history_td.append(remove_history);
		remove_history.attr("relationship_id", relationship_id);
		remove_history.on("click", function() {
			remove_family_member( $(this).attr('relationship_id'), true);
			update_personal_history_row();
			update_birth_order_col();
		});

		new_row.append(remove_history_td);
	} else new_row.append("<td class='action center remove_history'>&nbsp;</td>");

	new_row.append("<td class='action center'>" + PersonalInformationUtil.getUpdateDateBadge( family_member['update_date'] ) + "&nbsp;</td>");

	table.append(new_row);
}

function remove_family_member(relationship_id, confirm_flag) {
	if (personal_information[relationship_id] == null) return;

	var name = personal_information[relationship_id]['name'];
	if (name == "") name = relationship_id;

	var should_remove_family_member = true;
	if (confirm_flag) should_remove_family_member = confirm($.t("fhh_js.remove_q") + " " + name + "?  " + $.t("fhh_js.remove_q2"));
	if (should_remove_family_member == true) {
		var children = check_for_children(personal_information[relationship_id].id);
		for (i=0;i<children.length;i++) {
			remove_family_member_by_id(children[i]);
		}

		delete personal_information[relationship_id];
		$("#" + relationship_id).remove();
//		$("#firstVari").text("You have unsaved data!");
		$("#firstVari").text("未保存のデータがあります！");
		$("#firstVari").css("visibility","visible");
		$("#firstVari").addClass("label_alert");
		$("tt1").removeClass("green-text");
		$("tt1").addClass("red-text");
		$("#save_personal_history_button").css("background-color","red");

		// Resort Birth order
		BirthOrderUtil.ResortBirthOrder( personal_information, relationship_id, true );
		build_family_history_data_table();
		ScoreCardController.refresh();
	} else {
		// DO nothing
	}

}

function check_for_children(id) {
	var children = [];
	$.each(personal_information, function (key, item) {
    if(key.substring(0,5) == 'niece'
    || key.substring(0,6) == 'nephew'
    || key.substring(0,15) == 'maternal_cousin'
    || key.substring(0,15) == 'paternal_cousin'
    || key.substring(0,8) == 'grandson'
    || key.substring(0,13) == 'granddaughter') {
      if (item.parent_id == id) {
      	children.push(item.id);
      }
    }
	});
	return children;
}

function remove_family_member_by_id(id) {
		$.each(personal_information, function (key, item) {
			if (item) {
				if (item["id"] && item["id"] == id) {
					delete personal_information[key];
					$("#" + key).remove();
				}
			}
		});
}


function update_family_history_row(relationship_id, family_member_information) {
//	 console.log("u heree")
//	alert ("Rel:" + relationship_id);

	if (angular.equals(JSON.stringify(thirdVari),JSON.stringify(family_member_information))) {
		$("#firstVari").text("");
		$("#firstVari").css("visibility","hidden");
		$("#firstVari").removeClass("label_alert");
		$("tt1").removeClass("red-text");
		$("tt1").addClass("green-text");
		$("#save_personal_history_button").css("background-color","#337AB7");
	}
	else {
//		$("#firstVari").text("You have unsaved data!");
		$("#firstVari").text("未保存のデータがあります！");
		$("#firstVari").css("visibility","visible");
		$("#firstVari").addClass("label_alert");
		$("tt1").removeClass("green-text");
		$("tt1").addClass("red-text");
		$("#save_personal_history_button").css("background-color","red");
	}

	// 出生順
	$("#" + relationship_id).find(".birthOrder").text( getDisplayBirthOrder(family_member_information) );

	// 年齢
	$("#" + relationship_id).find(".age").text(getDisplayAge(family_member_information));

	// 性別
	$("#" + relationship_id).find(".gender").text( $.t("fhh_js." + family_member_information.gender ));

	// 病歴
	$("#" + relationship_id).find(".healthHistory").empty().append(getHealthHistories(family_member_information["Health History"]));


	$("#" + relationship_id).find("#relatives_name").find("a").html(escape_html(family_member_information["name"]));

	if (family_member_information!=undefined) {

		var status = "";

		if (family_member_information.is_alive=="unknown") {
			status = "Unknown";
		}
		if (family_member_information.is_alive=="dead") {
			status = "No";
		}
		if (family_member_information.is_alive=="alive") {
			status = "Yes";
		}

		status = $.t("fhh_family_pedigree." + family_member_information.is_alive);
	}

	$("#" + relationship_id).find("#still_living_main").html(status);

//	var update_history = $("<td class='action update_history' relationship_id='" + relationship_id
//				+ "' ><img src='images/icon_edit.gif' alt='Update History' title='Update History'></td>");

//	$("#" + relationship_id).find(".update_history").html("<img src='../images/icon_edit.gif' alt='Update History' title='Update History'>");
	$("#" + relationship_id).find(".update_history").html("<div class='material-icons center green-text icon_shadow2'>edit</div>");
	$("#" + relationship_id).find(".update_history").attr("relationship_id", relationship_id);
	$("#" + relationship_id).find(".add_history").html("&nbsp;");

	$("#" + relationship_id).find(".update_history").unbind().on("click", function() {
		family_member = personal_information[$(this).attr('relationship_id')];
		current_relationship = $(this).attr('relationship_id');
		family_member.relationship = relationship_id;
		clear_and_set_current_family_member_health_history_dialog(family_member);
		$( "#update_family_member_health_history_dialog" ).dialog( "open" );
	});

	$("#" + relationship_id).find(".add_history").off("click");


	if (relationship_id != 'mother' && 								relationship_id != 'father' &&
			relationship_id != 'maternal_grandmother' &&	relationship_id != 'maternal_grandfather' &&
			relationship_id != 'paternal_grandmother' &&	relationship_id != 'paternal_grandfather')
	{
		remove_history = $("#" + relationship_id).find(".remove_history");
		//remove_history.html("<img src='../images/icon_trash.gif' alt='Remove History' title='Remove History'>");
		remove_history.html("<A href='#' class='action remove_history'><div class='material-icons center green-text icon_shadow2'>delete</div></A>");
		remove_history.attr("relationship_id", relationship_id);
		remove_history.unbind().on("click", function() {
			remove_family_member( $(this).attr('relationship_id'), true);
		});
	}

}

function update_birth_order_col(){

	// self
	$("#self").find(".birthOrder").html(getDisplayBirthOrder(personal_information));

	// family
	Object.keys( personal_information ).forEach(function( r ) {

		var target = $("#" + r).find(".birthOrder");

		if( target.size() > 0 ){
			target.text( getDisplayBirthOrder(personal_information[r] ) );
		}
	});


}

function update_personal_history_row() {

	$("#self").find("#relatives_name").find("a").html(escape_html(personal_information.name));

	// 出生順
	$("#self").find(".birthOrder").html(getDisplayBirthOrder(personal_information));

	// 年齢
	$("#self").find(".age").html(getDisplayAge(personal_information));

	// 性別
	$("#self").find(".gender").text( $.t("fhh_js." + personal_information.gender ) );

	// 病歴
	$("#self").find(".healthHistory").empty().append(getHealthHistories(personal_information["Health History"]));

	if (angular.equals(JSON.stringify(secondVari),JSON.stringify(personal_information))) {
		$("#firstVari").text("");
		$("#firstVari").css("visibility","hidden");
		$("#firstVari").removeClass("label_alert");
		$("tt1").removeClass("red-text");
		$("tt1").addClass("green-text");
		$("#save_personal_history_button").css("background-color","#337AB7");
	}
	else {
//		$("#firstVari").text("You have unsaved data!");
                $("#firstVari").text("未保存のデータがあります！");
		$("#save_personal_history_button").css("background-color","red");
	}

}

function build_history_edit_dialog () {

}


//  Information Sections

function build_family_health_information_section() {
	var information = $("#family_health_information");
	// First put up accordion entry
	var bar = $("<div class='title-bar' id='hi-title'>");
	bar.append($.t("fhh_js.family_subtitle"));
	information.empty().append(bar);
	var inner_information = $("<div class='instruction_box'>");
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_1") + "</li>"));
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_2") + "</li>"));
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_3") + "</li>"));
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_4") + "</li>"));
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_5") + "</li>"));
	information.append(inner_information);
	information.append($("<span class='left' id='alert_age_at_diagnosis' style='display:none; color:red; padding-left: 2em;'>実年齢または死亡年齢を超えています。</span>"));
	information.append($("<span class='left require_health_history' style='display:none; color:red; padding-left: 2em;'>" + $.t("family-t.mandatory_health_history") + "</span>"));

	var hi_health_history_table = $("<table class='disease_table col s12'>");
	var hi_header_row = $("<tr class='md_tr'>");
	hi_header_row.append("<th class='md_tr' style='width:35%;text-align:center'><span class='required'>*</span>" + $.t("fhh_js.disease_or_condition") + "</th>");
	hi_header_row.append("<th class='md_tr' style='width:35%;text-align:center'>" + $.t("") + "</th>");
	hi_header_row.append("<th class='md_tr' style='width:20%;text-align:center'>" + $.t("fhh_js.age_at_diagnosis") + "</th>");
	hi_header_row.append("<th class='md_tr' style='width:10%;text-align:center'>" + $.t("fhh_js.action") + "</th>");
	hi_health_history_table.append(hi_header_row);
	var hi_data_entry_row = $("<tr class='md_tr' id='health_data_entry_row'>");
	var disease_select_label = $("<label for='disease_choice_select'></label>");
	var disease_select = $("<select class='col s6' tabindex='17' id='disease_choice_select' name='disease_choice_select' style='margin: auto;'></select>");
	var detailed_disease_select_label = $("<label for='detailed_disease_choice_select'></label>");
	var detailed_disease_select = $("<select class='ddcs col s6' tabindex='18' id='detailed_disease_choice_select' name='detailed_disease_choice_select' style='margin: auto;'></select>");

	set_disease_choice_select(disease_select, detailed_disease_select);
	hi_data_entry_row.append($("<td colspan='2'></td>").append(disease_select_label).append(disease_select).append(detailed_disease_select_label).append(detailed_disease_select));

	var age_at_diagnosis_select_label = $("");
	var age_at_diagnosis_select = $("<select tabindex='19' name='age_at_diagnosis_select' id='age_at_diagnosis_select' style='margin: auto;'></select>");

	set_age_at_diagnosis_pulldown($.t("fhh_js.age_at_diagnosis_select"), age_at_diagnosis_select);
	hi_data_entry_row.append($("<td>").append(age_at_diagnosis_select_label).append(age_at_diagnosis_select));

	var add_new_disease_button = $("<button id='family_add_new_disease_button' name='Add' value='Add' class='btn-small waves-effect waves-light teal lighten-1 '>" + $.t("fhh_js.add")  + "</button>");
	add_new_disease_button.on('click', add_disease);

	hi_data_entry_row.append($("<td style='text-align:center;'>").append(add_new_disease_button) );
	hi_health_history_table.append(hi_data_entry_row);

	information.append(hi_health_history_table);
	information.append("<br />");

	// 生年月選択時の年齢-診断時年齢の整合性チェック
	// 年
	$("#family_info_form_year_of_birth").on("change", function() {
		check_history_age_validity("family");
	});

	// 月
	$("#family_info_form_month_of_birth").on("change", function() {
		check_history_age_validity("family");
	});

	// テキストボックス年齢
	$("#age_determination_text").on("change", function() {
		check_history_age_validity("family");
	});

	// 推定年齢
	$("#estimated_age_select").on("change", function() {
		check_history_age_validity("family");
	});

	// 推定死亡年齢
	$("#estimated_death_age_select").on("change", function() {
		check_history_age_validity("family");
	});

	// 診断年齢選択時の年齢-診断時年齢の整合性チェック
	$("#family_health_information").find("#age_at_diagnosis_select").on("change", function() {
		var personal_age = calc_family_age();

		var diag_age = $("#family_health_information").find("#age_at_diagnosis_select").val();

		if ( check_age_diagage_validity(personal_age, diag_age) ) {
			$("#family_health_information").find("#alert_age_at_diagnosis").show();
		} else {
			$("#family_health_information").find("#alert_age_at_diagnosis").hide();
		}

		// 選択肢チェック後、アラートが無い場合は既存の病歴も整合性チェック
		if ( $("#family_health_information").find('#alert_age_at_diagnosis').css('display') == 'none' ) {
			check_history_age_validity("family");
		}
	});
}

function build_personal_health_information_section() {
	var information = $("#personal_health_information");
	// First put up accordion entry
	var bar = $("<div class='title-bar' id='hi-title'>");
	bar.append($.t("fhh_js.personal_health_subtitle"));
	information.empty().append(bar);
	var inner_information = $("<div class='instruction_box'>");
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_1") + "</li>"));
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_2") + "</li>"));
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_3") + "</li>"));
	inner_information.append($("<li class='instructions'>" +  $.t("fhh_js.add_disease_instructions_5") + "</li>"));
	information.append(inner_information);
	information.append($("<span class='left' id='alert_age_at_diagnosis' style='display:none; color:red; padding-left: 2em;'>実年齢または死亡年齢を超えています。</span>"));
	information.append($("<span class='left require_health_history' style='display:none; color:red; padding-left: 2em;'>" + $.t("family-t.mandatory_health_history") + "</span>"));


	var hi_health_history_table = $("<table class='disease_table col s12'>");
	var hi_header_row = $("<tr class='md_tr'></tr>");
	hi_header_row.append("<th class='md_tr' style='width:35%;text-align:center'>" + $.t("fhh_js.disease_or_condition") + "</th>");
	hi_header_row.append("<th class='md_tr' style='width:35%;text-align:center'>" + $.t("") + "</th>");
	hi_header_row.append("<th class='md_tr' style='width:20%;text-align:center'>" + $.t("fhh_js.age_at_diagnosis") + "</th>");
	hi_header_row.append("<th class='md_tr' style='width:10%;text-align:center'>" + $.t("fhh_js.action") + "</th>");
	hi_health_history_table.append(hi_header_row);

	var hi_data_entry_row = build_hi_data_entry_row();
	hi_health_history_table.append(hi_data_entry_row);

	information.append(hi_health_history_table);
	information.append("<br />");
}


function build_hi_data_entry_row() {
	var hi_data_entry_row = $("<tr class='md_tr health_data_entry_row' id='health_data_entry_row'></tr>");

	var disease_select = $("<select class='col s6' tabindex='17' id='disease_choice_select' name='disease_choice_select' style='margin: auto;'></select>");
	var detailed_disease_select = $("<select class='ddcs col s6' tabindex='18' id='detailed_disease_choice_select' name='detailed_disease_choice_select' style='margin: auto;'></select>");

	set_disease_choice_select(disease_select, detailed_disease_select, null, true);

	hi_data_entry_row.append($("<td colspan='2'></td>").append(disease_select).append(detailed_disease_select));

	var age_at_diagnosis_select = $("<select class='col s12' tabindex='19' name='age_at_diagnosis_select' id='age_at_diagnosis_select' style='margin: auto;'></select>");

	set_age_at_diagnosis_pulldown($.t("fhh_js.age_at_diagnosis_select"), age_at_diagnosis_select);
	hi_data_entry_row.append($("<td></td>").append(age_at_diagnosis_select));
	var add_new_disease_button = $("<button id='add_new_disease_button' name='Add' value='Add' class='btn-small waves-effect waves-light teal lighten-1'>" + $.t("fhh_js.add") + "</button>");

	add_new_disease_button.on('click', add_disease);


	hi_data_entry_row.append($("<td style='text-align:center;'></td>").append(add_new_disease_button));
	return hi_data_entry_row;
}

function set_disease_choice_select (disease_select, detailed_disease_select, cod, skip_Unknown) {
	//detailed_disease_select.hide();
	disease_select.append("<option value='not_picked'>" + $.t("fhh_js.disease_select") + "</option>");
	detailed_disease_select.append("<option value='not_picked'>" + $.t("fhh_js.disease_subtype_select") + "</option>");
	$('.ddcs').prop('disabled',true);
	for (disease_name in diseases) {
		if( skip_Unknown ) {
			if( disease_name != 'Unknown')
				disease_select.append("<option value='" + disease_name + "'> " + $.t("diseases:" + disease_name) + " </option>");
		}else{
			disease_select.append("<option value='" + disease_name + "'> " + $.t("diseases:" + disease_name) + " </option>");
		}
	}
	disease_select.append("<option value='other'>" + $.t("fhh_js.add_new") + "</option>");

	disease_select.on('change', function() {

		if ($(this).find("option:selected" ).val() == 'other') {
			if (cod) {
				//if ( $("#new_disease_name_cod").length == 0) {
					$(this).after($("<div id='new_disease_cod' style='display: inline-block; padding-left: 8px;'><INPUT id='new_disease_name_cod' class='ddcs' placeholder='" + $.t('fhh_js.disease_name_enter') + "' type='text' size='40' style='height:35px;'></INPUT></div>"));
					// $("#detailed_cause_of_death_select").hide();
					detailed_disease_select.empty().hide();
				//}
			} else {
				if ( $("#new_disease_name").length == 0) {
					$(this).after($("<div id='new_disease' class='col s6'><INPUT id='new_disease_name' class='ddcs' type='text' size='40' value='' placeholder='" + $.t('fhh_js.disease_name_enter') + "' style='height:40px;width:100%;'></INPUT></div>"));
					detailed_disease_select.empty().hide();
				}
			}
		} else {
			if (cod) {
				$("#new_disease_cod").remove();
			} else {
				$("#new_disease").remove();
			}

			var chosen_disease_name = $.trim($(this).find("option:selected" ).val());
			var disease_box = disease_select.parent();

			var detailed_disease = get_detailed_disease(chosen_disease_name);
			detailed_disease_select.empty();
			var detailed_disease_list = "";

			var new_disease_selected = chosen_disease_name;

			if (cod) {
				var new_disease_selected = $("#cause_of_death_select").val();
			}

			$(this).parent().parent().find($('#age_at_diagnosis_select')).show();
			if ((detailed_disease && detailed_disease.length > 0)) {
				if (detailed_disease.length == 1) {
//					alert ("Exactly one subtype: " + JSON.stringify(detailed_disease));
					detailed_disease_select.show();
					$(this).parent().find($('.ddcs')).prop('disabled',true);
					detailed_disease_select.append("<option value='" + detailed_disease[0].system + "-" + detailed_disease[0].code + "'> "
						+ $.t("diseases:" + detailed_disease[0].system + "-" + detailed_disease[0].code) + " </option>");

					if( $(this).val() == 'Healthy'){
						$(this).parent().parent().find('#age_at_diagnosis_select').hide();
					}else{
						$(this).parent().parent().find('#age_at_diagnosis_select').show();
					}
					
					$(this).parent().parent().find('#age_at_diagnosis_select').prop('disabled',false);
					if( $(this).val() == 'Unknown'){
						$(this).parent().parent().find('#age_at_diagnosis_select').val('Unknown');
						$(this).parent().parent().find('#age_at_diagnosis_select').prop('disabled',true);
					}
				} else {
					$(this).parent().find($('.ddcs')).prop('disabled',false);
					$(this).parent().parent().find('#age_at_diagnosis_select').prop('disabled',false);
					detailed_disease_select.show().append("<option value='not_picked'>" + $.t("fhh_js.disease_subtype_select") + "</option>");

					for (var i = 0; i < detailed_disease.length;i++) {
						detailed_disease_select.append("<option value='" + detailed_disease[i].system + "-" + detailed_disease[i].code + "'> "
							+ $.t("diseases:" + detailed_disease[i].system + "-" + detailed_disease[i].code) + " </option>");
					}
				}
			}
			else {
					detailed_disease_select.show();
					$(this).parent().find($('.ddcs')).prop('disabled',true);
					$(this).parent().parent().find('#age_at_diagnosis_select').prop('disabled',false);
					//detailed_disease_select.append("<option value='" + new_disease_selected.replace(/\"/g,'&quot;') + "'>" +  "" + "</option>");
					//detailed_disease_select.append("<option value='" + detailed_disease[0].system + "-" + detailed_disease[0].code + "'> "
					//	+ $.t("diseases:" + detailed_disease[0].system + "-" + detailed_disease[0].code) + " </option>");
					if ($(this).find("option:selected" ).val() != "not_picked" ) {
						detailed_disease_select.append("<option value='other_details'>" + $(this).find("option:selected" ).val() + "</option>");
					} else {
						detailed_disease_select.append("<option value='not_picked'>" + $.t("fhh_js.disease_subtype_select") + "</option>");
					}
			}
		}
	});
	return disease_select;
}

function get_detailed_disease (disease_name) {
//	alert (disease_name + ":" + JSON.stringify(diseases[disease_name],null,2));
	return diseases[disease_name];
}

function set_age_at_diagnosis_pulldown(instructions, age_at_diagnosis_select) {
	age_at_diagnosis_select.append("<option value='not_picked'> "+instructions+"  </option>");
	age_at_diagnosis_select.append("<option value='Unknown'>" + $.t("fhh_js.unknown") + "</option>");
	age_at_diagnosis_select.append("<option value='prebirth'>" + $.t("fhh_js.prebirth") + "</option>");
	age_at_diagnosis_select.append("<option value='newborn'>" + $.t("fhh_js.newborn") + "</option>");
	age_at_diagnosis_select.append("<option value='infant'>" + $.t("fhh_js.infant") + "</option>");
	age_at_diagnosis_select.append("<option value='child'>" + $.t("fhh_js.child") + "</option>");
	age_at_diagnosis_select.append("<option value='early_teens'>" + $.t("fhh_js.early_teens") + "</option>");
	age_at_diagnosis_select.append("<option value='late_teens'>" + $.t("fhh_js.late_teens") + "</option>");
	age_at_diagnosis_select.append("<option value='early_twenties'>" + $.t("fhh_js.early_twenties") + "</option>");
	age_at_diagnosis_select.append("<option value='late_twenties'>" + $.t("fhh_js.late_twenties") + "</option>");
	age_at_diagnosis_select.append("<option value='early_thirties'>" + $.t("fhh_js.early_thirties") + "</option>");
	age_at_diagnosis_select.append("<option value='late_thirties'>" + $.t("fhh_js.late_thirties") + "</option>");
	age_at_diagnosis_select.append("<option value='early_fourties'>" + $.t("fhh_js.early_fourties") + "</option>");
	age_at_diagnosis_select.append("<option value='late_fourties'>" + $.t("fhh_js.late_fourties") + "</option>");
	age_at_diagnosis_select.append("<option value='early_fifties'>" + $.t("fhh_js.early_fifties") + "</option>");
	age_at_diagnosis_select.append("<option value='late_fifties'>" + $.t("fhh_js.late_fifties") + "</option>");
	age_at_diagnosis_select.append("<option value='early_sixties'>" + $.t("fhh_js.early_sixties") + "</option>");
	age_at_diagnosis_select.append("<option value='late_sixties'>" + $.t("fhh_js.late_sixties") + "</option>");
	age_at_diagnosis_select.append("<option value='senior'>" + $.t("fhh_js.senior") + "</option>");
	return age_at_diagnosis_select;
}




function add_other_disease(new_disease_name) {
	// here we add new diseases to the personal history and diseases object //
	// set match variable to 0. this will determine if the exact disease name already exists. Note this is case sensitive. ABC!=abc
	var match = 0;
	// cehck if Other diseases exist in the diseases obejct //
	if (!diseases['OTHER']) {
		// create other diseases object //
		diseases['OTHER'] = [];
	} else {
		// search disease list for current disease and don't add if exists. set match to 1 if there is a match //
		var existing_disease = does_disease_exist(new_disease_name);
		var match = existing_disease[0];
		var diseaseName = existing_disease[1];
	}

	// if no match, add disease to diseases object and dropdowns //
	if (!match) {
		// add new disease to other disease category //
		diseases['OTHER'].push({"abbr":"", "code":"other", "name":new_disease_name, "system":"other"});
		$("#personal_health_information #disease_choice_select").append("<option value='" + new_disease_name.replace(/\"/g,'&quot;') + "' class='other_disease'>" + new_disease_name + "</option>");
		$("#family_health_information #disease_choice_select").append("<option value='" + new_disease_name.replace(/\"/g,'&quot;') + "' class='other_disease'>" + new_disease_name + "</option>");
		$("#update_family_member_health_history_dialog #cause_of_death_select").append("<option value='" + new_disease_name.replace(/\"/g,'&quot;') + "' class='other_disease'>" + new_disease_name + "</option>");


//		$("#detailed_disease_choice_select").append("<option value='" + new_disease_name.replace(/\"/g,'&quot;') + "' class='other_disease'>" + new_disease_name + "</option>");		// '

	}
};

function does_disease_exist(new_disease_name) {
	var match = 0;
	var diseaseName = new_disease_name;
	if (diseases['OTHER']) {
		for (var i=0;i<diseases['OTHER'].length;i++) {
			if (new_disease_name.toLowerCase()==diseases['OTHER'][i]['name'].toLowerCase()) {
				match = 1;
				diseaseName = diseases['OTHER'][i]['name'];
				break;
			}
		}
	}
	else {
		return [0,new_disease_name];
	}

	return [match, diseaseName];
}

function add_disease() {
//	alert($(this).parent().parent().parent().html());
	var disease_name = $(this).parent().parent().find("#disease_choice_select").val();
	var disease_code = $(this).parent().parent().find("#detailed_disease_choice_select").val();
	var age_at_diagnosis = $(this).parent().parent().find("#age_at_diagnosis_select").val();
	var disease_detail = $.t("diseases:" + disease_code, disease_name);

	var other_disease_label = $(this).parent().parent().find("#disease_choice_select :selected").attr('class');


	if (disease_name == null || disease_name == '' || disease_name == 'not_picked' || disease_name == 'diseases:null') {
		alert ($.t("fhh_js.disease_select"));
		return;
	}

	if (disease_detail == 'not_picked' || disease_detail == $.t("diseases:not_picked") ) {
		alert ($.t("fhh_js.disease_subtype_select"));
		return;
	}

	if( disease_name == 'Healthy' ){
		age_at_diagnosis = 'blank';
	}else{
		if (age_at_diagnosis == null || age_at_diagnosis == '' || age_at_diagnosis == 'not_picked') {
			alert ($.t("fhh_js.age_at_diagnosis_select"));
			return;
		}
	}

	var new_disease_name = $(this).parent().parent().find("#new_disease_name").val();
	if (disease_name == 'other') {

		if (new_disease_name == null || new_disease_name != "") {
			// add disease to disease object //
//			add_other_disease(new_disease_name);
			disease_code = "other-undefined";
			disease_name = does_disease_exist(new_disease_name)[1];
			disease_detail = disease_name;

		} else {
			alert ($.t("fhh_js.disease_name_enter"));
			return;
		}

	} else {
		// remove else
		// disease is other disease and can not be looked up //
		if (!disease_code||disease_code==null || disease_code == 'null' || disease_code == 'other' || other_disease_label) {
			disease_code = 'other'; disease_detail = disease_name;
		}
	}
	//end remove else

	specific_health_issue = {"Disease Name": disease_name,
	                          "Detailed Disease Name": disease_detail,
	                          "Age At Diagnosis": age_at_diagnosis,
	                          "Disease Code": disease_code};

	current_health_history.push(specific_health_issue);

	// 「登録」ボタンが押され、未入力チェックに通り病歴が配列にpushされたタイミングで、
	// current_health_history の診断時年齢をすべて調べ、実年齢or死亡年齢との整合性をチェック（関数外出し）
	// 本人情報の画面を開いている場合
	if ( $('div[aria-describedby="add_personal_information_dialog"]').css('display') == 'block' ) {
		check_history_age_validity("personal");
	}

	// 家族情報の画面を開いている場合
	if ( $('div[aria-describedby="update_family_member_health_history_dialog"]').css('display') == 'block' ) {
		check_history_age_validity("family");
	}

	var row_number = current_health_history.length;

	var new_row = create_disease_row(row_number, disease_name, disease_detail, age_at_diagnosis, disease_code);
	$(this).parent().parent().parent().find("#health_data_entry_row").before(new_row);

	// Reset the fields
	$(this).parent().parent().find("#new_disease").remove();
	$(this).parent().parent().find("#disease_choice_select").val($(this).parent().parent().find("#disease_choice_select").find('option').first().val());
	$(this).parent().parent().find("#detailed_disease_choice_select").empty().append("<option value='not_picked'>" + $.t("fhh_js.disease_subtype_select") + "</option>").show();
	$(this).parent().parent().find($('.ddcs')).prop('disabled',true);
	//		$(this).parent().parent().find("#detailed_disease_choice_select").val($(this).parent().parent().find("#detailed_disease_choice_select").find('option').first().val());

	$(this).parent().parent().find("#age_at_diagnosis_select").val($(this).parent().parent().find("#age_at_diagnosis_select").find('option').first().val());

	if( disease_name == 'Healthy' ){
		$(this).parent().parent().parent().find("#health_data_entry_row").hide();
	}
	toggleHealthyOption( $(this).parent().parent().parent() );

	return false;
}

function create_disease_row(row_number, disease_name, disease_detail, age_at_diagnosis, code) {
	var new_row=$("<tr class='md_tr' class='disease_detail' row_number='" + (row_number+1) + "'>");
	if (code != null) {
		var translated_disease = $.t("diseases:" + code);
		if (translated_disease.substr(0,9) == "diseases:") translated_disease = disease_detail;
		if (code == "other-undefined") {
//			new_row.append("<td class='disease_name hi-add' code='"+code+"'>" + $('#disease_choice_select option:selected').text() + "</td>");
			new_row.append("<td class='disease_name hi-add' code='"+code+"'>" + "その他" + "</td>");
			new_row.append("<td class='disease_name hi-add'>" + escape_html(disease_detail) + "</td>");
		} else {
			new_row.append("<td class='disease_name hi-add' code='"+code+"'>" + escape_html(translated_disease) + "</td>");
			new_row.append("<td class='disease_name hi-add'>" + "" + "</td>");
		}
	} else if (disease_detail != null && disease_detail != 'none') {
		new_row.append("<td class='disease_name hi-add'>" + escape_html(disease_detail) + "</td>");
	} else {
		new_row.append("<td class='disease_name hi-add'>" + escape_html(disease_name) + "</td>");
	}
	new_row.append("<td class='age_at_diagnosis hi-add'>" + $.t("fhh_js." + age_at_diagnosis) + "</td>");
//	new_row.append("<td>" +  age_at_diagnosis + "</td>");

	var remove_disease_button = $("<button id='remove_disease_button'>" + $.t("fhh_js.remove") + "</button>");
	var remove_disease_button = $("<div class='inner'><button style='display:none;' id='remove_disease_button' href='#'></button><div class='material-icons large-size green-text cursor_pointer icon_shadow'>delete</div></div>");
	var remove_disease_button = $("<button id='remove_disease_button' class='btn-small waves-effect waves-light teal lighten-1 '>" + $.t("fhh_js.remove") + "</button>");

	remove_disease_button.attr("row_number", row_number+1);

	remove_disease_button.on('click', remove_disease);
	new_row.append($("<td style='text-align:center'>").append(remove_disease_button));
	return new_row;
}

function toggleHealthyOption( that ){
	if( $(that).find('.md_tr[row_number]').length > 0 ){
		$(that).find("#disease_choice_select option[value='Healthy']").hide();
		return;
	}
	$(that).find("#disease_choice_select option[value='Healthy']").show();
}

function remove_disease() {

	var row_number = $(this).attr("row_number");
	var disease_name = $(this).parent().parent().find(".disease_name").text();
	var disease_code = $(this).parent().parent().find(".disease_name").attr("code");

	h = current_health_history;

	for (i=0;i<h.length;i++) {

		if( disease_code == "other-undefined"  ){
			// その他の場合、その他+病名とする必要がある。
			if( disease_code ==  h[i]["Disease Code"] && disease_name == ( "その他" + h[i]["Disease Name"] ) ){
				disease_row_number = i;
				break;
			}
		}else{
			if (disease_code ==  h[i]["Disease Code"] ||  disease_name == h[i]["Disease Name"] || disease_name == h[i]["Detailed Disease Name"]) {
				disease_row_number = i;
				break;
			}
		}

	}

	// row_number starts at 1, the array starts at 0 so we need to subtract 1

	current_health_history.splice(disease_row_number, 1);

	$(this).parent().parent().parent().find("#health_data_entry_row").show();
	var that = $(this).parent().parent().parent();
	$(this).parent().parent().remove();
//	alert ("Removing Disease Row: " + row_number);

	toggleHealthyOption( that );

	// 「削除」ボタンが押され、病歴が配列からspliceされたタイミングで、
	// current_health_history の診断時年齢をすべて調べ、実年齢or死亡年齢との整合性をチェック
	// 本人情報の画面を開いている場合
	if ( $('div[aria-describedby="add_personal_information_dialog"]').css('display') == 'block' ) {
		check_history_age_validity("personal");
		// 削除の場合は、列から病歴がすべてなくなったときは警告文を隠す
		if (current_health_history.length == 0) {
			$("#personal_health_information").find("#alert_age_at_diagnosis").hide();
		}
	}

	// 家族情報の画面を開いている場合
	if ( $('div[aria-describedby="update_family_member_health_history_dialog"]').css('display') == 'block' ) {
		check_history_age_validity("family");
		// 削除の場合は、列から病歴がすべてなくなったときは警告文を隠す
		if (current_health_history.length == 0) {
			$("#family_health_information").find("#alert_age_at_diagnosis").hide();
		}
	}

	return false;
}

// Family Background Section

// Health Information Section

function build_race_ethnicity_section(race_ethnicity, personal_flag) {
//	var race_ethnicity = $("#personal_race_ethnicity");
	// First put up accordion entry
	var bar = $("<div class='title-bar' id='bi-title'>" + $.t("fhh_js.race_ethnicity_title") + "</div>");
	race_ethnicity.empty().append(bar);

	var id_text = "";

	if(personal_flag === true){		// personal
		races_id_text = "selectedRaces";
		ethn_id_text = "selectedEthnicities";
		asian_text = "asian_checkboxes";
	}else{							// family
		races_id_text = "selectedFamilyRaces";
		ethn_id_text = "selectedFamilyEthnicities";
		asian_text = "asian_Familycheckboxes";
	}

	var race_checkboxes = $("<td class='race_checkbox'>" +
			"<input tabindex='21' name='selectedRaces' value='1' id='" + races_id_text + "-1'  type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-1' class='checkboxLabel'>" + $.t("fhh_js.race_native_american") + "　</label>" +
			"<input tabindex='21' name='selectedRaces' value='2' id='" + races_id_text + "-2' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-2' class='checkboxLabel'>" + $.t("fhh_js.race_asian") + "　</label>" +
			"<input tabindex='21' name='selectedRaces' value='3' id='" + races_id_text + "-3' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-3' class='checkboxLabel'>" + $.t("fhh_js.race_black") + "　</label>" +
			"<input tabindex='21' name='selectedRaces' value='4' id='" + races_id_text + "-4'  type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-4' class='checkboxLabel'>" + $.t("fhh_js.race_south_pacific") + "　</label>" +
			"<input tabindex='21' name='selectedRaces' value='5' id='" + races_id_text + "-5'  type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-5' class='checkboxLabel'>" + $.t("fhh_js.race_white") + "　</label>" +
			"</td>");

	var asian_race_checkboxes = $("<td class='race_checkbox'>" +
			"<input tabindex='22' name='selectedRaces' value='11' id='" + races_id_text + "-11'  type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-11' class='checkboxLabel'>" + $.t("fhh_js.race_asian_indian") + "　</label>" +
			"<input tabindex='22' name='selectedRaces' value='12' id='" + races_id_text + "-12' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-12' class='checkboxLabel'>" + $.t("fhh_js.race_chinese") + "　</label>" +
			"<input tabindex='22' name='selectedRaces' value='13' id='" + races_id_text + "-13' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-13' class='checkboxLabel'>" + $.t("fhh_js.race_filipino") + "　</label>" +
			"<input tabindex='22' name='selectedRaces' value='14' id='" + races_id_text + "-14' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-14' class='checkboxLabel'>" + $.t("fhh_js.race_japanese") + "　</label>" +
			"<input tabindex='22' name='selectedRaces' value='15' id='" + races_id_text + "-15' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-15' class='checkboxLabel'>" + $.t("fhh_js.race_korean") + "　</label>" +
			"<input tabindex='22' name='selectedRaces' value='16' id='" + races_id_text + "-16' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-16' class='checkboxLabel'>" + $.t("fhh_js.race_vietnamese") + "　</label>" +
			"<input tabindex='22' name='selectedRaces' value='17' id='" + races_id_text + "-17' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-17' class='checkboxLabel'>" + $.t("fhh_js.race_other_asian") + "　</label>" +
			"<input tabindex='22' name='selectedRaces' value='18' id='" + races_id_text + "-18' type='checkbox' class='filled-in' />" +
			"<label for='" + races_id_text + "-18' class='checkboxLabel'>" + $.t("fhh_js.race_unknown_asian") + "　</label>" +
			"</td>");

	var south_pacific_race_checkboxes = $("<td class='race_checkbox'>" +
			"<input tabindex='23' name='selectedRaces' value='21' id='" + races_id_text + "-21'  type='checkbox' class='filled-in' >" +
			"<label for='" + races_id_text + "-21' class='checkboxLabel'>" + $.t("fhh_js.race_chamorro") + "　</label>" +
			"<input tabindex='23' name='selectedRaces' value='22' id='" + races_id_text + "-22' type='checkbox' class='filled-in' >" +
			"<label for='" + races_id_text + "-22' class='checkboxLabel'>" + $.t("fhh_js.race_guamanian") + "　</label>" +
			"<input tabindex='23' name='selectedRaces' value='23' id='" + races_id_text + "-23' type='checkbox' class='filled-in' >" +
			"<label for='" + races_id_text + "-23' class='checkboxLabel'>" + $.t("fhh_js.race_hawaiian") + "　</label>" +
			"<input tabindex='23' name='selectedRaces' value='24' id='" + races_id_text + "-24' type='checkbox' class='filled-in' >" +
			"<label for='" + races_id_text + "-24' class='checkboxLabel'>" + $.t("fhh_js.race_samoan") + "　</label>" +
			"<input tabindex='23' name='selectedRaces' value='25' id='" + races_id_text + "-25' type='checkbox' class='filled-in' >" +
			"<label for='" + races_id_text + "-25' class='checkboxLabel'>" + $.t("fhh_js.race_unknown_south_pacific") + "　</label>" +
			"</td>");

	var ethnicity_checkboxes = $("<td class='race_checkbox'>" +
			"<input tabindex='24' name='selectedEthnicities' value='1' id='" + ethn_id_text + "-1' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-1' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_hispanic") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='2' id='" + ethn_id_text + "-2' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-2' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_jewish") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='3' id='" + ethn_id_text + "-3' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-3' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_nothispanic") + "　</label>" +
			"</td>");

	var hispanic_ethnicity_checkboxes = $("<td class='race_checkbox'>" +
			"<input tabindex='24' name='selectedEthnicities' value='11' id='" + ethn_id_text + "-11' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-11' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_central_american") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='12' id='" + ethn_id_text + "-12' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-12' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_cuban") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='13' id='" + ethn_id_text + "-13' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-13' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_dominican") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='14' id='" + ethn_id_text + "-14' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-14' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_mexican") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='15' id='" + ethn_id_text + "-15' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-15' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_other_hispanic") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='16' id='" + ethn_id_text + "-16' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-16' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_puerto_rican") + "　</label>" +
			"<input tabindex='24' name='selectedEthnicities' value='17' id='" + ethn_id_text + "-17' type='checkbox' class='filled-in' >" +
			"<label for='" + ethn_id_text + "-17' class='checkboxLabel'>" + $.t("fhh_js.ethnicity_south_american") + "　</label>" +
			"</td>");

	var table = $("<table>");
	race_ethnicity.append(table);

	/*
	* if (personal_flag) {
	*	table.append($("<tr class='md_tr'>")
	*					.append("<td colspan='3'><label for='person_consanguinity'>" + $.t("fhh_js.consanguinity") + "</label>"
	*							+ "<input name='person.consanguinity' value='true' tabindex='20' id='person_consanguinity' type='checkbox' class='filled-in' /></td>"));
	*}
	*/
	table.append($("<tr class='md_tr'>").append("<td colspan='2'>" + $.t("fhh_js.multiple_races_selectable") + "<span id='warn_japanese' style='display:none;'>" + $.t( "fhh_js.default_is_japanese_asia" ) + "</span></td>") );
	table.append($("<tr class='md_tr'>")
						.append("<td style='width:150px;'>" + $.t("fhh_js.race") + "</td>")
						.append(race_checkboxes) );
	table.append($("<tr class='md_tr' id='" + asian_text + "'>")
						.append("<td>" + $.t("fhh_js.more_race") + "</td>")
						.append(asian_race_checkboxes) );
	table.append($("<tr class='md_tr' id='south_pacific_checkboxes'>")
						.append("<td>" + $.t("fhh_js.more_race") + "</td>")
						.append(south_pacific_race_checkboxes) );
	table.append($("<tr class='md_tr'>")
						.append("<td>" + $.t("fhh_js.ethnicity") + "</td>")
						.append(ethnicity_checkboxes) );
	table.append($("<tr class='md_tr' id='hispanic_checkboxes'>")
						.append("<td>" + $.t("fhh_js.more_ethnicity") + "</td>")
						.append(hispanic_ethnicity_checkboxes) );
/*
	var why_ask_ashkenazi_link = $("<div class='why_necessary button_color_normal'><a tabindex='29' href='#' id='why_ask_ashkenazi_link'>" + $.t("fhh_js.ashkezani_q") + "</a></div>");
	why_ask_ashkenazi_link.click(function () {
		$("#why_ask_ashkenazi_dialog").dialog("open");
	});
//	race_ethnicity.append($("<tr class='md_tr'>").append(why_ask_ashkenazi_link));
	race_ethnicity.append("<br />").append(why_ask_ashkenazi_link);
*/
}


function clear_family_member_health_history_dialog() {
	$("#family_member_parent_id").val("");

	var relationship ="";
	if (current_relationship == 'father' || current_relationship == 'mother'
		 || current_relationship == 'paternal_grandfather' || current_relationship == 'paternal_grandmother'
		 || current_relationship == 'maternal_grandfather' || current_relationship == 'maternal_grandmother') {
		 	relationship = current_relationship;
	} else {
		relationship = current_relationship.substring(0, current_relationship.lastIndexOf('_'));
	}


	$("#family_member_relationship").empty().append($.t("fhh_js." + relationship));
	$("#family_member_info_form_name").val("");
	$('#family_member_info_form_gender_male').prop('checked',false);
	$('#family_member_info_form_gender_female').prop('checked',false);
	$("#family_member_info_form_date_of_birth").val("");
	$("#family_member_info_form_twin_status_no").prop('checked',true);
	$("#family_member_info_form_twin_status_identical").prop('checked',false);
	$("#family_member_info_form_twin_status_fraternal").prop('checked',false);
	$("#family_member_info_form_adopted_yes").prop('checked',false);

	$(".disease_detail").each(function () {
		$(this).remove();
	});

	$("#disease_choice_select").val($("#disease_choice_select").find('option').first().val());
	$("#detailed_disease_choice_select").val($("#detailed_disease_choice_select").find('option').first().val());
	$("#age_at_diagnosis_select").val($("#age_at_diagnosis_select").find('option').first().val());
	current_health_history = [];

	$("#family_race_ethnicity").find("#selectedRaces-1").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-2").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-3").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-4").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-5").prop('checked',false);

	$("#family_race_ethnicity").find("#selectedRaces-11").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-12").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-13").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-14").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-15").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-16").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-17").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-18").prop('checked',false);

	$("#family_race_ethnicity").find("#selectedRaces-21").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-22").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-23").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-24").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedRaces-25").prop('checked',false);

	$("#family_race_ethnicity").find("#selectedFamilyRaces-1").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-2").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-3").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-4").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-5").prop('checked',false);

	$("#family_race_ethnicity").find("#selectedFamilyRaces-11").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-12").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-13").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-14").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-15").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-16").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-17").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-18").prop('checked',false);

	$("#family_race_ethnicity").find("#selectedFamilyRaces-21").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-22").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-23").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-24").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyRaces-25").prop('checked',false);

	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-1").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-2").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-3").prop('checked',false);

	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-11").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-12").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-13").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-14").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-15").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-16").prop('checked',false);
	$("#family_race_ethnicity").find("#selectedFamilyEthnicities-17").prop('checked',false);

}

var thirdVari;

function clear_and_set_current_family_member_health_history_dialog(family_member) {
	$("#new_disease_name").remove();
	$("#new_disease_name_cod").remove();
	var relationship_name = get_relationship_from_relationship_id(family_member.relationship);
	$("#family_member_parent_id").val(family_member.parent_id);
	$("#family_member_relationship").empty().append($.t("fhh_js." + relationship_name));
	if (family_member.name == null || family_member.name == "") family_member.name = get_defaultname(relationship_name);
	$("#family_member_info_form_name").val(family_member.name);

	$("#family_invalid_gender_warning").remove();
	$("#invalid_date_of_birth_warning").remove();

	// bug #23
	$("#family_member_info_form_twin_status_no").prop('checked',false);
	$("#family_member_info_form_twin_status_identical").prop('checked',false);
	$("#family_member_info_form_twin_status_fraternal").prop('checked',false);
	$("#age_determination").val("");
	$("#age_determination_dob").prop('checked',false);
	$("#age_determination_age").prop('checked',false);
	$("#age_determination_estimated_age").prop('checked',false);
	$("#family_info_form_year_of_birth").val("");
	$("#family_info_form_month_of_birth").val("");
	$("#family_info_form_date_of_birth").val("");
	$("#age_determination_date_of_birth_text").val("");
	$("#age_determination_date_of_birth_estimate").val("");
	$("#age_determination_text").val("");
	$("#estimated_age_select").val("");
	$("#age_determination_date_of_birth").show();
	$("#age_determination_date_of_birth_text").hide();
	$("#age_determination_date_of_birth_estimate").hide();

	$("#family_member_update_date").empty().append(PersonalInformationUtil.getUpdateDate( family_member.update_date ));

	var person_name_or_relationship;
	if (!(family_member.name == "")) person_name_or_relationship = family_member.name;
	else person_name_or_relationship = $.t("info_dialog.your") + " " + $.t("fhh_js." + relationship_name);

	$("#update_family_member_health_history_dialog").find("#family-title")
		.text($.t("info_dialog.personal_information_for") + " " + person_name_or_relationship);
	$("#update_family_member_health_history_dialog").find("#hi-title")
		.text($.t("info_dialog.health_information_for") + " " + person_name_or_relationship);
	$("#update_family_member_health_history_dialog").find("#bi-title")
		.text($.t("info_dialog.race_ethnicity_information_for") + " " + person_name_or_relationship);


	if (family_member.gender == "MALE") $('#family_member_info_form_gender_male').prop('checked',true);
	else $('#family_member_info_form_gender_male').prop('checked',false);

	if (family_member.gender == "FEMALE") $('#family_member_info_form_gender_female').prop('checked',true);
	else $('#family_member_info_form_gender_female').prop('checked',false);

	if (relationship_name == 'maternal_cousin' || relationship_name == 'paternal_cousin' ) {
		$('#family_member_info_form_gender_male').prop('disabled',false);
		$('#family_member_info_form_gender_female').prop('disabled',false);
	} else {
		$('#family_member_info_form_gender_male').prop('disabled',true);
		$('#family_member_info_form_gender_female').prop('disabled',true);
	}

	$("#age_determination_date_of_birth").val(family_member.date_of_birth);
	$("#age_determination_text").val(family_member.age);
	$("#estimated_age").val(family_member.estimated_age);

	$("#family_info_form_year_of_birth, #family_info_form_month_of_birth").on("change",function() {
		var year = $("#family_info_form_year_of_birth").val() + "/";
		var month = String($("#family_info_form_month_of_birth").val()).padStart(2, '0');
		var date = "/01";
		$("#family_info_form_date_of_birth").val(year + month + date);
	});

	$("#family_member_info_form_date_of_birth").val(family_member.date_of_birth);

	if (typeof(family_member.prefectures) != "undefined" && family_member.prefectures != null) {
		$("#family_member_info_form_place_of_birth").val(family_member.prefectures);
	} else {
		$("#family_member_info_form_place_of_birth").val("");
	}

	if (typeof(family_member.living_prefectures) != "undefined" && family_member.living_prefectures != null) {
		$("#family_member_info_form_living_place").val(family_member.living_prefectures);
	} else {
		$("#family_member_info_form_living_place").val("");
	}


	// 生まれ順の情報取得
	if( typeof(family_member.birth_order) != "undefined" && family_member.birth_order != null ){
		$('#family_member_birth_order').val(family_member.birth_order);
	} else {
		$("#family_member_birth_order").val("");
	}

	// 生まれ順の画面テンキーパッド
	$('#family_member_birth_order').keypad({
		  layout: ['789'+$.keypad.BACK, '456'+$.keypad.CLOSE, '123', $.keypad.SPACE+'0'],
		  keypadOnly: false
		}).keypad('option', 'backText', '消').keypad('option', 'closeText', '閉');


	if (family_member.twin_status == "NO") {
		$("#family_member_info_form_twin_status_no").prop('checked',true);
	} else if (family_member.twin_status == "IDENTICAL") {
		$("#family_member_info_form_twin_status_identical").prop('checked',true);
	} else if (family_member.twin_status == "FRATERNAL") {
		$("#family_member_info_form_twin_status_fraternal").prop('checked',true);
	} else {
		$("#family_member_info_form_twin_status_no").prop('checked',false);
		$("#family_member_info_form_twin_status_no").prop('checked',false);
		$("#family_member_info_form_twin_status_no").prop('checked',false);
	}

	$("#family_member_info_form_adopted_yes").prop('checked', (family_member.adopted == 'true' || family_member.adopted == true));

	if( $("#family_member_info_form_adopted_yes").prop('checked') ){
		$("#family_member_info_form_adopted_yes").parent().parent().show();
	}else{
		$("#family_member_info_form_adopted_yes").parent().parent().hide();
	}

	// Age/Estimated Age or Cause of Death
	$("#cause_of_death_select").val("");
	$("#detailed_cause_of_death_select").empty().hide();
	$('#estimated_death_age_select').val("");


	$("#age_determination").val("");
	$("#age_determination_dob").prop('checked',false);
	$("#age_determination_age").prop('checked',false);
	$("#age_determination_estimated_age").prop('checked',false);

	$("#family_info_form_year_of_birth").val("");
	$("#family_info_form_month_of_birth").val("");
	$("#family_info_form_date_of_birth").empty();


	if (family_member.is_alive == 'dead') {
		$("#is_person_alive").val('dead');
		var cause_of_death = get_high_level_disease_name_from_disease_code(family_member.cause_of_death_code.split('-')[1]);
//		if (cause_of_death == 'other') cause_of_death = family_member.detailed_cause_of_death;
		$("#cause_of_death_select").val(cause_of_death);
		$("#cause_of_death_select").trigger("change");
		if (family_member.detailed_cause_of_death) {
//			if (family_member.cause_of_death == 'other') {
			// デフォルトで用意される病気リストに含まれていない場合
			if (! default_diseases_list.includes(family_member.cause_of_death)) {
				$("#detailed_cause_of_death_select").hide();
				$("#new_disease_cod").show();
				$("#new_disease_name_cod").val(family_member.detailed_cause_of_death); // 挙動が怪しいので取りやめにする可能性
			} else {
				var code = family_member.cause_of_death_code;
				$("#detailed_cause_of_death_select").show().val(code);
			}
		}
		$('#estimated_death_age_select').val(family_member.estimated_death_age);
		$('#estimated_death_age_select').change(function() {
			$('select#select1 option[value="senior"]').wrap('<span>');
		});

		$("#person_is_alive").hide();
		$("#person_is_not_alive").show();
	} else if (family_member.is_alive == 'alive') {
		if (family_member.date_of_birth) {
			$("#is_person_alive").val('alive');
			$("#age_determination").val('date_of_birth');
			$("#age_determination_dob").prop('checked',true);
			$("#age_determination_age").prop('checked',false);
			$("#age_determination_estimated_age").prop('checked',false);
			$("#age_determination_date_of_birth").show();
			$("#family_info_form_date_of_birth").hide().val(family_member.date_of_birth);
			$("#family_info_form_year_of_birth").show().val(family_member.year_of_birth);
			$("#family_info_form_month_of_birth").show().val(family_member.month_of_birth);
			$('#age_determination_date_of_birth_text').hide();
			$('#age_determination_date_of_birth_estimate').hide();
			$("#person_is_alive").show();
			$("#person_is_not_alive").hide();
		} else if (family_member.age) {
			$("#is_person_alive").val('alive');
			$("#age_determination").val('age');
			$("#age_determination_dob").prop('checked',false);
			$("#age_determination_age").prop('checked',true);
			$("#age_determination_estimated_age").prop('checked',false);
			$("#age_determination_date_of_birth").hide();
			$("#age_determination_date_of_birth_text").show();
			$('#age_determination_text').show().val(family_member.age);
			$("#age_determination_date_of_birth_estimate").hide();
			$("#person_is_alive").show();
			$("#person_is_not_alive").hide();
		} else if (family_member.estimated_age) {
			$("#is_person_alive").val('alive');
			$("#age_determination").val('estimated_age');
			$("#age_determination_dob").prop('checked',false);
			$("#age_determination_age").prop('checked',false);
			$("#age_determination_estimated_age").prop('checked',true);
			$("#age_determination_date_of_birth").hide();
			$("#age_determination_date_of_birth_text").hide();
			$("#age_determination_date_of_birth_estimate").show();
			$('#estimated_age_select').show().val(family_member.estimated_age);
			$("#person_is_alive").show();
			$("#person_is_not_alive").hide();
		} else {
			$("#is_person_alive").val('alive');
			$("#person_is_alive").show();
			$("#person_is_not_alive").hide();
		}
	} else {
		$("#is_person_alive").val('unknown');
		$("#person_is_alive").hide();
		$("#person_is_not_alive").hide();
	}

	// 喫煙状況の情報取得
	if (family_member.smoker_family != null) {
		$('input[name="smoker_family"]').val([family_member.smoker_family]);
		if (family_member.smoker_family != "10") { // 現在も喫煙している、以外の場合
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('checked',false);
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('disabled',true);
		} else { // 現在も喫煙している、の場合、本数の項目の有効化および情報取得
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').val([family_member.family_number_of_cigarettes_per_day]);
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('disabled',false);
		}
	} else {
		$('input[name="smoker_family"]').prop('checked', false);
		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('checked',false);
		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('disabled',true);
	}

	$('input[name="smoker_family"]').change(function() {
    	if ($('input[name="smoker_family"]:checked').val() != 10) {
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('checked',false);
    		$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('disabled',true);
        } else {
        	$('input[name="additional_information_number_of_cigarettes_per_day_family"]').prop('disabled',false);
        }
    });

	// 運動状況の情報取得
	if (family_member.training_family != null) {
		$('input[name="training_family"]').val([family_member.training_family]);
		if (family_member.training_family == "1") { // 運動している（はい）の場合
    		$('select[name="training_status1"]').val([family_member.training_strength]);
    		$('select[name="training_status1"]').prop('disabled',false);
    		$('input[name="training_status2"]').val([family_member.training_count_for_training_at_week]);
    		$('input[name="training_status2"]').prop('disabled',false);
    		$('input[name="training_status3"]').val([family_member.training_time_for_training_at_week]);
    		$('input[name="training_status3"]').prop('disabled',false);
		} else { // いいえ・分からない、の場合
        	document.getElementById("training_strength_family").value = "";
        	document.getElementById("count_for_training_at_week_family").value = "";
        	document.getElementById("time_for_training_at_week_family").value = "";
    		$('select[name="training_status1"]').prop('disabled',true);
    		$('input[name="training_status2"]').prop('disabled',true);
    		$('input[name="training_status3"]').prop('disabled',true);
		}
	} else {
		$('input[name="training_family"]').prop('checked', false);
    	document.getElementById("training_strength_family").value = "";
    	document.getElementById("count_for_training_at_week_family").value = "";
    	document.getElementById("time_for_training_at_week_family").value = "";
		$('select[name="training_status1"]').prop('disabled',true);
		$('input[name="training_status2"]').prop('disabled',true);
		$('input[name="training_status3"]').prop('disabled',true);
	}

	$('input[name="training_family"]').change(function() {
		if ($('input[name="training_family"]:checked').val() == 1) {
    		$('select[name="training_status1"]').prop('disabled',false);
    		$('input[name="training_status2"]').prop('disabled',false);
    		$('input[name="training_status3"]').prop('disabled',false);
        } else {
        	document.getElementById("training_strength_family").value = "";
        	document.getElementById("count_for_training_at_week_family").value = "";
        	document.getElementById("time_for_training_at_week_family").value = "";
        	$('select[name="training_status1"]').prop('disabled',true);
        	$('input[name="training_status2"]').prop('disabled',true);
        	$('input[name="training_status3"]').prop('disabled',true);
        }
    });

	$('input[name="additional_information.frequency_to_walk_in_week_family"]').val([family_member.training_frequency_to_walk_in_week]);
	$('input[name="additional_information.frequency_to_exercise_in_week_family"]').val([family_member.training_frequency_to_exercise_in_week]);
	$('input[name="additional_information.fast_walker_family"]').val([family_member.training_fast_walker]);

	// 食習慣の情報取得
	$('input[name="additional_information.frequency_to_eat_fruits_in_day_family"]').val([family_member.dietary_frequency_to_eat_fruits_in_day]);
	$('input[name="additional_information.frequency_to_eat_vegetables_in_day_family"]').val([family_member.dietary_frequency_to_eat_vegetables_in_day]);
	$('input[name="additional_information.frequency_to_eat_nuts_in_week_family"]').val([family_member.dietary_frequency_to_eat_nuts_in_week]);
	$('input[name="additional_information.frequency_to_eat_whole_grains_in_day_family"]').val([family_member.dietary_frequency_to_eat_whole_grains_in_day]);
	$('input[name="additional_information.frequency_to_eat_fishes_in_week_family"]').val([family_member.dietary_frequency_to_eat_fishes_in_week]);
	$('input[name="additional_information.frequency_to_eat_dairy_products_in_day_family"]').val([family_member.dietary_frequency_to_eat_dairy_products_in_day]);
	$('input[name="additional_information.frequency_to_eat_processed_meat_in_week_family"]').val([family_member.dietary_frequency_to_eat_processed_meat_in_week]);
	$('input[name="additional_information.frequency_to_eat_unprocessed_meat_in_week_family"]').val([family_member.dietary_frequency_to_eat_unprocessed_meat_in_week]);
	$('input[name="additional_information.frequency_to_drink_suger_drin_in_week_family"]').val([family_member.dietary_frequency_to_drink_suger_drin_in_week]);
	$('input[name="additional_information.usual_meal_family"]').val([family_member.dietary_usual_meal]);
	$('input[name="additional_information.frequency_to_eat_miso_soup_in_day_family"]').val([family_member.dietary_frequency_to_eat_miso_soup_in_day]);
	$('input[name="additional_information.seasoning_of_meals_family"]').val([family_member.dietary_seasoning_of_meals]);
	$('input[name="additional_information.frequency_to_eat_breakfast_in_week_family"]').val([family_member.dietary_frequency_to_eat_breakfast_in_week]);
	$('input[name="additional_information.eating_speed_family"]').val([family_member.dietary_eating_speed]);
	$('input[name="additional_information.frequency_to_drink_in_week_family"]').val([family_member.dietary_frequency_to_drink_in_week]);
	$('input[name="additional_information.amount_to_drink_family"]').val([family_member.dietary_amount_to_drink]);


	// 運動回数チェック
	$("#count_for_training_at_week_family").on("change", function() {
		if ($(this).val() > 30 || $(this).val() < 1) {
			$("#alert_count_for_training_at_week_family").show();
		} else {
			$("#alert_count_for_training_at_week_family").hide();
		}
	});

	// 運動時間チェック
	$("#time_for_training_at_week_family").on("change", function() {
		if ($(this).val() > 10000 || $(this).val() < 10) {
			$("#alert_time_for_training_at_week_family").show();
		} else {
			$("#alert_time_for_training_at_week_family").hide();
		}
	});

	$('.md_tr[row_number]').each(function () {
		$(this).remove();
	});


	data_entry_row = $("#family_health_information").find("#health_data_entry_row");
	data_entry_row.show();
	data_entry_row.find("#disease_choice_select option[value='Healthy']").show();

	if (family_member['Health History'] != null) {
		current_health_history = family_member['Health History'];
		for (var i=0; i<current_health_history.length;i++) {

			if(current_health_history[i]['Disease Code'] == 'Healthy' ){
				data_entry_row.hide();
				data_entry_row.find("#disease_choice_select option[value='Healthy']").show();
			} 

			new_row = create_disease_row(
					i,
					current_health_history[i]['Disease Name'],
					current_health_history[i]['Detailed Disease Name'],
					current_health_history[i]['Age At Diagnosis'],
					current_health_history[i]['Disease Code']);
			data_entry_row.before(new_row);
		}
	}

	$("#family_health_information").find("#disease_choice_select").val($("#disease_choice_select").find('option').first().val());
	$("#family_health_information").find("#detailed_disease_choice_select").val($("#detailed_disease_choice_select").find('option').first().val());
	$("#family_health_information").find("#age_at_diagnosis_select").val($("#age_at_diagnosis_select").find('option').first().val());


	/*
	$('#family_race_ethnicity').change(function() {
    	if ($('#selectedFamilyRaces-2').prop('checked')) {
    		$("#family_race_ethnicity").find("#asian_Familycheckboxes").show();
    	} else {
    		$("#family_race_ethnicity").find("#asian_Familycheckboxes").hide();
        }

    	if ($('#selectedFamilyRaces-4').prop('checked')) {
    		$("#family_race_ethnicity").find("#south_pacific_checkboxes").show();
    	} else {
    		$("#family_race_ethnicity").find("#south_pacific_checkboxes").hide();
        }

    	if ($('#selectedFamilyEthnicities-1').prop('checked')) {
    		$("#family_race_ethnicity").find("#hispanic_checkboxes").show();
    	} else {
    		$("#family_race_ethnicity").find("#hispanic_checkboxes").hide();
        }
    });
	*/


	if (family_member.race && family_member.race['Asian'] == true) {
		$("#family_race_ethnicity").find("#asian_Familycheckboxes").show();
	} else {
		$("#family_race_ethnicity").find("#asian_Familycheckboxes").hide();
	}

	if (family_member.race && family_member.race['Native Hawaiian or Other Pacific Islander'] == true) {
		$("#family_race_ethnicity").find("#south_pacific_checkboxes").show();
	} else {
		$("#family_race_ethnicity").find("#south_pacific_checkboxes").hide();
	}


	if (family_member.race != null) {
		$("#family_race_ethnicity").find("#selectedFamilyRaces-1").prop('checked',family_member.race['American Indian or Alaska Native']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-2").prop('checked',family_member.race['Asian']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-3").prop('checked',family_member.race['Black or African-American']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-4").prop('checked',family_member.race['Native Hawaiian or Other Pacific Islander']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-5").prop('checked',family_member.race['White']);

		$("#family_race_ethnicity").find("#selectedFamilyRaces-11").prop('checked',family_member.race['Asian Indian']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-12").prop('checked',family_member.race['Chinese']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-13").prop('checked',family_member.race['Filipino']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-14").prop('checked',family_member.race['Japanese']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-15").prop('checked',family_member.race['Korean']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-16").prop('checked',family_member.race['Vietnamese']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-17").prop('checked',family_member.race['Other Asian']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-18").prop('checked',family_member.race['Unknonwn Asian']);

		$("#family_race_ethnicity").find("#selectedFamilyRaces-21").prop('checked',family_member.race['Chamorro']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-22").prop('checked',family_member.race['Guamanian']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-23").prop('checked',family_member.race['Native Hawaiian']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-24").prop('checked',family_member.race['Samoan']);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-25").prop('checked',family_member.race['Unknown South Pacific Islander']);

	} else {
		$("#family_race_ethnicity").find("#selectedFamilyRaces-1").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-2").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-3").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-4").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-5").prop('checked',false);

		$("#family_race_ethnicity").find("#selectedFamilyRaces-11").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-12").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-13").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-14").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-15").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-16").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-17").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-18").prop('checked',false);

		$("#family_race_ethnicity").find("#selectedFamilyRaces-21").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-22").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-23").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-24").prop('checked',false);
		$("#family_race_ethnicity").find("#selectedFamilyRaces-25").prop('checked',false);

	}

	if (family_member.ethnicity && family_member.ethnicity['Hispanic or Latino'] == true) {
		$("#family_race_ethnicity").find("#hispanic_checkboxes").show();
	} else {
		$("#family_race_ethnicity").find("#hispanic_checkboxes").hide();
	}


	if (family_member.ethnicity != null) {
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-1").prop('checked',family_member.ethnicity['Hispanic or Latino']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-2").prop('checked',family_member.ethnicity['Ashkenazi Jewish']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-3").prop('checked',family_member.ethnicity['Not Hispanic or Latino']);

		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-11").prop('checked',family_member.ethnicity['Central American']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-12").prop('checked',family_member.ethnicity['Cuban']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-13").prop('checked',family_member.ethnicity['Dominican']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-14").prop('checked',family_member.ethnicity['Mexican']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-15").prop('checked',family_member.ethnicity['Other Hispanic']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-16").prop('checked',family_member.ethnicity['Puerto Rican']);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-17").prop('checked',family_member.ethnicity['South American']);

	} else {
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-1").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-2").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-3").prop('checked', false);

		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-11").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-12").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-13").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-14").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-15").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-16").prop('checked', false);
		$("#family_race_ethnicity").find("#selectedFamilyEthnicities-17").prop('checked', false);

	}

	// 初回表示の人種デフォルト設定
	if (family_member['flg_race_ethnic'] != 1) {
		// Asian / Japanese default.
		$("#update_family_member_health_history_dialog").find("#selectedFamilyRaces-2").prop("checked", "true");
		// Open Asian checkbox
		$("#update_family_member_health_history_dialog").find("#asian_Familycheckboxes").show();
		// Japanese checked
		$("#update_family_member_health_history_dialog").find("#selectedFamilyRaces-14").prop("checked", "true");
		// フラグを立て、2回目以降の表示ではデフォルト設定をしないようにする
		family_member['flg_race_ethnic'] = 1;
	}

	// 家族情報初期表示時に年齢診断時年齢整合性チェックの警告を隠す
	$("#family_health_information").find("#alert_age_at_diagnosis").hide();

	// 日本人アジアにチェックが入っている場合は警告を表示する
	if( $("#update_family_member_health_history_dialog").find('#selectedFamilyRaces-14').prop('checked') ) $("#update_family_member_health_history_dialog").find("#warn_japanese").show(); else $("#update_family_member_health_history_dialog").find("#warn_japanese").hide();


	thirdVari = angular.copy(family_member);
}

var secondVari;

function clear_and_set_personal_health_history_dialog() {
	if (personal_information == null) reset_personal_information();
	if (personal_information.name != null) $("#personal_info_form_name").val(personal_information.name);
	else $("#personal_info_form_name").val("");

	// 更新日
	$("#personal_information_update_date").empty().append( PersonalInformationUtil.getUpdateDate( personal_information.update_date ) );

	// 男女
	if (personal_information.gender == "MALE") $('#personal_info_form_gender_male').prop('checked',true);
	else $('#personal_info_form_gender_male').prop('checked',false);
	if (personal_information.gender == "FEMALE") $('#personal_info_form_gender_female').prop('checked',true);
	else $('#personal_info_form_gender_female').prop('checked',false);

	// 生年月日
	$("#personal_info_form_date_of_birth").val(personal_information.date_of_birth);

	// 出生地
	if (personal_information.prefectures != null) {
		$("#personal_info_form_place_of_birth").val(personal_information.prefectures);
	}

	// 双子
	if (personal_information.twin_status == "NO") $("#personal_info_form_twin_status_no").prop('checked',true);
	else if (personal_information.twin_status == "IDENTICAL") $("#personal_info_form_twin_status_identical").prop('checked',true);
	else if (personal_information.twin_status == "FRATERNAL") $("#personal_info_form_twin_status_fraternal").prop('checked',true);

	// 養子
	$("#personal_info_form_adopted_yes").prop('checked',personal_information.adopted == true );

	// 身長
	if (personal_information.height_unit == 'inches') {
		$("#personal_height_feet").val(Math.floor(personal_information.height/12) );
		$("#personal_height_inches").val(Math.floor(personal_information.height % 12) );
	} else if (personal_information.height_unit == 'centimeters') {
		$("#personal_height_centimeters").val(personal_information.height);
	} else {
		$("#personal_height_feet").val("");
		$("#personal_height_inches").val("");
		$("#personal_height_centimeters").val("");
		$("#personal_bmi").val("");
	}

	// 体重
	$("#personal_weight").val(personal_information.weight);
	if (personal_information.weight_unit == 'lbs' || personal_information.weight_unit == 'pound') {
		$("#personal_weight_unit").val("pound");
	} else {
		$("#personal_weight_unit").val("kilogram");
	}

	// additional_information_waist
	// 生年月、腹囲臀囲、居住地の情報取得
	$('#personal_info_form_year_of_birth').val([personal_information.year_of_birth]);
	$('#personal_info_form_month_of_birth').val([personal_information.month_of_birth]);

	// 生まれ順の情報取得
	$('#birth_order').val([personal_information.birth_order]);

	$('#additional_information_waist').val([personal_information.waist]);
	$('#additional_information_hip').val([personal_information.hip]);

	if (personal_information.living_prefectures != null) {
		$('#personal_info_form_current_place').val([personal_information.living_prefectures]);
	}

	// 身長体重腹囲臀囲の画面テンキーパッド
	$("#personal_height_centimeters").keypad({
		  layout: ['789'+$.keypad.BACK, '456'+$.keypad.CLOSE, '123', $.keypad.SPACE+'0'],
		  keypadOnly: false
		}).keypad('option', 'backText', '消').keypad('option', 'closeText', '閉');
	$("#personal_weight").keypad({
		  layout: ['789'+$.keypad.BACK, '456'+$.keypad.CLOSE, '123', $.keypad.SPACE+'0'],
		  keypadOnly: false
		}).keypad('option', 'backText', '消').keypad('option', 'closeText', '閉');
	$('#additional_information_waist').keypad({
		  layout: ['789'+$.keypad.BACK, '456'+$.keypad.CLOSE, '123', $.keypad.SPACE+'0'],
		  keypadOnly: false
		}).keypad('option', 'backText', '消').keypad('option', 'closeText', '閉');
	$('#additional_information_hip').keypad({
		  layout: ['789'+$.keypad.BACK, '456'+$.keypad.CLOSE, '123', $.keypad.SPACE+'0'],
		  keypadOnly: false
		}).keypad('option', 'backText', '消').keypad('option', 'closeText', '閉');

	// 生まれ順の画面テンキーパッド
	$('#birth_order').keypad({
		  layout: ['789'+$.keypad.BACK, '456'+$.keypad.CLOSE, '123', $.keypad.SPACE+'0'],
		  keypadOnly: false
		}).keypad('option', 'backText', '消').keypad('option', 'closeText', '閉');

	// 喫煙状況の情報取得
	if (personal_information.smoker != null) {
		$('input[name="smoker"]').val([personal_information.smoker]);
		if (personal_information.smoker != "5") { // 現在も喫煙している、以外の場合
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('checked',false);
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('disabled',true);
		} else { // 現在も喫煙している、の場合、本数の項目の有効化および情報取得
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').val([personal_information.number_of_cigarettes_per_day]);
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('disabled',false);
		}
	} else {
		$('input[name="smoker"]').prop('checked', false);
		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('checked',false);
		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('disabled',true);
	}

	$('input[name="smoker"]').change(function() {
    	if ($('input[name="smoker"]:checked').val() != 5) {
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('checked',false);
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('disabled',true);
        } else {
        	$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('disabled',false);
        }
    });

	// 運動状況の情報取得
	if (personal_information.training_family != null) {
		$('input[name="training"]').val([personal_information.training_family]);
		if (personal_information.training_family == "1") { // 運動している（はい）の場合
    		$('select[name="training_status1"]').val([personal_information.training_strength]);
    		$('select[name="training_status1"]').prop('disabled',false);
    		$('input[name="training_status2"]').val([personal_information.training_count_for_training_at_week]);
    		$('input[name="training_status2"]').prop('disabled',false);
    		$('input[name="training_status3"]').val([personal_information.training_time_for_training_at_week]);
    		$('input[name="training_status3"]').prop('disabled',false);
		} else { // いいえ・分からない、の場合
        	document.getElementById("training_strength").value = "";
        	document.getElementById("count_for_training_at_week").value = "";
        	document.getElementById("time_for_training_at_week").value = "";
    		$('select[name="training_status1"]').prop('disabled',true);
    		$('input[name="training_status2"]').prop('disabled',true);
    		$('input[name="training_status3"]').prop('disabled',true);
		}
	} else {
		$('input[name="training"]').prop('checked', false);
    	document.getElementById("training_strength").value = "";
    	document.getElementById("count_for_training_at_week").value = "";
    	document.getElementById("time_for_training_at_week").value = "";
		$('select[name="training_status1"]').prop('disabled',true);
		$('input[name="training_status2"]').prop('disabled',true);
		$('input[name="training_status3"]').prop('disabled',true);
	}


	$('input[name="additional_information.frequency_to_walk_in_week"]').val([personal_information.training_frequency_to_walk_in_week]);
	$('input[name="additional_information.frequency_to_exercise_in_week"]').val([personal_information.training_frequency_to_exercise_in_week]);
	$('input[name="additional_information.fast_walker"]').val([personal_information.training_fast_walker]);

	// 食習慣の情報取得
	$('input[name="additional_information.frequency_to_eat_fruits_in_day"]').val([personal_information.dietary_frequency_to_eat_fruits_in_day]);
	$('input[name="additional_information.frequency_to_eat_vegetables_in_day"]').val([personal_information.dietary_frequency_to_eat_vegetables_in_day]);
	$('input[name="additional_information.frequency_to_eat_nuts_in_week"]').val([personal_information.dietary_frequency_to_eat_nuts_in_week]);
	$('input[name="additional_information.frequency_to_eat_whole_grains_in_day"]').val([personal_information.dietary_frequency_to_eat_whole_grains_in_day]);
	$('input[name="additional_information.frequency_to_eat_fishes_in_week"]').val([personal_information.dietary_frequency_to_eat_fishes_in_week]);
	$('input[name="additional_information.frequency_to_eat_dairy_products_in_day"]').val([personal_information.dietary_frequency_to_eat_dairy_products_in_day]);
	$('input[name="additional_information.frequency_to_eat_processed_meat_in_week"]').val([personal_information.dietary_frequency_to_eat_processed_meat_in_week]);
	$('input[name="additional_information.frequency_to_eat_unprocessed_meat_in_week"]').val([personal_information.dietary_frequency_to_eat_unprocessed_meat_in_week]);
	$('input[name="additional_information.frequency_to_drink_suger_drin_in_week"]').val([personal_information.dietary_frequency_to_drink_suger_drin_in_week]);
	$('input[name="additional_information.usual_meal"]').val([personal_information.dietary_usual_meal]);
	$('input[name="additional_information.frequency_to_eat_miso_soup_in_day"]').val([personal_information.dietary_frequency_to_eat_miso_soup_in_day]);
	$('input[name="additional_information.seasoning_of_meals"]').val([personal_information.dietary_seasoning_of_meals]);
	$('input[name="additional_information.frequency_to_eat_breakfast_in_week"]').val([personal_information.dietary_frequency_to_eat_breakfast_in_week]);
	$('input[name="additional_information.eating_speed"]').val([personal_information.dietary_eating_speed]);
	$('input[name="additional_information.frequency_to_drink_in_week"]').val([personal_information.dietary_frequency_to_drink_in_week]);
	$('input[name="additional_information.amount_to_drink"]').val([personal_information.dietary_amount_to_drink]);

	// 血圧、血糖値、コレステロールの情報取得
	$('input[name="additional_information.take_antihypertensive"]').val([personal_information.take_antihypertensive]);
	$('select[name="additional_information.systolic_blood_pressure"]').val([personal_information.systolic_blood_pressure]);
	$('select[name="additional_information.diastolic_blood_pressure"]').val([personal_information.diastolic_blood_pressure]);

	$('input[name="additional_information.take_hypoglycemic"]').val([personal_information.take_hypoglycemic]);
	$('select[name="additional_information.fasting_blood_glucose_lebel"]').val([personal_information.fasting_blood_glucose_lebel]);
	$('select[name="additional_information.occasionally_blood_glucose_lebel"]').val([personal_information.occasionally_blood_glucose_lebel]);
	$('select[name="additional_information.ogtt_blood_glucose_lebel"]').val([personal_information.ogtt_blood_glucose_lebel]);
	$('select[name="additional_information.hba1c"]').val([personal_information.hba1c]);

	$('select[name="additional_information.hdl_cholesterol"]').val([personal_information.hdl_cholesterol]);
	$('select[name="additional_information.ldl_cholesterol"]').val([personal_information.ldl_cholesterol]);

	// 最終診断年月の情報取得
	$('#last_diagnosis_year').val([personal_information.last_diagnosis_year]);
	$('#last_diagnosis_month').val([personal_information.last_diagnosis_month]);

	$('.numeric').on('blur',function() {
		this.value = this.value.replace(/[^0-9]+/i,'');
	});

    $('input[name="smoker"]').change(function() {
    	if ($('input[name="smoker"]:checked').val() != 5) {
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('checked',false);
    		$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('disabled',true);
        } else {
        	$('input[name="additional_information_number_of_cigarettes_per_day"]').prop('disabled',false);
        }
    });

    $('input[name="training"]').change(function() {
    	if ($('input[name="training"]:checked').val() == 1) {
    		$('select[name="training_status1"]').prop('disabled',false);
    		$('input[name="training_status2"]').prop('disabled',false);
    		$('input[name="training_status3"]').prop('disabled',false);
        } else {
        	document.getElementById("training_strength").value = "";
        	document.getElementById("count_for_training_at_week").value = "";
        	document.getElementById("time_for_training_at_week").value = "";
    		$('select[name="training_status1"]').prop('disabled',true);
    		$('input[name="training_status2"]').prop('disabled',true);
    		$('input[name="training_status3"]').prop('disabled',true);
        }
    });

	$("#additional_information_fasting_blood_glucose_lebel").on("change",function() {
		if ($(this).val() == "over126") {
			$("#alert_fasting_warning").show();
		} else {
			$("#alert_fasting_warning").hide();
		}
	});

	$("#additional_information_occasionally_blood_glucose_lebel").on("change",function() {
		if ($(this).val() == "over200") {
			$("#alert_occasionally_warning").show();
		} else {
			$("#alert_occasionally_warning").hide();
		}
	});

	$("#additional_information_ogtt_blood_glucose_lebel").on("change",function() {
		if ($(this).val() == "over200") {
			$("#alert_ogtt_warning").show();
		} else {
			$("#alert_ogtt_warning").hide();
		}
	});

	$("#additional_information_hba1c").on("change",function() {
		if ($(this).val() == "over65") {
			$("#alert_hba1c_warning").show();
		} else {
			$("#alert_hba1c_warning").hide();
		}
	});

	// 運動回数チェック
	$("#count_for_training_at_week").on("change", function() {
		if ($(this).val() > 30 || $(this).val() < 1) {
			$("#alert_count_for_training_at_week").show();
		} else {
			$("#alert_count_for_training_at_week").hide();
		}
	});

	// 運動時間チェック
	$("#time_for_training_at_week").on("change", function() {
		if ($(this).val() > 10000 || $(this).val() < 10) {
			$("#alert_time_for_training_at_week").show();
		} else {
			$("#alert_time_for_training_at_week").hide();
		}
	});

	// 名前未入力チェック（フォーム背景が赤の場合）
	$("#personal_info_form_name").on("change", function() {
		if ($("input[name='person.name']").hasClass("form_error") && $(this).val() != "") {
			$("input[name='person.name']").removeClass("form_error");
		}
	});

	// 身長上限チェック
	$("#personal_height_centimeters").on("change", function() {
		if ($(this).val() > 300) {
			$("#alert_personal_height_centimeters").show();
		} else {
			$("#alert_personal_height_centimeters").hide();
		}
	});

	// 体重上限チェック
	$("#personal_weight").on("change", function() {
		if ($(this).val() > 300) {
			$("#alert_personal_weight").show();
		} else {
			$("#alert_personal_weight").hide();
		}
	});

	// 腹囲上限チェック
	$("#additional_information_waist").on("change", function() {
		if ($(this).val() > 300) {
			$("#alert_personal_waist").show();
		} else {
			$("#alert_personal_waist").hide();
		}
	});

	// 臀囲上限チェック
	$("#additional_information_hip").on("change", function() {
		if ($(this).val() > 300) {
			$("#alert_personal_hip").show();
		} else {
			$("#alert_personal_hip").hide();
		}
	});

	// 健康診断選択肢チェック
	$("#last_diagnosis_year").on("change", function() {
		if ($(this).val() == "-1") {
			$("#last_diagnosis_month").val("-1");
			$("#last_diagnosis_month").prop('disabled',true);
		} else {
			$("#last_diagnosis_month").prop('disabled',false);
		}
	});

	// 生年月選択時の年齢-診断時年齢の整合性チェック
	// 年
	$("#personal_info_form_year_of_birth").on('change', function() {
		check_history_age_validity("personal");
	});

	// 月
	$("#personal_info_form_month_of_birth").on('change', function() {
		check_history_age_validity("personal");
	});

	// 診断年齢選択時の年齢-診断時年齢の整合性チェック
	$("#age_at_diagnosis_select").on('change', function() {
		var personal_age = calc_personal_age();

		var diag_age = $("#age_at_diagnosis_select").val();

		if ( check_age_diagage_validity(personal_age, diag_age) ) {
			$("#alert_age_at_diagnosis").show();
		} else {
			$("#alert_age_at_diagnosis").hide();
		}

		// 選択肢チェック後、アラートが無い場合は既存の病歴も整合性チェック
		if ( $('#alert_age_at_diagnosis').css('display') == 'none' ) {
			check_history_age_validity("personal");
		}

	});

	$('.md_tr[row_number]').each(function () {
		$(this).remove();
	});

	data_entry_row = $("#personal_health_information").find("#health_data_entry_row");

	if (personal_information['Health History'] != null) {
		current_health_history = personal_information['Health History'];
		for (var i=0; i<current_health_history.length;i++) {
			new_row = create_disease_row(
					i,
					current_health_history[i]['Disease Name'],
					current_health_history[i]['Detailed Disease Name'],
					current_health_history[i]['Age At Diagnosis'],
					current_health_history[i]['Disease Code']);
			data_entry_row.before(new_row);
		}
		toggleHealthyOption( $(data_entry_row).parent() );
	}

	/*
	$("age_at_diagnosis_select").on('click',function() {
		$('select#age_at_diagnosis_select option').remove();

		age_at_diagnosis_select.append("<option value='not_picked'>" + $.t("fhh_js.age_at_diagnosis_select") + "</option>");
		age_at_diagnosis_select.append("<option value='prebirth'>" + $.t("fhh_js.prebirth") + "</option>");
		age_at_diagnosis_select.append("<option value='newborn'>" + $.t("fhh_js.newborn") + "</option>");
		age_at_diagnosis_select.append("<option value='infant'>" + $.t("fhh_js.infant") + "</option>");
		age_at_diagnosis_select.append("<option value='child'>" + $.t("fhh_js.child") + "</option>");
		age_at_diagnosis_select.append("<option value='early_teens'>" + $.t("fhh_js.early_teens") + "</option>");
		age_at_diagnosis_select.append("<option value='late_teens'>" + $.t("fhh_js.late_teens") + "</option>");
		age_at_diagnosis_select.append("<option value='early_twenties'>" + $.t("fhh_js.early_twenties") + "</option>");
		age_at_diagnosis_select.append("<option value='late_twenties'>" + $.t("fhh_js.late_twenties") + "</option>");
		age_at_diagnosis_select.append("<option value='early_thirties'>" + $.t("fhh_js.early_thirties") + "</option>");
		age_at_diagnosis_select.append("<option value='late_thirties'>" + $.t("fhh_js.late_thirties") + "</option>");
		age_at_diagnosis_select.append("<option value='early_fourties'>" + $.t("fhh_js.early_fourties") + "</option>");
		age_at_diagnosis_select.append("<option value='late_fourties'>" + $.t("fhh_js.late_fourties") + "</option>");
		age_at_diagnosis_select.append("<option value='early_fifties'>" + $.t("fhh_js.early_fifties") + "</option>");
		age_at_diagnosis_select.append("<option value='late_fifties'>" + $.t("fhh_js.late_fifties") + "</option>");
		age_at_diagnosis_select.append("<option value='early_sixties'>" + $.t("fhh_js.early_sixties") + "</option>");
		age_at_diagnosis_select.append("<option value='late_sixties'>" + $.t("fhh_js.late_sixties") + "</option>");
		age_at_diagnosis_select.append("<option value='senior'>" + $.t("fhh_js.senior") + "</option>");
		age_at_diagnosis_select.append("<option value='Unknown'>" + $.t("fhh_js.unknown") + "</option>");

	});
	*/

	$("#personal_health_information").find("#disease_choice_select").val($("#disease_choice_select").find('option').first().val());
	$("#personal_health_information").find("#detailed_disease_choice_select").val($("#detailed_disease_choice_select").find('option').first().val());
	$("#personal_health_information").find("#age_at_diagnosis_select").val($("#age_at_diagnosis_select").find('option').first().val());

	$("#personal_race_ethnicity").find('input[name="person.consanguinity"]').prop("checked", personal_information.consanguinity);


	if (personal_information.race && personal_information.race['Asian'] == true) {
		$("#personal_race_ethnicity").find("#asian_checkboxes").show();
	} else {
		$("#personal_race_ethnicity").find("#asian_checkboxes").hide();
	}

	if (personal_information.race && personal_information.race['Native Hawaiian or Other Pacific Islander'] == true) {
		$("#personal_race_ethnicity").find("#south_pacific_checkboxes").show();
	} else {
		$("#personal_race_ethnicity").find("#south_pacific_checkboxes").hide();
	}

	if (personal_information.race != null) {
		$("#personal_race_ethnicity").find("#selectedRaces-1").prop('checked',personal_information.race['American Indian or Alaska Native']);
		$("#personal_race_ethnicity").find("#selectedRaces-2").prop('checked',personal_information.race['Asian']);
		$("#personal_race_ethnicity").find("#selectedRaces-3").prop('checked',personal_information.race['Black or African-American']);
		$("#personal_race_ethnicity").find("#selectedRaces-4").prop('checked',personal_information.race['Native Hawaiian or Other Pacific Islander']);
		$("#personal_race_ethnicity").find("#selectedRaces-5").prop('checked',personal_information.race['White']);

		$("#personal_race_ethnicity").find("#selectedRaces-11").prop('checked',personal_information.race['Asian Indian']);
		$("#personal_race_ethnicity").find("#selectedRaces-12").prop('checked',personal_information.race['Chinese']);
		$("#personal_race_ethnicity").find("#selectedRaces-13").prop('checked',personal_information.race['Filipino']);
		$("#personal_race_ethnicity").find("#selectedRaces-14").prop('checked',personal_information.race['Japanese']);
		$("#personal_race_ethnicity").find("#selectedRaces-15").prop('checked',personal_information.race['Korean']);
		$("#personal_race_ethnicity").find("#selectedRaces-16").prop('checked',personal_information.race['Vietnamese']);
		$("#personal_race_ethnicity").find("#selectedRaces-17").prop('checked',personal_information.race['Other Asian']);
		$("#personal_race_ethnicity").find("#selectedRaces-18").prop('checked',personal_information.race['Unknown Asian']);

		$("#personal_race_ethnicity").find("#selectedRaces-21").prop('checked',personal_information.race['Chamorro']);
		$("#personal_race_ethnicity").find("#selectedRaces-22").prop('checked',personal_information.race['Guamanian']);
		$("#personal_race_ethnicity").find("#selectedRaces-23").prop('checked',personal_information.race['Native Hawaiian']);
		$("#personal_race_ethnicity").find("#selectedRaces-24").prop('checked',personal_information.race['Samoan']);
		$("#personal_race_ethnicity").find("#selectedRaces-25").prop('checked',personal_information.race['Unknown South Pacific Islander']);

	} else {
		$("#personal_race_ethnicity").find("#selectedRaces-1").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-2").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-3").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-4").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-5").prop('checked',false);

		$("#personal_race_ethnicity").find("#selectedRaces-11").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-12").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-13").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-14").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-15").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-16").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-17").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-18").prop('checked',false);

		$("#personal_race_ethnicity").find("#selectedRaces-21").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-22").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-23").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-24").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedRaces-25").prop('checked',false);

	}

	if (personal_information.ethnicity && personal_information.ethnicity['Hispanic or Latino'] == true) {
		$("#personal_race_ethnicity").find("#hispanic_checkboxes").show();
	} else {
		$("#personal_race_ethnicity").find("#hispanic_checkboxes").hide();
	}


	if (personal_information.ethnicity != null) {
		$("#personal_race_ethnicity").find("#selectedEthnicities-1").prop('checked',personal_information.ethnicity['Hispanic or Latino']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-2").prop('checked',personal_information.ethnicity['Ashkenazi Jewish']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-3").prop('checked',personal_information.ethnicity['Not Hispanic or Latino']);

		$("#personal_race_ethnicity").find("#selectedEthnicities-11").prop('checked',personal_information.ethnicity['Central American']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-12").prop('checked',personal_information.ethnicity['Cuban']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-13").prop('checked',personal_information.ethnicity['Dominican']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-14").prop('checked',personal_information.ethnicity['Mexican']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-15").prop('checked',personal_information.ethnicity['Other Hispanic']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-16").prop('checked',personal_information.ethnicity['Puerto Rican']);
		$("#personal_race_ethnicity").find("#selectedEthnicities-17").prop('checked',personal_information.ethnicity['South American']);

	}	else {
		$("#personal_race_ethnicity").find("#selectedEthnicities-1").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-2").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-3").prop('checked',false);

		$("#personal_race_ethnicity").find("#selectedEthnicities-11").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-12").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-13").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-14").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-15").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-16").prop('checked',false);
		$("#personal_race_ethnicity").find("#selectedEthnicities-17").prop('checked',false);

	}

	// Asian / Japanese default.
	$("#selectedRaces-2").prop("checked", "true");
	// Open Asian checkbox
	$("#add_personal_information_dialog").find("#asian_checkboxes").show();
	// Japanese checked
	$("#selectedRaces-14").prop("checked", "true");
	// フラグを立て、2回目以降の表示ではデフォルト設定をしないようにする
	personal_information['flg_race_ethnic'] = 1;


	secondVari = angular.copy(personal_information);


	update_bmi();
	update_whr();
}
// Helper functions
/*
function make_disease_array () {
	var keys = Object.keys(diseases);
	for (var i=0; i<keys.length;i++) {
		disease_list.push(keys[i]);
		for (var j=0; j<diseases[keys[i]].length; j++) {
			disease_list.push(diseases[keys[i]][j]);
		}
	}
}
*/

// 整合性チェックループ
function check_history_age_validity(type) {
	if (type == "personal") {
		var personal_age = calc_personal_age();
	} else {
		var personal_age = calc_family_age();
	}
	for (var i=0; i<current_health_history.length; i++) {
		if ( check_age_diagage_validity(personal_age, current_health_history[i]["Age At Diagnosis"]) ) {
			if (type == "personal") {
				$("#personal_health_information").find("#alert_age_at_diagnosis").show();
			} else {
				$("#family_health_information").find("#alert_age_at_diagnosis").show();
			}
			break
		}
		if (type == "personal") {
			$("#personal_health_information").find("#alert_age_at_diagnosis").hide();
		} else {
			$("#family_health_information").find("#alert_age_at_diagnosis").hide();
		}
	}
}

// 年齢-診断時年齢整合性チェック
function check_age_diagage_validity(personal_age, diag_age) {
	if (
			( diag_age == "child" && personal_age < 1 )
			|| ( diag_age == "early_teens" && personal_age < 10 )
			|| ( diag_age == "late_teens" && personal_age < 15 )
			|| ( diag_age == "early_twenties" && personal_age < 20 )
			|| ( diag_age == "late_twenties" && personal_age < 25 )
			|| ( diag_age == "early_thirties" && personal_age < 30 )
			|| ( diag_age == "late_thirties" && personal_age < 35 )
			|| ( diag_age == "early_fourties" && personal_age < 40 )
			|| ( diag_age == "late_fourties" && personal_age < 45 )
			|| ( diag_age == "early_fifties" && personal_age < 50 )
			|| ( diag_age == "late_fifties" && personal_age < 55 )
			|| ( diag_age == "early_sixties" && personal_age < 60 )
			|| ( diag_age == "late_sixties" && personal_age < 65 )
			|| ( diag_age == "senior" && personal_age < 70 )
		) {
		return true;
	} else {
		return false;
	}
}

// 年齢計算（本人）
function calc_personal_age() {
	var birthyear = $("#personal_info_form_year_of_birth").val().toString().padStart(4, '0');
	if ( $("#personal_info_form_month_of_birth").val() == null ) {
		var birthmonth = "01";
	} else {
		var birthmonth = $("#personal_info_form_month_of_birth").val().toString().padStart(2, '0');
	}
	var today = new Date();
	var thisyear = today.getFullYear().toString().padStart(4, '0');
	var thismonth = (today.getMonth() + 1).toString().padStart(2, '0');
	var personal_age = Math.floor((Number(thisyear + thismonth + "01") - Number(birthyear + birthmonth + "01")) / 10000);

	return personal_age;
}

// 年齢計算（家族）
function calc_family_age() {

	var family_age;

	if ( $("#is_person_alive").val() == "alive" ) { // 存命の場合

		switch ( $("#age_determination").val() ) {
			case "date_of_birth":
				var birthyear = $("#family_info_form_year_of_birth").val().toString().padStart(4, '0');
				if ( $("#family_info_form_month_of_birth").val() == null ) {
					var birthmonth = "01";
				} else {
					var birthmonth = $("#family_info_form_month_of_birth").val().toString().padStart(2, '0');
				}
				var today = new Date();
				var thisyear = today.getFullYear().toString().padStart(4, '0');
				var thismonth = (today.getMonth() + 1).toString().padStart(2, '0');
				family_age = Math.floor((Number(thisyear + thismonth + "01") - Number(birthyear + birthmonth + "01")) / 10000);
				break;

			case "age":
				family_age = Number($("#age_determination_text").val());
				if (family_age > 120) {
					family_age = 120;
				}
				break;

			case "estimated_age":
				switch ($('#estimated_age_select').val()) {
				case "prebirth":
				case "newborn":
				case "infant":
					family_age = 0;
					break;
				case "child":
					family_age = 9;
					break;
				case "early_teens":
					family_age = 14;
					break;
				case "late_teens":
					family_age = 19;
					break;
				case "early_twenties":
					family_age = 24;
					break;
				case "late_twenties":
					family_age = 29;
					break;
				case "early_thirties":
					family_age = 34;
					break;
				case "late_thirties":
					family_age = 39;
					break;
				case "early_fourties":
					family_age = 44;
					break;
				case "late_fourties":
					family_age = 49;
					break;
				case "early_fifties":
					family_age = 54;
					break;
				case "late_fifties":
					family_age = 59;
					break;
				case "early_sixties":
					family_age = 64;
					break;
				case "late_sixties":
					family_age = 69;
					break;
				default:
					family_age = 999;
					break;
				}
				break

			default: // 不明も含む
				family_age = 999;
				break;
		}

		return family_age;

	} else if ( $("#is_person_alive").val() == "dead" ) { // 死亡の場合

		switch ($('#estimated_death_age_select').val()) {
		case "prebirth":
		case "newborn":
		case "infant":
			family_age = 0;
			break;
		case "child":
			family_age = 9;
			break;
		case "early_teens":
			family_age = 14;
			break;
		case "late_teens":
			family_age = 19;
			break;
		case "early_twenties":
			family_age = 24;
			break;
		case "late_twenties":
			family_age = 29;
			break;
		case "early_thirties":
			family_age = 34;
			break;
		case "late_thirties":
			family_age = 39;
			break;
		case "early_fourties":
			family_age = 44;
			break;
		case "late_fourties":
			family_age = 49;
			break;
		case "early_fifties":
			family_age = 54;
			break;
		case "late_fifties":
			family_age = 59;
			break;
		case "early_sixties":
			family_age = 64;
			break;
		case "late_sixties":
			family_age = 69;
			break;
		default:
			family_age = 999;
			break;
		}

		return family_age

	}

	// 不明の場合、警告を出せないように999歳とする
	return 999;
}

// CSV出力
function make_csv() {

	// 改行コード
	const newline = '\r\n';

	// 関係マッピング定義
	// キーの後に数字がつかないもの（-> 1人しかいない）
	const relationcodemap1 = {
			father               : "NFTH",
			mother               : "NMTH",
			maternal_grandmother : "MGRMTH",
			maternal_grandfather : "MGRFTH",
			paternal_grandmother : "PGRMTH",
			paternal_grandfather : "PGRFTH"
	}

	// キーの後に数字がつくもの（-> 0人または1人以上）
	const relationcodemap2 = {
			son                  : "SON",
			daughter             : "DAU",
			nephew               : "NEPHEW",
			niece                : "NIECE",
			sister               : "NSIS",
			brother              : "NBRO",
			grandson             : "GRNSON",
			granddaughter        : "GRNDAU",
			maternal_aunt        : "MAUNT",
			maternal_cousin      : "MCOUSN",
			maternal_halfbrother : "MHBRO",
			maternal_halfsister  : "MHSIS",
			maternal_uncle       : "MUNCLE",
			paternal_aunt        : "PAUNT",
			paternal_cousin      : "PCOUSN",
			paternal_halfbrother : "PHBRO",
			paternal_halfsister  : "PHSIS",
			paternal_uncle       : "PUNCLE"
	}

	// 1行目ヘッダ行
	const csvheader = "id,relation,parentId,name,gender,date_of_birth,age,adopted,deseasedIndCode," +
			"order,desease," +
			"disease_name1,disease_name2,disease_name3,disease_name4,disease_name5,disease_name6,disease_name7,disease_name8," +
			"disease_name9,disease_name10,disease_name11,disease_name12,disease_name13,disease_name14,disease_name15,disease_name16" + newline;

	// 2行目本人情報
	var personal_csv_data = make_personal_csv_data() + newline;

	// 3行目以降家族情報
	var family_csv_data = '';

	// キーの後に数字がつかない人の情報
	for (var key in relationcodemap1) {
		family_csv_data += make_family_csv_data(key, relationcodemap1[key]) + newline;
	}

	// キーの後に数字がつく人の情報
	var targetFamilies = [];
	Object.keys( personal_information ).forEach(function( r ) {
		Object.keys( relationcodemap2 ).forEach( function( tr ) {
			if( r.startsWith( tr ) ){
				var target = {};
				target.numKey = r;
				target.key = tr;
				targetFamilies.push( target );
			}
		});
	});

	targetFamilies.forEach(function( target ){
		family_csv_data += make_family_csv_data(target.numKey, relationcodemap2[target.key]) + newline;
	});
//	var numkey = '';
//	for (var key in relationcodemap2) {
//		for (var i=0; i<99; i++) {
//			numkey = key + "_" + i
//			if (typeof personal_information[numkey] == "undefined") {
//				break
//			} else {
//				family_csv_data += make_family_csv_data(numkey, relationcodemap2[key]) + newline;
//			}
//		}
//	}

	// 内容結合
	var content = csvheader + personal_csv_data + family_csv_data;

	// ダウンロード処理
	go_download(content);

}

function make_personal_csv_data() {
	var personal_csv_data = ''
	personal_csv_data += '\"'+ personal_information.id +'\",';
	personal_csv_data += '\"PAT\",';
	personal_csv_data += '\"\",';
	personal_csv_data += '\"'+ escape_name(personal_information.name) +'\",';

	var personal_csv_gender = get_member_gender(personal_information);
	var personal_csv_birthyear = get_member_birth(personal_information);
	var personal_csv_age = get_member_age(personal_information);

	personal_csv_data += '\"'+ personal_csv_gender +'\",';
	personal_csv_data += '\"'+ personal_csv_birthyear +'\",';
	personal_csv_data += '\"'+ personal_csv_age +'\",';
	personal_csv_data += '\"false\",';
	personal_csv_data += '\"alive\",';

	// 出生順
	personal_csv_data += '\"';
	personal_csv_data +=
		( typeof personal_information.birth_order == "undefined" ) ? 1 : personal_information.birth_order;
	personal_csv_data += '\",';

	// 備考
	personal_csv_data += '\"';
	personal_csv_data += getTwinStatus( personal_information );
	personal_csv_data += getHelthHistory( personal_information );
	personal_csv_data += '\",';

	for (var j=0; j<16; j++) {
		personal_csv_data += '\"\"';

//		if (typeof personal_information["Health History"][Number(j)] == "undefined") {
//			personal_csv_data += '\"\"';
//		} else {
//			personal_csv_data += '\"'+ personal_information["Health History"][Number(j)]["Detailed Disease Name"] +'\"';
//		}
		if (j != 15) {
			personal_csv_data += ',';
		}
	}

	return personal_csv_data;
}

function make_family_csv_data(relationship, relationcode) {

	var family_member = personal_information[relationship];
	var family_csv_data = '';
	var relationship_code = relationcode;

	if (relationcode == "NEPHEW" || relationcode == "NIECE" || relationcode == "PCOUSN" || relationcode == "MCOUSN" || relationcode == "GRNSON" || relationcode == "GRNDAU") {
		var parent_id = family_member.parent_id;
	} else {
		var parent_id = '';
	}

	family_csv_data += '\"'+ family_member.id +'\",';
	family_csv_data += '\"'+ relationship_code +'\",';
	family_csv_data += '\"'+ parent_id +'\",';

	// 父母、祖父母は初期状態では表示名だけ存在しjsonにはデータが入っていないということがあったので存在確認
	if (typeof family_member.name == "undefined" || family_member.name == null || family_member.name == "") {
		var family_csv_name = "";
	} else {
		var family_csv_name = escape_name(family_member.name);
	}

	family_csv_data += '\"'+ family_csv_name +'\",';

	var family_csv_gender = get_member_gender(family_member);
	var family_csv_birthyear = get_member_birth(family_member);
	var family_csv_age = get_member_age(family_member);

	// 不明の場合、亡くなっている場合は空に上書き
	if( ( typeof family_member.is_alive == 'undefined' ) || family_member.is_alive != 'alive' ){
		family_csv_birthyear =  "";
		family_csv_age =  "";
	}

	if (typeof family_member.adopted == "undefined" || family_member.adopted == null || family_member.adopted == "") {
		var family_csv_adopted = "false";
	} else {
		var family_csv_adopted = family_member.adopted;
	}

	if (typeof family_member.is_alive == "undefined" || family_member.is_alive == null || family_member.is_alive == "") {
		var family_csv_is_alive = "UNKNOWN";
	} else if (family_member.is_alive == "alive"){
		var family_csv_is_alive = family_member.is_alive;
	} else if (family_member.is_alive == "dead"){
		var family_csv_is_alive = "true";
	} else {
		var family_csv_is_alive = "UNKNOWN";
	}

	family_csv_data += '\"'+ family_csv_gender +'\",';
	family_csv_data += '\"'+ family_csv_birthyear +'\",';
	family_csv_data += '\"'+ family_csv_age +'\",';
	family_csv_data += '\"'+ family_csv_adopted +'\",';
	family_csv_data += '\"'+ family_csv_is_alive +'\",';

	// 出生順
	family_csv_data += '\"';
	family_csv_data +=
		( typeof family_member.birth_order == "undefined" ) ? 1 : family_member.birth_order;
	family_csv_data += '\",';

	// 備考
	family_csv_data += '\"';
	family_csv_data += getTwinStatus( family_member );
	family_csv_data += getDesease( family_member );
	family_csv_data += getHelthHistory( family_member );
	family_csv_data += getCod( family_member );

	family_csv_data += '\",';


	for (i=0; i<16; i++) {
		family_csv_data += '\"\"';
//		if (typeof family_member["Health History"][Number(i)] == "undefined") {
//			family_csv_data += '\"\"';
//		} else {
//			family_csv_data += '\"'+ family_member["Health History"][Number(i)]["Detailed Disease Name"] +'\"';
//		}
		if (i != 15) {
			family_csv_data += ',';
		}
	}

	return family_csv_data;
}

function getTwinStatus( pi ){

	// Undefined
	if( typeof pi.twin_status == 'undefined' ) return "";

	if( pi.twin_status == 'IDENTICAL' ) return "双子（一卵性）\r\n";

	if( pi.twin_status == 'FRATERNAL' ) return "双子（二卵性）\r\n";

	return "";
}


//【死因】＜疾患名＞ （死亡年齢：＜年齢＞）
function getCod(pi){

	if( typeof pi.is_alive == "undefined"  ) return "";

	if( pi.is_alive != 'dead' ) return "";


	var val = "";

	// 死因 detailed_cause_of_death
	var detailedCaunseOfDeath = getDetailedCaunseOfDeath(pi.detailed_cause_of_death);

	// 死亡年齢 estimated_death_age
	var estimatedDeathAge = "";

	if( typeof pi.estimated_death_age != "undefined" ){
		estimatedDeathAge = getEstimatedAgeLabel( pi.estimated_death_age );

		if( estimatedDeathAge.length > 0 ) estimatedDeathAge =  "（死亡年齢：" + estimatedDeathAge + "）\r\n";
	}

	return "【死因】\r\n - " + detailedCaunseOfDeath + estimatedDeathAge;
}


//【病歴】
// - がん （発症年齢：○○）
function getHelthHistory( pi ){

	// 病歴がなければ空を返す
	if(typeof pi['Health History'] == 'undefined' ) return "";

	var histories = pi['Health History'];

	// 病歴がある場合
	if( histories.length <= 0 ) return "";


	var val = "";
	val += "【病歴】\r\n";

	histories.forEach( function( h ){
		var name = h["Detailed Disease Name"];
		var age = $.t("fhh_js." + h["Age At Diagnosis"] );
		val += "- " + name + "（発症年齢：" + age + "）\r\n";
	});
	return val;
}

function getDesease( pi ){

	// 未定義
	if( typeof pi.is_alive == "undefined" ) return "【生死不明】\r\n";

	// 不明 生死不明
	if( pi.is_alive == "unknown" ) return "【生死不明】\r\n";

	if( pi.is_alive == "alive" ){
		// 存命
		console.log( "存命" );

		var estimatedAgeLabel = getEstimatedAgeLabel( pi.estimated_age );

		if( estimatedAgeLabel.length > 0 ) return "【推定年齢】" + estimatedAgeLabel + "\r\n";
	}
	return "";
}

function getDetailedCaunseOfDeath( detailed_cause_of_death ){

	if( typeof detailed_cause_of_death == "undefined" ) return "";

	if( detailed_cause_of_death.length <= 0 ) return "";

	return detailed_cause_of_death;
}

function getEstimatedAgeLabel( value ) {

	var result = dicEstimatedAge.filter( x => x.value == value );

	if( typeof result == "undefined" ) return "";
	if( result.length < 1 ) return "";

	return result.shift().label;
}

const dicEstimatedAge = [
	{ "value" : "not_picked", "label" : "選択されていません" },
	{ "value" : "prebirth", "label" : "出生前" },
	{ "value" : "newborn", "label" : "新生児期" },
	{ "value" : "infant", "label" : "乳児期" },
	{ "value" : "child", "label" : "小児期" },
	{ "value" : "early_teens", "label" : "10～14歳" },
	{ "value" : "late_teens", "label" : "15～19歳" },
	{ "value" : "early_twenties", "label" : "20～24歳" },
	{ "value" : "late_twenties", "label" : "25～29歳" },
	{ "value" : "early_thirties", "label" : "30～34歳" },
	{ "value" : "late_thirties", "label" : "35～39歳" },
	{ "value" : "early_fourties", "label" : "40～44歳" },
	{ "value" : "late_fourties", "label" : "45～49歳" },
	{ "value" : "early_fifties", "label" : "50～54歳" },
	{ "value" : "late_fifties", "label" : "55～59歳" },
	{ "value" : "early_sixties", "label" : "60～64歳" },
	{ "value" : "late_sixties", "label" : "65～69歳" },
	{ "value" : "senior", "label" : "70歳以上" },
	{ "value" : "Unknown", "label" : "不明" }
];

function get_member_gender(member_information) {
	if (typeof member_information.gender == "undefined" || member_information.gender == null || member_information.gender == "") {
		var get_gender = "unknown";
	} else {
		var get_gender = member_information.gender.toLowerCase();
	}

	return get_gender;
}

function get_member_birth(member_information) {
	if (typeof member_information.date_of_birth == "undefined" || member_information.date_of_birth == null || member_information.date_of_birth == "") {
		var get_birth = "";
	} else {
		var y = member_information.date_of_birth.substr(0, 4);
		var md = member_information.date_of_birth.substr(5, 10);
		var get_birth = md + "/" + y;
	}

	return get_birth;
}

function get_member_age(member_information) {
	if (typeof member_information.age == "undefined" || member_information.age == null || member_information.age == "") {
		var get_age = "";
		if (typeof member_information.estimated_age != "undefined") {
			get_age = calc_est_age(member_information.estimated_age);
		}
		if (typeof member_information.date_of_birth != "undefined") {
			var today = new Date();
			var thisyear = today.getFullYear().toString().padStart(4, '0');
			var thismonth = (today.getMonth() + 1).toString().padStart(2, '0');

			var birthyear = member_information.date_of_birth.substr(0, 4);
			var birthmonth = member_information.date_of_birth.substr(5, 2);

			// 1回目登録者用バグ回避
			if (birthmonth.includes("/")) {
				birthmonth = "0" + member_information.date_of_birth.substr(5, 1);
			}

			get_age = Math.floor((Number(thisyear + thismonth + "01") - Number(birthyear + birthmonth + "01")) / 10000);
		}
	} else {
		var get_age = member_information.age;
	}

	return get_age;
}

function calc_est_age(est) {
	var ret_age;
	switch (est) {
	case "prebirth":
	case "newborn":
	case "infant":
		ret_age = 0;
		break;
	case "child":
		ret_age = 9;
		break;
	case "early_teens":
		ret_age = 14;
		break;
	case "late_teens":
		ret_age = 19;
		break;
	case "early_twenties":
		ret_age = 24;
		break;
	case "late_twenties":
		ret_age = 29;
		break;
	case "early_thirties":
		ret_age = 34;
		break;
	case "late_thirties":
		ret_age = 39;
		break;
	case "early_fourties":
		ret_age = 44;
		break;
	case "late_fourties":
		ret_age = 49;
		break;
	case "early_fifties":
		ret_age = 54;
		break;
	case "late_fifties":
		ret_age = 59;
		break;
	case "early_sixties":
		ret_age = 64;
		break;
	case "late_sixties":
		ret_age = 69;
		break;
	default:
		ret_age = "";
		break;
	}

	return ret_age
}

function go_download(content) {
	const filename = "output.csv";
	const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
	var blob = new Blob([ bom, content ], { "type" : "text/csv" });

	const aTag = document.createElement('a');
	aTag.download = filename;

	if (window.navigator.msSaveBlob) {
	  // for IE
	  window.navigator.msSaveBlob(blob, aTag.download);
	} else if (window.URL && window.URL.createObjectURL) {
	  // for Firefox / chrome
	  aTag.href = window.URL.createObjectURL(blob);

	  document.body.appendChild(aTag);

	  aTag.click();

	  document.body.removeChild(aTag);
	} else if (window.webkitURL && window.webkitURL.createObject) {
	  // for Chrome?
	  aTag.href = (window.URL || window.webkitURL).createObjectURL(blob);

	  aTag.click();
	} else {
	  // for Safari
	  window.open(
	    `data:type/csv;base64,${window.Base64.encode(this.state.content)}`,
	    '_blank'
	  );
	}
}

// Will get the querystring parameters for a url
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});
}

// Polyfill to support IE9 and Object.keys
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}


// Helper to ensure that only numerics are used in fields

function bind_number_only_fields() {
	 $(".numeric").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        if ($("#digit_warning").length == 0) {
	        var error_message = $("<span id='digit_warning'> " + $.t("fhh_js.digits_only") + " </span>").css("color","red");
	        $(this).parent().append(error_message);
       		 error_message.show().fadeOut("slow");
       		 window.setTimeout(function() { $("#digit_warning").remove(); }, 1000);
	      }
//        $("#errmsg").html("Digits Only").show().fadeOut("slow");
               return false;
    }
   });


}



function any_relatives (pi, relative_name) {
	var relatives_exist = false;
	for (var i=0;i<30;i++) {
		if (pi[relative_name + "_" + i] != null) relatives_exist = relatives_exist || true;
	}
	return relatives_exist;
}

function get_relationship_from_relationship_id (id) {
	if (id == 'father' || id == 'mother'
		|| id == 'maternal_grandfather' || id == 'maternal_grandmother'
		|| id == 'paternal_grandfather' || id == 'paternal_grandmother') return id;

	if (id.substring(0,7) == 'brother') return 'brother';
	if (id.substring(0,6) == 'sister') return 'sister';
	if (id.substring(0,20) == 'paternal_halfbrother') return 'paternal_halfbrother';
	if (id.substring(0,19) == 'paternal_halfsister') return 'paternal_halfsister';
	if (id.substring(0,20) == 'maternal_halfbrother') return 'maternal_halfbrother';
	if (id.substring(0,19) == 'maternal_halfsister') return 'maternal_halfsister';
	if (id.substring(0,14) == 'paternal_uncle') return 'paternal_uncle';
	if (id.substring(0,13) == 'paternal_aunt') return 'paternal_aunt';
	if (id.substring(0,14) == 'maternal_uncle') return 'maternal_uncle';
	if (id.substring(0,13) == 'maternal_aunt') return 'maternal_aunt';
	if (id.substring(0,15) == 'maternal_cousin') return 'maternal_cousin';
	if (id.substring(0,15) == 'paternal_cousin') return 'paternal_cousin';

	if (id.substring(0,3) == 'son') return 'son';
	if (id.substring(0,8) == 'daughter') return 'daughter';
	if (id.substring(0,8) == 'grandson') return 'grandson';
	if (id.substring(0,13) == 'granddaughter') return 'granddaughter';

	if (id.substring(0,5) == 'niece') return 'niece';
	if (id.substring(0,6) == 'nephew') return 'nephew';

	return 'unknown'
}


// Check to see whether this browser has the FileAPI
function is_IE_8_or_9 () {
	var val = which_IE();
	if (val == false) return false;  // Non IE Browsers
	if (val < 10) return true;
	return false;
}

function which_IE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

// To prevent losing info when leaving page
function closeEditorWarning() {
    if (personal_information) return "Leaving";
};

function updateHistoryDialog(relationship, family_member) {
	if (relationship=='self') {
		if ($("#add_personal_information_dialog").dialog( "isOpen" ) == false &&
				$("#update_family_member_health_history_dialog").dialog( "isOpen" ) == false) {
			current_relationship = 'self';
			clear_and_set_personal_health_history_dialog();
			$( "#add_personal_information_dialog" ).dialog( "open" );

			// 初回表示の人種デフォルト設定
			if (personal_information['flg_race_ethnic'] != 1) {
				// Asian / Japanese default.
				$("#add_personal_information_dialog").find("#selectedRaces-2").prop("checked", "true");
				// Open Asian checkbox
				$("#add_personal_information_dialog").find("#asian_checkboxes").show();
				// Japanese checked
				$("#add_personal_information_dialog").find("#selectedRaces-14").prop("checked", "true");
				// フラグを立て、2回目以降の表示ではデフォルト設定をしないようにする
				personal_information['flg_race_ethnic'] = 1;
			}
		}
	}
	else {
		if ($("#add_personal_information_dialog").dialog( "isOpen" ) == false &&
				$("#update_family_member_health_history_dialog").dialog( "isOpen" ) == false) {
			family_member = personal_information[relationship];
			current_relationship = relationship;
			family_member.relationship = relationship;

			clear_and_set_current_family_member_health_history_dialog(family_member);

			$( "#update_family_member_health_history_dialog" ).dialog( "open" );

			// 初回表示の人種デフォルト設定
			if (family_member['flg_race_ethnic'] != 1) {
				// Asian / Japanese default.
				$("#update_family_member_health_history_dialog").find("#selectedFamilyRaces-2").prop("checked", "true");
				// Open Asian checkbox
				$("#update_family_member_health_history_dialog").find("#asian_Familycheckboxes").show();
				// Japanese checked
				$("#update_family_member_health_history_dialog").find("#selectedFamilyRaces-14").prop("checked", "true");
				// フラグを立て、2回目以降の表示ではデフォルト設定をしないようにする
				family_member['flg_race_ethnic'] = 1;
			}
		}
	}
}

function reset_personal_information() {
	personal_information = new Object();
	personal_information['name']= $.t("fhh_js.self")
	personal_information['twin_status']="NO";
	personal_information['prefectures']="";
	personal_information['Health History']=[];
}

function get_defaultname(relationship, i ){
	if( typeof i == "undefined")
		return $.t(`family-t.${relationship}`);

	return $.t(`family-t.${relationship}`) + " " + ( i + 1 );
}

function escape_name(name) {
	name = name.replace(/\\/g, '\\\\');
	name = name.replace(/\"/g, '\\"');
	name = name.replace(/,/g, '\\,');
	return name;
}

// 名前 or その他自由入力病名 表示対策: htmlエスケープ
function escape_html (string) {
	if(typeof string !== 'string') {
		return string;
	}
	return string.replace(/[&'`"<>]/g, function(match) {
		return {
			'&': '&amp;',
			"'": '&#x27;',
			'`': '&#x60;',
			'"': '&quot;',
			'<': '&lt;',
			'>': '&gt;',
		}[match]
	});
}

window.onbeforeunload = closeEditorWarning;

/**
 * 年のプルダウンオプションを取得する
 * @param {int} min 
 * @param {int} max 
 */
function getYearOptions(min, max){

	var options = [];
	
	for( let i = min; i <= max ; i++ ){
	
		var opt = $('<option>');
		opt.val( i )
			.html(
				( getLang() == 'ja' ) ?
					getWarekiYear( i )
					: i 
				)
			.css( 'translate' );

		options.push( opt );
	}

	return options;
}

function getWarekiYear(year){
	
	if( 1925 < year && year <= 1988 ){
		var warekiYear = year - 1925;
		
		if( warekiYear < 2 )
			return '昭和元年' + '（' + year + '）';
	
		return '昭和' + warekiYear + '年' + '（' + year + '）';
	}

	if( 1988 < year && year <= 2018 ){
		var warekiYear = year - 1988;
		
		if( warekiYear < 2 )
			return '平成元年' + '（' + year + '）';
	
		return '平成' + warekiYear + '年' + '（' + year + '）';
	}
	
	if( 2018 < year  ){
		var warekiYear = year - 2018;
		
		if( warekiYear < 2 )
			return '令和元年' + '（' + year + '）';
	
		return '令和' + warekiYear + '年' + '（' + year + '）';
	}
	
	return year + '年';
}
