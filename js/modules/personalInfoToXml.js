import {AdministrativeGenderCode,BirthTime,Id,Name,RaceCode,
    SubjectOf2,ClinicalObservation,Code,Value,Subject,DataEstimatedAge,
    PatientPerson,Relative,RelationshipHolder,Note,XmlTag} from '../modules/xmlTag';


var Parser = require("fast-xml-parser").j2xParser;
var he = require('he');

export default function personalInfoToXml(personal_information) {
    return json2xml(_convert(personal_information));
}

export function json2xml(json) {

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
        attrValueProcessor: a => a// default is a=>a he.encode(a, { isAttributeValue: true, useNamedReferences: true })
    };
    var parser = new Parser(defaultOptions);
    var xml = parser.parse(json);
    return xml;
}

export function _convert(pi){
    if(isNotCorrectData(pi)) return "";

    var jsonData = {
        "FamilyHistory": {
            "attr_classCode": "OBS",
            "attr_moodCode": "EVN",
            "effectiveTime": {
                "attr_value": _getEffectiveTime(pi), // 動的！！　TODO
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
                    "patientPerson": _getPatientPerson(pi)
                }
            }
        }
    };

    return jsonData;
}

export function isNotCorrectData(pi){
    if(pi === undefined) return true;
    if(pi === null) return true;
    if(pi === null) return true;
    if(pi === "") return true;
    if(typeof pi === "boolean") return true;
    if(typeof pi === "function") return true;
    if(typeof pi === "number") return true;
    if(Object.keys(pi).indexOf("name") === -1) return true;
    if(Object.keys(pi).indexOf("id") === -1) return true;
    if(Object.keys(pi).indexOf("gender") === -1) return true;
    if(Object.keys(pi).indexOf("date_of_birth") === -1) return true;
    if(Object.keys(pi).indexOf("update_date") === -1) return true;
    return false;
}

export function _getEffectiveTime( pi ){
    if(pi===undefined) return "";
    if(Object.keys(pi).indexOf("update_date") === -1) return "";
    if(pi.update_date===undefined) return "";

    var updateTime = pi.update_date;
    var date = updateTime.split("/");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    return mm + "/" + dd + "/" + yyyy;
}

/**
 * 
 * @param {*} pi PersonalInfo
 * @returns json data of patient person
 */
 export function _getPatientPerson(pi){
    var patientPerson = new PatientPerson(pi);
    return patientPerson.getXmlDataByJson();
}