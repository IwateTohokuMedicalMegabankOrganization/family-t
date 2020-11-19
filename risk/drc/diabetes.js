var drc_score = {
	'age':0,
	'gender': 0,
	'gestational' : 0,
	'family': 0,
	'hypertension':0,
	'activity':0,
	'bmi':0,
	'smoke':0,
	'total':0
};

var clientValue = {
	'age':0,
	'gender': 0,
	'gestational' : 0,
	'family': 0,
	'hypertension':0,
	'activity':0,
	'smoke':0,
	'bmi':0,
	'obese':0,
	'hypo': false,
	'fasting': false,
	'occasion': false,
	'ogtt': false,
	'hba1c': false,
	'diabetes' : false
};

// get lng and set to variable. used to open correct pdf //
var lng = window.i18n.lng();
if (lng=='en-US') {
	lng = 'en';
};

$(document).ready(function() {

//	$('.aradio').buttonset();
//
//	build_required_information_for_personal_history();
//	enable_appropriate_changers();
//
//	var valid = test_for_any_missing_data();
//
//	// always show this because we added a disclaimer
//	if (!valid.age || !valid.gender || !valid.gestational_diabetes || !valid.height ||
//			!valid.weight || !valid.physically_active || !valid.hypertension) {
//		get_required_info_dialog(valid);
//	};

//	load_all_data_and_calculate_score();



});

function calcHisayamaScore() {

	var pi = personal_information;

	// クライアント値をセット
	load_age_drc(pi.date_of_birth.substr(0,4), pi.date_of_birth.substr(5,2), pi.date_of_birth.substr(9,2));
	load_gender_drc(pi.gender);
	load_family_drc();
	load_obese_drc(pi.gender, pi.waist);
	load_bmi_drc(pi.height, pi.weight);
	load_bp_drc(pi.systolic_blood_pressure, pi.diastolic_blood_pressure, pi.take_antihypertensive);
	load_smoke_drc(pi.smoker);
	load_activity_drc(pi.training_count_for_training_at_week);
	load_diabetes_status(pi.take_hypoglycemic, pi.fasting_blood_glucose_lebel, pi.occasionally_blood_glucose_lebel, pi.ogtt_blood_glucose_lebel, pi.hba1c);
	load_diabetes_experience(pi["Health History"]);

	// 各スコア計算
	drc_score.age		= drc_calculateAgeScore(clientValue.age);
	drc_score.gender	= drc_calculateGenderScore(clientValue.gender);
	drc_score.family	= drc_calculateFamilyScore(clientValue.family);
	drc_score.obese		= drc_calculateObeseScore(clientValue.obese);
	drc_score.bmi		= drc_calculateBMIScore(clientValue.bmi);
	drc_score.bp		= drc_calculateBPScore(clientValue.hypertension);
	drc_score.smoke		= drc_calculateSmokeScore(clientValue.smoke);
	drc_score.activity	= drc_calculateActivityScore(clientValue.activity);

	// 計算
	drc_calculate_score();

	// for debug
	//console.log(drc_score);

}

function showDiabetesRisk(totalscore) {

	var percentile = "";
	var filepath = "../risk/result_image/diabetes/";
	var filename = "";
	var extension = ".png";

	if (totalscore < 5) {
		percentile = "2.2%";
		filename = "score0-4";
	} else 	if (totalscore < 10) {
		percentile = "4.9%";
		filename = "score5-9";
	} else if (totalscore < 14) {
		percentile = "6.0%";
		filename = "score10-13";
	} else if (totalscore < 19) {
		percentile = "8.6%";
		filename = "score14-18";
	} else if (18 < totalscore) {
		percentile = "17.9%";
		filename = "score19";
	}

	$('#risk_range_diabetes').text($.t('family-t_risk_range_diabetes.pattern1'));
	$('#risk_parcentile_diabetes').text(percentile);
	$('#risk_image_diabetes').attr('src', filepath + filename + extension);

	return percentile;
}

