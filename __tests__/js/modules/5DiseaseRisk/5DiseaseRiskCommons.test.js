/**
 * 
 */
 import { FiveDiseaseRiskCommons } from '../../../../js/modules/5DiseaseRisk/5DiseaseRiskCommons';
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



test('isAgeGreaterThanOrEqualTo', () => {
    // tureの場合 piにageがある場合
    var pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(20, pi)).toEqual(true);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(20, pi)).toEqual(true);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(20, pi)).toEqual(true);

    // falseの場合
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(50, pi)).toEqual(false);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(50, pi)).toEqual(false);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(50, pi)).toEqual(false);

    // falseの場合 年齢指定が空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo('', pi)).toEqual(false);

    // falseの場合 年齢指定がundefined
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(undefined, pi)).toEqual(false);
    
    // falseの場合 年齢指定がnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(20, '')).toEqual(false);
    
    // falseの場合 piがundefiened
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(20, undefined)).toEqual(false);
    
    // falseの場合 piがnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThanOrEqualTo(20, null)).toEqual(false);
});

test('isAgeGreaterThan', () => {
    // tureの場合 piにageがある場合
    var pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(20, pi)).toEqual(true);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(20, pi)).toEqual(true);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(20, pi)).toEqual(true);

    // falseの場合
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(50, pi)).toEqual(false);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(50, pi)).toEqual(false);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(50, pi)).toEqual(false);

    // falseの場合 年齢指定が空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan('', pi)).toEqual(false);

    // falseの場合 年齢指定がundefined
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(undefined, pi)).toEqual(false);
    
    // falseの場合 年齢指定がnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(20, '')).toEqual(false);
    
    // falseの場合 piがundefiened
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(20, undefined)).toEqual(false);
    
    // falseの場合 piがnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeGreaterThan(20, null)).toEqual(false);
});

test('isAgeLessThanOrEquaTo', () => {
    // tureの場合 piにageがある場合
    var pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(50, pi)).toEqual(true);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(50, pi)).toEqual(true);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(50, pi)).toEqual(true);

    // falseの場合
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(20, pi)).toEqual(false);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(20, pi)).toEqual(false);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(20, pi)).toEqual(false);

    // falseの場合 年齢指定が空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo('', pi)).toEqual(false);

    // falseの場合 年齢指定がundefined
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(undefined, pi)).toEqual(false);
    
    // falseの場合 年齢指定がnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(50, '')).toEqual(false);
    
    // falseの場合 piがundefiened
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(50, undefined)).toEqual(false);
    
    // falseの場合 piがnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThanOrEquaTo(50, null)).toEqual(false);
});

test('isAgeLessThan', () => {
    // tureの場合 piにageがある場合
    var pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(50, pi)).toEqual(true);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(50, pi)).toEqual(true);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(50, pi)).toEqual(true);

    // falseの場合
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(20, pi)).toEqual(false);

    // tureの場合　piに生年月日がある場合
    pi = {"date_of_birth": "1993/10/01", "year_of_birth": "1993", "month_of_birth": "10"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(20, pi)).toEqual(false);

    // tureの場合  piに年齢幅がある場合
    pi = {"estimated_age": "late_twenties"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(20, pi)).toEqual(false);

    // falseの場合 年齢指定が空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan('', pi)).toEqual(false);

    // falseの場合 年齢指定がundefined
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(undefined, pi)).toEqual(false);
    
    // falseの場合 年齢指定がnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(50, '')).toEqual(false);
    
    // falseの場合 piがundefiened
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(50, undefined)).toEqual(false);
    
    // falseの場合 piがnull
    pi = {"age":"30"};
    expect(FiveDiseaseRiskCommons.isAgeLessThan(50, null)).toEqual(false);
});

