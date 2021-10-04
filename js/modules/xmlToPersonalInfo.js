var parser = require('fast-xml-parser');

export default function xmlToPersonalInfo(xmlString) {
    return xml2json(xmlString);
}

function xml2json(xmlString) {
    var options = {
        attributeNamePrefix : "",
        attrNodeName: false,
        textNodeName : "#text",
        ignoreAttributes : false,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
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

function to_personal_information(input) {

    personal_information = _getPatientPerson(input);

}

function _getPatientPerson(input) {

    if (!Boolean(input)) return {};
    if (!Boolean(input.patientPerson)) return {};

    var patientPerson = {};

    patientPerson.id = _getId(input.patientPerson);
    patientPerson.name = _getName(input.patientPerson);
    patientPerson.date_of_birth = _getDate_of_birth(input.patientPerson);
    patientPerson.prefectures = _getPrefectures(input.patientPerson);
}

function _getId(p) {

    if (!Boolean(p)) return "";
    if (!Boolean(p.id)) return "";
    if (!Boolean(p.id.extention)) return "";

    return p.id.extention;
}

function _getName(p) {

    if (!Boolean(p)) return "";
    if (!Boolean(p.name)) return "";
    if (!Boolean(p.name.formatted)) return "";

    return p.name.formatted;
}

function _getDate_of_birth(p) {

    if (!Boolean(p)) return "";
    if (!Boolean(p.birthTime)) return "";
    if (!Boolean(p.birthTime.value)) return "";

    return p.birthTime.value;
}
