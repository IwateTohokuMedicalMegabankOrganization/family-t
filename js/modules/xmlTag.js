/**
 * this module defines xml tag classes what used in familiy-t
 */
import { RaceUtil, RelativeUtil, CodeUtil, NoteUtil, ValueUtil } from '../../js/modules/xmlTagUtil';

/**
 * base class 
 * 
 * this class enable to use template pattern
 */
class XmlTag {
    constructor() { }

    /**
     * get json of xml tags from personal information
     * @returns 
     */
    getXmlDataByJson() {
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    /**
     * get personal information data from persed XML data
     * @param {*} persedXml 
     * @returns 
     */
    getPersonalInfomationData(persedXml) {
        var personalInformation;
        return personalInformation;

    }

    isUndefindOrNull(value) {
        return value === undefined || value === null;
    }

    appendJsonElement(json, element, value) {
        if (element.startsWith("attr_")) {
            if (this.isUndefindOrNull(value)) return;
            json[element] = value;
        } else {
            if (this.isUndefindOrNull(value)) {
                json[element] = "";
            } else {
                json[element] = value;
            }
        }
    }

    appendJsonElementFromTag(json, element, tag) {
        if (this.isUndefindOrNull(tag) || this.isEmpty(tag)) {
            this.appendJsonElement(json, element, "");
        } else {
            this.appendJsonElement(json, element, tag.getXmlDataByJson());
        }
    }

    appendJsonElementFromArray(json, element, tagArray) {
        if (this.isUndefindOrNull(tagArray) || this.isEmpty(tagArray)) {
            this.appendJsonElement(json, element, "");
        } else {
            var jsonArray = [];
            tagArray.forEach(function (tag) {
                jsonArray.push(tag.getXmlDataByJson());
            });
            json[element] = jsonArray;
        }
    }

    returnEmptyStringIfJsonLengthIsZero(json) {
        if (this.isUndefindOrNull(json)
            || this.isEmpty(json)
            || this.areAllElementsEmpty(json)) {
            return "";
        }
        return json;
    }

    isEmpty(json) {
        if (this.isUndefindOrNull(json)) return true;
        return !Object.keys(json).length;
    }

    areAllElementsEmpty(json) {
        var allEmpty = true;
        Object.keys(json).forEach(function (key) {
            allEmpty = allEmpty && json[key] === "";
        });
        return allEmpty;
    }

    getObjectProperty(object, propertyName) {
        if (!this.isUndefindOrNull(object) && Object.keys(object).indexOf(propertyName) !== -1) {
            return object[propertyName];
        }
        return undefined;
    }

    getRaceCodes(personalInformation) {
        var races = this.getObjectProperty(personalInformation, "race");
        if (this.isUndefindOrNull(races)) {
            return undefined;
        }
        var applicableRaces = this.getApplicableRaces(races)
        var raceCodes = [];
        Object.keys(applicableRaces).forEach(function (index) {
            var race = RaceUtil.getRace(applicableRaces[index]);
            raceCodes.push(new RaceCode(race.code, race.codeSystemName, race.displayName, race.id));
        });
        return raceCodes;
    }

    getApplicableRaces(races) {
        var applicableRaces = [];
        Object.keys(races).forEach(function (key) {
            if (races[key]) {
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

    constructor(personalInformation) {
        super();
        this.setPatientPersonProps(personalInformation);
    }

    getXmlDataByJson() {
        var jsonOfXmlData = {};
        this.appendJsonElement(patientPerson, "patientPerson", this.getXmlDataByJson());
        var jsonOfXmlData = { "patientPerson": this.returnEmptyStringIfJsonLengthIsZero() };
        return jsonOfXmlData;
    }

    setPatientPersonProps(personalInformation) {
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
        if (this.isUndefindOrNull(personalInformation)) return;
        var gender = CodeUtil.getCode(this.getObjectProperty(personalInformation, "gender"));
        this.administrativeGenderCode = new AdministrativeGenderCode(gender.code, gender.codeSystemName, gender.displayName);
        this.birthTime = new BirthTime(this.getObjectProperty(personalInformation, "date_of_birth"));
        this.id = new Id(this.getObjectProperty(personalInformation, "id"));
        this.name = new Name(this.getObjectProperty(personalInformation, "name"));
        this.notes = NoteUtil.getNotes(personalInformation);
        this.raceCodes = this.getRaceCodes(personalInformation);
        this.relatives = this.getRelatives(personalInformation);
        this.subjectOf2 = this.getSubjectOf2(personalInformation);
    }



    getRelatives(personalInformation) {
        if (this.isUndefindOrNull(personalInformation)) {
            return undefined;
        }
        var relatives = [];
        Object.keys(personalInformation).forEach(function (key) {
            // key がrelationToGroupの各relationと先頭一致するかどうか判定
            if (RelativeUtil.isMatchRelation(key)) {
                var family = personalInformation[key];
                var relation = RelativeUtil.getRelation(key);
                relatives.push(new Relative(family, relation));
            }
        });
        return relatives;
    }

    getSubjectOf2(personalInformation) {
        return new SubjectOf2(personalInformation);
    }

    getXmlDataByJson() {
        var patientPerson = {};
        this.appendJsonElementFromTag(patientPerson, "administrativeGenderCode", this.administrativeGenderCode);
        this.appendJsonElementFromTag(patientPerson, "birthTime", this.birthTime);
        this.appendJsonElementFromTag(patientPerson, "id", this.id);
        this.appendJsonElementFromTag(patientPerson, "name", this.name);
        this.appendJsonElementFromArray(patientPerson, "note", this.notes);
        this.appendJsonElementFromArray(patientPerson, "raceCode", this.raceCodes);
        this.appendJsonElementFromArray(patientPerson, "relative", this.relatives);
        this.appendJsonElementFromTag(patientPerson, "subjectOf2", this.subjectOf2);
        return this.returnEmptyStringIfJsonLengthIsZero(patientPerson);
    }

    getPersonalInfomationData(persedXml) {

        var personal_information = {};
        console.log(persedXml);

        // Id
        if (this.isUndefindOrNull(persedXml.id)) return personal_information;
        this.id = new Id();
        Object.assign(personal_information, this.id.getPersonalInfomationData(persedXml.id));

        // Name
        if (this.isUndefindOrNull(persedXml.name)) return personal_information;
        this.name = new Name();
        Object.assign(personal_information, this.name.getPersonalInfomationData(persedXml.name));

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
        if (this.isUndefindOrNull(persedXml.relative)) return personal_information;
        for (let r of persedXml.relative) {
            var relative = new Relative();
            Object.assign(personal_information, relative.getPersonalInfomationData(r));
        }

        // note
        if (this.isUndefindOrNull(persedXml.note)) return personal_information;
        _parse_note(persedXml.note, personal_information);

        return personal_information;
    }
}

class AdministrativeGenderCode extends XmlTag {
    code;               // string
    codeSystemName;     // string
    displayName;        // string

    constructor(code, codeSystemName, displayName) {
        super();
        this.code = code;
        this.codeSystemName = codeSystemName;
        this.displayName = displayName;
    }

    getXmlDataByJson() {
        var administrativeGenderCode = {};
        this.appendJsonElement(administrativeGenderCode, "attr_code", this.code);
        this.appendJsonElement(administrativeGenderCode, "attr_codeSystemName", this.codeSystemName);
        this.appendJsonElement(administrativeGenderCode, "attr_displayName", this.displayName);
        return this.returnEmptyStringIfJsonLengthIsZero(administrativeGenderCode);
    }

    getPersonalInfomationData(parsedXml) {
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "gender", this._getAdministrativeGenderCode(parsedXml.attr_displayName).piCode);
        return personalInformation;
    }

    _getAdministrativeGenderCode(attr_displayName) {
        if (this.isUndefindOrNull(attr_displayName))
            return this.AdministrativeGenderCodes.MALE;

        for (let gender in this.AdministrativeGenderCodes) {
            if (this.AdministrativeGenderCodes[gender].displayName.toUpperCase() == attr_displayName.toUpperCase()) {
                return this.AdministrativeGenderCodes[gender];
            }
        }
        return this.AdministrativeGenderCodes.MALE;
    }

    AdministrativeGenderCodes = {
        MALE: {
            code: 248153007
            , displayName: "male"
            , piCode: "MALE"
        },
        FEMALE: {
            code: 248152002
            , displayName: "female"
            , piCode: "FEMALE"
        }
    }
}

class BirthTime extends XmlTag {
    value;  // string

    constructor(value) {
        super();
        this.value = value;
    }

    getXmlDataByJson() {
        var birthTime = {};
        this.appendJsonElement(birthTime, "attr_value", this.value);
        return this.returnEmptyStringIfJsonLengthIsZero(birthTime);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "date_of_birth", this._getYYYYMMDD(persedXml.attr_value));
        this.appendJsonElement(personalInformation, "year_of_birth", this._getYYYY(persedXml.attr_value));
        this.appendJsonElement(personalInformation, "month_of_birth", this._getMM(persedXml.attr_value));
        return personalInformation;
    }

    _getYYYYMMDD(value) {
        var d = new Date(value);
        if (isNaN(d)) d = new Date();
        return String(d.getFullYear()) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);
    }

    _getYYYY(value) {
        var d = new Date(value);
        if (isNaN(d)) d = new Date();
        return String(d.getFullYear());
    }

    _getMM(value) {
        var d = new Date(value);
        if (isNaN(d)) d = new Date();
        return String((d.getMonth() + 1));
    }

}

class Id extends XmlTag {
    extension;  // string

    constructor(extension) {
        super();
        this.extension = extension;
    }

    getXmlDataByJson() {
        var id = {};
        this.appendJsonElement(id, "attr_extension", this.extension);
        return this.returnEmptyStringIfJsonLengthIsZero(id);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "id", persedXml.attr_extension);
        return personalInformation;
    }
}

class Name extends XmlTag {
    formatted;   // string

