import {AdministrativeGenderCode,BirthTime,Id,Name,RaceCode,
    SubjectOf2,ClinicalObservation,Code,Value,Subject,DataEstimatedAge,
    PatientPerson,Relative,RelationshipHolder,Note,XmlTag} from '../../../js/modules/xmlTag';

    
var personalInformation = {
    "name":"あなた",
    "twin_status":"NO",
    "prefectures":null,
    "Health History":[{"Disease Name":"Healthy","Detailed Disease Name":"健康","Age At Diagnosis":"blank","Disease Code":"FAMILY_T-HEALTHY"}],
    "flg_race_ethnic":1,
    "id":"2b62490e-d59b-4a16-8e07-e0745801ba55",
    "gender":"MALE",
    "date_of_birth":"1950/01/01",
    "adopted":false,
    "height":180,
    "height_unit":"centimeters",
    "weight":"80",
    "weight_unit":"kilogram",
    "month_of_birth":"1",
    "year_of_birth":"1950",
    "birth_order":1,
    "living_prefectures":"0000",
    "waist":"80",
    "waist_unit":"centimeters",
    "hip":"80",
    "hip_unit":"centimeters",
    "smoker":"5",
    "number_of_cigarettes_per_day":"1_to_9",
    "training_family":"1",
    "training_strength":"中程度",
    "training_count_for_training_at_week":"1",
    "training_time_for_training_at_week":"120",
    "dietary_frequency_to_eat_fruits_in_day":"true",
    "dietary_frequency_to_eat_vegetables_in_day":"3times",
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
    "last_diagnosis_month":"5",
    "race":{"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false},
    "ethnicity":{"Hispanic or Latino":false,"Ashkenazi Jewish":false,"Not Hispanic or Latino":false,"Central American":false,"Cuban":false,"Dominican":false,"Mexican":false,"Other Hispanic":false,"Puerto Rican":false,"South American":false},
    "update_date":"2021/10/25",
    "father":{"gender":"MALE","id":"429c0497-530a-4410-82ac-95be3650ad39","Health History":[],"name":"あなたの父","relationship":"father"},
    "mother":{"gender":"FEMALE","id":"acd920f2-84ae-48a9-b4e9-a4db1369c67f","Health History":[],"name":"あなたの母","relationship":"mother"},
    "maternal_grandfather":{"gender":"MALE","id":"07b24aab-0742-42b0-ac87-fe1f6d811182","Health History":[],"name":"あなたの母方の祖父","relationship":"maternal_grandfather"},
    "maternal_grandmother":{"gender":"FEMALE","id":"415e0daa-cd79-4c43-a241-11ad7f3c5667","Health History":[],"name":"あなたの母方の祖母","relationship":"maternal_grandmother"},
    "paternal_grandfather":{"gender":"MALE","id":"b962851c-123a-44ae-90f6-1bbb61ac01a6","Health History":[],"name":"あなたの父方の祖父","relationship":"paternal_grandfather"},
    "paternal_grandmother":{"gender":"FEMALE","id":"504fd200-aa89-4a50-9d43-50033353e9a4","Health History":[],"name":"あなたの父方の祖母","relationship":"paternal_grandmother"},
    "brother_0":{"gender":"MALE","id":"fc9d1aca-bf01-4c7d-b00f-b0048d88ab23","Health History":[],"name":"あなたの兄弟 1","relationship":"brother"},
    "brother_1":{"gender":"MALE","id":"40aa54f2-2bb6-4ca1-8705-1acbcf809425","Health History":[],"name":"あなたの兄弟 2","relationship":"brother"},
    "sister_0":{"gender":"FEMALE","id":"02db2a75-efc7-440d-abac-8708abe3bf33","Health History":[],"name":"あなたの姉妹 1","relationship":"sister"},
    "sister_1":{"gender":"FEMALE","id":"3c83dd24-5b41-42d7-b089-8ce32603a8c0","Health History":[],"name":"あなたの姉妹 2","relationship":"sister"},
    "son_0":{"gender":"MALE","id":"07cc9067-9946-4309-bf5a-65a0a1be9e97","Health History":[],"name":"あなたの息子 1","relationship":"son"},
    "son_1":{"gender":"MALE","id":"9f604f67-29f2-4d89-86d2-46d0cca2b5de","Health History":[],"name":"あなたの息子 2","relationship":"son"},
    "daughter_0":{"gender":"FEMALE","id":"aaf04449-1beb-41cf-93af-930fa878b080","Health History":[],"name":"あなたの娘 1","relationship":"daughter"},
    "daughter_1":{"gender":"FEMALE","id":"53570f59-296a-41f9-ac11-44927bc4874b","Health History":[],"name":"あなたの娘 2","relationship":"daughter"},
    "maternal_uncle_0":{"gender":"MALE","id":"21d58ffd-b7ed-4a17-808d-318ab3780bd8","Health History":[],"name":"あなたの母方のおじ 1","relationship":"uncle"},
    "maternal_uncle_1":{"gender":"MALE","id":"43385fd2-6218-4ac6-8d29-04ea59d28dcd","Health History":[],"name":"あなたの母方のおじ 2","relationship":"uncle"},
    "maternal_aunt_0":{"gender":"FEMALE","id":"915f91da-8208-45fc-9231-4b64311845fe","Health History":[],"name":"あなたの母方のおば 1","relationship":"aunt"},
    "maternal_aunt_1":{"gender":"FEMALE","id":"3e42eb70-e71f-4307-88c7-f9503586e49a","Health History":[],"name":"あなたの母方のおば 2","relationship":"aunt"},
    "paternal_uncle_0":{"gender":"MALE","id":"7b5fd0bc-794b-45e2-a2be-85e6bad62dad","Health History":[],"name":"あなたの父方のおじ 1","relationship":"uncle"},
    "paternal_uncle_1":{"gender":"MALE","id":"a854215e-1cba-447c-9267-b3e2555c0fb8","Health History":[],"name":"あなたの父方のおじ 2","relationship":"uncle"},
    "paternal_aunt_0":{"gender":"FEMALE","id":"1ba351de-2bc9-4806-9ca6-6c7b19d8d896","Health History":[],"name":"あなたの父方のおば 1","relationship":"aunt"},
    "paternal_aunt_1":{"gender":"FEMALE","id":"db16e89b-5623-4ca0-93b9-0dac4d6aeac7","Health History":[],"name":"あなたの父方のおば 2","relationship":"aunt"},
    "created_date":"2021/10/25 16:41:37"
};

test('XmlTag_appendJsonElement', () => {
    var xmlTag = new XmlTag();

    var json_1 = {};
    var evalue_1 = { number : "1" };
    xmlTag.appendJsonElement(json_1, "number", "1");
    expect(json_1).toStrictEqual(evalue_1);

    var json_2 = {};
    var evalue_2 = {};
    xmlTag.appendJsonElement(json_2, "number", );
    expect(json_2).toStrictEqual(evalue_2);
});

test('PatientPerson_setPatientPersonProps', () => {
    var tag = new PatientPerson();
    tag.setPatientPersonProps(personalInformation);
    expect(tag.administrativeGenderCode.displayName).toStrictEqual(personalInformation.gender);
    expect(tag.birthTime.value).toStrictEqual(personalInformation.date_of_birth);
    expect(tag.id.extension).toStrictEqual(personalInformation.id);
    expect(tag.name.formatted).toStrictEqual(personalInformation.name);
});

test('PatientPerson_getRaceCodes', () => {
    var tag = new PatientPerson();
    var evalue = [
        {
            "code":"",
            "codeSystemName":"",
            "displayName":"Asian",
            "id":""
        },
        {
            "code":"",
            "codeSystemName":"",
            "displayName":"Japanese",
            "id":""
        }
    ];
    expect(tag.getRaceCode(personalInformation)).toStrictEqual(personalInformation.name);
});

test('PatientPerson_getApplicableRaces', () => {
    var tag = new PatientPerson();
    var evalue = ["Asian","Japanese"];
    expect(tag.getApplicableRaces(personalInformation.race)).toStrictEqual(evalue);
});

test('PatientPerson_getXmlDataByJson', () => {
    var tag = new PatientPerson(personalInformation);
    var evalue = {
        administrativeGenderCode : { attr_displayName : personalInformation.gender },
        birthTime : { attr_value : personalInformation.date_of_birth },
        id : { attr_extension : personalInformation.id },
        name : { attr_formatted : personalInformation.name },
        note :undefined,
        raceCode : undefined,
        relative : undefined,
        subjectOf2 : undefined
    };
    var actual = tag.getXmlDataByJson();
    expect(actual).toStrictEqual(evalue);
});

test('AdministrativeGenderCode_getXmlDataByJson', () => {
    var tag = new AdministrativeGenderCode();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode("code", "codeSystemName", "displayName");
    var evalue = {
        "attr_code":"code",
        "attr_codeSystemName":"codeSystemName",
        "attr_displayName":"displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode("code", undefined, undefined);
    var evalue = {
        "attr_code":"code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode(undefined, "codeSystemName", undefined);
    var evalue = {
        "attr_codeSystemName":"codeSystemName",
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
    
    var tag = new AdministrativeGenderCode(undefined, undefined, "displayName");
    var evalue = {
        "attr_displayName":"displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('BirthTime_getXmlDataByJson', () => {
    var tag = new BirthTime();
    var evalue = undefined ;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new BirthTime("birthTime");
    var evalue = { "attr_value":"birthTime" };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Id_getXmlDataByJson', () => {
    var tag = new Id();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Id("id");
    var evalue = {"attr_extension":"id"};
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Name_getXmlDataByJson', () => {
    var tag = new Name();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Name("formatted");
    var evalue = {"attr_formatted":"formatted"};
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('RaceCode_getXmlDataByJson', () => {
    var tag = new RaceCode();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode("code","codeSystemName","displayName","id");
    var evalue = {
        "attr_code":"code",
        "attr_codeSystemName":"codeSystemName",
        "attr_displayName":"displayName",
        "attr_id":"id"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode("code",undefined,undefined,undefined);
    var evalue = {
        "attr_code":"code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode(undefined,"codeSystemName",undefined,undefined);
    var evalue = {
        "attr_codeSystemName":"codeSystemName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode(undefined,undefined,"displayName",undefined);
    var evalue = {
        "attr_displayName":"displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new RaceCode(undefined,undefined,undefined,"id");
    var evalue = {
        "attr_id":"id"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('SubjectOf2_getXmlDataByJson', () => {
    var tag = new SubjectOf2();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('ClinicalObservation_getXmlDataByJson', () => {
    var tag = new ClinicalObservation();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Code_getXmlDataByJson', () => {
    var tag = new Code();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code("code","codeSystemName","displayName","originalText");
    var evalue = {
        "attr_code":"code",
        "attr_codeSystemName":"codeSystemName",
        "attr_displayName":"displayName",
        "attr_originalText":"originalText"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code("code",undefined,undefined,undefined);
    var evalue = {
        "attr_code":"code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code(undefined,"codeSystemName",undefined,undefined);
    var evalue = {
        "attr_codeSystemName":"codeSystemName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code(undefined,undefined,"displayName",undefined);
    var evalue = {
        "attr_displayName":"displayName"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Code(undefined,undefined,undefined,"originalText");
    var evalue = {
        "attr_originalText":"originalText"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Value_getXmlDataByJson', () => {
    var tag = new Value();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Value("value", "unit");
    var evalue = {
        "attr_value":"value",
        "attr_unit":"unit"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Value("value", undefined);
    var evalue = {
        "attr_value":"value"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Value(undefined, "unit");
    var evalue = {
        "attr_unit":"unit"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Subject_getXmlDataByJson', () => {
    var tag = new Subject();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('DataEstimatedAge_getXmlDataByJson', () => {
    var tag = new DataEstimatedAge();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Relative_getXmlDataByJson', () => {
    var tag = new Relative();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('RelationshipHolder_getXmlDataByJson', () => {
    var tag = new RelationshipHolder();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});

test('Note_getXmlDataByJson', () => {
    var tag = new Note();
    var evalue = undefined;
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Note("code","text");
    var evalue = {
        "attr_code":"code",
        "attr_text":"text"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Note("code",undefined);
    var evalue = {
        "attr_code":"code"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);

    var tag = new Note(undefined,"text");
    var evalue = {
        "attr_text":"text"
    };
    expect(tag.getXmlDataByJson()).toStrictEqual(evalue);
});