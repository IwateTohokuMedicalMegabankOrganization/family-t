/**
 * this module defines xml tag classes what used in familiy-t
 */
 import {RaceUtil, RelativeUtil} from '../../js/modules/xmlTagUtil';
 //import {relationToGroup} from '../../js//fhh';



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
        if(element.startsWith("attr_")){
            if(!this.isUndefindOrNull(value)){
                json[element] = value;
            }
        }else{
            json[element] = value;
        }        
    }

    returnEmptyStringIfJsonLengthIsZero(json){
        if(this.isUndefindOrNull(json)
        || this.isEmpty(json) 
        || this.areAllElementsEmpty(json)){
            return "";
        }
        return json;
    }

    isEmpty(json){
        return !Object.keys(json).length;
    }

    areAllElementsEmpty(json){
        var allEmpty = true;
        Object.keys(json).forEach(function(key){
            allEmpty = allEmpty && json[key] === "";
        });
        return allEmpty;
    }

    getObjectProperty(object, propertyName){
        if(!this.isUndefindOrNull(object) && Object.keys(object).indexOf(propertyName) !== -1){
            return object[propertyName];
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
        var jsonOfXmlData = { "patientPerson" : this.returnEmptyStringIfJsonLengthIsZero() };
        return jsonOfXmlData;
    }

    setPatientPersonProps(personalInformation){
        this.administrativeGenderCode = new AdministrativeGenderCode(undefined,undefined,this.getObjectProperty(personalInformation,"gender"))
        this.birthTime = new BirthTime(this.getObjectProperty(personalInformation,"date_of_birth"));
        this.id = new Id(this.getObjectProperty(personalInformation,"id"));        
        this.name = new Name(this.getObjectProperty(personalInformation,"name"));
        this.notes = this.getNotes(personalInformation);
        this.raceCodes = this.getRaceCodes(personalInformation);
        this.relatives = this.getRelatives(personalInformation);
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

    getRelatives(personalInformation){
        if(this.isUndefindOrNull(personalInformation)){
            return undefined;
        }
        var relatives = [];
        Object.keys(personalInformation).forEach(function(key){
            // key がrelationToGroupの各relationと先頭一致するかどうか判定
            if(RelativeUtil.isMatchRelation(key)){
                var family = personalInformation[key];
                var relation = RelativeUtil.getRelation(key);
                relatives.push(new Relative(family, relation));
            }
        });
        return relatives;
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
        return this.returnEmptyStringIfJsonLengthIsZero(administrativeGenderCode);
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
        return this.returnEmptyStringIfJsonLengthIsZero(birthTime);
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
        return this.returnEmptyStringIfJsonLengthIsZero(id);
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
        return this.returnEmptyStringIfJsonLengthIsZero(name);
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
        return this.returnEmptyStringIfJsonLengthIsZero(raceCode);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class SubjectOf2 extends XmlTag {
    clinicalObservations;   // XmlTag

    getXmlDataByJson(){
        var jsonOfXmlData = "";
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
        return this.returnEmptyStringIfJsonLengthIsZero(code);
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
        return this.returnEmptyStringIfJsonLengthIsZero(value);
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

    constructor(family, relation){
        super();
        this.code = new Code(
            this.getObjectProperty(relation,"code"), 
            this.getObjectProperty(relation,"codeSystemName"), 
            this.getObjectProperty(relation,"displayName"),
            undefined);
        if(!this.isEmpty(relation)){
            this.relationshipHolder = new RelationshipHolder(family, 
                this.getObjectProperty(relation,"nestedRelation"));
        }        
    }

    getXmlDataByJson(){
        var relative = {};
        this.appendJsonElement(relative, "code", this.code.getXmlDataByJson());
        if(!this.isUndefindOrNull(this.relationshipHolder)){
            this.appendJsonElement(relative, "relationshipHolder", this.relationshipHolder.getXmlDataByJson());
        }else{
            this.appendJsonElement(relative, "relationshipHolder", "");
        }
        return this.returnEmptyStringIfJsonLengthIsZero(relative);
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

    constructor(family, relation){
        super();
        this.administrativeGenderCode = new AdministrativeGenderCode(undefined,undefined,this.getObjectProperty(family,"gender"));
        this.id = new Id(this.getObjectProperty(family,"id"));
        this.name = new Name(this.getObjectProperty(family,"name"));
        this.relative = new Relative(undefined, relation);
        this.subjectOf2 = new SubjectOf2(undefined);
    }

    getXmlDataByJson(){
        var relationshipHolder = {};
        this.appendJsonElement(relationshipHolder, "administrativeGenderCode", this.administrativeGenderCode.getXmlDataByJson());
        this.appendJsonElement(relationshipHolder, "id", this.id.getXmlDataByJson());
        this.appendJsonElement(relationshipHolder, "name", this.name.getXmlDataByJson());
        this.appendJsonElement(relationshipHolder, "relative", this.relative.getXmlDataByJson());
        this.appendJsonElement(relationshipHolder, "subjectOf2", this.subjectOf2.getXmlDataByJson());
        return this.returnEmptyStringIfJsonLengthIsZero(relationshipHolder);
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
        return this.returnEmptyStringIfJsonLengthIsZero(note);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}
export { AdministrativeGenderCode,BirthTime,Id,Name,RaceCode,
    SubjectOf2,ClinicalObservation,Code,Value,Subject,DataEstimatedAge,
    PatientPerson,Relative,RelationshipHolder,Note,XmlTag };