    constructor(formatted) {
        super();
        this.formatted = formatted;
    }

    getXmlDataByJson() {
        var name = {};
        this.appendJsonElement(name, "attr_formatted", this.formatted);
        return this.returnEmptyStringIfJsonLengthIsZero(name);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        this.appendJsonElement(personalInformation, "name", persedXml.attr_formatted);
        return personalInformation;
    }
}

class RaceCode extends XmlTag {
    code;               // string
    codeSystemName;     // string
    displayName;        // string
    id;                 // string

    constructor(code, codeSystemName, displayName, id) {
        super();
        this.code = code;
        this.codeSystemName = codeSystemName;
        this.displayName = displayName;
        this.id = id;
    }

    getXmlDataByJson() {
        var raceCode = {};
        this.appendJsonElement(raceCode, "attr_code", this.code);
        this.appendJsonElement(raceCode, "attr_codeSystemName", this.codeSystemName);
        this.appendJsonElement(raceCode, "attr_displayName", this.displayName);
        this.appendJsonElement(raceCode, "attr_id", this.id);
        return this.returnEmptyStringIfJsonLengthIsZero(raceCode);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        var race = { "American Indian or Alaska Native": false, "Asian": false, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": false, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false };

        if (this.isUndefindOrNull(persedXml)) return race;

        if( Array.isArray( persedXml )){
            persedXml.forEach(r => {
                race[r.attr_displayName] = true;
            });
            return race;
        }

        if (this.isUndefindOrNull(persedXml.attr_displayName)) return personalInformation;
        race[persedXml.attr_displayName] = true;
        return race;
    }
}

class SubjectOf2 extends XmlTag {
    clinicalObservations;   // XmlTag

