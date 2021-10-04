var parser = require('fast-xml-parser');

export default function xmlToPersonalInfo(xmlString) {
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

    if (!Boolean(input)) return {};
    if (!Boolean(input.patientPerson)) return {};

    var personal_information = {};

    // Patient
    var patientPerson = _getPatientPerson(input);
    personal_information.id = _getId(patientPerson);
    personal_information.name = _getName(patientPerson);
    personal_information.date_of_birth = _getDate_of_birth(patientPerson);
    personal_information.prefectures = _getPrefectures(patientPerson);

    return personal_information;
}

function _getPatientPerson(input) {

    if (!Boolean(input)) return {};
    if (!Boolean(input.FamilyHistory)) return {};
    if (!Boolean(input.FamilyHistory.subject)) return {};
    if (!Boolean(input.FamilyHistory.subject.patient)) return {};
    if (!Boolean(input.FamilyHistory.subject.patient.patientPerson)) return {};

    return input.FamilyHistory.subject.patient.patientPerson;
}

function _getId(p) {

    if (!Boolean(p)) return "";
    if (!Boolean(p.id)) return "";
    if (!Boolean(p.id.attr_extention)) return "";

    return p.id.attr_extention;
}

function _getName(p) {

    if (!Boolean(p)) return "";
    if (!Boolean(p.name)) return "";
    if (!Boolean(p.name.attr_formatted)) return "";

    return p.name.attr_formatted;
}

function _getDate_of_birth(p) {

    if (!Boolean(p)) return "";
    if (!Boolean(p.birthTime)) return "";
    if (!Boolean(p.birthTime.attr_value)) return "";

    return p.birthTime.attr_value;
}
