/**
 * 腹部大動脈瘤AAA疾患リスク計算のテストクラス
 */
 import { AaaRisk } from '../../../../js/modules/5DiseaseRisk/aaaRisk';

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

/**
 * A1~A3：65歳以上の男性や65歳以上の喫煙女性，第一度近親者に家族歴を有する者
 */
 test('isMatchToA1-A3', () => {
    var pi = null;
    var aaaRisk = new AaaRisk();

    // 正常系
    // 本人が65歳以上の男性で第一度近親者に腹部大動脈瘤の病歴なし
    pi = {
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "gender": "MALE",
        "date_of_birth": "1955/01/01",
        "month_of_birth": "1",
        "year_of_birth": "1955",
        "birth_order": 3,
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_0": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_1": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
    };
    expect(true).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(pi));

    // 本人が65歳以上の女性喫煙者（現在）で第一度近親者に腹部大動脈瘤の病歴なし
    pi = {
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "gender": "FEMALE",
        "date_of_birth": "1955/01/01",
        "month_of_birth": "1",
        "year_of_birth": "1955",
        "birth_order": 3,
        "smoker": "5",
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_0": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_1": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
    };
    expect(true).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(pi));

    // 第一度近親者に腹部大動脈瘤の病歴
    pi = {
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "gender": "FEMALE",
        "date_of_birth": "1980/01/01",
        "month_of_birth": "1",
        "year_of_birth": "1980",
        "birth_order": 3,
        "smoker": "3",
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_0": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_1": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Cardiovascular Disease", "Detailed Disease Name": "腹部大動脈瘤", "Age At Diagnosis": "late_sixties", "Disease Code": "SNOMED_CT-75878002" }],
        },
    };
    expect(true).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(pi));

    // 本人が65際未満の男性で第一度近親者に腹部大動脈瘤の病歴なし
    pi = {
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "gender": "MALE",
        "date_of_birth": "1980/01/01",
        "month_of_birth": "1",
        "year_of_birth": "1980",
        "birth_order": 3,
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_0": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_1": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
    };
    expect(false).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(pi));

    // 本人が65際以上の女性で第一度近親者に腹部大動脈瘤の病歴なし
    pi = {
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "gender": "FEMALE",
        "date_of_birth": "1940/01/01",
        "month_of_birth": "1",
        "year_of_birth": "1940",
        "birth_order": 3,
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_0": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_1": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
    };
    expect(false).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(pi));

    // 本人が65際未満の女性喫煙者で第一度近親者に腹部大動脈瘤の病歴なし
    pi = {
        "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        "gender": "FEMALE",
        "date_of_birth": "1980/01/01",
        "month_of_birth": "1",
        "year_of_birth": "1980",
        "birth_order": 3,
        "smoker": "5",
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_0": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "brother_1": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
    };
    expect(false).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(pi));


    // 不正系
    expect(false).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(null));
    expect(false).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(undefined));
    expect(false).toEqual(aaaRisk.recommendScreeningByAbdominalEchography(''));
});
