import {RaceUtil} from '../../../js/modules/xmlTagUtil';

test('RaceUtil_getRace', () => {
    var evalue = {
        "code":"1000000",
        "codeSystemName":"TBD",
        "displayName":"Asian",
        "id":"2"
    };
    expect(RaceUtil.getRace("Asian")).toStrictEqual(evalue);
});

test('RaceUtil_getRaceDataForPersonalInfomation', () => {
    var params = ["Asian","Japanese"];
    var evalue = {"American Indian or Alaska Native":false,"Asian":true,"Black or African-American":false,"Native Hawaiian or Other Pacific Islander":false,"White":false,"Asian Indian":false,"Chinese":false,"Filipino":false,"Japanese":true,"Korean":false,"Vietnamese":false,"Other Asian":false,"Unknown Asian":false,"Chamorro":false,"Guamanian":false,"Native Hawaiian":false,"Samoan":false,"Unknown South Pacific Islander":false};
    expect(RaceUtil.getRaceDataForPersonalInfomation(params)).toStrictEqual(evalue);
});