// 糖尿病（と冠動脈疾患）は同じルール・内容の表示非表示を行っている
function checkDiabetesRisk(hypo, fasting, occasional, ogtt, hba1c, diabetes){
	// 計算結果をshow、治療中の文言、計算NGの文言はhide
	$("#diabetes_ok_mode").show();
	$("#diabetes_ng_mode").hide();
	$("#diabetes_calc_ng").hide();

	// 糖尿病型は計算結果を隠し、治療中の文言を表示
	if(hypo || fasting || occasional || ogtt || hba1c || diabetes){
		$("#diabetes_ok_mode").hide();
		$("#diabetes_ng_mode").show();
		$(".diabetes_chd_recommendation").show();

		// 投薬治療中 or 糖尿病罹患歴ありは、表示した文言の勧告文を隠す
		if(hypo || diabetes) {
			$(".diabetes_chd_recommendation").hide();
		}

		// 糖尿病型の判定要因を列挙
		$(".diabetes_chd_reason").empty();
		if(fasting){
			$(".diabetes_chd_reason").append("空腹時血糖値が126以上");
		}
		if(occasional){
			appendComma();
			$(".diabetes_chd_reason").append("随時血糖値が200以上");
		}
		if(ogtt){
			appendComma();
			$(".diabetes_chd_reason").append("75g OGTT 2時間値が200以上");
		}
		if(hba1c){
			appendComma();
			$(".diabetes_chd_reason").append("HbA1cの値が6.5以上");
		}

	}

}

// 計算しない場合の表示制御
function showDiabetesCalcNG(){
	$("#diabetes_ok_mode").hide();
	$("#diabetes_ng_mode").hide();
	$("#diabetes_calc_ng").show();
}

// リスク計算の不足項目があるかチェックする関数
function drc_checkNecessaryItems() {
	var cond = true;

	// 身長
	if(personal_information.height == "" || personal_information.height == 0){
		cond = false;
	}

	// 体重
	if(personal_information.weight == ""){
		cond = false;
	}

	// 腹囲
	if(personal_information.waist == ""){
		cond = false;
	}

	// 喫煙
	if(typeof personal_information.smoker == "undefined" ||
			(personal_information.smoker == "5" && typeof personal_information.number_of_cigarettes_per_day == "undefined") ){
		cond = false;
	}

	// 運動
	if(typeof personal_information.training_family == "undefined" ||
			(personal_information.training_family == "1" && (personal_information.training_strength == null ||
															personal_information.training_count_for_training_at_week == "" ||
															personal_information.training_time_for_training_at_week == "")
			) ) {
		cond = false;
	}

	// 最高血圧
	if(personal_information.systolic_blood_pressure == null || personal_information.systolic_blood_pressure == ""){
		cond = false;
	}

	// 最低血圧
	if(personal_information.diastolic_blood_pressure == null || personal_information.diastolic_blood_pressure == ""){
		cond = false;
	}

	return cond;
}

function appendComma(){
	if($(".diabetes_chd_reason").text().length > 0) $(".diabetes_chd_reason").append("、");
}

function load_age_drc(birthYear, birthMonth, birthDay) {
	var date = new Date;

	var currentYear = date.getFullYear();
	var currentMonth = date.getMonth()+1;
	var currentDay = date.getDate();

	var yob;
	if (personal_information.date_of_birth) yob = birthYear;
	else yob = currentYear;
	var age =  parseInt(currentYear) - parseInt(yob);

	if (currentMonth < birthMonth) age--;
	else if (currentMonth == birthMonth && currentDay < birthDay) age--;

	clientValue.age = age;
}

function load_gender_drc(gender){
	clientValue.gender = gender;
}

