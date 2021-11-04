import { Note } from "./XmlTag";

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
    static BIRTH_ORDER_RELATIONS = {
        "self" : [ "brother", "sister", "self"]
        , "paternal" : [ "paternal_uncle", "paternal_aunt", "father" ]
        , "maternal" : [ "maternal_uncle", "maternal_aunt", "mother" ]
        , "children" : [ "son", "daughter" ]
    };

    static RELATION_TO_GROUP  = [
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
        this.RELATION_TO_GROUP.forEach(function(relation){
            if(key.startsWith(relation.relation)){
                isMatch = true;
            }
        });
        return isMatch;
    }

    static getRelation(key){
        var rel = undefined;
        this.RELATION_TO_GROUP.forEach(function(relation){
            if(key.startsWith(relation.relation)){
                rel = relation;
            }
        });
        return rel;
    }
}

export class CodeUtil{
    static CODE = {
        "MALE" : {"code":"248153007","codeSystemName":"SNOMED_CT","displayName":"male","originText":""},
        "FEMALE" : {"code":"248152002","codeSystemName":"SNOMED_CT","displayName":"female","originText":""},
        "height" : {"code":"271603002","codeSystemName":"SNOMED_CT","displayName":"height","originText":""},
        "weight" : {"code":"107647005","codeSystemName":"SNOMED_CT","displayName":"weight","originText":""},
        "DEATH" : {"code":"419620001","codeSystemName":"SNOMED_CT","displayName":"death","originText":""},
        "IDENTICAL" : {"code":"313415001","codeSystemName":"SNOMED_CT","displayName":"Identical twin (person)","originText":""},
        "FRATERNAL" : {"code":"313416000","codeSystemName":"SNOMED_CT","displayName":"Fraternal twin (person)","originText":""},
        "ADOPTED" : {"code":"160496001","codeSystemName":"SNOMED_CT","displayName":"adopted","originText":""},
        "PHYSICALLY_ACTIVE" : {"code":"228447005","codeSystemName":"SNOMED_CT","displayName":"Physically Active","originText":""},
        "ESTIMATED_AGE" : {"code":"21611-9","codeSystemName":"LOINC","displayName":"Estimated Age","originText":""},
        "AGE_AT_DEATH" : {"code":"39016-1","codeSystemName":"LOINC","displayName":"Age at Death","originText":""},
        "SNOMED_CT-55822004" : {"code":"55822004","codeSystemName":"SNOMED_CT","displayName":"High Cholesterol","originText":"High Cholesterol"},
        "SNOMED_CT-38341003" : {"code":"38341003","codeSystemName":"SNOMED_CT","displayName":"Hypertension/high blood pressure","originText":"Hypertension/high blood pressure"},
        "SNOMED_CT-19829001" : {"code":"19829001","codeSystemName":"SNOMED_CT","displayName":"Lung Disease","originText":"Lung Disease"},
        "SNOMED_CT-26929004" : {"code":"26929004","codeSystemName":"SNOMED_CT","displayName":"Dementia/Alzheimer's","originText":"Dementia/Alzheimer's"},
        "SNOMED_CT-64859006" : {"code":"64859006","codeSystemName":"SNOMED_CT","displayName":"Osteoporosis/bone mineral loss","originText":"Osteoporosis/bone mineral loss"},
        "SNOMED_CT-105592009" : {"code":"105592009","codeSystemName":"SNOMED_CT","displayName":"Septicemia/bloodstream infection","originText":"Septicemia/bloodstream infection"},
        "SNOMED_CT-10001005" : {"code":"10001005","codeSystemName":"SNOMED_CT","displayName":"Septicemia","originText":"Septicemia"},
        "SNOMED_CT-116288000" : {"code":"116288000","codeSystemName":"SNOMED_CT","displayName":"Stroke/Brain Attack","originText":"Stroke/Brain Attack"},
        "SNOMED_CT-422504002" : {"code":"422504002","codeSystemName":"SNOMED_CT","displayName":"Stroke/Brain Attack","originText":"Stroke/Brain Attack"},
        "SNOMED_CT-51178009" : {"code":"51178009","codeSystemName":"SNOMED_CT","displayName":"Sudden Infant Death Syndrome","originText":"Sudden Infant Death Syndrome"},
        "SNOMED_CT-46635009" : {"code":"46635009","codeSystemName":"SNOMED_CT","displayName":"Type 1 Diabetes","originText":"Type 1 Diabetes"},
        "SNOMED_CT-44054006" : {"code":"44054006","codeSystemName":"SNOMED_CT","displayName":"Type 2 Diabetes","originText":"Type 2 Diabetes"},
        "SNOMED_CT-11687002" : {"code":"11687002","codeSystemName":"SNOMED_CT","displayName":"Gestational Diabetes","originText":"Gestational Diabetes"},
        "SNOMED_CT-73211009" : {"code":"73211009","codeSystemName":"SNOMED_CT","displayName":"Diabetes","originText":"Diabetes"},
        "SNOMED_CT-197480006" : {"code":"197480006","codeSystemName":"SNOMED_CT","displayName":"Anxiety","originText":"Anxiety"},
        "SNOMED_CT-48694002" : {"code":"48694002","codeSystemName":"SNOMED_CT","displayName":"Anxiety","originText":"Anxiety"},
        "SNOMED_CT-406506008" : {"code":"406506008","codeSystemName":"SNOMED_CT","displayName":"Attention Deficit Disorder-Hyperactivity","originText":"Attention Deficit Disorder-Hyperactivity"},
        "SNOMED_CT-408856003" : {"code":"408856003","codeSystemName":"SNOMED_CT","displayName":"Autism","originText":"Autism"},
        "SNOMED_CT-13746004" : {"code":"13746004","codeSystemName":"SNOMED_CT","displayName":"Bipolar Disorder","originText":"Bipolar Disorder"},
        "SNOMED_CT-52448006" : {"code":"52448006","codeSystemName":"SNOMED_CT","displayName":"Dementia","originText":"Dementia"},
        "SNOMED_CT-35489007" : {"code":"35489007","codeSystemName":"SNOMED_CT","displayName":"Depression","originText":"Depression"},
        "SNOMED_CT-72366004" : {"code":"72366004","codeSystemName":"SNOMED_CT","displayName":"Eating Disorder","originText":"Eating Disorder"},
        "SNOMED_CT-191736004" : {"code":"191736004","codeSystemName":"SNOMED_CT","displayName":"Obsessive Compulsive Disorder","originText":"Obsessive Compulsive Disorder"},
        "SNOMED_CT-371631005" : {"code":"371631005","codeSystemName":"SNOMED_CT","displayName":"Panic Disorder","originText":"Panic Disorder"},
        "SNOMED_CT-33449004" : {"code":"33449004","codeSystemName":"SNOMED_CT","displayName":"Personality Disorder","originText":"Personality Disorder"},
        "SNOMED_CT-47505003" : {"code":"47505003","codeSystemName":"SNOMED_CT","displayName":"Post Traumatic Stress Disorder","originText":"Post Traumatic Stress Disorder"},
        "SNOMED_CT-58214004" : {"code":"58214004","codeSystemName":"SNOMED_CT","displayName":"Schizophrenia","originText":"Schizophrenia"},
        "SNOMED_CT-25501002" : {"code":"25501002","codeSystemName":"SNOMED_CT","displayName":"Social Phobia","originText":"Social Phobia"},
        "SNOMED_CT-195967001" : {"code":"195967001","codeSystemName":"SNOMED_CT","displayName":"Asthma","originText":"Asthma"},
        "SNOMED_CT-63480004" : {"code":"63480004","codeSystemName":"SNOMED_CT","displayName":"Chronic Bronchitis","originText":"Chronic Bronchitis"},
        "SNOMED_CT-196229000" : {"code":"196229000","codeSystemName":"SNOMED_CT","displayName":"Chronic Lower Respiratory Disease","originText":"Chronic Lower Respiratory Disease"},
        "SNOMED_CT-13645005" : {"code":"13645005","codeSystemName":"SNOMED_CT","displayName":"COPD","originText":"COPD"},
        "SNOMED_CT-87433001" : {"code":"87433001","codeSystemName":"SNOMED_CT","displayName":"Emphysema","originText":"Emphysema"},
        "SNOMED_CT-195878008" : {"code":"195878008","codeSystemName":"SNOMED_CT","displayName":"Influenza/Pneumonia","originText":"Influenza/Pneumonia"},
        "SNOMED_CT-236439005" : {"code":"236439005","codeSystemName":"SNOMED_CT","displayName":"Cystic Kidney Disease","originText":"Cystic Kidney Disease"},
        "SNOMED_CT-127013003" : {"code":"127013003","codeSystemName":"SNOMED_CT","displayName":"Diabetic Kidney Disease","originText":"Diabetic Kidney Disease"},
        "SNOMED_CT-52845002" : {"code":"52845002","codeSystemName":"SNOMED_CT","displayName":"Nephritis","originText":"Nephritis"},
        "SNOMED_CT-90708001" : {"code":"90708001","codeSystemName":"SNOMED_CT","displayName":"Kidney Nephrosis/Nephrotic syndrome","originText":"Kidney Nephrosis/Nephrotic syndrome"},
        "SNOMED_CT-52254009" : {"code":"52254009","codeSystemName":"SNOMED_CT","displayName":"Nephrotic Syndrome","originText":"Nephrotic Syndrome"},
        "SNOMED_CT-82525005" : {"code":"82525005","codeSystemName":"SNOMED_CT","displayName":"Kidney Disease Present from Birth","originText":"Kidney Disease Present from Birth"},
        "SNOMED_CT-269466003" : {"code":"269466003","codeSystemName":"SNOMED_CT","displayName":"Bone Cancer","originText":"Bone Cancer"},
        "SNOMED_CT-254837009" : {"code":"254837009","codeSystemName":"SNOMED_CT","displayName":"Breast Cancer","originText":"Breast Cancer"},
        "SNOMED_CT-363406005" : {"code":"363406005","codeSystemName":"SNOMED_CT","displayName":"Colon Cancer","originText":"Colon Cancer"},
        "SNOMED_CT-363402007" : {"code":"363402007","codeSystemName":"SNOMED_CT","displayName":"Esophageal Cancer","originText":"Esophageal Cancer"},
        "SNOMED_CT-363349007" : {"code":"363349007","codeSystemName":"SNOMED_CT","displayName":"Gastric Cancer","originText":"Gastric Cancer"},
        "SNOMED_CT-363518003" : {"code":"363518003","codeSystemName":"SNOMED_CT","displayName":"Kidney Cancer","originText":"Kidney Cancer"},
        "SNOMED_CT-93143009" : {"code":"93143009","codeSystemName":"SNOMED_CT","displayName":"Leukemia","originText":"Leukemia"},
        "SNOMED_CT-363358000" : {"code":"363358000","codeSystemName":"SNOMED_CT","displayName":"Lung Cancer","originText":"Lung Cancer"},
        "SNOMED_CT-93880001" : {"code":"93880001","codeSystemName":"SNOMED_CT","displayName":"Lung Cancer","originText":"Lung Cancer"},
        "SNOMED_CT-363495004" : {"code":"363495004","codeSystemName":"SNOMED_CT","displayName":"Muscle Cancer","originText":"Muscle Cancer"},
        "SNOMED_CT-363443007" : {"code":"363443007","codeSystemName":"SNOMED_CT","displayName":"Ovarian Cancer","originText":"Ovarian Cancer"},
        "SNOMED_CT-399068003" : {"code":"399068003","codeSystemName":"SNOMED_CT","displayName":"Prostate Cancer","originText":"Prostate Cancer"},
        "SNOMED_CT-372130007" : {"code":"372130007","codeSystemName":"SNOMED_CT","displayName":"Skin Cancer","originText":"Skin Cancer"},
        "SNOMED_CT-363478007" : {"code":"363478007","codeSystemName":"SNOMED_CT","displayName":"Thyroid Cancer","originText":"Thyroid Cancer"},
        "SNOMED_CT-371973000" : {"code":"371973000","codeSystemName":"SNOMED_CT","displayName":"Uterine Cancer","originText":"Uterine Cancer"},
        "SNOMED_CT-315058005" : {"code":"315058005","codeSystemName":"SNOMED_CT","displayName":"Lynch Syndrome/Hereditary non-polyposis colorectal cancer (HNPCC)","originText":"Lynch Syndrome/Hereditary non-polyposis colorectal cancer (HNPCC)"},
        "SNOMED_CT-363418001" : {"code":"363418001","codeSystemName":"SNOMED_CT","displayName":"Pancreatic Cancer","originText":"Pancreatic Cancer"},
        "SNOMED_CT-93870000" : {"code":"93870000","codeSystemName":"SNOMED_CT","displayName":"Liver Cancer","originText":"Liver Cancer"},
        "SNOMED_CT-1000000" : {"code":"1000000","codeSystemName":"SNOMED_CT","displayName":"Brain Cancer","originText":"Brain Cancer"},
        "SNOMED_CT-126952004" : {"code":"126952004","codeSystemName":"SNOMED_CT","displayName":"Brain Cancer","originText":"Brain Cancer"},
        "SNOMED_CT-1000001" : {"code":"1000001","codeSystemName":"SNOMED_CT","displayName":"Colorectal Cancer","originText":"Colorectal Cancer"},
        "SNOMED_CT-254582000" : {"code":"254582000","codeSystemName":"SNOMED_CT","displayName":"Rectal Cancer","originText":"Rectal Cancer"},
        "SNOMED_CT-72900001" : {"code":"72900001","codeSystemName":"SNOMED_CT","displayName":"Familial adnenomatous polyposis (FAP)","originText":"Familial adnenomatous polyposis (FAP)"},
        "SNOMED_CT-68496003" : {"code":"68496003","codeSystemName":"SNOMED_CT","displayName":"Colon Polyp","originText":"Colon Polyp"},
        "SNOMED_CT-34000006" : {"code":"34000006","codeSystemName":"SNOMED_CT","displayName":"Crohn's Disease","originText":"Crohn's Disease"},
        "SNOMED_CT-10743008" : {"code":"10743008","codeSystemName":"SNOMED_CT","displayName":"Irritable Bowel Syndrome","originText":"Irritable Bowel Syndrome"},
        "SNOMED_CT-64766004" : {"code":"64766004","codeSystemName":"SNOMED_CT","displayName":"Ulcerative Colitis","originText":"Ulcerative Colitis"},
        "SNOMED_CT-119292006" : {"code":"119292006","codeSystemName":"SNOMED_CT","displayName":"Gastrointestinal (GI) Disorder","originText":"Gastrointestinal (GI) Disorder"},
        "SNOMED_CT-56265001" : {"code":"56265001","codeSystemName":"SNOMED_CT","displayName":"Heart Disease","originText":"Heart Disease"},
        "SNOMED_CT-22298006" : {"code":"22298006","codeSystemName":"SNOMED_CT","displayName":"Heart Attack","originText":"Heart Attack"},
        "SNOMED_CT-53741008" : {"code":"53741008","codeSystemName":"SNOMED_CT","displayName":"Coronary Artery Disease","originText":"Coronary Artery Disease"},
        "SNOMED_CT-194828000" : {"code":"194828000","codeSystemName":"SNOMED_CT","displayName":"Angina","originText":"Angina"},
        "SNOMED_CT-128053003" : {"code":"128053003","codeSystemName":"SNOMED_CT","displayName":"Deep Vein Thrombosis (DVT)","originText":"Deep Vein Thrombosis (DVT)"},
        "SNOMED_CT-59282003" : {"code":"59282003","codeSystemName":"SNOMED_CT","displayName":"Pulmonary Embolism","originText":"Pulmonary Embolism"},
        "SNOMED_CT-4779008" : {"code":"4779008","codeSystemName":"SNOMED_CT","displayName":"Clotting Disorder","originText":"Clotting Disorder"},
        "SNOMED_CT-82141001" : {"code":"82141001","codeSystemName":"SNOMED_CT","displayName":"Impaired Fasting Glucose","originText":"Impaired Fasting Glucose"},
        "SNOMED_CT-390951007" : {"code":"390951007","codeSystemName":"SNOMED_CT","displayName":"Impaired Fasting Glucose","originText":"Impaired Fasting Glucose"},
        "SNOMED_CT-9414007" : {"code":"9414007","codeSystemName":"SNOMED_CT","displayName":"Impaired Glucose Tolerance","originText":"Impaired Glucose Tolerance"},
        "SNOMED_CT-32284009" : {"code":"32284009","codeSystemName":"SNOMED_CT","displayName":"Insulin Resistance","originText":"Insulin Resistance"},
        "SNOMED_CT-237650006" : {"code":"237650006","codeSystemName":"SNOMED_CT","displayName":"Insulin Resistance","originText":"Insulin Resistance"},
        "SNOMED_CT-472972006" : {"code":"472972006","codeSystemName":"SNOMED_CT","displayName":"Maturity Onset Diabetes mellitus in Young (MODY)","originText":"Maturity Onset Diabetes mellitus in Young (MODY)"},
        "SNOMED_CT-28453007" : {"code":"28453007","codeSystemName":"SNOMED_CT","displayName":"Maturity Onset Diabetes mellitus in Young (MODY)","originText":"Maturity Onset Diabetes mellitus in Young (MODY)"},
        "SNOMED_CT-74732009" : {"code":"74732009","codeSystemName":"SNOMED_CT","displayName":"Mental Disorder","originText":"Mental Disorder"},
        "SNOMED_CT-261665006" : {"code":"261665006","codeSystemName":"SNOMED_CT","displayName":"Unknown","originText":"Unknown"},
        "SNOMED_CT-PREDIABE" : {"code":"PREDIABE","codeSystemName":"SNOMED_CT","displayName":"Pre-Diabetes","originText":"Pre-Diabetes"},
        "SNOMED_CT-230690007" : {"code":"230690007","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "SNOMED_CT-413758000" : {"code":"413758000","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "SNOMED_CT-274100004" : {"code":"274100004","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "SNOMED_CT-undefined" : {"code":"undefined","codeSystemName":"SNOMED_CT","displayName":"Other Disease","originText":"Other Disease"},
        "SNOMED_CT-OTHER" : {"code":"OTHER","codeSystemName":"SNOMED_CT","displayName":"Other Disease","originText":"Other Disease"},
        "SNOMED_CT-OTCANCER" : {"code":"OTCANCER","codeSystemName":"SNOMED_CT","displayName":"Other Cancer","originText":"Other Cancer"},
        "SNOMED_CT-OTKIDDIS" : {"code":"OTKIDDIS","codeSystemName":"SNOMED_CT","displayName":"Other Kidney Disease","originText":"Other Kidney Disease"},
        "SNOMED_CT-OTCLODIS" : {"code":"OTCLODIS","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "SNOMED_CT-OTDIABET" : {"code":"OTDIABET","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "SNOMED_CT-OTGASDIS" : {"code":"OTGASDIS","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "SNOMED_CT-OTHEADIS" : {"code":"OTHEADIS","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "SNOMED_CT-UNCANCER" : {"code":"UNCANCER","codeSystemName":"SNOMED_CT","displayName":"Unknown Cancer","originText":"Unknown Cancer"},
        "SNOMED_CT-UNCLODIS" : {"code":"UNCLODIS","codeSystemName":"SNOMED_CT","displayName":"Unknown Clotting Disorder","originText":"Unknown Clotting Disorder"},
        "SNOMED_CT-UNDIABET" : {"code":"UNDIABET","codeSystemName":"SNOMED_CT","displayName":"Unknown Diabetes","originText":"Unknown Diabetes"},
        "SNOMED_CT-UNGASDIS" : {"code":"UNGASDIS","codeSystemName":"SNOMED_CT","displayName":"Unknown Gastrointestinal (GI) Disorder","originText":"Unknown Gastrointestinal (GI) Disorder"},
        "SNOMED_CT-UNHEADIS" : {"code":"UNHEADIS","codeSystemName":"SNOMED_CT","displayName":"Unknown Heart Disease","originText":"Unknown Heart Disease"},
        "SNOMED_CT-UNKIDDIS" : {"code":"UNKIDDIS","codeSystemName":"SNOMED_CT","displayName":"Unknown Kidney Disease","originText":"Unknown Kidney Disease"},
        "SNOMED_CT-UNLUNDIS" : {"code":"UNLUNDIS","codeSystemName":"SNOMED_CT","displayName":"Unknown Lung Disease","originText":"Unknown Lung Disease"},
        "SNOMED_CT-UNPSYDIS" : {"code":"UNPSYDIS","codeSystemName":"SNOMED_CT","displayName":"Unknown Psychological Disorder","originText":"Unknown Psychological Disorder"},
        "SNOMED_CT-null" : {"code":"null","codeSystemName":"SNOMED_CT","displayName":"#N/A","originText":"#N/A"},
        "FAMILY_T-HEALTHY" : {"code":"HEALTHY","codeSystemName":"FAMILY_T","displayName":"Healthy","originText":"Healthy"},  
    }

    static getCode(key){
        return this.CODE[key];
    }
}

export class NoteUtil{
    static FAMILY_T_ORIGINAL_TERM = [
        "age",
        "birth_order",
        "created_date",
        "diastolic_blood_pressure",
        "dietary_frequency_to_drink_suger_drin_in_week",
        "dietary_frequency_to_eat_dairy_products_in_day",
        "dietary_frequency_to_eat_fishes_in_week",
        "dietary_frequency_to_eat_fruits_in_day",
        "dietary_frequency_to_eat_nuts_in_week",
        "dietary_frequency_to_eat_processed_meat_in_week",
        "dietary_frequency_to_eat_unprocessed_meat_in_week",
        "dietary_frequency_to_eat_vegetables_in_day",
        "dietary_frequency_to_eat_whole_grains_in_day",
        "estimated_age",
        "estimated_death_age",
        "ethnicity",
        "fasting_blood_glucose_lebel",
        "flg_race_ethnic",
        "hba1c",
        "hdl_cholesterol",
        "hip",
        "hip_unit",
        "is_alive",
        "last_diagnosis_month",
        "last_diagnosis_year",
        "ldl_cholesterol",
        "living_prefectures",
        "month_of_birth",
        "occasionally_blood_glucose_lebel",
        "ogtt_blood_glucose_lebel",
        "race",
        "relationship",
        "smoker",
        "systolic_blood_pressure",
        "take_antihypertensive",
        "take_hypoglycemic",
        "training_count_for_training_at_week",
        "training_family",
        "training_strength",
        "training_time_for_training_at_week",
        "update_date",
        "waist",
        "waist_unit",
        "year_of_birth",
    ]

    static getNotes(personalInformation){
        var notes = [];
        this.FAMILY_T_ORIGINAL_TERM.forEach(function(term){
            if(personalInformation[term]!==undefined){
                notes.push(new Note(term,personalInformation[term]));
            }
        });
        return notes;
    }
}
