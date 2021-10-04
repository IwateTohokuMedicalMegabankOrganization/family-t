import xmlToPersonalInfo from '../../../js/modules/xmlToPersonalInfo';

test('load', () => {
    var input = `<FamilyHistory moodCode="EVN" classCode="OBS">
    <id extention="gov.hhs.fhh:718163810183" />
    <effectiveTime value="10/1/2021" />
    <methodCode displayName="Surgeon General's Family Heath History Tool" />
    <subject typeCode="SBJ">
        <patient classCode="PAT">
            <patientPerson>
                <id extension="c95f399c-c3e7-4d46-aabf-0d721f639965" />
                <name formatted="testName" />
                <birthTime value="10/01/1981" />
                <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                <raceCode displayName="Asian" code="1000000" codeSystemName="TBD" id="2" />
                <raceCode displayName="Japanese" code="2039-6" codeSystemName="HL7" id="14" />
                <subjectOf2>
                    <clinicalObservation>
                        <code displayName="height" codeSystemName="SNOMED_CT" code="271603002" />
                        <value value="180" unit="centimeters" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code displayName="weight" codeSystemName="SNOMED_CT" code="107647005" />
                        <value value="70" unit="kilogram" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code originalText="Parental consanguinity indicated" />
                    </clinicalObservation>
                    <clinicalObservation>
                        <code codeSystemName="SNOMED_CT" code="269466003" displayName="Bone Cancer" originalText="Bone Cancer" />
                        <subject>
                            <dataEstimatedAge>
                                <code displayName="Estimated Age" codeSystemName="LOINC" code="21611-9" originalText="pre-birth" />
                            </dataEstimatedAge>
                        </subject>
                    </clinicalObservation>
                </subjectOf2>
                <relative>
                    <code displayName="Mother" codeSystemName="HL7 Family History Model" code="NMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="ceb26763-458f-4133-802e-bcb9e49f031d" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Father" codeSystemName="HL7 Family History Model" code="NFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="56a783a6-0424-43ae-8248-589653fcaa9b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Maternal Grandmother" codeSystemName="HL7 Family History Model" code="MGRMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="7187c3af-5ebd-4d12-b3a8-48e323d5409b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Maternal Grandfather" codeSystemName="HL7 Family History Model" code="MGRFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Paternal Grandmother" codeSystemName="HL7 Family History Model" code="PGRMTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="female" code="248152002" />
                        <subjectOf2 />
                        <id extension="c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Paternal Grandfather" codeSystemName="HL7 Family History Model" code="PGRFTH" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="9f5e6464-cd70-4625-995c-c9f5047e974b" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
                <relative>
                    <code displayName="Brother" codeSystemName="HL7 Family History Model" code="NBRO" />
                    <relationshipHolder>
                        <relative>
                            <code displayName="Parent" codeSystemName="HL7 Family History Model" code="PAR" />
                            <relationshipHolder />
                        </relative>
                        <administrativeGenderCode codeSystemName="SNOMED_CT" displayName="male" code="248153007" />
                        <subjectOf2 />
                        <id extension="98edd975-d38c-40be-bdae-13a5deedab13" />
                        <name formatted="" />
                    </relationshipHolder>
                </relative>
            </patientPerson>
        </patient>
    </subject>
</FamilyHistory>`;
    var output = {
        "FamilyHistory": {
            "classCode": "OBS",
            "effectiveTime": {
                "value": "10/1/2021",
            },
            "id": {
                "extention": "gov.hhs.fhh:718163810183",
            },
            "methodCode": {
                "displayName": "Surgeon General's Family Heath History Tool",
            },
            "moodCode": "EVN",
            "subject": {
                "patient": {
                    "classCode": "PAT",
                    "patientPerson": {
                        "administrativeGenderCode": {
                            "code": "248153007",
                            "codeSystemName": "SNOMED_CT",
                            "displayName": "male",
                        },
                        "birthTime": {
                            "value": "10/01/1981",
                        },
                        "id": {
                            "extension": "c95f399c-c3e7-4d46-aabf-0d721f639965",
                        },
                        "name": {
                            "formatted": "testName",
                        },
                        "raceCode": [
                            {
                                "code": "1000000",
                                "codeSystemName": "TBD",
                                "displayName": "Asian",
                                "id": "2",
                            },
                            {
                                "code": "2039-6",
                                "codeSystemName": "HL7",
                                "displayName": "Japanese",
                                "id": "14",
                            },
                        ],
                        "relative": [
                            {
                                "code": {
                                    "code": "NMTH",
                                    "codeSystemName": "HL7 Family History Model",
                                    "displayName": "Mother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "code": "248152002",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "female",
                                    },
                                    "id": {
                                        "extension": "ceb26763-458f-4133-802e-bcb9e49f031d",
                                    },
                                    "name": {
                                        "formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "code": "PAR",
                                            "codeSystemName": "HL7 Family History Model",
                                            "displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "code": "NFTH",
                                    "codeSystemName": "HL7 Family History Model",
                                    "displayName": "Father",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "code": "248153007",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "male",
                                    },
                                    "id": {
                                        "extension": "56a783a6-0424-43ae-8248-589653fcaa9b",
                                    },
                                    "name": {
                                        "formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "code": "PAR",
                                            "codeSystemName": "HL7 Family History Model",
                                            "displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "code": "MGRMTH",
                                    "codeSystemName": "HL7 Family History Model",
                                    "displayName": "Maternal Grandmother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "code": "248152002",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "female",
                                    },
                                    "id": {
                                        "extension": "7187c3af-5ebd-4d12-b3a8-48e323d5409b",
                                    },
                                    "name": {
                                        "formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "code": "PAR",
                                            "codeSystemName": "HL7 Family History Model",
                                            "displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "code": "MGRFTH",
                                    "codeSystemName": "HL7 Family History Model",
                                    "displayName": "Maternal Grandfather",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "code": "248153007",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "male",
                                    },
                                    "id": {
                                        "extension": "7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639",
                                    },
                                    "name": {
                                        "formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "code": "PAR",
                                            "codeSystemName": "HL7 Family History Model",
                                            "displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "code": "PGRMTH",
                                    "codeSystemName": "HL7 Family History Model",
                                    "displayName": "Paternal Grandmother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "code": "248152002",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "female",
                                    },
                                    "id": {
                                        "extension": "c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1",
                                    },
                                    "name": {
                                        "formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "code": "PAR",
                                            "codeSystemName": "HL7 Family History Model",
                                            "displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "code": "PGRFTH",
                                    "codeSystemName": "HL7 Family History Model",
                                    "displayName": "Paternal Grandfather",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "code": "248153007",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "male",
                                    },
                                    "id": {
                                        "extension": "9f5e6464-cd70-4625-995c-c9f5047e974b",
                                    },
                                    "name": {
                                        "formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "code": "PAR",
                                            "codeSystemName": "HL7 Family History Model",
                                            "displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "code": "NBRO",
                                    "codeSystemName": "HL7 Family History Model",
                                    "displayName": "Brother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "code": "248153007",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "male",
                                    },
                                    "id": {
                                        "extension": "98edd975-d38c-40be-bdae-13a5deedab13",
                                    },
                                    "name": {
                                        "formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "code": "PAR",
                                            "codeSystemName": "HL7 Family History Model",
                                            "displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                        ],
                        "subjectOf2": {
                            "clinicalObservation": [
                                {
                                    "code": {
                                        "code": "271603002",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "height",
                                    },
                                    "value": {
                                        "unit": "centimeters",
                                        "value": "180",
                                    },
                                },
                                {
                                    "code": {
                                        "code": "107647005",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "weight",
                                    },
                                    "value": {
                                        "unit": "kilogram",
                                        "value": "70",
                                    },
                                },
                                {
                                    "code": {
                                        "originalText": "Parental consanguinity indicated",
                                    },
                                },
                                {
                                    "code": {
                                        "code": "269466003",
                                        "codeSystemName": "SNOMED_CT",
                                        "displayName": "Bone Cancer",
                                        "originalText": "Bone Cancer",
                                    },
                                    "subject": {
                                        "dataEstimatedAge": {
                                            "code": {
                                                "code": "21611-9",
                                                "codeSystemName": "LOINC",
                                                "displayName": "Estimated Age",
                                                "originalText": "pre-birth",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                "typeCode": "SBJ",
            },
        }
    };

    expect(xmlToPersonalInfo(input)).toStrictEqual(output);

    var familyHistory = xmlToPersonalInfo(input).FamilyHistory;
    console.log( familyHistory.id );
});

test('_getPatientPerson', () => {
    const _getPatientPerson = require('../../../js/modules/xmlToPersonalInfo.js').__get__('_getPatientPerson');
    expect(_getPatientPerson(0)).toBeDefined();
    expect(_getPatientPerson(false)).toBeDefined();
    expect(_getPatientPerson({})).toBeDefined();
});

test('_getId', () => {
    const _getId = require('../../../js/modules/xmlToPersonalInfo.js').__get__('_getId');
    expect(_getId(0)).toBe("");
    expect(_getId(false)).toBe("");

    expect(_getId({})).toBe("");
    expect(_getId({ id: "" })).toBe("");
    expect(_getId({ id: "test" })).toBe("");
    expect(_getId({ id: {} })).toBe("");

    expect(_getId({ id: { extention: null } })).toBe("");
    expect(_getId({ id: { extention: "test" } })).toBe("test");
});


test('_getName', () => {
    const _getName = require('../../../js/modules/xmlToPersonalInfo.js').__get__('_getName');
    expect(_getName(0)).toBe("");
    expect(_getName(false)).toBe("");

    expect(_getName({})).toBe("");
    expect(_getName({ name: "" })).toBe("");
    expect(_getName({ name: "test" })).toBe("");
    expect(_getName({ name: {} })).toBe("");
    expect(_getName({ name: null })).toBe("");
    expect(_getName({ name: { formatted: "test" } })).toBe("test");
});


test('_getDate_of_birth', () => {
    const _getDate_of_birth = require('../../../js/modules/xmlToPersonalInfo.js').__get__('_getDate_of_birth');
    expect(_getDate_of_birth(0)).toBe("");
    expect(_getDate_of_birth(false)).toBe("");

    expect(_getDate_of_birth({})).toBe("");
    expect(_getDate_of_birth({ birthTime: "" })).toBe("");
    expect(_getDate_of_birth({ birthTime: "04/10/2021" })).toBe("");
    expect(_getDate_of_birth({ birthTime: {} })).toBe("");
    expect(_getDate_of_birth({ birthTime: null })).toBe("");

    expect(_getDate_of_birth({ birthTime: { value: null } })).toBe("");
    expect(_getDate_of_birth({ birthTime: { value: "04/10/2021" } })).toBe("04/10/2021");
});