/**
 * this module defines xml tag classes what used in familiy-t
 */
 import {RaceUtil} from '../../js/modules/xmlTagUtil';



/**
 * base class 
 * 
 * this class enable to use template pattern
 */
class XmlTag {
    constructor(){}

    /**
     * get json of xml tags from personal information
     * @returns 
     */
    getXmlDataByJson(){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    /**
     * get personal information data from persed XML data
     * @param {*} persedXml 
     * @returns 
     */
    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }

    isUndefindOrNull(value){
        return value === undefined || value === null;
    }

    appendJsonElement(json, element, value){
        if(!this.isUndefindOrNull(value)){
            json[element] = value;
        }
    }

    returnUndefinedIfJsonIsEmpty(json){
        if(this.isEmpty(json) || this.isUndefindOrNull(json)){
            return undefined;
        }
        return json;
    }

    isEmpty(json){
        return !Object.keys(json).length;
    }

    getObjectProperty(personalInformation, propertyName){
        if(!this.isUndefindOrNull(personalInformation) && Object.keys(personalInformation).indexOf(propertyName) !== -1){
            return personalInformation[propertyName];
        }
        return undefined;
    }
}

class PatientPerson extends XmlTag {
    administrativeGenderCode;   // XmlTag
    birthTime;                  // XmlTag
    id;                         // XmlTag
    name;                       // XmlTag
    notes;                      // XmlTag
    raceCodes;                  // XmlTag
    relatives;                  // XmlTag
    subjectOf2;                 // XmlTag

    constructor(personalInformation){
        super();
        this.setPatientPersonProps(personalInformation);
    }

    getXmlDataByJson(){
        var jsonOfXmlData ={};
        this.appendJsonElement(patientPerson, "patientPerson", this.getXmlDataByJson());
        var jsonOfXmlData = { "patientPerson" : this.returnUndefinedIfJsonIsEmpty() };
        return jsonOfXmlData;
    }

    setPatientPersonProps(personalInformation){
        this.administrativeGenderCode = new AdministrativeGenderCode(undefined,undefined,this.getObjectProperty(personalInformation,"gender"))
        this.birthTime = new BirthTime(this.getObjectProperty(personalInformation,"date_of_birth"));
        this.id = new Id(this.getObjectProperty(personalInformation,"id"));        
        this.name = new Name(this.getObjectProperty(personalInformation,"name"));
        this.notes = this.getNotes(personalInformation);
        this.relatives = this.getRaceCodes(personalInformation);
        this.relatives = this.getRlatives(personalInformation);
        this.subjectOf2 = this.getSubjectOf2(personalInformation);
    }

    getNotes(personalInformation){
        var notes = [];

        // waist value & waist unit
        notes.push(new Note("waist", this.getObjectProperty(personalInformation,"waist")));
        notes.push(new Note("waist_unit", this.getObjectProperty(personalInformation,"waist_unit")));
        // hip value & unit
        notes.push(new Note("hip", this.getObjectProperty(personalInformation,"hip")));
        notes.push(new Note("hip_unit", this.getObjectProperty(personalInformation,"hip_unit")));
        // ....

        return notes;
    }

    getRaceCodes(personalInformation){
        var races = this.getObjectProperty(personalInformation, "race");
        if(this.isUndefindOrNull(races)){
            return undefined;
        }
        var applicableRaces = this.getApplicableRaces(races) 
        var raceCodes = [];
        Object.keys(applicableRaces).forEach(function(index){
            var race = RaceUtil.getRace(applicableRaces[index]);
            raceCodes.push(new RaceCode(race.code,race.codeSystemName,race.displayName,race.id));
        });
        return raceCodes;
    }
    
    getApplicableRaces(races){
        var applicableRaces = [];
        Object.keys(races).forEach(function(key){
            if(races[key]){
                applicableRaces.push(key);
            }
        });
        return applicableRaces;
    }

    getRlatives(personalInformation){
        return undefined;
    }

    getSubjectOf2(personalInformation){
        return new SubjectOf2();
    }

    getXmlDataByJson(){
        var jsonOfXmlData = {};
        jsonOfXmlData.administrativeGenderCode = this.administrativeGenderCode.getXmlDataByJson(undefined);
        jsonOfXmlData.birthTime = this.birthTime.getXmlDataByJson(undefined);
        jsonOfXmlData.id = this.id.getXmlDataByJson(undefined);
        jsonOfXmlData.name = this.name.getXmlDataByJson(undefined);
        jsonOfXmlData.note = this.getNoteArray();
        jsonOfXmlData.raceCode = this.getRaceCodeArray();
        jsonOfXmlData.relative = this.getRelativeArray();
        jsonOfXmlData.subjectOf2 = this.subjectOf2.getXmlDataByJson(undefined);
        return jsonOfXmlData;
    }

