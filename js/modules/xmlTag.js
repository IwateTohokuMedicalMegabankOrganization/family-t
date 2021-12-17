/**
 * this module defines xml tag classes what used in familiy-t
 */
 import {RaceUtil, RelativeUtil, CodeUtil, NoteUtil} from '../../js/modules/xmlTagUtil';
 //import {relationToGroup} from '../../js//fhh';



import { get } from "jquery";

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
            if(this.isUndefindOrNull(value)) return;
            json[element] = value;
        }else{
            if(this.isUndefindOrNull(value)){
                json[element] = "";
            }else{
                json[element] = value;
            }
        }        
    }

    appendJsonElementFromTag(json, element, tag){
        if(this.isUndefindOrNull(tag) || this.isEmpty(tag)){
            this.appendJsonElement(json, element, "");
        }else{
            this.appendJsonElement(json, element, tag.getXmlDataByJson());
        }
    }

    appendJsonElementFromArray(json, element, tagArray){
        if(this.isUndefindOrNull(tagArray) || this.isEmpty(tagArray)){
            this.appendJsonElement(json, element, "");
        }else{
            var jsonArray = [];
            tagArray.forEach(function(tag){
                jsonArray.push(tag.getXmlDataByJson());
            });
            json[element] = jsonArray;
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
        if(this.isUndefindOrNull(json)) return true;
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
        /* 
        add_id
        add_name
        add_birthday
        add_prefectures
        add_gender
        add_all_ethnic_groups
        add_all_races
        add_clinical_observations
        add_relatives
         */
        if(this.isUndefindOrNull(personalInformation)) return;
        var gender = CodeUtil.getCode(this.getObjectProperty(personalInformation,"gender"));
        this.administrativeGenderCode = new AdministrativeGenderCode(gender.code,gender.codeSystemName,gender.displayName);
        this.birthTime = new BirthTime(this.getObjectProperty(personalInformation,"date_of_birth"));
        this.id = new Id(this.getObjectProperty(personalInformation,"id"));        
        this.name = new Name(this.getObjectProperty(personalInformation,"name"));
        this.notes = NoteUtil.getNotes(personalInformation);
        this.raceCodes = this.getRaceCodes(personalInformation);
        this.relatives = this.getRelatives(personalInformation);
        this.subjectOf2 = this.getSubjectOf2(personalInformation);
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
        return new SubjectOf2(personalInformation);
    }

    getXmlDataByJson(){
        var patientPerson = {};
        this.appendJsonElementFromTag(patientPerson,"administrativeGenderCode",this.administrativeGenderCode);
        this.appendJsonElementFromTag(patientPerson,"birthTime",this.birthTime);
        this.appendJsonElementFromTag(patientPerson,"id",this.id);
        this.appendJsonElementFromTag(patientPerson,"name",this.name);
        this.appendJsonElementFromArray(patientPerson,"note",this.notes);
        this.appendJsonElementFromArray(patientPerson,"raceCode",this.raceCodes);
        this.appendJsonElementFromArray(patientPerson,"relative",this.relatives);
        this.appendJsonElementFromTag(patientPerson,"subjectOf2",this.subjectOf2);
        return this.returnEmptyStringIfJsonLengthIsZero(patientPerson);
    }

    getPersonalInfomationData(persedXml){

        var personal_information = {};

        // Id
        if (this.isUndefindOrNull(persedXml.id)) return personal_information;
        this.id = new Id();
        Object.assign(personal_information, this.id.getPersonalInfomationData(persedXml.id));

        // Name
        if (this.isUndefindOrNull(persedXml.name)) return personal_information;
        this.name = new Name(persedXml.name.attr_formatted);
        Object.assign(personal_information, this.name.getPersonalInfomationData());

        // Birth Time
        if (this.isUndefindOrNull(persedXml.birthTime)) return personal_information;
        this.birthTime = new BirthTime();
        Object.assign(personal_information, this.birthTime.getPersonalInfomationData(persedXml.birthTime));

        // Administrative Gender Code
        if (this.isUndefindOrNull(persedXml.administrativeGenderCode)) return {};
        this.administrativeGenderCode = new AdministrativeGenderCode();
        Object.assign(personal_information, this.administrativeGenderCode.getPersonalInfomationData(persedXml.administrativeGenderCode));

        // RaceCode 
        if (this.isUndefindOrNull(persedXml.raceCode)) return {};
        var raceCode = new RaceCode(
            'code',
            'codeSystemName',
            'displayName',
            'id'
        );
        Object.assign(personal_information, raceCode.getPersonalInfomationData(persedXml.raceCode));

        // subjectOf2
        if (this.isUndefindOrNull(persedXml.subjectOf2)) return {};
        this.subjectOf2 = new SubjectOf2();
        Object.assign(personal_information, this.subjectOf2.getPersonalInfomationData(persedXml.subjectOf2));

        // relative
        if( this.isUndefindOrNull( persedXml.relative) ) return {};
        for( let r in persedXml.relative){
            var relative = new Relative();
            Object.assign( personal_information, relative.getPersonalInfomationData(r));
        }

        // note
        if (this.isUndefindOrNull(persedXml.note)) return {};
        for (let r in persedXml.note) {
            var note = new Note(
                r.attr_code,
                r.attr_text
            );
            Object.assign(personal_information, note.getPersonalInfomationData(r));
        }

        return personal_information;
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

    getPersonalInfomationData(parsedXml){
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "gender",  this._getAdministrativeGenderCode(parsedXml.attr_displayName).piCode );
        return personalInformation;
    }
    
    _getAdministrativeGenderCode(attr_displayName){
        if( this.isUndefindOrNull( attr_displayName ) )
            return this.AdministrativeGenderCodes.MALE;

        for(let gender in this.AdministrativeGenderCodes ){
            if( this.AdministrativeGenderCodes[gender].displayName.toUpperCase() == attr_displayName.toUpperCase() ){
                return this.AdministrativeGenderCodes[gender];
            }
        }
        return this.AdministrativeGenderCodes.MALE;
    }

    AdministrativeGenderCodes = {
        MALE: {
            code: 248153007
            , displayName : "male"
            , piCode : "MALE"
        },
        FEMALE: {
            code: 248152002
            , displayName : "female"
            , piCode : "FEMALE"
        }
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
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "date_of_birth",  this._getYYYYMMDD(persedXml.attr_value) );
        return personalInformation;
    }

    _getYYYYMMDD( value ){
        var d = new Date( value );
        if( isNaN( d ) ) d = new Date();
        return String(d.getFullYear()) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) ;
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
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "id",  persedXml.attr_extension );
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

    getPersonalInfomationData(){
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "name",  this.formatted );
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

    getPersonalInfomationData(aryRaceCode){
        var race = { "American Indian or Alaska Native": false, "Asian": false, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": false, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false };
        aryRaceCode.forEach(r => {
            race[ r.attr_displayName ] = true;
        });
        return race;
    }
}

