import {
    PatientPerson
} from '../modules/xmlTag';

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