//var score = {
//	'age':0,
//	'gender': 0,
//	'isSmoker' : 0,
//	'hdlValue': 0,
//	'ldlValue':0,
//	'bloodPressure':0,
//	'suger':0,
//	'chd':0,
//	'total':0
//};

var chd_score = {
	'age':0,
	'gender': 0,
	'isSmoker' : 0,
	'hdlValue': 0,
	'ldlValue':0,
	'bloodPressure':0,
	'suger':0,
	'chd':0,
	'total':0
};

var clientValue = {
	'age':0,
	'gender':0,
	'isSmoker':0,
	'hdlValue': 0,
	'ldlValue':0,
	'bloodPressureMax':0,
	'bloodPressureMin':0,
	'suger':0,
	'chd':0
};

var lng = 'ja';

$(document).ready(function() {

	$("#atherosclerotic_content").hide();
	$("#extra_info_dialog").show();

	$("#atheroscleroticNextButton").on('click',function(){
		calcSuitaScore();
		$("#extra_info_dialog").hide();
		$("#atherosclerotic_content").show();
	});
});

function showCHDRisk(pi_age, pi_gender, pi_chdscore) {

	var percentile = getPercentile(pi_chdscore);
	var pattern = getPattern(pi_age, pi_gender);
	var rangetext = getRange(pattern);
	var filename = getFileName(pi_chdscore);
	const filepath = "../risk/result_image/coronary_" + getLang() + "/";
	const connector = "_score";
	const extension = ".png";
	var filefullpath = filepath + pattern + connector + filename + extension;

	$('#risk_range_chd').text(rangetext);
	$('#risk_parcentile_chd').text(percentile);
	$('#risk_image_chd').attr('src', filefullpath);

	return percentile;
}

function getPattern(pi_age, pi_gender) {
	if (pi_gender == "MALE") {
		if (34 < pi_age && pi_age < 45) return "pattern1";
		if (44 < pi_age && pi_age < 55) return "pattern2";
		if (54 < pi_age && pi_age < 65) return "pattern3";
		if (64 < pi_age) return "pattern4";
	}
	if (pi_gender == "FEMALE") {
		if (34 < pi_age && pi_age < 45) return "pattern5";
		if (44 < pi_age && pi_age < 55) return "pattern1";
		if (54 < pi_age && pi_age < 65) return "pattern2";
		if (64 < pi_age) return "pattern3";
	}
}

function getRange(pat) {
	return $.t( "family-t_risk_range_chd." + pat );
	// if (pat == "pattern1") return "最低0.5% ～ 最高17.3%";
	// if (pat == "pattern2") return "最低0.5% ～ 最高24.6%";
	// if (pat == "pattern3") return "最低0.5% ～ 最高28.1%";
	// if (pat == "pattern4") return "最低1.6% ～ 最高28.1%";
	// if (pat == "pattern5") return "最低0.5% ～ 最高6.6%";
}

function getPercentile(score){
	if (score < 36) return "0.5%";
	if (score < 41) return "1.6%";
	if (score < 46) return "2.6%";
	if (score < 51) return "4.2%";
	if (score < 56) return "6.6%";
	if (score < 61) return "11.0%";
	if (score < 66) return "17.3%";
	if (score < 71) return "24.6%";
	return "28.1%";
}

function getFileName(score){
	if (score < 36) return "0-35";
	if (score < 41) return "36-40";
	if (score < 46) return "41-45";
	if (score < 51) return "46-50";
	if (score < 56) return "51-55";
	if (score < 61) return "56-60";
	if (score < 66) return "61-65";
	if (score < 71) return "66-70";
	return "71";
}