function load_family_drc(){

	// 糖尿病リスト
	const diabetesSnomedCodes = [
		'SNOMED_CT-73211009',
		'SNOMED_CT-46635009',
		'SNOMED_CT-44054006',
		'SNOMED_CT-UNDIABET'
	];

	var inherited = false;
	if (!(personal_information.adopted == true || personal_information.adopted == "true") ) {
		$.each(personal_information, function (key, item) {
			// q - true: 血縁者, false: 非血縁者
			var type = key_check(key);
			var q = blood_check(key, item, type);
			if ( q && item['Health History']) {
				for (var i = 0; i < item['Health History'].length; i++) {
					if (diabetesSnomedCodes.includes ( item['Health History'][i]['Disease Code'] )) inherited = true;
				}
			}
		});
	}

	clientValue.family = inherited;
}

function key_check(key) {
	const relative_hash1 = ["mother", "father", "brother", "sister", "son", "daughter",
							"maternal_halfbrother", "maternal_halfsister", "paternal_halfbrother", "paternal_halfsister"];
	const relative_hash2 = ["maternal_grandmother", "maternal_grandfather", "maternal_aunt", "maternal_uncle"];
	const relative_hash3 = ["paternal_grandmother", "paternal_grandfather", "paternal_aunt", "paternal_uncle"];
	const relative_hash4 = ["grandson", "granddaughter", "nephew", "niece"];

	for(let h of relative_hash1){
		if(key.startsWith(h)) return 1;
	}

	for(let h of relative_hash2){
		if(key.startsWith(h)) return 2;
	}

	for(let h of relative_hash3){
		if(key.startsWith(h)) return 3;
	}

	for(let h of relative_hash4){
		if(key.startsWith(h)) return 4;
	}

	return -1;
}

function blood_check(key, item, type) {

	switch (type){
	case 1: // mother, father, son, daughter, brother, sister, maternal/paternal halfbrother/sister -> 本人のadoptedがfalseであれば血縁者
		if (item.adopted == true) return false;
		return true;

	case 2: // grandmother/father, uncle, aunt -> 本人及びその子或いは兄弟姉妹（probandから見てmother/father）がどちらもfalseであれば血縁者
		// mother の系列

		// 調べている本人
		if (typeof item.adopted != "undefined" && item.adopted == true) return false;

		// 調べている本人の子/姉妹 -> probandから見たmother
		var mom = personal_information.mother;
		if (typeof mom.adopted != "undefined" && mom.adopted == true) return false;

		return true;

	case 3:
		// father の系列

		// 調べている本人
		if (typeof item.adopted != "undefined" && item.adopted == true) return false;

		// 調べている本人の子/兄弟 -> probandから見たfather
		var dad = personal_information.father;
		if (typeof dad.adopted != "undefined" && dad.adopted == true) return false;

		return true;

	case 4:
		// grandson/daughter, nephew, niece -> 本人及びその親（probandから見てson/daughter, siblings）がどちらもfalseであれば血縁者
		// son/daughter, siblingsは複数人いる場合があり得るので、本人のparent_idで全探索し、マッチした人のadoptedを調べる処理が必要

		// 調べている本人
		if (typeof item.adopted != "undefined" && item.adopted == true) return false;

		// parent_idの探索
		$.each(personal_information, function(ckey, cval){
			if (cval != null && cval["id"] == item.parent_id) {
				if (typeof cval.adopted != "undefined" && cval.adopted == true) {
					//for debug
					//console.log(key + " -|-> " + ckey);
					return false;
				}

				// for debug
				//console.log(key + " ---> " + ckey);
			}
		});

		return true;

	default:
		// 第3度近親または血縁情報が得られない場合は非血縁者（false）を返す
		return false;
	}
}

function load_obese_drc(gender, waist) {
	clientValue.obese = false;
	if ( (gender == "MALE" && parseInt(waist) >= 90) || (gender == "FEMALE" && parseInt(waist) >= 80) ) {
		clientValue.obese = true;
	}
}

function load_bmi_drc(height, weight) {
	clientValue.bmi = 10000.0 * parseInt(weight) / height / height;
}

