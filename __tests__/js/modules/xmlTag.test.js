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
});

test('BirthTime_getXmlDataByJson', () => {
    var tag = new BirthTime();
    var evalue = {"birthTime" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Id_getXmlDataByJson', () => {
    var tag = new Id();
    var evalue = {"id" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('Name_getXmlDataByJson', () => {
    var tag = new Name();
    var evalue = {"name" : undefined };
    expect(tag.getXmlDataByJson(personalInformation)).toStrictEqual(evalue);
});

test('RaceCode_getXmlDataByJson', () => {
    var tag = new RaceCode();
    var evalue = {"raceCode" : undefined };
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
});

test('Value_getXmlDataByJson', () => {
    var tag = new Value();
    var evalue = {"value" : undefined };
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
});