test('isDiesaseMatch', () => {
    // trueの場合
    var pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('FAMILY_T-HEALTHY', pi)).toEqual(true);

    // falseの場合
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('SNOMED_CT-38341003', pi)).toEqual(false);

    // falseの場合 disease_nameが空文字の場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('', pi)).toEqual(false);

    // falseの場合 disease_nameがundefinedの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatch(undefined, pi)).toEqual(false);
    
    // falseの場合 disease_nameがnullの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatch(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字の場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('SNOMED_CT-38341003', '')).toEqual(false);
    
    // falseの場合 piがundefiendの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('SNOMED_CT-38341003', undefined)).toEqual(false);
    
    // falseの場合 piがnullの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('SNOMED_CT-38341003', null)).toEqual(false);
    
    // falseの場合 piのHealth Historyが空文字の場合
    pi = {"Health History":''};
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('SNOMED_CT-38341003', pi)).toEqual(false);
    
    // falseの場合 piのHealth Historyundefiendの場合
    pi = {"Health History":undefined};
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('SNOMED_CT-38341003', pi)).toEqual(false);
    
    // falseの場合 piのHealth Historynullの場合
    pi = {"Health History":null};
    expect(FiveDiseaseRiskCommons.isDiesaseMatch('SNOMED_CT-38341003', pi)).toEqual(false);
});

test('isDiesaseMatchOr', () => {
    // trueの場合
    var pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr(['FAMILY_T-HEALTHY'], pi)).toEqual(true);
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr(['SNOMED_CT-38341003'], pi)).toEqual(true);
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr(['FAMILY_T-HEALTHY','SNOMED_CT-38341003'], pi)).toEqual(true);
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr(['FAMILY_T-HEALTHY','SNOMED_CT-38399003'], pi)).toEqual(true);

    // falseの場合
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr(['FAMILY_T-XXXXXX','SNOMED_CT-30000003'], pi)).toEqual(false);
    

    // falseの場合 disease_nameが空文字の場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr('', pi)).toEqual(false);

    // falseの場合 disease_nameがundefinedの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr(undefined, pi)).toEqual(false);
    
    // falseの場合 disease_nameがnullの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字の場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr('SNOMED_CT-38341003', '')).toEqual(false);
    
    // falseの場合 piがundefiendの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr('SNOMED_CT-38341003', undefined)).toEqual(false);
    
    // falseの場合 piがnullの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr('SNOMED_CT-38341003', null)).toEqual(false);
    
    // falseの場合 piのHealth Historyが空文字の場合
    pi = {"Health History":''};
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr('SNOMED_CT-38341003', pi)).toEqual(false);
    
    // falseの場合 piのHealth Historyundefiendの場合
    pi = {"Health History":undefined};
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr('SNOMED_CT-38341003', pi)).toEqual(false);
    
    // falseの場合 piのHealth Historynullの場合
    pi = {"Health History":null};
    expect(FiveDiseaseRiskCommons.isDiesaseMatchOr('SNOMED_CT-38341003', pi)).toEqual(false);
});

test('isDiesaseMatchAnd', () => {
    // trueの場合
    var pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd(['FAMILY_T-HEALTHY'], pi)).toEqual(true);
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd(['SNOMED_CT-38341003'], pi)).toEqual(true);
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd(['FAMILY_T-HEALTHY','SNOMED_CT-38341003'], pi)).toEqual(true);
    
    // falseの場合
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd(['FAMILY_T-HEALTHY','SNOMED_CT-38399003'], pi)).toEqual(false);
    pi = {
        "Health History":[
            { "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" },
            { "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }
        ]
    };
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd(['FAMILY_T-XXXXXX','SNOMED_CT-30000003'], pi)).toEqual(false);

    // falseの場合 disease_nameが空文字の場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd('', pi)).toEqual(false);

    // falseの場合 disease_nameがundefinedの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd(undefined, pi)).toEqual(false);
    
    // falseの場合 disease_nameがnullの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字の場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd('SNOMED_CT-38341003', '')).toEqual(false);
    
    // falseの場合 piがundefiendの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd('SNOMED_CT-38341003', undefined)).toEqual(false);
    
    // falseの場合 piがnullの場合
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd('SNOMED_CT-38341003', null)).toEqual(false);
    
    // falseの場合 piのHealth Historyが空文字の場合
    pi = {"Health History":''};
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd('SNOMED_CT-38341003', pi)).toEqual(false);
    
    // falseの場合 piのHealth Historyundefiendの場合
    pi = {"Health History":undefined};
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd('SNOMED_CT-38341003', pi)).toEqual(false);
    
    // falseの場合 piのHealth Historynullの場合
    pi = {"Health History":null};
    expect(FiveDiseaseRiskCommons.isDiesaseMatchAnd('SNOMED_CT-38341003', pi)).toEqual(false);
});