function load_bp_drc(bpmax, bpmin, medication) {
	clientValue.hypertension = false;
	if (bpmax == "140-159" || bpmax == "160-179" || bpmax == "over180" ||
		bpmin == "90-99" || bpmin == "100-109" || bpmin == "over110" ||
		medication == true)
	{
		clientValue.hypertension = true;
	}

	// 血圧降下薬TRUEの場合、血圧の値に関わらず「血圧」のスコアは7点になります
	if( medication == true ) clientValue.hypertension = true;
	if( medication == "true" ) clientValue.hypertension = true;

}

function load_smoke_drc(smoker) {
	clientValue.smoke = "0";
	if (smoker == "5") {
		if (typeof personal_information.number_of_cigarettes_per_day != "undefined" && personal_information.number_of_cigarettes_per_day == "1_to_9") {
			clientValue.smoke = "1-9";
		} else if (typeof personal_information.number_of_cigarettes_per_day != "undefined" && personal_information.number_of_cigarettes_per_day == "10_or_more") {
			clientValue.smoke = "over10";
		}
	}
}

function load_activity_drc(freq) {
	clientValue.activity = false;
	if (parseInt(freq) >= 3) {
		clientValue.activity = true;
	}
}

function load_diabetes_status(hypoglycemic, fasting, occasional, ogtt, hba1c) {
	clientValue.hypo = false;
	clientValue.fasting = false;
	clientValue.occasion = false;
	clientValue.ogtt = false;
	clientValue.hba1c = false;
	if(hypoglycemic == "true" || hypoglycemic == true)	{ clientValue.hypo = true; }
	if(fasting == "over126") 					{ clientValue.fasting = true; }
	if(occasional == "over200") 				{ clientValue.occasion = true; }
	if(ogtt == "over200") 						{ clientValue.ogtt = true; }
	if(hba1c == "over65") 						{ clientValue.hba1c = true; }

}

function load_diabetes_experience(history) {
	var experience = false;

	if(typeof history == "undefined") return false;


	// 糖尿病リスト
	const diabetesSnomedCodes = [
		'SNOMED_CT-73211009',
		'SNOMED_CT-46635009',
		'SNOMED_CT-44054006',
		'SNOMED_CT-UNDIABET'
	];

	for (var i = 0; i < history.length; i++) {
		if (diabetesSnomedCodes.includes ( history[i]['Disease Code'] )) experience = true;
	}

	clientValue.diabetes = experience;
}

function drc_calculateAgeScore(age) {
	if (40 <= age && age <= 44) return 0;
	if (45 <= age && age <= 54) return 4;
	if (55 <= age && age <= 64) return 3;
	if (65 <= age)				return 1;

	return 0;
}

function drc_calculateGenderScore(gender) {
	if (gender == "MALE") return 4;

	return 0;
}

function drc_calculateFamilyScore(family) {
	if (family) return 7;

	return 0;
}

function drc_calculateObeseScore(obese) {
	if (obese) return 3;

	return 0;
}

function drc_calculateBMIScore(bmi) {
	if (bmi < 22)				return 0;
	if (22 <= bmi && bmi < 25)  return 3;
	if (25 <= bmi)				return 7;

	return 0;
}

function drc_calculateBPScore(hype) {
	if (hype) return 7;

	return 0;
}

function drc_calculateSmokeScore(smoke) {
	switch (smoke){
		case "0":		return 0;
		case "1-9":		return 2;
		case "over10":	return 5;
		default:		return 0;
	}
}

function drc_calculateActivityScore(activity) {
	if (activity) return -5;

	return 0;
}

function drc_calculate_score() {
	drc_score.total =
		drc_score.age		+
		drc_score.gender	+
		drc_score.family	+
		drc_score.obese		+
		drc_score.bmi		+
		drc_score.bp		+
		drc_score.smoke		+
		drc_score.activity;
}