    constructor(personalInformation) {
        super();
        this.clinicalObservations = this.getClinicalObservations(personalInformation);
    }

    getClinicalObservations(personalInformation) {
        if (this.isUndefindOrNull(personalInformation)) return undefined;

        // reference : save_xml add_clinical_observations
        var clinicalObservations = [];
        this.appendByKey(clinicalObservations, personalInformation,
            this.getObjectProperty(personalInformation, "twin_status"));
        // adopted
        // active
        this.appendByKey(clinicalObservations, personalInformation, "height");
        this.appendByKey(clinicalObservations, personalInformation, "weight");
        this.appendParentalConsanguinity(clinicalObservations);
        this.appendHealthHistory(clinicalObservations, personalInformation);
        this.appendCauseOfDeath(clinicalObservations, personalInformation);
        return clinicalObservations;
    }

    appendByKey(clinicalObservations, personalInformation, key) {
        var attr = CodeUtil.getCode(key);
        if (this.isUndefindOrNull(attr)) return;
        var code = new Code(attr.code, attr.codeSystemName, attr.displayName, undefined);
        var keyValue = this.getObjectProperty(personalInformation, key);
        var keyUnit = this.getObjectProperty(personalInformation, key + "_unit");
        var value = new Value(keyValue, keyUnit);
        clinicalObservations.push((new ClinicalObservation(code, undefined, undefined, value)));
    }

