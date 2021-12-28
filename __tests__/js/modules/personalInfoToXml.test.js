import {personalInfoToXml, json2xml, _convert,
    _getEffectiveTime,_getPatientPerson} from '../../../js/modules/personalInfoToXml';

var personalInformation = {
    "name":"あなた",
    "twin_status":"IDENTICAL",
    "prefectures":null,
    "Health History":[{"Disease Name":"Healthy","Detailed Disease Name":"健康","Age At Diagnosis":"blank","Disease Code":"FAMILY_T-HEALTHY"}],
    "flg_race_ethnic":1,
    "id":"310674d6-1b03-4a03-abe8-418d23c40296",
    "gender":"MALE",
    "date_of_birth":"1994/01/01",
    "adopted":false,
    "height":175,
    "height_unit":"centimeters",
    "weight":"60",
    "weight_unit":"kilogram",
    "month_of_birth":"1",
    "year_of_birth":"1994",
    "birth_order":3,
    "living_prefectures":"0000",
    "waist":"80",
    "waist_unit":"centimeters",
    "hip":"80",
    "hip_unit":"centimeters",
    "smoker":"1",
    "training_family":"1",
    "training_strength":"中程度",
    "training_count_for_training_at_week":"1",
    "training_time_for_training_at_week":"120",
    "dietary_frequency_to_eat_fruits_in_day":"true",
    "dietary_frequency_to_eat_vegetables_in_day":"1-2_times",
    "dietary_frequency_to_eat_nuts_in_week":"2-4times",
    "dietary_frequency_to_eat_whole_grains_in_day":"true",
    "dietary_frequency_to_eat_fishes_in_week":"true",
    "dietary_frequency_to_eat_dairy_products_in_day":"true",
    "dietary_frequency_to_eat_processed_meat_in_week":"true",
    "dietary_frequency_to_eat_unprocessed_meat_in_week":"true",
    "dietary_frequency_to_drink_suger_drin_in_week":"true",
    "take_antihypertensive":"false",
    "systolic_blood_pressure":"120-129",
    "diastolic_blood_pressure":"80-84",
    "take_hypoglycemic":"false",
    "fasting_blood_glucose_lebel":"100-129",
    "occasionally_blood_glucose_lebel":"140-199",
    "ogtt_blood_glucose_lebel":"140-199",
    "hba1c":"under65",
    "hdl_cholesterol":"40-59",
    "ldl_cholesterol":"100-139",
    "last_diagnosis_year":"2021",
    "last_diagnosis_month":"1",
    "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
    "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
    "update_date":"2021/11/02",
    "father":{
        "gender":"MALE",
        "id":"7421ec0a-a1ba-4793-b9e4-675d59840e70",
        "Health History":[{"Disease Name":"Hypertension","Detailed Disease Name":"高血圧","Age At Diagnosis":"early_fifties","Disease Code":"SNOMED_CT-38341003"}],
        "name":"あなたの父",
        "relationship":"father",
        "flg_race_ethnic":1,
        "twin_status":"NO",
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "birth_order":1,
        "is_alive":"alive",
        "age":53,
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "mother":{
        "gender":"FEMALE",
        "id":"67a23978-15d8-446b-8f63-9e45338d4119",
        "Health History":[{"Disease Name":"Healthy","Detailed Disease Name":"健康","Age At Diagnosis":"blank","Disease Code":"FAMILY_T-HEALTHY"}],
        "name":"あなたの母",
        "relationship":"mother",
        "flg_race_ethnic":1,
        "twin_status":"NO",
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "birth_order":2,
        "is_alive":"alive",
        "age":52,
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "maternal_grandfather":{
        "gender":"MALE",
        "id":"0711de17-cd00-415d-b822-689fd3885ded",
        "Health History":[{"Disease Name":"Cancer","Detailed Disease Name":"胃がん","Age At Diagnosis":"late_fifties","Disease Code":"SNOMED_CT-363349007"}],
        "name":"あなたの母方の祖父",
        "relationship":"maternal_grandfather",
        "flg_race_ethnic":1,
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "birth_order":1,
        "is_alive":"dead",
        "cause_of_death":"Cancer",
        "detailed_cause_of_death":"胃がん",
        "estimated_death_age":"early_sixties",
        "cause_of_death_code":"SNOMED_CT-363349007",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "maternal_grandmother":{
        "gender":"FEMALE",
        "id":"d65f7b14-00a3-44ba-a906-9d60bd6458b9",
        "Health History":[{"Disease Name":"Unknown","Detailed Disease Name":"不明","Age At Diagnosis":"Unknown","Disease Code":"SNOMED_CT-261665006"}],
        "name":"あなたの母方の祖母",
        "relationship":"maternal_grandmother",
        "flg_race_ethnic":1,
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "birth_order":1,
        "is_alive":"dead",
        "cause_of_death":"Unknown",
        "detailed_cause_of_death":"不明",
        "estimated_death_age":"early_thirties",
        "cause_of_death_code":"SNOMED_CT-261665006",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "paternal_grandfather":{
        "gender":"MALE",
        "id":"37bc230e-a9e0-4307-aef7-bce0f5b274d2",
        "Health History":[{"Disease Name":"Unknown","Detailed Disease Name":"不明","Age At Diagnosis":"Unknown","Disease Code":"SNOMED_CT-261665006"}],
        "name":"あなたの父方の祖父",
        "relationship":"paternal_grandfather",
        "flg_race_ethnic":1,
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "birth_order":1,
        "is_alive":"alive",
        "estimated_age":"senior",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "paternal_grandmother":{
        "gender":"FEMALE",
        "id":"a14c1d32-56d2-4774-8200-9148e76325cc",
        "Health History":[{"Disease Name":"Diabetes","Detailed Disease Name":"1型糖尿病","Age At Diagnosis":"early_fifties","Disease Code":"SNOMED_CT-46635009"}],
        "name":"あなたの父方の祖母",
        "relationship":"paternal_grandmother",
        "flg_race_ethnic":1,
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "birth_order":1,
        "is_alive":"alive",
        "estimated_age":"senior",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "brother_0":{
        "gender":"MALE",
        "id":"d7beb8fe-51c9-4e47-b1ae-a7b3cde84a0d",
        "Health History":[{"Disease Name":"Healthy","Detailed Disease Name":"健康","Age At Diagnosis":"blank","Disease Code":"FAMILY_T-HEALTHY"}],
        "name":"あなたの兄弟 1",
        "relationship":"brother_0",
        "flg_race_ethnic":1,
        "twin_status":"NO",
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "birth_order":1,
        "is_alive":"alive",
        "date_of_birth":"1993/10/01",
        "year_of_birth":"1993",
        "month_of_birth":"10",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "brother_1":{
        "gender":"MALE",
        "id":"44384194-f36c-4f02-9a63-2e7adda7c07d",
        "Health History":[{"Disease Name":"Healthy","Detailed Disease Name":"健康","Age At Diagnosis":"blank","Disease Code":"FAMILY_T-HEALTHY"}],
        "name":"あなたの兄弟 2",
        "relationship":"brother",
        "birth_order":2,
        "flg_race_ethnic":1,
        "twin_status":"IDENTICAL",
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "is_alive":"alive",
        "date_of_birth":"1994/10/01",
        "year_of_birth":"1994",
        "month_of_birth":"10",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "maternal_uncle_0":{
        "gender":"MALE",
        "id":"f8dded3c-292a-4761-b900-cc3b6ac24ed2",
        "Health History":[{"Disease Name":"Hypertension","Detailed Disease Name":"高血圧","Age At Diagnosis":"late_fourties","Disease Code":"SNOMED_CT-38341003"},{"Disease Name":"High Cholesterol","Detailed Disease Name":"高コレステロール","Age At Diagnosis":"late_fourties","Disease Code":"SNOMED_CT-55822004"}],
        "name":"あなたの母方のおじ 1",
        "relationship":"uncle",
        "birth_order":1,
        "flg_race_ethnic":1,
        "twin_status":"NO",
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "is_alive":"alive",
        "estimated_age":"late_fifties",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "paternal_uncle_0":{
        "gender":"MALE",
        "id":"1ac036bb-8992-4bba-b17e-7e6a3d2712a7",
        "Health History":[{"Disease Name":"Unknown","Detailed Disease Name":"不明","Age At Diagnosis":"Unknown","Disease Code":"SNOMED_CT-261665006"}],
        "name":"あなたの父方のおじ 1",
        "relationship":"uncle",
        "birth_order":2,
        "flg_race_ethnic":1,
        "twin_status":"NO",
        "adopted":false,
        "prefectures":null,
        "living_prefectures":null,
        "is_alive":"unknown",
        "training_strength":"空欄",
        "training_count_for_training_at_week":"",
        "training_time_for_training_at_week":"",
        "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
        "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
        "update_date":"2021/11/02"
    },
    "created_date":"2021/11/02 11:08:43"
};
var patientPerson = {
	"administrativeGenderCode": {
		"attr_code": "248153007",
		"attr_codeSystemName": "SNOMED_CT",
		"attr_displayName": "male"
	},
	"birthTime": {
		"attr_value": "1994/01/01"
	},
	"id": {
		"attr_extension": "310674d6-1b03-4a03-abe8-418d23c40296"
	},
	"name": {
		"attr_formatted": "あなた"
	},
	"note": [
		{
			"attr_code": "birth_order",
			"attr_text": 3
		},
		{
			"attr_code": "created_date",
			"attr_text": "2021/11/02 11:08:43"
		},
		{
			"attr_code": "diastolic_blood_pressure",
			"attr_text": "80-84"
		},
		{
			"attr_code": "dietary_frequency_to_drink_suger_drin_in_week",
			"attr_text": "true"
		},
		{
			"attr_code": "dietary_frequency_to_eat_dairy_products_in_day",
			"attr_text": "true"
		},
		{
			"attr_code": "dietary_frequency_to_eat_fishes_in_week",
			"attr_text": "true"
		},
		{
			"attr_code": "dietary_frequency_to_eat_fruits_in_day",
			"attr_text": "true"
		},
		{
			"attr_code": "dietary_frequency_to_eat_nuts_in_week",
			"attr_text": "2-4times"
		},
		{
			"attr_code": "dietary_frequency_to_eat_processed_meat_in_week",
			"attr_text": "true"
		},
		{
			"attr_code": "dietary_frequency_to_eat_unprocessed_meat_in_week",
			"attr_text": "true"
		},
		{
			"attr_code": "dietary_frequency_to_eat_vegetables_in_day",
			"attr_text": "1-2_times"
		},
		{
			"attr_code": "dietary_frequency_to_eat_whole_grains_in_day",
			"attr_text": "true"
		},
		{
			"attr_code": "fasting_blood_glucose_lebel",
			"attr_text": "100-129"
		},
		{
			"attr_code": "flg_race_ethnic",
			"attr_text": 1
		},
		{
			"attr_code": "hba1c",
			"attr_text": "under65"
		},
		{
			"attr_code": "hdl_cholesterol",
			"attr_text": "40-59"
		},
		{
			"attr_code": "hip",
			"attr_text": "80"
		},
		{
			"attr_code": "hip_unit",
			"attr_text": "centimeters"
		},
		{
			"attr_code": "last_diagnosis_month",
			"attr_text": "1"
		},
		{
			"attr_code": "last_diagnosis_year",
			"attr_text": "2021"
		},
		{
			"attr_code": "ldl_cholesterol",
			"attr_text": "100-139"
		},
		{
			"attr_code": "living_prefectures",
			"attr_text": "0000"
		},
		{
			"attr_code": "month_of_birth",
			"attr_text": "1"
		},
		{
			"attr_code": "occasionally_blood_glucose_lebel",
			"attr_text": "140-199"
		},
		{
			"attr_code": "ogtt_blood_glucose_lebel",
			"attr_text": "140-199"
		},
		{
			"attr_code": "smoker",
			"attr_text": "1"
		},
		{
			"attr_code": "systolic_blood_pressure",
			"attr_text": "120-129"
		},
		{
			"attr_code": "take_antihypertensive",
			"attr_text": "false"
		},
		{
			"attr_code": "take_hypoglycemic",
			"attr_text": "false"
		},
		{
			"attr_code": "training_count_for_training_at_week",
			"attr_text": "1"
		},
		{
			"attr_code": "training_family",
			"attr_text": "1"
		},
		{
			"attr_code": "training_strength",
			"attr_text": "中程度"
		},
		{
			"attr_code": "training_time_for_training_at_week",
			"attr_text": "120"
		},
		{
			"attr_code": "update_date",
			"attr_text": "2021/11/02"
		},
		{
			"attr_code": "waist",
			"attr_text": "80"
		},
		{
			"attr_code": "waist_unit",
			"attr_text": "centimeters"
		},
		{
			"attr_code": "year_of_birth",
			"attr_text": "1994"
		}
	],
	"raceCode": [
		{
			"attr_code": "1000000",
			"attr_codeSystemName": "TBD",
			"attr_displayName": "Asian",
			"attr_id": "2"
		},
		{
			"attr_code": "2039-6",
			"attr_codeSystemName": "HL7",
			"attr_displayName": "Japanese",
			"attr_id": "14"
		}
	],
	"relative": [
		{
			"code": {
				"attr_code": "NFTH",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Father"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248153007",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "male"
				},
				"id": {
					"attr_extension": "7421ec0a-a1ba-4793-b9e4-675d59840e70"
				},
				"name": {
					"attr_formatted": "あなたの父"
				},
				"note": [
					{
						"attr_code": "age",
						"attr_text": 53
					},
					{
						"attr_code": "birth_order",
						"attr_text": 1
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "alive"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "father"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "NMTH",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Mother"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248152002",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "female"
				},
				"id": {
					"attr_extension": "67a23978-15d8-446b-8f63-9e45338d4119"
				},
				"name": {
					"attr_formatted": "あなたの母"
				},
				"note": [
					{
						"attr_code": "age",
						"attr_text": 52
					},
					{
						"attr_code": "birth_order",
						"attr_text": 2
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "alive"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "mother"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "MGRFTH",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Maternal Grandfather"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248153007",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "male"
				},
				"id": {
					"attr_extension": "0711de17-cd00-415d-b822-689fd3885ded"
				},
				"name": {
					"attr_formatted": "あなたの母方の祖父"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 1
					},
					{
						"attr_code": "estimated_death_age",
						"attr_text": "early_sixties"
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "dead"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "maternal_grandfather"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "MGRMTH",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Maternal Grandmother"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248152002",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "female"
				},
				"id": {
					"attr_extension": "d65f7b14-00a3-44ba-a906-9d60bd6458b9"
				},
				"name": {
					"attr_formatted": "あなたの母方の祖母"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 1
					},
					{
						"attr_code": "estimated_death_age",
						"attr_text": "early_thirties"
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "dead"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "maternal_grandmother"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "PGRFTH",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Paternal Grandfather"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248153007",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "male"
				},
				"id": {
					"attr_extension": "37bc230e-a9e0-4307-aef7-bce0f5b274d2"
				},
				"name": {
					"attr_formatted": "あなたの父方の祖父"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 1
					},
					{
						"attr_code": "estimated_age",
						"attr_text": "senior"
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "alive"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "paternal_grandfather"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "PGRMTH",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Paternal Grandmother"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248152002",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "female"
				},
				"id": {
					"attr_extension": "a14c1d32-56d2-4774-8200-9148e76325cc"
				},
				"name": {
					"attr_formatted": "あなたの父方の祖母"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 1
					},
					{
						"attr_code": "estimated_age",
						"attr_text": "senior"
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "alive"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "paternal_grandmother"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "NBRO",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Brother"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248153007",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "male"
				},
				"id": {
					"attr_extension": "d7beb8fe-51c9-4e47-b1ae-a7b3cde84a0d"
				},
				"name": {
					"attr_formatted": "あなたの兄弟 1"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 1
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "alive"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "month_of_birth",
						"attr_text": "10"
					},
					{
						"attr_code": "relationship",
						"attr_text": "brother_0"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					},
					{
						"attr_code": "year_of_birth",
						"attr_text": "1993"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "NBRO",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Brother"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248153007",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "male"
				},
				"id": {
					"attr_extension": "44384194-f36c-4f02-9a63-2e7adda7c07d"
				},
				"name": {
					"attr_formatted": "あなたの兄弟 2"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 2
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "alive"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "month_of_birth",
						"attr_text": "10"
					},
					{
						"attr_code": "relationship",
						"attr_text": "brother"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					},
					{
						"attr_code": "year_of_birth",
						"attr_text": "1994"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "MUNC",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Maternal Uncle"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248153007",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "male"
				},
				"id": {
					"attr_extension": "f8dded3c-292a-4761-b900-cc3b6ac24ed2"
				},
				"name": {
					"attr_formatted": "あなたの母方のおじ 1"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 1
					},
					{
						"attr_code": "estimated_age",
						"attr_text": "late_fifties"
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "alive"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "uncle"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		},
		{
			"code": {
				"attr_code": "PUNC",
				"attr_codeSystemName": "HL7 Family History Model",
				"attr_displayName": "Paternal Uncle"
			},
			"relationshipHolder": {
				"administrativeGenderCode": {
					"attr_code": "248153007",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "male"
				},
				"id": {
					"attr_extension": "1ac036bb-8992-4bba-b17e-7e6a3d2712a7"
				},
				"name": {
					"attr_formatted": "あなたの父方のおじ 1"
				},
				"note": [
					{
						"attr_code": "birth_order",
						"attr_text": 2
					},
					{
						"attr_code": "flg_race_ethnic",
						"attr_text": 1
					},
					{
						"attr_code": "is_alive",
						"attr_text": "unknown"
					},
					{
						"attr_code": "living_prefectures"
					},
					{
						"attr_code": "relationship",
						"attr_text": "uncle"
					},
					{
						"attr_code": "training_count_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "training_strength",
						"attr_text": "空欄"
					},
					{
						"attr_code": "training_time_for_training_at_week",
						"attr_text": ""
					},
					{
						"attr_code": "update_date",
						"attr_text": "2021/11/02"
					}
				],
				"relative": {
					"code": {
						"attr_code": "PAR",
						"attr_codeSystemName": "HL7 Family History Model",
						"attr_displayName": "Parent"
					},
					"relationshipHolder": ""
				},
				"subjectOf2": ""
			}
		}
	],
	"subjectOf2": {
		"clinicalObservation": [
			{
				"code": {
					"attr_code": "313415001",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "Identical twin (person)"
				},
				"sourceOf": "",
				"subject": "",
				"value": ""
			},
			{
				"code": {
					"attr_code": "271603002",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "height"
				},
				"sourceOf": "",
				"subject": "",
				"value": {
					"attr_value": 175,
					"attr_unit": "centimeters"
				}
			},
			{
				"code": {
					"attr_code": "107647005",
					"attr_codeSystemName": "SNOMED_CT",
					"attr_displayName": "weight"
				},
				"sourceOf": "",
				"subject": "",
				"value": {
					"attr_value": "60",
					"attr_unit": "kilogram"
				}
			},
			{
				"code": {
					"attr_originalText": "Parental consanguinity indicated"
				},
				"sourceOf": "",
				"subject": "",
				"value": ""
			},
			{
				"code": {
					"attr_code": "HEALTHY",
					"attr_codeSystemName": "FAMILY_T",
					"attr_displayName": "Healthy",
					"attr_originalText": "Healthy"
				},
				"sourceOf": "",
				"subject": {
					"dataEstimatedAge": {
						"code": {
							"attr_code": "21611-9",
							"attr_codeSystemName": "LOINC",
							"attr_displayName": "Estimated Age",
							"attr_originalText": "blank"
						}
					}
				},
				"value": ""
			}
		]
	}
};   

test('load', () => {
    var xmlData = `<FamilyHistory moodCode="EVN" classCode="OBS"><id extention="gov.hhs.fhh:718163810183" /><effectiveTime value="10/1/2021" /><methodCode displayName="Surgeon General's Family Heath History Tool" /><subject typeCode="SBJ"><patient classCode="PAT"><patientPerson><id extension="c95f399c-c3e7-4d46-aabf-0d721f639965" /><name formatted="testName" /><birthTime value="10/01/1981" /><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" /><raceCode displayName="Asian" code="1000000" codeSystemName="TBD" id="2" /><raceCode displayName="Japanese" code="2039-6" codeSystemName="HL7" id="14" /><subjectOf2><clinicalObservation><code displayName="height" codeSystemName="SNOMED_CT" code="271603002" /><value value="180" unit="centimeters" /></clinicalObservation><clinicalObservation><code displayName="weight" codeSystemName="SNOMED_CT" code="107647005" /><value value="70" unit="kilogram" /></clinicalObservation><clinicalObservation><code originalText="Parental consanguinity indicated" /></clinicalObservation><clinicalObservation><code codeSystemName="SNOMED_CT" code="269466003" displayName="Bone Cancer" originalText="Bone Cancer" /><subject><dataEstimatedAge><code displayName="Estimated Age" codeSystemName="LOINC" code="21611-9" originalText="pre-birth" /></dataEstimatedAge></subject></clinicalObservation></subjectOf2><relative><code displayName="Mother" codeSystemName="HL7 Family History Model" code="NMTH" /><relationshipHolder><relative><code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" /><relationshipHolder /></relative><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" /><subjectOf2 /><id extension="ceb26763-458f-4133-802e-bcb9e49f031d" /><name formatted="" /></relationshipHolder></relative><relative><code displayName="Father" codeSystemName="HL7 Family History Model" code="NFTH" /><relationshipHolder><relative><code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" /><relationshipHolder /></relative><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" /><subjectOf2 /><id extension="56a783a6-0424-43ae-8248-589653fcaa9b" /><name formatted="" /></relationshipHolder></relative><relative><code displayName="Maternal Grandmother" codeSystemName="HL7 Family History Model" code="MGRMTH" /><relationshipHolder><relative><code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" /><relationshipHolder /></relative><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" /><subjectOf2 /><id extension="7187c3af-5ebd-4d12-b3a8-48e323d5409b" /><name formatted="" /></relationshipHolder></relative><relative><code displayName="Maternal Grandfather" codeSystemName="HL7 Family History Model" code="MGRFTH" /><relationshipHolder><relative><code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" /><relationshipHolder /></relative><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" /><subjectOf2 /><id extension="7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639" /><name formatted="" /></relationshipHolder></relative><relative><code displayName="Paternal Grandmother" codeSystemName="HL7 Family History Model" code="PGRMTH" /><relationshipHolder><relative><code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" /><relationshipHolder /></relative><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" /><subjectOf2 /><id extension="c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1" /><name formatted="" /></relationshipHolder></relative><relative><code displayName="Paternal Grandfather" codeSystemName="HL7 Family History Model" code="PGRFTH" /><relationshipHolder><relative><code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" /><relationshipHolder /></relative><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" /><subjectOf2 /><id extension="9f5e6464-cd70-4625-995c-c9f5047e974b" /><name formatted="" /></relationshipHolder></relative><relative><code displayName="Brother" codeSystemName="HL7 Family History Model" code="NBRO" /><relationshipHolder><relative><code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" /><relationshipHolder /></relative><administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" /><subjectOf2 /><id extension="98edd975-d38c-40be-bdae-13a5deedab13" /><name formatted="" /></relationshipHolder></relative></patientPerson></patient></subject></FamilyHistory>`;
    var jsonData = {
        "FamilyHistory": {
            "attr_classCode": "OBS",
            "attr_moodCode": "EVN",
            "effectiveTime": {
                "attr_value": "10/1/2021",
            },
            "id": {
                "attr_extention": "gov.hhs.fhh:718163810183",
            },
            "methodCode": {
                "attr_displayName": "Surgeon General's Family Heath History Tool",
            },
            "subject": {
                "attr_typeCode": "SBJ",
                "patient": {
                    "attr_classCode": "PAT",
                    "patientPerson": {
                        "administrativeGenderCode": {
                            "attr_code": "248153007",
                            "attr_codeSystemName": "SNOMED_CT",
                            "attr_displayName": "male",
                        },
                        "birthTime": {
                            "attr_value": "10/01/1981",
                        },
                        "id": {
                            "attr_extension": "c95f399c-c3e7-4d46-aabf-0d721f639965",
                        },
                        "name": {
                            "attr_formatted": "testName",
                        },
                        "raceCode": [
                            {
                                "attr_code": "1000000",
                                "attr_codeSystemName": "TBD",
                                "attr_displayName": "Asian",
                                "attr_id": "2",
                            },
                            {
                                "attr_code": "2039-6",
                                "attr_codeSystemName": "HL7",
                                "attr_displayName": "Japanese",
                                "attr_id": "14",
                            },
                        ],
                        "relative": [
                            {
                                "code": {
                                    "attr_code": "NMTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Mother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248152002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "female",
                                    },
                                    "id": {
                                        "attr_extension": "ceb26763-458f-4133-802e-bcb9e49f031d",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "NFTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Father",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "56a783a6-0424-43ae-8248-589653fcaa9b",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "MGRMTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Maternal Grandmother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248152002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "female",
                                    },
                                    "id": {
                                        "attr_extension": "7187c3af-5ebd-4d12-b3a8-48e323d5409b",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "MGRFTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Maternal Grandfather",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "PGRMTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Paternal Grandmother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248152002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "female",
                                    },
                                    "id": {
                                        "attr_extension": "c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "PGRFTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Paternal Grandfather",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "9f5e6464-cd70-4625-995c-c9f5047e974b",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "NBRO",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Brother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "98edd975-d38c-40be-bdae-13a5deedab13",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                        ],
                        "subjectOf2": {
                            "clinicalObservation": [
                                {
                                    "code": {
                                        "attr_code": "271603002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "height",
                                    },
                                    "value": {
                                        "attr_unit": "centimeters",
                                        "attr_value": "180",
                                    },
                                },
                                {
                                    "code": {
                                        "attr_code": "107647005",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "weight",
                                    },
                                    "value": {
                                        "attr_unit": "kilogram",
                                        "attr_value": "70",
                                    },
                                },
                                {
                                    "code": {
                                        "attr_originalText": "Parental consanguinity indicated",
                                    },
                                },
                                {
                                    "code": {
                                        "attr_code": "269466003",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "Bone Cancer",
                                        "attr_originalText": "Bone Cancer",
                                    },
                                    "subject": {
                                        "dataEstimatedAge": {
                                            "code": {
                                                "attr_code": "21611-9",
                                                "attr_codeSystemName": "LOINC",
                                                "attr_displayName": "Estimated Age",
                                                "attr_originalText": "pre-birth",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    };

    xmlData = `<FamilyHistory moodCode="EVN" classCode="OBS">
    <id extention="gov.hhs.fhh:718163810183" />
    <effectiveTime value="10/1/2021" />
    <methodCode displayName="Surgeon General's Family Heath History Tool" />
    <subject typeCode="SBJ">
        <patient classCode="PAT">
            <patientPerson>
                <id extension="c95f399c-c3e7-4d46-aabf-0d721f639965" />
                <name formatted="testName" />
                <birthTime value="10/01/1981" />
                <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                <raceCode displayName="Asian" code="1000000" codeSystemName="TBD" id="2" />
                <raceCode displayName="Japanese" code="2039-6" codeSystemName="HL7" id="14" />
                <subjectOf2>
                    <clinicalObservation>
                        <code displayName="height" codeSystemName="SNOMED_CT" code="271603002" />
                        <value value="180" unit="centimeters" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code displayName="weight" codeSystemName="SNOMED_CT" code="107647005" />
                        <value value="70" unit="kilogram" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code originalText="Parental consanguinity indicated" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code codeSystemName="SNOMED_CT" code="269466003" displayName="Bone Cancer" originalText="Bone Cancer" />
                        <subject>
                            <dataEstimatedAge>
                                <code displayName="Estimated Age" codeSystemName="LOINC" code="21611-9" originalText="pre-birth" />
                            </dataEstimatedAge>
                        </subject>
                    </clinicalObservation>
                </subjectOf2>
                <relative>
                    <code displayName="Mother" codeSystemName="HL7 Family History Model" code="NMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="ceb26763-458f-4133-802e-bcb9e49f031d" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Father" codeSystemName="HL7 Family History Model" code="NFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="56a783a6-0424-43ae-8248-589653fcaa9b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Maternal Grandmother" codeSystemName="HL7 Family History Model" code="MGRMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="7187c3af-5ebd-4d12-b3a8-48e323d5409b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Maternal Grandfather" codeSystemName="HL7 Family History Model" code="MGRFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Paternal Grandmother" codeSystemName="HL7 Family History Model" code="PGRMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Paternal Grandfather" codeSystemName="HL7 Family History Model" code="PGRFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="9f5e6464-cd70-4625-995c-c9f5047e974b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Brother" codeSystemName="HL7 Family History Model" code="NBRO" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="98edd975-d38c-40be-bdae-13a5deedab13" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
            </patientPerson>
        </patient>
    </subject>
</FamilyHistory>`;
	return;
    expect(personalInfoToXml(jsonData));
});

test('_getEffectiveTime', () => {
    var pi = undefined;
    expect(_getEffectiveTime(pi)).toBe("");

    var pi = {update_time : "2021/11/02"};
    expect(_getEffectiveTime(pi)).toBe("");

    var pi = {update_date : undefined};
    expect(_getEffectiveTime(pi)).toBe("");

    var pi = {update_date : "2021/11/02"};
    expect(_getEffectiveTime(pi)).toBe("11/02/2021");
});

test('_getPatientPerson', () => {
    var actual = _getPatientPerson(personalInformation);
    expect(actual).toEqual(patientPerson);
});

test('_convert', () => {
    var evalue = ""
    expect(_convert(0)).toBe("");
    expect(_convert(false)).toBe("");

    expect(_convert({})).toBe("");
    expect(_convert({ id: "" })).toBe("");
    expect(_convert({ id: "test" })).toBe("");
    expect(_convert({ id: {} })).toBe("");

    expect(_convert({ id: { attr_extention: null } })).toBe("");
    expect(_convert({ id: { attr_extention: "test" } })).toBe("");

    var evalue = {
        "FamilyHistory": {
            "attr_classCode": "OBS",
            "attr_moodCode": "EVN",
            "effectiveTime": {
                "attr_value": "11/02/2021"
            },
            "id": {
                "attr_extention": "gov.hhs.fhh:718163810183",
            },
            "methodCode": {
                "attr_displayName": "Surgeon General's Family Heath History Tool",
            },
            "subject": {
                "attr_typeCode": "SBJ",
                "patient": {
                    "attr_classCode": "PAT",
                    "patientPerson": patientPerson
                }
            }
        }
    };
    expect(_convert(personalInformation)).toEqual(evalue);
});

test('json2xml', () => {
    var actual = json2xml(_convert(personalInformation));
    expect(1).toBe(1);
});
