/**
 * 家族性高コレステロール血症FH疾患リスク計算のテストクラス
 */
 import { FhRisk } from '../../../../js/modules/5DiseaseRisk/fhRisk';

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
 * F1-F4：①ー２．【成人（15 歳以上）FH ヘテロ接合体診断基準】p.96
 * 1. 高LDL-C血症（未治療時のLDL-C値180 mg/dL以上）
 */
 test('isMatchToF1', () => {
    var pi = null;
    var fhRisk = new FhRisk();
    
    // 正常系
    // 本人が15歳以上で薬を服用せず中性脂肪・コレステロール値が180mgdL以上
    pi = {
        "date_of_birth": "2007/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2007",
        "cholesterol_medicine": "0",
        "ldl_cholesterol": "over180"
    };
    expect(true).toEqual(fhRisk._isHyperLDLC(pi));

    // 本人が15歳以上で薬を服用せず中性脂肪・コレステロール値が180mgdL未満
    pi = {
        "date_of_birth": "2007/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2007",
        "cholesterol_medicine": "0",
        "ldl_cholesterol": "140-159"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));

    // 本人が15歳以上で薬を服用して中性脂肪・コレステロール値が180mgdL以上
    pi = {
        "date_of_birth": "2007/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2007",
        "cholesterol_medicine": "1",
        "ldl_cholesterol": "over180"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));

    // 本人が15歳以上で薬を服用して中性脂肪・コレステロール値が180mgdL未満
    pi = {
        "date_of_birth": "2007/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2007",
        "cholesterol_medicine": "1",
        "ldl_cholesterol": "140-159"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));

    // 本人が15歳未満で薬を服用せず中性脂肪・コレステロール値が180mgdL以上
    pi = {
        "date_of_birth": "2013/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2013",
        "cholesterol_medicine": "0",
        "ldl_cholesterol": "over180"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));

    // 本人が15歳未満で薬を服用せず中性脂肪・コレステロール値が180mgdL未満
    pi = {
        "date_of_birth": "2013/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2013",
        "cholesterol_medicine": "0",
        "ldl_cholesterol": "140-159"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));

    // 本人が15歳未満で薬を服用して中性脂肪・コレステロール値が180mgdL以上
    pi = {
        "date_of_birth": "2013/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2013",
        "cholesterol_medicine": "1",
        "ldl_cholesterol": "over180"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));

    // 本人が15歳未満で薬を服用して中性脂肪・コレステロール値が180mgdL未満
    pi = {
        "date_of_birth": "2013/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2013",
        "cholesterol_medicine": "1",
        "ldl_cholesterol": "140-159"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));

    // 不正系
    pi = {
        "date_of_birth": "2007/01/01",
        "month_of_birth": "1",
        "year_of_birth": "2007"
    };
    expect(false).toEqual(fhRisk._isHyperLDLC(pi));
    expect(false).toEqual(fhRisk._isHyperLDLC(null));
    expect(false).toEqual(fhRisk._isHyperLDLC(undefined));
    expect(false).toEqual(fhRisk._isHyperLDLC(''));
});