class SubjectOf2 extends XmlTag {
    clinicalObservations;   // XmlTag

    constructor(personalInformation){
        super();
        this.clinicalObservations = this.getClinicalObservations(personalInformation);
    }

    getClinicalObservations(personalInformation){
        if(this.isUndefindOrNull(personalInformation)) return undefined;

        // reference : save_xml add_clinical_observations
        var clinicalObservations = [];
        this.appendByKey(clinicalObservations, personalInformation, 
            this.getObjectProperty(personalInformation,"twin_status"));
        // adopted
        // active
        this.appendByKey(clinicalObservations, personalInformation, "height");
        this.appendByKey(clinicalObservations, personalInformation, "weight");
        this.appendParentalConsanguinity(clinicalObservations);
        this.appendHealthHistory(clinicalObservations, personalInformation);
        this.appendCauseOfDeath(clinicalObservations, personalInformation);
        return clinicalObservations;
    }

    appendByKey(clinicalObservations, personalInformation, key){
        var attr = CodeUtil.getCode(key);
        if(this.isUndefindOrNull(attr)) return;
        var code = new Code(attr.code,attr.codeSystemName,attr.displayName,undefined);
        var keyValue = this.getObjectProperty(personalInformation,key);
        var keyUnit = this.getObjectProperty(personalInformation,key+"_unit");
        var value = new Value(keyValue,keyUnit);
        clinicalObservations.push(( new ClinicalObservation(code,undefined,undefined,value) ));
    }