    appendParentalConsanguinity(clinicalObservations) {
        var text = "Parental consanguinity indicated";
        var code = new Code(undefined, undefined, undefined, text);
        clinicalObservations.push(new ClinicalObservation(code, undefined, undefined, undefined));
    }

    appendHealthHistory(clinicalObservations, personalInformation) {
        var healthHistory = this.getObjectProperty(personalInformation, "Health History");

        if( this.isUndefindOrNull( healthHistory ) ) return;

        healthHistory.forEach(function (history) {
            // generate CodeTag for ClinicalObservationTag
            var diseas = CodeUtil.getCode(history["Disease Code"]);
            var code = new Code(diseas.code, diseas.codeSystemName, diseas.displayName, diseas.originText);

            // generate SubjectTag
            var ageAtDiag = CodeUtil.getCode("ESTIMATED_AGE");
            var deaCode = new Code(ageAtDiag.code, ageAtDiag.codeSystemName, ageAtDiag.displayName, history["Age At Diagnosis"]);
            var dateEstimateAge = new DataEstimatedAge(deaCode);
            var subject = new Subject(dateEstimateAge);

            clinicalObservations.push(new ClinicalObservation(code, undefined, subject, undefined));
        });
    }

    appendCauseOfDeath(clinicalObservations, personalInformation) {
        if (this.isUndefindOrNull(this.getObjectProperty(personalInformation, "cause_of_death"))) return;
        if (this.isUndefindOrNull(this.getObjectProperty(personalInformation, "cause_of_death_code"))) return;

        var cause = CodeUtil.getCode(personalInformation.cause_of_death_code);
        var code = new Code(cause.code, cause.codeSystemName, cause.displayName, cause.originText);

        var death = CodeUtil.getCode("DEATH");
        var souceCode = new Code(death.code, death.codeSystemName, death.displayName, undefined);
        var sourceOf = new SourceOf(souceCode);
        clinicalObservations.push(new ClinicalObservation(code, sourceOf, undefined, undefined));
    }

    getXmlDataByJson() {
        var subjectOf2 = {};
        this.appendJsonElementFromArray(subjectOf2, "clinicalObservation", this.clinicalObservations);
        return this.returnEmptyStringIfJsonLengthIsZero(subjectOf2);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};

        if (this.isUndefindOrNull(persedXml)) return personalInformation;
        if (this.isUndefindOrNull(persedXml.clinicalObservation)) return personalInformation;

        var clinicalObservation = new ClinicalObservation();
        Object.assign(personalInformation, clinicalObservation.getPersonalInfomationData(persedXml.clinicalObservation));

        return personalInformation;
    }
}

class ClinicalObservation extends XmlTag {
    code;       // XmlTag
    sourceOf;   // XmlTag
    subject;    // XmlTag
    value;      // XmlTag
    diseases;   // needs for cause of death

    constructor(code, sourceOf, subject, value) {
        super();
        this.code = code;
        this.sourceOf = sourceOf;
        this.subject = subject;
        this.value = value;

        this.diseases = require("../../data/diseases.json");

    }

    getXmlDataByJson() {
        var clinicalObservation = {};
        this.appendJsonElementFromTag(clinicalObservation, "code", this.code);
        this.appendJsonElementFromTag(clinicalObservation, "sourceOf", this.sourceOf);
        this.appendJsonElementFromTag(clinicalObservation, "subject", this.subject);
        this.appendJsonElementFromTag(clinicalObservation, "value", this.value);
        return this.returnEmptyStringIfJsonLengthIsZero(clinicalObservation);
    }

    getPersonalInfomationData(persedXml) {
        // default value
        var personalInformation = {
            twin_status: "NO",
            adopted: false,
            consanguinity: undefined,
            flg_race_ethnic: 1,
            "Health History": []
        };

        if (this.isUndefindOrNull(persedXml)) return personalInformation;
        if (!Array.isArray(persedXml)) return personalInformation;

        persedXml.forEach(obj => {
            Object.assign(personalInformation, this._getAClinicalObservation(obj));
            // Health History
            this._pushHealthHistory(personalInformation['Health History'], obj);
        });

        return personalInformation;
    }

    _pushHealthHistory(healthHistory, obj) {
        var history = this._getHealthHistory(obj);
        if (!history) return;
        healthHistory.push(history);
    }