//糖尿病と冠動脈疾患は同じルール・内容の表示非表示を行っている
function checkCHDRisk(hypo, fasting, occasional, ogtt, hba1c){
	// 計算結果をshow、治療中の文言、計算NGの文言はhide
	$("#chd_ok_mode").show();
	$("#chd_ng_mode").hide();
	$("#chd_ng_mode2").hide();
	$("#chd_ng_ref").hide();
	$("#chd_calc_ng").hide();

	// 糖尿病型は計算結果を隠し、治療中の文言を表示
	if(hypo || fasting || occasional || ogtt || hba1c){
		$("#chd_ok_mode").hide();
		$("#chd_ng_mode").show();
		$("#chd_ng_ref").show();
		$(".diabetes_chd_recommendation").show();

		// 投薬治療中は、表示した文言の勧告文を隠す
		if(hypo) {
			$(".diabetes_chd_recommendation").hide();
		}

		// 糖尿病型の判定要因を列挙
		$(".diabetes_chd_reason").empty();
		if(fasting){
			$(".diabetes_chd_reason").append($.t("family-t_risk.fasting_blood_glucose_level_is126"));
		}
		if(occasional){
			appendComma();
			$(".diabetes_chd_reason").append($.t("family-t_risk.blood_glucose_level_is_200"));
		}
		if(ogtt){
			appendComma();
			$(".diabetes_chd_reason").append($.t("family-t_risk.ogtt_two-hour"));
		}
		if(hba1c){
			appendComma();
			$(".diabetes_chd_reason").append($.t("family-t_risk.HbA1c_value_is_65"));
		}

	}

	// 冠動脈疾患リスク計算除外対象疾病チェックに引っかかった場合は計算結果を隠し、除外文言を表示
	if( checkNGDisease() ){
		$("#chd_ok_mode").hide();
		$("#chd_ng_mode2").show();
		$("#chd_ng_ref").show();
	}

}

// 冠動脈疾患リスク計算除外対象疾病チェック
function checkNGDisease(){
	const checkList = [
			"SNOMED_CT-46635009", // 1型糖尿病
			"SNOMED_CT-44054006", // 2型糖尿病
			"SNOMED_CT-73211009", // その他の糖尿病
			"SNOMED_CT-UNDIABET", // 不明の糖尿病
			"SNOMED_CT-194828000", // 狭心症
			"SNOMED_CT-22298006", // 心筋梗塞
			"SNOMED_CT-230690007", // 脳梗塞（not不整脈）
			"SNOMED_CT-236439005", // 嚢胞性腎疾患
			"SNOMED_CT-127013003", // 糖尿病性腎疾患
			"SNOMED_CT-82525005", // 生まれつきの腎疾患
			"SNOMED_CT-90708001", // ネフローゼ
			"SNOMED_CT-52845002", // 腎炎
			"SNOMED_CT-OTKIDDIS", // その他の腎疾患
	];

	for(i=0; i<personal_information['Health History'].length; i++) {
		if( checkList.includes( personal_information['Health History'][i]['Disease Code'] )) return true;
	}

	return false
}

//計算しない場合の表示制御
function showCHDCalcNG(){
	$("#chd_ok_mode").hide();
	$("#chd_ng_mode").hide();
	$("#chd_ng_mode2").hide();
	$("#chd_ng_ref").hide();
	$("#chd_calc_ng").show();
}

