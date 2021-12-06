import { xmlToPersonalInfo } from '../../../js/modules/xmlToPersonalInfo';

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
            "attr_classCode": "OBS",
            "attr_moodCode": "EVN",
            "effectiveTime": {
                "attr_value": "10/1/2021",
            },
            "id": {
                "attr_extention": "gov.hhs.fhh:718163810183",
            },
            "methodCode": {
                "attr_displayName": "Surgeon General's Family Heath History Tool",
            },
            "subject": {
                "attr_typeCode": "SBJ",
                "patient": {
                    "attr_classCode": "PAT",
                    "patientPerson": {
                        "administrativeGenderCode": {
                            "attr_code": "248153007",
                            "attr_codeSystemName": "SNOMED_CT",
                            "attr_displayName": "male",
                        },
                        "birthTime": {
                            "attr_value": "10/01/1981",
                        },
                        "id": {
                            "attr_extension": "c95f399c-c3e7-4d46-aabf-0d721f639965",
                        },
                        "name": {
                            "attr_formatted": "testName",
                        },
                        "raceCode": [
                            {
                                "attr_code": "1000000",
                                "attr_codeSystemName": "TBD",
                                "attr_displayName": "Asian",
                                "attr_id": "2",
                            },
                            {
                                "attr_code": "2039-6",
                                "attr_codeSystemName": "HL7",
                                "attr_displayName": "Japanese",
                                "attr_id": "14",
                            },
                        ],
                        "relative": [
                            {
                                "code": {
                                    "attr_code": "NMTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Mother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248152002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "female",
                                    },
                                    "id": {
                                        "attr_extension": "ceb26763-458f-4133-802e-bcb9e49f031d",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "NFTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Father",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "56a783a6-0424-43ae-8248-589653fcaa9b",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "MGRMTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Maternal Grandmother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248152002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "female",
                                    },
                                    "id": {
                                        "attr_extension": "7187c3af-5ebd-4d12-b3a8-48e323d5409b",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "MGRFTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Maternal Grandfather",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "7cdc7a5a-0bb7-4f84-9fe7-0450da0f3639",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "PGRMTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Paternal Grandmother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248152002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "female",
                                    },
                                    "id": {
                                        "attr_extension": "c35b2ee2-afe8-4ba3-a3c3-928bd3e767c1",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "PGRFTH",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Paternal Grandfather",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "9f5e6464-cd70-4625-995c-c9f5047e974b",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
                                        },
                                        "relationshipHolder": "",
                                    },
                                    "subjectOf2": "",
                                },
                            },
                            {
                                "code": {
                                    "attr_code": "NBRO",
                                    "attr_codeSystemName": "HL7 Family History Model",
                                    "attr_displayName": "Brother",
                                },
                                "relationshipHolder": {
                                    "administrativeGenderCode": {
                                        "attr_code": "248153007",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "male",
                                    },
                                    "id": {
                                        "attr_extension": "98edd975-d38c-40be-bdae-13a5deedab13",
                                    },
                                    "name": {
                                        "attr_formatted": "",
                                    },
                                    "relative": {
                                        "code": {
                                            "attr_code": "PAR",
                                            "attr_codeSystemName": "HL7 Family History Model",
                                            "attr_displayName": "Parent",
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
                                        "attr_code": "271603002",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "height",
                                    },
                                    "value": {
                                        "attr_unit": "centimeters",
                                        "attr_value": "180",
                                    },
                                },
                                {
                                    "code": {
                                        "attr_code": "107647005",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "weight",
                                    },
                                    "value": {
                                        "attr_unit": "kilogram",
                                        "attr_value": "70",
                                    },
                                },
                                {
                                    "code": {
                                        "attr_originalText": "Parental consanguinity indicated",
                                    },
                                },
                                {
                                    "code": {
                                        "attr_code": "269466003",
                                        "attr_codeSystemName": "SNOMED_CT",
                                        "attr_displayName": "Bone Cancer",
                                        "attr_originalText": "Bone Cancer",
                                    },
                                    "subject": {
                                        "dataEstimatedAge": {
                                            "code": {
                                                "attr_code": "21611-9",
                                                "attr_codeSystemName": "LOINC",
                                                "attr_displayName": "Estimated Age",
                                                "attr_originalText": "pre-birth",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    };
});