    _getHealthHistory(obj) {
        var ret = false;

        // Family-T Healthy
        if (CodeUtil.isFamilyTHealthyCode(obj.code.attr_code, obj.code.attr_codeSystemName)) {
            var code = CodeUtil.CODE['FAMILY_T-HEALTHY'];
            console.log(
                {
                    "Age At Diagnosis": 'blank',
                    "Disease Name": code.displayName,
                    "Detailed Disease Name": code.originText,
                    "Disease Code": code.codeSystemName + "-" + code.code
                }
            );
            return {
                "Age At Diagnosis": 'blank',
                "Disease Name": code.displayName,
                "Detailed Disease Name": code.originText,
                "Disease Code": code.codeSystemName + "-" + code.code
            };
        }

        Object.keys(CodeUtil.CODE).forEach(function (key) {

            if( key.startsWith("SNOMED_CT-")){
                if (CodeUtil.CODE[key].code == obj.code.attr_code 
                    && CodeUtil.CODE[key].codeSystemName == obj.code.attr_codeSystemName
                    && obj.subject != 'undefined'   // 病歴（subject）が無いのに上記2条件を満たす場合がある。
                    && obj.subject != '') {
                    var code = CodeUtil.CODE[key];
                    ret = {
                        "Disease Name": code.displayName,
                        "Detailed Disease Name": code.originText,
                        "Age At Diagnosis": obj.subject.dataEstimatedAge.code.attr_originalText,
                        "Disease Code": code.codeSystemName + "-" + code.code
                    };
                }
            }

        });

        return ret;
    }

    _getAClinicalObservation(obj) {
        var personalInformation = {};

        // Twin status
        Object.assign(personalInformation, this._getTwinStatus(obj));

        // Adopted Status
        Object.assign(personalInformation, this._getAdopted(obj));

        // Height and Weight and actvity
        Object.assign(personalInformation, this._getHeight(obj));
        Object.assign(personalInformation, this._getWeight(obj));

        // Cause of Death
        Object.assign(personalInformation, this._getCauseOfDeath(obj));        

        return personalInformation;
    }

    _getWeight(obj) {
        var personalInformation = {};

        if (this.isUndefindOrNull(obj.code)) {
            return personalInformation;
        }

        if (this.WEIGHT.code == obj.code.attr_code) {
            if (!this.isUndefindOrNull(obj.value.attr_value)) {
                this.appendJsonElement(personalInformation, this.WEIGHT.piCode, obj.value.attr_value);
                this.appendJsonElement(personalInformation, this.WEIGHT.piUnit, obj.value.attr_unit);
            }
        }
        return personalInformation;
    }

    _getHeight(obj) {
        var personalInformation = {};

        if (this.isUndefindOrNull(obj.code)) {
            return personalInformation;
        }

        if (this.HEIGHT.code == obj.code.attr_code) {
            if (!this.isUndefindOrNull(obj.value.attr_value)) {
                this.appendJsonElement(personalInformation, this.HEIGHT.piCode, obj.value.attr_value);
                this.appendJsonElement(personalInformation, this.HEIGHT.piUnit, obj.value.attr_unit);
            }
        }
        return personalInformation;
    }

    _getTwinStatus(obj) {

        var personalInformation = {};

        if (this.isUndefindOrNull(obj.code)) {
            return personalInformation;
        }

        for (let st in this.TWIN_STATUS) {
            if (this.TWIN_STATUS[st].code == obj.code.attr_code) {
                this.appendJsonElement(personalInformation, "twin_status", this.TWIN_STATUS[st].piCode);
            }
        }

        return personalInformation;
    }

    _getAdopted(obj) {

        var personalInformation = {};

        if (this.isUndefindOrNull(obj.code)) {
            return personalInformation;
        }

        for (let st in this.ADOPTED) {
            if (this.ADOPTED.code == obj.code.attr_code) {
                this.appendJsonElement(personalInformation, "adopted", this.ADOPTED.piCode);
            }
        }

        return personalInformation;
    }

    _getCauseOfDeath(obj) {
        var personalInformation = {};
        

        if (this.isUndefindOrNull(obj.sourceOf)) {
            return personalInformation;
        }

        if (this.isUndefindOrNull(obj.sourceOf.code)) {
            return personalInformation;
        }

        if (!this.isUndefindOrNull(obj.sourceOf.code.attr_displayName)) {
            this.appendJsonElement(personalInformation, "is_alive", 'dead');
        }
        
        this.appendJsonElement(personalInformation, "cause_of_death", this._getCauseOfDeathName(obj.code.attr_code));
        this.appendJsonElement(personalInformation, "cause_of_death_code", obj.code.attr_codeSystemName + '-' + obj.code.attr_code);
        this.appendJsonElement(personalInformation, "detailed_cause_of_death", obj.code.attr_originalText);

        return personalInformation;        
    }

