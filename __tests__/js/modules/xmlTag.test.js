import { parse } from 'fast-xml-parser';
import {
    AdministrativeGenderCode, BirthTime, Id, Name, RaceCode,
    SubjectOf2, ClinicalObservation, Code, Value, Subject, SourceOf, DataEstimatedAge,
    PatientPerson, Relative, RelationshipHolder, Note, XmlTag
} from '../../../js/modules/xmlTag';

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

var parsedXml = {
    "administrativeGenderCode": {
        "attr_code": "248153007",
        "attr_codeSystemName": "SNOMED_CT",
        "attr_displayName": "male",
    },
    "birthTime": {
        "attr_value": "1994/01/01",
    },
    "id": {
        "attr_extension": "310674d6-1b03-4a03-abe8-418d23c40296",
    },
    "name": {
        "attr_formatted": "あなた",
    },
    "note": [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {},
    ],
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
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ],
    "subjectOf2": {
        "clinicalObservation": [
            {
                "code": {
                    "attr_code": "313415001",
                    "attr_codeSystemName": "SNOMED_CT",
                    "attr_displayName": "Identical twin (person)",
                },
                "sourceOf": "",
                "subject": "",
                "value": ""
            },
            {
                "code": {
                    "attr_code": "271603002",
                    "attr_codeSystemName": "SNOMED_CT",
                    "attr_displayName": "height",
                },
                "sourceOf": "",
                "subject": "",
                "value": {
                    "attr_unit": "centimeters",
                    "attr_value": 175,
                },
            },
            {
                "code": {
                    "attr_code": "107647005",
                    "attr_codeSystemName": "SNOMED_CT",
                    "attr_displayName": "weight",
                },
                "sourceOf": "",
                "subject": "",
                "value": {
                    "attr_unit": "kilogram",
                    "attr_value": "60",
                },
            },
            {
                "code": {
                    "attr_originalText": "Parental consanguinity indicated",
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
                    "attr_originalText": "Healthy",
                },
                "sourceOf": "",
                "subject": {
                    "dataEstimatedAge": {
                        "code": {
                            "attr_code": "21611-9",
                            "attr_codeSystemName": "LOINC",
                            "attr_displayName": "Estimated Age",
                            "attr_originalText": "blank",
                        },
                    },
                },
                "value": ""
            },
        ]
    }
};
test('xmlTag_constructor', () => {
    var xmlTag = new XmlTag();
    expect.any(XmlTag);
});

test('xmlTag_getXmlDataByJson', () => {
    var xmlTag = new XmlTag();
    expect.objectContaining(xmlTag.getXmlDataByJson());
});

test('xmlTag_getPersonalInfomationData', () => {
    var xmlTag = new XmlTag();
    expect.objectContaining(xmlTag.getXmlDataByJson());
});


test('xmlTag_isUndefindOrNull', () => {
    var xmlTag = new XmlTag();

    expect(xmlTag.isUndefindOrNull(undefined)).toBe(true);
    expect(xmlTag.isUndefindOrNull(null)).toBe(true);

    expect(xmlTag.isUndefindOrNull(1)).toBe(false);
    expect(xmlTag.isUndefindOrNull(true)).toBe(false);
    expect(xmlTag.isUndefindOrNull('a')).toBe(false);
});

test('XmlTag_appendJsonElement', () => {
    var xmlTag = new XmlTag();

    var json = {};
    var evalue = { number: "1" };
    xmlTag.appendJsonElement(json, "number", "1");
    expect(json).toStrictEqual(evalue);

    var json = {};
    var evalue = {};
    xmlTag.appendJsonElement(json, "attr_number",);
    expect(json).toStrictEqual(evalue);

    var json = {};
    var evalue = { "number": "" };
    xmlTag.appendJsonElement(json, "number",);
    expect(json).toStrictEqual(evalue);
});

test('PatientPerson_setPatientPersonProps', () => {
    var tag = new PatientPerson();
    tag.setPatientPersonProps(personalInformation);
    expect(tag.administrativeGenderCode.displayName).toStrictEqual("male");
    expect(tag.birthTime.value).toStrictEqual(personalInformation.date_of_birth);
    expect(tag.id.extension).toStrictEqual(personalInformation.id);
    expect(tag.name.formatted).toStrictEqual(personalInformation.name);
});