    getNoteArray(){
        return undefined;
    }
    getRaceCodeArray(){
        return undefined;
    }
    getRelativeArray(){
        return undefined;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class AdministrativeGenderCode extends XmlTag {
    code;               // string
    codeSystemName;     // string
    displayName;        // string

    constructor(code, codeSystemName, displayName){
        super();
        this.code = code;
        this.codeSystemName = codeSystemName;
        this.displayName = displayName;
    }

    getXmlDataByJson(){
        var administrativeGenderCode = {};
        this.appendJsonElement(administrativeGenderCode, "attr_code", this.code);
        this.appendJsonElement(administrativeGenderCode, "attr_codeSystemName", this.codeSystemName);
        this.appendJsonElement(administrativeGenderCode, "attr_displayName", this.displayName);
        return this.returnUndefinedIfJsonIsEmpty(administrativeGenderCode);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class BirthTime extends XmlTag {
    value;  // string

    constructor(value){
        super();
        this.value = value;
    }

    getXmlDataByJson(){
        var birthTime = {};
        this.appendJsonElement(birthTime, "attr_value", this.value);
        return this.returnUndefinedIfJsonIsEmpty(birthTime);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Id extends XmlTag {
    extension;  // string

    constructor(extension){
        super();
        this.extension = extension;
    }

    getXmlDataByJson(){
        var id = {};
        this.appendJsonElement(id, "attr_extension", this.extension);
        return this.returnUndefinedIfJsonIsEmpty(id);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Name extends XmlTag {
    formatted;   // string

    constructor(formatted){
        super();
        this.formatted = formatted;
    }

    getXmlDataByJson(){
        var name = {};
        this.appendJsonElement(name, "attr_formatted", this.formatted);
        return this.returnUndefinedIfJsonIsEmpty(name);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class RaceCode extends XmlTag {
    code;               // string
    codeSystemName;     // string
    displayName;        // string
    id;                 // string

    constructor(code, codeSystemName, displayName, id){
        super();
        this.code = code;
        this.codeSystemName = codeSystemName;
        this.displayName = displayName;
        this.id = id;
    }

    getXmlDataByJson(){
        var raceCode = {};
        this.appendJsonElement(raceCode, "attr_code", this.code);
        this.appendJsonElement(raceCode, "attr_codeSystemName", this.codeSystemName);
        this.appendJsonElement(raceCode, "attr_displayName", this.displayName);
        this.appendJsonElement(raceCode, "attr_id", this.id);
        return this.returnUndefinedIfJsonIsEmpty(raceCode);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class SubjectOf2 extends XmlTag {
    clinicalObservations;   // XmlTag

    getXmlDataByJson(){
        var jsonOfXmlData = undefined;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class ClinicalObservation extends XmlTag {
    code;       // XmlTag
    subject;    // XmlTag
    value;      // XmlTag

    getXmlDataByJson(){
        var jsonOfXmlData = undefined;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Code extends XmlTag {
    code;               // string
    codeSystemName;     // string
    displayName;        // string
    originalText;       // string

    constructor(code, codeSystemName, displayName, originalText){
        super();
        this.code = code;
        this.codeSystemName = codeSystemName;
        this.displayName = displayName;
        this.originalText = originalText;
    }

    getXmlDataByJson(){
        var code = {};
        this.appendJsonElement(code, "attr_code", this.code);
        this.appendJsonElement(code, "attr_codeSystemName", this.codeSystemName);
        this.appendJsonElement(code, "attr_displayName", this.displayName);
        this.appendJsonElement(code, "attr_originalText", this.originalText);
        return this.returnUndefinedIfJsonIsEmpty(code);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Value extends XmlTag {
    value;  // string
    unit;   // string

    constructor(value, unit){
        super();
        this.value = value;
        this.unit = unit;
    }

    getXmlDataByJson(){
        var value = {};
        this.appendJsonElement(value, "attr_value", this.value);
        this.appendJsonElement(value, "attr_unit", this.unit);
        return this.returnUndefinedIfJsonIsEmpty(value);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Subject extends XmlTag {
    dataEstimatedAge;   // XmlTag

    getXmlDataByJson(){
        var jsonOfXmlData = undefined;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class DataEstimatedAge extends XmlTag {
    code;   // XmlTag

    getXmlDataByJson(){
        var jsonOfXmlData = undefined;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Relative extends XmlTag {
    code;                   // XmlTag
    relationshipHolder;     // XmlTag

    getXmlDataByJson(){
        var jsonOfXmlData = undefined;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class RelationshipHolder extends XmlTag {
    administrativeGenderCode;   // XmlTag
    id;                         // XmlTag
    name;                       // XmlTag
    relative;                   // XmlTag
    subjectOf2;                 // XmlTag

    getXmlDataByJson(){
        var jsonOfXmlData = undefined;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Note extends XmlTag {
    code;   // string
    text;   // string

    constructor(code, text){
        super();
        this.code = code;
        this.text = text;
    }

    getXmlDataByJson(){
        var note = {};
        this.appendJsonElement(note, "attr_code", this.code);
        this.appendJsonElement(note, "attr_text", this.text);
        return this.returnUndefinedIfJsonIsEmpty(note);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}
export { AdministrativeGenderCode,BirthTime,Id,Name,RaceCode,
    SubjectOf2,ClinicalObservation,Code,Value,Subject,DataEstimatedAge,
    PatientPerson,Relative,RelationshipHolder,Note,XmlTag };