test('isGenderMatch', () => {
    // trueの場合
    var pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch("MALE", pi)).toEqual(true);
    
    // falseの場合
    pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch("FEMALE", pi)).toEqual(false);
    
    // falseの場合 disease_nameが空文字の場合
    pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch("", pi)).toEqual(false);
    
    // falseの場合 disease_nameがundefinedの場合
    pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch(undefined, pi)).toEqual(false);
    
    // falseの場合 disease_nameがnullの場合
    pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch(null, pi)).toEqual(false);
    
    // falseの場合 piが空文字の場合
    pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch("MALE", "")).toEqual(false);
    
    // falseの場合 piがundefiendの場合
    pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch("MALE", undefined)).toEqual(false);
    
    // falseの場合 piがnullの場合
    pi = {"gender": "MALE"};
    expect(FiveDiseaseRiskCommons.isGenderMatch("MALE", null)).toEqual(false);
    
    // falseの場合 piのgenderが空文字の場合
    pi = {"gender": ""};
    expect(FiveDiseaseRiskCommons.isGenderMatch("MALE", pi)).toEqual(false);
    
    // falseの場合 piのgenderがundefiendの場合
    pi = {"gender": undefined};
    expect(FiveDiseaseRiskCommons.isGenderMatch("MALE", pi)).toEqual(false);
    
    // falseの場合 piのgenderがnullの場合
    pi = {"gender": null};
    expect(FiveDiseaseRiskCommons.isGenderMatch("MALE", pi)).toEqual(false);
    
});

test('isAgeAtDiagnosisGreaterThanOrEqualTo', () => {
    // 正常系
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 44, pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 45, pi)).toEqual(true);    
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 46, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 50, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "prebirth", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 44, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "unknown", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 44, pi)).toEqual(false);

    // 異常系
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo(null, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo(undefined, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('', 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 50, null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 50, undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 50, '')).toEqual(false);
});

test('isAgeAtDiagnosisGreaterThan', () => {
    // 正常系
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 44, pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 45, pi)).toEqual(false);    
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 46, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 50, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "prebirth", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 44, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "unknown", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 44, pi)).toEqual(false);

    // 異常系
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan(null, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan(undefined, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('', 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 50, null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 50, undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 50, '')).toEqual(false);
});

test('isAgeAtDiagnosisLessThanOrEquaTo', () => {
    // 正常系
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 50, pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 49, pi)).toEqual(true);    
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 48, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 47, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "prebirth", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 44, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "unknown", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 44, pi)).toEqual(false);

    // 異常系
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo(null, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo(undefined, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('', 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 50, null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 50, undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThanOrEquaTo('SNOMED_CT-38341003', 50, '')).toEqual(false);
});

test('isAgeAtDiagnosisLessThan', () => {
    // 正常系
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 50, pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 49, pi)).toEqual(false);    
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 48, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 47, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "prebirth", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 44, pi)).toEqual(false);
    var pi = {
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "unknown", "Disease Code": "SNOMED_CT-38341003" }, { "Disease Name": "High Cholesterol", "Detailed Disease Name": "高コレステロール", "Age At Diagnosis": "late_fourties", "Disease Code": "SNOMED_CT-55822004" }],
    };
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 44, pi)).toEqual(false);

    // 異常系
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan(null, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan(undefined, 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('', 50, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 50, null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 50, undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.isAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 50, '')).toEqual(false);
});

