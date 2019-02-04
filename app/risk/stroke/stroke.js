// Key Codes
/*
	"Stroke/Brain Attack": [
		{"name":"Stroke/Brain Attack","abbr":"SBA","code":"116288000","system":"SNOMED_CT"}
	],

  "Stroke/Brain Attack": "脳卒中",
  "SNOMED_CT-116288000": "脳卒中",
*/

var final_risk = false;

// get lng and set to variable. used to open correct pdf //
var lng = window.i18n.lng();
if (lng=='en-US') {
	lng = 'en';
};

if (personal_information == null) alert ($.t("fhh_stroke_calculator.personal_information"));

set_icon($("#parents_stroke_before_65"), 'calculating');
setTimeout(test_parents_stroke_before_65, 500);

/// End of main script

function test_parents_stroke_before_65() {
	var risk = false;
	risk_reason = "";
  $.each(personal_information, function (key, item) {
  	if (item != null) {
			var h = item['Health History'];
			if (h != null) {

				var temp4 = key.substring(0,4);
				var temp8 = key.substring(0,8);
				var temp13 = key.substring(0,13);
				if(temp4 == 'fath' || temp4 == 'moth') {
			  	if (check_blood_relative(key) == false) return true; // 養子チェック
					for (i=0;i<h.length;i++) {
						if (h[i]['Disease Code'] == 'SNOMED_CT-116288000' && is_age_before('Under60', h[i]['Age At Diagnosis']) ) {
							risk=true;
						}
					}
				}
			}
		}
	});

	if (risk) {
		set_icon($("#parents_stroke_before_65"), 'positive');
		set_reason($("#parents_stroke_before_65"), $.t("fhh_stroke_calculator.parents_stroke_before_65_risk"));
	} else {
		set_icon($("#parents_stroke_before_65"), 'negative');
		set_reason($("#parents_stroke_before_65"), $.t("fhh_stroke_calculator.parents_stroke_before_65_negative"));
	}

	final_risk |= risk;
	// Goto Next test
	set_icon($("#final"), 'calculating');
	setTimeout(test_final, 500);
}

function test_final() {
	if (final_risk) {
		set_icon($("#final"), 'positive');
		set_reason($("#final"),$.t("fhh_stroke_calculator.final_risk1"));
		$("#explanation_low_risk").hide();
		$("#explanation_high_risk").show();
	} else {
		set_icon($("#final"), 'negative');
		set_reason($("#final"),$.t("fhh_stroke_calculator.final_risk2"));
		$("#explanation_high_risk").hide();
		$("#explanation_low_risk").show();
	}
}
///  Support functions

// Basically a lookup table
// Note as 60 and older includes 60 we need to be consevative and say that they are 60 or under
// Same with 50,40,30,20,10

function is_age_before(age_to_check, age_at_diagnosis) {
	switch(age_to_check) {
		case 'Under60':
			if (age_at_diagnosis == 'senior') return true;
		case 'Under50':
			if (age_at_diagnosis == 'fifties') return true;
			if (age_at_diagnosis == 'early_fifties') return true;
			if (age_at_diagnosis == 'late_fifties') return true;
		case 'Under40':
			if (age_at_diagnosis == 'fourties') return true;
			if (age_at_diagnosis == 'early_fourties') return true;
			if (age_at_diagnosis == 'late_fourties') return true;
		case 'Under30':
			if (age_at_diagnosis == 'thirties') return true;
			if (age_at_diagnosis == 'early_thirties') return true;
			if (age_at_diagnosis == 'late_thirties') return true;
		case 'Under20':
			if (age_at_diagnosis == 'twenties') return true;
			if (age_at_diagnosis == 'early_twenties') return true;
			if (age_at_diagnosis == 'late_twenties') return true;
		case 'Under10':
			if (age_at_diagnosis == 'teen') return true;
			if (age_at_diagnosis == 'early_teen') return true;
			if (age_at_diagnosis == 'late_teen') return true;
			if (age_at_diagnosis == 'child') return true;
			if (age_at_diagnosis == 'infant') return true;
			if (age_at_diagnosis == 'newborn') return true;
			if (age_at_diagnosis == 'prebirth') return true;
			if (age_at_diagnosis == 'Unknown') return true;
			if (age_at_diagnosis == 'unknown') return true;
	}
	return false;
}

function set_icon(field, state) {
	switch (state) {
		case 'waiting':
			$(field).find("#test").empty().append("<IMG alt='waiting' src='../risk/stroke/blue_waiting.png' height='40'/>");
			break;
		case 'calculating':
			$(field).find("#test").empty().append("<IMG alt='calculating' src='../risk/stroke/blue_calculating.gif' height='40'/>");
			break;
		case 'negative':
			$(field).find("#test").empty().append("<IMG alt='good_because_negative' src='../risk/stroke/green_x.png' height='40'/>");
			break;
		case 'positive':
			$(field).find("#test").empty().append("<IMG alt='bad_because_positive' src='../risk/stroke/red_check.png' height='40'/>");
			break;

	}
}

function set_reason(field, text) {
			$(field).find("#reason").empty().append(text);
}