test('PatientPerson_getRaceCodes', () => {
    var tag = new PatientPerson();
    var evalue = [
        {
            "code": "1000000",
            "codeSystemName": "TBD",
            "displayName": "Asian",
            "id": "2"
        },
        {
            "code": "2039-6",
            "codeSystemName": "HL7",
            "displayName": "Japanese",
            "id": "14"
        }
    ];
    expect(tag.getRaceCodes(personalInformation)).toEqual(evalue);
});

test('PatientPerson_getApplicableRaces', () => {
    var tag = new PatientPerson();
    var evalue = ["Asian", "Japanese"];
    expect(tag.getApplicableRaces(personalInformation.race)).toStrictEqual(evalue);
});

test('PatientPerson_getRelatives', () => {
    var tag = new PatientPerson();
    expect(tag.getRelatives(personalInformation).length).toStrictEqual(10);
});

test('PatientPerson_getXmlDataByJson', () => {
    var tag = new PatientPerson(personalInformation);
    var evalue = {
        "administrativeGenderCode": {
            "attr_code": "248153007",
            "attr_codeSystemName": "SNOMED_CT",
            "attr_displayName": "male",
        },
        "birthTime": {
            "attr_value": "1994/01/01",
        },
        "id": {
            "attr_extension": "310674d6-1b03-4a03-abe8-418d23c40296",
        },
        "name": {
            "attr_formatted": "あなた",
        },
        "note": [
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {},
        ],
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
            {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
        ],
        "subjectOf2": {
            "clinicalObservation": [
                {
                    "code": {
                        "attr_code": "313415001",
                        "attr_codeSystemName": "SNOMED_CT",
                        "attr_displayName": "Identical twin (person)",
                    },
                    "sourceOf": "",
                    "subject": "",
                    "value": ""
                },
                {
                    "code": {
                        "attr_code": "271603002",
                        "attr_codeSystemName": "SNOMED_CT",
                        "attr_displayName": "height",
                    },
                    "sourceOf": "",
                    "subject": "",
                    "value": {
                        "attr_unit": "centimeters",
                        "attr_value": 175,
                    },
                },
                {
                    "code": {
                        "attr_code": "107647005",
                        "attr_codeSystemName": "SNOMED_CT",
                        "attr_displayName": "weight",
                    },
                    "sourceOf": "",
                    "subject": "",
                    "value": {
                        "attr_unit": "kilogram",
                        "attr_value": "60",
                    },
                },
                {
                    "code": {
                        "attr_originalText": "Parental consanguinity indicated",
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
                        "attr_originalText": "Healthy",
                    },
                    "sourceOf": "",
                    "subject": {
                        "dataEstimatedAge": {
                            "code": {
                                "attr_code": "21611-9",
                                "attr_codeSystemName": "LOINC",
                                "attr_displayName": "Estimated Age",
                                "attr_originalText": "blank",
                            },
                        },
                    },
                    "value": ""
                },
            ]
        }
    };
    var actual = tag.getXmlDataByJson();
    expect(actual.administrativeGenderCode).toStrictEqual(evalue.administrativeGenderCode);
    expect(actual.birthTime).toStrictEqual(evalue.birthTime);
    expect(actual.id).toStrictEqual(evalue.id);
    expect(actual.name).toStrictEqual(evalue.name);
    expect(actual.note.length).toStrictEqual(evalue.note.length);
    expect(actual.raceCode).toStrictEqual(evalue.raceCode);
    expect(actual.relative.length).toStrictEqual(evalue.relative.length);
    expect(actual.subjectOf2).toStrictEqual(evalue.subjectOf2);
});