/**
 * F1-F4：①ー２．【成人（15 歳以上）FH ヘテロ接合体診断基準】p.96
 * 3. FH あるいは早発性冠動脈疾患の家族歴（2親等以内）※ 早発性冠動脈疾患は男性55歳未満，女性65歳未満と定義する．
 * ※「2項目以上でFHと診断する。FHヘテロ接合体疑いは遺伝子検査による診断が望ましい」
 */
 test('isMatchToF3', () => {
    var pi = null;
    var fhRisk = new FhRisk();

    // 正常系
    // 第一度から第二度近親者の中に狭心症が55歳未満で診断された男性が1人以上いる。
    pi = {
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Angina(Colonary Artery Disease)", "Detailed Disease Name": "狭心症（冠動脈疾患）", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-194828000" }],
        },
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(true).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に心筋梗塞が55歳未満で診断された男性が1人以上いる。
    pi = {
        "brother_8": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Heart Attack", "Detailed Disease Name": "心筋梗塞（冠動脈疾患）", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-22298006" }],
        },
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(true).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に狭心症が65歳未満で診断された女性が1人以上いる。
    pi = {
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Angina(Colonary Artery Disease)", "Detailed Disease Name": "狭心症（冠動脈疾患）", "Age At Diagnosis": "early_sixties", "Disease Code": "SNOMED_CT-194828000" }],
        },
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(true).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に心筋梗塞が65歳未満で診断された女性が1人以上いる。
    pi = {
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Heart Attack", "Detailed Disease Name": "心筋梗塞（冠動脈疾患）", "Age At Diagnosis": "early_sixties", "Disease Code": "SNOMED_CT-22298006" }],
        },
        "brother_8": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(true).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に狭心症が55歳以上で診断された男性が1人以上いる。
    pi = {
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Angina(Colonary Artery Disease)", "Detailed Disease Name": "狭心症（冠動脈疾患）", "Age At Diagnosis": "late_fifties", "Disease Code": "SNOMED_CT-194828000" }],
        },
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に心筋梗塞が55歳以上で診断された男性が1人以上いる。
    pi = {
        "brother_8": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Heart Attack", "Detailed Disease Name": "心筋梗塞（冠動脈疾患）", "Age At Diagnosis": "late_fifties", "Disease Code": "SNOMED_CT-22298006" }],
        },
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に狭心症が65歳以上で診断された女性が1人以上いる。
    pi = {
        "mother": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Angina(Colonary Artery Disease)", "Detailed Disease Name": "狭心症（冠動脈疾患）", "Age At Diagnosis": "late_sixties", "Disease Code": "SNOMED_CT-194828000" }],
        },
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に心筋梗塞が65歳以上で診断された女性が1人以上いる。
    pi = {
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Heart Attack", "Detailed Disease Name": "心筋梗塞（冠動脈疾患）", "Age At Diagnosis": "late_sixties", "Disease Code": "SNOMED_CT-22298006" }],
        },
        "brother_8": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));
    

    // 不正系
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(null));
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(undefined));
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(''));
});

/**
 * F1-F4：①ー２．【成人（15 歳以上）FH ヘテロ接合体診断基準】p.96
 * 3. FH あるいは早発性冠動脈疾患の家族歴（2親等以内）※ 早発性冠動脈疾患は男性55歳未満，女性65歳未満と定義する．
 * ※「2項目以上でFHと診断する。FHヘテロ接合体疑いは遺伝子検査による診断が望ましい」
 */
 test('isMatchToF4', () => {
    var pi = null;
    var fhRisk = new FhRisk();

    // 正常系
    // 第一度から第二度近親者の中に家族性高コレステロール血症が診断された人が1人以上いる。
    pi = {
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Familial hyperlipoproteinemia", "Detailed Disease Name": "家族性高コレステロール血症", "Age At Diagnosis": "late_sixties", "Disease Code": "SNOMED_CT-238038003" }],
        },
        "brother_8": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(true).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));

    // 第一度から第二度近親者の中に冠動脈疾患、家族性高コレステロール血症以外の疾患もしく健全者しかいない場合。
    pi = {
        "father": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }],
        },
        "maternal_aunt_5": {
            "gender": "FEMALE",
            "Health History": [{ "Disease Name": "Cancer", "Detailed Disease Name": "胃がん", "Age At Diagnosis": "late_fifties", "Disease Code": "SNOMED_CT-363349007" }],
        },
        "paternal_uncle_0": {
            "gender": "MALE",
            "Health History": [{ "Disease Name": "Hypertension", "Detailed Disease Name": "高血圧", "Age At Diagnosis": "early_fifties", "Disease Code": "SNOMED_CT-38341003" }],
        }
    }
    expect(false).toEqual(fhRisk._isFhOrHvingPersonWhoOnsetOfCoronaryHeartDiseaseWithinSecondDegreeRelatives(pi));
});