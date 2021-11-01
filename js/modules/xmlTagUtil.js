export class RaceUtil{
    static RACES = {
        "American Indian or Alaska Native":{
            "code":"",
            "codeSystemName":"",
            "displayName":"American Indian or Alaska Native",
            "id":""
        },
        "Asian":{
            "code":"1000000",
            "codeSystemName":"TBD",
            "displayName":"Asian",
            "id":"2"
        },
        "Black or African-American":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Black or African-American",
            "id":""
        },
        "Native Hawaiian or Other Pacific Islander":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Native Hawaiian or Other Pacific Islander",
            "id":""
        },
        "White":{
            "code":"",
            "codeSystemName":"",
            "displayName":"White",
            "id":""
        },
        "Asian Indian":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Asian Indian",
            "id":""
        },
        "Chinese":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Chinese",
            "id":""
        },
        "Filipino":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Filipino",
            "id":""
        },
        "Japanese":{
            "code":"2039-6",
            "codeSystemName":"HL7",
            "displayName":"Japanese",
            "id":"14"
        },
        "Korean":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Korean",
            "id":""
        },
        "Vietnamese":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Vietnamese",
            "id":""
        },
        "Other Asian":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Other Asian",
            "id":""
        },
        "Unknown Asian":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Unknown Asian",
            "id":""
        },
        "Chamorro":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Chamorro",
            "id":""
        },
        "Guamanian":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Guamanian",
            "id":""
        },
        "Native Hawaiian":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Native Hawaiian",
            "id":""
        },
        "Samoan":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Samoan",
            "id":""
        },
        "Unknown South Pacific Islander":{
            "code":"",
            "codeSystemName":"",
            "displayName":"Unknown South Pacific Islander",
            "id":""
        }
    };

    static getRace(key){
        return this.RACES[key];
    }

    static getRaceDataForPersonalInfomation(checkedKeys){
        var race = {};
        Object.keys(this.RACES).forEach(function(key){
            race[key] = RaceUtil.isMatch(key, checkedKeys);
        });
        return race;
    }

    static isMatch(key, checkedKeys){
        var isMatch = false;
        Object.keys(checkedKeys).forEach(function(checkedKey){
            isMatch = isMatch || (checkedKeys[checkedKey] === key);
        });
        return isMatch;
    }
}

export class RelativeUtil{
    static birthOrderRelations = {
        "self" : [ "brother", "sister", "self"]
        , "paternal" : [ "paternal_uncle", "paternal_aunt", "father" ]
        , "maternal" : [ "maternal_uncle", "maternal_aunt", "mother" ]
        , "children" : [ "son", "daughter" ]
    };

    static relationToGroup  = [
        {
            "code" :  "SELF"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Self"
            ,"group" : "self"
            ,"relation" : "self"
            ,"nestedRelation" : {
                "code" :  ""
                ,"codeSystemName" : ""
                ,"displayName" : ""
                ,"group" : ""
                ,"relation" : ""
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "NBRO"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Brother"
            ,"group" : "self"
            ,"relation" : "brother"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "NSIS"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Sister"
            ,"group" : "self"
            ,"relation" : "sister"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "PUNC"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Paternal Uncle"
            ,"group" : "paternal"
            ,"relation" : "paternal_uncle"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "PAUN"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Paternal Aunt"
            ,"group" : "paternal"
            ,"relation" : "paternal_aunt"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "PGRFTH"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Paternal Grandfather"
            ,"group" : "paternal"
            ,"relation" : "paternal_grandfather"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "PGRMTH"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Paternal Grandmother"
            ,"group" : "paternal"
            ,"relation" : "paternal_grandmother"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "NFTH"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Father"
            ,"group" : "paternal"
            ,"relation" : "father"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "MUNC"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Maternal Uncle"
            ,"group" : "maternal"
            ,"relation" : "maternal_uncle"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "MAUN"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Maternal Aunt"
            ,"group" : "maternal"
            ,"relation" : "maternal_aunt"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },        
        {
            "code" :  "MGRFTH"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Maternal Grandfather"
            ,"group" : "maternal"
            ,"relation" : "maternal_grandfather"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "MGRMTH"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Maternal Grandmother"
            ,"group" : "maternal"
            ,"relation" : "maternal_grandmother"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "NMTH"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Mother"
            ,"group" : "maternal"
            ,"relation" : "mother"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "NSON"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Son"
            ,"group" : "children"
            ,"relation" : "son"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
        {
            "code" :  "NDAU"
            ,"codeSystemName" : "HL7 Family History Model"
            ,"displayName" : "Daughter"
            ,"group" : "children"
            ,"relation" : "daughter"
            ,"nestedRelation" : {
                "code" :  "PAR"
                ,"codeSystemName" : "HL7 Family History Model"
                ,"displayName" : "Parent"
                ,"group" : "parent"
                ,"relation" : "parent"
                ,"nestedRelation" : {}
            }
        },
    ];

    static isMatchRelation(key){
        var isMatch = false;
        this.relationToGroup.forEach(function(relation){
            if(key.startsWith(relation.relation)){
                isMatch = true;
            }
        });
        return isMatch;
    }

    static getRelation(key){
        var rel = undefined;
        this.relationToGroup.forEach(function(relation){
            if(key.startsWith(relation.relation)){
                rel = relation;
            }
        });
        return rel;
    }
}
