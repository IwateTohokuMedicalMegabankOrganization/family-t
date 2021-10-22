/**
 * this module defines xml tag classes what used in familiy-t
 */

/**
 * base class 
 * 
 * this class enable to use template pattern
 */
class XmlTag {
    /**
     * get json of xml tags from personal information
     * @param {*} personalInformation 
     * @returns 
     */
    getXmlDataByJson(personalInformation){
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
}

class PatientPerson extends XmlTag {
    administrativeGenderCode;   // XmlTag
    birthTime;                  // XmlTag
    id;                         // XmlTag
    name;                       // XmlTag
    raceCodes;                  // XmlTag
    relatives;                  // XmlTag
    subjectOf2;                 // XmlTag

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class AdministrativeGenderCode extends XmlTag {
    code;               // string
    codeSystemName;     // string
    disuplayName;       // string

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class BirthTime extends XmlTag {
    value;  // string

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Id extends XmlTag {
    extension;  // string

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Name extends XmlTag {
    name;   // string

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
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

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class SubjectOf2 extends XmlTag {
    clinicalObservations;   // XmlTag

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
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

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
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

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Value extends XmlTag {
    value;  // string
    unit;   // string

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class Subject extends XmlTag {
    dataEstimatedAge;   // XmlTag

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}

class DataEstimatedAge extends XmlTag {
    code;   // XmlTag

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
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

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
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

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
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

    getXmlDataByJson(personalInformation){
        var jsonOfXmlData;
        return jsonOfXmlData;
    }

    getPersonalInfomationData(persedXml){
        var personalInformation;
        return personalInformation;
    }
}
