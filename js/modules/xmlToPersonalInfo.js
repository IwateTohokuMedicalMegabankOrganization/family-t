import {
    PatientPerson
} from '../modules/xmlTag';

var parser = require('fast-xml-parser');

export function xmlToPersonalInfo(xmlString) {
    return covertPersonal_information(xml2json(xmlString));
}

function xml2json(xmlString) {
    var options = {
        attributeNamePrefix: "attr_",
        attrNodeName: "", //default is false
        // attributeNamePrefix : "",
        // attrNodeName: false,
        textNodeName: "#text",
        ignoreAttributes: false,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        localeRange: "", //To support non english character in tag/attribute values.
        parseTrueNumberOnly: false
    };

    if (parser.validate(xmlString) === true) { //optional (it'll return an object in case it's not valid)
        var jsonObj = parser.parse(xmlString, options);
    }

    var tObj = parser.getTraversalObj(xmlString, options);
    var jsonObj = parser.convertToJson(tObj, options);
    return jsonObj;
}

function covertPersonal_information(input) {

    // return {
    //     "name": "あなた", "twin_status": "NO", "prefectures": null, "Health History": [{ "Disease Name": "Healthy", "Detailed Disease Name": "健康", "Age At Diagnosis": "blank", "Disease Code": "FAMILY_T-HEALTHY" }], "flg_race_ethnic": 1, "id": "1d7e5374-575d-48b4-af13-61f6608c468a", "gender": "MALE", "date_of_birth": "1950/02/01", "adopted": false, "height": "", "height_unit": "", "weight": "", "weight_unit": "kilogram", "month_of_birth": "2", "year_of_birth": "1950", "birth_order": 1, "living_prefectures": "0000", "waist": "", "waist_unit": "centimeters", "hip": "", "hip_unit": "centimeters", "training_strength": null, "training_count_for_training_at_week": "", "training_time_for_training_at_week": "", "systolic_blood_pressure": null, "diastolic_blood_pressure": null, "fasting_blood_glucose_lebel": null, "occasionally_blood_glucose_lebel": null, "ogtt_blood_glucose_lebel": null, "hba1c": null, "hdl_cholesterol": null, "ldl_cholesterol": null, "last_diagnosis_year": null, "last_diagnosis_month": null, "race": { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false }, "ethnicity": { "Hispanic or Latino": false, "Ashkenazi Jewish": false, "Not Hispanic or Latino": false, "Central American": false, "Cuban": false, "Dominican": false, "Mexican": false, "Other Hispanic": false, "Puerto Rican": false, "South American": false }, "update_date": "2021/12/07", "father": { "gender": "MALE", "id": "de64069c-f13b-4553-8b9b-4389ad0a9c8d", "Health History": [], "name": "あなたの父", "relationship": "father" }, "mother": { "gender": "FEMALE", "id": "325c79a7-a5a9-444c-810e-9fd449d4fe9a", "Health History": [], "name": "あなたの母", "relationship": "mother" }, "maternal_grandfather": { "gender": "MALE", "id": "406587ce-4808-4914-aadc-bbb629588a02", "Health History": [], "name": "あなたの母方の祖父", "relationship": "maternal_grandfather" }, "maternal_grandmother": { "gender": "FEMALE", "id": "b23154e2-e877-4a5c-b48c-2bb6bf591438", "Health History": [], "name": "あなたの母方の祖母", "relationship": "maternal_grandmother" }, "paternal_grandfather": { "gender": "MALE", "id": "69327bd6-9c98-4efe-9595-2e5b069325e4", "Health History": [], "name": "あなたの父方の祖父", "relationship": "paternal_grandfather" }, "paternal_grandmother": { "gender": "FEMALE", "id": "bdf976da-c19b-4af5-a48e-bc2ca8cbfe66", "Health History": [], "name": "あなたの父方の祖母", "relationship": "paternal_grandmother" }, "created_date": "2021/12/07 10:45:18"
    // };

    if (!Boolean(input)) return {};
    if (!Boolean(input.FamilyHistory)) return {};
    if (!Boolean(input.FamilyHistory.subject)) return {};
    if (!Boolean(input.FamilyHistory.subject.patient)) return {};
    if (!Boolean(input.FamilyHistory.subject.patient.patientPerson)) return {};

    return _getPatientPerson(input.FamilyHistory.subject.patient.patientPerson);
}

function _getPatientPerson(input) {
    var patientPerson = new PatientPerson();
    return patientPerson.getPersonalInfomationData(input);
}