    _getCauseOfDeathName(diseaseCode) {
        var highLevelDiseaseList = Object.keys(this.diseases);
        for (var i=0; i<highLevelDiseaseList.length;i++) {
            var detailedDiseaseList = this.diseases[highLevelDiseaseList[i]];
            for (var j=0;j<detailedDiseaseList.length;j++) {
                if (detailedDiseaseList[j].code == diseaseCode) return highLevelDiseaseList[i];
            }
        }
        return 'other';
    }

    // twin status
    TWIN_STATUS = {
        IDENTICAL: {
            code: 313415001
            , displayName: "Identical twin (person)"
            , piCode: "IDENTICAL"
        },
        FRATERNAL: {
            code: 313416000
            , displayName: "Fraternal twin (person)"
            , piCode: "FRATERNAL"
        }
    }

    // height and weight and activity
    HEIGHT = {
        code: 271603002
        , displayName: "height"
        , piCode: "height"
        , piUnit: "height_unit"
    }

    WEIGHT = {
        code: 107647005
        , displayName: "weight"
        , piCode: "weight"
        , piUnit: "weight_unit"
    }

    // Adopted
    ADOPTED = {
        code: 160496001
        , displayName: "adopted"
        , piCode: true
    }
}

class Code extends XmlTag {
    code;               // string
    codeSystemName;     // string
    displayName;        // string
    originalText;       // string

    constructor(code, codeSystemName, displayName, originalText) {
        super();
        this.code = code;
        this.codeSystemName = codeSystemName;
        this.displayName = displayName;
        this.originalText = originalText;
    }

    getXmlDataByJson() {
        var code = {};
        this.appendJsonElement(code, "attr_code", this.code);
        this.appendJsonElement(code, "attr_codeSystemName", this.codeSystemName);
        this.appendJsonElement(code, "attr_displayName", this.displayName);
        this.appendJsonElement(code, "attr_originalText", this.originalText);
        return this.returnEmptyStringIfJsonLengthIsZero(code);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation;
        return personalInformation;
    }
}

class Value extends XmlTag {
    value;  // string
    unit;   // string

    constructor(value, unit) {
        super();
        this.value = value;
        this.unit = unit;
    }

    getXmlDataByJson() {
        var value = {};
        this.appendJsonElement(value, "attr_value", this.value);
        this.appendJsonElement(value, "attr_unit", this.unit);
        return this.returnEmptyStringIfJsonLengthIsZero(value);
    }
}

/**
 * Estimated Age Code
 * e.g. ) child 
 */
class EstimatedAgeValue extends Code {

    /**
     * { personal_information value : xmlValue }
     */
    static ESTIMATED_AGE_VALUE = {
        "prebirth": "prebirth",
        "unknown": "unknown",
        "newborn": { unit: "day", low: { value: "0" }, high: { value: "28" } },
        "infant": { unit: "day", low: { value: "29" }, high: { value: "730" } },
        "child": { unit: "year", low: { value: "2" }, high: { value: "9" } },
        "early_teen": { unit: "year", low: { value: "10" }, high: { value: "14" } },
        "late_teen": { unit: "year", low: { value: "15" }, high: { value: "19" } },
        "early_twenties": { unit: "year", low: { value: "20" }, high: { value: "24" } },
        "late_twenties": { unit: "year", low: { value: "25" }, high: { value: "29" } },
        "early_thirties": { unit: "year", low: { value: "30" }, high: { value: "34" } },
        "late_thirties": { unit: "year", low: { value: "35" }, high: { value: "39" } },
        "early_fourties": { unit: "year", low: { value: "40" }, high: { value: "44" } },
        "late_fourties": { unit: "year", low: { value: "45" }, high: { value: "49" } },
        "early_fifties": { unit: "year", low: { value: "50" }, high: { value: "54" } },
        "late_fifties": { unit: "year", low: { value: "55" }, high: { value: "59" } },
        "early_sixties": { unit: "year", low: { value: "60" }, high: { value: "64" } },
        "late_sixties": { unit: "year", low: { value: "65" }, high: { value: "69" } },
        "senior": { unit: "year", low: { value: "70" } }
    }