function get_name_or_relationship (name, relationship) {
	if (name && name.length > 0) return name;

	var n = relationship.lastIndexOf('_');
	s = relationship.substring(0, n != -1 ? n : relationship.length);
	s = s.replace ("_", " ");
	return "Your " + s;
}

// Used for determining if relative is adopted
function get_relative_by_id(id) {
	for (var relative in personal_information) {
		if (personal_information[relative]) { // line added to prevent undefined error on id property
			if (typeof personal_information[relative].id != 'undefined') {
				if (personal_information[relative].id == id) return relative;
			}
		} //

	}
	return null;
}

// Three different checks for blood relatives.
// 1st, 2nd, 3rd level
// 1st: brother, sister, mother, father, son, daughter
// 2nd: grandparents, grandchildren, aunts, uncles, half-siblings (but halfsiblings count as primary in this case only)
// 3rd: cousins, niece/nephews

function check_blood_relative(relative) {
	// If the proband is adopted, then only son,daughter, grandson, granddaughter could possibly be blood
	if (personal_information.adopted == true) {
		if (! (relative.substring(0,3) == 'son'     || relative.substring(0,8) == 'daughter'
		 || relative.substring(0,8) == 'grandson' || relative.substring(0,13) == 'granddaughter')) {
			return false;
		}
	}

	// All cases check if that person is adopted, if they are, they are not blood relative
	if (typeof personal_information[relative] != 'undefined')
	{
//		alert (personal_information[relative].name + ":" + (personal_information[relative].adopted == 'true') );
		// If your relative is adopted and not your mom, dad, grandparents, then not a blood relative
		if (personal_information[relative].adopted == true &&
		 !(relative.substring(0,6) == 'mother'  || relative.substring(0,6) == 'father'
		 || relative.substring(0,20) == 'maternal_grandfather' || relative.substring(0,20) == 'maternal_grandmother'
		 || relative.substring(0,20) == 'paternal_grandfather' || relative.substring(0,20) == 'paternal_grandmother' ) ) return false;
	}
// Primary, no other tests required
	if (relative.substring(0,7) == 'brother' || relative.substring(0,6) == 'sister'
	 || relative.substring(0,6) == 'mother'  || relative.substring(0,6) == 'father'
	 || relative.substring(0,3) == 'son'     || relative.substring(0,8) == 'daughter') {
		return true;
	}

// Half-siblings also do not need another test
	if (relative.substring(0,20) == 'maternal_halfbrother' || relative.substring(0,19) == 'maternal_halfsister'
	 || relative.substring(0,20) == 'paternal_halfbrother' || relative.substring(0,19) == 'paternal_halfsister') {
	 	return true;
	}

// For 2nd degree relatives, check mother or father as well
	if (relative.substring(0,13) == 'maternal_aunt' || relative.substring(0,14) == 'maternal_uncle'
	 || relative.substring(0,20) == 'maternal_grandfather' || relative.substring(0,20) == 'maternal_grandmother') {
	 	if (typeof personal_information['mother'] != 'undefined'  && personal_information['mother'].adopted == true) return false;
	 	else return true;
	}

	if (relative.substring(0,13) == 'paternal_aunt' || relative.substring(0,14) == 'paternal_uncle'
	 || relative.substring(0,20) == 'paternal_grandfather' || relative.substring(0,20) == 'paternal_grandmother') {
	 	if (typeof personal_information['father'] != 'undefined'  && personal_information['father'].adopted == true) return false;
	 	else return true;
	}

// Grandchildren need to check the child as well
	if (relative.substring(0,8) == 'grandson' || relative.substring(0,13) == 'granddaughter') {
	 var parent_of_relative = get_relative_by_id(personal_information[relative].parent_id);
   if (typeof personal_information[parent_of_relative] != 'undefined'  &&  personal_information[parent_of_relative].adopted == true) return false;
	 return true;
	}


// For 3rd degree relatives, check parent of the person and the mother or father as well
	if (relative.substring(0,15) == 'maternal_cousin' ) {
	 if (typeof personal_information['mother'] != 'undefined'  && personal_information['mother'].adopted == 'true') return false;
	 var parent_of_relative = get_relative_by_id(personal_information[relative].parent_id);
//	 alert (personal_information[parent_of_relative].name + ":" + personal_information[parent_of_relative].adopted);
	 	if (typeof personal_information[parent_of_relative] != 'undefined'  &&  personal_information[parent_of_relative].adopted == true) return false;
	 return true;
	}

	if (relative.substring(0,15) == 'paternal_cousin') {
	 if (typeof personal_information['father'] != 'undefined'  && personal_information['father'].adopted == 'true') return false;
	 var parent_of_relative = get_relative_by_id(personal_information[relative].parent_id);
	 	if (typeof personal_information[parent_of_relative] != 'undefined'  && personal_information[parent_of_relative].adopted == true) return false;
	 return true;
	}

	if (relative.substring(0,5) == 'niece' || relative.substring(0,6) == 'nephew' ) {
		var parent_of_relative = get_relative_by_id(personal_information[relative].parent_id);
//		alert (personal_information[parent_of_relative].name + ":" + personal_information[parent_of_relative].adopted);
	 	if (typeof personal_information[parent_of_relative] != 'undefined'  &&  personal_information[parent_of_relative].adopted == true) return false;
		return true;
	}

	return true; // Non-relative entries should be ignored
}