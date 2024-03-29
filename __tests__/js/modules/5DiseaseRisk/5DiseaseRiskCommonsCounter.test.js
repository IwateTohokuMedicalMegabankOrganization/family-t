/**
 * 
 */
 import { FiveDiseaseRiskCommonsCounter } from '../../../../js/modules/5DiseaseRisk/5DiseaseRiskCommonsCounter';
 import { RelativeUtil } from  '../../../../js/modules/xmlTagUtil';


 var personalInformation = {
    "name": "あなた",
    "twin_status": "IDENTICAL",
    "prefectures": null,
    "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
    "flg_race_ethnic": 1,
    "id": "310674d6-1b03-4a03-abe8-418d23c40296",
    "gender": "MALE",
    "date_of_birth": "1994/01/01",
    "adopted": false,
    "height": 175,
    "height_unit": "centimeters",
    "weight": "60",
    "weight_unit": "kilogram",
    "month_of_birth": "1",
    "year_of_birth": "1994",
    "birth_order": 3,
    "living_prefectures": "0000",
    "waist": "80",
    "waist_unit": "centimeters",
    "hip": "80",
    "hip_unit": "centimeters",
    "smoker": "1",
    "training_family": "1",
    "training_strength": "中程度",
    "training_count_for_training_at_week": "1",
    "training_time_for_training_at_week": "120",
    "dietary_frequency_to_eat_fruits_in_day": "true",
    "dietary_frequency_to_eat_vegetables_in_day": "1-2_times",
    "dietary_frequency_to_eat_nuts_in_week": "2-4times",
    "dietary_frequency_to_eat_whole_grains_in_day": "true",
    "dietary_frequency_to_eat_fishes_in_week": "true",
    "dietary_frequency_to_eat_dairy_products_in_day": "true",
    "dietary_frequency_to_eat_processed_meat_in_week": "true",
    "dietary_frequency_to_eat_unprocessed_meat_in_week": "true",
    "dietary_frequency_to_drink_suger_drin_in_week": "true",
    "take_antihypertensive": "false",
    "systolic_blood_pressure": "120-129",
    "diastolic_blood_pressure": "80-84",
    "take_hypoglycemic": "false",
    "fasting_blood_glucose_lebel": "100-129",
    "occasionally_blood_glucose_lebel": "140-199",
    "ogtt_blood_glucose_lebel": "140-199",
    "hba1c": "under65",
    "hdl_cholesterol": "40-59",
    "ldl_cholesterol": "100-139",
    "last_diagnosis_year": "2021",
    "last_diagnosis_month": "1",
    "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
    "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
    "update_date": "2021/11/02",
    "father": {
        "gender": "MALE",
        "id": "7421ec0a-a1ba-4793-b9e4-675d59840e70",
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        "name": "あなたの父",
        "relationship": "father",
        "flg_race_ethnic": 1,
        "twin_status": "NO",
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "birth_order": 1,
        "is_alive": "alive",
        "age": 53,
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "mother": {
        "gender": "FEMALE",
        "id": "67a23978-15d8-446b-8f63-9e45338d4119",
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "name": "あなたの母",
        "relationship": "mother",
        "flg_race_ethnic": 1,
        "twin_status": "NO",
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "birth_order": 2,
        "is_alive": "alive",
        "age": 52,
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "maternal_grandfather": {
        "gender": "MALE",
        "id": "0711de17-cd00-415d-b822-689fd3885ded",
        "Health History": [{ "Disease Name": "Cancer", "Detailed Disease Name": "胃がん", "Age At Diagnosis": "late_fifties", "Disease Code": "SNOMED_CT-363349007" }],
        "name": "あなたの母方の祖父",
        "relationship": "maternal_grandfather",
        "flg_race_ethnic": 1,
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "birth_order": 1,
        "is_alive": "dead",
        "cause_of_death": "Cancer",
        "detailed_cause_of_death": "胃がん",
        "estimated_death_age": "early_sixties",
        "cause_of_death_code": "SNOMED_CT-363349007",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "maternal_grandmother": {
        "gender": "FEMALE",
        "id": "d65f7b14-00a3-44ba-a906-9d60bd6458b9",
        "Health History": [{ "Disease Name": "Unknown", "Detailed Disease Name": "不明", "Age At Diagnosis": "Unknown", "Disease Code": "SNOMED_CT-261665006" }],
        "name": "あなたの母方の祖母",
        "relationship": "maternal_grandmother",
        "flg_race_ethnic": 1,
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "birth_order": 1,
        "is_alive": "dead",
        "cause_of_death": "Unknown",
        "detailed_cause_of_death": "不明",
        "estimated_death_age": "early_thirties",
        "cause_of_death_code": "SNOMED_CT-261665006",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "paternal_grandfather": {
        "gender": "MALE",
        "id": "37bc230e-a9e0-4307-aef7-bce0f5b274d2",
        "Health History": [{ "Disease Name": "Unknown", "Detailed Disease Name": "不明", "Age At Diagnosis": "Unknown", "Disease Code": "SNOMED_CT-261665006" }],
        "name": "あなたの父方の祖父",
        "relationship": "paternal_grandfather",
        "flg_race_ethnic": 1,
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "birth_order": 1,
        "is_alive": "alive",
        "estimated_age": "senior",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "paternal_grandmother": {
        "gender": "FEMALE",
        "id": "a14c1d32-56d2-4774-8200-9148e76325cc",
        "Health History": [{ "Disease Name": "Diabetes", "Detailed Disease Name": "1型糖尿病", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-46635009" }],
        "name": "あなたの父方の祖母",
        "relationship": "paternal_grandmother",
        "flg_race_ethnic": 1,
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "birth_order": 1,
        "is_alive": "alive",
        "estimated_age": "senior",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "brother_0": {
        "gender": "MALE",
        "id": "d7beb8fe-51c9-4e47-b1ae-a7b3cde84a0d",
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "name": "あなたの兄弟 1",
        "relationship": "brother_0",
        "flg_race_ethnic": 1,
        "twin_status": "NO",
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "birth_order": 1,
        "is_alive": "alive",
        "date_of_birth": "1993/10/01",
        "year_of_birth": "1993",
        "month_of_birth": "10",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "brother_1": {
        "gender": "MALE",
        "id": "44384194-f36c-4f02-9a63-2e7adda7c07d",
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "name": "あなたの兄弟 2",
        "relationship": "brother",
        "birth_order": 2,
        "flg_race_ethnic": 1,
        "twin_status": "IDENTICAL",
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "is_alive": "alive",
        "date_of_birth": "1994/10/01",
        "year_of_birth": "1994",
        "month_of_birth": "10",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "maternal_uncle_0": {
        "gender": "MALE",
        "id": "f8dded3c-292a-4761-b900-cc3b6ac24ed2",
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
        "name": "あなたの母方のおじ 1",
        "relationship": "uncle",
        "birth_order": 1,
        "flg_race_ethnic": 1,
        "twin_status": "NO",
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "is_alive": "alive",
        "estimated_age": "late_fifties",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "paternal_uncle_0": {
        "gender": "MALE",
        "id": "1ac036bb-8992-4bba-b17e-7e6a3d2712a7",
        "Health History": [{ "Disease Name": "Unknown", "Detailed Disease Name": "不明", "Age At Diagnosis": "Unknown", "Disease Code": "SNOMED_CT-261665006" }],
        "name": "あなたの父方のおじ 1",
        "relationship": "uncle",
        "birth_order": 2,
        "flg_race_ethnic": 1,
        "twin_status": "NO",
        "adopted": false,
        "prefectures": null,
        "living_prefectures": null,
        "is_alive": "unknown",
        "training_strength": "空欄",
        "training_count_for_training_at_week": "",
        "training_time_for_training_at_week": "",
        "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false },
        "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false },
        "update_date": "2021/11/02"
    },
    "created_date": "2021/11/02 11:08:43"
};


test('countDiseasePersonInRelatives', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'FAMILY_T-HEALTHY', pi)).toEqual(3);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-38341003', pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-46635009', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-XXXXXXXX', pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(null, 'SNOMED_CT-38341003', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(undefined, 'SNOMED_CT-38341003', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives('', 'SNOMED_CT-38341003', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-38341003', null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-38341003', undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelatives(relatives, 'SNOMED_CT-38341003', '')).toEqual(0);
});


test('countDiseasePersonInRelativesGreaterThanOrEqualTo', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 44, pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 45, pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 46, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 50, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-XXXXXXXX', 50, pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(null, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(undefined, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo('', 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, null, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, undefined, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, '', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, '')).toEqual(0);
});

test('countDiseasePersonInRelativesGreaterThan', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 44, pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 45, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 46, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-46635009', 49, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-XXXXXXXX', 50, pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(null, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(undefined, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan('', 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, null, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, undefined, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, '', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, '')).toEqual(0);
});

test('countDiseasePersonInRelativesLessThanOrEqualTo', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 55, pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 54, pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 53, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 55, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-XXXXXXXX', 50, pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(null, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(undefined, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo('', 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, null, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, undefined, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, '', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, '')).toEqual(0);
});

test('countDiseasePersonInRelativesLessThan', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 55, pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 54, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 53, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-46635009', 56, pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-XXXXXXXX', 50, pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(null, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(undefined, 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan('', 'SNOMED_CT-38341003', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, null, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, undefined, 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, '', 50, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseasePersonInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, '')).toEqual(0);
});

test('countDiseaseGenderInRelatives', () => {
     // 正常系
     var pi = personalInformation;
     var relatives = RelativeUtil.getALLRelatives();
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'FAMILY_T-HEALTHY', 'MALE', pi)).toEqual(2);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-38341003', 'MALE', pi)).toEqual(2);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-46635009', 'MALE', pi)).toEqual(0);     
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-XXXXXXXX', 'MALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'FAMILY_T-HEALTHY', 'FEMALE', pi)).toEqual(1);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-55822004', 'FEMALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-46635009', 'FEMALE', pi)).toEqual(1);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-XXXXXXXX', 'FEMALE', pi)).toEqual(0);
 
     // 異常系
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(null, 'SNOMED_CT-38341003', 'MALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(undefined, 'SNOMED_CT-38341003', 'MALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives('', 'SNOMED_CT-38341003', 'MALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, null, 'MALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, undefined, 'MALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, '', 'MALE', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-38341003', null, pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-38341003', undefined, pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-38341003', '', pi)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-38341003', 'MALE', null)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-38341003', 'MALE', undefined)).toEqual(0);
     expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelatives(relatives, 'SNOMED_CT-38341003', 'MALE', '')).toEqual(0);
});

