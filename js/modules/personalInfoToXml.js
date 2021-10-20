var Parser = require("fast-xml-parser").j2xParser;
var he = require('he');

export default function personalInfoToXml(personal_information) {
    return json2xml(_convert(personal_information));
}

function json2xml(json) {

    //default options need not to set
    var defaultOptions = {
        attributeNamePrefix: "attr_",
        attrNodeName: "", //default is false
        textNodeName: "#text",
        ignoreAttributes: false,
        encodeHTMLchar: true,
        cdataTagName: "__cdata", //default is false
        cdataPositionChar: "\\c",
        format: true,
        indentBy: "  ",
        supressEmptyNode: false,
        tagValueProcessor: a => he.encode(a, { useNamedReferences: true }),// default is a=>a
        attrValueProcessor: a => he.encode(a, { isAttributeValue: true, useNamedReferences: true })// default is a=>a
    };
    var parser = new Parser(defaultOptions);
    var xml = parser.parse(json);
    return xml;
}

function _convert( pi ){

    var jsonData = {
        "FamilyHistory": {
            "attr_classCode": "OBS",
            "attr_moodCode": "EVN",
            "effectiveTime": {
                "attr_value": "10/1/2021",
            },
            "id": {
                "attr_extention": "gov.hhs.fhh:718163810183",
            },
            "methodCode": {
                "attr_displayName": "Surgeon General's Family Heath History Tool",
            },
            "subject": {
                "attr_typeCode": "SBJ",
                "patient": {
                    "attr_classCode": "PAT",
                    "patientPerson": _getPatienatPerson( pi )
                }
            }
        }
    };

    return jsonData;
}

function _getPatienatPerson(pi){

    var ret = {};

    ret.id = pi.id; 

    ret.name = { attr_formatted : pi.name };

    ret.birthTime = { attr_birthTime : pi.date_of_birth };

    ret.administrativeGenderCode = { attr_displayName : pi.gender };

    return ret;
}