    appendParentalConsanguinity(clinicalObservations){
        var text = "Parental consanguinity indicated";
        var code = new Code(undefined,undefined,undefined,text);
        clinicalObservations.push(new ClinicalObservation(code,undefined,undefined,undefined));
    }

    appendHealthHistory(clinicalObservations, personalInformation){
        var healthHistory = this.getObjectProperty(personalInformation,"Health History");
        healthHistory.forEach(function(history){
            // generate CodeTag for ClinicalObservationTag
            var diseas = CodeUtil.getCode(history["Disease Code"]);
            var code = new Code(diseas.code,diseas.codeSystemName,diseas.displayName,diseas.originText);
            
            // generate SubjectTag
            var ageAtDiag = CodeUtil.getCode("ESTIMATED_AGE");
            var deaCode = new Code(ageAtDiag.code,ageAtDiag.codeSystemName,ageAtDiag.displayName,history["Age At Diagnosis"]);
            var dateEstimateAge = new DataEstimatedAge(deaCode);
            var subject = new Subject(dateEstimateAge);

            clinicalObservations.push(new ClinicalObservation(code,undefined,subject,undefined));
        });
    }

    appendCauseOfDeath(clinicalObservations, personalInformation){
        if(this.isUndefindOrNull(this.getObjectProperty(personalInformation,"cause_of_death"))) return;
        if(this.isUndefindOrNull(this.getObjectProperty(personalInformation,"cause_of_death_code"))) return;

        var cause = CodeUtil.getCode(personalInformation.cause_of_death_code);
        var code = new Code(cause.code,cause.codeSystemName,cause.displayName,cause.originText);

        var death = CodeUtil.getCode("DEATH");
        var souceCode = new Code(death.code,death.codeSystemName,death.displayName,undefined);
        var sourceOf = new SourceOf(souceCode);
        clinicalObservations.push(new ClinicalObservation(code,sourceOf,undefined,undefined));
    }

