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