    getPersonalInfomationData(persedXml) {
        var defaultKey = 'unknown';
        var retCode = defaultKey;

        if (this.isUndefindOrNull(persedXml)) return retCode;
        for (const key in this.ESTIMATED_AGE_VALUE) {
            if (this.ESTIMATED_AGE_VALUE[key] === persedXml) {
                retCode = key;
                return retCode;
            }
        }

        if (this.isUndefindOrNull(persedXml.attr_unit)) return retCode;
        if (this.isUndefindOrNull(persedXml.low)) return retCode;

        for (const key in this.ESTIMATED_AGE_VALUE) {
            if (this.ESTIMATED_AGE_VALUE[key].unit == persedXml.attr_unit) {
                if (this.ESTIMATED_AGE_VALUE[key].low.value == persedXml.low.attr_value) {
                    retCode = key;
                    return retCode;
                }
            }
        }

        return retCode;
    }
}

class SourceOf extends XmlTag {
    code;   //XmlTag

    constructor(code) {
        super();
        this.code = code;
    }

    getXmlDataByJson() {
        var sourceOf = {};
        this.appendJsonElementFromTag(sourceOf, "code", this.code)
        return this.returnEmptyStringIfJsonLengthIsZero(sourceOf);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation;
        return personalInformation;
    }
}

class Subject extends XmlTag {
    dataEstimatedAge;   // XmlTag

    constructor(dataEstimatedAge) {
        super();
        this.dataEstimatedAge = dataEstimatedAge;
    }

    getXmlDataByJson() {
        var subject = {};
        this.appendJsonElementFromTag(subject, "dataEstimatedAge", this.dataEstimatedAge)
        return this.returnEmptyStringIfJsonLengthIsZero(subject);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        if (this.isUndefindOrNull(persedXml)) return personalInformation;
        if (this.isUndefindOrNull(persedXml.dataEstimatedAge)) return personalInformation;

        return (new DataEstimatedAge()).getPersonalInfomationData(persedXml.dataEstimatedAge);
    }
}

class DataEstimatedAge extends XmlTag {
    code;   // XmlTag

    constructor(code) {
        super();
        this.code = code;
    }

    getXmlDataByJson() {
        var dataEstimatedAge = {};
        this.appendJsonElementFromTag(dataEstimatedAge, "code", this.code);
        return this.returnEmptyStringIfJsonLengthIsZero(dataEstimatedAge);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        if (this.isUndefindOrNull(persedXml)) return personalInformation;
        if (this.isUndefindOrNull(persedXml.code)) return personalInformation;
        if (!CodeUtil.isEstimatedAge(persedXml.code.attr_code, persedXml.code.attr_codeSystemName)) return personalInformation;

        return { "estimated_age": (new EstimatedAgeValue()).getPersonalInfomationData(persedXml.code.value) };
    }
}

class Relative extends XmlTag {
    code;                   // XmlTag
    relationshipHolder;     // XmlTag

    constructor(family, relation) {
        super();
        this.code = new Code(
            this.getObjectProperty(relation, "code"),
            this.getObjectProperty(relation, "codeSystemName"),
            this.getObjectProperty(relation, "displayName"),
            undefined);
        if (!this.isEmpty(this.getObjectProperty(relation, "nestedRelation"))) {
            this.relationshipHolder = new RelationshipHolder(family, relation.nestedRelation);
        }
    }