test('PatientPerson_getPersonalInfomationData', () => {
    var xml = new PatientPerson(personalInformation);

    var actual = xml.getPersonalInfomationData(parsedXml);
    expect(actual.administrativeGenderCode).toStrictEqual(personalInformation.administrativeGenderCode);
    expect(actual.birthTime).toStrictEqual(personalInformation.birthTime);
    expect(actual.id).toStrictEqual(personalInformation.id);
    expect(actual.name).toStrictEqual(personalInformation.name);
    expect(actual.raceCode).toStrictEqual(personalInformation.raceCode);
    expect(actual.subjectOf2).toStrictEqual(personalInformation.subjectOf2);
    expect(actual.relative).toStrictEqual(personalInformation.relative);
    expect(actual.note).toStrictEqual(personalInformation.note);
});
test('RaceCode_getPersonalInfomationData', () => {
    var xml = new RaceCode(
        'code',
        'codeSystemName',
        'displayName',
        'id'
    );

    var actual = xml.getPersonalInfomationData(
        [
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
        ]
    );
    var evalue = { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false };
    expect(actual).toStrictEqual(evalue);
});


test('AdministrativeGenderCode_getXmlDataByJson', () => {
    var tag = new AdministrativeGenderCode();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode("code", "codeSystemName", "displayName");
    var evalue = {
        "attr_code": "code",
        "attr_codeSystemName": "codeSystemName",
        "attr_displayName": "displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode("code", undefined, undefined);
    var evalue = {
        "attr_code": "code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode(undefined, "codeSystemName", undefined);
    var evalue = {
        "attr_codeSystemName": "codeSystemName",
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode(undefined, undefined, "displayName");
    var evalue = {
        "attr_displayName": "displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});


test('AdministrativeGenderCode_getPersonalInfomationData', () => {
    var tag = new AdministrativeGenderCode();
    var evalue = { "gender": "MALE" };
    var parsedXml = {};
    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);

    var evalue = { "gender": "MALE" };
    var parsedXml = {
        "attr_code": "248153007",
        "attr_codeSystemName": "SNOMED_CT",
        "attr_displayName": "male",
    };
    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);

    var evalue = { "gender": "FEMALE" };
    var parsedXml = {
        "attr_code": "248152002",
        "attr_codeSystemName": "SNOMED_CT",
        "attr_displayName": "female",
    };
    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);
});

test('BirthTime_getXmlDataByJson', () => {
    var tag = new BirthTime();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new BirthTime("birthTime");
    var evalue = { "attr_value": "birthTime" };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('BirthTime_getPersonalInfomationData', () => {
    var tag = new BirthTime();
    var parsedXml = {};
    var d = new Date();
    var evalue = { "date_of_birth": String(d.getFullYear()) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) };

    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);

    var tag = new BirthTime();
    var parsedXml = { "attr_value": "1994/02/01" };
    var evalue = { "date_of_birth": "1994/02/01" };
    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);

    var tag = new BirthTime();
    var parsedXml = { "attr_value": "02/01/1994" };
    var evalue = { "date_of_birth": "1994/02/01" };
    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);

});

test('Id_getXmlDataByJson', () => {
    var tag = new Id();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Id("id");
    var evalue = { "attr_extension": "id" };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Id_getPersonalInfomationData', () => {
    var obj = new Id();
    var parsedXml = { "attr_extension": "310674d6-1b03-4a03-abe8-418d23c40296" };
    var evalue = { "id": "310674d6-1b03-4a03-abe8-418d23c40296" };
    expect(obj.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);
});

test('Name_getXmlDataByJson', () => {
    var tag = new Name();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Name("formatted");
    var evalue = { "attr_formatted": "formatted" };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});


test('Name_getPersonalInfomationData', () => {
    var tag = new Name();
    var parsedXml = { "attr_formatted": "formatted" };
    var evalue = { name: "formatted" };
    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);

    var tag = new Name();
    var parsedXml = {};
    var evalue = { name: "" };
    expect(tag.getPersonalInfomationData(parsedXml)).toStrictEqual(evalue);
});