test('countDiseaseGenderInRelativesGreaterThanOrEqualTo', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 44, 'MALE', pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 45, 'MALE', pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 46, 'MALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 49, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 49, 'FEMALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 50, 'FEMALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 51, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'FEMALE', pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(null, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(undefined, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo('', 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, null, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, undefined, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, '', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', null, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', undefined, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', '', 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, 'MALE', null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, 'MALE', undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, 'MALE', '')).toEqual(0);
});

test('countDiseaseGenderInRelativesGreaterThan', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 44, 'MALE', pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 45, 'MALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 46, 'MALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-46635009', 49, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 49, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-46635009', 49, 'FEMALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-46635009', 50, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-46635009', 51, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'FEMALE', pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(null, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(undefined, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan('', 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, null, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, undefined, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, '', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', null, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', undefined, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', '', 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, 'MALE', null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, 'MALE', undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesGreaterThan(relatives, 'SNOMED_CT-38341003', 50, 'MALE', '')).toEqual(0);
});

test('countDiseaseGenderInRelativesLessThanOrEqualTo', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 55, 'MALE', pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 54, 'MALE', pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 53, 'MALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 55, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 53, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 53, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 54, 'FEMALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-46635009', 55, 'FEMALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'FEMALE', pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(null, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(undefined, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo('', 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, null, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, undefined, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, '', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', null, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', undefined, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', '', 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, 'MALE', null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, 'MALE', undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThanOrEqualTo(relatives, 'SNOMED_CT-38341003', 50, 'MALE', '')).toEqual(0);
});

test('countDiseaseGenderInRelativesLessThan', () => {
    // 正常系
    var pi = personalInformation;
    var relatives = RelativeUtil.getALLRelatives();
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 55, 'MALE', pi)).toEqual(2);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 54, 'MALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 53, 'MALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-46635009', 56, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 53, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-46635009', 53, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-46635009', 54, 'FEMALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-46635009', 55, 'FEMALE', pi)).toEqual(1);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-XXXXXXXX', 50, 'FEMALE', pi)).toEqual(0);

    // 異常系
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(null, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(undefined, 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan('', 'SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, null, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, undefined, 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, '', 50, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', null, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', undefined, 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', '', 'MALE', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, null, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, undefined, pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, '', pi)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, 'MALE', null)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, 'MALE', undefined)).toEqual(0);
    expect(FiveDiseaseRiskCommonsCounter.countDiseaseGenderInRelativesLessThan(relatives, 'SNOMED_CT-38341003', 50, 'MALE', '')).toEqual(0);
});
