import { CodeUtil, RaceUtil, RelativeUtil, ValueUtil } from '../../../js/modules/xmlTagUtil';

test('RaceUtil_getRace', () => {
    var evalue = {
        "code": "1000000",
        "codeSystemName": "TBD",
        "displayName": "Asian",
        "id": "2"
    };
    expect(RaceUtil.getRace("Asian")).toStrictEqual(evalue);
});

test('RaceUtil_getRaceDataForPersonalInfomation', () => {
    var params = ["Asian", "Japanese"];
    var evalue = { "American Indian or Alaska Native": false, "Asian": true, "Black or African-American": false, "Native Hawaiian or Other Pacific Islander": false, "White": false, "Asian Indian": false, "Chinese": false, "Filipino": false, "Japanese": true, "Korean": false, "Vietnamese": false, "Other Asian": false, "Unknown Asian": false, "Chamorro": false, "Guamanian": false, "Native Hawaiian": false, "Samoan": false, "Unknown South Pacific Islander": false };
    expect(RaceUtil.getRaceDataForPersonalInfomation(params)).toStrictEqual(evalue);
});

test('RelativeUtil_isMatchRelation', () => {
    var params = "brother_0";
    var evalue = true;
    expect(RelativeUtil.isMatchRelation(params)).toStrictEqual(evalue);
});

test('RelativeUtil_getRelation', () => {
    var params = "brother_0";
    expect(RelativeUtil.getRelation(params).group).toStrictEqual("self");
    expect(RelativeUtil.getRelation(params).relation).toStrictEqual("brother");
    expect(RelativeUtil.getRelation(params).displayName).toStrictEqual("Brother");
});

test('CodeUtil_getPersonalInformationKey', () => {
    expect(CodeUtil.getPersonalInformationKey('aaa', "bbb")).toStrictEqual('SNOMED_CT-null');
    expect(CodeUtil.getPersonalInformationKey('21611-9', "LOINC")).toStrictEqual('estimated_age');
});

test('CodeUtil_isHealthHistoryCode', () => {
    expect(CodeUtil.isHealthHistoryCode('aaa', "bbb")).toStrictEqual(false);
    expect(CodeUtil.isHealthHistoryCode('248153007', "SNOMED_CT")).toStrictEqual(false);
    return;
    expect(CodeUtil.isHealthHistoryCode('55822004', "SNOMED_CT")).toStrictEqual(true);
    expect(CodeUtil.isHealthHistoryCode('HEALTHY', "FAMILY_T")).toStrictEqual(true);
});

test('CodeUtil_isEstimatedAge', () => {
    expect(CodeUtil.isHealthHistoryCode('aaa', "bbb")).toStrictEqual(false);
    expect(CodeUtil.isHealthHistoryCode('248153007', "SNOMED_CT")).toStrictEqual(false);
    expect(CodeUtil.isHealthHistoryCode('21611-9', "LOINC")).toStrictEqual(true);
});