// リスク計算の不足項目があるかチェックする関数
function chd_checkNecessaryItems() {
	var cond = true;

	// 喫煙
	if(typeof personal_information.smoker == "undefined" ||
			(personal_information.smoker == "5" && typeof personal_information.number_of_cigarettes_per_day == "undefined") ){
		cond = false;
	}

	// 降圧剤
	if(typeof personal_information.take_antihypertensive == "undefined"){
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

	// HDLコレステロール（未入力）
	if(personal_information.hdl_cholesterol == null || personal_information.hdl_cholesterol == ""){
		cond = false;
	}

	// LDLコレステロール（未入力）
	if(personal_information.ldl_cholesterol == null || personal_information.ldl_cholesterol == ""){
		cond = false;
	}

	// HDLコレステロール（未検査）
	if(personal_information.hdl_cholesterol == "unknown" || personal_information.hdl_cholesterol == "not_inspected"){
		cond = false;
	}

	// LDLコレステロール（未検査）
	if(personal_information.ldl_cholesterol == "unknown" || personal_information.ldl_cholesterol == "not_inspected"){
		cond = false;
	}

	return cond;
}

function calcSuitaScore(){

	// クライアント値をセット
	load_age_chd(personal_information.date_of_birth.substr(0,4), personal_information.date_of_birth.substr(5,2), personal_information.date_of_birth.substr(9,2));
	load_gender_chd(personal_information.gender);
	load_smoker(personal_information.smoker);
	load_dl(personal_information.hdl_cholesterol, personal_information.ldl_cholesterol);
	load_bp(personal_information.systolic_blood_pressure, personal_information.diastolic_blood_pressure);
	load_suger();
	load_chd();

	// 各種計算
//	$('#age').val(calculateAgeScore()).text(calculateAgeScore()).change();
//	$('#gender').val(calculateGenderScore()).text(calculateGenderScore()).change();
//	$('#isSmoker').val(calculateSmokerScore()).text(calculateSmokerScore()).change();
//	$('#hdlValue').val(calculateHdlScore()).text(calculateHdlScore()).change();
//	$('#ldlValue').val(calculateLdlScore()).text(calculateLdlScore()).change();
//	$('#bloodPressure').val(calculateBloodPressureScore()).text(calculateBloodPressureScore()).change();
//	$('#suger').val(calculateSugerScore()).text(calculateSugerScore()).change();
//	$('#chd').val(calculateCHDScore()).text(calculateCHDScore()).change();

	chd_score.age			= chd_calculateAgeScore(clientValue.age);
	chd_score.gender		= chd_calculateGenderScore(clientValue.gender);
	chd_score.isSmoker		= chd_calculateSmokerScore(clientValue.isSmoker);
	chd_score.hdlValue		= chd_calculateHdlScore(clientValue.hdlValue);
	chd_score.ldlValue		= chd_calculateLdlScore(clientValue.ldlValue);
	chd_score.bloodPressure	= chd_calculateBloodPressureScore(clientValue.bloodPressureMax, clientValue.bloodPressureMin);
	chd_score.suger			= chd_calculateSugerScore(clientValue.suger);
	chd_score.chd			= chd_calculateCHDScore(clientValue.chd);

	// 計算
	chd_calculate_score();

	// for debug
	//console.log(chd_score);

	//return parseInt(chd_score.total);
}

function load_age_chd(birthYear, birthMonth, birthDay) {
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

function load_gender_chd(gender){
	clientValue.gender = gender;
}

function load_dl(hdl, ldl){
	clientValue.hdlValue = hdl; //$('#input_hdl').val();
	clientValue.ldlValue = ldl; //$('#input_ldl').val();
}

function load_suger(){
	var isIGT = false;
	if( typeof personal_information['Health History'] == "undefined" ) return false;
	for (var i=0; i<personal_information['Health History'].length; i++) {
		if (personal_information['Health History'][i]['Disease Code'] == "SNOMED_CT-9414007") {
			isIGT = true;
			break;
		}
	}


	//	空腹時血糖値「110-125」は耐糖能異常ありとして5点付与します
	if( personal_information.fasting_blood_glucose_lebel == "110-125" ) isIGT = true;
	//	随時血糖値「140-199」は耐糖能異常ありとして5点付与します
	if( personal_information.occasionally_blood_glucose_lebel == "140-199" ) isIGT = true;
	//	75g経口糖負荷「140-199」は耐糖能異常ありとして5点付与します
	if( personal_information.ogtt_blood_glucose_lebel == "140-199" ) isIGT = true;

	clientValue.suger = isIGT; //$('#input_suger').prop('checked');
}

function load_bp(bpmax, bpmin){
	clientValue.bloodPressureMax = bpmax; //$('#input_bpmax').val();
	clientValue.bloodPressureMin = bpmin; //$('#input_bpmin').val();
}

function load_smoker(smoker){
	clientValue.isSmoker = false;
	if (smoker == "5") {
		clientValue.isSmoker = true; //$('#input_issmoker').prop('checked');
	}
}

// 冠動脈疾患 Coronary Heart Disease: CHD
function load_chd(){

	var isCHD = false;

	// 本人が養子でなければ続行
	if (!(personal_information.adopted == true || personal_information.adopted == "true") ) {
		$.each(personal_information, function (key, item) {
			var temp = key.substring(0,6);

			// 第一度近親であれば続行
			if(temp == 'father' || temp == 'mother' || temp == 'brothe' || temp == 'sister' || key.substring(0,3) == 'son' || key.substring(0,3) == 'dau' ) {

				// 第一度近親の対象が養子でなければ続行
				if (!(item.adopted == true) &&  item['Health History']) {

					for (i = 0; i < item['Health History'].length; i++) {

						//冠動脈疾患（狭心症・心筋梗塞）であれば続行
						if (item['Health History'][i]['Disease Code'] == "SNOMED_CT-194828000" || item['Health History'][i]['Disease Code'] == "SNOMED_CT-22298006") {
							var diag_age = item['Health History'][i]['Age At Diagnosis'];

							// 早発性（男55未満、女65未満）であれば true でチェック終了
							if ( (item.gender == "MALE" && !(diag_age == "late_fifties" || diag_age == "early_sixties" || diag_age == "late_sixties" || diag_age == "senior")) ||
								 (item.gender == "FEMALE" && !(diag_age == "late_sixties" || diag_age == "senior")) ) {
								isCHD = true;
								break;
							}
						}
					}
				}
			}
		});
	}

	clientValue.chd = isCHD;
}

function chd_calculateCHDScore(chd) {
	if( chd ) return 5;

	return 0;
}

function chd_calculateSugerScore(suger) {
	if( suger ) return 5;

	return 0;
}

function chd_calculateBloodPressureScore(bpMax, bpMin) {
	if( bpMax == "over180" || bpMax == "160-179" ) return 6;
	if( bpMin == "over110" || bpMin == "100-109" ) return 6;

	if( bpMax == "140-159" ) return 4;
	if( bpMin == "90-99" ) return 4;

	if( bpMax == "130-139" || bpMax == "120-129" ) return 0;
	if( bpMin == "80-84" || bpMin == "85-89" ) return 0;

	if( bpMax == "under_119" && bpMin == "79_or_less" ) return -7;

	return 0;
}


function chd_calculateLdlScore(ldl) {
	if( ldl == "less_than_100" ) return 0;
	if( ldl == "100-139" ) return 5;
	if( ldl == "140-159" ) return 7;
	if( ldl == "160-179" ) return 10;
	if( ldl == "over180" ) return 11;

	return 0;
}


function chd_calculateHdlScore(hdl) {
	if( hdl == "less_than_40" ) return 0;
	if( hdl == "40-59" ) return -5;
	if( hdl == "over60" ) return -6;

	return 0;
}

function chd_calculateSmokerScore(isSmoker) {
	if( isSmoker ) return 5;

	return 0;
}

function chd_calculateGenderScore(gender) {
	if( gender == "FEMALE" ) return -7;

	return 0;
}

function chd_calculateAgeScore(age) {
	if( age < 35 ) return 30;
	if( 35 <= age && age <= 44 ) return 30;
	if( 45 <= age && age <= 54 ) return 38;
	if( 55 <= age && age <= 64 ) return 45;
	if( 65 <= age && age <= 69 ) return 51;
	if( 70 <= age ) return 53;

	return 30;
}

function chd_calculate_score() {

	chd_score.total =
			parseInt(chd_score.age)
		+ parseInt(chd_score.gender)
		+ parseInt(chd_score.isSmoker)
		+ parseInt(chd_score.hdlValue)
		+ parseInt(chd_score.ldlValue)
		+ parseInt(chd_score.bloodPressure)
		+ parseInt(chd_score.suger)
		+ parseInt(chd_score.chd);

	$('#total').attr('value',chd_score.total);
	$('#total').text(chd_score.total);
}