    getXmlDataByJson() {
        var relative = {};
        this.appendJsonElementFromTag(relative, "code", this.code);
        this.appendJsonElementFromTag(relative, "relationshipHolder", this.relationshipHolder);
        return this.returnEmptyStringIfJsonLengthIsZero(relative);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        if (this.isUndefindOrNull(persedXml)) return personalInformation;
        if (this.isUndefindOrNull(persedXml.code)) return personalInformation;

        // TODO this.code = new Code(); ?
        var relationship = RelativeUtil.getRelationByCode(persedXml.code.attr_code);
        personalInformation[relationship.relation] = {};

        if (this.isUndefindOrNull(persedXml.relationshipHolder)) return personalInformation;
        this.relationshipHolder = new RelationshipHolder();
        Object.assign(personalInformation[relationship.relation], this.relationshipHolder.getPersonalInfomationData(persedXml.relationshipHolder));

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

    constructor(family, relation) {
        super();
        var gender = CodeUtil.getCode(this.getObjectProperty(family, "gender"));
        this.administrativeGenderCode = new AdministrativeGenderCode(
            this.getObjectProperty(gender, "code"),
            this.getObjectProperty(gender, "codeSystemName"),
            this.getObjectProperty(gender, "displayName"));
        this.id = new Id(this.getObjectProperty(family, "id"));
        this.name = new Name(this.getObjectProperty(family, "name"));
        this.notes = NoteUtil.getNotes(family);
        this.relative = new Relative(undefined, relation);
        this.subjectOf2 = new SubjectOf2(family);
    }

    getNotes(family) {
        return [];
    }

    getXmlDataByJson() {
        var relationshipHolder = {};
        this.appendJsonElementFromTag(relationshipHolder, "administrativeGenderCode", this.administrativeGenderCode);
        this.appendJsonElementFromTag(relationshipHolder, "id", this.id);
        this.appendJsonElementFromTag(relationshipHolder, "name", this.name);
        this.appendJsonElementFromArray(relationshipHolder, "note", this.notes);
        this.appendJsonElementFromTag(relationshipHolder, "relative", this.relative);
        this.appendJsonElementFromTag(relationshipHolder, "subjectOf2", this.subjectOf2);
        return this.returnEmptyStringIfJsonLengthIsZero(relationshipHolder);
    }

    getPersonalInfomationData(persedXml) {
        var personal_information = {};
        // Administrative Gender Code
        if (this.isUndefindOrNull(persedXml.administrativeGenderCode)) return {};
        this.administrativeGenderCode = new AdministrativeGenderCode();
        Object.assign(personal_information, this.administrativeGenderCode.getPersonalInfomationData(persedXml.administrativeGenderCode));

        // Id
        if (this.isUndefindOrNull(persedXml.id)) return personal_information;
        this.id = new Id();
        Object.assign(personal_information, this.id.getPersonalInfomationData(persedXml.id));

        // Name
        if (this.isUndefindOrNull(persedXml.name)) return personal_information;
        this.name = new Name();
        Object.assign(personal_information, this.name.getPersonalInfomationData(persedXml.name));

        // relative
        if (this.isUndefindOrNull(persedXml.relative)) return personal_information;
        for (let r in persedXml.relative) {
            var relative = new Relative();
            Object.assign(personal_information, relative.getPersonalInfomationData(r));
        }

        // note
        if (this.isUndefindOrNull(persedXml.note)) return personal_information;
        _parse_note(persedXml.note, personal_information);

        // subjectOf2
        if (this.isUndefindOrNull(persedXml.subjectOf2)) return personal_information;
        this.subjectOf2 = new SubjectOf2();
        Object.assign(personal_information, this.subjectOf2.getPersonalInfomationData(persedXml.subjectOf2));

        return personal_information;
    }
}

class Note extends XmlTag {
    code;   // string
    text;   // string

    constructor(code, text) {
        super();
        this.code = code;
        this.text = text;
    }

    getXmlDataByJson() {
        var note = {};
        this.appendJsonElement(note, "attr_code", this.code);
        this.appendJsonElement(note, "attr_text", this.text);
        return this.returnEmptyStringIfJsonLengthIsZero(note);
    }

    getPersonalInfomationData(persedXml) {
        var personalInformation = {};
        if (this.isUndefindOrNull(persedXml.attr_code)) return personalInformation;
        if (this.isUndefindOrNull(persedXml.attr_text)) return personalInformation;
        this.appendJsonElement(personalInformation, persedXml.attr_code, persedXml.attr_text);
        return personalInformation;
    }
}
export {
    AdministrativeGenderCode, BirthTime, Id, Name, RaceCode,
    SubjectOf2, ClinicalObservation, Code, Value, Subject, SourceOf, DataEstimatedAge,
    PatientPerson, Relative, RelationshipHolder, Note, XmlTag, EstimatedAgeValue
};

function _parse_note(note, personal_information) {

    if( Array.isArray( note ) ){
        for (let r of note) {
            Object.assign(personal_information, _getNote(r));
        }
        return;
    }

    Object.assign(personal_information, _getNote(note));

    function _getNote(r) {
        var note = new Note();
        return note.getPersonalInfomationData(r);
    }
}