test('areDiseaseAndGenderMatch', () => {
    // 正常系
    var pi = null;
    pi = {
        "gender": "MALE",
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }]
    }
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', 'MALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('SNOMED_CT-46635009', 'MALE', pi)).toEqual(false);
    pi = {
        "gender": "FEMALE",
        "Health History": [{ "Disease Name": "Diabetes", "Detailed Disease Name": "1型糖尿病", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-46635009" }],
    }
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('SNOMED_CT-46635009', 'FEMALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('SNOMED_CT-46635009', 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', 'MALE', pi)).toEqual(false);

    //　不正系
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch(null, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch(undefined, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('', 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', 'MALE', null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', 'MALE', undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areDiseaseAndGenderMatch('FAMILY_T-HEALTHY', 'MALE', '')).toEqual(false);
});

test('areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo', () => {
    // 正常系
    var pi = null;
    pi = {
        "gender": "MALE",
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 49, 'MALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 51, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-38341003', 49, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-46635009', 49, 'MALE', pi)).toEqual(false);
    pi = {
        "gender": "FEMALE",
        "Health History": [{ "Disease Name": "Diabetes", "Detailed Disease Name": "1型糖尿病", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-46635009" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-46635009', 49, 'FEMALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-46635009', 50, 'FEMALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-46635009', 51, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('SNOMED_CT-46635009', 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', 49, 'FEMALE', pi)).toEqual(false);

    //　不正系
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo(null, 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo(undefined, 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('', 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', null, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', undefined, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', '', 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', 49, null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', 49, undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', 49, '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', 49, 'MALE', null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', 49, 'MALE', undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThanOrEqualTo('FAMILY_T-HEALTHY', 49, 'MALE', '')).toEqual(false);
});

test('areGenderMatchAndAgeAtDiagnosisGreaterThan', () => {
    // 正常系
    var pi = null;
    pi = {
        "gender": "MALE",
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 49, 'MALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 50, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 51, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-38341003', 49, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-46635009', 49, 'MALE', pi)).toEqual(false);
    pi = {
        "gender": "FEMALE",
        "Health History": [{ "Disease Name": "Diabetes", "Detailed Disease Name": "1型糖尿病", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-46635009" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-46635009', 49, 'FEMALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-46635009', 50, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-46635009', 51, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('SNOMED_CT-46635009', 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', 49, 'FEMALE', pi)).toEqual(false);

    //　不正系
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan(null, 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan(undefined, 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('', 49, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', null, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', undefined, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', '', 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', 49, null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', 49, undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', 49, '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', 49, 'MALE', null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', 49, 'MALE', undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisGreaterThan('FAMILY_T-HEALTHY', 49, 'MALE', '')).toEqual(false);
});

test('areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo', () => {
    // 正常系
    var pi = null;
    pi = {
        "gender": "MALE",
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-38341003', 53, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-38341003', 54, 'MALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-38341003', 55, 'MALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-38341003', 55, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-46635009', 55, 'MALE', pi)).toEqual(false);
    pi = {
        "gender": "FEMALE",
        "Health History": [{ "Disease Name": "Diabetes", "Detailed Disease Name": "1型糖尿病", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-46635009" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-46635009', 53, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-46635009', 54, 'FEMALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-46635009', 55, 'FEMALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('SNOMED_CT-46635009', 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', 55, 'FEMALE', pi)).toEqual(false);

    //　不正系
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo(null, 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo(undefined, 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('', 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', null, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', undefined, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', '', 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', 55, null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', 55, undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', 55, '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', 55, 'MALE', null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', 55, 'MALE', undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThanOrEqualTo('FAMILY_T-HEALTHY', 55, 'MALE', '')).toEqual(false);
});

test('areGenderMatchAndAgeAtDiagnosisLessThan', () => {
    // 正常系
    var pi = null;
    pi = {
        "gender": "MALE",
        "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 53, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 54, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 55, 'MALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-38341003', 55, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-46635009', 55, 'MALE', pi)).toEqual(false);
    pi = {
        "gender": "FEMALE",
        "Health History": [{ "Disease Name": "Diabetes", "Detailed Disease Name": "1型糖尿病", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-46635009" }],
    }
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-46635009', 53, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-46635009', 54, 'FEMALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-46635009', 55, 'FEMALE', pi)).toEqual(true);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('SNOMED_CT-46635009', 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', 55, 'FEMALE', pi)).toEqual(false);

    //　不正系
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan(null, 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan(undefined, 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('', 55, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', null, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', undefined, 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', '', 'MALE', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', 55, null, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', 55, undefined, pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', 55, '', pi)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', 55, 'MALE', null)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', 55, 'MALE', undefined)).toEqual(false);
    expect(FiveDiseaseRiskCommons.areGenderMatchAndAgeAtDiagnosisLessThan('FAMILY_T-HEALTHY', 55, 'MALE', '')).toEqual(false);
});

