import {AdministrativeGenderCode,BirthTime,Id,Name,RaceCode,
    SubjectOf2,ClinicalObservation,Code,Value,Subject,DataEstimatedAge,
    Relative,RelationshipHolder,Note,XmlTag} from '../../../js/modules/xmlTag';

    
var personalInformation;

test('XmlTag_appendJsonElement', () => {
    var xmlTag = new XmlTag();

    var json_1 = {};
    var evalue_1 = { number : "1" };
    xmlTag.appendJsonElement(json_1, "number", "1");
    expect(json_1).toStrictEqual(evalue_1);

    var json_2 = {};
    var evalue_2 = {};
    xmlTag.appendJsonElement(json_2, "number", );
    expect(json_2).toStrictEqual(evalue_2);
});

test('AdministrativeGenderCode_getXmlDataByJson', () => {
    var tag = new AdministrativeGenderCode();
    var evalue = {"administrativeGenderCode" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode("code", "codeSystemName", "displayName");
    var evalue = {"administrativeGenderCode" : {
            "attr_code":"code",
            "attr_codeSystemName":"codeSystemName",
            "attr_displayName":"displayName"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode("code", undefined, undefined);
    var evalue = {"administrativeGenderCode" : {
            "attr_code":"code"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new AdministrativeGenderCode(undefined, "codeSystemName", undefined);
    var evalue = {"administrativeGenderCode" : {
            "attr_codeSystemName":"codeSystemName",
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
    
    var tag = new AdministrativeGenderCode(undefined, undefined, "displayName");
    var evalue = {"administrativeGenderCode" : {
            "attr_displayName":"displayName"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('BirthTime_getXmlDataByJson', () => {
    var tag = new BirthTime();
    var evalue = {"birthTime" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new BirthTime("birthTime");
    var evalue = {"birthTime" : { "attr_value":"birthTime" } };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Id_getXmlDataByJson', () => {
    var tag = new Id();
    var evalue = {"id" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Id("id");
    var evalue = {"id" : {"attr_extension":"id"} };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Name_getXmlDataByJson', () => {
    var tag = new Name();
    var evalue = {"name" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Name("formatted");
    var evalue = {"name" : {"attr_formatted":"formatted"} };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('RaceCode_getXmlDataByJson', () => {
    var tag = new RaceCode();
    var evalue = {"raceCode" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new RaceCode("code","codeSystemName","displayName","id");
    var evalue = {"raceCode" : {
            "attr_code":"code",
            "attr_codeSystemName":"codeSystemName",
            "attr_displayName":"displayName",
            "attr_id":"id"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new RaceCode("code",undefined,undefined,undefined);
    var evalue = {"raceCode" : {
            "attr_code":"code"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new RaceCode(undefined,"codeSystemName",undefined,undefined);
    var evalue = {"raceCode" : {
            "attr_codeSystemName":"codeSystemName"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new RaceCode(undefined,undefined,"displayName",undefined);
    var evalue = {"raceCode" : {
            "attr_displayName":"displayName"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new RaceCode(undefined,undefined,undefined,"id");
    var evalue = {"raceCode" : {
            "attr_id":"id"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('SubjectOf2_getXmlDataByJson', () => {
    var tag = new SubjectOf2();
    var evalue = {"subjectOf2" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('ClinicalObservation_getXmlDataByJson', () => {
    var tag = new ClinicalObservation();
    var evalue = {"clinicalObservation" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Code_getXmlDataByJson', () => {
    var tag = new Code();
    var evalue = {"code" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Code("code","codeSystemName","displayName","originalText");
    var evalue = {"code" : {
            "attr_code":"code",
            "attr_codeSystemName":"codeSystemName",
            "attr_displayName":"displayName",
            "attr_originalText":"originalText"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Code("code",undefined,undefined,undefined);
    var evalue = {"code" : {
            "attr_code":"code"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Code(undefined,"codeSystemName",undefined,undefined);
    var evalue = {"code" : {
            "attr_codeSystemName":"codeSystemName"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Code(undefined,undefined,"displayName",undefined);
    var evalue = {"code" : {
            "attr_displayName":"displayName"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Code(undefined,undefined,undefined,"originalText");
    var evalue = {"code" : {
            "attr_originalText":"originalText"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Value_getXmlDataByJson', () => {
    var tag = new Value();
    var evalue = {"value" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Value("value", "unit");
    var evalue = {"value" : {
            "attr_value":"value",
            "attr_unit":"unit"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Value("value", undefined);
    var evalue = {"value" : {
            "attr_value":"value"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Value(undefined, "unit");
    var evalue = {"value" : {
            "attr_unit":"unit"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Subject_getXmlDataByJson', () => {
    var tag = new Subject();
    var evalue = {"subject" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('DataEstimatedAge_getXmlDataByJson', () => {
    var tag = new DataEstimatedAge();
    var evalue = {"dataEstimatedAge" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Relative_getXmlDataByJson', () => {
    var tag = new Relative();
    var evalue = {"relative" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('RelationshipHolder_getXmlDataByJson', () => {
    var tag = new RelationshipHolder();
    var evalue = {"relationshipHolder" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Note_getXmlDataByJson', () => {
    var tag = new Note();
    var evalue = {"note" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Note("code","text");
    var evalue = {"note" : {
            "attr_code":"code",
            "attr_text":"text"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Note("code",undefined);
    var evalue = {"note" : {
            "attr_code":"code"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);

    var tag = new Note(undefined,"text");
    var evalue = {"note" : {
            "attr_text":"text"
        }
    };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});