test('RaceCode_getXmlDataByJson', () => {
    var tag = new RaceCode();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode("code", "codeSystemName", "displayName", "id");
    var evalue = {
        "attr_code": "code",
        "attr_codeSystemName": "codeSystemName",
        "attr_displayName": "displayName",
        "attr_id": "id"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode("code", undefined, undefined, undefined);
    var evalue = {
        "attr_code": "code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode(undefined, "codeSystemName", undefined, undefined);
    var evalue = {
        "attr_codeSystemName": "codeSystemName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode(undefined, undefined, "displayName", undefined);
    var evalue = {
        "attr_displayName": "displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode(undefined, undefined, undefined, "id");
    var evalue = {
        "attr_id": "id"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

// test('SubjectOf2_appendByKey', () => {
//     var tag = new SubjectOf2();
//     var evalue = [
//         {
//             "code": {
//                 "code": "313415001",
//                 "codeSystemName": "SNOMED_CT",
//                 "displayName": "Identical twin (person)",
//                 "originalText": undefined
//             },
//             "sourceOf": undefined,
//             "subject": undefined,
//             "value": {
//                 "value": undefined,
//                 "unit": undefined
//             }
//         },
//         {
//             "code": {
//                 "code": "271603002",
//                 "codeSystemName": "SNOMED_CT",
//                 "displayName": "height",
//                 "originalText": undefined
//             },
//             "sourceOf": undefined,
//             "subject": undefined,
//             "value": {
//                 "value": 175,
//                 "unit": "centimeters"
//             }
//         },
//         {
//             "code": {
//                 "code": "107647005",
//                 "codeSystemName": "SNOMED_CT",
//                 "displayName": "weight",
//                 "originalText": undefined
//             },
//             "sourceOf": undefined,
//             "subject": undefined,
//             "value": {
//                 "value": "60",
//                 "unit": "kilogram"
//             }
//         }
//     ];
//     var actual = [];
//     tag.appendByKey(actual, personalInformation, personalInformation.twin_status);
//     tag.appendByKey(actual, personalInformation, "height");
//     tag.appendByKey(actual, personalInformation, "weight");
//     expect(actual.length).toEqual(evalue.length);
//     expect(actual).toEqual(evalue);
// });

// test('SubjectOf2_appendParentalConsanguinity', () => {
//     var tag = new SubjectOf2();
//     var evalue = [{
//         "code": {
//             "code": undefined,
//             "codeSystemName": undefined,
//             "displayName": undefined,
//             "originalText": "Parental consanguinity indicated"
//         },
//         "sourceOf": undefined,
//         "subject": undefined,
//         "value": undefined
//     }];
//     var actual = [];
//     tag.appendParentalConsanguinity(actual);
//     expect(actual.length).toEqual(evalue.length);
//     expect(actual).toEqual(evalue);
// });

// test('SubjectOf2_appendHealthHistory', () => {
//     var tag = new SubjectOf2();
//     var evalue = [{
//         "code": {
//             "code": "38341003",
//             "codeSystemName": "SNOMED_CT",
//             "displayName": "Hypertension/high blood pressure",
//             "originalText": "Hypertension/high blood pressure"
//         },
//         "sourceOf": undefined,
//         "subject": {
//             "dataEstimatedAge": {
//                 "code": {
//                     "code": "21611-9",
//                     "codeSystemName": "LOINC",
//                     "displayName": "Estimated Age",
//                     "originalText": "late_fourties"
//                 }
//             }
//         },
//         "value": undefined
//     },
//     {
//         "code": {
//             "code": "55822004",
//             "codeSystemName": "SNOMED_CT",
//             "displayName": "High Cholesterol",
//             "originalText": "High Cholesterol"
//         },
//         "sourceOf": undefined,
//         "subject": {
//             "dataEstimatedAge": {
//                 "code": {
//                     "code": "21611-9",
//                     "codeSystemName": "LOINC",
//                     "displayName": "Estimated Age",
//                     "originalText": "late_fourties"
//                 }
//             }
//         },
//         "value": undefined
//     }];
//     var actual = [];
//     tag.appendHealthHistory(actual, personalInformation.maternal_uncle_0);
//     expect(actual.length).toEqual(evalue.length);
//     expect(actual).toEqual(evalue);
// });

// test('SubjectOf2_appendCauseOfDeath', () => {
//     var tag = new SubjectOf2();
//     var evalue = [{
//         "code": {
//             "code": "363349007",
//             "codeSystemName": "SNOMED_CT",
//             "displayName": "Gastric Cancer",
//             "originalText": "Gastric Cancer"
//         },
//         "sourceOf": {
//             "code": {
//                 "code": "419620001",
//                 "codeSystemName": "SNOMED_CT",
//                 "displayName": "death",
//                 "originalText": undefined
//             }
//         },
//         "subject": undefined,
//         "value": undefined
//     }];
//     var actual = [];
//     tag.appendCauseOfDeath(actual, personalInformation.maternal_uncle_0);
//     tag.appendCauseOfDeath(actual, personalInformation.maternal_grandfather);
//     expect(actual.length).toEqual(evalue.length);
//     expect(actual).toEqual(evalue);
// });

test('SubjectOf2_getXmlDataByJson', () => {
    var tag = new SubjectOf2();
    var clinicalObservations = [];

    var code_1 = new Code("code", "codeSystemName", "displayName", "originalText");
    var sourceOf_1 = new SourceOf(code_1);
    var subject_1 = new Subject(new DataEstimatedAge(code_1));
    var value_1 = new Value("value", "unit");
    var tag_1 = new ClinicalObservation(code_1, sourceOf_1, subject_1, value_1);

    var code_2 = undefined;
    var sourceOf_2 = new SourceOf(code_2);
    var subject_2 = new Subject(new DataEstimatedAge(code_2));
    var value_2 = new Value("value", "unit");
    var tag_2 = new ClinicalObservation(code_2, sourceOf_2, subject_2, value_2);

    clinicalObservations.push(tag_1);
    clinicalObservations.push(tag_2);

    tag.clinicalObservations = clinicalObservations;
    var evalue = {
        "clinicalObservation": [
            {
                "code": {
                    "attr_code": "code",
                    "attr_codeSystemName": "codeSystemName",
                    "attr_displayName": "displayName",
                    "attr_originalText": "originalText"
                },
                "sourceOf": {
                    "code": {
                        "attr_code": "code",
                        "attr_codeSystemName": "codeSystemName",
                        "attr_displayName": "displayName",
                        "attr_originalText": "originalText"
                    }
                },
                "subject": {
                    "dataEstimatedAge": {
                        "code": {
                            "attr_code": "code",
                            "attr_codeSystemName": "codeSystemName",
                            "attr_displayName": "displayName",
                            "attr_originalText": "originalText"
                        }
                    }
                },
                "value": {
                    "attr_value": "value",
                    "attr_unit": "unit"
                }
            },
            {
                "code": "",
                "sourceOf": "",
                "subject": "",
                "value": {
                    "attr_value": "value",
                    "attr_unit": "unit"
                }
            }
        ]
    };
    var actual = tag.getXmlDataByJson();
    expect(actual).toStrictEqual(evalue);
});

test('ClinicalObservation_getXmlDataByJson', () => {
    var tag = new ClinicalObservation();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var code = new Code("code", "codeSystemName", "displayName", "originalText");
    var sourceOf = new SourceOf(code);
    var subject = new Subject(new DataEstimatedAge(code));
    var value = new Value("value", "unit");
    var tag = new ClinicalObservation(code, sourceOf, subject, value);
    var evalue = {
        "code": {
            "attr_code": "code",
            "attr_codeSystemName": "codeSystemName",
            "attr_displayName": "displayName",
            "attr_originalText": "originalText"
        },
        "sourceOf": {
            "code": {
                "attr_code": "code",
                "attr_codeSystemName": "codeSystemName",
                "attr_displayName": "displayName",
                "attr_originalText": "originalText"
            }
        },
        "subject": {
            "dataEstimatedAge": {
                "code": {
                    "attr_code": "code",
                    "attr_codeSystemName": "codeSystemName",
                    "attr_displayName": "displayName",
                    "attr_originalText": "originalText"
                }
            }
        },
        "value": {
            "attr_value": "value",
            "attr_unit": "unit"
        }
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var code = undefined;
    var sourceOf = new SourceOf(code);
    var subject = new Subject(new DataEstimatedAge(code));
    var value = new Value("value", "unit");
    var tag = new ClinicalObservation(code, sourceOf, subject, value);
    var evalue = {
        "code": "",
        "sourceOf": "",
        "subject": "",
        "value": {
            "attr_value": "value",
            "attr_unit": "unit"
        }
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var code = new Code("code", "codeSystemName", "displayName", "originalText");
    var sourceOf = undefined;
    var subject = new Subject(new DataEstimatedAge(code));
    var value = new Value("value", "unit");
    var tag = new ClinicalObservation(code, sourceOf, subject, value);
    var evalue = {
        "code": {
            "attr_code": "code",
            "attr_codeSystemName": "codeSystemName",
            "attr_displayName": "displayName",
            "attr_originalText": "originalText"
        },
        "sourceOf": "",
        "subject": {
            "dataEstimatedAge": {
                "code": {
                    "attr_code": "code",
                    "attr_codeSystemName": "codeSystemName",
                    "attr_displayName": "displayName",
                    "attr_originalText": "originalText"
                }
            }
        },
        "value": {
            "attr_value": "value",
            "attr_unit": "unit"
        }
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var code = new Code("code", "codeSystemName", "displayName", "originalText");
    var sourceOf = new SourceOf(code);
    var subject = undefined;
    var value = new Value("value", "unit");
    var tag = new ClinicalObservation(code, sourceOf, subject, value);
    var evalue = {
        "code": {
            "attr_code": "code",
            "attr_codeSystemName": "codeSystemName",
            "attr_displayName": "displayName",
            "attr_originalText": "originalText"
        },
        "sourceOf": {
            "code": {
                "attr_code": "code",
                "attr_codeSystemName": "codeSystemName",
                "attr_displayName": "displayName",
                "attr_originalText": "originalText"
            }
        },
        "subject": "",
        "value": {
            "attr_value": "value",
            "attr_unit": "unit"
        }
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var code = new Code("code", "codeSystemName", "displayName", "originalText");
    var sourceOf = new SourceOf(code);
    var subject = new Subject(new DataEstimatedAge(code));
    var value = undefined;
    var tag = new ClinicalObservation(code, sourceOf, subject, value);
    var evalue = {
        "code": {
            "attr_code": "code",
            "attr_codeSystemName": "codeSystemName",
            "attr_displayName": "displayName",
            "attr_originalText": "originalText"
        },
        "sourceOf": {
            "code": {
                "attr_code": "code",
                "attr_codeSystemName": "codeSystemName",
                "attr_displayName": "displayName",
                "attr_originalText": "originalText"
            }
        },
        "subject": {
            "dataEstimatedAge": {
                "code": {
                    "attr_code": "code",
                    "attr_codeSystemName": "codeSystemName",
                    "attr_displayName": "displayName",
                    "attr_originalText": "originalText"
                }
            }
        },
        "value": ""
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Code_getXmlDataByJson', () => {
    var tag = new Code();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code("code", "codeSystemName", "displayName", "originalText");
    var evalue = {
        "attr_code": "code",
        "attr_codeSystemName": "codeSystemName",
        "attr_displayName": "displayName",
        "attr_originalText": "originalText"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code("code", undefined, undefined, undefined);
    var evalue = {
        "attr_code": "code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code(undefined, "codeSystemName", undefined, undefined);
    var evalue = {
        "attr_codeSystemName": "codeSystemName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code(undefined, undefined, "displayName", undefined);
    var evalue = {
        "attr_displayName": "displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code(undefined, undefined, undefined, "originalText");
    var evalue = {
        "attr_originalText": "originalText"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Value_getXmlDataByJson', () => {
    var tag = new Value();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Value("value", "unit");
    var evalue = {
        "attr_value": "value",
        "attr_unit": "unit"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Value("value", undefined);
    var evalue = {
        "attr_value": "value"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Value(undefined, "unit");
    var evalue = {
        "attr_unit": "unit"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Subject_getXmlDataByJson', () => {
    var tag = new Subject();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Subject(new DataEstimatedAge(new Code("code", "codesys", "display", "oring")));
    var evalue = {
        "dataEstimatedAge": {
            "code": {
                "attr_code": "code",
                "attr_codeSystemName": "codesys",
                "attr_displayName": "display",
                "attr_originalText": "oring",
            }
        }
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('DataEstimatedAge_getXmlDataByJson', () => {
    var tag = new DataEstimatedAge();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new DataEstimatedAge(new Code("code", "codesys", "display", "oring"));
    var evalue = {
        "code": {
            "attr_code": "code",
            "attr_codeSystemName": "codesys",
            "attr_displayName": "display",
            "attr_originalText": "oring",
        }
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Relative_getXmlDataByJson', () => {
    var tag = new Relative();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var patientPerson = new PatientPerson(personalInformation);
    var tag = patientPerson.relatives[0];
    var evalue = {
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
            "id": { "attr_extension": "7421ec0a-a1ba-4793-b9e4-675d59840e70", },
            "name": { "attr_formatted": "あなたの父", },
            "note": [
                {
                    "attr_code": "age",
                    "attr_text": 53,
                },
                {
                    "attr_code": "birth_order",
                    "attr_text": 1,
                },
                {
                    "attr_code": "flg_race_ethnic",
                    "attr_text": 1,
                },
                {
                    "attr_code": "is_alive",
                    "attr_text": "alive",
                },
                {
                    "attr_code": "living_prefectures",
                },
                {
                    "attr_code": "relationship",
                    "attr_text": "father",
                },
                {
                    "attr_code": "training_count_for_training_at_week",
                    "attr_text": "",
                },
                {
                    "attr_code": "training_strength",
                    "attr_text": "空欄",
                },
                {
                    "attr_code": "training_time_for_training_at_week",
                    "attr_text": "",
                },
                {
                    "attr_code": "update_date",
                    "attr_text": "2021/11/02",
                }
            ],
            "relative": {
                "code": {
                    "attr_code": "PAR",
                    "attr_codeSystemName": "HL7 Family History Model",
                    "attr_displayName": "Parent",
                },
                "relationshipHolder": ""
            },
            "subjectOf2": "",
        }
    };
    var actual = tag.getXmlDataByJson();
    expect(actual).toStrictEqual(evalue);
});

test('RelationshipHolder_getXmlDataByJson', () => {
    var tag = new RelationshipHolder();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var pp = new PatientPerson(personalInformation);
    var tag = pp.relatives[0].relationshipHolder;
    var evalue = {
        "administrativeGenderCode": {
            "attr_code": "248153007",
            "attr_codeSystemName": "SNOMED_CT",
            "attr_displayName": "male",
        },
        "id": { "attr_extension": "7421ec0a-a1ba-4793-b9e4-675d59840e70", },
        "name": { "attr_formatted": "あなたの父", },
        "note": [
            {
                "attr_code": "age",
                "attr_text": 53,
            },
            {
                "attr_code": "birth_order",
                "attr_text": 1,
            },
            {
                "attr_code": "flg_race_ethnic",
                "attr_text": 1,
            },
            {
                "attr_code": "is_alive",
                "attr_text": "alive",
            },
            {
                "attr_code": "living_prefectures",
            },
            {
                "attr_code": "relationship",
                "attr_text": "father",
            },
            {
                "attr_code": "training_count_for_training_at_week",
                "attr_text": "",
            },
            {
                "attr_code": "training_strength",
                "attr_text": "空欄",
            },
            {
                "attr_code": "training_time_for_training_at_week",
                "attr_text": "",
            },
            {
                "attr_code": "update_date",
                "attr_text": "2021/11/02",
            }
        ],
        "relative": {
            "code": {
                "attr_code": "PAR",
                "attr_codeSystemName": "HL7 Family History Model",
                "attr_displayName": "Parent",
            },
            "relationshipHolder": ""
        },
        "subjectOf2": "",
    };
    var actual = tag.getXmlDataByJson();
    expect(actual).toStrictEqual(evalue);
});

test('Note_getXmlDataByJson', () => {
    var tag = new Note();
    var evalue = "";
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Note("code", "text");
    var evalue = {
        "attr_code": "code",
        "attr_text": "text"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Note("code", undefined);
    var evalue = {
        "attr_code": "code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Note(undefined, "text");
    var evalue = {
        "attr_text": "text"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});


test('Note_getPersonalInfomationData', () => {
    var tag = new Note();
    var evalue = {};
    expect(tag.getPersonalInfomationData()).toStrictEqual(evalue);

    var tag = new Note("code", undefined);
    var evalue = {};
    expect(tag.getPersonalInfomationData()).toStrictEqual(evalue);

    var tag = new Note(undefined, "text");
    var evalue = {};
    expect(tag.getPersonalInfomationData()).toStrictEqual(evalue);

    var tag = new Note("code", "text");
    var evalue = {
        "code": "text"
    };
    expect(tag.getPersonalInfomationData()).toStrictEqual(evalue);
});