    getXmlDataByJson(){
        var subjectOf2 = {};
        this.appendJsonElementFromArray(subjectOf2,"clinicalObservation",this.clinicalObservations);
        return this.returnEmptyStringIfJsonLengthIsZero(subjectOf2);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class ClinicalObservation extends XmlTag {
    code;       // XmlTag
    sourceOf;   // XmlTag
    subject;    // XmlTag
    value;      // XmlTag

    constructor(code,sourceOf,subject,value){
        super();
        this.code = code;
        this.sourceOf = sourceOf;
        this.subject = subject;
        this.value = value;
    }

    getXmlDataByJson(){
        var clinicalObservation = {};
        this.appendJsonElementFromTag(clinicalObservation, "code", this.code);
        this.appendJsonElementFromTag(clinicalObservation, "sourceOf", this.sourceOf);
        this.appendJsonElementFromTag(clinicalObservation, "subject", this.subject);
        this.appendJsonElementFromTag(clinicalObservation, "value", this.value);
        return this.returnEmptyStringIfJsonLengthIsZero(clinicalObservation);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation = {};

        // code
        if( this.isUndefindOrNull( persedXml ) ) return personalInformation;
        if( this.isUndefindOrNull( persedXml.code ) ) return personalInformation;
        this.code = new Code(persedXml.code.attr_code, persedXml.code.attr_codeSystemName, persedXml.code.attr_value);

        if(!this.isUndefindOrNull( persedXml.subject ) ) {
            this.subject = new Subject();
        }

        if (!this.isUndefindOrNull(persedXml.value)) {
            this.value = new Value(persedXml.value.attr_value, persedXml.value.attr_unit);
        }

        // Twin and Adopted Status
        Object.assign(personalInformation, this._getTwinStatus());

        // Height and Weight and actvity
        Object.assign(personalInformation, this._getHeight());

        // Personal Diseases

        // this.appendJsonElement(personalInformation, "code", this.code.getPersonalInfomationData(persedXml) ) ;
        // this.appendJsonElement(personalInformation, "relationshipHolder", this.relationshipHolder.getPersonalInfomationData(persedXml));

        // COD

        return personalInformation;
    }
    
    _getHeight(){
        var personalInformation = {};

        if( this.isUndefindOrNull( this.code ) ){
            return personalInformation;
        }

        if( this.HEIGHT.code == this.code.code ){
            if (!this.isUndefindOrNull(this.value.value)) {
                this.appendJsonElement(personalInformation, this.HEIGHT.piCode,  this.value.value );
                this.appendJsonElement(personalInformation, this.HEIGHT.piUnit,  this.value.unit );
            }
        }

        return personalInformation;
    }

    _getTwinStatus(){

        var personalInformation = {};

        if( this.isUndefindOrNull( this.code ) ){
            return personalInformation;
        }

        for(let st in this.TWIN_STATUS ){
            if( this.TWIN_STATUS[st].code == this.code.code ){
                this.appendJsonElement(personalInformation, "twin_status",  this.TWIN_STATUS[st].piCode );
            }
        }

        return personalInformation;
    }

    // _getAdministrativeGenderCode(){
    //     if( this.isUndefindOrNull( this.displayName ) )
    //         return this.AdministrativeGenderCodes.MALE;

    //     for(let gender in this.AdministrativeGenderCodes ){
    //         if( this.AdministrativeGenderCodes[gender].displayName.toUpperCase() == this.displayName.toUpperCase() ){
    //             return this.AdministrativeGenderCodes[gender];
    //         }
    //     }
    //     return this.AdministrativeGenderCodes.MALE;
    // }

    // AdministrativeGenderCodes = {
    //     MALE: {
    //         code: 248153007
    //         , displayName : "male"
    //         , piCode : "MALE"
    //     },
    //     FEMALE: {
    //         code: 248152002
    //         , displayName : "female"
    //         , piCode : "FEMALE"
    //     }
    // }

    // twin status
    TWIN_STATUS = {
        IDENTICAL: {
            code: 313415001
            , displayName : "Identical twin (person)"
            , piCode : "IDENTICAL"
        },
        FRATERNAL: {
            code: 313416000
            , displayName : "Fraternal twin (person)"
            , piCode : "FRATERNAL"
        }
    }

    // height and weight and activity
    HEIGHT = {
        code: 271603002
        , displayName : "height"
        , piCode: "height"
        , piUnit: "height_unit"
    }

    WEIGHT = {
        code: 271603002
        , displayName : "height"
        , piCode: "weight"
        , piUnit: "weight_unit"
    }

    // Adopted
    ADOPTED = {
        code: 160496001
        , displayName : "adopted"
        , piCode : true
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
        return new ReferenceError();
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

class SourceOf extends XmlTag {
    code;   //XmlTag

    constructor(code){
        super();
        this.code = code;
    }

    getXmlDataByJson(){
        var sourceOf = {};
        this.appendJsonElementFromTag(sourceOf,"code",this.code)
        return this.returnEmptyStringIfJsonLengthIsZero(sourceOf);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Subject extends XmlTag {
    dataEstimatedAge;   // XmlTag

    constructor(dataEstimatedAge){
        super();
        this.dataEstimatedAge = dataEstimatedAge;
    }

    getXmlDataByJson(){
        var subject = {};
        this.appendJsonElementFromTag(subject,"dataEstimatedAge",this.dataEstimatedAge)
        return this.returnEmptyStringIfJsonLengthIsZero(subject);
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class DataEstimatedAge extends XmlTag {
    code;   // XmlTag

    constructor(code){
        super();
        this.code = code;
    }

    getXmlDataByJson(){
        var dataEstimatedAge = {};
        this.appendJsonElementFromTag(dataEstimatedAge, "code", this.code);
        return this.returnEmptyStringIfJsonLengthIsZero(dataEstimatedAge);
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
        if(!this.isEmpty(this.getObjectProperty(relation,"nestedRelation"))){
            this.relationshipHolder = new RelationshipHolder(family, relation.nestedRelation);
        }        
    }

    getXmlDataByJson(){
        var relative = {};
        this.appendJsonElementFromTag(relative, "code", this.code);
        this.appendJsonElementFromTag(relative, "relationshipHolder", this.relationshipHolder);
        return this.returnEmptyStringIfJsonLengthIsZero(relative);
    }
    
    getPersonalInfomationData(persedXml){
        this.code = new Code( persedXml.attr_code, persedXml.attr_codeSystemName, persedXml.attr_displayName );
        this.relationshipHolder = new RelationshipHolder();

        var personalInformation = {};
        this.appendJsonElement(personalInformation, "code", this.code.getPersonalInfomationData(persedXml) ) ;
        this.appendJsonElement(personalInformation, "relationshipHolder", this.relationshipHolder.getPersonalInfomationData(persedXml));

        return personalInformation;
    }
}

class RelationshipHolder extends XmlTag {
    administrativeGenderCode;   // XmlTag
    id;                         // XmlTag
    name;                       // XmlTag
    notes;                      // XmlTags
    relative;                   // XmlTag
    subjectOf2;                 // XmlTag

    constructor(family, relation){
        super();
        var gender = CodeUtil.getCode(this.getObjectProperty(family,"gender"));
        this.administrativeGenderCode = new AdministrativeGenderCode(
            this.getObjectProperty(gender,"code"),
            this.getObjectProperty(gender,"codeSystemName"),
            this.getObjectProperty(gender,"displayName"));
        this.id = new Id(this.getObjectProperty(family,"id"));
        this.name = new Name(this.getObjectProperty(family,"name"));
        this.notes = NoteUtil.getNotes(family);
        this.relative = new Relative(undefined, relation);
        this.subjectOf2 = new SubjectOf2(undefined);
    }

    getNotes(family){
        return [];
    }

    getXmlDataByJson(){
        var relationshipHolder = {};
        this.appendJsonElementFromTag(relationshipHolder, "administrativeGenderCode", this.administrativeGenderCode);
        this.appendJsonElementFromTag(relationshipHolder, "id", this.id);
        this.appendJsonElementFromTag(relationshipHolder, "name", this.name);
        this.appendJsonElementFromArray(relationshipHolder,"note",this.notes);
        this.appendJsonElementFromTag(relationshipHolder, "relative", this.relative);
        this.appendJsonElementFromTag(relationshipHolder, "subjectOf2", this.subjectOf2);
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

    getPersonalInfomationData(){
        var personalInformation = {};
        if( this.isUndefindOrNull(this.code) ) return personalInformation;
        if( this.isUndefindOrNull(this.text) ) return personalInformation;
        this.appendJsonElement(personalInformation, this.code,  this.text );
        return personalInformation;
    }
}
export { AdministrativeGenderCode,BirthTime,Id,Name,RaceCode,
    SubjectOf2,ClinicalObservation,Code,Value,Subject,SourceOf,DataEstimatedAge,
    PatientPerson,Relative,RelationshipHolder,Note,XmlTag };